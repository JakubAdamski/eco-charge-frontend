import axios from 'axios';
import { DailyEnergyMix, ChargingWindowResponse } from '../types/energy';


const API_BASE = process.env.REACT_APP_API_BASE_URL || window.location.origin;
const API_URL = `${API_BASE.replace(/\/$/, '')}/api/energy`;

export const energyService = {

    getDailyMix: async (): Promise<DailyEnergyMix[]> => {
        const response = await axios.get<DailyEnergyMix[]>(`${API_URL}/mix`);
        return response.data;
    },


    getOptimalCharging: async (hours: number): Promise<ChargingWindowResponse> => {
        const response = await axios.get<ChargingWindowResponse>(`${API_URL}/optimal-charging`, {
            params: { hours }
        });
        return response.data;
    }
};