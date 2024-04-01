const app = require('express');
const router = app.Router();
const loginControllers = require('../controller/loginController');

router.post('/registerUser', async (req, res)=>{
    console.log("hello");
    // console.log(await loginControllers.registerUserController(req?.body?.fname, req?.body?.lname, req?.body?.email));
    res.status(200).json(await loginControllers.registerUserController(req?.body?.fname, req?.body?.lname, req?.body?.email));
})

router.post("/checkUserActivation", async (req, res)=>{
    res.status(200).json(await loginControllers.checkUserActivationController(req?.body?.user_id, req?.body?.activation_id));
})

router.post('/activeUser', async (req, res)=>{
    res.status(200).json(await loginControllers.userActivationController(req?.body?.user_id, req?.body?.password));
})

router.post("/checkUserCredentials", async (req, res)=>{
    res.status(200).json(await loginControllers.checkUserLoginController(req?.body?.email,req?.body?.password ));
})

module.exports = router;