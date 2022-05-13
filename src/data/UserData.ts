import { BaseDatabase } from "./BaseDatabase"
import { FindByEmailResponse } from "../types/findByEmailResponse"
import User from "../model/User"

export default class UserData extends BaseDatabase {
    protected TABLE_NAME = "NOME_TABELAS_USUÁRIOS"

    insert = async (user: User) => {
        try {
            await this.connection
                .into(this.TABLE_NAME)
                .insert(user)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Erro do banco")
            }
        }
    }

    findByEmail = async (email: string) => {
        try {
            const result: FindByEmailResponse = await this.connection
                .select("*")
                .from(this.TABLE_NAME)
                .where({ email })

            return result[0]
        } catch (error) {
            throw new Error("Usuário não encontrado")
        }
    }
}