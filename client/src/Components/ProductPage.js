import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Style/productPage.css'

const ProductPage = () => {
    const location = useLocation();
    const { product } = location.state || {};

    if (!product) {
        return <p>No product data available</p>;
    }

    const paymentHandler = async () => {
        try {
            // First, make the GET request to retrieve the key
            const keyResponse = await fetch("http://localhost:8080/api/v1/getkey");
            const {key_id} = await keyResponse.json();
            console.log('Key Data:', key_id);
    
            // Prepare the body for the POST request
            const requestBody = {
                amount: product.price,
                currency: "INR",
                receipt: "Receipt no. 1"
            };
    
            // Make the POST request
            const checkoutResponse = await fetch("http://localhost:8080/api/v1/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
    
            const checkoutData = await checkoutResponse.json();
            console.log('Checkout Data:', checkoutData);

            console.log(checkoutData.paymentResponse.amount);

            const options = {
                key:key_id,
                amount: checkoutData.paymentResponse.amount,
                currency: "INR",
                name: "Sagar ray",
                description: "Tutorial of RazorPay",
                image: "https://avatars.githubusercontent.com/u/107414907?v=4",
                order_id: checkoutData.paymentResponse.id,
                callback_url: "http://localhost:8080/api/v1/paymentverification",
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            
            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    return (
        <div className='product-page'>
            <div className='product-page-1'>
                <img
                  src={product.thumbnail} 
                  alt="thumbnail"
                >
                </img>
                <div className='images'>
                    {
                        product.images.map((image)=>(
                        
                                <img 
                                  src={image}
                                >
                                </img>
                            
                        ))
                    }
                </div>
            </div>
            <div className='product-page-2'>
                <div className='info-1'>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <h3>{product.rating} rating</h3>
                </div>
                <div className='info-2'>
                    <h2>Price {product.price}</h2>
                    <h2>{product.discountPercentage} discount</h2>
                </div>
                <div className='info-3'>
                    <h2>
                        only {product.stock} left ! 
                        don't miss it
                    </h2>
                    <div className='buttons'>
                        <button onClick={paymentHandler}>Buy Now</button>
                        <button>Add to Cart</button>
                    </div>
                </div>
                <div className='info-4'>
                    <div>
                        <h2>Free delivery</h2>
                        <p>Enter you postal code for free delivery</p>
                    </div>
                    <div>
                        <h2>return delivery</h2>
                        <p>Enter you postal code for free delivery</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
