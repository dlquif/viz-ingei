import React, { useContext } from "react";
import { StoreContext } from "../store/directoStore";
import { ThemeContext } from "../store/themeStore";
import BarChart from "../Visualizaciones/BarChart";
import { filterData } from "../utils/util";

const GasGraph = () => {
  const theme = useContext(ThemeContext);

  const [state, dispatch] = useContext(StoreContext);

  const data = filterData(
    state.cleanData,
    state.selectedMetric,
    "Gas",
    "Year",
    state.selectedYear,
    "Sector",
    state.selectedSector
  );

  const colorGas = (Category, selectedCategory) => {
    let color;
    switch (Category) {
      case "N2O":
        color = theme.colorGases.N2O;
        break;
      case "CH4":
        color = theme.colorGases.CH4;
        break;
      case "CO2":
        color = theme.colorGases.CO2;
        break;
      case "HFC+SF6":
        color = theme.colorGases["HFC+SF6"];
        break;
      default:
        color = "#000000";
    }
    if (selectedCategory !== null && Category !== selectedCategory) {
      color = theme.colorDefault;
    }
    return color;
  };

  return (
    <div className="graph">
      <BarChart
        datos={data}
        margin={theme.defaultMargin}
        selectedCategory={state.selectedGas}
        onSelection={(param) => dispatch({ type: "setGas", payload: param })}
        color={colorGas}
        type={"Gas"}
      />
    </div>
  );
};

export default GasGraph;
