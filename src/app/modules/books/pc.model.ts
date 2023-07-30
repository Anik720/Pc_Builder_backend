import { Model, Schema, model } from 'mongoose'
import { IPc, PcModel } from './pc.interface'

const pcSchema = new Schema<IPc>(
  {
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
  },
  {
    timestamps: true,
  }
)

const PC = model<IPc, PcModel>('Pc', pcSchema)

export default PC
