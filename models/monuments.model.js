const mongoose = require("mongoose")
const Schema = mongoose.Schema

const monumentSchema = new Schema({
    jsonURL: String,
    originID: Number,
    title: String,
    relation: String,
    address: {
        districtURL: String,
        areaURL: String,
        locality: String,
        postalCode: Number,
        street: String
    },
    location: { type: { type: String }, coordinates: [Number] },
    references: String,
    // activities: [{
    //     type: Schema.Type.ObjectId,
    //     ref: "Activity"
    // }]

}, {
    timestamps: true
})
monumentSchema.index({ location: '2dsphere' })

const Monument = mongoose.model("Monument", monumentSchema)

module.exports = Monument