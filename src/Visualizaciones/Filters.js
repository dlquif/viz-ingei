import React, { useContext } from 'react';
import { StoreContext } from '../store/directoStore';

import Logo_AFOLU from '../img/Logo_AFOLU.svg';
import Logo_Energia from '../img/Logo_Energia.svg';
import Logo_Desechos from '../img/Logo_Desechos.svg';
import Logo_IPPU from '../img/Logo_IPPU.svg';

const FilterGas = ({ width, height, x, y, color }) => {
	const [state, dispatch] = useContext(StoreContext);

	return (
		<g className='svg' transform={`translate(${x}, ${y})`}>
			{state.selectedGas !== null ? (
				<>
					<circle
						className='bars'
						cx={width / 2}
						cy={height / 2}
						r={Math.min(width / 2, height / 2)}
						fill={color[state.selectedGas]}
						onClick={() => dispatch({ type: 'setGas', payload: null })}
					/>
					<text
						className='legendFilter'
						x={width / 2}
						y={height / 2 + 5}
						style={{ textAnchor: 'middle', fill: '#FFFFFF' }}
					>
						{state.selectedGas}
					</text>
				</>
			) : null}
		</g>
	);
};

const FilterYear = ({ width, height, x, y, color }) => {
	const state = useContext(StoreContext)[0];
	return (
		<g className='svg' transform={`translate(${x}, ${y})`}>
			<circle
				className='circleFilter'
				cx={width / 2}
				cy={height / 2}
				r={Math.min(width / 2, height / 2)}
				fill={state.selectedMetric === 'EqGWP' ? color.GWP : color.GTP}
			/>
			<text
				className='legendFilter'
				x={width / 2}
				y={height / 2 + 5}
				style={{ textAnchor: 'middle', fill: '#FFFFFF' }}
			>
				{state.selectedYear}
			</text>
		</g>
	);
};

const FilterSector = ({ width, height, x, y }) => {
	const [state, dispatch] = useContext(StoreContext);

	const setLogo = () => {
		let logo;
		switch (state.selectedSector) {
			case 'AFOLU':
				logo = Logo_AFOLU;
				break;
			case 'Energía':
				logo = Logo_Energia;
				break;
			case 'Desechos':
				logo = Logo_Desechos;
				break;
			case 'IPPU':
				logo = Logo_IPPU;
				break;
			default:
				logo = null;
		}
		return logo;
	};

	return (
		<g className='svg' transform={`translate(${x}, ${y})`}>
			{state.selectedSector !== null ? (
				<image
					width={width}
					height={height}
					href={setLogo()}
					alt='Sector'
					onClick={() => dispatch({ type: 'setSector', payload: null })}
				></image>
			) : null}
		</g>
	);
};

const Filters = ({
	type,
	width,
	widthFilter,
	heightFilter,
	margin,
	colorfilterGas,
	colorMetrics
}) => {
	let result;
	switch (type) {
		case 'Year':
			result = (
				<g>
					<FilterGas
						width={widthFilter}
						height={heightFilter}
						x={width - margin.right + 5}
						y={margin.top}
						color={colorfilterGas}
					/>
					<FilterSector
						width={widthFilter}
						height={heightFilter}
						x={width - margin.right + 5}
						y={margin.top + heightFilter + 5}
					/>
				</g>
			);
			break;
		case 'Sector':
			result = (
				<g>
					<FilterYear
						width={widthFilter}
						height={heightFilter}
						x={width - margin.right + 5}
						y={margin.top}
						color={colorMetrics}
					/>
					<FilterGas
						width={widthFilter}
						height={heightFilter}
						x={width - margin.right + 5}
						y={margin.top + heightFilter + 5}
						color={colorfilterGas}
					/>
				</g>
			);
			break;
		case 'Gas':
			result = (
				<g>
					<FilterYear
						width={widthFilter}
						height={heightFilter}
						x={width - margin.right + 5}
						y={margin.top}
						color={colorMetrics}
					/>
					<FilterSector
						width={widthFilter}
						height={heightFilter}
						x={width - margin.right + 5}
						y={margin.top + heightFilter + 5}
					/>
				</g>
			);
			break;
		case 'Indirecto':
			result = <g></g>;
			break;
		default:
			throw new Error('Graph type must be defined');
	}
	return result;
};

export default Filters;