
export interface NutritionOrder {
    patientReference: string;
    dateTime: string;
    ordererReference: string;
    dietPreference: string;
    dietType: string;
    dietTypeDescription: string;
    frequency: string;
    duration: string;
    instructions: string[];
    nutrients: any[];
    supplements: any[];
    forbiddenFoods: string[];
}