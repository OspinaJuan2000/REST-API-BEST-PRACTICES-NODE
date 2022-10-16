import express, { Router } from "express";
import apicache from "apicache";
import * as workoutController from "../../controllers/workout.controller";
import * as recordController from "../../controllers/record.controller";

const cache = apicache.middleware;

export const workoutRouter: Router = express.Router();

workoutRouter.post("/", cache("2 minutes"), workoutController.createNewWorkout);

workoutRouter.get("/", workoutController.getAllWorkouts);

workoutRouter.get("/:workoutId/records", recordController.getRecordForWorkout);

workoutRouter.get("/:workoutId", workoutController.getOneWorkout);

workoutRouter.patch("/:workoutId", workoutController.updateOneWorkout);

workoutRouter.delete("/:workoutId", workoutController.deleteOneWorkout);
