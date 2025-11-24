import styles from "../Style/MissaoCard.module.css";

export function MissaoCard({ missao, onIniciarMissao, concluida }) {
  return (
    <article 
      className={styles.card}
      role="article"
      aria-labelledby={`missao-titulo-${missao.id || missao.titulo.replace(/\s+/g, '-').toLowerCase()}`}
      aria-describedby={`missao-descricao-${missao.id || missao.titulo.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <h3 
        className={styles.titulo}
        id={`missao-titulo-${missao.id || missao.titulo.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {missao.titulo}
      </h3>
      
      <p 
        className={styles.texto}
        id={`missao-descricao-${missao.id || missao.titulo.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {missao.missao}
      </p>

      <button
        className={styles.botao}
        onClick={() => onIniciarMissao(missao)}
        disabled={concluida}
        aria-disabled={concluida}
        aria-label={concluida 
          ? `Missão ${missao.titulo} já foi concluída` 
          : `Iniciar missão ${missao.titulo}`
        }
        type="button"
      >
        {concluida ? (
          <>
            <span aria-hidden="true">✓</span> Missão concluída
          </>
        ) : (
          <>
            <span aria-hidden="true">▶</span> Iniciar Missão
          </>
        )}
      </button>
      
      {/* Status visual oculto para leitores de tela */}
      <span className={styles.srOnly} role="status">
        {concluida ? "Esta missão está completa" : "Esta missão está disponível"}
      </span>
    </article>
  );
}