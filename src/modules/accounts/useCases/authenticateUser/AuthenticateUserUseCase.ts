import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../shared/errors/AppError"


interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute( { email, password }: IRequest): Promise<IResponse> {
        // Verificar se o email existe
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError("Email or password incorrect!")
        }
        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }
        // Gerar o token
        const token = sign({}, "e10adc3949ba59abbe56e057f20f883e", {
            subject: user.id,
            expiresIn: "1d",
        })
        // Retornar o token

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }