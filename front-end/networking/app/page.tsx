"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://projeto-networking.onrender.com/api/login",
        { email, senha }
      );

      // Redireciona conforme role retornada do backend
      if (res.data.role === "admin") {
        router.push("/admin");
      } else if (res.data.role === "candidato") {
        router.push("/reunioes");
      } else {
        setMessage("E-mail ou senha incorretos!");
      }
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("Erro ao conectar com o servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Networking Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {message && <p className="feedback">{message}</p>}

        {/* Link para cadastro */}
        <p className="cadastro-link">
          Ainda não tem login? <a href="/candidatura">Crie sua intenção aqui</a>
        </p>

        <p>© {new Date().getFullYear()} Networking</p>
      </div>
    </div>
  );
}
