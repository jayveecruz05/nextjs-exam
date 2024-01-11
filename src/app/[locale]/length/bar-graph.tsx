'use client';

import * as d3 from "d3";
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef } from "react";

const BarChart = ({ data }: any) => {
  const langTrans = useTranslations('lang');
  const ref: any = useRef();
  
  const renderBarChart = useCallback(() => {
    try {
      // Listen on resize
      window.addEventListener('resize', renderBarChart);

      // Reset Render
      if (ref?.current?.innerHTML) { ref.current.innerHTML = ''; }

      // set the dimensions and margins of the graph
      const margin = { top: 30, right: 30, bottom: 70, left: 50 },
      width = ref?.current?.clientWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Parse the Data
      // X axis
      const x: any = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d: any) => langTrans(`data-name/type/${String(d.type).toLowerCase()}`)))
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      const y: any = d3.scaleLinear().domain([0, data[2].length]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d: any) => x(langTrans(`data-name/type/${String(d.type).toLowerCase()}`)))
        .attr("y", (d: any) => y(d.length))
        .attr("width", x.bandwidth())
        .attr("height", (d: any) => height - y(d.length))
        .attr("fill", "#FFF");
    } catch (error) {}
  }, [data, langTrans]);

  useEffect(() => {
    renderBarChart();
  });

  return <svg width="100%" height={400} id="bar-chart" ref={ref} />;
};

export default BarChart;