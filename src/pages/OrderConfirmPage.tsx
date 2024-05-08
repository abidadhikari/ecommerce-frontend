import React, { useEffect, useState } from "react";
import LandingLayout from "../layouts/LandingLayouts";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Store/store";
import { getCart, updateCart } from "../Store/Features/Cart/CartAction";
import { RadioInput } from "../components/utils/Inputs";
import { ButtonPrimary } from "../components/utils/Buttons";
import { placeOrders } from "../Store/Features/Order/OrderAction";
import { useNavigate } from "react-router-dom";

function OrderConfirmPage(props: any) {
  const [paymentType, setPaymentType] = useState("cod");
  const product = useSelector((state: RootState) => state.productSlice);
  const cart = useSelector((state: RootState) => state.cartSlice);
  const order = useSelector((state: RootState) => state.orderSlice);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const onPlaceOrderClick = () => {
    dispatch(
      placeOrders({
        body: cart.cart?.map((item: any, index: number) => {
          return {
            productId: item.productId,
            quantity: item.count,
            orderPrice: item.product.price * item.count,
          };
        }),
      })
    );
  };

  useEffect(() => {
    if (!order.loading && order.success) {
      navigate("/profile");
    }
  }, [order.loading]);

  return (
    <LandingLayout>
      ORDER PAGE
      <div className="container">
        <h1>Billing Details</h1>
        <div className="flex justify-between">
          <div className="form_left">sdaf</div>
          <div className="item_right">
            <div className="small_row flex flex-col">
              {cart.cart?.map((item: any, index: number) => {
                return <SmallProductRow item={item.product} data={item} />;
              })}
              <div className="flex items-center justify-between text-base mb-4">
                <div>Subtotal:</div>
                <div>
                  $
                  {cart.cart?.reduce((acc: number, item: any) => {
                    return acc + Number(item?.count) * item?.product?.price;
                  }, 0)}
                </div>
              </div>
              <hr className="mb-3" />
              <div className="flex items-center justify-between text-base mb-4">
                <div>Shipping:</div>
                <div>Free</div>
              </div>
              <hr className="mb-3" />
              <div className="flex items-center justify-between text-base mb-4">
                <div>Total</div>
                <div>
                  $
                  {cart.cart?.reduce((acc: number, item: any) => {
                    return acc + Number(item?.count) * item?.product?.price;
                  }, 0)}
                </div>
              </div>
              <div className="h-5" />
              <RadioInput
                name="payment_type"
                value={paymentType}
                setValue={setPaymentType}
                options={[
                  { label: "Cash on delivery", value: "cod" },
                  { label: "E-Wallet (esewa)", value: "esewa" },
                ]}
              />
              <div className="h-5" />
              <ButtonPrimary text="Place Order" onClick={onPlaceOrderClick} />
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

export default OrderConfirmPage;

const SmallProductRow = (props: any) => {
  const { item, data } = props;
  return (
    <div className="flex gap-6 items-center justify-between w-[450px] mb-5">
      <div className="flex gap-6 items-center">
        <img src={item?.thumbnail} alt={item?.title} className="h-14 w-14" />

        {item?.title}
      </div>
      <div>
        ${item?.price} {data?.count > 1 && `X ${data?.count}`}
      </div>
    </div>
  );
};
