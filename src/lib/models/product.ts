// Interface do Preço (reutilizável)
interface Price {
    amount: number;
    currencyCode: string;
}

// Interface do Nó da Imagem
interface ImageNode {
    url: string;
    altText: string | null;
}

// Interface da Variante
interface VariantNode {
    id: string;
    title: string;
    availableForSale: boolean;
    price: Price;
}

// --- INTERFACE PRINCIPAL DO PRODUTO (Atualizada) ---
export interface Product {
    id: string;
    title: string;
    handle: string;
    descriptionHtml?: string; // <-- Campo opcional
    priceRange: {
        minVariantPrice: Price;
    };
    images: {
        edges: { node: ImageNode }[];
    };
    variants?: {
        // <-- Campo opcional
        edges: { node: VariantNode }[];
    };
}
