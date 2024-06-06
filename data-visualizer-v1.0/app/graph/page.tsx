// app/graph/page.tsx
"use client";

import { useCsv } from "../context/CsvContext";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import styles from "./graph.module.css";

const Graph: React.FC = () => {
  const { data } = useCsv();
  const [color, setColor] = useState<string>("#00ccff");
  const [lineStyle, setLineStyle] = useState<string>("solid");

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3
        .select("#graph")
        .attr("width", 800)
        .attr("height", 500)
        .style("background", "#1a1a1a")
        .style("margin", "20px auto")
        .style("display", "block")
        .style("box-shadow", "0 0 10px #a020f0, 0 0 20px #a020f0");

      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.x) as number])
        .range([40, 760]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y) as number])
        .range([460, 40]);

      svg.selectAll("*").remove();

      svg
        .append("g")
        .attr("transform", "translate(0,460)")
        .call(d3.axisBottom(xScale).ticks(5).tickSize(-420).tickPadding(10))
        .style("color", "#fff");

      svg
        .append("g")
        .attr("transform", "translate(40,0)")
        .call(d3.axisLeft(yScale).ticks(5).tickSize(-760).tickPadding(10))
        .style("color", "#fff");

      const line = d3
        .line<{ x: number; y: number }>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveLinear);

      svg
        .append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", lineStyle === "dashed" ? "5,5" : "none");

      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5)
        .attr("fill", color);

      svg
        .selectAll("text.value")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "value")
        .attr("x", (d) => xScale(d.x) + 5)
        .attr("y", (d) => yScale(d.y) - 5)
        .attr("fill", "#fff")
        .text((d) => `(${d.x}, ${d.y})`);

      svg
        .append("text")
        .attr("x", 400)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", "16px")
        .text("Sample Data");

      svg
        .append("text")
        .attr("x", 400)
        .attr("y", 490)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", "12px")
        .text("X Axis");

      svg
        .append("text")
        .attr("x", -250)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("fill", "#fff")
        .attr("font-size", "12px")
        .text("Y Axis");
    }
  }, [data, color, lineStyle]);

  return (
    <div className={styles.container}>
      <svg id="graph"></svg>
      <div className={styles.buttons}>
        <button onClick={() => setColor("#00ccff")}>Neon Blue</button>
        <button onClick={() => setColor("#ff4c4c")}>Neon Red</button>
        <button onClick={() => setColor("#a020f0")}>Neon Purple</button>
        <button onClick={() => setLineStyle("solid")}>Solid Line</button>
        <button onClick={() => setLineStyle("dashed")}>Dashed Line</button>
      </div>
    </div>
  );
};

export default Graph;
