import { Router } from "express"
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController"

const usersRoutes = Router()

const usersController = new CreateUserController()

usersRoutes.post("/", usersController.handle)

export { usersRoutes }