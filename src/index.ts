import express from "express";
import BandBunisses from "./business/BandBunisses";
import UserBunisses from "./business/UserBusiness";
import { app } from "./controller/app";
import BandController from "./controller/BandController";
import UserController from "./controller/UserController";
import BandData from "./data/BandData";
import UserData from "./data/UserData";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

const userController = new UserController(
    new UserBunisses(
        new UserData(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator()
    )
)

const bandController = new BandController(
    new BandBunisses(
        new BandData(),
        new IdGenerator(),
        new Authenticator()
    )
)

app.post("/user/signup", userController.signup);
app.get("/user/login", userController.login);

app.post("/user/band", bandController.insertBand)
app.get("/user/band/:id", bandController.getPostById)