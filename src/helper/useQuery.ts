import { useLocation } from "react-router-dom";
import React from "react";

export default function useQuery() {
  const { search } = useLocation();

  // Parse query parameters including productId and size
  return React.useMemo(() => {
    const params = new URLSearchParams(search);
    const productId = params.get("productId");
    const size = params.get("size");

    return { params, productId, size };
  }, [search]);
}
