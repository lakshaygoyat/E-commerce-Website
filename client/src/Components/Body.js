import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from "../assest/videoplayback.webm";
import '../Style/body.css';
import ProductCard from './ProductCard';

const Body = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        const pro = await fetch('https://dummyjson.com/products');
        const json = await pro.json();
        setData(json.products);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleProductClick = (item) => {
        navigate('/productPage', { state: { product: item } });
    };

    return (
        <div className='body'>
            <div className='content-video'>
                <div className='content-video-1'>
                    <h1>F <br />A<br />S<br />H<br />I<br />O<br />N</h1>
                </div>
                <video
                    src={video}
                    autoPlay
                    muted
                    loop
                >
                </video>
            </div>
            <div className='products'>
                <h1>Headphones for you</h1>
                <div className='products-container'>
                    {data ? (
                        data.map((item) => (
                            <div key={item.id} className='product-item' onClick={() => handleProductClick(item)}>
                                <ProductCard product={item} />
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p> // Fallback UI
                    )}
                </div>
            </div>
        </div>
    )
}

export default Body;
