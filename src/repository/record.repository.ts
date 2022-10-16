import { Record } from "../models/record.model";

export interface RecordRepository {
  getRecordsForWorkout(workoutId: string): Record[] | undefined;
}
