import React from 'react';
import { useNavigate } from 'react-router-dom';

const Crouselitem = ({ item }) => {
  const nvg = useNavigate();

  return (
    <div>
      <div
        className="product-box product-box2"
        onClick={() => { nvg(`/productdetails/${item._id}`); }}
      >
        <div className="product-imgbox">
          <div className="product-front">
            <img
              src={`${process.env.REACT_APP_API_IMAGE_URL}${item.product_image1}`}
              alt={item.product_name}
              className="product-image"
            />
          </div>
        </div>

        <div className="product-detail">
          {/* Sale Tag on the side */}
          <div className="sale-tag">
            For sale with wholesaling
          </div>

          <h3 className="product-title">{item.product_name}</h3>
          <h5 className="product-price">
            ₹{item.selling_price}
            <span className="mrp-price">₹{item?.mrp_price}</span>
            <p className="discount">
              ({parseInt(((item.mrp_price - item.selling_price) / item.mrp_price) * 100)}% off)
            </p>
          </h5>
        </div>
      </div>
      
    </div>
    
  );
};

export default Crouselitem;
