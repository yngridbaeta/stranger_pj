import { Outlet } from 'react-router-dom';
import styles from '../Style/DSGo.module.css';
import { Menu } from '../Componentes/Menu';

export function DSGo() {
    return (
        <main className={styles.corpo}>
            <Menu />
            <Outlet />
        </main>
    );
}
