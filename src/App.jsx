import Header from './components/Header/Header.jsx'
import styles from './App.module.css';
import Main from './components/Main/Main.jsx';

function App() {
  return (  
    <div className={styles.app}>
      <Header />
      <Main />
    </div>
  )
}

export default App
