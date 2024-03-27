const app = require('express');
const router = app.Router();
const path = require('path');
const htmlDir = path.join(__dirname , "../public/html/");

router.get('/posts', (req, res) =>{
    res.sendFile(htmlDir + 'post.html');
})

router.get('/postdetails', (req, res) =>{
    res.sendFile(htmlDir + 'postdetails.html');
})
module.exports = router;