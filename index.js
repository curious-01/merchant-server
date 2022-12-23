//Express
const express = require('express');

//cors
const cors = require('cors');

//web-push
const webpush = require('web-push');

//body-parser
const bodyParser = require('body-parser');

//path
const path = require('path');

//using express 
const app = express();

//using cors
app.use(cors({
    origin: '*'
}));

//using bodyparser
app.use(bodyParser.json())

const port = 5000;

//storing the keys in variables
const publicVapidKey = 'BNjQXaxU5hCoN77_FW5-shUoeZbh3er7J8lADAcPTjfxAUm4bYEkgabyKluYYNF5Js27GLqS92X6cCgFQr1zDsI';
const privateVapidKey = 'F6xlYfBO8srilgEtDyGV_tHDsUd8e7B_ENSi3Xq6Gvo';

//setting vapid keys details
webpush.setVapidDetails('mailto:mercymeave@section.com', publicVapidKey,privateVapidKey);

//subscribe route
app.get('/', (req, res)=>{
    res.status(200).json({'Server running on port': port})    
})


//subscribe route
app.post('/subscribe', (req, res)=>{
    //get push subscription object from the request
    const res_sub = JSON.parse(req.body.sub);
    console.log(res_sub);

    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({
        title: "From push-express server",
        body: "Subscribed!",
        icon: "https://merchant-beta.web.app/static/media/logo.6404ae5bed5d141294430ce541e126bf.svg",
      });

    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(res_sub, payload).catch(err=> console.error(err));
})

//buyer route
app.post('/buyer', (req, res)=>{
    //get push subscription object from the request
    console.log(req.body);
    const req_sub = JSON.parse(req.body.sub);
    const req_buyer = req.body.buyer;
    const req_qty = req.body.qty;
    const req_location = req.body.location;
    let data_body = `${req_buyer} buyer available for ${req_qty} tons in ${req_location}`
    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({
        title: "New Buyer",
        body: data_body,
        icon: "https://merchant-beta.web.app/static/media/logo.6404ae5bed5d141294430ce541e126bf.svg",
      });

    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(req_sub, payload).catch(err=> console.error(err));
})

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});

// Export the Express API
module.exports = app;
