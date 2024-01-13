'use client';

import * as d3 from "d3";
import { useCallback, useEffect, useRef } from "react";

const ZoomableIcicleGraph = ({ data }: any) => {
  const ref: any = useRef();
  
  const renderGraph = useCallback(() => {
    try {
      // Listen on resize
      window.addEventListener('resize', renderGraph);

      // Reset Render
      if (ref?.current?.innerHTML) { ref.current.innerHTML = ''; }

      // set the dimensions and margins of the graph
      const width = ref?.current?.clientWidth,
            height = ref?.current?.clientHeight;

      const commentsData: any = { name: 'Comments', children: [] }
      let currentPostID = 0;
      data.forEach((item: any) => {
        if (currentPostID !== item.postId) {
          currentPostID = item.postId;
          commentsData.children = [ ...commentsData.children, { name: `Post ID ${currentPostID}`, children: (data?.filter((i: any) => i.postId === currentPostID)).map((i: any) => ({ ...i, value: 1, isMessage: true })) } ]
        }
      });

      // Create the color scale.
      const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, commentsData.children.length + 1));

      // Compute the layout.
      const hierarchy = d3.hierarchy(commentsData)
          .sum(d => d.value)
          // .sort((a: any, b: any) => b.height - a.height || b.value - a.value);
      const root = d3.partition()
          .size([height, (hierarchy.height + 1) * width / 3])
        (hierarchy);

      // On click, change the focus and transitions it into view.
      let focus = root;
      const clicked = (event: any, p: any) => {
        if (p?.parent) {
          focus = focus === p ? p = p.parent : p;

          root.each((d: any) => d.target = {
            x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
            x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
            y0: d.y0 - p.y0,
            y1: d.y1 - p.y0
          });

          const t = cell.transition().duration(750)
              .attr("transform", (d: any) => `translate(${d.target.y0},${d.target.x0})`);

          foreignObject.transition(t).attr("height", (d: any) => rectHeight(d.target));
          foreignObject.transition(t).style("opacity", (d: any) => +labelVisible(d.target));
          rect.transition(t).attr("height", (d: any) => rectHeight(d.target));
          // text.transition(t).attr("fill-opacity", (d: any) => +labelVisible(d.target));
          // tspan.transition(t).attr("fill-opacity", (d: any) => labelVisible(d.target) * 0.7);
        }
      }

      // Create the SVG container.
      const svg = d3.select(ref.current).append("svg")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

      const rectHeight = (d: any): any => {
        return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
      }

      const labelVisible = (d: any): any => {
        return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
      }

      // Append cells.
      const cell = svg
        .selectAll("g")
        .data(root.descendants())
        .join("g")
          .attr("transform", d => `translate(${d.y0},${d.x0})`);

      const rect = cell.append("rect")
          .attr("width", d => d.y1 - d.y0 - 1)
          .attr("height", d => rectHeight(d))
          .attr("fill-opacity", 0.6)
          .attr("fill", (d: any) => {
            if (!d.depth) return "#ccc";
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
          })
      
      const format = d3.format(",d");
      const foreignObject = cell.append("foreignObject")
          .attr("width", d => d.y1 - d.y0 - 1)
          .attr("height", d => rectHeight(d))
          .style("opacity", d => +labelVisible(d))
          .style("padding", "4px")
          .style("cursor", "pointer")
          .on("click", clicked)
          .html((d: any) => {
            return (d?.data?.isMessage) ? `
              <p style="padding-bottom: 4px">ID: ${d.data.id}</p>
              <p style="padding-bottom: 4px">Post ID: ${d.data.postId}</p>
              <p style="padding-bottom: 4px">Name: ${d.data.name}</p>
              <p style="padding-bottom: 4px">Email: ${d.data.email}</p>
              <p style="padding-bottom: 4px">Body: ${d.data.body}</p>
          ` : `<span>${d.data.name}${((!d.parent) ? ` ${format(d.value)}` : '')}</span>`
          });

      // const text = cell.append("text")
      //     .style("user-select", "none")
      //     .style("overflow", "none")
      //     .attr("pointer-events", "none")
      //     .attr("x", 4)
      //     .attr("y", 13)
      //     .style("max-width", d => d.y1 - d.y0 - 1)
      //     .attr("fill-opacity", d => +labelVisible(d));

      // text.append("tspan")
      //   .text((d: any) => d.data.name);

      // const format = d3.format(",d");
      // const tspan = text.append("tspan")
      //     .attr("fill-opacity", (d: any) => labelVisible(d) * 0.7)
      //     .text((d: any) => ((!d.parent) ? ` ${format(d.value)}` : ''));

      // cell.append("title")
      //     .text((d: any) => `${d.ancestors().map((d: any) => d.data.name)}`);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  useEffect(() => {
    renderGraph();
  });

  return <svg width="100%" height="120rem" id="graph" ref={ref} />;
};

export default ZoomableIcicleGraph;