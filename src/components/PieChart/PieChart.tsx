import React, { useState, useEffect } from "react";
import useWindowSize from "../../hooks/use-window-size";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";

import Classes from "./PieChart.module.css";

const data: any = [
    {
      values: [17, 2, 81, 0],
      labels: ["Not Started", "In Progress", "Late", "Completed"],
      name: 'Tasks Status',
      hoverinfo: 'label+percent',
      hovertext: ["Not Started", "In Progress", "Late", "Completed"],
      hole: 0.9,
      type: "pie",
      textposition: "none",
      marker: {
        colors: ["rgb(96, 94, 92)", "rgb(50, 126, 170)", "rgb(209, 52, 56)", "rgb(65, 128, 64)"]
      },
      title: "7 Tasks Left"
    }
];
  


const PieChart: React.FC = () => {
    const [width, height] = useWindowSize();

    

    const chartWidth = 0.1 * width;
    const chartHeight = 0.1 * height;

    const layout = { title: "" , annotations: [], autosize: true};
    const config = { displayModeBar: false };

    return (
      <>
        <div>
          <Plot data={ data } layout={ layout } config={ config } className={Classes.Pie} useResizeHandler />
        </div>
      </>
    )
}

export default PieChart;