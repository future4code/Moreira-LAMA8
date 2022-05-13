import BandData from "../data/BandData";
import Band from "../model/Banda";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { RegistrerBandDTO } from "../types/registrerBandDTO";


export default class BandBunisses {

  constructor(
    private bandData: BandData,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) { }

  createBand = async (input: RegistrerBandDTO) => {
    const { name, music_genre, responsible } = input;

    if (!name || !music_genre || !responsible) {
      throw new Error("Preencha todos os campos")
    }

    const registredBand = await this.bandData.findByName(name)
    if (registredBand) {
      throw new Error("Já existe uma banda com esse nome")
    }

    const registredResponsible = await this.bandData.findByResponsible(responsible)
    if (registredResponsible) {
      throw new Error("Essa pessoa já esta reponsável por outra banda")
    }

    const id = this.idGenerator.generateId()

    const band = new Band(
      id,
      name,
      music_genre,
      responsible
    )

    await this.bandData.insert(band)

  }

  getBandById = async (id: string) => {
    const post: Band = await this.bandData.findBandById(id);

    return post;
}

}