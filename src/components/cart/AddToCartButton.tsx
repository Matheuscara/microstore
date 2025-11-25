import React, { useState } from 'react';
import { addCartItem } from '../../store/cart';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    product: {
        title: string;
        handle: string;
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
    variantId: string; // We'll use the first variant ID for now if not specified
    available: boolean;
}

export default function AddToCartButton({ product, variantId, available }: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addCartItem({
            id: variantId,
            title: product.title,
            price: parseFloat(product.priceRange.minVariantPrice.amount),
            image: product.images.edges[0]?.node.url || '',
            handle: product.handle,
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Button
            onClick={handleAddToCart}
            disabled={!available}
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
    );
}
