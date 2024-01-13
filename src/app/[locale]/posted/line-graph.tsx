'use client';

import * as d3 from "d3";
import { useCallback, useEffect, useRef } from "react";

const LineGraph = ({ data }: any) => {
  const ref: any = useRef();
  
  const renderGraph = useCallback(() => {
    try {
      // Listen on resize
      window.addEventListener('resize', renderGraph);

      // Reset Render
      if (ref?.current?.innerHTML) { ref.current.innerHTML = ''; }

      // set the dimensions and margins of the graph
      const margin = { top: 30, right: 30, bottom: 70, left: 50 },
      width = ref?.current?.clientWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      const svg = d3.select(ref.current).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // add X axis and Y axis
      const x: any = d3.scaleTime().range([0, width]);
      const y: any = d3.scaleLinear().range([height, 0]);

      x.domain(d3.extent(data, (d: any) => { return d.postId; }));
      y.domain([0, d3.max(data, (d: any) => { return d.id; })]);
    
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y));
        
      // add the Line
      const valueLine = d3.line()
      .x((d: any) => { return x(d.postId); })
      .y((d: any) => { return y(d.id); });
    
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "#1F1A38")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine);
    } catch (error) {}
  }, [data]);

  useEffect(() => {
    renderGraph();
  });

  return <svg width="100%" height={400} id="graph" ref={ref} />;
};

export default LineGraph;