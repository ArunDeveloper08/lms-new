import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const config = [
  {
    name: "Initiate By Me",
    path: "/view-engineer-challan",
  },
  {
    name: "Initiate By Store",
    path: "initiate-by-store",
  },
  {
    name: "Challan History",
    path: "challan-history",
  },
];
const ViewEngineerChallanPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(
    "/view-engineer-challan"
  );

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    navigate(option, { replace: true });
    // You can perform other actions here based on the selected option
  };

  return (
    <>
      <div className="flex grid-grid-cols-4 w-full">
        <div className="tabs-for-challan flex w-full justify-between">
          {config.map((option) => (
            <label
              key={option.name}
              className={`tab-box py-2 text-center font-bold w-full ${
                selectedOption === option.path
                  ? "bg-red-100 rounded-md border-b-2 border-red-700"
                  : " border-b-2"
              }`}>
              <input
                type="radio"
                name="tab-input"
                className="tab-input hidden"
                checked={selectedOption === option.path}
                onChange={() => handleOptionChange(option.path)}
              />
              <div>{option.name}</div>
            </label>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ViewEngineerChallanPage;
