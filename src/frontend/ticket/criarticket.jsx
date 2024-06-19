import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./criarticket.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CriarTicket() {
  const [nome, setNome] = useState("");
  const [produto, setProduto] = useState("");
  const [data, setData] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/ticket", {
        nome,
        produto,
        data,
        whatsapp,
        mensagem,
      });

      console.log(response.data.message); // Mensagem de sucesso do backend
      toast.success("Ticket criado com sucesso!", {
        className: "custom-toast-success",
      });

      // Limpar o formulário após o envio
      setNome("");
      setProduto("");
      setData("");
      setWhatsapp("");
      setMensagem("");

    } catch (error) {
      console.error("Erro ao enviar o ticket:", error);
      toast.error("Erro ao criar ticket. Tente novamente mais tarde.", {
        className: "custom-toast-error",
      });
    }
  };

  const handleWhatsappChange = (e) => {
    let formattedWhatsapp = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (formattedWhatsapp.length > 2) {
      formattedWhatsapp = `(${formattedWhatsapp.slice(0, 2)}) ${formattedWhatsapp.slice(2)}`; // Adiciona parênteses após os primeiros dois dígitos
    }
    if (formattedWhatsapp.length > 10) {
      formattedWhatsapp = `${formattedWhatsapp.slice(0, 10)}-${formattedWhatsapp.slice(10)}`; // Adiciona traço após os primeiros dez dígitos
    }
    setWhatsapp(formattedWhatsapp);
  };

  return (
    <div className="custom-container">
      <div className="card p-5 shadow">
        <h1 className="text-center mb-4">Criar Ticket</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="produto" className="form-label">
              Produto
            </label>
            <input
              type="text"
              className="form-control"
              id="produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="data" className="form-label">
              Data de compra
            </label>
            <input
              type="date"
              className="form-control"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="whatsapp" className="form-label">
              WhatsApp
            </label>
            <input
              type="text"
              className="form-control"
              id="whatsapp"
              value={whatsapp}
              onChange={handleWhatsappChange}
              placeholder="(99) 99999-9999"
              maxLength="15"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mensagem" className="form-label">
              Mensagem
            </label>
            <textarea
              className="form-control"
              id="mensagem"
              rows="5"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-custom">
              Enviar Ticket
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default CriarTicket;
