import { Product } from "../models/product";

export const productsMock: Product[] = [
    // Produto 1: O seu original, com múltiplas variantes
    {
        id: "gid://shopify/Product/8077693386809",
        title: "DNotas - Caderno A5",
        handle: "dnotas-caderno-a5",
        descriptionHtml:
            "<p>Este é um <strong>caderno incrível</strong> feito à mão.</p><p>Perfeito para suas anotações.</p>",
        priceRange: {
            minVariantPrice: { amount: 12.0, currencyCode: "BRL" },
        },
        images: {
            edges: [
                {
                    node: {
                        url: "https://placehold.co/800x800/3B503F/EAEAE5?text=Caderno+A5+1",
                        altText: "Foto do caderno A5 capa verde",
                    },
                },
                {
                    node: {
                        url: "https://placehold.co/800x800/3B503F/EAEAE5?text=Caderno+A5+2",
                        altText: "Foto interna do caderno com pautas",
                    },
                },
            ],
        },
        variants: {
            edges: [
                {
                    node: {
                        id: "gid://shopify/ProductVariant/123456789",
                        title: "Pautado",
                        availableForSale: true,
                        price: { amount: 12.0, currencyCode: "BRL" },
                    },
                },
                {
                    node: {
                        id: "gid://shopify/ProductVariant/123456790",
                        title: "Sem Pauta",
                        availableForSale: true,
                        price: { amount: 12.0, currencyCode: "BRL" },
                    },
                },
                {
                    node: {
                        id: "gid://shopify/ProductVariant/123456791",
                        title: "Pontilhado",
                        availableForSale: false, // Esta variante está esgotada
                        price: { amount: 13.0, currencyCode: "BRL" },
                    },
                },
            ],
        },
    },

    // Produto 2: Produto simples, com uma única variante "Default"
    {
        id: "gid://shopify/Product/8077693386810",
        title: "Caneta DNotas Premium",
        handle: "caneta-dnotas-premium",
        descriptionHtml:
            "<p>A caneta perfeita para acompanhar seu DNotas. Escrita <strong>macia</strong> e design elegante em metal fosco.</p>",
        priceRange: {
            minVariantPrice: { amount: 25.0, currencyCode: "BRL" },
        },
        images: {
            edges: [
                {
                    node: {
                        url: "https://placehold.co/800x800/1A241B/FFFFFF?text=Caneta+Premium",
                        altText: "Caneta DNotas Premium preta",
                    },
                },
            ],
        },
        variants: {
            // Produtos sem variantes ainda têm uma "variante padrão" no Shopify
            edges: [
                {
                    node: {
                        id: "gid://shopify/ProductVariant/123456792",
                        title: "Default Title",
                        availableForSale: true,
                        price: { amount: 25.0, currencyCode: "BRL" },
                    },
                },
            ],
        },
    },

    // Produto 3: Produto com múltiplas imagens e variantes de cor
    {
        id: "gid://shopify/Product/8077693386811",
        title: "Bloco de Notas Pocket (A6)",
        handle: "bloco-de-notas-pocket-a6",
        descriptionHtml:
            "<p>Pequeno e prático, para levar no bolso e não perder nenhuma ideia.</p><ul><li>Capa dura</li><li>90g/m²</li></ul>",
        priceRange: {
            minVariantPrice: { amount: 8.5, currencyCode: "BRL" },
        },
        images: {
            edges: [
                {
                    node: {
                        url: "https://placehold.co/800x800/A4AA9F/1A241B?text=Bloco+A6+Cinza",
                        altText: "Bloco de notas A6 com capa cinza",
                    },
                },
                {
                    node: {
                        url: "https://placehold.co/800x800/3B503F/EAEAE5?text=Bloco+A6+Verde",
                        altText: "Bloco de notas A6 com capa verde",
                    },
                },
            ],
        },
        variants: {
            edges: [
                {
                    node: {
                        id: "gid://shopify/ProductVariant/123456793",
                        title: "Capa Cinza / Pautado",
                        availableForSale: true,
                        price: { amount: 8.5, currencyCode: "BRL" },
                    },
                },
                {
                    node: {
                        id: "gid://shopify/ProductVariant/123456794",
                        title: "Capa Verde / Pautado",
                        availableForSale: true,
                        price: { amount: 8.5, currencyCode: "BRL" },
                    },
                },
            ],
        },
    },

    // Produto 4: Produto totalmente esgotado
    {
        id: "gid://shopify/Product/8077693386812",
        title: "Agenda 2024 (Esgotada)",
        handle: "agenda-2024-esgotada",
        descriptionHtml:
            "<p>Nossas agendas de 2024 foram um sucesso e acabaram!</p><p>Volte em breve para a coleção 2025.</p>",
        priceRange: {
            minVariantPrice: { amount: 45.0, currencyCode: "BRL" },
        },
        images: {
            edges: [
                {
                    node: {
                        url: "https://placehold.co/800x800/EEEEEE/AAAAAA?text=ESGOTADO",
                        altText: "Agenda 2024 Esgotada",
                    },
                },
            ],
        },
        variants: {
            edges: [
                {
                    node: {
                        id: "gid://shopify/ProductVariant/123456795",
                        title: "Capa Dura",
                        availableForSale: false, // Totalmente esgotado
                        price: { amount: 45.0, currencyCode: "BRL" },
                    },
                },
            ],
        },
    },
];
