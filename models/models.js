import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    fullName: {type: String, required: true},
    idNumber: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    createdBy: {type: String},
    datesToShow: {type: Object},
    phone: {type: String},
    email: {type: String},
    notes: {type: String}
  },
  {versionKey:false , timestamps: true}
);

export default model('Gym Users New Database', userModel);

