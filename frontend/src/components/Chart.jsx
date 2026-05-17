import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function buildChartData(data, seriesId) {
  const observations = data?.observations ?? [];
  const validObservations = observations.filter(
    (observation) => observation.value !== "." && !Number.isNaN(Number(observation.value)),
  );

  return {
    labels: validObservations.map((observation) => observation.date),
    datasets: [
      {
        label: seriesId,
        data: validObservations.map((observation) => Number(observation.value)),
        borderColor: "#990F3D",
        backgroundColor: "rgba(153, 15, 61, 0.1)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
        fill: true,
      },
    ],
  };
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 8,
      },
    },
    y: {
      beginAtZero: false,
    },
  },
};

export default function Chart({ data, seriesId }) {
  const chartData = buildChartData(data, seriesId);

  if (!chartData.labels.length) {
    return <p>No hay observaciones numericas para {seriesId}.</p>;
  }

  return (
    <section className="chart-section">
      <h2>{seriesId}</h2>
      <div className="chart-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}
