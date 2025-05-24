import { Button } from "@mui/material";
import React from "react";

const SingleChallan = ({
  single,
  removeItem,
  deleteChallan,
  submitChallan,
}) => {
  console.log(single);
  return (
    <div className="w-4/5 mx-auto mb-5">
      <table className="table-for-challan">
        <thead>
          <tr>
            <th className="w-[350px]">Dealer : {single?.dealerName}</th>
            <th className="w-[250px]">Product</th>
            <th className="w-[250px]">Product Sr No</th>
            <th className="w-[250px]">Site Name</th>
          </tr>
        </thead>
        <tbody>
          {single?.Products.map((product) => (
            <tr>
              <td className="w-[350px]">
                <Button
                  onClick={() => removeItem(product)}
                  variant="contained"
                  sx={{ paddingY: "2px", boxShadow: "none" }}
                  size="small">
                  Remove item
                </Button>{" "}
              </td>
              <td className="w-[250px]">{product.productType}</td>
              <td className="w-[250px]">{product.productSrNo}</td>
              <td className="w-[250px]">{product.dealerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-x-5 py-2">
        <Button
          size="small"
          variant="contained"
          onClick={() => deleteChallan(single)}
          color="error">
          Cancel Challan
        </Button>
        <Button
          size="small"
          onClick={() => submitChallan(single)}
          variant="contained"
          color="success">
          Create Challan
        </Button>
      </div>
    </div>
  );
};

export default SingleChallan;
