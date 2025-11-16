import { useEffect, useRef, useState } from "react";
import sucesso from "../assets/win.png";
import erro from "../assets/raios.png";
import styles from "../Style/MissaoModal.module.css";

export function MissaoModal({ missao, onClose, onConcluir }) {
  const dialogRef = useRef(null);

  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal(); // ← AGORA O BACKDROP FUNCIONA!
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
    <dialog ref={dialogRef} className={styles.modal}>
      <article className={styles.modalArea}>
        <h2 className={styles.titulo}>{missao.titulo}</h2>

        <p className={styles.descricao}>{missao.descricao}</p>

        <input
          className={styles.caixaTexto}
          type="text"
          placeholder="Digite sua resposta..."
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
        />

        <div className={styles.botoes}>
          <button onClick={verificarResposta}>Enviar</button>
          <button
            onClick={() => {
              dialogRef.current.close();
              onClose();
            }}
          >
            Fechar
          </button>
        </div>

        {resultado && (
          <div className={styles.resultado}>
            <p>{resultado}</p>

            {status === "sucesso" && (
              <img src={sucesso} alt="Missão concluída" width="100" />
            )}

            {status === "erro" && (
              <img src={erro} alt="Erro na missão" width="100" />
            )}
          </div>
        )}
      </article>
    </dialog>
  );
}
