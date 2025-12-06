// Importa as imagens utilizadas como ícones no menu
import missao from '../assets/missao_tratado.png';
import mapa from '../assets/mapa_tratado.png';
import inventario from '../assets/inventario.png';
import camera from '../assets/camera_tratado.png';

// Importa o componente Link para navegação interna do React Router
import { Link } from 'react-router-dom';

// Importa o módulo de estilos CSS específico deste componente
import styles from '../Style/Menu.module.css';

// Componente Menu – responsável pela navegação principal do app
export function Menu() {
    return (
        <nav
            className={styles.menu}        // Aplica estilo ao container do menu
            role="navigation"              // Semântico: identifica como navegação
            aria-label="Menu principal de navegação" // Acessibilidade
        >
            <ul
                className={styles.ul}      // Estilo da lista
                role="list"                // Melhora acessibilidade
            >
                {/* Item: Missões */}
                <li className={styles.li} role="listitem">
                    <Link
                        to="/dsgo/missao"          // Rota a ser acessada
                        className={styles.link}    // Estilo do link
                        aria-label="Navegar para página de Missões" // Acessibilidade
                    >
                        <figure className={styles.figure} role="group">
                            <img
                                className={styles.img}
                                src={missao}
                                alt="Ícone de missões" // Descrição para leitores de tela
                                aria-hidden="true"    // Ícone é decorativo
                            />
                            <figcaption aria-label="Missões">
                                Missões
                            </figcaption>
                        </figure>
                    </Link>
                </li>

                {/* Item: Inventário */}
                <li className={styles.li} role="listitem">
                    <Link
                        to="/dsgo/inventario"
                        className={styles.link}
                        aria-label="Navegar para página de Inventário"
                    >
                        <figure className={styles.figure} role="group">
                            <img
                                className={styles.img}
                                src={inventario}
                                alt="Ícone de inventário"
                                aria-hidden="true"
                            />
                            <figcaption aria-label="Inventário">
                                Inventário
                            </figcaption>
                        </figure>
                    </Link>
                </li>

                {/* Item: Geolocalização */}
                <li className={styles.li} role="listitem">
                    <Link
                        to="/dsgo/geolocalizacao"
                        className={styles.link}
                        aria-label="Navegar para página de GeoLocalização"
                        title="GeoLocalização" // Tooltip padrão do navegador
                    >
                        <figure className={styles.figure} role="group">
                            <img
                                className={styles.img}
                                src={mapa}
                                alt="Ícone de geolocalização"
                                aria-hidden="true"
                            />
                            <figcaption aria-label="GeoLocalização">
                                GeoLocalização
                            </figcaption>
                        </figure>
                    </Link>
                </li>

                {/* Item: Câmera */}
                <li className={styles.li} role="listitem">
                    <Link
                        to="/dsgo/camera"
                        className={styles.link}
                        aria-label="Navegar para página de Câmera"
                    >
                        <figure className={styles.figure} role="group">
                            <img
                                className={styles.img}
                                src={camera}
                                alt="Ícone de câmera"
                                aria-hidden="true"
                            />
                            <figcaption aria-label="Câmera">
                                Câmera
                            </figcaption>
                        </figure>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
