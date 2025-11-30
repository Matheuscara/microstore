import { Product } from "./models/product";

export async function fetchFromShopify(queryGraphQL: string, variables: object = {}) {
  const body = {
    query: queryGraphQL,
    variables: variables,
  };

  const response = await fetch("https://dsetup.myshopify.com/api/2024-04/graphql.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": "57c5de3d2a262539479c1541771659bb",
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();

  if (!response.ok) {
    console.error(`Shopify API Error (${response.status}):`, text);
    throw new Error(`Shopify API Error: ${response.status} ${response.statusText}`);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Shopify JSON response:", text);
    throw new Error("Invalid JSON response from Shopify");
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const query = `
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) { # <-- APENAS 1 IMAGEM
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `;

  try {
    const response = await fetchFromShopify(query);
    const productEdges = response?.data?.products?.edges;

    if (!Array.isArray(productEdges)) {
      console.warn(
        "Aviso: Não foi possível buscar os produtos. A resposta da API pode estar vazia ou malformatada.",
      );
      return [];
    }

    const products = productEdges.map((edge) => edge.node);
    return products;
  } catch (error) {
    console.error("Falha crítica ao buscar produtos:", error);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  // 3. Se não, busca os detalhes completos na API
  const query = `
      query getProductByHandle($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

  try {
    const response = await fetchFromShopify(query, { handle });
    const product = response?.data?.product;

    if (!product) {
      console.warn(`Aviso: Produto com handle "${handle}" não encontrado.`);
      return null;
    }

    return product;
  } catch (error) {
    console.error(`Falha crítica ao buscar o produto "${handle}":`, error);
    return null;
  }
}

export async function searchProducts(queryTerm: string): Promise<Product[]> {
  const query = `
      query searchProducts($query: String!) {
        products(first: 20, query: $query) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `;

  try {
    const response = await fetchFromShopify(query, { query: queryTerm });
    const productEdges = response?.data?.products?.edges;

    if (!Array.isArray(productEdges)) {
      return [];
    }

    return productEdges.map((edge) => edge.node);
  } catch (error) {
    console.error("Falha ao buscar produtos:", error);
    return [];
  }
}
