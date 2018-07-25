import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean, 
        default: false 
    },
    confirmationToken: {
        type: String,
        default: ''
    }
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `http://localhost:3000/confirmation/${this.confirmationToken}`
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email,
        confirmed: this.confirmed
    }, "secretkey")
};

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT(),
        confirmed: this.confirmed
    }
};

export default mongoose.model('User', schema);