import userModel from '../models/models.js';

const usersController = {
  createNewuser: async (req, res)=>{
    try{
      let newUser = new userModel(req.body);
      // take out the initial date.
      const { dateStart } = newUser;
      // use the function to get: end date and days left
      const arrWithInfo = calculateExpiryDate(dateStart);
      // add property to model
      newUser.startEndLeft = arrWithInfo;

      // save in MongoDB Atlas
      const createdUser = await newUser.save();

      if(createdUser._id){
        res.json({message: 'User created successfully.'});
      } 
    } catch(error) {
      res.json({message: 'Error. Check all the required fields'});
    }
  },

  seeAllUsers: async (req, res)=>{
    try{
      const allUsers = await userModel.find();
      res.json(allUsers);
    } catch(error){
      res.json({message: 'Error. Make sure your server is running and that the APIs url is typed correctly'});
    }
  },

  seeOneUser: async (req, res)=>{
    try{
      const oneUser = await userModel.findById(req.params.id);
      res.json(oneUser);
    } catch(error){
      res.json({message: 'Error. Make sure the user ID is correct'});
    }
  },

  updateUserInfo: async (req, res)=>{
    try{
      const newInfo = await userModel.findByIdAndUpdate(req.params.id , req.body);
      res.json({message: "User's info has been updated."});
    } catch(error){
      res.json({message: 'Error. Make sure the user ID is correct and you include all the required fields.'});
    }
  },

  deleteUser: async (req, res)=>{
    try{
      const userToBeDeleted = await userModel.findByIdAndDelete(req.params.id);
      res.json({message: "User has been removed."});
    } catch(error){
      res.json({message: 'Error. Make sure the user ID is correct'});
    }
  }
}

export default usersController;

function calculateExpiryDate (startDate){
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']

  // START
  const newStartDate = new Date(startDate);
  // add more day
  const newStartDate2 = newStartDate.getTime() + (1 * 24 * 60 * 60 * 1000)
  const newStartDate3 = new Date(newStartDate2)
  // formating the date
  const formatedStartDate = ("0" + newStartDate3.getDate()).slice(-2) + " " + months[newStartDate3.getMonth()] + ", " + newStartDate3.getFullYear()

  //END
  const startDateObejct = new Date(startDate)
  // add 30 days
  const expiryDate = new Date(startDateObejct.getTime() + (30 * 24 * 60 * 60 * 1000)) 
  // formating the date
  const formatedExpiryDate = ("0" + (expiryDate.getDate())).slice(-2) + " " + months[expiryDate.getMonth()] + ", " + expiryDate.getFullYear()

  //DAYS LEFT
  const today = new Date();
  const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 ));
    
  return {
    start: formatedStartDate,
    end: formatedExpiryDate,
    daysLeft,
  }
}