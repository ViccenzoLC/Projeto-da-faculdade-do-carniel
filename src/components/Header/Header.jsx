import styles from './Header.module.css';
import logo from '../../assets/imagens/logo.jpeg';  
function Header() {
  return (
    <header className={styles.header}>  
          <img src={logo} alt="Logo" className={styles.logo} />   
    </header>
  );
}

export default Header;