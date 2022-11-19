import fs from 'fs'
import {parse} from 'csv-parse'
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'

interface IImportCategory {
    name: string
    description: string
}
class ImportCategoryUseCase {

    constructor(private categoriesRepository: CategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {

        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)

            const categories: IImportCategory[] = []
            const parseFile = parse({
                encoding: 'utf8'
            })

            stream.pipe(parseFile)

            parseFile.on("data", async (line) => {
                const [name, description] = line

                categories.push({
                    name,
                    description
                })
            })
            .on("end", () => {
                resolve(categories)
            })
            .on("error", (erro) => {
                reject(erro)
            })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {

        const categories = await this.loadCategories(file)
        console.log(categories)
    }

}

export { ImportCategoryUseCase }