import { AppError } from "../../../../errors/AppError"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase


describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })
    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Usuário 1",
            email: "user1@mail.com",
            password: "1234",
            driver_license: "123456"
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    })

    it("should not be able to authenticate an user that not exists", () => {

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "!@#$%¨&"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to authenticate with incorrect password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "Usuário 2",
                email: "usuario2@mail.com",
                password: "1234",
                driver_license: "123456"
            }
    
            await createUserUseCase.execute(user)
    
            const result = await authenticateUserUseCase.execute({
                email: "usuario2@mail.com",
                password: "senha_incorreta",
            })

        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to authenticate with incorrect email", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "Usuário 3",
                email: "usuario3@mail.com",
                password: "1234",
                driver_license: "123456"
            }
    
            await createUserUseCase.execute(user)
    
            const result = await authenticateUserUseCase.execute({
                email: "emailincorreto@mail.com",
                password: "1234",
            })

        }).rejects.toBeInstanceOf(AppError)
    })

    
})