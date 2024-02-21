import { Router } from "express";
import storeController from "../controllers/storeController.js";

const storeRouter = Router();

storeRouter.post("/", storeController.createNewproduct);
storeRouter.get("/", storeController.seeAllProducts);
storeRouter.get("/:id", storeController.seeOneProduct);
storeRouter.put("/:id", storeController.updateProduct);
storeRouter.delete("/:id", storeController.deleteProduct);

export default storeRouter;
