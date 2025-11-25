import React from 'react';
import { useStore } from '@nanostores/react';
import { cart, removeCartItem, updateCartItemQuantity } from '../../store/cart';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

export default function CartList() {
    const $cart = useStore(cart);
    const cartItems = Object.values($cart);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-text-muted text-lg">Seu carrinho está vazio.</p>
                <a href="/" className="text-primary hover:underline mt-4 inline-block">
                    Continuar comprando
                </a>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-white rounded-lg border border-border/20 shadow-sm"
                    >
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-border/10">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-text-main">
                                        <a href={`/produtos/${item.handle}`} className="hover:underline">
                                            {item.title}
                                        </a>
                                    </h3>
                                    {item.variantTitle && (
                                        <p className="text-sm text-text-muted mt-1">{item.variantTitle}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeCartItem(item.id)}
                                    className="text-text-muted hover:text-red-500 transition-colors"
                                    aria-label="Remover item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex justify-between items-end mt-4">
                                <div className="flex items-center border border-border rounded-md">
                                    <button
                                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                        className="p-1 hover:bg-gray-100 text-text-muted"
                                        aria-label="Diminuir quantidade"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 py-1 text-sm font-medium text-text-main">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                        className="p-1 hover:bg-gray-100 text-text-muted"
                                        aria-label="Aumentar quantidade"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="font-semibold text-text-main">
                                    R$ {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg border border-border/20 shadow-sm sticky top-24">
                    <h2 className="text-lg font-bold text-text-main mb-4">Resumo do Pedido</h2>
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-text-muted">
                            <span>Subtotal</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-text-muted">
                            <span>Frete</span>
                            <span className="text-green-600">Grátis</span>
                        </div>
                    </div>
                    <div className="border-t border-border/20 pt-4 mb-6">
                        <div className="flex justify-between font-bold text-lg text-text-main">
                            <span>Total</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg">
                        Finalizar Compra
                    </Button>
                </div>
            </div>
        </div>
    );
}
