"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Candidato {
  id: number;
  nome: string;
  email: string;
  empresa: string;
  whyUs: string;
  aprovacao: string;
}

export default function AdminPage() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const res = await axios.get("https://projeto-networking.onrender.com/api/admin");
        setCandidatos(res.data);
      } catch (err) {
        console.error(err);
        setFeedback("Erro ao carregar candidatos.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatos();
  }, []);

  const handleAprovar = async (id: number) => {
    try {
      await axios.patch(`https://projeto-networking.onrender.com/api/aprovar/${id}`);
      setCandidatos((prev) =>
        prev.map((c) => (c.id === id ? { ...c, aprovacao: "aprovado" } : c))
      );
      setFeedback("Candidato aprovado com sucesso!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error(err);
      setFeedback("Erro ao aprovar candidato.");
    }
  };

  const handleReprovar = async (id: number) => {
    try {
      await axios.patch(`https://projeto-networking.onrender.com/api/reprovar/${id}`);
      setCandidatos((prev) =>
        prev.map((c) => (c.id === id ? { ...c, aprovacao: "reprovado" } : c))
      );
      setFeedback("Candidato reprovado com sucesso!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error(err);
      setFeedback("Erro ao reprovar candidato.");
    }
  };

  if (loading) return <p className="feedback">Carregando candidatos...</p>;

  return (
    <div className="admin-container">
      <h1>Admin - Candidatos</h1>

      {feedback && <p className="feedback">{feedback}</p>}

      <table className="candidatos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Empresa</th>
            <th>Por que participar</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.email}</td>
              <td>{c.empresa}</td>
              <td>{c.whyUs}</td>
              <td>{c.aprovacao}</td>
              <td>
                <button className="aprovar" onClick={() => handleAprovar(c.id)}>Aprovar</button>
                <button className="reprovar" onClick={() => handleReprovar(c.id)}>Reprovar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
