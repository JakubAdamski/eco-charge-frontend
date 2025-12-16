
import React, { useState } from 'react';
import { energyService } from '../services/api';
import { ChargingWindowResponse } from '../types/energy';
import { format } from 'date-fns';

export const ChargingOptimizer: React.FC = () => {
    const [hours, setHours] = useState<number>(3);
    const [result, setResult] = useState<ChargingWindowResponse | null>(null);
    const [error, setError] = useState<string>('');

    const handleCalculate = async () => {
        if (hours < 1 || hours > 6) {
            setError("Charging time must be between 1 and 6 hours.");
            return;
        }
        setError('');

        try {
            const data = await energyService.getOptimalCharging(hours);
            setResult(data);
        } catch (err) {
            console.error(err);
            setError("Server connection error.");
        }
    };

    return (
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2>EV Charging Optimizer</h2>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>Charging time (h):</label>
                <input
                    type="number"
                    min="1"
                    max="6"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    style={{ padding: '5px', width: '60px' }}
                />
                <button
                    onClick={handleCalculate}
                    style={{ marginLeft: '10px', padding: '5px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
                >

                    Find the best time
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}


            {result && (
                <div style={{ marginTop: '20px', padding: '15px', border: '2px solid #28a745', borderRadius: '5px', backgroundColor: '#fff' }}>
                    <h3>The best window found!</h3>
                    <p><strong>Start:</strong> {format(new Date(result.startTime), 'dd.MM.yyyy HH:mm')}</p>
                    <p><strong>End:</strong> {format(new Date(result.endTime), 'dd.MM.yyyy HH:mm')}</p>
                    <p><strong>Average clean energy:</strong> {result.cleanEnergyPerc}%</p>
                </div>
            )}
        </div>
    );
};