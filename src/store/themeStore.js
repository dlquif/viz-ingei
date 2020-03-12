import { createContext } from 'react';

export const globalVars = {
	defaultHeight: 250,
	defaultMargin: { top: 10, right: 50, bottom: 30, left: 70 },
	colorMetrics: { GWP: '#0099A7', GTP: '#B2191A' },
	colorDefault: '#DADADA',
	colorGases: {
		CO2: '#AD4582',
		CH4: '#EF7E32',
		N2O: '#6296A7',
		'HFC+SF6': '#16A085'
	},
	colorSector: {
		Energía: '#E52620',
		IPPU: '#4771B6',
		AFOLU: '#71AE48',
		Desechos: '#FCC00E'
	},
	colorIndirectos: {
		NMVOCs: '#A0B700',
		CO: '#5F7186',
		NOx: '#8E6C8A',
		SO2: '#E25A42'
	},
	filter: { width: 35, height: 35 },
	metricas: { width: 100, height: 180, radius:35, colorsMetrics: { GWP: '#0099A7', GTP: '#B2191A' } },
	indirectos: { width: 250, height: 60, radius:25, padding: 10 },

};
export const ThemeContext = createContext(globalVars);

export default ThemeContext;