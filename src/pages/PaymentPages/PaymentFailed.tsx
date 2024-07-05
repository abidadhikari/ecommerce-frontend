import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { updateSingleOrder } from "../../Store/Features/Order/OrderAction";
import { Link } from "react-router-dom";
import useQuery from "../../helper/useQuery";
import { clearOrderState } from "../../Store/Features/Order/OrderSlice";
import CloseIcon from "@mui/icons-material/Close";

function PaymentFailed(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery();
  const order = useSelector((state: RootState) => state.orderSlice);
  useEffect(() => {
    dispatch(clearOrderState());
  }, []);
  return (
    <>
      <div className=" h-screen">
        <div className="bg-white p-6  md:mx-auto">
          <div className="text-center flex flex-col items-center">
            <div className="h-[80px] w-[80px] rounded-full bg-red-400  flex items-center justify-center mb-4">
              <CloseIcon fontSize="large" className="h-8 w-8 text-white" />
            </div>
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Failed!
            </h3>
            <p className="text-gray-600 my-2">Oops something bad happened</p>
            <p> Try Again </p>
            <div className="py-10 text-center">
              <Link
                to="/cart"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentFailed;
