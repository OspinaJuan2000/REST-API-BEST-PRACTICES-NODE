import { Workout } from "../model/workout.model";
import { WorkoutRepository } from "./workout.repository";
import { db } from "../database/db";
import HTTP_STATUS_CODES from "http-status-enum";

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
      throw {
        status: HTTP_STATUS_CODES.BAD_REQUEST,
        message: `Workout with the name ${newWorkout.name} already exists`,
      };
    }

    try {
      this.workouts.push(newWorkout);
      return newWorkout;
    } catch (error: any) {
      throw {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      };
    }
  }

  getAllWorkouts(): Workout[] {
    try {
      return this.workouts;
    } catch (error) {
      throw { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, message: error };
    }
  }

  getOneWorkoutById(id: string): Workout | undefined {
    try {
      const workout: Workout | undefined = this.workouts.find(
        (workout) => workout.id === id
      );

      if (!workout) {
        throw {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: `Can't find workout with the id '${id}'`,
        };
      }

      return workout;
    } catch (error: any) {
      throw {
        status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      };
    }
  }

  updateOneWorkoutById(id: string, newWorkout: Workout): Workout | undefined {
    try {
      const indexForUpdate: number = this.workouts.findIndex(
        (workout) => workout.id === id
      );

      if (indexForUpdate === -1) {
        throw {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: `Can't find workout with the id '${id}'`,
        };
      }

      const updatedWorkout = {
        ...this.workouts[indexForUpdate],
        ...newWorkout,
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      };

      this.workouts[indexForUpdate] = updatedWorkout;

      return updatedWorkout;
    } catch (error: any) {
      throw {
        status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      };
    }
  }

  deleteOneWorkoutById(id: string): void {
    try {
      const indexForDeletion: number = this.workouts.findIndex(
        (workout) => workout.id === id
      );

      if (indexForDeletion === -1) {
        throw {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: `Can't find workout with the id '${id}'`,
        };
      }

      this.workouts.splice(indexForDeletion, 1);
    } catch (error: any) {
      throw {
        status: error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      };
    }
  }
}
