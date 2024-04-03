const loginModels = require('../models/loginModel');
require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = {
    registerUserController: async (fname, lname, email) => {
        try {
            var response = await loginModels.registerUserModel(fname, lname, email);
            // console.log(response);
            if(response.status){
                // var link = `http://127.0.0.1:5500/FRONTEND/html/user_activation.html?user_id:${response.result.insertId}&activation_id:${response.activation_link}`;
                // const transporter = nodemailer.createTransport({
                //     host: 'smtp.ethereal.email',
                //     port: 587,
                //     auth: {
                //         user: process.env.EMAIL_USERNAME,
                //         pass: process.env.EMAIL_PASSWORD
                //     }
                // });
                // const mailConfig = {
                //     from: process.env.EMAIL_USERNAME,
                //     to: email.trim(),
                //     subject: "Active User Verification",
                //     html: `Hello,<br> Please Click on the link to verify your email.<br><p style="font-size:28px">Activation Link: </p><a style="font-size:28px" href="${link}">Click here to verify</a>`
                // };
                // await new Promise((resolve, reject) => {
                //     transporter.sendMail(mailConfig, (error, info) => {
                //         if (error) {
                //             reject(error);
                //         } else {
                //             resolve(info);
                //         }
                //     })
                // }).then((info) => {
                //     // console.log(info);
                //     if (info.response.includes('OK') || info.response.includes('Accepted')) {
                        response['isEmailSend'] = true;
                //         // console.log(response);
                //     }
                // }).catch((error) => {
                //     throw error;
                // })
            }
        } catch (error) {
            console.log("Controller: " + error);
        }
        console.log(await response);
        return await response;
    },
    checkUserActivationController : async (user_id, activation_id) =>{
        var resp = await loginModels.checkUserActivationModel(user_id, activation_id);
        console.log(resp);
        if(resp.status && resp.result.status && user_id == resp.result.result[0].id){
            // return await loginModels.activeUserModel(user_id);
            return resp.result;
        }else{
            return resp;
        }
    },
    userActivationController : async (user_id,password) =>{
        return await loginModels.activeUserModel(user_id, password);
    },
    checkUserLoginController : async (user_id,password) =>{
        return await loginModels.checkUserLoginModel(user_id, password);
    }
}