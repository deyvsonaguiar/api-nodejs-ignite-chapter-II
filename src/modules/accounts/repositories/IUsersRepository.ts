import { User } from "../entities/user"

interface IUsersRepository {
    findByEmail(email: string): Promise<User>
    create(data: ICreateUserDTO): Promise<void>

}

export  {IUsersRepository}