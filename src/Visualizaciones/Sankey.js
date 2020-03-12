import React from 'react';

import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

import Logo_AFOLU from '../img/Logo_AFOLU.svg';
import Logo_Energia from '../img/Logo_Energia.svg';
import Logo_Desechos from '../img/Logo_Desechos.svg';
import Logo_IPPU from '../img/Logo_IPPU.svg';

const SankeyNode = ({
	name,
	percent,
	x0,
	x1,
	y0,
	y1,
	color,
	sourceLinks,
	targetLinks
}) => (
	<g>
		<rect
			x={x0}
			y={y0}
			width={Math.max(1, x1 - x0)}
			height={Math.max(1, y1 - y0)}
			fill={color}
		>
			<title>{name}</title>
		</rect>

		{sourceLinks.length === 0 || targetLinks.length === 0 ? null : (
			<text x={x0 - 55} y={y0 + (y1 - y0) / 2} style={{ fontSize: 7 }}>
				<tspan>{name}</tspan>
			</text>
		)}
	</g>
);

const SankeyLink = ({ link, color }) => (
	<path
		d={sankeyLinkHorizontal()(link)}
		style={{
			fill: 'none',
			strokeOpacity: '.3',
			stroke: color,
			strokeWidth: Math.max(1, link.width)
		}}
	/>
);

const linkcolors = d => {
	let color;
	switch (d.source.name) {
		case 'Energía':
			color = '#E52620';
			break;
		case 'IPPU':
			color = '#4771B6';
			break;
		case 'AFOLU':
			color = '#71AE48';
			break;
		case 'Desechos':
			color = '#FCC00E';
			break;
		default:
			switch (d.target.name) {
				case 'SF6':
					color = '#16A085';
					break;
				case 'N2O':
					color = '#6296A7';
					break;
				case 'CH4':
					color = '#EF7E32';
					break;
				case 'CO2':
					color = '#AD4582';
					break;
				case 'HFCs':
					color = '#16A085';
					break;
				default:
					color = '#DADADA';
			}
	}
	return color;
};

const colors = name => {
	let color;
	switch (name) {
		case 'Energía':
			color = '#E52620';
			break;
		case 'IPPU':
			color = '#4771B6';
			break;
		case 'AFOLU':
			color = '#71AE48';
			break;
		case 'Desechos':
			color = '#FCC00E';
			break;
		case 'SF6':
			color = '#16A085';
			break;
		case 'N2O':
			color = '#6296A7';
			break;
		case 'CH4':
			color = '#EF7E32';
			break;
		case 'CO2':
			color = '#AD4582';
			break;
		case 'HFCs':
			color = '#16A085';
			break;
		default:
			color = '#DADADA';
	}
	return color;
};

const Diagram = ({ width, height, margin, datos }) => {
	const innerwidth = width - margin.left - margin.right;
	const innerheight = height - margin.top - margin.bottom;

	const { nodes, links } = sankey()
		.nodeWidth(15)
		.nodePadding(7)
		.nodeSort(function(a, b) {
			return a - b;
		})
		//.iterations(6)
		.extent([
			[1, 1],
			[innerwidth, innerheight]
		])(datos);

	return (
		<svg className='svg' width={width} height={height}>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				{nodes.map((node, i) => (
					<SankeyNode {...node} color={colors(node.name)} key={node.name} />
				))}
				{links.map((link, i) => (
					<SankeyLink link={link} color={linkcolors(link)} key={i} />
				))}
			</g>
			<g className='svg' transform={`translate(${0}, ${75})`}>
				<image width={50} height={50} href={Logo_AFOLU} alt='Sector'></image>
			</g>
			<g className='svg' transform={`translate(${0}, ${200})`}>
				<image width={50} height={50} href={Logo_Energia} alt='Sector'></image>
			</g>
			<g className='svg' transform={`translate(${0}, ${300})`}>
				<image width={50} height={50} href={Logo_Desechos} alt='Sector'></image>
			</g>
			<g className='svg' transform={`translate(${0}, ${400})`}>
				<image width={45} height={45} href={Logo_IPPU} alt='Sector'></image>
			</g>
		</svg>
	);
};

export default Diagram;