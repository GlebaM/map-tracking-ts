import MapNew from "./components/Map/Maps";
import SearchForm from "./components/Map/SearchForm";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <h1>Find available vehicle!</h1>
        <SearchForm />
      </header>
      <MapNew />
    </div>
  );
}

export default App;
