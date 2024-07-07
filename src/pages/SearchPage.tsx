import React, { useEffect, useState } from "react";
import LandingLayout from "../layouts/LandingLayouts";
import useQuery from "../helper/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { searchProducts } from "../Store/Features/Product/ProductAction";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard";
import Search from "@mui/icons-material/Search";

function SearchPage(props: any) {
  const { params, query } = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.productSlice);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText(query || "");
    // if (query?.trim().length !== 0) {
    dispatch(searchProducts(query || ""));
    // }
  }, [query]);
  console.log(product.searchProducts);
  return (
    <LandingLayout>
      <div className="container py-20">
        {product.loading && "LOADING"}
        {/* {!product.loading && product.searchProducts?.length} */}
        <div className=" flex items-center justify-center mb-10">
          <form
            className="w-[70%] m-auto flex items-center justify-center relative"
            onSubmit={(e: any) => {
              e.preventDefault();
              navigate("/search?query=" + searchText);
            }}
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="Search Product"
              className="border-2 px-6 py-3 rounded-full outline-none w-full"
              value={searchText}
              onChange={(e: any) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-50 px-6 py-3 rounded-full absolute right-0 top-0"
            >
              <Search />
            </button>
          </form>
        </div>
        {/* SEARCH PAGE {query}  */}
        <br />
        <br />
        <div className="grid grid-cols-4 gap-5 justify-between">
          {!product.loading &&
            product.searchProducts?.map((item: any) => {
              return (
                <ProductCard
                  title={item.title}
                  image={item.thumbnail}
                  rating={item.rating}
                  stock={65}
                  productId={item.id}
                  price={item.price}
                  product={item}
                />
              );
            })}
        </div>
      </div>
    </LandingLayout>
  );
}

export default SearchPage;
