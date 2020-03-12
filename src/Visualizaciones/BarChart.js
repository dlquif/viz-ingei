import React, { useEffect, useRef, useState } from 'react';
import {
	select,
	axisBottom,
	axisLeft,
	scaleLinear,
	scaleBand,
	easeCubicInOut
} from 'd3';
import Filters from './Filters';
import { findMinMax } from '../utils/util';

export default function BarChart({
	datos,
	margin,
  barPadding = 0.2,
  factor= 1.1,
  numTicks = 7,
	onSelection = null,
	selectedCategory,
	color,
	heightFilter,
	widthFilter,
	colorfilterGas,
	colorMetrics,
	type
}){

	const refSVG = useRef();
	const refXAxis = useRef();
	const refYAxis = useRef();
	const wrapperRef = useRef();

	const [dimensions, setDimensions] = useState({ width: 0, height: 250 });

	const measureSVG = () => {
		const { width, height } = refSVG.current.getBoundingClientRect();

		setDimensions({ width, height });
	};

	useEffect(() => {
		measureSVG();
		window.addEventListener('resize', measureSVG);
		return () => {
			window.removeEventListener('resize', measureSVG);
		};
	}, []);

	useEffect(() => {
		const widthScale = scaleBand()
			.range([margin.left, dimensions.width - margin.right])
			.padding(barPadding)
			.domain(datos.map(d => d.Category));

		const heightScale = scaleLinear()
			.range([dimensions.height - margin.bottom, margin.top])
			.domain([
				Math.min(0, findMinMax(datos, 'Variable')[0] * factor),
				Math.max(0, findMinMax(datos, 'Variable')[1] * factor)
			]);

		const xAxis = axisBottom(widthScale);

		const yAxis = axisLeft(heightScale).ticks(numTicks);

		const handleClick = param => {
			if (param !== selectedCategory) {
				onSelection(param);
			} else {
				onSelection(null);
			}
		};

		const handleMouseOver = param => {
			let x = widthScale(param.Category);
			let y =
				param.Variable >= 0
					? heightScale(Math.max(0, param.Variable)) - 8
					: heightScale(0) +
					  Math.abs(heightScale(0) - heightScale(param.Variable)) +
					  15;

			select(refSVG.current)
				.append('text')
				.attr('class', 'tooltip')
				.attr('id', 'id' + param.Category.slice(0, 2))
				.text(
					param.Variable.toLocaleString('es-UY', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					})
				)
				.style('font-weight', 'bold')
				.attr('transform', `translate(${x} , ${y} )`)
				.append('tspan')
				.text(' Gg CO')
				.style('font-weight', 'normal')
				.append('tspan')
				.text('2')
				.style('font-weight', 'normal')
				.style('baseline-shift', 'sub')
				.append('tspan')
				.text('- eq')
				.style('font-weight', 'normal');
		};

		const handleMouseOut = param => {
			// Select text by id and then remove
			select(refSVG.current);
			select('#id' + param.Category.slice(0, 2)).remove();
		};

		select(refSVG.current)
			.selectAll('.bar')
			.lower()
			.data(datos)
			.join('rect')
			.attr('class', 'bar')
			.attr('rx', '2')
			.attr('ry', '2')
			.on('click', d => handleClick(d.Category))
			.on('mouseover', d => handleMouseOver(d))
			.on('mouseout', d => handleMouseOut(d))
			.transition()
			.duration(750)
			.ease(easeCubicInOut)
			.attr('x', d => widthScale(d.Category))
			.attr('y', d => heightScale(Math.max(0, d.Variable)))
			.attr('width', widthScale.bandwidth())
			.attr('height', d => Math.abs(heightScale(0) - heightScale(d.Variable)))
			.attr('fill', d => color(d.Category, selectedCategory));

		select(refXAxis.current)
			.transition()
			.duration(750)
			.ease(easeCubicInOut)
			.call(xAxis)
			.attr('transform', 'translate(0,' + heightScale(0) + ')');

		select(refYAxis.current)
			.transition()
			.duration(750)
			.ease(easeCubicInOut)
			.call(yAxis)
			.attr('transform', 'translate(' + margin.left + ',0)');
	}, [datos, selectedCategory, dimensions]);

	return (
		<div ref={wrapperRef}>
			<svg className='svg' ref={refSVG} width='100%' height={dimensions.height}>
				<g className='xAxis' ref={refXAxis} />
				<g className='yAxis' ref={refYAxis} />
				<Filters
					type={type}
					width={dimensions.width}
					widthFilter={widthFilter}
					heightFilter={heightFilter}
					margin={margin}
					colorfilterGas={colorfilterGas}
					colorMetrics={colorMetrics}
				/>
				<g
					className='yAxisTitle'
					transform={`translate(20, ${(dimensions.height -
						margin.bottom +
						margin.top) /
						2})`}
				>
					<text
						className='legendTitle'
						transform={`rotate(-90)`}
						style={{ textAnchor: 'middle' }}
					>
						<tspan>
							Gg CO
							<tspan baselineShift='sub'>2</tspan>- eq
						</tspan>
					</text>
				</g>
			</svg>
		</div>
	);

};

