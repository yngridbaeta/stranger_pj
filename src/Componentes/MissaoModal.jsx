import { useEffect, useRef, useState } from "react";
import styles from "../Style/MissaoModal.module.css";

export function MissaoModal({ missao, onClose, onConcluir }) {
  // Referência para o elemento <dialog>
  const dialogRef = useRef(null);

  // Referência para o input, usada para focar automaticamente
  const inputRef = useRef(null);

  // Estado que armazena o texto digitado pelo usuário
  const [resposta, setResposta] = useState("");

  // Guarda a mensagem final ("correto" / "incorreto")
  const [resultado, setResultado] = useState(null);

  // Define se o status é de sucesso ou erro
  const [status, setStatus] = useState(null);

  // ------------------------------
  // ABRE O MODAL AUTOMATICAMENTE
  // ------------------------------
  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();

      // Foca no input após abrir (acessibilidade + UX)
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  // ------------------------------
  // FUNÇÃO PARA VALIDAR E VERIFICAR A RESPOSTA
  // ------------------------------
  const verificarResposta = () => {
    // Impede envio vazio
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    // Compara ignorando maiúsculas/minúsculas e espaços extras
    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      // Aguarda 1s antes de concluir a missão
      setTimeout(() => {
        onConcluir(missao.id);
      }, 1000);

    } else {
      // Se estiver errado
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
    }
  };

  // ------------------------------
  // ESTRUTURA DO MODAL
  // ------------------------------
  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby="modal-titulo"
      aria-describedby="modal-descricao"
      role="dialog"
      aria-modal="true"
    >
      <article className={styles.modalArea}>

        {/* Título da missão */}
        <h2 id="modal-titulo" className={styles.titulo}>
          {missao.titulo}
        </h2>

        {/* Descrição / Enunciado */}
        <p id="modal-descricao" className={styles.descricao}>
          {missao.descricao}
        </p>

        {/* Campo de resposta */}
        <label htmlFor="resposta" className={styles.label}>
          Sua resposta:
        </label>

        <input
          id="resposta"
          ref={inputRef}
          className={styles.caixaTexto}
          type="text"
          placeholder="Digite sua resposta..."
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          aria-required="true"
        />

        {/* Botões de ação */}
        <div className={styles.botoes}>
          <button
            onClick={verificarResposta}
            aria-label="Enviar resposta"
          >
            Enviar
          </button>

          <button
            onClick={() => {
              dialogRef.current.close(); // fecha o modal manualmente
              onClose(); // notifica o componente pai
            }}
            aria-label="Fechar janela da missão"
          >
            Fechar
          </button>
        </div>

        {/* Área de resultado (aparece apenas se houver resposta) */}
        {resultado && (
          <div
            className={styles.resultado}
            aria-live="polite"
            aria-atomic="true"
          >
            <p>{resultado}</p>

            {/* Imagem de sucesso */}
            {status === "sucesso" && missao.imagemSucesso && (
              <img
                src={missao.imagemSucesso}
                alt="Missão concluída com sucesso"
                width="100"
              />
            )}

            {/* Imagem de erro */}
            {status === "erro" && missao.imagemErro && (
              <img
                src={missao.imagemErro}
                alt="Resposta incorreta"
                width="100"
              />
            )}
          </div>
        )}

      </article>
    </dialog>
  );
}
