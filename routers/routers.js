import { Router } from "express";
import usersController from "../controllers/controllers.js";

const mainRouter = Router();

mainRouter.post('/', usersController.createNewuser);
mainRouter.get('https://gymusersdata-405b6a41e1bf.herokuapp.com', usersController.seeAllUsers);
mainRouter.get('/:id', usersController.seeOneUser);
mainRouter.put('/:id', usersController.updateUserInfo);
mainRouter.delete('/:id', usersController.deleteUser);




export default mainRouter;
