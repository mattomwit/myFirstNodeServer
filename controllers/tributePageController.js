module.exports = (app) =>{ 
    app.get('/tributepage', (req,res) =>{
        res.sendFile(__dirname+'/index.html');
    });
};