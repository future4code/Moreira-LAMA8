import Band from "../model/Banda"
import { FindByResponsibleOrName } from "../types/findByResponsibleOrName"
import { BaseDatabase } from "./BaseDatabase"

export default class BandData extends BaseDatabase {
    protected TABLE_NAME = "NOME_TABELA_BANDAS"

    insert = async (band: Band) => {
        try {
            await this.connection
                .into(this.TABLE_NAME)
                .insert(band)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Erro do banco")
            }
        }
    }

    findByResponsible = async (responsible: string) => {
        try {
            const result: FindByResponsibleOrName = await this.connection
                .select("*")
                .from(this.TABLE_NAME)
                .where({ responsible })

            return result[0]
        } catch (error) {
            throw new Error("O responsável por essa banda está indisponível")
        }
    }

    findByName = async (name: string) => {
        try {
            const result: FindByResponsibleOrName = await this.connection
                .select("*")
                .from(this.TABLE_NAME)
                .where({ name })

            return result[0]
        } catch (error) {
            throw new Error("O responsável por essa banda está indisponível")
        }
    }

    findBandById = async (id: string): Promise<Band> => {
        try {
            const result = await this.connection
                .select("*")
                .from(this.TABLE_NAME)
                .where({ id: id })

            return result[0]
        } catch (error) {
            throw new Error("Banda não encontrado");

        }
    }
}