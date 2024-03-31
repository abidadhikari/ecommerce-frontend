/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import LandingLayout from "../layouts/LandingLayouts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import {
  fetchGooglogin,
  fetchUsers,
  getMe,
} from "../Store/Features/Auth/AuthAction";
import Spinner from "../components/Basic/Spinner";
import ProductCard from "../components/Product/ProductCard";
import ProductsSection from "../components/Product/ProductsSection";
import CategoryButton from "../components/CategoryButton";
import { Categories } from "../components/constants/categories";
import CompanyPromises from "../components/CompanyPromises";

function HomePage() {
  const count = useSelector((state: RootState) => state.uiSlice);
  const auth = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();

  console.log("USER:::", auth.user);

  useEffect(() => {
    dispatch(fetchUsers());
    // dispatch(fetchGooglogin());
    // dispatch(getMe());
  }, []);

  return (
    <LandingLayout>
      <div className="container">
        THIS IS HOME PAGE {count.value} {auth?.loadUser?.name}
        {auth?.user?.name && (
          <h1>
            Welcome , {auth?.user?.name}{" "}
            {auth?.user?.isGoogleAuthenticated ? "GOOGLE" : "WEBSITE"}
          </h1>
        )}
        {auth.loading && <Spinner />}
        <ProductsSection title="Today's" bigTitle="Flash Sales">
          <div className="flex flex-wrap gap-5 justify-between my-10">
            {!auth.loading &&
              auth.products?.products?.map((e: any, index: number) => {
                if (index < 4)
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
        </ProductsSection>
        <ProductsSection title="Categories" bigTitle="Browse By Category">
          <div className="flex flex-wrap gap-[30px] justify-between my-10">
            {Categories.map((item: any) => {
              return <CategoryButton title={item.name} icon={item.icon} />;
            })}
          </div>
        </ProductsSection>
        <ProductsSection title="This Month" bigTitle="Best Selling Products">
          <div className="flex flex-wrap gap-5 justify-between my-10">
            {!auth.loading &&
              auth.products?.products?.map((e: any, index: number) => {
                if (index > 4 && index < 9)
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
        </ProductsSection>
        <ProductsSection title="Our Products" bigTitle="Explore Our Products">
          <div className="flex flex-wrap gap-5 justify-between my-10">
            {!auth.loading &&
              auth.products?.products?.map((e: any, index: number) => {
                if (index < 8)
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
        </ProductsSection>
        <CompanyPromises />
      </div>
    </LandingLayout>
  );
}

export default HomePage;
