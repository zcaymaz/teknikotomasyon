const Service = require('../models/serviceModel')

const ServiceCtrl = {
    getAllService: async (req, res) => {
        try {
            const services = await Service.find()
            res.json(services)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getServicesUser: async (req, res) => {
        try {
            const services = await Service.find({ serviceName: req.body.serviceName })
            res.json(services)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getServiceById: async (req, res) => {
        try {
            const serviceId = req.params.id; // URL'den kartın MongoDB ID'sini alın

            const service = await Service.findById(serviceId); // MongoDB'den kart verilerini alın

            if (!service) {
                // Eğer kart yoksa hata döndürün
                return res.status(404).json({ msg: "Servis bulunamadı" });
            }

            res.json(service); // Kart verilerini JSON formatında sunun
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createService: async (req, res) => {
        try {
            const { serviceName, serviceGsmno, serviceAddress, serviceDesc, serviceBrand, serviceModel, serviceType, servicePrice } = req.body;

            const newService = new Service({
                serviceName, serviceGsmno, serviceAddress, serviceDesc, serviceBrand, serviceModel, serviceType, servicePrice
            })

            await newService.save()
            res.json({ msg: "Yeni Servis Eklendi." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // deleteTask: async (req, res) => {
    //     try {
    //         await Task.findByIdAndDelete(req.params.id)
    //         res.json({ msg: "Task Silindi." })
    //     } catch (err) {
    //         return res.status(500).json({ msg: 'ksadkalsmdklasd' })
    //     }
    // },
    // updateTask: async (req, res) => {
    //     try {
    //         const { name, useremail, title, address, price, description, type, images, roomnumber, saletype, features, squaremeters } = req.body;

    //         await Task.findOneAndUpdate({ _id: req.params.id }, {
    //             name, useremail, title, address, price, description, type, images, roomnumber, saletype, features, squaremeters
    //         })

    //         res.json({ msg: "Task Güncellendi." })
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // }
}

module.exports = ServiceCtrl