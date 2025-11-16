import styles from "../Style/MissaoCard.module.css";

export function MissaoCard({ missao, onIniciarMissao, concluida }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.titulo}>{missao.titulo}</h3>
      <p className={styles.texto}>{missao.missao}</p>

      <button
        className={styles.botao}
        onClick={() => onIniciarMissao(missao)}
        disabled={concluida}
      >
        {concluida ? "Missão concluída" : "Iniciar Missão"}
      </button>
    </article>
  );
}
