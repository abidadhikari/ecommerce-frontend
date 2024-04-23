/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardRightContent from "../../layouts/DashboardRightContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import {
  deleteCategory,
  fetchAllCategories,
} from "../../Store/Features/Category/CategoryAction";
import MyTable from "../../components/shared/MyTable";
import { ButtonPrimary } from "../../components/utils/Buttons";
import CategoryAddEditModal from "../../components/Modal/CategoryAddEditModal";
import Modal from "../../components/Modal/Modal";
import DeleteModal from "../../components/Modal/DeleteModal";
import { resetCategoryStates } from "../../Store/Features/Category/CategorySlice";

function CategoriesPage(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const categorySlice = useSelector((state: RootState) => state.categorySlice);

  const [categoryModal, setCategoryModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [currCategory, setCurrCategory] = useState<any>(null);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  useEffect(() => {
    if (!categoryModal && !deleteModal) {
      setModalType("");
      setCurrCategory(null);
      dispatch(resetCategoryStates());
    }
  }, [categoryModal, deleteModal]);

  useEffect(() => {
    console.log(categorySlice.loading, categorySlice.success);
    if (!categorySlice.loading && categorySlice.success) {
      setDeleteModal(false);
    }
  }, [categorySlice.loading]);

  return (
    <DashboardLayout>
      <DashboardRightContent>
        <div className="top-row flex items-center justify-between gap-3 mb-5">
          <h1 className="text-lg">Categories</h1>
          <input type="search" name="" id="" />
          <ButtonPrimary
            onClick={() => {
              setModalType("add");
              setCategoryModal(true);
            }}
            text={
              <>
                <AddIcon />
                Add Category
              </>
            }
          />
        </div>
        <MyTable
          headings={[
            { title: "Name", align: "left", visible: true },
            // { title: "Name", align: "center", visible: true },

            { title: "No of Products", align: "center", visible: true },
            { title: "Action", align: "right", visible: true },
          ]}
        >
          {categorySlice?.categories?.map((category: any, index: number) => {
            return (
              <tr key={index}>
                <td style={{ minWidth: 150 }}>{category.name}</td>
                <td style={{ minWidth: 150 }} className="text-center">
                  {category?.products?.length ?? "-"}
                </td>
                <td style={{ minWidth: 150 }}>
                  {" "}
                  <div className="w-full  flex items-center justify-end gap-3">
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => {
                        setCurrCategory(category);
                        setModalType("edit");
                        setCategoryModal(true);
                      }}
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => {
                        setCurrCategory(category);
                        setDeleteModal(true);
                      }}
                    >
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </MyTable>
        <Modal active={categoryModal} setActive={setCategoryModal}>
          <CategoryAddEditModal
            type={modalType}
            active={categoryModal}
            setActive={setCategoryModal}
            category={currCategory}
            // loading={product.action_loading}
            // success={product.action_success}
          />
        </Modal>
        <Modal active={deleteModal} setActive={setDeleteModal}>
          <DeleteModal
            active={deleteModal}
            setActive={setDeleteModal}
            loading={categorySlice.loading}
            success={categorySlice.success}
            onDeleteClick={() => {
              dispatch(deleteCategory(currCategory?.id));
            }}
          />
        </Modal>
      </DashboardRightContent>
    </DashboardLayout>
  );
}

export default CategoriesPage;
