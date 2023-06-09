"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestController_1 = require("../Contoller/TestController");
const router = express_1.default.Router();
router.route("/createTest").post(TestController_1.creatingTest);
router.route("/viewTest").get(TestController_1.getAllTest);
router.route("/viewTested").get(TestController_1.getAllTested);
router.route("/:id/create-questions").post(TestController_1.CreateQuestions);
exports.default = router;
