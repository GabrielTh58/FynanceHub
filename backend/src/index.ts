import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: any, res:any) => {
    res.send("Hello World")
})

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`); // revisar
})