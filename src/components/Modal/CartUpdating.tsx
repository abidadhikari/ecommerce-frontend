import React from "react";
import Modal from "./Modal";
import Spinner from "../Basic/Spinner";

function CartUpdating(props: any) {
  const { active } = props;
  return (
    <Modal active={active}>
      <h4 className="text-white">
        Cart Updating ...
        {/* <Spinner /> */}
      </h4>
    </Modal>
  );
}

export default CartUpdating;
