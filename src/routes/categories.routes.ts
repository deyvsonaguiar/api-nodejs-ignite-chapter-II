import { Router } from 'express'
import { Category } from '../modules/cars/model/Category'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { CreateCategoryUseCase } from '../modules/cars/useCases/createCategory/CreateCategoryUseCase'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

const categories: Category[] = []

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response)
})

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list()

    return response.json(all)
})

export { categoriesRoutes }