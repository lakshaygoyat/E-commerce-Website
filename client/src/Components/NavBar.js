import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../Style/navBar.css";

const NavBar = () => {
    const [searchText,setSearchText]=useState('abc');
    const [text,setText]=useState('');
    const [productData,setProductData]=useState(null);

    const navigate = useNavigate();

    const fetchData = async () => {
        const data = await fetch(`https://dummyjson.com/products/search?q=${searchText}`);
        const json = await data.json();
        setProductData(json.products);

        if(searchText=="abc")
        return ;

        navigate('/searchedProduct', { state: { productData: json.products } });
    }

    useEffect(()=>{
        fetchData();
    },[searchText])

  return (
    <div className='nav-bar'>
        <div className='nav-1'>
            <img 
              src="https://www.shutterstock.com/image-vector/shopping-logo-ecommerce-logotype-shooping-260nw-1978607771.jpg" 
              alt="logo"
            ></img>
        </div>
        <div className='nav-2'>
            <h3>Categories</h3>
            <h3>Deal</h3>
            <h3>What's new</h3>
            <h3>Delivery</h3>
        </div>
        <div className='nav-3'>
            <input
             placeholder=' search'
             value={text}
             onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyDown={(e)=>{
                if(e.keyCode===13)
                setSearchText(text);
              }}
            >
            </input>
            <h3>Cart</h3>
        </div>
    </div>
  )
}

export default NavBar