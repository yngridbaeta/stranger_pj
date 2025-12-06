import { useState } from "react";
import { missoes } from "../Dados/dadosMissao";
import { MissaoCard } from "../Componentes/MissaoCard";
import { MissaoModal } from "../Componentes/MissaoModal";
import { Menu } from "../Componentes/Menu";

import styles from "../Style/Missao.module.css";

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const concluirMissao = (id) => {
    console.log("🎯 Concluindo missão com ID:", id);
    
    // Pega o inventário salvo no localStorage (se não tiver, cria um array vazio)
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    console.log("📦 Inventário atual:", inventario);
    
    // Busca os dados da missão pelo id
    const missaoData = missoes.find((m) => m.id === id);
    console.log("🔍 Missão encontrada:", missaoData);
    
    if (!missaoData) {
      console.error("❌ Missão não encontrada!");
      return;
    }
    
    // Monta uma figurinha com id, nome e imagem
    const figurinha = {
      id: missaoData.id,
      nome: missaoData.titulo || missaoData.nome,
      imagem: missaoData.imagem
    };
    console.log("🎴 Figurinha criada:", figurinha);
    
    // Evita duplicar: só adiciona se não existir ainda
    if (!inventario.some((f) => f.id === id)) {
      inventario.push(figurinha);
      console.log("✅ Figurinha adicionada ao inventário:", inventario);
      
      // Salva no localStorage a nova lista de figurinhas
      localStorage.setItem("inventario", JSON.stringify(inventario));
      console.log("💾 Inventário salvo no localStorage");
    } else {
      console.log("⚠️ Figurinha já existe no inventário");
    }
    
    // Fecha o modal
    setMissaoSelecionada(null);
    
    // Atualiza o refresh para forçar renderizar dos cards
    setRefresh((r) => r + 1);
    console.log("🔄 Refresh atualizado para:", refresh + 1);
  };

  return (
    <>
      <Menu tipo="lateral" />

      <section className={styles.conteiner}>
        <h2 className={styles.titulo}>Missões</h2>

        {/* LISTA DE MISSÕES */}
        <section className={styles.missoesGrid}>
          {missoes.map((m) => (
            <article key={`${m.id}-${refresh}`} className={styles.missaoArea}>
              <MissaoCard
                missao={m}
                onIniciarMissao={setMissaoSelecionada}
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