"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Reuniao {
  id: number;
  titulo: string;
  datahora: string;
  local: string;
}

export default function ReunioesPage() {
  const [reunioes, setReunioes] = useState<Reuniao[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchReunioes = async () => {
      try {
        const res = await axios.get("https://projeto-networking.onrender.com/api/reunioes");
        setReunioes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReunioes();
  }, []);

  const handleCheckIn = async (id: number) => {
    try {
      await axios.post(`https://projeto-networking.onrender.com/api/reunioes/${id}/checkin`, { membroId: 1 });
      setFeedback("Check-in realizado com sucesso!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error(err);
      setFeedback("Erro ao registrar presença.");
    }
  };

  if (loading) return <p className="feedback">Carregando reuniões...</p>;

  return (
    <div className="reunioes-container">
      <h1>Reuniões</h1>

      {feedback && <p className="feedback">{feedback}</p>}

      <div className="cards">
        {reunioes.map((r) => (
          <div key={r.id} className="card">
            <h2>{r.titulo}</h2>
            <p>Data: {new Date(r.datahora).toLocaleDateString()}</p>
            <p>Hora: {new Date(r.datahora).toLocaleTimeString()}</p>
            <p>Local: {r.local}</p>
            <button className="checkinButton" onClick={() => handleCheckIn(r.id)}>
              Registrar Presença
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
