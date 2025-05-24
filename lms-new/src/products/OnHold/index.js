// import React, { useEffect, useState } from "react";
// import StoreToEngineer from "./StoreToEngineer";
// import StoreToProduction from "./StoreToProduction";
// import StoreToDefective from "./StoreToDefective";
// import ProductionToStore from "./ProductionToStore";
// import DefectedToStore from "./DefectedToStore";
// import StoreToDealer from "./StoreToDealer";
// import EngineerToStore from "./EngineerToStore";
// import DealerToStore from "./DealerToStore";
// import secureLocalStorage from "react-secure-storage";
// import { useSelector } from "react-redux";
// import StoreToRejected from "./StoreToRejected"; 

// const OnHold = () => {
//   const [count, setCount] = useState({});
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
//   const isStoreKeeper = userInfo?.data?.Designation === "storekeeper";
//   const isProduction = userInfo?.data?.Designation === "production";
//   const isEngineer = userInfo?.data?.Designation === "engineer";
//   const admin = userInfo?.data?.Designation === "CEO";
//   const { simCounts } = useSelector((state) => state.totalReducer);
//   useEffect(() => {
//     setCount(simCounts);
//   }, [simCounts]);
//   console.log("count", count);
//   const productionNav = {
//     [`Awaiting Approval From Store  (${count.productionToStore})`]: (
//       <ProductionToStore
//         query="internalNonReturnableChallan"
//         downloadUrl="/downloadproductionchallanpdf"
//         canChange={isStoreKeeper}
//       />
//     ),
//     [`Awaiting Approval From Store - DEF (${count.defectiveToStore})`]: (
//       <DefectedToStore
//         query="internalReturnableChallan"
//         canChange={isStoreKeeper}
//         downloadUrl="/downloadchallanpdf"
//       />
//     ),
//     [`Store Challan Pending ${count.storeToProduction}`]: (
//       <StoreToProduction
//         query="internalNonReturnableChallan"
//         downloadUrl="/downloadproductionchallanpdf"
//         canChange={isProduction}
//       />
//     ),
//     [`Store Challan Pending - DEF (${count.storeToDefective})`]: (
//       <StoreToDefective
//         query="internalReturnableChallan"
//         downloadUrl="/downloadchallanpdf"
//         canChange={isProduction}
//       />
//     ),
//   };
//   const storeNavbar = {
//     [`Awaiting Approval From Production (${count.storeToProduction})`]: (
//       <StoreToProduction
//         query="internalNonReturnableChallan"
//         downloadUrl="/downloadproductionchallanpdf"
//         canChange={isProduction}
//       />
//     ),
//     [`Awaiting Approval From Defective (${count.storeToDefective})`]: (
//       <StoreToDefective
//         query="internalReturnableChallan"
//         canChange={isProduction}
//         downloadUrl="/downloadchallanpdf"
//       />
//     ),
//     [`Awaiting Approval From Engineer (${count.storeToSite})`]: (
//       <StoreToEngineer
//         query="externalReturnableChallan"
//         canChange={isEngineer}
//         downloadUrl="/downloadengineerchallanpdf"
//       />
//     ),
//     [`Awaiting Approval From Thirdparty (${count.StoreToDealerCount})`]: (
//       <StoreToDealer
//         query="thirdPartyReturnableChallan"
//         canChange={isEngineer}
//         downloadUrl="/thirdpartychallanpdf"
//       />
//     ),
//     [`Awaiting Approval From CEO (${count.storeToRejectedCount})`]: (
//       <StoreToRejected
//         query="Rejected"
//         canChange={admin}
//         downloadUrl="/thirdpartychallanpdf"
//       />
//     ),
//     [`Production Challan Pending (${count.productionToStore})`]: (
//       <ProductionToStore
//         query="internalNonReturnableChallan"
//         downloadUrl="/downloadproductionchallanpdf"
//         canChange={isStoreKeeper}
//       />
//     ),
//     [`Defective Challan Pending (${count.defectiveToStore})`]: (
//       <DefectedToStore
//         query="internalReturnableChallan"
//         canChange={isStoreKeeper}
//         downloadUrl="/downloadchallanpdf"
//       />
//     ),
//     [`Engineer Challan Pending (${count.siteToStore})`]: (
//       <EngineerToStore
//         query="externalReturnableChallan"
//         canChange={isStoreKeeper}
//         downloadUrl="/downloadengineerchallanpdf"
//       />
//     ),
//     "Thirdparty Challan Pending": (
//       <DealerToStore
//         query="externalReturnableChallan"
//         canChange={isStoreKeeper}
//         downloadUrl="/downloadengineerchallanpdf"
//       />
//     ),
//   };
//   const engineerNav = {
//     [`Awaiting Approval From Store (${count.siteToStore})`]: (
//       <EngineerToStore
//         query="externalReturnableChallan"
//         downloadUrl="/downloadengineerchallanpdf"
//         canChange={isStoreKeeper}
//       />
//     ),
//     [`Store Challan Pending ${count.storeToSite}`]: (
//       <StoreToEngineer
//         query="externalReturnableChallan"
//         canChange={isEngineer}
//         downloadUrl="/downloadengineerchallanpdf"
//       />
//     ),
//   };
//   const adminNav = {
//     [`Awaiting Approval From CEO (${count.storeToRejectedCount})`]: (
//       <StoreToRejected
//         query="Rejected"
//         canChange={admin}
//         downloadUrl="/thirdpartychallanpdf"
//       />
//     ),
//     [`Awaiting Approval From Production (${count.storeToProduction})`]: (
//       <StoreToProduction
//         query="internalNonReturnableChallan"
//         downloadUrl="/downloadproductionchallanpdf"
//         canChange={isProduction}
//       />
//     ),
//     [`Awaiting Approval From Defective (${count.storeToDefective})`]: (
//       <StoreToDefective
//         query="internalReturnableChallan"
//         canChange={isProduction}
//         downloadUrl="/downloadchallanpdf"
//       />
//     ),
//     [`Awaiting Approval From Engineer (${count.storeToSite})`]: (
//       <StoreToEngineer
//         query="externalReturnableChallan"
//         canChange={isEngineer}
//         downloadUrl="/downloadengineerchallanpdf"
//       />
//     ),
//     [`Awaiting Approval From Thirdparty (${count.StoreToDealerCount})`]: (
//       <StoreToDealer
//         query="thirdPartyReturnableChallan"
//         canChange={isEngineer}
//         downloadUrl="/thirdpartychallanpdf"
//       />
//     ),
//     [`Awaiting Approval From CEO (${count.storeToRejectedCount})`]: (
//       <StoreToRejected
//         query="Rejected"
//         canChange={admin}
//         downloadUrl="/thirdpartychallanpdf"
//       />
//     ),
//     [`Production Challan Pending (${count.productionToStore})`]: (
//       <ProductionToStore
//         query="internalNonReturnableChallan"
//         downloadUrl="/downloadproductionchallanpdf"
//         canChange={isStoreKeeper}
//       />
//     ),
//     [`Defective Challan Pending (${count.defectiveToStore})`]: (
//       <DefectedToStore
//         query="internalReturnableChallan"
//         canChange={isStoreKeeper}
//         downloadUrl="/downloadchallanpdf"
//       />
//     ),
//     [`Engineer Challan Pending (${count.siteToStore})`]: (
//       <EngineerToStore
//         query="externalReturnableChallan"
//         canChange={isStoreKeeper}
//         downloadUrl="/downloadengineerchallanpdf"
//       />
//     ),
//     "Thirdparty Challan Pending": (
//       <DealerToStore
//         query="externalReturnableChallan"
//         canChange={isStoreKeeper}
//         downloadUrl="/downloadengineerchallanpdf"
//       />
//     ),
//   };
//   const defaultNav = {};

