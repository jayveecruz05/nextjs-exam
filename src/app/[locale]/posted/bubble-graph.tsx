'use client';

import * as d3 from "d3";
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, memo } from "react";

const BubbleGraph = ({ data }: any) => {
  const langTrans = useTranslations('lang');
  const ref: any = useRef();
  
  const renderGraph = useCallback(() => {
    try {
      // Listen on resize
      window.addEventListener('resize', renderGraph);

      // Reset Render
      if (ref?.current?.innerHTML) { ref.current.innerHTML = ''; }

      const commentsData = data?.map((item: any) => ({ id: `comment.${langTrans('data-name/postId').replace(/\s/ig, '')}:${item.postId}`, value: item.id }))

      // set the dimensions and margins of the graph
      const width = ref?.current?.clientWidth,
            height = ref?.current?.clientWidth,
            margin = 1;

      const name = (d: any)=> d.id.split(".").pop(); // "Strings" of "flare.util.Strings"
      const group = (d: any)=> d.id.split(".")[1]; // "util" of "flare.util.Strings"
      const names = (d: any)=> name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

      // Specify the number format for values.
      const format = d3.format(",d");

      // Create a categorical color scale.
      const color = d3.scaleOrdinal(d3.schemeTableau10);

      // Create the pack layout.
      const pack: any = d3.pack()
          .size([width - margin * 2, height - margin * 2])
          .padding(3);

      // Compute the hierarchy from the (flat) data; expose the values
      // for each node; lastly apply the pack layout.
      const root = pack(d3.hierarchy({children: commentsData})
          .sum((d: any) => d.value));

      // Create the SVG container.
      const svg = d3.select(ref.current).append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-margin, -margin, width, height])
          .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
          .attr("text-anchor", "middle");

      // Place each (leaf) node according to the layout’s x and y values.
      const node = svg.append("g")
        .selectAll()
        .data(root.leaves())
        .join("g")
          .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

      // Add a title.
      node.append("title")
          .text((d: any) => `${d.data.id.split('.')?.[1]}\n${langTrans('comment/title')}${langTrans('data-name/id')}:${format(d.value)}`);

      // Add a filled circle.
      node.append("circle")
          .attr("fill-opacity", 0.7)
          .attr("fill", (d: any) => color(group(d.data)))
          .attr("r", (d: any) => d.r);

      // Add a label.
      const text = node.append("text")
          .attr("clip-path", (d: any) => `circle(${d.r})`);

      // Add a tspan for each CamelCase-separated word.
      text.selectAll()
        .data((d: any) => names(d.data))
        .join("tspan")
          .attr("x", 0)
          .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
          .text((d: any) => d);

      // Add a tspan for the node’s value.
      text.append("tspan")
          .attr("x", 0)
          .attr("y", (d: any) => `${names(d.data).length / 2 + 0.35}em`)
          .attr("fill-opacity", 0.7)
          .text((d: any) => `${langTrans('comment/title')}${langTrans('data-name/id')}:${format(d.value)}`);
    } catch (error) {
      console.log(error);
    }
  }, [data, langTrans]);

  useEffect(() => {
    renderGraph();
  });

  return <div id="graph" ref={ref}></div>;
};

export default memo(BubbleGraph);