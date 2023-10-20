const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    serviceName: {
        type:String,
    },
    serviceGsmno: {
        type:String,
    },
    serviceAddress:{
        type: String,
    },
    serviceDesc:{
        type: String,
    },
    serviceBrand:{
        type: String,
    },
    serviceModel:{
        type: String,
    },
    serviceType:{
        type: String,
    },
    servicePrice:{
        type: Number,
    },
    isArchived: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Service", serviceSchema)
