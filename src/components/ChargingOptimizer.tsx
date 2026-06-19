
import React, { useState } from 'react';
import { energyService } from '../services/api';
import { ChargingWindowResponse } from '../types/energy';
import ChargingOptimizerForm from './ChargingOptimizerForm';
import ChargingResult from './ChargingResult';

export const ChargingOptimizer: React.FC = () => {
    const [hours, setHours] = useState<number>(3);
    const [result, setResult] = useState<ChargingWindowResponse | null>(null);
    const [error, setError] = useState<string>('');

    const handleCalculate = async () => {
        if (hours < 1 || hours > 6) {
            setError('Charging time must be between 1 and 6 hours.');
            return;
        }
        setError('');

        try {
            const data = await energyService.getOptimalCharging(hours);
            setResult(data);
        } catch (err) {
            console.error(err);
            setError('Server connection error.');
        }
    };

    return (
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2>EV Charging Optimizer</h2>
            <ChargingOptimizerForm hours={hours} setHours={setHours} onCalculate={handleCalculate} />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ChargingResult result={result} />
        </div>
    );
};

export default ChargingOptimizer;
