import React, { useContext } from "react";
import { StoreContext } from "../store/directoStore";
import { ThemeContext } from "../store/themeStore";
import BarChart from "../Visualizaciones/BarChart";
import { filterData } from "../utils/util";

const SectorGraph = () => {
  const theme = useContext(ThemeContext);

  const [state, dispatch] = useContext(StoreContext);

  const data = filterData(
    state.cleanData,
    state.selectedMetric,
    "Sector",
    "Year",
    Number(state.selectedYear),
    "Gas",
    state.selectedGas
  );

  const colorSector = (Categoria, selectedCategoria) => {
    let color;
    switch (Categoria) {
      case "Energía":
        color = theme.colorSector["Energía"];
        break;
      case "IPPU":
        color = theme.colorSector.IPPU;
        break;
      case "AFOLU":
        color = theme.colorSector.AFOLU;
        break;
      case "Desechos":
        color = theme.colorSector.Desechos;
        break;
      default:
        color = "#000000";
    }
    if (selectedCategoria !== null && Categoria !== selectedCategoria) {
      color = theme.colorDefault;
    }
    return color;
  };

  return (
    <div className="graph">
      <BarChart
        datos={data}
        margin={theme.defaultMargin}
        selectedCategory={state.selectedSector}
        onSelection={(param) => dispatch({ type: "setSector", payload: param })}
        color={colorSector}
        type={"Sector"}
      />
    </div>
  );
};

export default SectorGraph;
