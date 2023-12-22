import { Router } from "express";
import usersController from "../controllers/controllers.js";

const mainRouter = Router();

mainRouter.post('/', usersController.createNewuser);
mainRouter.get('/', usersController.seeAllUsers);
mainRouter.get('/:id', usersController.seeOneUser);
mainRouter.put('/:id', usersController.updateUserInfo);
mainRouter.delete('/:id', usersController.deleteUser);




export default mainRouter;
