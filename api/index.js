import express from "express";
import tasksRoutes from "./routes/tasks.js";
const app = express()

app.use(express.json())



app.use("/api/tasks", tasksRoutes)


app.listen(8800, () => {
  console.log("Connected to backend.")
})
