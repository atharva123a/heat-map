import { useMemo } from 'react';
import * as d3 from 'd3';
import ColorLegend from './ColorLegend'; // Import the ColorLegend component

// const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };
const MARGIN = { top: 10, right: 10, bottom: 30, left: 50 }; // Increased left margin

export const HeatGraph = ({ data }) => {
  // bounds = area inside the axis
  const width = 300,
    height = 250;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // groups
  const allYGroups = useMemo(() => [...new Set(data.map(d => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map(d => d.x))], [data]);

  // x and y scales
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [data, height]);

  const [min, max] = d3.extent(data.map(d => d.value));

  if (!min || !max) {
    return null;
  }

  // Color scale
  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([max, min]);

  // // Build the rectangles
  // const allRects = data.map((d, i) => {
  //   return (
  //     <rect
  //       key={i}
  //       r={4}
  //       x={xScale(d.x)}
  //       y={yScale(d.y)}
  //       width={xScale.bandwidth()}
  //       height={yScale.bandwidth()}
  //       opacity={1}
  //       fill={colorScale(d.value)}
  //       rx={5}
  //       stroke={'white'}
  //     />
  //   );
  // });

  const allRects = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);
    const width = xScale.bandwidth();
    const height = yScale.bandwidth();
    const value = d.value.toFixed(2); // Format the value to two decimal places
    // Determine the contrast color based on the background color
    const contrastColor =
      d3.lab(colorScale(d.value)).l > 50 ? '#000000' : '#ffffff';

    return (
      <g key={i}>
        <rect
          r={4}
          x={x}
          y={y}
          width={width}
          height={height}
          opacity={1}
          fill={colorScale(d.value)}
          rx={5}
          stroke={'white'}
        />
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
          // fill="#ffffff" // Text color
          fill={contrastColor} // Use contrast color for text
        >
          {value}
        </text>
      </g>
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          {allRects}
          {xLabels}
          {yLabels}
        </g>
      </svg>
      {/* Render the ColorLegend component here */}
      <ColorLegend data={data} />
    </div>
  );
};
