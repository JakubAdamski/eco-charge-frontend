import React from 'react';

interface Props {
    hours: number;
    setHours: (h: number) => void;
    onCalculate: () => void;
}

export const ChargingOptimizerForm: React.FC<Props> = ({ hours, setHours, onCalculate }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Charging time (h):</label>
            <input
                type="number"
                min={1}
                max={6}
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value || '0'))}
                style={{ padding: '5px', width: '60px' }}
            />
            <button
                onClick={onCalculate}
                style={{ marginLeft: '10px', padding: '5px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                Find the best time
            </button>
        </div>
    );
};

export default ChargingOptimizerForm;

