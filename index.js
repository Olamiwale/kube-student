import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

const studentSchema = new mongoose.Schema(
  {
    firstName: String,
    secondName: String,
    team: String,
    skinColor: String,
    country: String,
    height: Number,
    weight: Number,
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

//route

app.get("/", (req, res) => {
  res.send("This is kubernetes testing project");
});

app.get("/api/students", async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});

app.post("/api/student", async (req, res) => {
  try {
    const { firstName, secondName, team, skinColor, country, height, weight } =
      req.body;
    const newStudent = await Student.create({
      firstName,
      secondName,
      team,
      skinColor,
      country,
      height,
      weight,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: "Invalid Entry" });
  }
});

//mongo connection
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("Not Connected");
  });

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}`);
});
