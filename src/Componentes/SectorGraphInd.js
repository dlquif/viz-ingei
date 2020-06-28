import React, { useContext } from "react";
import { IndirectoContext } from "../store/indirectoStore";
import { ThemeContext } from "../store/themeStore";
import BarChart from "../Visualizaciones/BarChart";
import { filterData } from "../utils/util";

const SectorGraphInd = () => {
  const theme = useContext(ThemeContext);

  const [state, dispatch] = useContext(IndirectoContext);

  const data = filterData(
    state.cleanData,
    "Valor",
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
        colorfilterGas={theme.colorIndirectos}
        type={"Indirecto"}
      />
    </div>
  );
};

export default SectorGraphInd;
