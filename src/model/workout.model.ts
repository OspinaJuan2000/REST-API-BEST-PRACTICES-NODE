export interface Workout {
  id?: string;
  name: string;
  mode: string;
  createdAt?: string;
  updatedAt?: string;
  equipment: string[];
  exercises: string[];
  trainerTips: string[];
}
