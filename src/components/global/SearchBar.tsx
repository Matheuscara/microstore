import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface Product {
    id: string;
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
}

interface SearchBarProps {
    initialProducts: Product[];
}

export default function SearchBar({ initialProducts }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term.length > 0) {
            const filtered = initialProducts.filter((product) =>
                product.title.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(filtered.slice(0, 5)); // Limit to 5 suggestions
            setIsOpen(true);
        } else {
            setFilteredProducts([]);
            setIsOpen(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            window.location.href = `/busca?q=${encodeURIComponent(searchTerm)}`;
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-xs">
            <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            />
            <Input
                type="text"
                placeholder="Pesquisar..."
                className="pl-10 border-border text-text-main placeholder:text-text-muted"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {isOpen && filteredProducts.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredProducts.map((product) => (
                        <a
                            key={product.id}
                            href={`/produtos/${product.handle}`}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-border/10 last:border-0"
                        >
                            <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                {product.images.edges[0]?.node.url && (
                                    <img
                                        src={product.images.edges[0].node.url}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-sm font-medium text-text-main truncate">
                                    {product.title}
                                </p>
                                <p className="text-xs text-primary">
                                    R$ {product.priceRange.minVariantPrice.amount}
                                </p>
                            </div>
                        </a>
                    ))}
                    <a
                        href={`/busca?q=${encodeURIComponent(searchTerm)}`}
                        className="block p-3 text-center text-sm text-primary hover:bg-gray-50 font-medium border-t border-border"
                    >
                        Ver todos os resultados
                    </a>
                </div>
            )}
        </div>
    );
}
