"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./v1/swagger");
const workout_router_1 = require("./v1/routes/workout.router");
const app = (0, express_1.default)();
const PORT = process.env.PORT || "3000";
// For testing purposes
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});
app.use(express_1.default.json());
app.use("/api/v1/workouts", workout_router_1.workoutRouter);
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    (0, swagger_1.swaggerDocs)(app, PORT);
});
