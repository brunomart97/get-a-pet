import { Link } from 'react-router-dom';
import { useContext } from 'react';

import styles from './styles.module.css';

import Logo from '../../../assets/img/logo.png';

// Context
import { Context } from '../../../context/UserContext';

function Navbar() {
  const { authenticate, logout } = useContext(Context);

  return(
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link
          to="/"
          className={styles.navbarLogo}
        >
          <img src={Logo} alt="Get A Pet logo" />
          <h2>Get A Pet</h2>
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Adotar</Link>
          </li>
          {authenticate ? (
            <>
              <li>
                <Link to="/user/profile">Perfil</Link>
              </li>
              <li onClick={logout} className={styles.logout}>
                Sair
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
              <li>
                <Link to="/register">Cadastrar</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;