import Map from "./components/Map/Map";
// import NewMap from "./components/Map/NewMap";
// import AnotherMap from "./components/Map/AnotherMap";
// import { lastMap } from "./components/Map/LastMap";
import styles from "./App.module.scss";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

function App() {
  return (
    <>
      <div className={styles.image}></div>
      <div className={styles.app}>
        <h1 className={styles.app__heading}>
          Find available vehicle, parking or any wonderfull place in Poland!!!
        </h1>
        <WrappingBox>
          <Map />
        </WrappingBox>
        )
      </div>
    </>
  );
}

export default App;

const WrappingBox = styled(Box)`
  width: min(1000px, 80vw);
  height: min(calc(75vh - 90px));
  border-radius: 4rem;
  box-shadow: 0 10px 50px -10px black, inset 0 0 58px -20px black;
`;
