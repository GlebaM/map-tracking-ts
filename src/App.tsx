import MapNew from "./components/Map/MapNew";
import styles from "./App.module.scss";
// import "dotenv/config";
// require("dotenv").config();

function App() {
  console.log(process.env.PUBLIC_URL);
  console.log(process.env.GOOGLE_KEY);
  return (
    <div className={styles.app}>
      <h1 className={styles.app__heading}>
        Find available vehicle, parking or any wonderfull place in Poland!!!
      </h1>
      <MapNew />
    </div>
  );
}

export default App;
