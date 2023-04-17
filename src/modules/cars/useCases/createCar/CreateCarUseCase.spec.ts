import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car", 
            description: "Description car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Brand",
            category_id: "category"
        })
        expect(car).toHaveProperty("id")
    })

    it("should not be able to create a car with exists license plate", () => {
        expect(async () => {
            const car = {
                name: "Name car", 
                description: "Description car", 
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 60, 
                brand: "Brand",
                category_id: "category"
            }

            await createCarUseCase.execute({
                name: car.name, 
                description: car.description, 
                daily_rate: car.daily_rate, 
                license_plate: car.license_plate, 
                fine_amount: car.fine_amount, 
                brand: car.brand,
                category_id: car.category_id
            })

            await createCarUseCase.execute({
                name: car.name, 
                description: car.description, 
                daily_rate: car.daily_rate, 
                license_plate: car.license_plate, 
                fine_amount: car.fine_amount, 
                brand: car.brand,
                category_id: car.category_id
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to create a new car with available true", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car", 
            description: "Description car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Brand",
            category_id: "category"
        })

        console.log(car)

        expect(car.available).toBe(true)
    })
})

/**
 * name, description, daily_rate, license_plate, fine_amount, brand, category_id
 * 
 */