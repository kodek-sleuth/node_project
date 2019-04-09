const mongoose = require('mongoose');

//Creating Product Schema
const User = mongoose.Schema({
    Email: {type: String, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    Password: {type: String, required: true},
    Image: {type: String}
});

//Exporting it as Model
module.exports=mongoose.model('User', User)