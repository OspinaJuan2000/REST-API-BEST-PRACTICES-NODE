import { Record } from "../model/record.model";

export interface RecordRepository {
  getRecordsForWorkout(workoutId: string): Record[] | undefined;
}
