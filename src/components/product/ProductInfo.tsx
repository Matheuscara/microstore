import React, { useState } from 'react';
import { addCartItem } from '../../store/cart';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';

interface Variant {
    id: string;
    title: string;
    availableForSale: boolean;
    price: {
        amount: string;
        currencyCode: string;
    };
}

interface ProductInfoProps {
    product: {
        title: string;
        handle: string;
        descriptionHtml: string;
        priceRange: {
            minVariantPrice: {
                amount: string;
            };
        };
        images: {
            edges: {
                node: {
                    url: string;
                };
            }[];
        };
    };
    variants: Variant[];
}

export default function ProductInfo({ product, variants }: ProductInfoProps) {
    const [selectedVariantId, setSelectedVariantId] = useState<string>(
        variants.find((v) => v.availableForSale)?.id || variants[0]?.id || ''
    );
    const [isAdded, setIsAdded] = useState(false);

    const selectedVariant = variants.find((v) => v.id === selectedVariantId);
    const price = selectedVariant ? selectedVariant.price.amount : product.priceRange.minVariantPrice.amount;

    const handleAddToCart = () => {
        if (!selectedVariant) return;

        addCartItem({
            id: selectedVariant.id,
            title: product.title,
            variantTitle: selectedVariant.title,
            price: parseFloat(price),
            image: product.images.edges[0]?.node.url || '',
            handle: product.handle,
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-text-main sm:text-4xl">
                {product.title}
            </h1>

            <div className="mt-4">
                <p className="text-2xl font-semibold text-primary">
                    R$ {price}
                </p>
            </div>

            {product.descriptionHtml && (
                <div
                    className="mt-6 prose prose-sm text-text-muted"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
            )}

            {variants.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-sm font-medium text-text-main mb-3">Opções</h3>
                    <div className="flex flex-wrap gap-3">
                        {variants.map((variant) => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariantId(variant.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-md border transition-all
                  ${selectedVariantId === variant.id
                                        ? 'border-primary text-primary bg-primary/10 ring-1 ring-primary'
                                        : variant.availableForSale
                                            ? 'border-border text-text-main hover:border-primary hover:text-primary bg-white'
                                            : 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                                    }
                `}
                                disabled={!variant.availableForSale}
                                title={!variant.availableForSale ? "Indisponível" : variant.title}
                            >
                                {variant.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-10 flex gap-4">
                <Button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant?.availableForSale}
                    className={`w-full h-12 text-lg transition-all duration-300 ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'
                        } text-white`}
                >
                    {isAdded ? (
                        <span className="flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5" /> Adicionado!
                        </span>
                    ) : (
                        'Adicionar ao Carrinho'
                    )}
                </Button>
            </div>
        </div>
    );
}
