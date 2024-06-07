import express from "express";
import * as dotevnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import passwordManagerRoutes from "./routes/passwordManagerRoutes";

dotevnv.config();


if (!process.env.PORT) {
    console.log(`No port value specified...`);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// PasswordManager routes
app.use("/password-manager", passwordManagerRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});