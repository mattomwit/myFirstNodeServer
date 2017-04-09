module.exports = (app) =>{ 
    app.get('/randomquote', (req,res) =>{
        res.sendFile(__dirname+'/index.html');
    });
};