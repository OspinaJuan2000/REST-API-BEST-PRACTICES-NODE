import { Request, Response } from "express";
import * as workoutService from "../services/workout.service";

const createNewWorkout = (req: Request, res: Response) => {
  const { body } = req;

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  const createdWorkout = workoutService.createNewWorkout(newWorkout);
  res.status(201).json({ status: "OK", data: createdWorkout });
};

const getAllWorkouts = (req: Request, res: Response) => {
  const allWorkouts = workoutService.getAllWorkouts();
  res.status(200).json({ status: "OK", data: allWorkouts });
};

const getOneWorkout = (req: Request, res: Response) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    return;
  }
  const workout = workoutService.getOneWorkout(workoutId);
  res.status(200).json({ status: "OK", data: workout });
};

const updateOneWorkout = (req: Request, res: Response) => {
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) {
    return;
  }
  const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
  res.status(200).json({ status: "OK", data: updatedWorkout });
};

const deleteOneWorkout = (req: Request, res: Response) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    return;
  }
  workoutService.deleteOneWorkout(workoutId);
  res.status(204).json({ status: "OK" });
};

export {
  createNewWorkout,
  getAllWorkouts,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
