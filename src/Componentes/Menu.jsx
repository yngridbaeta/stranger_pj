import missao from '../assets/missao_tratado.png';
import mapa from '../assets/mapa_tratado.png';
import inventario from '../assets/inventario.png';
import camera from '../assets/camera_tratado.png';
import { Link } from 'react-router-dom';

import styles from '../Style/Menu.module.css';

export function Menu() {
    return (
        <nav
            className={styles.menu}
            role="navigation"
            aria-label="Menu principal de navegação"
        >
            <ul
                className={styles.ul}
                role="list"
            >
                <li className={styles.li} role="listitem">
                    <Link
                        to="/dsgo/missao"
                        className={styles.link}
                        aria-label="Navegar para página de Missões"
                    >
                        <figure className={styles.figure} role="group">
                            <img
                                className={styles.img}
                                src={missao}
                                alt="Ícone de missões"
                                aria-hidden="true"
                            />
                            <figcaption aria-label="Missões">Missões</figcaption>
                        </figure>
                    </Link>
                </li>

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
                            <figcaption aria-label="Inventário">Inventário</figcaption>
                        </figure>
                    </Link>
                </li>

                <li className={styles.li} role="listitem">
                    <Link
                        to="/dsgo/geolocalizacao"
                        className={styles.link}
                        aria-label="Navegar para página de GeoLocalização"
                        title="GeoLocalização"
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
                            <figcaption aria-label="Câmera">Câmera</figcaption>
                        </figure>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}