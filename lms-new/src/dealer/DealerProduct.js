import React, { useEffect, useState } from "react";
import { ProductList } from "../constants/ProductList";
import axios from "axios";
import ShowProductTable from "./ShowProductTable";
import  secureLocalStorage  from  "react-secure-storage";

const DealerProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(ProductList[1][1]);

  const { data } = JSON.parse(secureLocalStorage.getItem("info"));
  const handlechange = (product) => {
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${product}&location=inStore`,
        data
      )
      .then((res) => {
        setProducts(res.data.Data);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };
  useEffect(() => {
    handlechange(ProductList[1][1]);
  }, []);

  return (
    <div className="flex h-[600px]">
      <div style={{ margin: "10px 10px 0 0" }} className="w-[25%]">
        {ProductList.map((product) => {
          if (product[1] === "sim") {
            return;
          }
          return (
            <div
              key={product}
              className={`font-xl mt-2 border-b-[1px] border-gray-500 cursor-pointer
                  ${
                    selectedProduct === product[1]
                      ? "bg-blue-500 text-white"
                      : ""
                  }
                  `}
              onClick={() => {
                handlechange(product[1]);
                setSelectedProduct(product[1]);
              }}
            >
              {product[0]}
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, marginLeft: "10px", overflowY: "auto" }}>
        <ShowProductTable selectedProduct={selectedProduct} data={products} />
      </div>
    </div>
  );
};

export default DealerProduct;
