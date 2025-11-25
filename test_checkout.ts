import { fetchFromShopify } from './src/lib/shopify';

async function test() {
    // 1. Get a product to find a variant ID
    const query = `
    query {
      products(first: 1) {
        edges {
          node {
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

    try {
        console.log("Fetching product...");
        const products = await fetchFromShopify(query);
        const variantId = products.data.products.edges[0].node.variants.edges[0].node.id;
        console.log("Variant ID:", variantId);

        // 2. Create checkout
        console.log("Creating checkout...");
        const checkoutQuery = `
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
                lineItems: [{ variantId, quantity: 1 }]
            }
        };

        const checkout = await fetchFromShopify(checkoutQuery, variables);
        console.log("Checkout Result:", JSON.stringify(checkout, null, 2));

    } catch (e) {
        console.error("Error:", e);
    }
}

test();
