import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

username: {

type: String,

required: true,

unique: true,

},

email: {

type: String,

required: true,

unique: true,

},

password: {

type: String,

required: true,

},

profilePic: {

type: String,

default:

"https://api.dicebear.com/7.x/initials/svg?seed=User"

},

});

export default mongoose.model(

"User",

userSchema

);
