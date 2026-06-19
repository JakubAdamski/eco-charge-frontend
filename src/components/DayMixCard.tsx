import React from 'react';
import { DailyEnergyMix } from '../types/energy';
import { Pie } from 'react-chartjs-2';
import { format } from 'date-fns';

interface Props {
    dayMix: DailyEnergyMix;
}

export const DayMixCard: React.FC<Props> = ({ dayMix }) => {
    const chartData = {
        labels: Object.keys(dayMix.fuelMix),
        datasets: [
            {
                data: Object.values(dayMix.fuelMix),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ width: '300px', textAlign: 'center', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>{format(new Date(dayMix.date), 'dd.MM.yyyy')}</h3>
            <p style={{ fontWeight: 'bold', color: 'green' }}>
                Clean energy: {dayMix.cleanEnergyPerc}%
            </p>
            <Pie data={chartData} />
        </div>
    );
};

export default DayMixCard;

