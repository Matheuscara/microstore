import React, { useState } from 'react';
import { Menu, X, Home, Phone, FileText, Shield } from 'lucide-react';
import { Button } from '../ui/button';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { label: 'Início', href: '/', icon: Home },
        { label: 'Fale Conosco', href: '/contato', icon: Phone },
        { label: 'Termos de Uso', href: '/termos-de-uso', icon: FileText },
        { label: 'Política de Privacidade', href: '/politica-de-privacidade', icon: Shield },
    ];

    return (
        <>
            <button
                className="md:hidden p-2 text-text-main hover:bg-gray-100 rounded-md mr-2"
                onClick={toggleMenu}
                aria-label="Abrir menu"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={toggleMenu}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-surface shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4 flex justify-between items-center border-b border-border/10">
                    <h2 className="text-lg font-bold text-text-main">Menu</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMenu}
                        className="text-text-muted hover:text-text-main"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-text-main hover:bg-primary/5 rounded-lg transition-colors"
                            onClick={toggleMenu}
                        >
                            <item.icon className="h-5 w-5 text-primary" />
                            <span className="font-medium">{item.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
}
