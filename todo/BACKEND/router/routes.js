const app = require('express');


const router = app.Router();
const todoControllers = require('../controllers/todoControllers');
router.post("/getNotes", async (req, res)=>{
    res.status(200).json(await todoControllers.getNotesController());    
})

router.post("/insertNotes", async (req, res)=>{
    res.status(200).json(await todoControllers.insertNotesController(req?.body?.title, req?.body?.notes));    
})

router.post("/editNotes", async (req, res)=>{
    res.status(200).json(await todoControllers.editNotesController(req?.body?.id,req?.body?.title, req?.body?.notes));    
})

router.post("/deleteNotes", async (req, res)=>{
    console.log(req.body.id);
    res.status(200).json(await todoControllers.deleteNotesController(req?.body?.id));    
})

router.post("/login", (req, res) => {
    console.log("aayu");
    res.cookie("token", "hello", {maxAge:90000, httpOnly:true}).status(200).json({status:true});
    // res
    // .writeHead(200, {
    //     "Set-Cookie": "token=encryptedstring; HttpOnly",
    //     "Access-Control-Allow-Credentials": "true"
    // })
    // .send();
    console.log(req.cookies);
    // console.log(req.cookies.token);
  });
  
router.get("/private", (req, res) => {
    console.log("in", req.cookies);
    if (!req.cookies.token) return res.status(401).json({status: false});
    res.status(200).json({ status: true, secret: "Ginger ale is a specific Root Beer" });
  });
module.exports = router;