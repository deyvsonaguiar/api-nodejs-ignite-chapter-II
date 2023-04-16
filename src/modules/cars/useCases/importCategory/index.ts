import { CategoriesRepository } from "../../infra/http/typeorm/repositories/CategoriesRepository";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";


const categoriesRepository = null

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository)

const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export { importCategoryController }

