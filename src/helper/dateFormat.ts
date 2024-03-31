import dayjs from "dayjs";

export const displayDate = (dateString: string, hasDash: boolean = false) => {
  if (hasDash) {
    return dayjs(dateString).format("YYYY-MM-DD");
  }
  return dayjs(dateString).format("YYYY/MM/DD");
};
