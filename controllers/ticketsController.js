import ticketModel from '../models/ticketModel.js';

const ticketsController = {
  createNewTicket: async (req, res)=>{
    try{
      const newTicket = new ticketModel(req.body);
      const { endDate, startDate } = newTicket;
      const newEndDate = formatDate(endDate);
      const newStartDate = formatDate(startDate);
      newTicket.endDate = newEndDate;
      newTicket.startDate = newStartDate;

      const createdTicket = await newTicket.save();
      if(createdTicket._id){
        res.json({message: 'Ticket created successfully.'});
      } 
    } catch(error) {
      res.json({message: 'Error. Check all the required fields'});
      console.log(error)
    }
  },

  seeAllTickets: async (req, res)=>{
    try{
      const allTickets = await ticketModel.find();
      res.json(allTickets);
    } catch(error){
      res.json({message: 'Error. Make sure your server is running and that the APIs url is typed correctly', typeOfError: error});
    }
  },

  seeOneTicket: async (req, res)=>{
    try{
      const oneTicket = await ticketModel.findById(req.params.id);
      res.json(oneTicket);
    } catch(error){
      res.json({message: 'Error. Make sure the ticket ID is correct', typeOfError: error});
    }
  },

  updateTicket: async (req, res)=>{
    try{
      let { startDate, endDate } = req.body;
      const newStartDate = formatDate(startDate);
      const newEndDate = formatDate(endDate);
      req.body.startDate = newStartDate;
      req.body.endDate = newEndDate;

      const newInfo = await ticketModel.findByIdAndUpdate(req.params.id , req.body);
      res.json({message: "The ticket info has been updated."});
    } catch(error){
      res.json({message: 'Error. Make sure the ticket ID is correct and you include all the required fields.', typeOfError: error});
    }
  },

  deleteTicket: async (req, res)=>{
    try{
      const ticketToBeDeleted = await ticketModel.findByIdAndDelete(req.params.id);
      res.json({message: "Ticket has been removed."});
    } catch(error){
      res.json({message: 'Error. Make sure the ticket ID is correct', typeOfError: error});
    }
  }
}

export default ticketsController;

function formatDate(dateInString){
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']

  const dateInMili = new Date(dateInString).getTime()  //+ (1 * 24 * 60 * 60 * 1000);
  const currentDate = new Date(dateInMili);

  const formatedDate = ("0" + currentDate.getDate()).slice(-2) + " " + months[currentDate.getMonth()] + ", " + currentDate.getFullYear()

  return formatedDate;
}