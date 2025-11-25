import type { APIRoute } from "astro";
import { fetchFromShopify } from "../../lib/shopify";

export const POST: APIRoute = async ({ request }) => {
    console.log("=== Checkout API Called ===");
    console.log("Request method:", request.method);
    console.log("Request URL:", request.url);
    console.log("Request bodyUsed:", request.bodyUsed);

    try {
        let items;
        try {
            const body = await request.json();
            console.log("Parsed body:", body);
            items = body.items;
            console.log("Checkout items received:", JSON.stringify(items, null, 2));
        } catch (e) {
            console.error("Failed to parse request body:", e);
            return new Response(JSON.stringify({ error: "Corpo da requisição inválido", details: String(e) }), { status: 400 });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return new Response(JSON.stringify({ error: "Carrinho vazio" }), {
                status: 400,
            });
        }

        const lineItems = items.map((item: any) => ({
            variantId: item.id,
            quantity: item.quantity,
        }));
        console.log("Line items constructed:", JSON.stringify(lineItems, null, 2));

        const query = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    `;

        const variables = {
            input: {
                lineItems,
            },
        };

        const response = await fetchFromShopify(query, variables);
        console.log("Shopify response:", JSON.stringify(response, null, 2));

        if (response.errors) {
            console.error("Erros GraphQL:", response.errors);
            return new Response(
                JSON.stringify({ error: "Erro na API da Shopify", details: response.errors }),
                { status: 500 }
            );
        }

        const { data } = response;

        if (data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
            console.error("Erros no checkout:", data.checkoutCreate.checkoutUserErrors);
            return new Response(
                JSON.stringify({ error: "Erro ao criar checkout na Shopify", details: data.checkoutCreate.checkoutUserErrors }),
                { status: 500 }
            );
        }

        const checkoutUrl = data?.checkoutCreate?.checkout?.webUrl;

        if (!checkoutUrl) {
            console.error("URL de checkout não retornada. Dados:", data);
            return new Response(
                JSON.stringify({ error: "URL de checkout não retornada" }),
                { status: 500 }
            );
        }

        console.log("=== Checkout SUCCESS ===");
        console.log("Redirect URL:", checkoutUrl);
        return new Response(JSON.stringify({ url: checkoutUrl }), {
            status: 200,
        });
    } catch (error) {
        console.error("Erro na API de checkout:", error);
        return new Response(JSON.stringify({ error: "Erro interno do servidor", details: String(error) }), {
            status: 500,
        });
    }
};
