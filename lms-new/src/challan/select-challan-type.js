import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { mainRoute } from "../App";

const SelectChallantype = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("engineer");

  const changeChallanType = (selectedValue) => {
    navigate(`${mainRoute}/challan/${selectedValue}`, { replace: true });
  };

  useEffect(() => {
    // Extract the challan type from the current pathname
    const pathSegments = pathname.split("/");
    const currentChallanType = pathSegments[3];
    // when the user in on the -- /challan route only
    if (currentChallanType === undefined) {
      navigate(`${mainRoute}/challan/${selectedValue}`, { replace: true });
    }
    // Update the selected value in the component state
    setSelectedValue(currentChallanType);
  }, [pathname]);
  return (
    <>
      <div>
        <select
          onChange={(e) => changeChallanType(e.target.value)}
          value={selectedValue}
          className="px-2 py-2 border-black border-[1px] rounded ">

          {/* <option value="engineer-returnable">
            Engineer Returnable Challan
          </option> */}

          <option value="engineer">Engineer Returnable Challan</option>
          <option value="production-non-returnable-challan">
            Production Non Returnable Challan
          </option>
          <option value="production-returnable-challan">
            Production Returnable Challan
          </option>

          <option value="third-party-non-returnable">
            Dealer Non-Returnable Challan
          </option>
          <option value="third-party-returnable">
            Third Party Inward/Outward Returnable Challan
          </option>
          
        </select>
      </div>
      <Outlet />
    </>
  );
};

export default SelectChallantype;
