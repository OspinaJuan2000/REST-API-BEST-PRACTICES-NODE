import { Record } from "../model/record.model";
import { RecordRepository } from "./record.repository";
import { db } from "../database/db";
import HTTP_STATUS_CODES from "http-status-enum";

export class RecordRepositoryLocal implements RecordRepository {
  private records: Record[] = [];

  constructor() {
    this.records = db.records;
  }

  getRecordsForWorkout(workoutId: string): Record[] | undefined {
    try {
      const records: Record[] = this.records.filter(
        (record) => record.workout === workoutId
      );

      if (!records) {
        throw {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: `Can't find workout with the id '${workoutId}'`,
        };
      }

      return records;
    } catch (error: any) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  }
}
