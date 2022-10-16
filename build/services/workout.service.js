"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneWorkout = exports.updateOneWorkout = exports.createNewWorkout = exports.getOneWorkout = exports.getAllWorkouts = void 0;
const uuid_1 = require("uuid");
const workout_repository_local_1 = require("../repository/workout.repository-local");
const workoutRepository = new workout_repository_local_1.WorkoutRepositoryLocal();
const getAllWorkouts = (filterParams) => {
    try {
        const allWorkouts = workoutRepository.getAllWorkouts(filterParams);
        return allWorkouts;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllWorkouts = getAllWorkouts;
const getOneWorkout = (workoutId) => {
    try {
        const workout = workoutRepository.getOneWorkoutById(workoutId);
        return workout;
    }
    catch (error) {
        throw error;
    }
};
exports.getOneWorkout = getOneWorkout;
const createNewWorkout = (newWorkout) => {
    const workoutToInsert = Object.assign(Object.assign({}, newWorkout), { id: (0, uuid_1.v4)(), createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }), updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }) });
    try {
        const createdWorkout = workoutRepository.createNewWorkout(workoutToInsert);
        return createdWorkout;
    }
    catch (error) {
        throw error;
    }
};
exports.createNewWorkout = createNewWorkout;
const updateOneWorkout = (workoutId, changes) => {
    try {
        const updatedWorkout = workoutRepository.updateOneWorkoutById(workoutId, changes);
        return updatedWorkout;
    }
    catch (error) {
        throw error;
    }
};
exports.updateOneWorkout = updateOneWorkout;
const deleteOneWorkout = (workoutId) => {
    try {
        workoutRepository.deleteOneWorkoutById(workoutId);
    }
    catch (error) {
        throw error;
    }
};
exports.deleteOneWorkout = deleteOneWorkout;
