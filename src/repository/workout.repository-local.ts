import { Workout } from "../model/workout.model";
import { WorkoutRepository } from "./workout.repository";
import { db } from "../database/db";

export class WorkoutRepositoryLocal implements WorkoutRepository {
  private workouts: Workout[] = [];

  constructor() {
    this.workouts = db.workouts;
  }

  createNewWorkout(newWorkout: Workout): Workout | undefined {
    const isAlreadyAdded: boolean =
      this.workouts.findIndex((workout) => workout.name === newWorkout.name) >
      -1;

    if (isAlreadyAdded) {
      return;
    }

    this.workouts.push(newWorkout);
    return newWorkout;
  }

  getAllWorkouts(): Workout[] {
    return this.workouts;
  }

  getOneWorkoutById(id: string): Workout | undefined {
    const workout: Workout | undefined = this.workouts.find(
      (workout) => workout.id === id
    );

    if (!workout) {
      return;
    }

    return workout;
  }

  updateOneWorkoutById(id: string, newWorkout: Workout): Workout | undefined {
    const indexForUpdate: number = this.workouts.findIndex(
      (workout) => workout.id === id
    );

    if (indexForUpdate === -1) {
      return;
    }

    const updatedWorkout = {
      ...this.workouts[indexForUpdate],
      ...newWorkout,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    this.workouts[indexForUpdate] = updatedWorkout;

    return updatedWorkout;
  }

  deleteOneWorkoutById(id: string): void {
    const indexForDeletion: number = this.workouts.findIndex(
      (workout) => workout.id === id
    );

    console.log("index", indexForDeletion);

    if (indexForDeletion === -1) {
      return;
    }

    this.workouts.splice(indexForDeletion, 1);
  }
}
