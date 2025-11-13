"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CandidaturaPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [whyUs, setWhyUs] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://projeto-networking.onrender.com/api/addcandidato",
        { nome, email, empresa, whyUs, senha }
      );

      if (res.status === 201) {
        setMessage("Cadastro enviado com sucesso!");
        // Redireciona para login após 2 segundos
        setTimeout(() => router.push("/"), 2000);
      } else {
        setMessage("Erro ao enviar cadastro.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(
        err.response?.data?.error || "Erro ao conectar com o servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Cadastro de Candidato</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Empresa atual"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Por que deseja participar?"
            value={whyUs}
            onChange={(e) => setWhyUs(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar cadastro"}
          </button>
        </form>

        {message && <p className="feedback">{message}</p>}

        <p className="cadastro-link">
          Já tem login? <a href="/">Entre aqui</a>
        </p>
      </div>
    </div>
  );
}
