import { Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { ProductList } from "../constants/ProductList";
import { Delete } from "@mui/icons-material";
import { priceFormatter } from "../lib/utils";

const POForm = () => {
  const navigate = useNavigate();
  const params = useSearchParams()[0];
  const dealerId = params.get("dealerId");
  const [data2, setData2] = useState({
    PO_Number: "",
    DealerId: "",
    ContactPerson: "",
  });
  // const [shipping, setShipping] = useState({
  //   shippingAmount: 0,
  //   shippingCGST: 0,
  //   shippingSGST: 0,
  //   shippingIGST: 0,
  //   shippingTotal: 0
  // });
  const handleChanges = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios
      .get(
        window.MyApiRoute + `dealer/getone?dealerId=${dealerId}`
      )
      .then((res) => {
        setData2({
          DealerId: res.data.details.ID,
          Email: res.data.details.email,
          ContactPerson: res.data.details.name,
          CompanyName: "Pes Online Services Pvt Ltd.",
        });
      })
      .catch((error) => {
        console.log("err", error.response.data.message);
      });
  }, []);

  const [itemList, setItemList] = useState([
    {
      index: new Date().getTime().toString(),
      productType: "sim",
      quantity: 0,
      rate: 0,
      discount: 0,
      CGST: 0,
      SGST: 0,
      IGST: 0,
    },
  ]);

  const AddItem = {
    index: new Date().getTime().toString() + 1,
    productType: "sim",
    quantity: 0,
    rate: 0,
    discount: 0,
    CGST: 0,
    SGST: 0,
    IGST: 0,
  };
  const handleAdd = () => {
    setItemList([...itemList, AddItem]);
  };

  // const handleShipping = (e) => {
  //   const { name, value } = e.target;
  //   let shippingNew = { ...shipping, [name]: value };
  //   shippingNew.shippingTotal = +shippingNew.shippingAmount + (+shippingNew.shippingAmount * (shippingNew.shippingCGST) / 100) + (+shippingNew.shippingAmount * (shippingNew.shippingSGST) / 100) + (+shippingNew.shippingAmount * (shippingNew.shippingIGST) / 100);
  //   console.log(shippingNew);
  //   setShipping(shippingNew);
  // };
  const handleSubmit = () => {
    if (!data2.PO_Number || data2.PO_Number === null) {
      return alert("Error: PO Number is missing or empty");
    }

    axios
      .post(`${window.MyApiRoute}dealerPO/add`, {
        ...data2,
        sim: itemList,
      })
      .then((res) => {
        alert(res.data.message);
        window.history.back();
      })
      .catch((error) => {
        console.log("error", error);
        alert(error.response.data.message);
      });
  };

  const handleChangeItem = (e, _index) => {
    const newItemList = [...itemList];
    const index = newItemList.findIndex((object) => {
      return object.index === _index;
    });
    if (index !== -1) {
      newItemList[index][e.target.name] = e.target.value;
      newItemList[index].CGST = data2?.CGST || 0;
      newItemList[index].SGST = data2?.SGST || 0;
      newItemList[index].IGST = data2?.IGST || 0;
      setItemList(newItemList);
    }
  };
  const handleDeleteItem = (_index) => {
    const New = itemList.filter((item) => item.index !== _index);
    setItemList(New);
  };
  const itemsTotal = () =>
    itemList.reduce((total, item) => {
      let amount = item.quantity * item.rate;
      let afterDiscount = amount - (amount * item.discount) / 100;
      let afterCGST = (afterDiscount * +data2?.CGST || 0) / 100;
      let afterSGST = (afterDiscount * +data2?.SGST || 0) / 100;
      let afterIGST = (afterDiscount * +data2?.IGST || 0) / 100;
      let totalAmount = afterCGST + afterSGST + afterIGST + afterDiscount;
      return (total = total + totalAmount);
    }, 0);
  console.log(itemList);
  const quantity = itemList.reduce(
    (total, curr) => (total += +curr.quantity),
    0
  );
  const baseRate = itemList.reduce((total, curr) => (total += +curr.rate), 0);
  return (
    <>
      <div className="flex justify-center mt-4 ">
        <h1 className="text-2xl text-muted-foreground  ">PRODUCT ORDER</h1>
      </div>
      <div className="grid grid-cols-3 w-4/5 mx-auto ">
        <TextField
          placeholder="PO Number"
          name="PO_Number"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="PO Number"
        />
        {/* <TextField placeholder="City" name="city" /> */}
        <TextField
          name="DealerId"
          sx={{ marginTop: 3, marginRight: 2 }}
          value={data2?.DealerId || ""}
          onChange={handleChanges}
          variant="outlined"
          label="Dealer Id"
          disabled={true}
        />
        <TextField
          name="ContactPerson"
          sx={{ marginTop: 3, marginRight: 2 }}
          value={data2?.ContactPerson || ""}
          onChange={handleChanges}
          variant="outlined"
          label="Dealer Name"
        />
        <TextField
          name="Dealer_Billing_Address"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="Billing Address"
        />
        <TextField
          name="Dealer_Delivery_Address"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="Deliever Address"
        />
        <TextField
          name="PO_Type"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="PO Type"
        />
        <TextField
          name="Email"
          sx={{ marginTop: 3, marginRight: 2 }}
          value={data2?.Email || ""}
          onChange={handleChanges}
          variant="outlined"
          label="Email"
        />
        <TextField
          name="ContactNumber"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="Contact us"
        />

        <Select
          name="CompanyName"
          sx={{ marginTop: 3, marginRight: 2 }}
          label="Company Name"
          onChange={handleChanges}
          value={data2.CompanyName || "Pes Online Services Pvt Ltd. "}
          variant="outlined"
        >
          <MenuItem value="Perfect Engineer Pvt Ltd.">
            Perfect Engineer Services
          </MenuItem>
          <MenuItem value="Pes Online Services Pvt Ltd.">
            Pes Online Services
          </MenuItem>
          <MenuItem value="Pes Electrical Pvt Ltd.">
            pes Electrical Pvt Ltd.
          </MenuItem>
        </Select>
        <TextField
          name="CGST"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="CGST"
        />
        <TextField
          name="SGST"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="SGST"
        />
        <TextField
          name="IGST"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="IGST"
        />
      </div>
      <div className="flex justify-center mt-6">
        <h1 className="text-2xl text-muted-foreground ">PRODUCT LIST</h1>
      </div>
      <section className="w-4/5 mx-auto border-2 border-t-0 border-gray-500">
        <div className="py-1 text-sm text-center grid grid-cols-12 bg-gray-700 text-gray-200">
          <p className="col-span-3 text-start px-3">Product Name</p>
          <p>Quantity</p>
          <p>Base Rate</p>
          <p>Amount</p>
          <p>Discount(%)</p>
          <p>After Discount</p>
          <p>CGST({data2?.CGST || 0} %)</p>
          <p>SGST({data2?.SGST || 0}%)</p>
          <p>IGST({data2?.IGST || 0}%)</p>
          <p className="col-span-1">Total Amount</p>
        </div>
        {itemList?.map((item) => {
          let amount = item.quantity * item.rate;
          let afterDiscount = amount - (amount * item.discount) / 100;
          let afterCGST = (afterDiscount * +data2?.CGST || 0) / 100;
          let afterSGST = (afterDiscount * +data2?.SGST || 0) / 100;
          let afterIGST = (afterDiscount * +data2?.IGST || 0) / 100;
          let totalAmount = afterCGST + afterSGST + afterIGST + afterDiscount;
          return (
            <div
              key={item.index}
              className="grid relative remove-number-input-styles bg-gray-300 grid-cols-12 text-center"
            >
              <select
                value={item.productType}
                name="productType"
                onChange={(e) => handleChangeItem(e, item.index)}
                className="col-span-3 p-2 ring-gray-400 ring-[1px]"
              >
                {ProductList.map((product) => (
                  <option value={product[1]}>{product[0]}</option>
                ))}
                <option value="shipping">Shipping</option>
              </select>
              <input
                value={item.quantity}
                name="quantity"
                onChange={(e) => handleChangeItem(e, item.index)}
                type="number"
                className=" ring-gray-400 ring-[1px] bg-transparent text-center "
              />
              <input
                value={item.rate}
                name="rate"
                onChange={(e) => handleChangeItem(e, item.index)}
                type="number"
                className=" ring-gray-400 ring-[1px] bg-transparent text-center "
              />
              <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
                {amount.toFixed(2)}
              </p>
              <input
                value={item.discount}
                name="discount"
                onChange={(e) => handleChangeItem(e, item.index)}
                type="number"
                className=" ring-gray-400 ring-[1px] bg-transparent text-center "
              />
              <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
                {afterDiscount.toFixed(2)}
              </p>
              <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
                {afterCGST.toFixed(2)}
              </p>
              <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
                {afterSGST.toFixed(2)}
              </p>
              <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
                {afterIGST.toFixed(2)}
              </p>
              <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
                {priceFormatter.format(totalAmount)}
              </p>
              {itemList.length > 1 && (
                <Delete
                  onClick={() => handleDeleteItem(item.index)}
                  className="absolute cursor-pointer -right-8 top-2"
                />
              )}
            </div>
          );
        })}
        <div className="grid relative remove-number-input-styles bg-gray-300 grid-cols-12 text-center">
          <p className="flex col-span-3 border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center text-start w-full">
            Total
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            {quantity}
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            {baseRate}
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            1
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            1
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            1
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            1
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            1
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            1
          </p>
          <p className="flex border-t-[1px] border-r-[1px] border-gray-400 items-center justify-center ">
            1
          </p>
        </div>
      </section>
      <p className="w-4/5 mx-auto mt-2">
        <span
          className="text-md text-blue-500 px-2 py-2 cursor-pointer font-semibold"
          onClick={handleAdd}
        >
          + Add Row
        </span>
      </p>
      <div className="w-4/5 mx-auto pb-5">
        <p className="py-4 text-2xl">
          Grand Total = {priceFormatter.format(itemsTotal())}
        </p>
        <TextField
          name="note"
          className="w-full"
          sx={{ marginTop: 3, marginRight: 2 }}
          onChange={handleChanges}
          variant="outlined"
          label="Note"
          multiline
          rows={3}
        />
      </div>
      <div className="flex justify-center">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default POForm;
