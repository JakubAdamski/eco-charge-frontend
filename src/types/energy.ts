export interface DailyEnergyMix {
    date: string;
    cleanEnergyPerc: number;
    fuelMix: Record<string, number>;
}

export interface ChargingWindowResponse {
    startTime: string;
    endTime: string;
    cleanEnergyPerc: number;
}