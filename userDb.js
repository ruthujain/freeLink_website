const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect("mongodb+srv://saranz:Saran%405187473@cluster0.6di5z1z.mongodb.net/freelink");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

// const clientSchema = mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     email : {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: 3,
//         maxLength: 30
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     }
// })

const userDetailsSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }, 
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 320
  },
  designation: {
    type: String,
    trim: true,
    maxLength: 50 
  },
  summary: {
    type: String,
    trim: true,
    maxLength: 250
  },
  projects: {
    type: String, 
    trim: true
  },
  charge: {
    type: String,
    trim: true,
    maxLength: 50 
  }
});

const userFinanceSchema = mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref : "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    why: { type: String, required: true },
    employment: { type: String, required: true },
    income: { type: String, required: true },
    expense: { type: String, required: true },
    other: { type: String, required: true },
    goals: { type: String, required: true }
});



const userDetails = mongoose.model('userDetails', userDetailsSchema);
const User = mongoose.model("User",userSchema)
const Client = mongoose.model("Client",userSchema);
const userFinance = mongoose.model("userFinance", userFinanceSchema)
module.exports = {
    User,
    Client,
    userDetails,
    userFinance
}