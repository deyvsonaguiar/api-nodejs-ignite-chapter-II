import { ImportCategoryUseCase } from "./importCategoryUseCase";
import { ImportCategoryController } from "./importCategoryController";


const categoriesRepository = null

const importCategoryController = new ImportCategoryController()

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository)

export { importCategoryController }

