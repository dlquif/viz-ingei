import React from "react";
import "./App.css";

import Store from "./store/directoStore.js";
import IndirectoStore from "./store/indirectoStore.js";

import Metricas from "./Componentes/Metricas";
import YearGraph from "./Componentes/YearGraph";
import GasGraph from "./Componentes/GasGraph";
import SectorGraph from "./Componentes/SectorGraph";
//import SankeyGraph from './Componentes/SankeyGraph';

import SelectIndirect from "./Componentes/Indirectos.js";
import IndYearGraph from "./Componentes/YearGraphInd";
import IndSectorGraph from "./Componentes/SectorGraphInd";

import useData from "./store/useData.js";

const App = () => {
  const datos = useData();

  if (!datos) {
    return <pre>Loading...</pre>;
  }
  return (
    <div className="App">
      <div className="content">
        <section id="section-a" className="grid">
          <div className="content-wrap">
            <h1>Inventarios Nacionales de Gases de Efecto Invernadero.</h1>
            <h2>Serie 1990 - 2017</h2>
            <p className="parrafo">
              Los INGEI constituyen uno de los principales compromisos de los
              países que son Parte en la Convención Marco de las Naciones Unidas
              sobre Cambio Climático (CMNUCC). En ellos se estiman las
              cantidades de gases de efecto invernadero (GEI) que se emiten y
              capturan en el país en los sectores Energía, Procesos Industriales
              y Uso de Productos (IPPU), Agricultura, Silvicultura y Otros Usos
              del Suelo (AFOLU) y Desechos. A continuación podrá visualizar la
              serie historica de emisiones, así como las emisiones por tipo de
              GEI y por sector, y podrá filtrar haciendo clic sobre la barra
              correspondiente. Las emisiones se expresan en Gg de CO<sub>2</sub>
              - eq y se pueden visualizar bajo la métrica GWP
              <sub>100 AR2</sub> ó la métrica GTP<sub>100 AR5</sub>.
            </p>
          </div>
        </section>
        <Store data={datos}>
          <section id="section-b" className="grid">
            <div className="metricas">
              {/*<p className='parrafo'>
								Las métricas utilizadas en la estimación de emisiones son
								coeficientes numéricos usados para convertir GEI no-CO
								<sub>2</sub>, en su equivalente en CO<sub>2</sub>. El Potencial
								de Calentamiento Global (GWP, por sus siglas en inglés) es una
								medida relativa de cuánto calor puede ser atrapado por un GEI en
								un determinado período de tiempo en comparación con el CO
								<sub>2</sub>
								.El Potencial de Cambio de Temperatura Global (GTP, por sus
								siglas en inglés) refiere al cambio de la temperatura media
								global en superficie que induce un determinado GEI, respecto al
								CO
								<sub>2</sub>.
								</p>*/}
              <Metricas />
            </div>
          </section>
          <section id="section-c" className="grid">
            <h3 className="graph-title">Emisiones por año</h3>
            <YearGraph />
          </section>
          <section id="section-d" className="grid">
            <div className="gasGraph">
              <h3 className="graph/title">Emisiones por tipo de gas</h3>
              <GasGraph />
            </div>
          </section>
          <section id="section-e" className="grid">
            <div className="sectorGraph">
              <h3 className="graph/title">Emisiones por sector</h3>
              <SectorGraph />
            </div>
          </section>
          <section id="section-i" className="grid">
            {/*	<SankeyGraph />*/}
          </section>
        </Store>
        <IndirectoStore data={datos}>
          <section id="section-f" className="grid">
            <p></p>
            <h3 className="graph-title">Emisiones de Gases Precursores</h3>
            <SelectIndirect />
          </section>
          <section id="section-g" className="grid">
            <IndYearGraph />
          </section>
          <section id="section-h" className="grid">
            <IndSectorGraph />
          </section>
        </IndirectoStore>
      </div>
    </div>
  );
};

export default App;
