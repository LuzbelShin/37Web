const moongose = require('mongoose');
const { Schema } = moongose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema ({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    date: {type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = moongose.model('User', UserSchema);