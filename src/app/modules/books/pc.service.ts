import mongoose, { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiErrors'
import httpStatus from 'http-status'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helper/pagination'

import Book from './pc.model'

import wishList from './wishList.model'
import { IPc, IPcFilters } from './pc.interface'
import { pcSearchableFields } from './pc.constant'
import PC from './pc.model'

const createPc = async (pc: IPc): Promise<IPc | null> => {
  const newPc = await Book.create(pc)
  return newPc
}
const getAllPcs = async (
  filters: IPcFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IPc[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: pcSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await PC.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await PC.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSinglePc = async (id: string): Promise<IPc | null> => {
  const result = await PC.findOne({ _id: id })
  return result
}

const updatePc = async (
  id: string,
  payload: Partial<IPc>
): Promise<IPc | null> => {
  const isExist = await PC.findOne({ _id: id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'PC not found !')
  }

  const result = await PC.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deletePc = async (id: string): Promise<IPc | null> => {
  const result = await PC.findByIdAndDelete({ _id: id })

  return result
}

// const addToWishList = async (data: any) => {
//   const findWish = await wishList.findOne({ email: data.email })
//   let result
//   if (!findWish) {
//     result = await wishList.create(data)
//   } else {
//     result = await wishList.findOneAndUpdate(data)
//   }

//   return result
// }
// const getWishList = async (data: any) => {
//   const result = await wishList.findOne({ email: data })

//   return result
// }

export const PCService = {
  createPc,
  getAllPcs,
  getSinglePc,
  updatePc,
  deletePc,
  // addToWishList,
  // getWishList,
}
