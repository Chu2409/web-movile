import express from "express";
import cors from "cors";
import agencyRoutes from "./routes/agencyRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import dishRoutes from "./routes/dishesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/agencies", agencyRoutes);
app.use("/channels", channelRoutes);
app.use("/dishes", dishRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error.message);
    process.exit(1);
  }
};

startServer();

