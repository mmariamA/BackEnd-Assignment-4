
const express = require("express")

const dotenv = require("dotenv")
const connectDB = require("./database")
const Patients = require("./models/patients")
const { findById } = require("./models/patients")
dotenv.config()


const app = express()
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 6000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.post("/patient", async(req, res)=>{
    try {
       const {name, cardNo, doctorAssigned, nurseAssigned, Diagnosis, DoctorReport, nameOfNextOfKin, phoneNumberOfNextOfKin} = req.body
       
       const patient = await Patients.findOne({cardNo: cardNo})

       if(patient)
       return res.status(404).json({msg: "Patient already exists!"})

       const newPatient = new Patients ({name, cardNo, doctorAssigned, nurseAssigned, Diagnosis, DoctorReport, nameOfNextOfKin, phoneNumberOfNextOfKin})

       await newPatient.save()

       return res.status(200).json({msg: "Patient added succesfully"})

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

app.get("/patient/:id", async(req, res)=>{
    try {
        const {id} = req.params

        const patient = await Patients.findById(id)

        if(!patient)
        return res.status(404).json({msg: "This patient does not exist!"})

        return res.status(200).json ({msg: patient})

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

app.get("/patients", async(req, res)=>{
    try {
        const allPatients = await Patients.find()

        if(!allPatients)
        return res.status(404).json({msg: "No patient found"})

        return res.status(200).json(allPatients)

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

app.put("/patient/:id", async (req, res)=>{
    try {
        const {id} = req.params

        const {name, cardNo, doctorAssigned, nurseAssigned, Diagnosis, DoctorReport, nameOfNextOfKin, phoneNumberOfNextOfKin} = req.body

        const patient = await Patients.findByIdAndUpdate(id, {name, cardNo, doctorAssigned, nurseAssigned, Diagnosis, DoctorReport, nameOfNextOfKin, phoneNumberOfNextOfKin})

        return res.status(200).json({msg: "Patient  successfully Updated"})

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

app.delete("/patient/:id", async (req, res)=>{
    try {
        const id = req.params.id

        const deletePatient = await Patients.findById(id)
        if(!deletePatient)
        return res.status(404).json({msg: "this patient does not exist!"}) 

        const deletingPatient = await Patients.findByIdAndDelete(id)

        return res.status(200).json({msg: "Patient deleted sucessfully. E don well"})
    
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})