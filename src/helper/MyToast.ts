import toast from "react-hot-toast";

export const MyToast = (props: any) => {
  const { message, success } = props;
  if (success) {
    toast.success(message);
  } else if (!success) {
    toast.error(message);
  }
};
