import React, { useEffect, useState } from "react";
import LandingLayout from "../layouts/LandingLayouts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { fetchAllCategories } from "../Store/Features/Category/CategoryAction";
import ProductCard from "../components/Product/ProductCard";
import BreadCrumb from "../components/BreadCrumb";

function LandingCategoryPage(props: any) {
  const [reqCategory, setRequiredCategory] = useState<any>();
  const { type } = props;
  const dispatch = useDispatch<AppDispatch>();
  const categorySlice = useSelector((state: RootState) => state.categorySlice);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  useEffect(() => {
    if (categorySlice.categories) {
      const temp = categorySlice.categories?.filter((item: any) => {
        return item.name === type;
      });
      if (temp.length) {
        setRequiredCategory(temp[0]);
      }
    }
  }, [categorySlice.categories]);
  console.log(categorySlice?.categories, reqCategory);
  return (
    <LandingLayout>
      <div className="container">
        <BreadCrumb
          ghostLink={[
            { name: "Home", link: "/" },
            { name: "Category", link: "#" },
          ]}
          activeLink={{ name: type, link: "#" }}
        />
        THis is category page fro {type} {categorySlice?.loading}
        {reqCategory?.products?.map((e: any, index: number) => {
          return (
            <ProductCard
              key={index}
              title={e.title}
              image={e.thumbnail}
              rating={e.rating}
              stock={e.stock}
              productId={e.id}
              price={e.price}
              product={e}
            />
          );
        })}
      </div>
    </LandingLayout>
  );
}

export default LandingCategoryPage;
