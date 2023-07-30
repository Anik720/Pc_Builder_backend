import { Request, Response, NextFunction, RequestHandler } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import pick from '../../../shared/pick'
import { PCService } from './pc.service'
import { IPc } from './pc.interface'
import { pcFilterableFields } from './pc.constant'

const createPc: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...pcData } = req.body
    const result = await PCService.createPc(pcData)

    sendResponse<IPc>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pc created successfully',
      data: result,
    })
  }
)

const getAllPcs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, pcFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await PCService.getAllPcs(filters, paginationOptions)

  sendResponse<IPc[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PCs retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSinglePc= catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await PCService.getSinglePc(id)

  sendResponse<IPc>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PC retrieved successfully',
    data: result,
  })
})

const updatePc = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await PCService.updatePc(id, updatedData)

  sendResponse<IPc>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pc updated successfully !',
    data: result,
  })
})
const deletePc= catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await PCService.deletePc(id)

  sendResponse<IPc>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pc deleted successfully',
    data: result,
  })
})
// const addToWishList = catchAsync(async (req: Request, res: Response) => {
//   const { ...bookdata } = req.body
//   const result = await BookService.addToWishList(bookdata)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Add to wishlisj=t successfully',
//     data: result,
//   })
// })
// const getWishList = catchAsync(async (req: Request, res: Response) => {
//   const email = req.query.email
//   console.log(91, email)
//   const result = await BookService.getWishList(email)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Wishlist retrieved successfully',
//     data: result,
//   })
// })
export const PCController = {
  createPc,
  getAllPcs,
  getSinglePc,
  updatePc,
  deletePc,
  // addToWishList,
  // getWishList,
}
