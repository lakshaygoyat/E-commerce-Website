// controller
const { instance } = require('../Config/razorpay');
const crypto = require('crypto');
require('dotenv').config();
const Payment=require('../Models/Payment');

exports.capturePayment = async (req, res) => {
    try {
        // Payment options
        const amount = req.body.amount*100;
        const currency = "INR";
        const receipt = generateReceipt();

        const options = {
            amount: amount,
            currency,
            receipt
            // notes: {
            //     courseID,
            //     userID,
            // }
        };

        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options);
        //console.log("Payment Response:", paymentResponse);

        // Return response
        //console.log("hello");
        return res.status(200).json({
            success: true,
            paymentResponse
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(400).json({
            success: false,
            message: "Could not initiate the order",
            error: error
        });
    }
}

// Function to generate a random receipt
function generateReceipt() {
    return Math.random().toString(36).substring(7); // Adjust length of receipt as needed
}



exports.paymentVerification = async (req, res) => {
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
        const body = razorpay_order_id + "|" + razorpay_payment_id;
    
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");
    
        const isAuthentic = expectedSignature === razorpay_signature;
    
        // console.log("razorpaySig -> ",razorpay_signature);
        // console.log("expectedSig -> ",expectedSignature);

        console.log("hey  -> ",req);

        if(!isAuthentic)
        {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        //Database operations performed here
        const newEntry = await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        console.log("Payment is verified successfully");
        res.redirect(`http://localhost:8080/paymentsuccess?reference=${razorpay_payment_id}`);
    }
    catch(error)
    {
        res.status(400).json({
            success: false,
            message: "Invalid payment signature"
        });
    }
};


// payment refund
exports.paymentRefund= async (req,res)=>{
    try{
        const {orderId , amount} = req.body;

        //validation
        if(!orderId || !amount)
        {
            return res.status(400).json({
                success:false,
                message:"Fields are missing"
            })
        }

        //fetch payment id 
        const data = await Payment.findOne({
            razorpay_order_id:orderId
        });

        if(!data){
            return res.status(400).json({
                success:false,
                message:"orderId is invalid"
            })
        }
        
        const paymentId = data.razorpay_payment_id;
        // console.log(paymentId);
        // console.log(receipt);

        const refundResponse= await instance.payments.refund(paymentId,{
            "amount": amount,
            "speed": "optimum",
          })

          //console.log(refundResponse);

          return res.status(200).json({
            success:true,
            message:"Payment refund successfull",
            refundResponse
          })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"error while making request for refund",
            error:error
        })
    }
}


// fetch details of all payments
exports.fetchAllPayments=async(req,res)=>{
    try{
        const response= await instance.payments.all();
        console.log(response);

        return res.status(200).json({
            success:true,
            message:"fetched all payments successfully",
            response
          })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"error while fetching all payments details",
            error:error.message
        })
    }
}


// fetch payment with id
exports.fetchPaymentWithId = async(req,res)=>{
    try{

        const {orderId}=req.body;

        //validation
        if(!orderId)
        {
            return res.status(400).json({
                success:false,
                message:"orderId is missing"
            })
        }

         //fetch payment id 
         const data = await Payment.findOne({
            razorpay_order_id:orderId
        });

        if(!data){
            return res.status(400).json({
                success:false,
                message:"orderId is invalid"
            })
        }
        const paymentId = data.razorpay_payment_id;

        const response= await instance.payments.fetch(paymentId);
        console.log(response);

        return res.status(200).json({
            success:true,
            message:"fetched payment successfully",
            response
          })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"error while fetching payment details",
            error:error
        })
    }
}



// fetch card details used for payment
exports.fetchCardDetails = async(req,res)=>{
    try{

        const {orderId}=req.body;

        //validation
        if(!orderId)
        {
            return res.status(400).json({
                success:false,
                message:"orderId is missing"
            })
        }

        //fetch payment id 
        const data = await Payment.findOne({
            razorpay_order_id:orderId
        });

        if(!data){
            return res.status(400).json({
                success:false,
                message:"orderId is invalid"
            })
        }
        const paymentId = data.razorpay_payment_id;

        const response= await instance.payments.fetchCardDetails(paymentId)
        console.log(response);

        return res.status(200).json({
            success:true,
            message:"fetched card details successfully",
            response
          })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"error while fetching payment card details",
            error:error
        })
    }
}



// get key id controller
exports.getKeyId= async (req,res)=>{
    try{
        const Id=process.env.RAZORPAY_KEY_ID;
        return res.status(200).json({
            success:true,
            message:"successfully fetched razorpay key id",
            key_id:Id
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"error while geting key id",
            error:error.message
        })
    }
}