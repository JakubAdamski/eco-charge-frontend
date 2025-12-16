import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { energyService } from '../services/api';
import { DailyEnergyMix } from '../types/energy';
import { format } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DailyMixCharts: React.FC = () => {
    const [data, setData] = useState<DailyEnergyMix[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        energyService.getDailyMix()
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch mix", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Energy Mix Forecast (3 days)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                {data.map((dayMix, index) => {


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
                        <div key={dayMix.date} style={{ width: '300px', textAlign: 'center', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                            <h3>{format(new Date(dayMix.date), 'dd.MM.yyyy')}</h3>
                            <p style={{ fontWeight: 'bold', color: 'green' }}>
                                Clean energy: {dayMix.cleanEnergyPerc}%
                            </p>
                            <Pie data={chartData} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};