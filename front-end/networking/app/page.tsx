'use client';
import { useState } from 'react';

export default function Page() {
  const [form, setForm] = useState({ nome: '', email: '', empresa: '', whyUs: '', senha: '', login: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Enviando...');
    try {
      const res = await fetch('http://localhost:3001/admin/candidatos/nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setMsg('🎉 Intenção enviada com sucesso!');
      else setMsg('❌ Erro ao enviar intenção.');
    } catch {
      setMsg('⚠️ Erro de conexão.');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Participar do Grupo</h1>
        <p className="text-center text-gray-600 mb-8">Preencha os campos abaixo para enviar sua intenção de participação.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="nome" placeholder="Nome completo" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none" required />
          <input name="email" type="email" placeholder="E-mail" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none" required />
          <input name="empresa" placeholder="Empresa" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none" />
          <textarea name="whyUs" placeholder="Por que deseja participar?" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input name="login" placeholder="Usuário" onChange={handleChange} className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none" required />
            <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition">
            Enviar Intenção
          </button>
        </form>
        {msg && <p className="text-center mt-4 text-gray-700">{msg}</p>}
      </div>
    </section>
  );
}
