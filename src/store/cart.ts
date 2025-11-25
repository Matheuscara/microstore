import { map } from 'nanostores';

export interface CartItem {
    id: string; // Variant ID
    title: string;
    variantTitle: string;
    price: number;
    image: string;
    quantity: number;
    handle: string; // For linking back to product
}

export const cart = map<Record<string, CartItem>>({});

// Load from localStorage on client side
if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.set(JSON.parse(savedCart));
    }

    // Subscribe to changes and save to localStorage
    cart.subscribe((value) => {
        localStorage.setItem('cart', JSON.stringify(value));
    });
}

export function addCartItem(item: Omit<CartItem, 'quantity'>) {
    const existingItem = cart.get()[item.id];
    if (existingItem) {
        cart.setKey(item.id, {
            ...existingItem,
            quantity: existingItem.quantity + 1,
        });
    } else {
        cart.setKey(item.id, {
            ...item,
            quantity: 1,
        });
    }
}

export function removeCartItem(itemId: string) {
    const currentCart = cart.get();
    const { [itemId]: _, ...newCart } = currentCart;
    cart.set(newCart);
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
    const existingItem = cart.get()[itemId];
    if (existingItem) {
        if (quantity <= 0) {
            removeCartItem(itemId);
        } else {
            cart.setKey(itemId, {
                ...existingItem,
                quantity,
            });
        }
    }
}
