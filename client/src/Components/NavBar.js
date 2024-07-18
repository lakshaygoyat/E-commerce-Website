import React, { useEffect, useState } from 'react'
import { useNavigate ,Link } from 'react-router-dom';
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
            <Link to="/">
              <img 
                src="https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg"
              ></img>
            </Link>
        </div>
  
        <div className='nav-2'>
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
        </div>
    </div>
  )
}

export default NavBar