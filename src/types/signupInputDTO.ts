import { USER_ROLES } from "./typeEnum"

export type SignupInputDTO = {
    name: string
    email: string
    password: string
    role: USER_ROLES
}