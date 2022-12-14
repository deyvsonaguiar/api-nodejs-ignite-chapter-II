import { Router } from "express"
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController"
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController"
import multer from "multer"
import uploadConfig from "../config/upload"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"


const usersRoutes = Router()

const usersController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

usersRoutes.post("/", usersController.handle)
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
    )


export { usersRoutes }