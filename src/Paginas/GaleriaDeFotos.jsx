import styles from "../Style/Galeria.module.css";
import { Menu } from "../Componentes/Menu";
import { Camera } from "../Componentes/Camera";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from "react";

export function Galeria() {

    const [fotos, setFotos] = useState(() => {
        const salvas = localStorage.getItem("fotos");
        return salvas ? JSON.parse(salvas) : [];
    });

    // estado para controlar se o aviso deve aparecer
    const [mostrarAviso, setMostrarAviso] = useState(true);

    const adicionarFotoS = (novaFoto) => {

        // Impede adicionar mais fotos após o limite
        if (fotos.length >= 3) {
            setMostrarAviso(true); // reexibe caso o usuário feche
            return;
        }

        const novasFotos = [...fotos, novaFoto];

        // Ativa aviso quando atingido o limite
        if (novasFotos.length === 3) {
            setMostrarAviso(true);
        }

        setFotos(novasFotos);
        localStorage.setItem("fotos", JSON.stringify(novasFotos));
    };

    const limparGaleria = () => {
        if (!confirm("Deseja limpar a galeria?")) return;
        localStorage.removeItem("fotos");
        setFotos([]);
        setMostrarAviso(false); // some ao limpar
    };

    return (
        <>
            <Menu />

            {/* AVISO NO CANTO SUPERIOR ESQUERDO */}
            {fotos.length >= 3 && mostrarAviso && (
                <div className={styles.avisoCaixa}>
                    <span>📌 A galeria está cheia! (Máx. 3 fotos)</span>
                    <button className={styles.fecharAviso} onClick={() => setMostrarAviso(false)}>X</button>
                </div>
            )}

            <main className={styles.conteinerGaleria}>
                
                <h2 className={styles.titulo}>Captura de Imagem</h2>

                <button className={styles.botaoLimpar} onClick={limparGaleria}>
                    Limpar galeria
                </button>

                <div className={styles.paineis}>
                    
                    <section className={styles.areaCamera}>
                        <Camera onFotoTirada={adicionarFotoS} />
                    </section>

                    <aside className={styles.areaFotos}>
                        {fotos.length > 0 ? (
                            <ImageList cols={1} gap={12}>
                                {fotos.map((f, i) => (
                                    <ImageListItem key={i} className={styles.imagemItem}>
                                        <img src={f} alt={`foto ${i + 1}`} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        ) : (
                            <p className={styles.semFotos}>Nenhuma foto registrada ainda.</p>
                        )}
                    </aside>

                </div>
            </main>
        </>
    );
}
