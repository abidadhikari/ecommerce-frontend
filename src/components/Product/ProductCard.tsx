import React from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { addToCart } from "../../Store/Features/Product/ProductSlice";
import { findDiscountPercentage } from "../../helper/discountPercent";
import { updateCart } from "../../Store/Features/Cart/CartAction";
import IsAuthenticated from "../AuthTools/isAuthenticated";

function ProductCard(props: any) {
  const { title, image, rating, stock, productId, price, product } = props;
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cartSlice);
  return (
    <div className="w-[270px] mb-5 ">
      <div className="img-wrapper group w-full h-[250px] bg-slate-200 mb-4 flex items-center justify-center overflow-hidden relative rounded-[4px] ">
        {findDiscountPercentage(product?.price, product?.crossedPrice) ? (
          <div className="bg-[#DB4444] px-3 py-1 rounded-[4px] absolute top-3 left-3 text-xs text-white">
            {findDiscountPercentage(product?.price, product?.crossedPrice) &&
              `-${findDiscountPercentage(
                product?.price,
                product?.crossedPrice
              )}%`}
          </div>
        ) : (
          ""
        )}
        <img src={image} alt="" className="object-cover" />

        {IsAuthenticated() ? (
          <>
            {cart?.cart?.filter((e: any) => {
              return e.productId === productId;
            })?.length !== 0 ? (
              <button
                type="button"
                className="add-to-cart-btn bg-[#DB4444] text-white absolute bottom-0 w-full  items-center justify-center p-2 cursor-pointer  hidden group-hover:flex  "
                onClick={() => {
                  dispatch(
                    updateCart({
                      body: {
                        productId,
                        count: 0,
                      },
                    })
                  );
                }}
              >
                Remove From Cart
              </button>
            ) : (
              <button
                type="button"
                className="add-to-cart-btn bg-black text-white absolute bottom-0 w-full  items-center justify-center p-2 cursor-pointer  hidden group-hover:flex  "
                onClick={() => {
                  dispatch(
                    updateCart({
                      body: {
                        productId,
                        count: 1,
                      },
                    })
                  );
                }}
              >
                Add To Cart
              </button>
            )}
          </>
        ) : null}
      </div>
      <Link to={`/product?productId=${productId}`}>
        <h3 className="font-medium  text-base mb-2">{title}</h3>
        <div className="price-row flex gap-3 mb-2">
          <div className="curr-price text-[#DB4444]">${price}</div>
          {product?.crossedPrice && product?.crossedPrice !== 0 ? (
            <div className="crossed-price line-through opacity-50">
              ${product?.crossedPrice}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="rating-row text-sm flex items-center gap-2">
          {rating && (
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              readOnly
            />
          )}
          {/* <div className="opacity-50"> ({stock})</div> */}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
