import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    picture: {type: String, required: true},
    age: {type: Number, required: true},
    skills: {type: Array, required: true }
  },
  {versionKey:false , timestamps: true}
);

export default model('Developers', userModel);

