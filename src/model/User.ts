import { USER_ROLES } from "../types/typeEnum";

export default class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ){}
}