import React, { useContext } from 'react';
import { StoreContext } from '../store/directoStore';
import { ThemeContext } from '../store/themeStore';

const Metricas = () => {
        
    const theme = useContext(ThemeContext);
	const [state, dispatch] = useContext(StoreContext);

	const metricas = [
		{
			nombre: 'EqGWP',
			texto1: 'GWP',
			texto2: '100 AR2',
			color: theme.metricas.colorsMetrics.GWP
		},
		{
			nombre: 'EqGTP',
			texto1: 'GTP',
			texto2: '100 AR5',
			color: theme.metricas.colorsMetrics.GTP
		}
	];

	return (
		<svg className='svg' width={theme.metricas.width} height={theme.metricas.height}>
			{metricas.map((d, i) => (
				<React.Fragment key={i}>
					{d.nombre === state.selectedMetric ? (
						<circle
							cx={theme.metricas.width / 2}
							cy={theme.metricas.radius * (1.5 + 2.5 * i)}
							r={1.1 * theme.metricas.radius}
							fill={'none'}
							stroke={d.color}
							strokeWidth={'2'}
						/>
					) : null}
					<circle
						className={d.nombre !== state.selectedMetric ? 'bars' : 'selbar'}
						cx={theme.metricas.width / 2}
						cy={theme.metricas.radius * (1.5 + 2.5 * i)}
						r={theme.metricas.radius}
						fill={d.color}
						onClick={() =>
							d.nombre !== state.selectedMetric
								? dispatch({ type: 'setMetric', payload: d.nombre })
								: null
						}
					/>
					<text
						className='legendMetrica'
						x={theme.metricas.width / 2}
						y={theme.metricas.radius * (1.5 + 2.5 * i)}
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

export default Metricas;
