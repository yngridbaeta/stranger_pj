import { useEffect, useState } from "react";
import { Menu } from "../Componentes/Menu";
import styles from "../Style/Inventario.module.css";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);

  useEffect(() => {
    // Carrega o inventário salvo no localStorage ao abrir a página
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  const limparInventario = () => {
    // pede confirmação ao usuário
    if (!window.confirm("Deseja realmente limpar o inventário?")) return;

    // remove o item do localStorage
    localStorage.removeItem("inventario");

    // atualiza o estado local para refletir a limpeza na UI
    setFigurinhas([]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Menu tipo="lateral" />
      <main className={styles.conteiner} style={{ flex: 1 }}>
        <section className={styles.inventario}>
          <h2>Inventário</h2>
          <button className={styles.limparInventario} onClick={limparInventario}>
            Limpar Inventário
          </button>
          {/* Caso o jogador ainda não tenha nenhuma figurinha */}
          {figurinhas.length === 0 ? (
            <p className={styles.vazio}>Nenhuma figurinha coletada ainda!</p>
          ) : (
            <div className={styles.grid}>
              {figurinhas.map((f) => (
                <div key={f.id} className={styles.figurinha}>
                  <img src={f.imagem} alt={f.nome} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}