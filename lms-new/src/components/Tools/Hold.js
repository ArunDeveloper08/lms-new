import React, { useEffect, useState } from "react";

import secureLocalStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import ToolEngineerToStore from "./ToolEngineerToStore/ToolEngineerToStore";
import ToolStoreToEngineer from "./ToolStoreToEngineer/ToolStoreToEngineer";
import StoreToReject from "./Rejected/StoreToReject";
import ToolStoreToProduction from "./ToolStoreToProduction/ToolStoreToProduction";
import ToolStoreToMechanical from "./ToolStoreToMechanical/ToolStoreToMechanical";
import ToolProductionToStore from "./ToolProductionToStore/ToolProductionToStore";
import ToolMechanicalToStore from "./ToolMechanicalToStore/ToolMechanicalToStore";
import { mainRoute } from "../../App";

const Hold = ({ tools, tool, setTool, setTools }) => {
  const [count, setCount] = useState({});
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const isStoreKeeper = userInfo?.data?.Designation === "storekeeper";
  const admin = userInfo?.data?.Designation === "CEO";
  const production = userInfo?.data?.Designation === "production";
  const Mechanical = userInfo?.data?.Designation === "Mechanical";

  const isEngineer = userInfo?.data?.Designation === "engineer";
  const { simCounts } = useSelector((state) => state.totalReducer);
  const { toolsCounts } = useSelector((state) => state?.toolsTotalReducer);
  useEffect(() => {
    setCount(simCounts);
  }, [simCounts]);

  // const storeNavbar = {
  //   [`Awaiting Approval From Engineer (${toolsCounts?.StoreToEnginnerCount}) `]:
  //     (
  //       <ToolStoreToEngineer
  //         query="externalReturnableChallan"
  //         canChange={isEngineer}
  //         downloadUrl="/downloadengineertoolchallanpdf"
  //       />
  //     ),
  //   [` Awaiting Approval From Production(${toolsCounts?.StoreToProductionCount})  `]:
  //     (
  //       <ToolStoreToProduction
  //         query="externalReturnableChallan"
  //         canChange={production}
  //         downloadUrl="/downloadproductiontoolchallanpdf"
  //       />
  //     ),

  //   [` Awaiting Approval From Mechanical(${toolsCounts?.StoreToMechanicalCount})  `]:
  //     (
  //       <ToolStoreToMechanical
  //         query="externalReturnableChallan"
  //         canChange={Mechanical}
  //         downloadUrl="/downloadmechanicaltoolchallanpdf"
  //       />
  //     ),
  //   [`Engineer  Pending(${toolsCounts?.EngineerToStoreCount}) `]: (
  //     <ToolEngineerToStore
  //       query="externalReturnableChallan"
  //       canChange={isStoreKeeper}
  //       downloadUrl="/downloadengineertoolchallanpdf"
  //     />
  //   ),
  //   [`Production  Pending(${toolsCounts?.ProductionToStoreCount})`]: (
  //     <ToolProductionToStore
  //       query="externalReturnableChallan"
  //       canChange={isStoreKeeper}
  //       downloadUrl="/downloadproductiontoolchallanpdf"
  //     />
  //   ),
  //   [`Mechanical  Pending(${toolsCounts?.MechanicalToStoreCount})`]: (
  //     <ToolMechanicalToStore
  //       query="externalReturnableChallan"
  //       canChange={isStoreKeeper}
  //       downloadUrl="/downloadmechanicaltoolchallanpdf"
  //     />
  //   ),

  //   [` In Rejected(${toolsCounts?.StoreToRejectedCount})`]: (
  //     <StoreToReject
  //       query="externalReturnableChallan"
  //       canChange={admin}
  //       downloadUrl="/downloadrejectedtoolchallanpdf"
  //     />
  //   ),
  // };

  // const engineerNav = {
  //   [`Awaiting Approval From Store(${toolsCounts?.EngineerToStoreCount})`]: (
  //     <ToolEngineerToStore
  //       query="externalReturnableChallan"
  //       downloadUrl="/downloadengineertoolchallanpdf"
  //       canChange={isStoreKeeper}
  //     />
  //   ),
  //   [`Store  Pending(${toolsCounts?.StoreToEnginnerCount}) `]: (
  //     <ToolStoreToEngineer
  //       query="externalReturnableChallan"
  //       canChange={isEngineer}
  //       downloadUrl="/downloadengineertoolchallanpdf"
  //     />
  //   ),
  // };

  // const productionNav = {
  //   [`Awaiting Approval From Store(${toolsCounts?.ProductionToStoreCount})`]: (
  //     <ToolProductionToStore
  //       query="externalReturnableChallan"
  //       downloadUrl="/downloadproductiontoolchallanpdf"
  //       canChange={isStoreKeeper}
  //     />
  //   ),
  //   [`Store  Pending(${toolsCounts?.StoreToProductionCount}) `]: (
  //     <ToolStoreToProduction
  //       query="externalReturnableChallan"
  //       canChange={production}
  //       downloadUrl="/downloadproductiontoolchallanpdf"
  //     />
  //   ),
  // };

  // const MechanicalNav = {
  //   [`Awaiting Approval From Store(${toolsCounts?.MechanicalToStoreCount})`]: (
  //     <ToolMechanicalToStore
  //       query="externalReturnableChallan"
  //       downloadUrl="/downloadmechanicaltoolchallanpdf"
  //       canChange={isStoreKeeper}
  //     />
  //   ),
  //   [`Store  Pending(${toolsCounts?.StoreToMechanicalCount})`]: (
  //     <ToolStoreToMechanical
  //       query="externalReturnableChallan"
  //       canChange={Mechanical}
  //       downloadUrl="/downloadmechanicaltoolchallanpdf"
  //     />
  //   ),
  // };

  // const adminNav = {
  //   [` In Rejected (${toolsCounts?.StoreToRejectedCount})`]: (
  //     <StoreToReject
  //       query="externalReturnableChallan"
  //       canChange={admin}
  //       downloadUrl="/downloadrejectedtoolchallanpdf"
  //     />
  //   ),

  //   [`Awaiting Approval From Engineer (${toolsCounts?.StoreToEnginnerCount}) `]:
  //     (
  //       <ToolStoreToEngineer
  //         query="externalReturnableChallan"
  //         canChange={isEngineer}
  //         downloadUrl="/downloadengineertoolchallanpdf"
  //       />
  //     ),
  //   [` Awaiting Approval From Production(${toolsCounts?.StoreToProductionCount})  `]:
  //     (
  //       <ToolStoreToProduction
  //         query="externalReturnableChallan"
  //         canChange={production}
  //         downloadUrl="/downloadproductiontoolchallanpdf"
  //       />
  //     ),

  //   [` Awaiting Approval From Mechanical(${toolsCounts?.StoreToMechanicalCount})  `]:
  //     (
  //       <ToolStoreToMechanical
  //         query="externalReturnableChallan"
  //         canChange={Mechanical}
  //         downloadUrl="/downloadmechanicaltoolchallanpdf"
  //       />
  //     ),
  //   [`Engineer  Pending(${toolsCounts?.EngineerToStoreCount}) `]: (
  //     <ToolEngineerToStore
  //       query="externalReturnableChallan"
  //       canChange={isStoreKeeper}
  //       downloadUrl="/downloadengineertoolchallanpdf"
  //     />
  //   ),
  //   [`Production  Pending(${toolsCounts?.ProductionToStoreCount})`]: (
  //     <ToolProductionToStore
  //       query="externalReturnableChallan"
  //       canChange={isStoreKeeper}
  //       downloadUrl="/downloadproductiontoolchallanpdf"
  //     />
  //   ),
  //   [`Mechanical  Pending(${toolsCounts?.MechanicalToStoreCount})`]: (
  //     <ToolMechanicalToStore
  //       query="externalReturnableChallan"
  //       canChange={isStoreKeeper}
  //       downloadUrl="/downloadmechanicaltoolchallanpdf"
  //     />
  //   ),
  // };

 
const storeNavbar = {
  [`Awaiting Approval From Engineer (${toolsCounts?.StoreToEnginnerCount}) `]:
    (
      <ToolStoreToEngineer
        query="externalReturnableChallan"
        canChange={isEngineer}
        downloadUrl={mainRoute + "/downloadengineertoolchallanpdf"}
      />
    ),
  [` Awaiting Approval From Production(${toolsCounts?.StoreToProductionCount})  `]:
    (
      <ToolStoreToProduction
        query="externalReturnableChallan"
        canChange={production}
        downloadUrl={mainRoute + "/downloadproductiontoolchallanpdf"}
      />
    ),
  [` Awaiting Approval From Mechanical(${toolsCounts?.StoreToMechanicalCount})  `]:
    (
      <ToolStoreToMechanical
        query="externalReturnableChallan"
        canChange={Mechanical}
        downloadUrl={mainRoute + "/downloadmechanicaltoolchallanpdf"}
      />
    ),
  [`Engineer  Pending(${toolsCounts?.EngineerToStoreCount}) `]: (
    <ToolEngineerToStore
      query="externalReturnableChallan"
      canChange={isStoreKeeper}
      downloadUrl={mainRoute + "/downloadengineertoolchallanpdf"}
    />
  ),
  [`Production  Pending(${toolsCounts?.ProductionToStoreCount})`]: (
    <ToolProductionToStore
      query="externalReturnableChallan"
      canChange={isStoreKeeper}
      downloadUrl={mainRoute + "/downloadproductiontoolchallanpdf"}
    />
  ),
  [`Mechanical  Pending(${toolsCounts?.MechanicalToStoreCount})`]: (
    <ToolMechanicalToStore
      query="externalReturnableChallan"
      canChange={isStoreKeeper}
      downloadUrl={mainRoute + "/downloadmechanicaltoolchallanpdf"}
    />
  ),
  [` In Rejected(${toolsCounts?.StoreToRejectedCount})`]: (
    <StoreToReject
      query="externalReturnableChallan"
      canChange={admin}
      downloadUrl={mainRoute + "/downloadrejectedtoolchallanpdf"}
    />
  ),
};

const engineerNav = {
  [`Awaiting Approval From Store(${toolsCounts?.EngineerToStoreCount})`]: (
    <ToolEngineerToStore
      query="externalReturnableChallan"
      downloadUrl={mainRoute + "/downloadengineertoolchallanpdf"}
      canChange={isStoreKeeper}
    />
  ),
  [`Store  Pending(${toolsCounts?.StoreToEnginnerCount}) `]: (
    <ToolStoreToEngineer
      query="externalReturnableChallan"
      canChange={isEngineer}
      downloadUrl={mainRoute + "/downloadengineertoolchallanpdf"}
    />
  ),
};

const productionNav = {
  [`Awaiting Approval From Store(${toolsCounts?.ProductionToStoreCount})`]: (
    <ToolProductionToStore
      query="externalReturnableChallan"
      downloadUrl={mainRoute + "/downloadproductiontoolchallanpdf"}
      canChange={isStoreKeeper}
    />
  ),
  [`Store  Pending(${toolsCounts?.StoreToProductionCount}) `]: (
    <ToolStoreToProduction
      query="externalReturnableChallan"
      canChange={production}
      downloadUrl={mainRoute + "/downloadproductiontoolchallanpdf"}
    />
  ),
};

const MechanicalNav = {
  [`Awaiting Approval From Store(${toolsCounts?.MechanicalToStoreCount})`]: (
    <ToolMechanicalToStore
      query="externalReturnableChallan"
      downloadUrl={mainRoute + "/downloadmechanicaltoolchallanpdf"}
      canChange={isStoreKeeper}
    />
  ),
  [`Store  Pending(${toolsCounts?.StoreToMechanicalCount})`]: (
    <ToolStoreToMechanical
      query="externalReturnableChallan"
      canChange={Mechanical}
      downloadUrl={mainRoute + "/downloadmechanicaltoolchallanpdf"}
    />
  ),
};

const adminNav = {
  [` In Rejected (${toolsCounts?.StoreToRejectedCount})`]: (
    <StoreToReject
      query="externalReturnableChallan"
      canChange={admin}
      downloadUrl={mainRoute + "/downloadrejectedtoolchallanpdf"}
    />
  ),
  [`Awaiting Approval From Engineer (${toolsCounts?.StoreToEnginnerCount}) `]:
    (
      <ToolStoreToEngineer
        query="externalReturnableChallan"
        canChange={isEngineer}
        downloadUrl={mainRoute + "/downloadengineertoolchallanpdf"}
      />
    ),
  [` Awaiting Approval From Production(${toolsCounts?.StoreToProductionCount})  `]:
    (
      <ToolStoreToProduction
        query="externalReturnableChallan"
        canChange={production}
        downloadUrl={mainRoute + "/downloadproductiontoolchallanpdf"}
      />
    ),
  [` Awaiting Approval From Mechanical(${toolsCounts?.StoreToMechanicalCount})  `]:
    (
      <ToolStoreToMechanical
        query="externalReturnableChallan"
        canChange={Mechanical}
        downloadUrl={mainRoute + "/downloadmechanicaltoolchallanpdf"}
      />
    ),
  [`Engineer  Pending(${toolsCounts?.EngineerToStoreCount}) `]: (
    <ToolEngineerToStore
      query="externalReturnableChallan"
      canChange={isStoreKeeper}
      downloadUrl={mainRoute + "/downloadengineertoolchallanpdf"}
    />
  ),
  [`Production  Pending(${toolsCounts?.ProductionToStoreCount})`]: (
    <ToolProductionToStore
      query="externalReturnableChallan"
      canChange={isStoreKeeper}
      downloadUrl={mainRoute + "/downloadproductiontoolchallanpdf"}
    />
  ),
  [`Mechanical  Pending(${toolsCounts?.MechanicalToStoreCount})`]: (
    <ToolMechanicalToStore
      query="externalReturnableChallan"
      canChange={isStoreKeeper}
      downloadUrl={mainRoute + "/downloadmechanicaltoolchallanpdf"}
    />
  ),
};
 const defaultNav = {};

  let currentSideBar;

  if (isEngineer) {
    currentSideBar = engineerNav;
  } else if (isStoreKeeper) {
    currentSideBar = storeNavbar;
  } else if (admin) {
    currentSideBar = adminNav;
  } else if (production) {
    currentSideBar = productionNav;
  } else if (Mechanical) {
    currentSideBar = MechanicalNav;
  } else {
    currentSideBar = defaultNav;
  }

  const [tab, setTab] = useState(Object.keys(currentSideBar)[0]);

  const handleTabChange = (tab) => {
    setTab(tab);
  };
  return (
    <div className="md:flex">
      <section className="left md:max-h-[75vh] overflow-x-scroll py-4 flex flex-wrap md:flex-col gap-2">
        {Object.keys(currentSideBar).map((btn) => {
          return (
            <NewButton
              key={btn}
              title={btn}
              tab={tab}
              func={() => handleTabChange(btn)}
            />
          );
        })}
      </section>
      <section className="md:w-full">{currentSideBar[tab]}</section>
    </div>
  );
};

export default Hold;

const NewButton = ({ title, tab, func }) => {
  return (
    <button
      onClick={func}
      className={`rounded-md flex-none w-full text-xl font-[600] text-gray-700 px-2 py-3 ${
        tab === title ? "bg-red-400 text-white" : "bg-gray-200"
      }`}>
      {title}
    </button>
  );
};
