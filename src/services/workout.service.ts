import { v4 } from "uuid";
import { WorkoutRepositoryLocal } from "../repository/workout.repository-local";
import { WorkoutRepository } from "../repository/workout.repository";
import { Workout } from "../model/workout.model";

const workoutRepository: WorkoutRepository = new WorkoutRepositoryLocal();

const getAllWorkouts = (): Workout[] => {
  try {
    const allWorkouts: Workout[] = workoutRepository.getAllWorkouts();
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getOneWorkout = (workoutId: string): Workout | undefined => {
  try {
    const workout: Workout | undefined =
      workoutRepository.getOneWorkoutById(workoutId);
    return workout;
  } catch (error) {
    throw error;
  }
};

const createNewWorkout = (newWorkout: Workout): Workout | undefined => {
  const workoutToInsert = {
    ...newWorkout,
    id: v4(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdWorkout: Workout | undefined =
      workoutRepository.createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (
  workoutId: string,
  changes: Workout
): Workout | undefined => {
  try {
    const updatedWorkout: Workout | undefined =
      workoutRepository.updateOneWorkoutById(workoutId, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteOneWorkout = (workoutId: string): void => {
  try {
    workoutRepository.deleteOneWorkoutById(workoutId);
  } catch (error) {
    throw error;
  }
};

export {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
