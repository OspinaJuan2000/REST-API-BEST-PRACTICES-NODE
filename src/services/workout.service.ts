import { v4 } from "uuid";
import { WorkoutRepositoryLocal } from "../repository/workout.repository-local";
import { WorkoutRepository } from "../repository/workout.repository";

const workoutRepository: WorkoutRepository = new WorkoutRepositoryLocal();

const getAllWorkouts = () => {
  const allWorkouts = workoutRepository.getAllWorkouts();
  return allWorkouts;
};

const getOneWorkout = (workoutId: any) => {
  const workout = workoutRepository.getOneWorkoutById(workoutId);
  return workout;
};

const createNewWorkout = (newWorkout: any) => {
  const workoutToInsert = {
    ...newWorkout,
    id: v4(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  const createdWorkout = workoutRepository.createNewWorkout(workoutToInsert);

  return createdWorkout;
};

const updateOneWorkout = (workoutId: any, changes: any) => {
  const updatedWorkout = workoutRepository.updateOneWorkoutById(
    workoutId,
    changes
  );
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId: any) => {
  workoutRepository.deleteOneWorkoutById(workoutId);
};

export {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
