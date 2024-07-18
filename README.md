Payment Integration Project
===========================

Overview
--------

This project demonstrates a complete payment integration system using React and Node.js, featuring various payment functionalities and a user-friendly interface.

Features
--------

*   **Capture Payment**: API to capture a payment transaction.
    
*   **Verify Payment**: API to verify the authenticity of a payment.
    
*   **Fetch All Payments**: API to retrieve all payment transactions.
    
*   **Fetch Payment by ID**: API to fetch details of a specific payment using its ID.
    
*   **Fetch Card Details**: API to retrieve details of a card.
    
*   **Get Key ID**: API to get the key ID required for payment processing.
    

Frontend
--------

### Components

*   **NavBar**: A responsive navigation bar with a search feature.
    
*   **Body**: The main content area displaying a video and product listings.
    
*   **ProductCard**: Displays individual product details in a card format.
    
*   **ProductPage**: Detailed view of a product with images, description, and purchase options.
    
*   **SearchedProduct**: Displays search results with product cards.
    
*   **PaymentSuccess**: Confirmation page for successful payments.
    

### Technologies Used

*   **React**: Frontend library for building user interfaces.
    
*   **CSS**: Styling for responsive and visually appealing components.
    

Backend
-------

### APIs

*   **Capture Payment**: Endpoint to initiate a payment capture.
    
*   **Verify Payment**: Endpoint to validate the payment signature.
    
*   **Fetch All Payments**: Endpoint to list all payments.
    
*   **Fetch Payment by ID**: Endpoint to get details of a specific payment.
    
*   **Fetch Card Details**: Endpoint to retrieve card information.
    
*   **Get Key ID**: Endpoint to get the API key required for payments.
    

### Technologies Used

*   **Node.js**: JavaScript runtime for building server-side applications.
    
*   **Express**: Web framework for Node.js to handle API requests.
    

Setup
-----

### Prerequisites

*   Node.js and npm installed.
    
*   Access to a payment gateway account (e.g., Razorpay) for API integration.
    

### Installation

1.  bashCopy codegit clone cd
    
2.  bashCopy codecd clientnpm install
    
3.  bashCopy codecd servernpm install
    
4.  Configure environment variables for the backend (e.g., API keys).
    
5.  Start the development servers:
    
    *   bashCopy codecd clientnpm start
        
    *   bashCopy codecd servernpm start
        

Usage
-----

1.  **Navigate** to the application in your browser.
    
2.  **Search** for products using the search bar in the NavBar.
    
3.  **Browse** products and view details on the ProductPage.
    
4.  **Make Payments** and check the status on the PaymentSuccess page.
    

Contributing
------------

Feel free to submit issues or pull requests if you have suggestions or improvements.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
---------------

*   **Razorpay**: For payment gateway services.
    
*   **React** and **Node.js**: For providing the framework and runtime.
