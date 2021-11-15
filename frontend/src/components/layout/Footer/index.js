import styles from './styles.module.css';

function Footer() {
  return(
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          <span>Get A Pet</span> &copy; 2021
        </p>
      </div>
    </footer>
  )
}

export default Footer;