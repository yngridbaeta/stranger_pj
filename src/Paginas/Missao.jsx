import { useState } from "react";
import { missoes } from "../Dados/dadosMissao";
import { MissaoCard } from "../Componentes/MissaoCard";
import { MissaoModal } from "../Componentes/MissaoModal";
import { Menu } from "../Componentes/Menu";

import styles from "../Style/Missao.module.css";

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);

  const concluirMissao = (id) => {
    setMissoesConcluidas((prev) => [...prev, id]);
    setMissaoSelecionada(null);
  };

  return (
    <>
      <Menu tipo="lateral" />

      <section className={styles.conteiner}>
        <h2 className={styles.titulo}>Missões</h2>

        {/* LISTA DE MISSÕES */}
        <section className={styles.missoesGrid}>
          {missoes.map((m) => (
            <article key={m.id} className={styles.missaoArea}>
              <MissaoCard
                missao={m}
                onIniciarMissao={setMissaoSelecionada}
                concluida={missoesConcluidas.includes(m.id)}
              />
            </article>
          ))}
        </section>

        {missaoSelecionada && (
          <MissaoModal
            missao={missaoSelecionada}
            onClose={() => setMissaoSelecionada(null)}
            onConcluir={() => concluirMissao(missaoSelecionada.id)}
          />
        )}
      </section>
    </>
  );
}
