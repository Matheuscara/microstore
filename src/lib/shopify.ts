import { Product } from "./models/product";

let productCache: Product[] | null = null;
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

    return response.json();
}

export async function getAllProducts(): Promise<Product[]> {
    if (productCache) {
        return productCache;
    }

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
        productCache = products; // Salva no cache
        return products;
    } catch (error) {
        console.error("Falha crítica ao buscar produtos:", error);
        return [];
    }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
    // if (this.cachedProduct) {
    //     return this.cachedProduct;
    // }

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

        // 4. Atualiza o cache com o produto detalhado
        if (productCache) {
            const productIndex = productCache.findIndex((p) => p.handle === handle);
            if (productIndex !== -1) {
                productCache[productIndex] = product;
            } else {
                // Se o produto não estava na lista inicial, adiciona
                productCache.push(product);
            }
        } else {
            // Se o cache estava vazio, inicia com este produto
            productCache = [product];
        }

        return product;
    } catch (error) {
        console.error(`Falha crítica ao buscar o produto "${handle}":`, error);
        return null;
    }
}
