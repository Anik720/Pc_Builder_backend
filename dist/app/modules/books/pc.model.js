"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pcSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, require: true },
    description: { type: String, require: true },
    key_features: { type: String, require: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    // seller: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
}, {
    timestamps: true,
});
const PC = (0, mongoose_1.model)('Pc', pcSchema);
exports.default = PC;
