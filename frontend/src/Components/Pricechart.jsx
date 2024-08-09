import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const PriceChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.price),
        datasets: [
            {
                label: 'Price',
                data: data.map(d => d.qty),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            }
        ],
    };

    return <Line data={chartData} />;
};

export default PriceChart;
