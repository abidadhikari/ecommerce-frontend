/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardRightContent from "../../layouts/DashboardRightContent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "../../components/utils/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import {
  addProduct,
  addProductImage,
  deleteProductImage,
  fetchSingleProductDetail,
  getProductImage,
  getSingleProduct,
  updateProduct,
  updateProductImage,
} from "../../Store/Features/Product/ProductAction";
import { useNavigate, useParams } from "react-router-dom";
import Labels from "../../components/shared/Labels";
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from "../../components/utils/Inputs";
import { fetchAllCategories } from "../../Store/Features/Category/CategoryAction";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

function ImageLaboratory(props: any) {
  const { type } = props;
  const [isImageLab, setIsImageLab] = useState(false);
  const isEdit = type === "edit";
  const isCreate = type === "create";
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [images, setImages] = useState<any>([]);
  const product = useSelector((state: RootState) => state.productSlice);
  const categorySlice = useSelector((state: RootState) => state.categorySlice);

  const fetchData = () => {
    if (params?.id) {
      dispatch(getProductImage(params?.id));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(product.productImages);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(addProductImage(product?.singleProduct?.id));
        }}
        className="flex items-center justify-center gap-2 px-3 py-1 rounded-sm bg-slate-300 hover:bg-blue-500 my-5"
      >
        <AddPhotoAlternateIcon /> Add
      </button>

      <div className="flex flex-col gap-5">
        {product.productImages?.map((item: any) => {
          return (
            <div className="flex gap-3">
              <input
                type="text"
                value={item?.image}
                className="border px-4 w-[600px]"
                onChange={(e: any) => {
                  dispatch(
                    updateProductImage({
                      id: item?.id,
                      body: {
                        image: e.target.value,
                      },
                    })
                  );
                }}
              />
              <img src={item?.image} className="h-10 w-10" />
              <button
                type="button"
                onClick={() => dispatch(deleteProductImage(item?.id))}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-400"
              >
                <DeleteIcon />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageLaboratory;
