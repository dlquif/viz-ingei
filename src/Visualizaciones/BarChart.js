import React, { useEffect, useRef, useMemo } from "react";
import {
  select,
  axisBottom,
  axisLeft,
  scaleLinear,
  scaleBand,
  easeCubicInOut,
} from "d3";
import Filters from "./Filters";
import { findMinMax } from "../utils/util";
import { useDimensions } from "../utils/customHooks";

function Axis(axis, x, y) {
  const ref = useRef();
  select(ref.current)
    .transition()
    .duration(750)
    .ease(easeCubicInOut)
    .call(axis)
    .attr("transform", `translate(${x} , ${y} )`);
  return ref;
}
function Unidades(type, elemento) {
  if (type === "Indirecto") {
    elemento.append("tspan").style("font-weight", "normal").text(" Gg Gas");
  } else {
    elemento
      .append("tspan")
      .style("font-weight", "normal")
      .text(" Gg CO")
      .append("tspan")
      .text("2")
      .style("baseline-shift", "sub")
      .append("tspan")
      .text("- eq");
  }
}

export default function BarChart({
  datos,
  margin,
  barPadding = 0.2,
  factor = 1.1,
  numTicks = 7,
  onSelection = null,
  selectedCategory,
  color,
  type,
}) {
  const [refSVG, dimensions] = useDimensions({ width: 0, height: 250 });

  const widthScale = useMemo(
    () =>
      scaleBand()
        .range([margin.left, dimensions.width - margin.right])
        .padding(barPadding)
        .domain(datos.map((d) => d.Category)),
    [datos, margin, dimensions]
  );

  const heightScale = useMemo(
    () =>
      scaleLinear()
        .range([dimensions.height - margin.bottom, margin.top])
        .domain([
          Math.min(0, findMinMax(datos, "Variable")[0] * factor),
          Math.max(0, findMinMax(datos, "Variable")[1] * factor),
        ]),
    [datos, margin, dimensions]
  );

  const refXAxis = Axis(axisBottom(widthScale), 0, heightScale(0));
  const refYAxis = Axis(axisLeft(heightScale).ticks(numTicks), margin.left, 0);

  useEffect(() => {
    const handleClick = (param) => {
      if (param !== selectedCategory) {
        onSelection(param);
      } else {
        onSelection(null);
      }
      select(refSVG.current).selectAll(".tooltip").remove();
    };

    const handleMouseOver = (param) => {
      let x = widthScale(param.Category);
      let y =
        param.Variable >= 0
          ? heightScale(Math.max(0, param.Variable)) - 8
          : heightScale(0) +
            Math.abs(heightScale(0) - heightScale(param.Variable)) +
            15;

      const tooltip = select(refSVG.current)
        .append("text")
        .attr("class", "tooltip")
        .attr("id", "idt" + param.Category.substr(-3))
        .text(
          param.Variable.toLocaleString("es-UY", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        )
        .style("font-weight", "bold")
        .attr("transform", `translate(${x} , ${y} )`);

      Unidades(type, tooltip);
    };

    const handleMouseOut = (param) => {
      select(refSVG.current);
      select("#idt" + param.Category.substr(-3)).remove();
    };

    select(refSVG.current)
      .selectAll(".bar")
      .lower()
      .data(datos)
      .join("rect")
      .attr("class", "bar")
      .attr("rx", "2")
      .attr("ry", "2")
      .on("click", (d) => handleClick(d.Category))
      .on("mouseover", (d) => handleMouseOver(d))
      .on("mouseout", (d) => handleMouseOut(d))
      .transition()
      .duration(750)
      .ease(easeCubicInOut)
      .attr("x", (d) => widthScale(d.Category))
      .attr("y", (d) => heightScale(Math.max(0, d.Variable)))
      .attr("width", widthScale.bandwidth())
      .attr("height", (d) => Math.abs(heightScale(0) - heightScale(d.Variable)))
      .attr("fill", (d) => color(d.Category, selectedCategory));
  }, [datos, selectedCategory, dimensions]);

  return (
    <div>
      <svg className="svg" ref={refSVG} width="100%" height={dimensions.height}>
        <g className="xAxis" ref={refXAxis} />
        <g className="yAxis" ref={refYAxis}>
          <g
            className="yAxisTitle"
            transform={`translate(-45, ${
              (dimensions.height - margin.bottom + margin.top) / 2
            })`}
          >
            <text
              className="legendTitle"
              transform={`rotate(-90)`}
              style={{ textAnchor: "middle" }}
            >
              {type === "Indirecto" ? (
                <tspan>Gg Gas</tspan>
              ) : (
                <tspan>
                  Gg CO
                  <tspan baselineShift="sub">2</tspan>- eq
                </tspan>
              )}
            </text>
          </g>
        </g>
        <Filters type={type} width={dimensions.width} margin={margin} />
      </svg>
    </div>
  );
}
