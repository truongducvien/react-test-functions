import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function CustomVerticalChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Label 1 # of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        showLine: false,
      },
      {
        label: "Label 1 # of Votes",
        data: [12, 9, 3, 5, 2, 3],
        borderWidth: 1,
        showLine: false,
      },
      {
        type: "line",
        label: "Label 1 # of Votes abc",
        data: [2, 16, 31, 5, 22, 13],
        borderWidth: 2,
        tension: 0.5,
        borderDash: [5, 5],
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
      {
        type: "line",
        label: "Label 1 # of Votes abc",
        data: [12, 14, 19, 15, 16, 18],
        borderWidth: 2,
        tension: 0.5,
        borderDash: [5, 5],
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
    ],
  };

  return (
    <div style={{ width: "80vw" }}>
      <div style={{ width: "40%" }}>
        <div style={{ display: "flex" }}>
          <span> Hello</span>
        </div>
        <Bar
          data={data}
          options={{
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
