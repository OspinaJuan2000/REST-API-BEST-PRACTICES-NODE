import { Record } from "../models/record.model";
import { RecordRepository } from "../repository/record.repository";
import { RecordRepositoryLocal } from "../repository/record.repository-local";

const recordRepository: RecordRepository = new RecordRepositoryLocal();

const getRecordsForWorkout = (workoutId: string): Record[] | undefined => {
  try {
    const records: Record[] | undefined =
      recordRepository.getRecordsForWorkout(workoutId);
    return records;
  } catch (error) {
    throw error;
  }
};

export { getRecordsForWorkout };
