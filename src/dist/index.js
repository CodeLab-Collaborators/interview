"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./Routes/userRoute"));
const testRoute_1 = __importDefault(require("./Routes/testRoute"));
const app = (0, express_1.default)();
const port = 2255;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api", userRoute_1.default);
app.use("/api/test", testRoute_1.default);
app.use("/", (req, res) => {
    res.status(200).json({ message: "Welcome" });
});
mongoose_1.default
    .connect("mongodb+srv://shecodesaj:shecodesaj@cluster0.xe1jgnf.mongodb.net/newIntakeDB")
    .then(() => {
    const server = app.listen(process.env.PORT || port, () => {
        console.log("server up and running!");
    });
    process.on("uncaughtException", (err) => {
        console.log("shuttin down server bcos: uncaughtException");
        console.log(err);
        process.exit(1);
    });
    process.on("unhandledRejection", (reason) => {
        console.log("shuttin down server bcos: unhandledRejection");
        console.log(reason);
        server.close(() => {
            process.exit(1);
        });
    });
})
    .catch((err) => {
    console.log(err);
});
