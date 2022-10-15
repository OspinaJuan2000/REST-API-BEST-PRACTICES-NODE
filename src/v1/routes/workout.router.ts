import express, { Router } from "express";
import * as workoutController from "../../controllers/workout.controller";
import * as recordController from "../../controllers/record.controller";

export const workoutRouter: Router = express.Router();

workoutRouter.post("/", workoutController.createNewWorkout);

workoutRouter.get("/", workoutController.getAllWorkouts);

workoutRouter.get("/:workoutId/records", recordController.getRecordForWorkout);

workoutRouter.get("/:workoutId", workoutController.getOneWorkout);

workoutRouter.patch("/:workoutId", workoutController.updateOneWorkout);

workoutRouter.delete("/:workoutId", workoutController.deleteOneWorkout);
