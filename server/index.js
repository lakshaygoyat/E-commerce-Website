const express=require('express');
const fileUpload=require('express-fileupload');
const cors = require("cors");
const paymentRoutes=require('./Routes/paymentRoutes.js');

require('dotenv').config();
const app=express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.get('/',(req,res)=>{
    res.send("hello word");
})

// const express = require("express");
// const Razorpay = require("razorpay");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// app.post("/order", async (req, res) => {
//   try {
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_SECRET,
    // });

//     const options = req.body;
//     const order = await razorpay.orders.create(options);

//     if (!order) {
//       return res.status(500).send("Error");
//     }

//     res.json(order);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error");
//   }
// });


app.use('/api/v1',paymentRoutes);

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
});