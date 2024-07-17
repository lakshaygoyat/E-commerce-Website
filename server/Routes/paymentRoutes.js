const express=require('express');
const router = express.Router();
const {
       capturePayment, 
       getKeyId,
       paymentVerification,
       paymentRefund,
       fetchAllPayments,
       fetchPaymentWithId,
       fetchCardDetails
    } = require('../Controllers/Razorpay.js');


router.get('/getkey',getKeyId)
router.get('/allpayments',fetchAllPayments);
router.post('/checkout',capturePayment);
router.post('/paymentverification',paymentVerification);
router.post('/refund',paymentRefund);
router.post('/paymentdetailswithid',fetchPaymentWithId);
router.post('/fetchcarddetails',fetchCardDetails);

module.exports=router;