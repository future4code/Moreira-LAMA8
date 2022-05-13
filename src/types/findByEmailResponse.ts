import { USER_ROLES } from "./typeEnum"

export type FindByEmailResponse = {
    id: string
    name: string
    email: string
    password: string
    role: USER_ROLES
}[]