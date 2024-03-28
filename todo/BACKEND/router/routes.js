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

module.exports = router;