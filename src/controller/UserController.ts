import { Request, Response } from "express";
import UserBunisses from "../business/UserBusiness";
import { LoginInputDTO } from "../types/loginInputDTO";
import { SignupInputDTO } from "../types/signupInputDTO";

export default class UserController {

    constructor(
        private userBusiness: UserBunisses
    ) { }

    signup = async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body

        const input: SignupInputDTO = {
            name,
            email,
            password,
            role
        }

        try {
            const token = await this.userBusiness.signup(input)
            
            res.status(201).send({ message: "Sucess!", token })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body


        const input: LoginInputDTO = {
            email,
            password
        }

        try {
            const token = await this.userBusiness.login(input)
            res.status(200).send({message: "Login efetuado", token})
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no login")
        }
    }
}