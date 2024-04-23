import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardRightContent from "../../layouts/DashboardRightContent";
import MyTable from "../../components/shared/MyTable";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import {
  deleteProduct,
  fetchAllProducts,
  updateProduct,
} from "../../Store/Features/Product/ProductAction";
import { Rating } from "@mui/material";
import Labels from "../../components/shared/Labels";
import { ButtonPrimary } from "../../components/utils/Buttons";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import DeleteModal from "../../components/Modal/DeleteModal";

function ProductsPage(props: any) {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [currId, setCurrId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.productSlice);

  console.log(product?.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    if (!product.action_loading && product.action_success) {
      setCurrId("");
      setDeleteModal(false);
    }
  }, [product.action_loading]);

  const updateProductItem = (id: any, data: any) => {
    dispatch(updateProduct({ id, body: data }));
  };
  return (
    <DashboardLayout>
      <DashboardRightContent>
        <div className="top-row flex items-center justify-between gap-3 mb-5">
          <h1 className="text-lg">Products</h1>
          <input type="search" name="" id="" />
          <ButtonPrimary
            onClick={() => navigate("/products/create")}
            text={
              <>
                <AddIcon />
                Add Product
              </>
            }
          />
        </div>
        <MyTable
          headings={[
            { title: "Title", align: "left", visible: true },
            // { title: "Name", align: "center", visible: true },
            { title: "Brand", align: "center", visible: true },
            { title: "Price", align: "left", visible: true },
            { title: "Category", align: "center", visible: true },
            { title: "Images", align: "center", visible: true },
            { title: "Rating", align: "left", visible: true },
            { title: "Available", align: "center", visible: true },
            { title: "Action", align: "right", visible: true },
          ]}
        >
          {!product.loading &&
            product?.products?.map((product: any, index: number) => {
              return (
                <tr key={index}>
                  <td style={{ minWidth: 150 }}>
                    <div className="flex items-center gap-3  h-full">
                      <div className="h-10 w-10 bg-slate-400">
                        <img
                          src={product?.thumbnail ?? "/noImage.jpg"}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>{product?.title}</div>
                    </div>
                  </td>
                  {/* <td style={{ minWidth: 200 }} className="text-center">
                    test col
                  </td> */}
                  <td style={{ minWidth: 150 }} className="text-center">
                    {product?.brand}
                  </td>

                  <td style={{ minWidth: 80 }} className="text-green-500">
                    ${product?.price}
                  </td>
                  <td style={{ minWidth: 80 }} className="">
                    {product?.Category?.name ? (
                      <Labels text={product?.Category?.name} />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={{ minWidth: 80 }} className="text-center">
                    {product.images?.length ?? "-"}
                  </td>
                  <td style={{ minWidth: 150 }}>
                    {" "}
                    <Rating
                      name="half-rating-read"
                      defaultValue={(4 || product.rating) ?? 0}
                      precision={0.5}
                      readOnly
                    />
                  </td>
                  <td style={{ minWidth: 150 }} className="text-center">
                    {product?.visibility ? (
                      <Labels text="Available" color="green" />
                    ) : (
                      <Labels text="Not Available" color="red" />
                    )}
                  </td>
                  <td style={{ minWidth: 100 }}>
                    <div className="w-full  flex items-center justify-end gap-3">
                      <button
                        type="button"
                        className="action-btn"
                        onClick={() => {
                          updateProductItem(product?.id, {
                            visibility: !product?.visibility,
                          });
                        }}
                      >
                        {product?.visibility ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                      <button
                        type="button"
                        className="action-btn"
                        onClick={() =>
                          navigate(`/products/edit/${product?.id}`)
                        }
                      >
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        className="action-btn"
                        onClick={() => {
                          setDeleteModal(true);
                          setCurrId(product?.id);
                          // dispatch(deleteProduct(product?.id));
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
        <Modal active={deleteModal} setActive={setDeleteModal}>
          <DeleteModal
            active={deleteModal}
            setActive={setDeleteModal}
            loading={product.action_loading}
            success={product.action_success}
            onDeleteClick={() => {
              dispatch(deleteProduct(currId));
            }}
          />
        </Modal>
      </DashboardRightContent>
    </DashboardLayout>
  );
}

export default ProductsPage;
