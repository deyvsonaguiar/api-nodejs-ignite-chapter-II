import { Car } from "../../infra/http/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = []
    
    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id  }: ICreateCarDTO): Promise<void> {
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
    }

}

export { CarsRepositoryInMemory }