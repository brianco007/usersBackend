import storeModel from '../models/storeModel.js';

const storeController = {
  createNewproduct: async (req, res)=>{
    try{
      const newProduct = new storeModel(req.body);
      const createdProduct = await newProduct.save();
      if(createdProduct._id){
        res.json({message: 'Product created successfully.'});
      } 
    } catch(error) {
      res.json({message: 'Error. Check all the required fields'});
    }
  },

  seeAllProducts: async (req, res)=>{
    try{
      const allProducts = await storeModel.find();
      res.json(allProducts);
    } catch(error){
      res.json({message: 'Error. Make sure your server is running and that the APIs url is typed correctly', typeOfError: error});
    }
  },

  seeOneProduct: async (req, res)=>{
    try{
      const oneProduct = await storeModel.findById(req.params.id);
      res.json(oneProduct);
    } catch(error){
      res.json({message: 'Error. Make sure the product ID is correct', typeOfError: error});
    }
  },

  updateProduct: async (req, res)=>{
    try{
      const newInfo = await storeModel.findByIdAndUpdate(req.params.id , req.body);
      res.json({message: "The products's info has been updated."});
    } catch(error){
      res.json({message: 'Error. Make sure the user ID is correct and you include all the required fields.', typeOfError: error});
    }
  },

  deleteProduct: async (req, res)=>{
    try{
      const productToBeDeleted = await storeModel.findByIdAndDelete(req.params.id);
      res.json({message: "Product has been removed."});
    } catch(error){
      res.json({message: 'Error. Make sure the product ID is correct', typeOfError: error});
    }
  }
}

export default storeController;