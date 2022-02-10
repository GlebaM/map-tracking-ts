import { useContext, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styles from "./SearchForm.module.scss";
import { ThemeProvider, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import MapContext from "../../store/map-context";
import { Button } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      paper: "#4095eb",
    },
    text: {
      primary: "#4095eb",
      secondary: "#9b06e0",
    },
  },
});

export default function SearchForm() {
  const mapCtx = useContext(MapContext);
  const [radioValue, setRadioValue] = useState("");
  const [batteryValue, setBatteryValue] = useState(100);

  const sliderHandler = (e: any) => {
    setBatteryValue(e.target.value);
  };

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    if (!radioValue) return;
    const isAvailable = radioValue === "available" ? true : false;
    mapCtx.filterForm(isAvailable, batteryValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <FormControl className={styles.control}>
          <FormLabel
            sx={{
              color: "text.primary",
              fontWeight: 900,
              fontSize: 18,
              pt: 2,
              textShadow: "0 0 0 transparent",
            }}
          >
            Availability
          </FormLabel>
          <RadioGroup
            className={styles.control__group}
            value={radioValue}
            defaultValue="available"
            sx={{
              color: "text.primary",
              borderBottom: "1px solid #6e0e727a",
              mx: 1,
              flexDirection: "row",
            }}
            onChange={(e) => setRadioValue(e.target.value)}
          >
            <FormControlLabel
              value="available"
              control={
                <Radio
                  size="medium"
                  color="primary"
                  sx={{ color: "text.primary", fontWeight: 700 }}
                />
              }
              label="Available"
            />
            <FormControlLabel
              value="unavailable"
              sx={{ color: "text.secondary" }}
              control={<Radio color="secondary" />}
              label="Unavailable"
            />
          </RadioGroup>
          <Box sx={{ px: 3, pt: 2 }}>
            <FormLabel
              sx={{
                color: "text.primary",
                fontWeight: 900,
                fontSize: "1.6rem",
                textShadow: "0 0 0 transparent",
              }}
            >
              Car Battery Level
            </FormLabel>
            <Slider
              size="small"
              step={5}
              defaultValue={100}
              color="secondary"
              aria-label="Slide"
              valueLabelDisplay="auto"
              sx={{ pt: 2, pb: 3 }}
              onChange={sliderHandler}
            />
          </Box>
          <Button
            type="submit"
            sx={{ alignSelf: "center", mb: 2 }}
            variant="contained"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </ThemeProvider>
  );
}
