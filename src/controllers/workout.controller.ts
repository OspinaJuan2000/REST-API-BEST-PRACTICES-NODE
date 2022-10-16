import { Request, Response } from "express";
import * as workoutService from "../services/workout.service";
import HTTP_STATUS_CODES from "http-status-enum";
import { Workout } from "../models/workout.model";

const createNewWorkout = (req: Request, res: Response): void => {
  const { body } = req;

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  try {
    const createdWorkout: Workout | undefined =
      workoutService.createNewWorkout(newWorkout);
    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ status: "OK", data: createdWorkout });
  } catch (error: any) {
    res.status(error.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

const getAllWorkouts = (req: Request, res: Response): void => {
  const { mode } = req.query;

  try {
    const allWorkouts: Workout[] = workoutService.getAllWorkouts({ mode });
    res.status(HTTP_STATUS_CODES.OK).json({ status: "OK", data: allWorkouts });
  } catch (error: any) {
    res
      .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneWorkout = (req: Request, res: Response): void => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      status: "FAILED",
      data: {
        error: `Parameter 'id' can not be empty`,
      },
    });
    return;
  }

  try {
    const workout: Workout | undefined =
      workoutService.getOneWorkout(workoutId);
    res.status(HTTP_STATUS_CODES.OK).json({ status: "OK", data: workout });
  } catch (error: any) {
    res
      .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req: Request, res: Response): void => {
  const {
    body,
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      status: "FAILED",
      data: {
        error: `Parameter 'id' can not be empty`,
      },
    });
    return;
  }

  try {
    const updatedWorkout: Workout | undefined = workoutService.updateOneWorkout(
      workoutId,
      body
    );

    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ status: "OK", data: updatedWorkout });
  } catch (error: any) {
    res
      .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneWorkout = (req: Request, res: Response): void => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      status: "FAILED",
      data: {
        error: `Parameter 'id' can not be empty`,
      },
    });
    return;
  }

  try {
    workoutService.deleteOneWorkout(workoutId);
    res.status(HTTP_STATUS_CODES.NO_CONTENT).json({ status: "OK" });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export {
  createNewWorkout,
  getAllWorkouts,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
