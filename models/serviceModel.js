const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
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
}, {
    timestamps: true
})

module.exports = mongoose.model("Service", serviceSchema)