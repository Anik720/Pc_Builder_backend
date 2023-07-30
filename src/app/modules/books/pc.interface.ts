import { Model, Schema, Types } from 'mongoose'

export type IPc = {
  productName: string
  category: string
  price: number
  status: string
  rating: number
  wishlist: Array<object>
  image:string
  description:string
  key_features:string
  //   seller: Types.ObjectId | IUser
}

export type PcModel = Model<IPc, Record<string, unknown>>
export type IPcFilters = {
  searchTerm?: string
  productName?: string
  category?: string
  price?: number
  status?: string
  rating?: number
  wishlist?: Array<object>
}
