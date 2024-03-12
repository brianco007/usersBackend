import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    fullName: {type: String, required: true},
    idNumber: {type: String, required: true},
    dateStart: {type: String, required: true},
    createdBy: {type: String},
    startEndLeft: {type: Object},
    phone: {type: String},
    email: {type: String},
    notes: {type: String}
  },
  {versionKey:false , timestamps: true}
);

export default model('Gym Users New Database', userModel);

