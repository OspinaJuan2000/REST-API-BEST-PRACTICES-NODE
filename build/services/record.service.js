"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordsForWorkout = void 0;
const record_repository_local_1 = require("../repository/record.repository-local");
const recordRepository = new record_repository_local_1.RecordRepositoryLocal();
const getRecordsForWorkout = (workoutId) => {
    try {
        const records = recordRepository.getRecordsForWorkout(workoutId);
        return records;
    }
    catch (error) {
        throw error;
    }
};
exports.getRecordsForWorkout = getRecordsForWorkout;
