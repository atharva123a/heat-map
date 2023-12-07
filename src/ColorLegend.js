import React from 'react';
import * as d3 from 'd3';

const legendWidth = 300;
const legendHeight = 40;
const numColors = 20;
const marginTop = 40; // Increased marginTop for title
const marginLeft = 20; // Added left margin

const ColorLegend = ({ data }) => {
  const fixedMin = 60; // Set the minimum value for the color scale
  const fixedMax = 120; // Set the maximum value for the color scale
  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    // .domain([fixedMin, fixedMax]);
    .domain([fixedMax, fixedMin]); // Reverse the domain

  const colorDomain = d3
    .range(numColors)
    .map(d => (d / (numColors - 1)) * (fixedMax - fixedMin) + fixedMin);

  const colorWidth = legendWidth / numColors;

  const scaleDomain = d3.range(60, 121, 120); // Added scale values from 0 to 100

  return (
    <svg
      width={legendWidth + marginLeft}
      height={legendHeight + marginTop + 40}
    >
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        <text x={legendWidth / 2} y={-10} textAnchor="middle" fontWeight="bold">
          Color Legend
        </text>
        {colorDomain.map((d, i) => (
          <g key={i} transform={`translate(${i * colorWidth}, 0)`}>
            <rect
              width={colorWidth}
              height={legendHeight}
              fill={colorScale(d)}
            />
          </g>
        ))}
        <g transform={`translate(0, ${legendHeight})`}>
          <text x={0} y={20} textAnchor="start">
            {fixedMin.toFixed(2)}
          </text>
          <text x={legendWidth} y={20} textAnchor="end">
            {fixedMax.toFixed(2)}
          </text>
        </g>
        <g transform={`translate(0, ${legendHeight + 20})`}>
          <line x1={0} x2={legendWidth} y1={0} y2={0} stroke="black" />
        </g>
        {/* Add scale values from 0 to 100 below the color legend */}
        {scaleDomain.map((value, i) => (
          <g
            key={i}
            transform={`translate(${(i / 10) * legendWidth}, ${legendHeight +
              30})`}
          >
            <text x={0} y={20} textAnchor="middle">
              {value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default ColorLegend;
