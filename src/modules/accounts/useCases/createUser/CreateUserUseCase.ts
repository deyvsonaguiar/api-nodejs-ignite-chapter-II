import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs"

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
        }: ICreateUserDTO): Promise<void> {

            const passwordHash = await hash(password, 8)

            await this.userRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license
        })
    }
}

export { CreateUserUseCase }