'use client';
import { useState } from 'react';

export default function Page() {
  const [form, setForm] = useState({ nome: '', email: '', empresa: '', whyUs: '', senha: '', login: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Enviando...');
    try {
      const res = await fetch('http://localhost:3001/admin/candidatos/nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setMsg('Intenção enviada com sucesso!');
      else setMsg('Erro ao enviar intenção.');
    } catch {
      setMsg('Erro de conexão.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Intenção de Participação</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nome" placeholder="Nome" onChange={handleChange} className="w-full border rounded-lg p-3" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border rounded-lg p-3" />
          <input name="empresa" placeholder="Empresa" onChange={handleChange} className="w-full border rounded-lg p-3" />
          <textarea name="whyUs" placeholder="Por que deseja participar?" onChange={handleChange} className="w-full border rounded-lg p-3" />
          <input name="login" placeholder="Usuário" onChange={handleChange} className="w-full border rounded-lg p-3" />
          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="w-full border rounded-lg p-3" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            Enviar
          </button>
        </form>
        {msg && <p className="text-center mt-4 text-sm text-gray-700">{msg}</p>}
      </div>
    </main>
  );
}
