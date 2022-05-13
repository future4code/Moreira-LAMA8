import { Request, Response } from "express";
import BandBunisses from "../business/BandBunisses";
import Band from "../model/Banda";
import { Authenticator } from "../services/Authenticator";
import { RegistrerBandDTO } from "../types/registrerBandDTO";

export default class BandController {

    constructor(
        private bandBusiness: BandBunisses
    ) { }

    insertBand = async (req: Request, res: Response) => {
        const { name, music_genre, responsible } = req.body

        const token = req.headers.authorization
        
        if(!token){
            throw new Error("Esse endpoint exige um token")
        }

        const authenticator = new Authenticator()
        
        const tokenData = authenticator.getTokenData(token)

       if(tokenData.role !== "ADMIN"){
           throw new Error("Acesso apenas para ADMINS")
       }

        const input: RegistrerBandDTO = {
            name,
            music_genre,
            responsible,
        }

        try {
            await this.bandBusiness.createBand(input)
            
            res.status(201).send({ message: "Sucess!"})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro na criação da Banda")
        }
    }

    getPostById = async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const band: Band = await this.bandBusiness.getBandById(id);

            res.status(200).send(band);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message);
            }
            res.status(500).send("Erro  tente novamente.");
        }
    };
}