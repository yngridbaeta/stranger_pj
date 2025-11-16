import missao from '../assets/missao_tratado.png';
import mapa from '../assets/mapa_tratado.png';
import bau from '../assets/bau_tratado.png';
import camera from '../assets/camera_tratado.png';
import { Link } from 'react-router-dom';

import styles from '../Style/Menu.module.css';

export function Menu() {
    return (
        <div className={styles.menu}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link to="/dsgo/missao" className={styles.link}>
                        <figure className={styles.figure}>
                            <img className={styles.img} src={missao} alt="Missões" />
                            <figcaption>Missões</figcaption>
                        </figure>
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to="/dsgo/inventario" className={styles.link}>
                        <figure className={styles.figure}>
                            <img className={styles.img} src={bau} alt="Inventário" />
                            <figcaption>Inventário</figcaption>
                        </figure>
                    </Link>
                </li>
                <li className={styles.li}>
                    <figure className={styles.figure}>
                        <img className={styles.img} src={mapa} alt="GeoLocalização" />
                        <figcaption>GeoLocalização</figcaption>
                    </figure>
                </li>
                <li className={styles.li}>
                    <Link to="/dsgo/camera" className={styles.link}>
                        <figure className={styles.figure}>
                            <img className={styles.img} src={camera} alt="camera" />
                            <figcaption>Câmera</figcaption>
                        </figure>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
