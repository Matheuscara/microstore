import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;

        const mailtoLink = `mailto:matheus.dias.dev.3d@gmail.com?subject=${encodeURIComponent(
            subject || 'Contato via Site'
        )}&body=${encodeURIComponent(
            `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
        )}`;

        window.location.href = mailtoLink;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-text-main">
                        Nome
                    </label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-text-main">
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-text-main">
                    Assunto
                </label>
                <Input
                    id="subject"
                    name="subject"
                    placeholder="Assunto da mensagem"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-text-main">
                    Mensagem
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Como podemos ajudar?"
                    required
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>

            <Button type="submit" className="w-full md:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
            </Button>
        </form>
    );
}