//   let currentSideBar;

//   if (isEngineer) {
//     currentSideBar = engineerNav;
//   } else if (isProduction) {
//     currentSideBar = productionNav;
//   } else if (isStoreKeeper) {
//     currentSideBar = storeNavbar;
//   } else if (admin) {
//     currentSideBar = adminNav;
//   } else {
//     // If none of the conditions are met, you can set a default value or handle it accordingly.
//     // For example:
//     currentSideBar = defaultNav;
//   }

//   const [tab, setTab] = useState(Object.keys(currentSideBar)[0]);

//   const handleTabChange = (tab) => {
//     setTab(tab);
//   };
//   return (
//     <div className="md:flex">
//       <section className="left md:max-h-[75vh] overflow-x-scroll py-4 flex flex-nowrap gap-x-2 md:flex-col gap-y-1">
//         {Object.keys(currentSideBar).map((btn) => {
//           return (
//             <NewButton
//               key={btn}
//               title={btn}
//               tab={tab}
//               func={() => handleTabChange(btn)}
//             />
//           );
//         })}
//       </section>
//       <section className="md:w-4/5">{currentSideBar[tab]}</section>
//     </div>
//   );
// };

// export default OnHold;

// const NewButton = ({ title, tab, func }) => {
//   return (
//     <button
//       onClick={func}
//       className={`rounded-md flex-none md:w-auto  md:text-xl font-[600] text-gray-700 px-2 py-3 ${
//         tab === title ? "bg-red-400 text-white" : " bg-gray-200"
//       }`}>
//       {title}
//     </button>
//   );
// };
import React, { useEffect, useState } from "react";
import StoreToEngineer from "./StoreToEngineer";
import StoreToProduction from "./StoreToProduction";
import StoreToDefective from "./StoreToDefective";
import ProductionToStore from "./ProductionToStore";
import DefectedToStore from "./DefectedToStore";
import StoreToDealer from "./StoreToDealer";
import EngineerToStore from "./EngineerToStore";
import DealerToStore from "./DealerToStore";
import StoreToRejected from "./StoreToRejected";
import secureLocalStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { mainRoute } from "../../App";


