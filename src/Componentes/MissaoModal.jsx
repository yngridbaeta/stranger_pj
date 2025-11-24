import { useEffect, useRef, useState } from "react";
import styles from "../Style/MissaoModal.module.css";

export function MissaoModal({ missao, onClose, onConcluir }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();

      // Foca no input ao abrir para acessibilidade
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      setTimeout(() => {
        onConcluir(missao.id);
      }, 1000);
    } else {
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
    }
  };

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
        
        <h2 id="modal-titulo" className={styles.titulo}>
          {missao.titulo}
        </h2>

        <p id="modal-descricao" className={styles.descricao}>
          {missao.descricao}
        </p>

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

        <div className={styles.botoes}>
          <button onClick={verificarResposta} aria-label="Enviar resposta">
            Enviar
          </button>

          <button
            onClick={() => {
              dialogRef.current.close();
              onClose();
            }}
            aria-label="Fechar janela da missão"
          >
            Fechar
          </button>
        </div>

        {resultado && (
          <div
            className={styles.resultado}
            aria-live="polite"
            aria-atomic="true"
          >
            <p>{resultado}</p>

            {status === "sucesso" && missao.imagemSucesso && (
              <img
                src={missao.imagemSucesso}
                alt="Missão concluída com sucesso"
                width="100"
              />
            )}

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
