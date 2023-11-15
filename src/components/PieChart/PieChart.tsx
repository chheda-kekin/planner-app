import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

import Classes from "./PieChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart: React.FC<{inProgress: number, notStarted: number, completed: number, due: number}> = (props) => {

    const { inProgress, notStarted, completed, due } = props;

    const data = {
      labels: [
        'Not Started',
        'In Progress',
        'Completed',
        'Due'
      ],
      datasets: [{
        label: 'Tasks',
        data: [notStarted, inProgress, completed, due],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(0, 77, 26)',
          'rgb(255, 99, 132)'
        ],
        hoverOffset: 4
      }]
    };

    const options = {
      cutout: '85%'
    };

    return (
      <>
        <Doughnut data={data} options={options} />
      </>
    )
}

export default PieChart;