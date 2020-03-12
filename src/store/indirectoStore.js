import React, { createContext, useReducer } from 'react';
import data from '../data/data.json';

export const IndirectoContext = createContext({});

let initialYear = 2017,
	initialGas = 'NMVOCs',
	initialSector = null,
	cleanData = data.filter(
		d =>
			d['Sector'] !== 'Partidas Informativas' &&
			d['Gas'] !== 'CO2' &&
			d['Gas'] !== 'N2O' &&
			d['Gas'] !== 'CH4' &&
			d['Gas'] !== 'HFC+SF6'
	);

const initialState = {
	selectedYear: initialYear,
	selectedGas: initialGas,
	selectedSector: initialSector,
	cleanData: cleanData
};

const SelectionReducer = (state, action) => {
	switch (action.type) {
		case 'setYear':
			return {
				...state,
				selectedYear: +action.payload
			};
		case 'setGas':
			return {
				...state,
				selectedGas: action.payload,
				selectedSector: null
			};
		case 'setSector':
			return {
				...state,
				selectedSector: action.payload
			};
		default:
			throw new Error('Action type must be defined');
	}
};

const IndirectoStore = ({ children }) => {
	const [state, dispatch] = useReducer(SelectionReducer, initialState);

	return (
		<IndirectoContext.Provider value={[state, dispatch]}>
			{children}
		</IndirectoContext.Provider>
	);
};

export default IndirectoStore;
