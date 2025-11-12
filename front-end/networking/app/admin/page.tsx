'use client';
import { useEffect, useState } from 'react';

interface Candidato {
  id: number;
  nome: string;
  email: string;
  empresa: string;
  aprovacao: string;
}

export default function AdminPage() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [msg, setMsg] = useState('');

  const carregar = async () => {
    const res = await fetch('http://localhost:3001/candidatos');
    const data = await res.json();
    setCandidatos(data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const atualizar = async (id: number, acao: string) => {
    await fetch(`http://localhost:3001/${acao}/${id}`, { method: 'POST' });
    setMsg(`✅ Candidato ${acao} com sucesso!`);
    carregar();
  };

  return (
    <section className="min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Painel do Administrador</h1>
      <div className="overflow-x-auto bg-white rounded-2xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-4">Nome</th>
              <th className="p-4">Email</th>
              <th className="p-4">Empresa</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map(c => (
              <tr key={c.id} className="border-t hover:bg-blue-50">
                <td className="p-4">{c.nome}</td>
                <td className="p-4">{c.email}</td>
                <td className="p-4">{c.empresa}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${c.aprovacao === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {c.aprovacao || 'Pendente'}
                  </span>
                </td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => atualizar(c.id, 'aprovar')} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Aprovar</button>
                  <button onClick={() => atualizar(c.id, 'reprovar')} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Reprovar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {msg && <p className="text-center mt-6 text-gray-700">{msg}</p>}
    </section>
  );
}
