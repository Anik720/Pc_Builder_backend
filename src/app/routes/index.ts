import express from 'express'

import { PCRouter } from '../modules/books/pc.route'

const router = express.Router()
const moduleRoutes = [
  {
    path: '/PC',
    route: PCRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
