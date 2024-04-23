export const findDiscountPercentage = (
  currValue: number,
  prevValue: number
) => {
  if (!prevValue) {
    return 0;
  }
  return (((prevValue - currValue) / prevValue) * 100).toFixed(0);
};
