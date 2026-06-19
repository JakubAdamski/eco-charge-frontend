import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { energyService } from '../services/api';
import { DailyEnergyMix } from '../types/energy';
import DayMixCard from './DayMixCard';

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
                console.error('Failed to fetch mix', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Energy Mix Forecast (3 days)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                {data.map((dayMix) => (
                    <DayMixCard key={dayMix.date} dayMix={dayMix} />
                ))}
            </div>
        </div>
    );
};

export default DailyMixCharts;
