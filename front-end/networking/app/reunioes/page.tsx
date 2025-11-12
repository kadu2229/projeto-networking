'use client';
import { useEffect, useState } from 'react';

interface Reuniao {
  id: number;
  titulo: string;
  datahora: string;
  local: string;
}

export default function ReunioesPage() {
  const [reunioes, setReunioes] = useState<Reuniao[]>([]);
  const [msg, setMsg] = useState('');

  const carregar = async () => {
    const res = await fetch('http://localhost:3001/reunioes');
    const data = await res.json();
    setReunioes(data);
  };

  const checkin = async (id: number) => {
    await fetch(`http://localhost:3001/reunioes/${id}/checkin`, { method: 'POST' });
    setMsg('✅ Presença registrada!');
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">Reuniões e Check-in</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reunioes.map(r => (
          <div key={r.id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl border border-gray-100 transition">
            <h2 className="text-xl font-semibold mb-2">{r.titulo}</h2>
            <p className="text-gray-600"><strong>Data:</strong> {new Date(r.datahora).toLocaleString()}</p>
            <p className="text-gray-600"><strong>Local:</strong> {r.local}</p>
            <button onClick={() => checkin(r.id)} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
              Fazer Check-in
            </button>
          </div>
        ))}
      </div>
      {msg && <p className="text-center mt-8 text-gray-700">{msg}</p>}
    </section>
  );
}
