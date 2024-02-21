import { Router } from "express";
import ticketsController from "../controllers/ticketsController.js";

const ticketRouter = Router();

ticketRouter.post("/", ticketsController.createNewTicket);
ticketRouter.get("/", ticketsController.seeAllTickets);
ticketRouter.get("/:id", ticketsController.seeOneTicket);
ticketRouter.put("/:id", ticketsController.updateTicket);
ticketRouter.delete("/:id", ticketsController.deleteTicket);

export default ticketRouter;
