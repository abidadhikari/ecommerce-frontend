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
import ImageLaboratory from "./ImageLaboratory";
import MyIcon from "../../helper/MyIcon";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

function AddEditProductPage(props: any) {
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

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    categoryId: yup.string(),
    brand: yup.string().required("Brand is required"),
    price: yup.number().required("Price is required"),
    crossedPrice: yup.number().required("CrossedPrice is required"),
    thumbnail: yup.string().required("Thumbnail is required"),
  });

  const formOptions: any = {
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>(formOptions);
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    if (data.categoryId === "") {
      data = { ...data, categoryId: null };
    }
    let tempImages;
    if (images.length) {
      tempImages = images?.filter((e: any) => {
        return e?.image?.trim() !== "";
      });

      console.log("TEMP IMAGES", tempImages);
    } else {
      tempImages = [];
      console.log("NO images");
    }

    if (isEdit) {
      dispatch(updateProduct({ id: product?.singleProduct?.id, body: data }));
    } else {
      data = { ...data, images: tempImages };
      dispatch(addProduct({ body: data }));
    }
  };
  const onError = (error: any) => {
    console.log("Form Error:", error, images);
  };

  useEffect(() => {
    if (isEdit && params?.id) {
      dispatch(getSingleProduct(params?.id));
    }
    dispatch(fetchAllCategories());
  }, []);

  useEffect(() => {
    if (isCreate) {
      if (!product.add_loading && product.add_success) {
        navigate("/products");
      }
    }
  }, [product.add_loading]);

  useEffect(() => {
    if (isEdit) {
      setValue("title", product.singleProduct?.title);
      setValue("brand", product.singleProduct?.brand);
      setValue("categoryId", product.singleProduct?.Category?.id);
      setValue("price", product.singleProduct?.price);
      setValue("crossedPrice", product.singleProduct?.crossedPrice);
      setValue("description", product.singleProduct?.description);
      setValue("thumbnail", product.singleProduct?.thumbnail);
      setImages(product?.singleProduct?.images);
    }
  }, [product?.singleProduct]);
  console.log(images);
  return (
    <DashboardLayout>
      <DashboardRightContent>
        {
          <>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-5">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="me-2">
                  <a
                    href="#"
                    className={`inline-flex items-center justify-center p-4  border-b-2  rounded-t-lg active  group ${
                      !isImageLab
                        ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => setIsImageLab(false)}
                  >
                    <svg
                      className={`w-4 h-4 me-2   ${
                        !isImageLab
                          ? "text-blue-600 dark:text-blue-500"
                          : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                    </svg>
                    Text Lab
                  </a>
                </li>
                {isEdit && (
                  <li className="me-2">
                    <a
                      href="#"
                      className={`inline-flex items-center justify-center p-4  border-b-2  rounded-t-lg active  group ${
                        isImageLab
                          ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                          : "hover:text-gray-600 hover:border-gray-300"
                      }`}
                      aria-current="page"
                      onClick={() => setIsImageLab(true)}
                    >
                      <svg
                        className={`w-4 h-4 me-2   ${
                          isImageLab
                            ? "text-blue-600 dark:text-blue-500"
                            : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                      </svg>
                      Image Lab
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </>
        }
        {isEdit ? (
          <div className="mb-5 flex items-center gap-2">
            <h1 className="text-sm bg-slate-50 w-fit px-2 py-1 ">
              Edit Product : {product.singleProduct?.id}
            </h1>
            {product.singleProduct?.visibility ? (
              <Labels text="VISIBLE" color="green" />
            ) : (
              <Labels text="NOT VISIBLE" color="red" />
            )}
          </div>
        ) : (
          <div className="mb-5 flex items-center gap-2">
            <h1 className="text-sm bg-slate-50 w-fit px-2 py-1 ">
              Create Product
            </h1>
          </div>
        )}
        {isEdit && isImageLab ? (
          <ImageLaboratory />
        ) : (
          <>
            {" "}
            <div>
              {categorySlice?.categories?.map((category: any) => {
                return <Labels text={category.name} color="green" />;
              })}
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col gap-5"
                noValidate
              >
                <TextInput
                  label="Title"
                  name="title"
                  register={register}
                  autoComplete="off"
                  error={errors?.title?.message}
                />
                <div className="flex flex-row gap-5">
                  <TextInput
                    label="Brand"
                    name="brand"
                    register={register}
                    autoComplete="off"
                    error={errors?.brand?.message}
                  />
                  <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    register={register}
                    autoComplete="off"
                    error={errors?.price?.message}
                  />
                  <TextInput
                    label="Crossed Price"
                    name="crossedPrice"
                    type="number"
                    register={register}
                    autoComplete="off"
                    error={errors?.crossedPrice?.message}
                  />
                  <SelectInput
                    label="Category"
                    name="categoryId"
                    register={register}
                    options={[
                      { label: "---Uncategorized---", value: "" },
                      ...categorySlice?.categories?.map((e: any) => {
                        return { label: e?.name, value: e?.id };
                      }),
                    ]}
                  />
                </div>
                <TextAreaInput
                  label="Description"
                  name="description"
                  register={register}
                  autoComplete="off"
                  error={errors?.description?.message}
                />

                <TextInput
                  label="Thumbnail"
                  name="thumbnail"
                  placeholder="https://yourimageurl.com/image.png"
                  register={register}
                  autoComplete="off"
                  error={errors?.thumbnail?.message}
                />
                {isEdit && (
                  <div className="p-3 bg-slate-100 rounded-sm flex gap-3 items-center">
                    <InfoIcon /> Note : Product Images can be updated from Image
                    Lab. Switch to{" "}
                    <span
                      className="text-indigo-600 cursor-pointer"
                      onClick={() => setIsImageLab(true)}
                    >
                      Image Lab
                    </span>
                  </div>
                )}
                <div>
                  {isCreate && (
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev: any) => [...prev, { image: "" }])
                      }
                      className="flex items-center justify-center gap-2 px-3 py-1 rounded-sm bg-slate-300 hover:bg-blue-500 my-5"
                    >
                      <AddPhotoAlternateIcon /> Add
                    </button>
                  )}
                  {isCreate && (
                    <>
                      {images?.map((inputItem: any, id: number) => {
                        return (
                          <div className="flex items-center gap-5">
                            <input
                              type="text"
                              key={id}
                              placeholder="https://yourimageurl.com/image.png"
                              defaultValue={inputItem?.image}
                              className="p-2 px-4 rounded-md  outline-none border
                  border-[#000000] focus:border-indigo-400  hover:border-indigo-4  w-full  mb-3"
                              onChange={(e: any) => {
                                setImages((prevImages: any) => {
                                  const updatedImages = [...prevImages];
                                  updatedImages[id] = {
                                    ...updatedImages[id],
                                    image: e.target.value,
                                  };
                                  console.log(
                                    "UP",
                                    updatedImages[id],
                                    e.target.value
                                  );
                                  return updatedImages;
                                });
                              }}
                            />
                            <button
                              type="button"
                              onClick={(e: any) => {
                                setImages((prevImages: any) =>
                                  prevImages.filter(
                                    (item: any, i: any) => i !== id
                                  )
                                );
                              }}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <ButtonPrimary
                  text={isEdit ? "Update" : "Create"}
                  type="submit"
                  loading={product?.action_loading}
                />
              </form>
            </div>
          </>
        )}
      </DashboardRightContent>
    </DashboardLayout>
  );
}

export default AddEditProductPage;
