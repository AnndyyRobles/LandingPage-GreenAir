import React from 'react';
import { Card, Title, AreaChart } from "@tremor/react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Filler,
  Legend
);

interface DashboardProps {
  stationId: string;
}

const chartData = {
  labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
  datasets: [
    {
      fill: true,
      label: 'PM2.5',
      data: [30, 35, 45, 50, 40, 35, 30, 25],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Air Quality Trends',
    },
  },
};

export default function Dashboard({ stationId }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Station Dashboard</h1>
          <p className="text-gray-400">Station ID: {stationId}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/20">
            <Title className="text-white mb-2">Current AQI</Title>
            <p className="text-4xl font-bold text-green-400">45</p>
            <p className="text-green-300 text-sm">Good</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20">
            <Title className="text-white mb-2">Temperature</Title>
            <p className="text-4xl font-bold text-blue-400">23°C</p>
            <p className="text-blue-300 text-sm">Normal</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/20">
            <Title className="text-white mb-2">Humidity</Title>
            <p className="text-4xl font-bold text-purple-400">65%</p>
            <p className="text-purple-300 text-sm">Moderate</p>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/20">
            <Title className="text-white mb-2">Wind Speed</Title>
            <p className="text-4xl font-bold text-yellow-400">12km/h</p>
            <p className="text-yellow-300 text-sm">Light breeze</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border border-gray-700">
            <Title className="text-white mb-4">24-Hour AQI Trend</Title>
            <Line options={options} data={chartData} />
          </Card>

          <Card className="bg-gray-800/50 border border-gray-700">
            <Title className="text-white mb-4">Pollutant Concentrations</Title>
            <AreaChart
              className="h-72 mt-4"
              data={[
                {
                  date: "Jan 22",
                  PM25: 35,
                  PM10: 45,
                  NO2: 20,
                },
                {
                  date: "Jan 23",
                  PM25: 30,
                  PM10: 40,
                  NO2: 25,
                },
                {
                  date: "Jan 24",
                  PM25: 45,
                  PM10: 55,
                  NO2: 30,
                },
              ]}
              index="date"
              categories={["PM25", "PM10", "NO2"]}
              colors={["green", "blue", "purple"]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}