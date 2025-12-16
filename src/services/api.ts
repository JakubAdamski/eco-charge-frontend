import axios from 'axios';
import { DailyEnergyMix, ChargingWindowResponse } from '../types/energy';


const API_URL = 'const API_URL = \'https://eco-charge-backend.onrender.com/api/energy';

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