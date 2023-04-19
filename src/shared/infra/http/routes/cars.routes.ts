import { Router } from "express"
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"


const carsRoutes = Router()

const createCarController = new CreateCarController()

//carsRoutes.use(ensureAuthenticated)
carsRoutes.post("/", createCarController.handle)

export { carsRoutes }