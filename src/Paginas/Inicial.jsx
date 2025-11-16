import { Link } from 'react-router-dom';
import styles from '../Style/Inicial.module.css';

export function Inicial() {
  return (
    <main className={styles.inicial}>
      <h1 className={styles.titulo}>
        Descubra segredos que nem a Eleven ousaria enfrentar.
      </h1>
      <Link to="dsgo">
        <button
          className={styles.entrar}
          aria-label="Entrar"
        >
          Entrar no Mundo Invertido
        </button>
      </Link>
    </main>
  );
}
