"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutRepositoryLocal = void 0;
const db_1 = require("../database/db");
class WorkoutRepositoryLocal {
    constructor() {
        this.workouts = [];
        this.workouts = db_1.db.workouts;
    }
    createNewWorkout(newWorkout) {
        const isAlreadyAdded = this.workouts.findIndex((workout) => workout.name === newWorkout.name) >
            -1;
        if (isAlreadyAdded) {
            throw {
                status: 400 /* HTTP_STATUS_CODES.BAD_REQUEST */,
                message: `Workout with the name ${newWorkout.name} already exists`,
            };
        }
        try {
            this.workouts.push(newWorkout);
            return newWorkout;
        }
        catch (error) {
            throw {
                status: 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */,
                message: (error === null || error === void 0 ? void 0 : error.message) || error,
            };
        }
    }
    getAllWorkouts(filterParams) {
        let workouts = this.workouts;
        try {
            if (filterParams.mode) {
                return this.workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode));
            }
            return workouts;
        }
        catch (error) {
            throw { status: 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */, message: error };
        }
    }
    getOneWorkoutById(id) {
        try {
            const workout = this.workouts.find((workout) => workout.id === id);
            if (!workout) {
                throw {
                    status: 400 /* HTTP_STATUS_CODES.BAD_REQUEST */,
                    message: `Can't find workout with the id '${id}'`,
                };
            }
            return workout;
        }
        catch (error) {
            throw {
                status: (error === null || error === void 0 ? void 0 : error.status) || 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */,
                message: (error === null || error === void 0 ? void 0 : error.message) || error,
            };
        }
    }
    updateOneWorkoutById(id, newWorkout) {
        try {
            const indexForUpdate = this.workouts.findIndex((workout) => workout.id === id);
            if (indexForUpdate === -1) {
                throw {
                    status: 400 /* HTTP_STATUS_CODES.BAD_REQUEST */,
                    message: `Can't find workout with the id '${id}'`,
                };
            }
            const updatedWorkout = Object.assign(Object.assign(Object.assign({}, this.workouts[indexForUpdate]), newWorkout), { updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }) });
            this.workouts[indexForUpdate] = updatedWorkout;
            return updatedWorkout;
        }
        catch (error) {
            throw {
                status: (error === null || error === void 0 ? void 0 : error.status) || 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */,
                message: (error === null || error === void 0 ? void 0 : error.message) || error,
            };
        }
    }
    deleteOneWorkoutById(id) {
        try {
            const indexForDeletion = this.workouts.findIndex((workout) => workout.id === id);
            if (indexForDeletion === -1) {
                throw {
                    status: 400 /* HTTP_STATUS_CODES.BAD_REQUEST */,
                    message: `Can't find workout with the id '${id}'`,
                };
            }
            this.workouts.splice(indexForDeletion, 1);
        }
        catch (error) {
            throw {
                status: (error === null || error === void 0 ? void 0 : error.status) || 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */,
                message: (error === null || error === void 0 ? void 0 : error.message) || error,
            };
        }
    }
}
exports.WorkoutRepositoryLocal = WorkoutRepositoryLocal;
