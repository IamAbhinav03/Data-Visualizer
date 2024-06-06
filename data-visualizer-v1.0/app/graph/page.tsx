// app/graph/page.tsx
"use client";

import { useCsv } from "../context/CsvContext";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import styles from "../global.css";

const Graph: React.FC = () => {
  const { data } = useCsv();
  const [color, setColor] = useState<string>("#00ccff");

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3
        .select("#graph")
        .attr("width", 800)
        .attr("height", 500)
        .style("background", "#1a1a1a")
        .style("margin", "20px")
        .style("box-shadow", "0 0 10px #a020f0, 0 0 20px #a020f0");

      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.x) as number])
        .range([0, 800]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y) as number])
        .range([500, 0]);

      svg.selectAll("*").remove();

      svg
        .append("g")
        .attr("transform", "translate(0,500)")
        .call(d3.axisBottom(xScale));

      svg.append("g").call(d3.axisLeft(yScale));

      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5)
        .attr("fill", color);
    }
  }, [data, color]);

  return (
    <div className={styles.container}>
      <svg id="graph"></svg>
      <div className={styles.buttons}>
        <button onClick={() => setColor("#00ccff")}>Neon Blue</button>
        <button onClick={() => setColor("#ff4c4c")}>Neon Red</button>
        <button onClick={() => setColor("#a020f0")}>Neon Purple</button>
      </div>
    </div>
  );
};

export default Graph;
