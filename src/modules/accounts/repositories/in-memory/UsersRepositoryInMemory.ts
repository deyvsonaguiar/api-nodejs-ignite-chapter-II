import { User } from "../../infra/typeorm/entities/user";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {

    users: User[] = []

    async create({name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const user = new User()
        Object.assign(user, {
            name,
            password,
            email,
            driver_license,
        })

        this.users.push(user)
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.users.find((user) => user.email === email)
        return user
    }
    async findById(id: string): Promise<User> {
        return await this.users.find((user) => user.id === id)
    }

}

export { UsersRepositoryInMemory}