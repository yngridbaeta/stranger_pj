// Importa o módulo de estilos CSS modular
import styles from "../Style/Galeria.module.css";

// Importa componentes reutilizáveis
import { Menu } from "../Componentes/Menu";
import { Camera } from "../Componentes/Camera";

// Importa componentes do Material UI
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Importa o hook useState do React
import { useState } from "react";

export function Galeria() {

    // useState para armazenar fotos, carregando inicialmente do localStorage
    const [fotos, setFotos] = useState(() => {
        const salvas = localStorage.getItem("fotos");
        return salvas ? JSON.parse(salvas) : []; // Se houver fotos salvas, carrega; caso contrário, cria lista vazia
    });

    // Função que adiciona uma nova foto à galeria
    const adicionarFotoS = (novaFoto) => {
        const novasFotos = [...fotos, novaFoto]; // copia e adiciona a nova foto
        setFotos(novasFotos); // atualiza estado
        localStorage.setItem("fotos", JSON.stringify(novasFotos)); // salva atualização no localStorage
    };

    // Função que limpa toda a galeria
    const limparGaleria = () => {
        if (!confirm("Deseja limpar a galeria?")) return; // exibe confirmação
        localStorage.removeItem("fotos"); // remove do localStorage
        setFotos([]); // limpa estado local
    };

    return (
        <>
            {/* Menu fixo no topo */}
            <Menu /> 

            <main className={styles.conteinerGaleria}>
                
                {/* Título da página */}
                <h2 className={styles.titulo}>Captura de Imagem</h2>

                {/* Botão para limpar toda a galeria */}
                <button className={styles.botaoLimpar} onClick={limparGaleria}>
                    Limpar galeria
                </button>

                <div className={styles.paineis}>
                    
                    {/* Área da câmera */}
                    <section className={styles.areaCamera}>
                        {/* Componente da câmera — dispara onFotoTirada quando uma foto é capturada */}
                        <Camera onFotoTirada={adicionarFotoS} />
                    </section>

                    {/* Área da galeria de fotos */}
                    <aside className={styles.areaFotos}>

                        {/* Se houver fotos, exibe a lista */}
                        {fotos.length > 0 ? (
                            <ImageList cols={1} gap={12}>
                                
                                {/* Mapeia cada foto salva e renderiza um item */}
                                {fotos.map((f, i) => (
                                    <ImageListItem key={i} className={styles.imagemItem}>
                                        <img src={f} alt={`foto ${i + 1}`} />
                                    </ImageListItem>
                                ))}

                            </ImageList>
                        ) : (
                            // Caso não haja nenhuma foto salva
                            <p className={styles.semFotos}>
                                Nenhuma foto registrada ainda.
                            </p>
                        )}
                    </aside>

                </div>
            </main>
        </>
    );
}
