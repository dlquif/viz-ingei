import React, { useContext } from "react";
import { StoreContext } from "../store/directoStore";
import { ThemeContext } from "../store/themeStore";
import BarChart from "../Visualizaciones/BarChart";
import { filterData } from "../utils/util";

const YearGraph = () => {
  const theme = useContext(ThemeContext);

  const [state, dispatch] = useContext(StoreContext);

  const data = filterData(
    state.cleanData,
    state.selectedMetric,
    "Year",
    "Sector",
    state.selectedSector,
    "Gas",
    state.selectedGas
  );

  const colorYear = (Category, selectedCategory) => {
    let color;
    switch (state.selectedMetric) {
      case "EqGWP":
        color = theme.colorMetrics.GWP;
        break;
      case "EqGTP":
        color = theme.colorMetrics.GTP;
        break;
      default:
        color = "#000000";
    }
    if (selectedCategory !== null && +Category !== +selectedCategory) {
      color = theme.colorDefault;
    }
    return color;
  };

  return (
    <div className="graph">
      <BarChart
        datos={data}
        margin={theme.defaultMargin}
        selectedCategory={state.selectedYear}
        onSelection={(param) =>
          param !== null ? dispatch({ type: "setYear", payload: param }) : null
        }
        color={colorYear}
        type={"Year"}
      />
    </div>
  );
};

export default YearGraph;
