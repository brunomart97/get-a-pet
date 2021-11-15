import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import Logo from '../../../assets/img/logo.png';

function Navbar() {
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
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          <li>
            <Link to="/register">Cadastrar</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;