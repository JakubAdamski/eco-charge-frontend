import React from 'react';
import { ChargingWindowResponse } from '../types/energy';
import { format } from 'date-fns';

interface Props {
    result: ChargingWindowResponse | null;
}

export const ChargingResult: React.FC<Props> = ({ result }) => {
    if (!result) return null;

    return (
        <div style={{ marginTop: '20px', padding: '15px', border: '2px solid #28a745', borderRadius: '5px', backgroundColor: '#fff' }}>
            <h3>The best window found!</h3>
            <p><strong>Start:</strong> {format(new Date(result.startTime), 'dd.MM.yyyy HH:mm')}</p>
            <p><strong>End:</strong> {format(new Date(result.endTime), 'dd.MM.yyyy HH:mm')}</p>
            <p><strong>Average clean energy:</strong> {result.cleanEnergyPerc}%</p>
        </div>
    );
};

export default ChargingResult;

