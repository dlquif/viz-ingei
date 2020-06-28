import React, { useContext } from "react";
import { StoreContext } from "../store/directoStore";
import { ThemeContext } from "../store/themeStore";

import Logo_AFOLU from "../img/Logo_AFOLU.svg";
import Logo_Energia from "../img/Logo_Energia.svg";
import Logo_Desechos from "../img/Logo_Desechos.svg";
import Logo_IPPU from "../img/Logo_IPPU.svg";

const CircleFilter = ({ x, y, fill, onClick, text }) => {
  const theme = useContext(ThemeContext);
  return (
    <g className="svg" transform={`translate(${x}, ${y})`}>
      <circle
        className="circleFilter"
        cx={theme.filter.width / 2}
        cy={theme.filter.height / 2}
        r={Math.min(theme.filter.width / 2, theme.filter.height / 2)}
        fill={fill}
        onClick={onClick}
      />
      <text
        className="legendFilter"
        x={theme.filter.width / 2}
        y={theme.filter.height / 2 + 5}
        style={{ textAnchor: "middle", fill: "#FFFFFF" }}
      >
        {text}
      </text>
    </g>
  );
};

const Filters = ({ type, width, margin }) => {
  const theme = useContext(ThemeContext);
  const state = useContext(StoreContext)[0];
  const dispatch = useContext(StoreContext)[1];

  const FilterYear = ({ x, y }) => {
    return (
      <CircleFilter
        x={x}
        y={y}
        fill={
          state.selectedMetric === "EqGWP"
            ? theme.colorMetrics.GWP
            : theme.colorMetrics.GTP
        }
        text={state.selectedYear}
      />
    );
  };

  const FilterGas = ({ x, y }) => {
    return (
      <>
        {state.selectedGas !== null ? (
          <CircleFilter
            x={x}
            y={y}
            fill={theme.colorGases[state.selectedGas]}
            onClick={() => dispatch({ type: "setGas", payload: null })}
            text={state.selectedGas}
          />
        ) : null}
      </>
    );
  };

  const FilterSector = ({ x, y }) => {
    const setLogo = () => {
      let logo;
      switch (state.selectedSector) {
        case "AFOLU":
          logo = Logo_AFOLU;
          break;
        case "Energía":
          logo = Logo_Energia;
          break;
        case "Desechos":
          logo = Logo_Desechos;
          break;
        case "IPPU":
          logo = Logo_IPPU;
          break;
        default:
          logo = null;
      }
      return logo;
    };

    return (
      <g className="svg" transform={`translate(${x}, ${y})`}>
        {state.selectedSector !== null ? (
          <image
            width={theme.filter.width}
            height={theme.filter.height}
            href={setLogo()}
            alt="Sector"
            onClick={() => dispatch({ type: "setSector", payload: null })}
          ></image>
        ) : null}
      </g>
    );
  };

  let result;
  switch (type) {
    case "Year":
      result = (
        <g>
          <FilterGas x={width - margin.right + 5} y={margin.top} />
          <FilterSector
            x={width - margin.right + 5}
            y={margin.top + theme.filter.height + 5}
          />
        </g>
      );
      break;
    case "Sector":
      result = (
        <g>
          <FilterYear x={width - margin.right + 5} y={margin.top} />
          <FilterGas
            x={width - margin.right + 5}
            y={margin.top + theme.filter.height + 5}
          />
        </g>
      );
      break;
    case "Gas":
      result = (
        <g>
          <FilterYear x={width - margin.right + 5} y={margin.top} />
          <FilterSector
            x={width - margin.right + 5}
            y={margin.top + theme.filter.height + 5}
          />
        </g>
      );
      break;
    case "Indirecto":
      result = <g></g>;
      break;
    default:
      throw new Error("Graph type must be defined");
  }
  return result;
};

export default Filters;
