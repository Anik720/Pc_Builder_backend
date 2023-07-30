"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCRouter = void 0;
const express_1 = __importDefault(require("express"));
const pc_controller_1 = require("./pc.controller");
const router = express_1.default.Router();
router.post('/', pc_controller_1.PCController.createPc);
router.get('/:id', pc_controller_1.PCController.getSinglePc);
router.patch('/:id', pc_controller_1.PCController.updatePc);
router.delete('/:id', pc_controller_1.PCController.deletePc);
router.get('/', pc_controller_1.PCController.getAllPcs);
exports.PCRouter = router;
