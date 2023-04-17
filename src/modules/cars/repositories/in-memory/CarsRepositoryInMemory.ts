import { Car } from "../../infra/http/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.cars.find(car => car.license_plate === license_plate)
        return car
    }

    cars: Car[] = []
    
    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id  }: ICreateCarDTO): Promise<Car> {
        const car = new Car()

        Object.assign(car, {
            name, 
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        this.cars.push(car)

        return car
    }

}

export { CarsRepositoryInMemory }