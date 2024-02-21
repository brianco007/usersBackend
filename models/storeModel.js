import { Schema, model } from "mongoose";

const storeModel = new Schema(
  {
    concept: {type: String, required: true},
    value: {type: Number, required: true},
    quantity: {type: Number, required: true},
    notes: {type: String},
    createdBy: {type: String, required: true}
  },
  {versionKey:false , timestamps: true}
);

export default model('Gym Store Database', storeModel);

