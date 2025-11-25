import React from 'react';
import { useStore } from '@nanostores/react';
import { cart } from '../../store/cart';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';

export default function CartIcon() {
    const $cart = useStore(cart);
    const totalQuantity = Object.values($cart).reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5 text-text-main" />
            <span className="sr-only">Carrinho</span>
            {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {totalQuantity}
                </span>
            )}
        </Button>
    );
}