const OnHold = () => {
  const [count, setCount] = useState({});
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const isStoreKeeper = userInfo?.data?.Designation === "storekeeper";
  const isProduction = userInfo?.data?.Designation === "production";
  const isEngineer = userInfo?.data?.Designation === "engineer";
  const admin = userInfo?.data?.Designation === "CEO";
  const { simCounts } = useSelector((state) => state.totalReducer);

  useEffect(() => {
    setCount(simCounts);
  }, [simCounts]);

  const productionNav = {
    [`Awaiting Approval From Store  (${count.productionToStore})`]: (
      <ProductionToStore
        query="internalNonReturnableChallan"
        downloadUrl={`${mainRoute}/downloadproductionchallanpdf`}
        canChange={isStoreKeeper}
      />
    ),
    [`Awaiting Approval From Store - DEF (${count.defectiveToStore})`]: (
      <DefectedToStore
        query="internalReturnableChallan"
        canChange={isStoreKeeper}
        downloadUrl={`${mainRoute}/downloadchallanpdf`}
      />
    ),
    [`Store Challan Pending ${count.storeToProduction}`]: (
      <StoreToProduction
        query="internalNonReturnableChallan"
        downloadUrl={`${mainRoute}/downloadproductionchallanpdf`}
        canChange={isProduction}
      />
    ),
    [`Store Challan Pending - DEF (${count.storeToDefective})`]: (
      <StoreToDefective
        query="internalReturnableChallan"
        downloadUrl={`${mainRoute}/downloadchallanpdf`}
        canChange={isProduction}
      />
    ),
  };

  const storeNavbar = {
    [`Awaiting Approval From Production (${count.storeToProduction})`]: (
      <StoreToProduction
        query="internalNonReturnableChallan"
        downloadUrl={`${mainRoute}/downloadproductionchallanpdf`}
        canChange={isProduction}
      />
    ),
    [`Awaiting Approval From Defective (${count.storeToDefective})`]: (
      <StoreToDefective
        query="internalReturnableChallan"
        canChange={isProduction}
        downloadUrl={`${mainRoute}/downloadchallanpdf`}
      />
    ),
    [`Awaiting Approval From Engineer (${count.storeToSite})`]: (
      <StoreToEngineer
        query="externalReturnableChallan"
        canChange={isEngineer}
        downloadUrl={`${mainRoute}/downloadengineerchallanpdf`}
      />
    ),
    [`Awaiting Approval From Thirdparty (${count.StoreToDealerCount})`]: (
      <StoreToDealer
        query="thirdPartyReturnableChallan"
        canChange={isEngineer}
        downloadUrl={`${mainRoute}/thirdpartychallanpdf`}
      />
    ),
    [`Awaiting Approval From CEO (${count.storeToRejectedCount})`]: (
      <StoreToRejected
        query="Rejected"
        canChange={admin}
        downloadUrl={`${mainRoute}/thirdpartychallanpdf`}
      />
    ),
    [`Production Challan Pending (${count.productionToStore})`]: (
      <ProductionToStore
        query="internalNonReturnableChallan"
        downloadUrl={`${mainRoute}/downloadproductionchallanpdf`}
        canChange={isStoreKeeper}
      />
    ),
    [`Defective Challan Pending (${count.defectiveToStore})`]: (
      <DefectedToStore
        query="internalReturnableChallan"
        canChange={isStoreKeeper}
        downloadUrl={`${mainRoute}/downloadchallanpdf`}
      />
    ),
    [`Engineer Challan Pending (${count.siteToStore})`]: (
      <EngineerToStore
        query="externalReturnableChallan"
        canChange={isStoreKeeper}
        downloadUrl={`${mainRoute}/downloadengineerchallanpdf`}
      />
    ),
    "Thirdparty Challan Pending": (
      <DealerToStore
        query="externalReturnableChallan"
        canChange={isStoreKeeper}
        downloadUrl={`${mainRoute}/downloadengineerchallanpdf`}
      />
    ),
  };

  const engineerNav = {
    [`Awaiting Approval From Store (${count.siteToStore})`]: (
      <EngineerToStore
        query="externalReturnableChallan"
        downloadUrl={`${mainRoute}/downloadengineerchallanpdf`}
        canChange={isStoreKeeper}
      />
    ),
    [`Store Challan Pending ${count.storeToSite}`]: (
      <StoreToEngineer
        query="externalReturnableChallan"
        canChange={isEngineer}
        downloadUrl={`${mainRoute}/downloadengineerchallanpdf`}
      />
    ),
  };

  const adminNav = {
    [`Awaiting Approval From CEO (${count.storeToRejectedCount})`]: (
      <StoreToRejected
        query="Rejected"
        canChange={admin}
        downloadUrl={`${mainRoute}/thirdpartychallanpdf`}
      />
    ),
    [`Awaiting Approval From Production (${count.storeToProduction})`]: (
      <StoreToProduction
        query="internalNonReturnableChallan"
        downloadUrl={`${mainRoute}/downloadproductionchallanpdf`}
        canChange={isProduction}
      />
    ),
    [`Awaiting Approval From Defective (${count.storeToDefective})`]: (
      <StoreToDefective
        query="internalReturnableChallan"
        canChange={isProduction}
        downloadUrl={`${mainRoute}/downloadchallanpdf`}
      />
    ),
    [`Awaiting Approval From Engineer (${count.storeToSite})`]: (
      <StoreToEngineer
        query="externalReturnableChallan"
        canChange={isEngineer}
        downloadUrl={`${mainRoute}/downloadengineerchallanpdf`}
      />
    ),
    [`Awaiting Approval From Thirdparty (${count.StoreToDealerCount})`]: (
      <StoreToDealer
        query="thirdPartyReturnableChallan"
        canChange={isEngineer}
        downloadUrl={`${mainRoute}/thirdpartychallanpdf`}
      />
    ),
    [`Awaiting Approval From CEO (${count.storeToRejectedCount})`]: (
      <StoreToRejected
        query="Rejected"
        canChange={admin}
        downloadUrl={`${mainRoute}/thirdpartychallanpdf`}
      />
    ),
    [`Production Challan Pending (${count.productionToStore})`]: (
      <ProductionToStore
        query="internalNonReturnableChallan"
        downloadUrl={`${mainRoute}/downloadproductionchallanpdf`}
        canChange={isStoreKeeper}
      />
    ),
    [`Defective Challan Pending (${count.defectiveToStore})`]: (
      <DefectedToStore
        query="internalReturnableChallan"
        canChange={isStoreKeeper}
        downloadUrl={`${mainRoute}/downloadchallanpdf`}
      />
    ),
    [`Engineer Challan Pending (${count.siteToStore})`]: (
      <EngineerToStore
        query="externalReturnableChallan"
        canChange={isStoreKeeper}
        downloadUrl={`${mainRoute}/downloadengineerchallanpdf`}
      />
    ),
    "Thirdparty Challan Pending": (
      <DealerToStore
        query="externalReturnableChallan"
        canChange={isStoreKeeper}
        downloadUrl={`${mainRoute}/downloadengineerchallanpdf`}
      />
    ),
  };

  const defaultNav = {};
  let currentSideBar;

  if (isEngineer) {
    currentSideBar = engineerNav;
  } else if (isProduction) {
    currentSideBar = productionNav;
  } else if (isStoreKeeper) {
    currentSideBar = storeNavbar;
  } else if (admin) {
    currentSideBar = adminNav;
  } else {
    currentSideBar = defaultNav;
  }

  const [tab, setTab] = useState(Object.keys(currentSideBar)[0]);

  return (
    <div className="md:flex">
      <section className="left md:max-h-[75vh] overflow-x-scroll py-4 flex flex-nowrap gap-x-2 md:flex-col gap-y-1">
        {Object.keys(currentSideBar).map((btn) => (
          <NewButton key={btn} title={btn} tab={tab} func={() => setTab(btn)} />
        ))}
      </section>
      <section className="md:w-4/5">{currentSideBar[tab]}</section>
    </div>
  );
};

export default OnHold;

const NewButton = ({ title, tab, func }) => {
  return (
    <button
      onClick={func}
      className={`rounded-md flex-none md:w-auto  md:text-xl font-[600] text-gray-700 px-2 py-3 ${
        tab === title ? "bg-red-400 text-white" : " bg-gray-200"
      }`}>
      {title}
    </button>
  );
};
