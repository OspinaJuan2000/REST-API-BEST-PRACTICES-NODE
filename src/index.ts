import express, { Express, Request, Response } from "express";
import { workoutRouter as v1WorkoutRouter } from "./v1/routes/workout.router";

const app: Express = express();
const PORT: string = process.env.PORT || "3000";

// For testing purposes
app.get("/", (req: Request, res: Response) => {
  res.send("<h2>It's Working!</h2>");
});

app.use(express.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
