import React, { useEffect } from "react";
import { ButtonPrimary, ButtonSecondary } from "../utils/Buttons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../utils/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import {
  addCategory,
  updateCategory,
} from "../../Store/Features/Category/CategoryAction";

function CategoryAddEditModal(props: any) {
  const { active, type, loading, success, setActive, onClick, category } =
    props;
  const dispatch = useDispatch<AppDispatch>();
  const categorySlice = useSelector((state: RootState) => state.categorySlice);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
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
    if (type === "edit") {
      dispatch(
        updateCategory({
          id: category.id,
          body: data,
        })
      );
    } else {
      // add wala code here
      dispatch(addCategory({ body: data }));
    }
  };
  const onError = (error: any) => {
    console.log("Form Error:", error);
  };

  useEffect(() => {
    if (type === "edit") {
      setValue("name", category?.name);
    }
  }, []);

  useEffect(() => {
    if (!categorySlice.loading && categorySlice.success) {
      setActive(false);
    }
  }, [categorySlice.loading, categorySlice.success]);

  return (
    <div className="w-[450px]  bg-white rounded-lg p-4">
      <h1 className="capitalize text-lg">Category {type}</h1>
      <div className="mt-5">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-5"
          noValidate
        >
          <TextInput
            label="Name"
            name="name"
            register={register}
            autoComplete="off"
            error={errors?.name?.message}
          />
          <div className="flex justify-end gap-3 ">
            {!categorySlice.loading && (
              <ButtonSecondary
                text="Cancel"
                small
                onClick={() => {
                  setActive(false);
                }}
              />
            )}
            <ButtonPrimary
              text={type === "add" ? "Add" : "Update"}
              small
              type="submit"
              onClick={() => {}}
              loading={categorySlice?.loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryAddEditModal;
