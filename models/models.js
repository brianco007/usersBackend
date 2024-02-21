import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    fullName: {type: String, required: true},
    idNumber: {type: String, required: true},
    phone: {type: String},
    email: {type: String},
    dateStart: {type: String, required: true},
    createdBy: {type: String}
  },
  {versionKey:false , timestamps: true}
);

export default model('Gym Users New Database', userModel);

