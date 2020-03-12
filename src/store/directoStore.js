import React, { createContext, useReducer } from 'react';
import data from '../data/data.json';

export const StoreContext = createContext({});

let initialYear = 2017,
	initialGas = null,
	initialSector = null,
	initialMetric = 'EqGWP',
	cleanData = data.filter(
		d =>
			d['Sector'] !== 'Partidas Informativas' &&
			d['Gas'] !== 'PFCS' &&
			d['Gas'] !== 'NMVOCs' &&
			d['Gas'] !== 'NOx' &&
			d['Gas'] !== 'SO2' &&
			d['Gas'] !== 'CO'
	);

const initialState = {
	selectedYear: initialYear,
	selectedGas: initialGas,
	selectedSector: initialSector,
	selectedMetric: initialMetric,
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
				selectedGas: action.payload
			};
		case 'setSector':
			return {
				...state,
				selectedSector: action.payload
			};
		case 'setMetric':
			return {
				...state,
				selectedMetric: action.payload
			};
		default:
			throw new Error('Action type must be defined');
	}
};

const Store = ({ children }) => {
	const [state, dispatch] = useReducer(SelectionReducer, initialState);

	return (
		<StoreContext.Provider value={[state, dispatch]}>
			{children}
		</StoreContext.Provider>
	);
};

export default Store;
