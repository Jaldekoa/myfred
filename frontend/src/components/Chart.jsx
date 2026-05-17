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

function buildChartData(data, seriesId, compact = false) {
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
        borderWidth: compact ? 1.8 : 2,
        pointRadius: 0,
        tension: 0.25,
        fill: !compact,
      },
    ],
  };
}

function buildChartOptions(compact = false) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: !compact,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: !compact,
      },
    },
    scales: {
      x: {
        display: !compact,
        ticks: {
          maxTicksLimit: 8,
        },
      },
      y: {
        display: !compact,
        beginAtZero: false,
      },
    },
  };
}

export default function Chart({ data, seriesId, compact = false }) {
  const chartData = buildChartData(data, seriesId, compact);
  const chartOptions = buildChartOptions(compact);

  if (!chartData.labels.length) {
    return <p>No hay observaciones numericas para {seriesId}.</p>;
  }

  if (compact) {
    return (
      <div className="mini-chart-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    );
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
