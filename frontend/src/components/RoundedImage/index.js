import styles from './styles.module.css';

function RoundedImage({src, alt, width, marginBottom}) {
  return(
    <img
      className={`${styles.roundedImage} ${styles[width]} ${styles[marginBottom]}`}
      src={src}
      alt={alt}
    />
  )
}

export default RoundedImage;