const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100,
        unique: true,
    },
    accessKey: {
        type: String,
        required: true,
        max: 100
    },
    secretKey: {
        type: String,
        required: true,
        max: 100
    },
    region: {
        type: String,
        required: true,
        max: 100
    }
});

AccountSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Account', AccountSchema);
