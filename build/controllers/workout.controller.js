"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneWorkout = exports.updateOneWorkout = exports.getOneWorkout = exports.getAllWorkouts = exports.createNewWorkout = void 0;
const workoutService = __importStar(require("../services/workout.service"));
const createNewWorkout = (req, res) => {
    const { body } = req;
    if (!body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips) {
        res.status(400 /* HTTP_STATUS_CODES.BAD_REQUEST */).json({
            status: "FAILED",
            data: {
                error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
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
        const createdWorkout = workoutService.createNewWorkout(newWorkout);
        res
            .status(201 /* HTTP_STATUS_CODES.CREATED */)
            .json({ status: "OK", data: createdWorkout });
    }
    catch (error) {
        res.status(error.status || 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */).json({
            status: "FAILED",
            data: {
                error: (error === null || error === void 0 ? void 0 : error.message) || error,
            },
        });
    }
};
exports.createNewWorkout = createNewWorkout;
const getAllWorkouts = (req, res) => {
    const { mode } = req.query;
    try {
        const allWorkouts = workoutService.getAllWorkouts({ mode });
        res.status(200 /* HTTP_STATUS_CODES.OK */).json({ status: "OK", data: allWorkouts });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */)
            .json({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
};
exports.getAllWorkouts = getAllWorkouts;
const getOneWorkout = (req, res) => {
    const { params: { workoutId }, } = req;
    if (!workoutId) {
        res.status(400 /* HTTP_STATUS_CODES.BAD_REQUEST */).json({
            status: "FAILED",
            data: {
                error: `Parameter 'id' can not be empty`,
            },
        });
        return;
    }
    try {
        const workout = workoutService.getOneWorkout(workoutId);
        res.status(200 /* HTTP_STATUS_CODES.OK */).json({ status: "OK", data: workout });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */)
            .json({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
};
exports.getOneWorkout = getOneWorkout;
const updateOneWorkout = (req, res) => {
    const { body, params: { workoutId }, } = req;
    if (!workoutId) {
        res.status(400 /* HTTP_STATUS_CODES.BAD_REQUEST */).json({
            status: "FAILED",
            data: {
                error: `Parameter 'id' can not be empty`,
            },
        });
        return;
    }
    try {
        const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
        res
            .status(200 /* HTTP_STATUS_CODES.OK */)
            .json({ status: "OK", data: updatedWorkout });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500 /* HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR */)
            .send({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
};
exports.updateOneWorkout = updateOneWorkout;
const deleteOneWorkout = (req, res) => {
    const { params: { workoutId }, } = req;
    if (!workoutId) {
        res.status(400 /* HTTP_STATUS_CODES.BAD_REQUEST */).json({
            status: "FAILED",
            data: {
                error: `Parameter 'id' can not be empty`,
            },
        });
        return;
    }
    try {
        workoutService.deleteOneWorkout(workoutId);
        res.status(204 /* HTTP_STATUS_CODES.NO_CONTENT */).json({ status: "OK" });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
};
exports.deleteOneWorkout = deleteOneWorkout;
