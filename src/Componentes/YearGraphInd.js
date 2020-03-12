import React, { useContext } from 'react';
import { IndirectoContext } from '../store/indirectoStore';
import { ThemeContext } from '../store/themeStore';
import BarChart from '../Visualizaciones/BarChart';
import { filterData } from '../utils/util';

const YearGraphInd = () => {
	const theme = useContext(ThemeContext);

	const [state, dispatch] = useContext(IndirectoContext);

	const data = filterData(
		state.cleanData,
		'Valor',
		'Year',
		'Sector',
		state.selectedSector,
		'Gas',
		state.selectedGas
	);

	const colorYear = (Category, selectedCategory) => {
		let color = theme.colorIndirectos[state.selectedGas];
		if (selectedCategory !== null && +Category !== +selectedCategory) {
			color = theme.colorDefault;
		}
		return color;
	};

	return (
		<div className='graph'>
			<BarChart
				datos={data}
				margin={theme.defaultMargin}
				selectedCategory={state.selectedYear}
				onSelection={param =>
					param !== null ? dispatch({ type: 'setYear', payload: param }) : null
				}
				color={colorYear}
				widthFilter={theme.filter.width}
				heightFilter={theme.filter.height}
				colorfilterGas={theme.colorIndirectos}
				type={'Indirecto'}
			/>
		</div>
	);
};

export default YearGraphInd;