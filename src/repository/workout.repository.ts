import { Workout } from "../model/workout.model";

export interface WorkoutRepository {
  createNewWorkout(newWorkout: Workout): Workout | undefined;
  getAllWorkouts(filterParams: any): Workout[];
  getOneWorkoutById(id: string): Workout | undefined;
  updateOneWorkoutById(id: string, newWorkout: Workout): Workout | undefined;
  deleteOneWorkoutById(id: string): void;
}
