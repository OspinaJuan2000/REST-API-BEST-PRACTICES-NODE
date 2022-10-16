import { Request, Response } from "express";
import * as recordService from "../services/record.service";
import HTTP_STATUS_CODES from "http-status-enum";
import { Record } from "../models/record.model";

const getRecordForWorkout = (req: Request, res: Response): void => {
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
    const allRecords: Record[] | undefined =
      recordService.getRecordsForWorkout(workoutId);
    res.status(HTTP_STATUS_CODES.OK).json({ status: "OK", data: allRecords });
  } catch (error: any) {
    res
      .status(error?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export { getRecordForWorkout };
