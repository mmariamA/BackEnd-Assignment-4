const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "please add name"],
        trim: true,
        maxLength: [20, "your name cannot exeed 20 characters"]
    },
    cardNo:{
        type: Number,
        required: [true, "please add your Card Number"],
        trim: true,
    },
    doctorAssigned:{
        type: String,
        required: [true, "If first time, please state so"],
        trim: true,
    },
    nurseAssigned:{
        type: String,
        trim: true,
    },
    Diagnosis:{
        type: String,
        required: [true, "Patient's Diagnosis"],
        trim: true,
    },
    DoctorReport:{
        type: String,
        trim: true,
    },
    nameOfNextOfKin:{
        type: String,
        required: [true, "please add name of next of kin"],
        trim: true,
        maxLength: [20, "Name cannot exeed 20 characters"]
    },
    phoneNumberOfNextOfKin:{
        type: Number,
        required: [true, "please add phone number incase you die"],
        trim: true,
    }
}, {timeStamps: true}

)

const Patients = mongoose.model("Patients", patientSchema)

module.exports = Patients