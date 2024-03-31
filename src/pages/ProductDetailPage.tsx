import React, { useEffect, useState } from "react";
import LandingLayout from "../layouts/LandingLayouts";
import useQuery from "../helper/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { fetchSingleProductDetail } from "../Store/Features/Product/ProductAction";
import Spinner from "../components/Basic/Spinner";
import ProductsSection from "../components/Product/ProductsSection";
import { Rating } from "@mui/material";

function ProductDetailPage(props: any) {
  const [currLargeImage, setCurrLargeImage] = useState(0);
  const query = useQuery();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.productSlice);

  console.log(query, query.params, product.singleProduct);

  useEffect(() => {
    dispatch(fetchSingleProductDetail(query?.productId));
  }, []);

  return (
    <LandingLayout>
      <div className="container">
        {product.loading && <Spinner />}
        {!product.loading && (
          <>
            <div className="flex gap-[70px] mt-10 mb-36">
              <div className="flex gap-[30px]">
                <div className="flex flex-col gap-[12px] max-h-[650px] overflow-auto scrollbar-width-none">
                  {product.singleProduct?.images?.map(
                    (e: any, index: number) => {
                      return (
                        <div
                          className={`w-[170px] min-w-[170px] max-w-[170px] h-[138px] min-h-[138px] max-h-[138px] overflow-hidden border-4 cursor-pointer ${
                            currLargeImage === index
                              ? "border-[#DB4444]"
                              : "border-transparent"
                          } `}
                          onClick={() => setCurrLargeImage(index)}
                        >
                          <img src={e} className="h-full w-full object-cover" />
                        </div>
                      );
                    }
                  )}
                  {/* {[...Array(10)].map(() => {
                    return (
                      <div className="w-[170px] min-w-[170px] max-w-[170px] h-[138px] min-h-[138px] max-h-[138px] bg-indigo-400 overflow-hidden "></div>
                    );
                  })} */}
                </div>
                <div className="w-[500px] h-[600px]  grid place-items-center  overflow-hidden">
                  <img
                    src={
                      product.singleProduct?.images
                        ? product.singleProduct?.images[currLargeImage]
                        : ""
                    }
                    className=" w-full"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl leading-6 font-semibold mb-4">
                  {product.singleProduct?.title}
                </h1>
                <div className="text-2xl leading-6 mb-6">
                  ${product.singleProduct?.price}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.singleProduct?.rating}
                    precision={0.5}
                    readOnly
                  />
                  <span className="text-black opacity-50 text-sm">
                    (150 Reviews)
                  </span>
                  <span className="text-[#00FF66] border-l border-black pl-4 ml-2">
                    In Stock
                  </span>
                </div>
                <p>{product.singleProduct?.description}</p>
                <div className="bar h-[1px] w-full bg-black my-6"></div>
                <div className="border border-[#00000080] rounded-[4px]">
                  <div className="flex items-center p-4 gap-4">
                    <div>DT</div>
                    <div className="flex flex-col gap-2">
                      <div className="font-medium">Free Delivery</div>
                      <div className="text-xs underline">
                        Enter your postal code for Delivery Availability
                      </div>
                    </div>
                  </div>
                  <div className="bar h-[1px] w-full bg-black "></div>
                  <div className="flex items-center p-4 gap-4">
                    <div>DT</div>
                    <div className="flex flex-col gap-2">
                      <div className="font-medium">Return Delivery</div>
                      <div className="text-xs underline">
                        Free 30 Days Delivery Returns. Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProductsSection title="Related Item">
              Hello products
            </ProductsSection>
          </>
        )}
      </div>
    </LandingLayout>
  );
}

export default ProductDetailPage;
