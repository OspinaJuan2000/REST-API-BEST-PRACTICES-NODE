"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordRepositoryLocal = void 0;
const db_1 = require("../database/db");
class RecordRepositoryLocal {
    constructor() {
        this.records = [];
        this.records = db_1.db.records;
    }
    getRecordsForWorkout(workoutId) {
        try {
            const records = this.records.filter((record) => record.workout === workoutId);
            if (!records) {
                throw {
                    status: 400 /* HTTP_STATUS_CODES.BAD_REQUEST */,
                    message: `Can't find workout with the id '${workoutId}'`,
                };
            }
            return records;
        }
        catch (error) {
            throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
        }
    }
}
exports.RecordRepositoryLocal = RecordRepositoryLocal;
