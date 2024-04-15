import ticketModel from '../models/ticketModel.js';

const ticketsController = {
  createNewTicket: async (req, res)=>{
    try{
      let newTicket = new ticketModel(req.body);
      // take out the things you need.
      const { startDate, endDate } = newTicket;
      // use the function to get: end date and days left
      const arrWithInfo = formatDatesAndGetDaysLeft(startDate, endDate);
      // add property to model
      newTicket.datesToShow = arrWithInfo;

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
      let { startDate, endDate } = req.body
      const arrWithInfo = formatDatesAndGetDaysLeft(startDate, endDate);
      req.body.datesToShow = arrWithInfo

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

function formatDatesAndGetDaysLeft (startDate, endDate){
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']

  // START
  const stringToDate = new Date(startDate);
  // // add more day
  // const newStartDate2 = newStartDate.getTime() //+ (1 * 24 * 60 * 60 * 1000)
  // const newStartDate3 = new Date(newStartDate2)
  // formating the date
  const formatedStartDate = ("0" + stringToDate.getDate()).slice(-2) + " " + months[stringToDate.getMonth()] + ", " + stringToDate.getFullYear()

  // END
  const stringToDate2 = new Date(endDate)
  // // add 30 days
  // const expiryDate = new Date(startDateObejct.getTime() + (30 * 24 * 60 * 60 * 1000)) 
  // formating the date
  const formatedEndDate = ("0" + (stringToDate2.getDate())).slice(-2) + " " + months[stringToDate2.getMonth()] + ", " + stringToDate2.getFullYear()

  //DAYS LEFT
  const today = new Date();
  const daysLeft = Math.ceil((stringToDate2.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 )); 
    
  return {
    start: formatedStartDate,
    end: formatedEndDate,
    daysLeft,
  }
}