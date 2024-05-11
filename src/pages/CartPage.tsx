import React, { useEffect } from "react";
import LandingLayout from "../layouts/LandingLayouts";
import BreadCrumb from "../components/BreadCrumb";
import { ButtonPrimary, ButtonSecondary } from "../components/utils/Buttons";
import { Link } from "react-router-dom";
import { Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Inputs from "../components/utils/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Store/store";
import { getCart, updateCart } from "../Store/Features/Cart/CartAction";

function CartPage() {
  const product = useSelector((state: RootState) => state.productSlice);
  const cart = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  console.log(cart.cart);
  return (
    <LandingLayout>
      <div className="container">
        <BreadCrumb
          ghostLink={[
            { name: "Home", link: "/" },
            // { name: "Home", link: "/" },
          ]}
          activeLink={{ name: "Cart", link: "/cart" }}
        />
        <table className="cart-table w-full text-left text-base font-normal mb-10 mt-20">
          <thead>
            <tr className="text-base font-normal">
              <th>Product</th>
              <th className="text-center "> Price</th>
              <th className="text-center ">Quantity</th>
              <th className="text-center">Subtotal</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.cart.length ? (
              cart.cart?.map((item: any) => {
                return (
                  <>
                    <tr className="h-10 opacity-0">
                      <td colSpan={4}></td>
                    </tr>
                    <tr className="">
                      <td>
                        <div className=" flex items-center gap-5">
                          <div className="h-[54px] w-[54px]  overflow-hidden flex items-center justify-center">
                            <img src={item?.product?.thumbnail} alt="" />
                          </div>
                          <div>{item?.product?.title}</div>
                        </div>
                      </td>
                      <td className="text-center ">${item?.product?.price}</td>
                      <td className="text-center ">
                        <input
                          type="number"
                          name=""
                          id=""
                          min={1}
                          value={item?.count}
                          onChange={(e: any) =>
                            dispatch(
                              // updateCart({
                              //   id: item?.id,
                              //   quantity: e.target.value,
                              // })
                              updateCart({
                                body: {
                                  productId: item?.productId,
                                  count: Number(e.target.value),
                                },
                              })
                            )
                          }
                          className="p-3 w-20 outline-none border-[1.5px] border-[#00000066] rounded-[4px] text-base"
                        />
                      </td>
                      <td className="text-center">
                        ${item?.count * item?.product?.price}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className={`p-1 rounded-full hover:bg-slate-300 `}
                          onClick={() => {
                            dispatch(
                              updateCart({
                                body: {
                                  productId: item?.productId,
                                  count: 0,
                                },
                              })
                            );
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  NO ITEMS IN CART
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className=" flex items-center justify-between mb-20">
          <Link to="/" className="block w-fit">
            <ButtonSecondary text="Return To Shop" />
          </Link>

          {/* <ButtonSecondary text="Update Cart" /> */}
        </div>
        <div className="cart-bottom pb-36 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-[300px]">
              <Inputs placeholder="Coupon Code" />
            </div>
            <ButtonPrimary text="Apply Coupon" />
          </div>

          <div className="border-[1.5px] border-[#000000] w-[470px] py-8 px-6 rounded-[4px]">
            <div className="text-[20px] leading-7 font-medium mb-6">
              Cart Total
            </div>
            <div className="flex items-center justify-between text-base mb-4">
              <div>Subtotal:</div>
              <div>
                $
                {cart.cart?.reduce((acc: number, item: any) => {
                  return acc + Number(item?.count) * item?.product?.price;
                }, 0)}
              </div>
            </div>
            <hr className="mb-4" />
            <div className="flex items-center justify-between text-base mb-4">
              <div>Shipping:</div>
              <div>Free</div>
            </div>
            <hr className="mb-4" />
            <div className="flex items-center justify-between text-base mb-4">
              <div>Total</div>
              <div>
                $
                {cart.cart?.reduce((acc: number, item: any) => {
                  return acc + Number(item?.count) * item?.product?.price;
                }, 0)}
              </div>
            </div>

            <div>
              <Link to="/order-confirm?routed_from=cart">
                <ButtonPrimary text="Procees to checkout" fullWidth />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

export default CartPage;
