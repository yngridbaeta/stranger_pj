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

    const adicionarFotoS = (novaFoto) => {
        const novasFotos = [...fotos, novaFoto];
        setFotos(novasFotos);
        localStorage.setItem("fotos", JSON.stringify(novasFotos));
    };

    const limparGaleria = () => {
        if (!confirm("Deseja limpar a galeria?")) return;
        localStorage.removeItem("fotos");
        setFotos([]); // limpa certo
    };

    return (
        <>
            <Menu /> 

            <main className={styles.conteinerGaleria}>
                <h2 className={styles.titulo}>Captura de Imagem</h2>

                <button className={styles.botaoLimpar} onClick={limparGaleria}>
                    Limpar galeria
                </button>

                <div className={styles.paineis}>
                    
                    {/* CÂMERA */}
                    <section className={styles.areaCamera}>
                        <Camera onFotoTirada={adicionarFotoS} />
                    </section>

                    {/* GALERIA */}
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
