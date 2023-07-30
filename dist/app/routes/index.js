"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pc_route_1 = require("../modules/books/pc.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/pc',
        route: pc_route_1.PCRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
