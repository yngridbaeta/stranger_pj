import styles from "../Style/MissaoCard.module.css";

export function MissaoCard({ missao, onIniciarMissao }) {
  // Recupera o inventario do localStorage
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  
  // Verifica se a missão já foi concluída
  const isConcluida = inventario.some((f) => f.id === missao.id);

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
        disabled={isConcluida}
        aria-disabled={isConcluida}
        aria-label={isConcluida 
          ? `Missão ${missao.titulo} já foi concluída` 
          : `Iniciar missão ${missao.titulo}`
        }
        type="button"
      >
        {isConcluida ? (
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
        {isConcluida ? "Esta missão está completa" : "Esta missão está disponível"}
      </span>
    </article>
  );
}