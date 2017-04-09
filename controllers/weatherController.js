module.exports = (app) =>{
    //set static location to weather folder directory 
    // app.use('/routingOnWebsite', app.static('directory on server example public/weather'));
    app.get('/weather', (req,res) =>{
        console.log(__dirname+'/index.html');
        res.sendFile(__dirname+'/index.html');
    });

};