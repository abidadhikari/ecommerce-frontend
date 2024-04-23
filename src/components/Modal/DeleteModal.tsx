import React, { useEffect } from "react";
import { ButtonPrimary, ButtonSecondary } from "../utils/Buttons";

function DeleteModal(props: any) {
  const { active, loading, success, setActive, onDeleteClick } = props;
  return (
    <div className="w-[450px]  bg-white rounded-lg p-4">
      <h3 className="text-lg pb-3 border-b border-[#bebebe] font-semibold">
        Confirm Delete
      </h3>
      <p className="pt-5 pb-5 border-b border-[#bebebe]">
        Are you sure you want to delete?
      </p>
      <div className="flex justify-end gap-3 pt-4">
        {!loading && (
          <ButtonSecondary
            text="Cancel"
            small
            onClick={() => {
              setActive(false);
            }}
          />
        )}
        <ButtonPrimary
          text="Delete"
          small
          onClick={onDeleteClick}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default DeleteModal;
