import React, { useContext } from 'react';
import { IndirectoContext } from '../store/indirectoStore';
import { ThemeContext } from '../store/themeStore';

const SelectIndirect = () => {
    
    const theme = useContext(ThemeContext);
    const [state, dispatch] = useContext(IndirectoContext);

	const indirectos = [
		{
			nombre: 'NMVOCs',
			texto1: 'COVDM',
			texto2: null,
			color: theme.colorIndirectos.NMVOCs
		},
		{
			nombre: 'CO',
			texto1: 'CO',
			texto2: null,
			color: theme.colorIndirectos.CO
		},
		{
			nombre: 'NOx',
			texto1: 'NO',
			texto2: 'x',
			color: theme.colorIndirectos.NOx
		},
		{
			nombre: 'SO2',
			texto1: 'SO',
			texto2: '2',
			color: theme.colorIndirectos.SO2
		}
	];

	return (
		<svg className='svg' width={theme.indirectos.width} height={theme.indirectos.height}>
			{indirectos.map((d, i) => (
				<React.Fragment key={i}>
					{d.nombre === state.selectedGas ? (
						<circle
							cx={theme.indirectos.padding * (i + 1) + theme.indirectos.radius * (2 * i + 1)}
							cy={theme.indirectos.height / 2}
							r={1.1 * theme.indirectos.radius}
							fill={'none'}
							stroke={d.color}
							strokeWidth={'2'}
						/>
					) : null}
					<circle
						className={d.nombre !== state.selectedGas ? 'bars' : 'selbar'}
						cx={theme.indirectos.padding * (i + 1) + theme.indirectos.radius * (2 * i + 1)}
						cy={theme.indirectos.height / 2}
						r={theme.indirectos.radius}
						fill={d.color}
						onClick={() =>
							d.nombre !== state.selectedGas
								? dispatch({ type: 'setGas', payload: d.nombre })
								: null
						}
					/>
					<text
						className='legendMetrica'
						x={theme.indirectos.padding * (i + 1) + theme.indirectos.radius * (2 * i + 1)}
						y={theme.indirectos.height / 2 + 3}
						style={{ textAnchor: 'middle', fill: '#FFFFFF' }}
					>
						<tspan>
							{d.texto1}
							<tspan baselineShift='sub'>{d.texto2}</tspan>
						</tspan>
					</text>
				</React.Fragment>
			))}
		</svg>
	);
};

export default SelectIndirect;