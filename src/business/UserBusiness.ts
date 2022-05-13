import { compare } from "bcryptjs";
import UserData from "../data/UserData";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LoginInputDTO } from "../types/loginInputDTO";
import { SignupInputDTO } from "../types/signupInputDTO";

export default class UserBunisses {

    constructor(
        private userData: UserData,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    signup = async (input: SignupInputDTO) => {
        const { name, email, password, role } = input
        if (!name || !email || !password || !role) {
            throw new Error("Preencha todos os campos")
        }

        const registredEmail = await this.userData.findByEmail(email)
        if (registredEmail) {
            throw new Error("Email já cadastrado")
        }

        const id = this.idGenerator.generateId()

        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            role
        )

        await this.userData.insert(user)

        const token = this.authenticator.generateToken({ id, role })

        return token

    }

    login = async (input: LoginInputDTO) => {
        const { email, password } = input

        if (!email || !password) {
            throw new Error("Preencha todos os campos")
        }

        const registredUser = await this.userData.findByEmail(email)
        if (!registredUser) {
            throw new Error("Email não encontrado")
        }

        const passwordCorrect = await compare(
            password,
            registredUser.password
        )

        if (!passwordCorrect) {
            throw new Error("Senha inválida")
        }

        const token = this.authenticator.generateToken({ id: registredUser.id, role: registredUser.role })
        return token
    }
}