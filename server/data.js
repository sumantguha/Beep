const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    type : {type : String, required: true},
    value : {type : String, required: true},
}, {
    collection: 'beep'
});

const Data = mongoose.model('DataSchema', DataSchema)
module.exports.Data = Data