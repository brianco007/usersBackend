import { Schema, model } from "mongoose";

const ticketModel = new Schema(
  {
    fullName: {type: String, required: true},
    userId: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    numberOfDays: {type: String, required: true},
    phone: {type: String},
    email: {type: String}
  },
  {versionKey:false , timestamps: true}
);

export default model('Gym Tickets', ticketModel);

