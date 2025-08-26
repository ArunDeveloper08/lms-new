// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import Login from "./components/login";
// import Main from "./components/Main";
// import Add from "./components/Add";
// import SingleView from "./components/SingleView";
// import Error from "./components/Error";
// import Edit from "./components/Edit";
// import Download from "./CSR/Download";
// import AddPeople from "./components/AddPeople";
// import AddWork from "./components/AddWork";
// import CsrList from "./CSR/MrrList";
// import ViewSim from "./components/Sim/ViewSim";
// import AddSim from "./components/Sim/store/NewSim";
// import Store from "./components/Sim/Store";
// import Production from "./components/Sim/production/Production";
// import InstallSim from "./components/Sim/InstallSim";
// import ViewEmployee from "./components/ViewEmployee";
// import MrrTab from "./CSR/MrrTab";
// import Details from "./components/Details";
// import CsrDownload from "./CSR/CsrDownload";
// import Activity from "./components/Activity";
// import ViewWorkTab from "./components/ViewWorkTab";
// import CsrTab from "./CSR/CsrTab";
// import CsrEdit from "./CSR/CsrEdit.js";
// import MrrEdit from "./CSR/MrrEdit";
// import MeterEdit from "./components/Sim/MeterEdit";
// import { useDispatch } from "react-redux";
// import { selectItem } from "./redux/actions";
// import InstallOtherProduct from "./components/InstallOtherProduct";
// import ReturnOtherProduct from "./components/ReturnOtherProduct";
// import MainModal from "./products/companyStore/MainModal";
// import DownloadChallanPdf from "./products/OnHold/DownloadChallanPdf";
// import Dealer from "./dealer/Dealer";
// import DealerForm from "./dealer/DealerForm";
// import DealerEditForm from "./dealer/DealerEditForm";
// import DealerInStore from "./dealer/DealerInStore";
// import ChallanDetail from "./components/ChallanDetail/ChallanDetail";
// import DownloadProductionChallanPdf from "./products/OnHold/DownloadProductionChallanPdf";
// import EngineerChallan from "./products/OnHold/EngineerChallanPdf";
// import DealerChallanPdf from "./dealer/DealerChallanPdf";
// // import EngineerReturnProduct from "./components/EngineerReturnProduct";
// import EngineerReturnProductSee from "./components/EngineerReturnProductSee";
// import secureLocalStorage from "react-secure-storage";
// import POTable from "./dealer/POTable";
// import POForm from "./dealer/POForm";
// import EditPO from "./dealer/EditPO.js";
// import SendProductDealer from "./dealer/SendProductDealer.js";
// import UnderProcess from "./products/underProcess/UnderProcess.js";
// import Tools from "./components/Tools/Tools.js";
// import EngChallanTable from "./components/ChallanDetail/eng-challan-table.js";
// import LandinPage from "./components/Tools/LandinPage.js";
// import DataProvider from "./components/Tools/context/DataProvider.js";
// import ThirdPartyChallan from "./products/OnHold/ThirdPartyChallan.js";

// import EngineerReturnableChallanPage from "./challan/engineer-returnable/engineer-page.js";
// import ProductionNonReturnableChallanPage from "./challan/production-non-returnable/production-page.js";
// import ProductionReturnableChallanPage from "./challan/production-returnable/production-page.js";
// import ThirdPartyReturnableChallanPage from "./challan/third-party-returnable/third-party-page.js";
// import ThirdPartyNonReturnableChallanPage from "./challan/third-party-non-returnable/third-party-page.js";
// import SelectChallantype from "./challan/select-challan-type.js";

// import ThirdPartyCreateChallan from "./challan/third-party-returnable/create-challan.js";
// import ThirdPartyInitiateByStore from "./challan/third-party-returnable/initiate-by-store.js";
// import ThirdPartyInitiateByDealer from "./challan/third-party-returnable/initiate-by-dealer.js";
// import ThirdPartyChallanHistory from "./challan/third-party-returnable/challan-history.js";

// import EngineerCreateChallan from "./challan/engineer-returnable/create-challan.js";
// import EngineerInitiateByStore from "./challan/engineer-returnable/initiate-by-store.js";
// import EngineerInitiateByDealer from "./challan/engineer-returnable/initiate-by-engineer.js";
// import EngineerChallanHistory from "./challan/engineer-returnable/challan-history.js";
// // import InitiateByStore from "./challan/third-party-non-returnable/initiate-by-store.js";
// // import InitiateByDealer from "./challan/third-party-non-returnable/initiate-by-dealer.js";

// import ThirdPartyNonCreateChallan from "./challan/third-party-non-returnable/create-challan.js";
// import ThirdPartyNonChallanHistory from "./challan/third-party-non-returnable/challan-history.js";
// import ThirdPartyNonChallan from "./products/OnHold/Third-party-non-return.js";
// // import { useEffect } from "react";
// import ViewEngineerChallanPage from "./challan/view-engineer-challan/view-engineer-page.js";
// import InitiateByMe from "./challan/view-engineer-challan/Initiate-By-Me.js";
// import InitiateBy from "./challan/view-engineer-challan/initiate-by-store.js";
// import AllChallan from "./challan/view-engineer-challan/AllChallan.js";
// import EngineerToolChallanPdf from "./components/Tools/ToolChallan/EngineerToolChallan.js";
// import ProductionToolChallanPdf from "./components/Tools/ToolChallan/ProductionToolChallan.js";
// import MechanicalToolChallanPdf from "./components/Tools/ToolChallan/MechanicalToolChallan.js";
// import RejectedToolChallanPdf from "./components/Tools/ToolChallan/RecjectedToolChallanPdf.js";
// import AddProductOnDealer from "./challan/third-party-returnable/add-product-on-dealer.js";
// import CreateChallanByDealer from "./challan/third-party-returnable/create-challan-by-dealer-components/view-all-challan.js";
// import CeoSop from "./components/sop/CeoSop.js";
// import ProductCeoSop from "./components/sop/ProductSop.js";
// import POChallan from "./dealer/POChallan.js";
// import AllThirdPartyChallan from "./challan/AllThirdPartyChallan.js";
// import ExchangeProduct from "./products/companyStore/ExchangeProduct.js";

// import EngineerReturnableNewChallanPage from "./challan/engineer/engineer-page.js";
// import EngineerNewCreateChallan from "./challan/engineer/create-challan/create-challan.js";
// import EngineerNewAcceptProduct from "./challan/engineer/accept-product/accept-product.js";
// import EngineerNewChallanHistory from "./challan/engineer/challan-history.js";
// import Consumables from "./components/consumables/page.js";
// import CreateEngineerToolChallan from "./components/Tools/CreateEngineerToolChallan.js";

// export const mainRoute = "erp";

// function App() {
//   const data = secureLocalStorage.getItem("selectedItem");
//   // console.log(data);

//   const dispatch = useDispatch();

//   if (data) {
//     dispatch(selectItem(data));
//   }

//   // window.MyApiRoute = "http://192.168.1.162:4000/";
//   //   window.MyApiRoute = "http://192.168.1.13:4000/";

//   window.MyApiRoute = "http://www.pesonline12.in/meterinstallation/";
//   return (
//     <>
//       <Details />
//       <DataProvider>
//         <Routes>
//           <Route exact path={`${mainRoute}` + "/"} element={<Login />} />
//           <Route exact path="/home" element={<Main />} />
//           <Route exact path="/sop" element={<CeoSop />} />
//           <Route exact path="/productsop" element={<ProductCeoSop />} />
//           <Route exact path="/edit" element={<Edit />} />
//           <Route exact path="/add" element={<Add />} />
//           <Route exact path="/view" element={<ViewWorkTab />} />
//           <Route exact path="/viewemployee" element={<ViewEmployee />} />
//           <Route exact path="/csrlist" element={<CsrList />} />
//           <Route exact path="/single" element={<SingleView />} />
//           <Route exact path="/addWork" element={<AddWork />} />
//           <Route exact path="/addpeople" element={<AddPeople />} />
//           <Route exact path="/csr" element={<MrrTab />} />
//           <Route exact path="/MrrEdit" element={<MrrEdit />} />
//           <Route exact path="/csrform" element={<CsrTab />} />
//           <Route exact path="/csrEdit" element={<CsrEdit />} />
//           <Route exact path="/csrdownload" element={<Download />} />
//           <Route exact path="/csrformdownload" element={<CsrDownload />} />
//           <Route exact path="/viewsim" element={<ViewSim />} />
//           <Route exact path="/addsim" element={<AddSim />} />
//           <Route exact path="/store" element={<Store />} />
//           <Route exact path="/production" element={<Production />} />
//           <Route exact path="/installsim" element={<InstallSim />} />
//           <Route exact path="/underprocess" element={<UnderProcess />} />
//           <Route exact path="/otherproduct" element={<ReturnOtherProduct />} />
//           <Route exact path="/main" element={<MainModal />} />
//           <Route exact path="/tools" element={<Tools />} />
//           <Route exact path="/landingpage" element={<LandinPage />} />
//           <Route exact path="/pochallan/:dealerid" element={<POChallan />} />
//           <Route
//             exact
//             path="/allthirdpartychallan"
//             element={<AllThirdPartyChallan />}
//           />
//           <Route
//             exact
//             path="/downloadchallanpdf/:challanNumber"
//             element={<DownloadChallanPdf />}
//           />
//           <Route
//             exact
//             path="/downloadproductionchallanpdf/:challanNumber"
//             element={<DownloadProductionChallanPdf />}
//           />
//           <Route
//             exact
//             path="/downloadDealerchallanpdf/:challanNumber"
//             element={<DealerChallanPdf />}
//           />
//           <Route
//             exact
//             path="/installOtherProduct"
//             element={<InstallOtherProduct />}
//           />

//           <Route
//             exact
//             path="/engineerreturnproductsee"
//             element={<EngineerReturnProductSee />}
//           />

//           <Route exact path="/activity" element={<Activity />} />

//           <Route exact path="/meteredit" element={<MeterEdit />} />
//           <Route exact path="/dealer" element={<Dealer />} />
//           <Route exact path="/Consumables" element={<Consumables />} />
//           <Route exact path="/dealerform" element={<DealerForm />} />
//           <Route exact path="/dealeredit" element={<DealerEditForm />} />
//           <Route exact path="/dealerinstore" element={<DealerInStore />} />
//           <Route exact path="/challanhistory" element={<ChallanDetail />} />
//           <Route exact path="/po-table/:dealerid" element={<POTable />} />
//           <Route exact path="/po-form" element={<POForm />} />
//           <Route exact path="/editpo" element={<EditPO />} />
//           <Route exact path="/exchangeproduct" element={<ExchangeProduct />} />
//           <Route
//             exact
//             path="/sendproductdealer"
//             element={<SendProductDealer />}
//           />
//           <Route
//             exact
//             path="/downloadengineerchallanpdf/:challanNumber"
//             element={<EngineerChallan />}
//           />
//           <Route
//             exact
//             path="/thirdpartychallanpdf/:challanNumber"
//             element={<ThirdPartyChallan />}
//           />
//           <Route
//             exact
//             path="/thirdpartychallan-non-return/:challanNumber"
//             element={<ThirdPartyNonChallan />}
//           />
//           <Route
//             exact
//             path="/engineerreturnproduct"
//             element={<EngChallanTable />}
//           />
//           <Route exact path="/challan" element={<SelectChallantype />}>
//             <Route
//               exact
//               path="engineer-returnable"
//               element={<EngineerReturnableChallanPage />}>
//               <Route
//                 index
//                 path="create-challan"
//                 element={<EngineerCreateChallan />}
//               />
//               <Route
//                 exact
//                 path="initiate-by-store"
//                 element={<EngineerInitiateByStore />}
//               />
//               <Route
//                 exact
//                 path="initiate-by-engineer"
//                 element={<EngineerInitiateByDealer />}
//               />
//               <Route
//                 exact
//                 path="challan-history"
//                 element={<EngineerChallanHistory />}
//               />
//             </Route>
//             <Route
//               exact
//               path="engineer"
//               element={<EngineerReturnableNewChallanPage />}>
//               <Route
//                 index
//                 path="create-challan"
//                 element={<EngineerNewCreateChallan />}
//               />
//               <Route
//                 exact
//                 path="accept-products"
//                 element={<EngineerNewAcceptProduct />}
//               />
//               <Route
//                 exact
//                 path="challan-history"
//                 element={<EngineerNewChallanHistory />}
//               />
//             </Route>
//             <Route
//               exact
//               path="production-non-returnable-challan"
//               element={<ProductionNonReturnableChallanPage />}></Route>
//             <Route
//               exact
//               path="production-returnable-challan"
//               element={<ProductionReturnableChallanPage />}></Route>
//             {/*
//                    <Route
//                    exact
//                    path="third-party-returnable"
//                    element={<ThirdPartyReturnableChallanPage />}
//                    >
//                    <Route
//                        index
//                        path="create-challan"
//                        element={<ThirdPartyCreateChallan />}
//                    />
//                    <Route
//                        exact
//                        path="initiate-by-store"
//                        element={<ThirdPartyInitiateByStore />}
//                    />
//                    <Route
//                        exact
//                        path="initiate-by-dealer"
//                        element={<ThirdPartyInitiateByDealer />}
//                    />
//                    <Route
//                        exact
//                        path="challan-history"
//                        element={<ThirdPartyChallanHistory />}
//                    />
//                    </Route>
//               */}
//             <Route
//               exact
//               path="third-party-returnable"
//               element={<ThirdPartyReturnableChallanPage />}>
//               <Route
//                 index
//                 path="create-challan"
//                 element={<ThirdPartyCreateChallan />}
//               />
//               <Route
//                 index
//                 path="add-product-onsite"
//                 element={<AddProductOnDealer />}
//               />
//               <Route
//                 index
//                 path="create-challan-by-dealer"
//                 element={<CreateChallanByDealer />}
//               />
//               <Route
//                 exact
//                 path="initiate-by-store"
//                 element={<ThirdPartyInitiateByStore />}
//               />
//               <Route
//                 exact
//                 path="initiate-by-dealer"
//                 element={<ThirdPartyInitiateByDealer />}
//               />
//               <Route
//                 exact
//                 path="challan-history"
//                 element={<ThirdPartyChallanHistory />}
//               />
//             </Route>
//             <Route
//               exact
//               path="third-party-non-returnable"
//               element={<ThirdPartyNonReturnableChallanPage />}>
//               <Route
//                 index
//                 path="create-challan"
//                 element={<ThirdPartyNonCreateChallan />}
//               />
//               <Route
//                 exact
//                 path="challan-history"
//                 element={<ThirdPartyNonChallanHistory />}
//               />
//             </Route>
//           </Route>

//           <Route
//             exact
//             path="/view-engineer-challan"
//             element={<ViewEngineerChallanPage />}>
//             <Route path="" element={<InitiateByMe />} />
//             <Route path="initiate-by-store" element={<InitiateBy />} />
//             <Route path="challan-history" element={<AllChallan />} />
//           </Route>

//           <Route
//             path="/downloadengineertoolchallanpdf/:challanNumber"
//             element={<EngineerToolChallanPdf />}
//           />
//           <Route
//             path="/createengineertoolchallan"
//             element={<CreateEngineerToolChallan />}
//           />
//           <Route
//             path="/downloadproductiontoolchallanpdf/:challanNumber"
//             element={<ProductionToolChallanPdf />}
//           />
//           <Route
//             path="/downloadmechanicaltoolchallanpdf/:challanNumber"
//             element={<MechanicalToolChallanPdf />}
//           />
//           <Route
//             path="/downloadrejectedtoolchallanpdf/:challanNumber"
//             element={<RejectedToolChallanPdf />}
//           />

//           <Route exact path="*" element={<Error />} />
//         </Routes>
//       </DataProvider>
//     </>
//   );
// }

// export default App;
import "./App.css";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/Main";
import Add from "./components/Add";
import SingleView from "./components/SingleView";
import Error from "./components/Error";
import Edit from "./components/Edit";
import Download from "./CSR/Download";
import AddPeople from "./components/AddPeople";
import AddWork from "./components/AddWork";
import CsrList from "./CSR/MrrList";
import ViewSim from "./components/Sim/ViewSim";
import AddSim from "./components/Sim/store/NewSim";
import Store from "./components/Sim/Store";
import Production from "./components/Sim/production/Production";
import InstallSim from "./components/Sim/InstallSim";
import ViewEmployee from "./components/ViewEmployee";
import MrrTab from "./CSR/MrrTab";
import Details from "./components/Details";
import CsrDownload from "./CSR/CsrDownload";
import Activity from "./components/Activity";
import ViewWorkTab from "./components/ViewWorkTab";
import CsrTab from "./CSR/CsrTab";
import CsrEdit from "./CSR/CsrEdit.js";
import MrrEdit from "./CSR/MrrEdit";
import MeterEdit from "./components/Sim/MeterEdit";
import { useDispatch } from "react-redux";
import { selectItem } from "./redux/actions";
import InstallOtherProduct from "./components/InstallOtherProduct";
import ReturnOtherProduct from "./components/ReturnOtherProduct";
import MainModal from "./products/companyStore/MainModal";
import DownloadChallanPdf from "./products/OnHold/DownloadChallanPdf";
import Dealer from "./dealer/Dealer";
import DealerForm from "./dealer/DealerForm";
import DealerEditForm from "./dealer/DealerEditForm";
import DealerInStore from "./dealer/DealerInStore";
import ChallanDetail from "./components/ChallanDetail/ChallanDetail";
import DownloadProductionChallanPdf from "./products/OnHold/DownloadProductionChallanPdf";
import EngineerChallan from "./products/OnHold/EngineerChallanPdf";
import DealerChallanPdf from "./dealer/DealerChallanPdf";
import EngineerReturnProductSee from "./components/EngineerReturnProductSee";
import secureLocalStorage from "react-secure-storage";
import POTable from "./dealer/POTable";
import POForm from "./dealer/POForm";
import EditPO from "./dealer/EditPO.js";
import SendProductDealer from "./dealer/SendProductDealer.js";
import UnderProcess from "./products/underProcess/UnderProcess.js";
import Tools from "./components/Tools/Tools.js";
import EngChallanTable from "./components/ChallanDetail/eng-challan-table.js";
import LandinPage from "./components/Tools/LandinPage.js";
import DataProvider from "./components/Tools/context/DataProvider.js";
import ThirdPartyChallan from "./products/OnHold/ThirdPartyChallan.js";
import EngineerReturnableChallanPage from "./challan/engineer-returnable/engineer-page.js";
import ProductionNonReturnableChallanPage from "./challan/production-non-returnable/production-page.js";
import ProductionReturnableChallanPage from "./challan/production-returnable/production-page.js";
import ThirdPartyReturnableChallanPage from "./challan/third-party-returnable/third-party-page.js";
import ThirdPartyNonReturnableChallanPage from "./challan/third-party-non-returnable/third-party-page.js";
import SelectChallantype from "./challan/select-challan-type.js";
import ThirdPartyCreateChallan from "./challan/third-party-returnable/create-challan.js";
import ThirdPartyInitiateByStore from "./challan/third-party-returnable/initiate-by-store.js";
import ThirdPartyInitiateByDealer from "./challan/third-party-returnable/initiate-by-dealer.js";
import ThirdPartyChallanHistory from "./challan/third-party-returnable/challan-history.js";
import EngineerCreateChallan from "./challan/engineer-returnable/create-challan.js";
import EngineerInitiateByStore from "./challan/engineer-returnable/initiate-by-store.js";
import EngineerInitiateByDealer from "./challan/engineer-returnable/initiate-by-engineer.js";
import EngineerChallanHistory from "./challan/engineer-returnable/challan-history.js";
import ThirdPartyNonCreateChallan from "./challan/third-party-non-returnable/create-challan.js";
import ThirdPartyNonChallanHistory from "./challan/third-party-non-returnable/challan-history.js";
import ThirdPartyNonChallan from "./products/OnHold/Third-party-non-return.js";
import ViewEngineerChallanPage from "./challan/view-engineer-challan/view-engineer-page.js";
import InitiateByMe from "./challan/view-engineer-challan/Initiate-By-Me.js";
import InitiateBy from "./challan/view-engineer-challan/initiate-by-store.js";
import AllChallan from "./challan/view-engineer-challan/AllChallan.js";
import EngineerToolChallanPdf from "./components/Tools/ToolChallan/EngineerToolChallan.js";
import ProductionToolChallanPdf from "./components/Tools/ToolChallan/ProductionToolChallan.js";
import MechanicalToolChallanPdf from "./components/Tools/ToolChallan/MechanicalToolChallan.js";
import RejectedToolChallanPdf from "./components/Tools/ToolChallan/RecjectedToolChallanPdf.js";
import AddProductOnDealer from "./challan/third-party-returnable/add-product-on-dealer.js";
import CreateChallanByDealer from "./challan/third-party-returnable/create-challan-by-dealer-components/view-all-challan.js";
import CeoSop from "./components/sop/CeoSop.js";
import ProductCeoSop from "./components/sop/ProductSop.js";
import POChallan from "./dealer/POChallan.js";
import AllThirdPartyChallan from "./challan/AllThirdPartyChallan.js";
import ExchangeProduct from "./products/companyStore/ExchangeProduct.js";
import EngineerReturnableNewChallanPage from "./challan/engineer/engineer-page.js";
import EngineerNewCreateChallan from "./challan/engineer/create-challan/create-challan.js";
import EngineerNewAcceptProduct from "./challan/engineer/accept-product/accept-product.js";
import EngineerNewChallanHistory from "./challan/engineer/challan-history.js";
import Consumables from "./components/consumables/page.js";
import CreateEngineerToolChallan from "./components/Tools/CreateEngineerToolChallan.js";
import { useEffect } from "react";

export const mainRoute = "/erp";

function App() {
  const data = secureLocalStorage.getItem("selectedItem");
  
  const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

  if (data) {
    dispatch(selectItem(data));
  }

  window.MyApiRoute = "https://www.pesonline12.in/meterinstallation/";

 

  useEffect(() => {
    const userInfo = JSON.parse(secureLocalStorage.getItem("info"))?.data;
    if (userInfo && location.pathname === `${mainRoute}/`) {
      navigate(`${mainRoute}/home`, { replace: true });
    }
    console.log("hii")
  }, [location , navigate]);


// useEffect(() => {
//   const info = secureLocalStorage.getItem("info");
//   const isLoggedIn = document.cookie.includes("logged_in=true");

//   const userInfo = info ? JSON.parse(info)?.data : null;

//   const onLoginPage = location.pathname === `${mainRoute}/`;
//   const onHomePage = location.pathname.startsWith(`${mainRoute}/home`);

//   if (isLoggedIn && userInfo && onLoginPage) {
//     // ✅ If logged in and on login page, go to home
//     navigate(`${mainRoute}/home`, { replace: true });
//   } else if ((!isLoggedIn || !userInfo) && onHomePage) {
//     // 🚫 If not logged in but trying to access home, go to login
//     navigate(`${mainRoute}/`, { replace: true });
//   }
// }, [location, navigate]);

//  useEffect(() => {
//     const info = localStorage.getItem('info');
//     const isLoggedIn = document.cookie.includes('logged_in=true');
//     const userInfo = info ? JSON.parse(info)?.data : null;

//     const onLoginPage = location.pathname === `${mainRoute}/`;
//     const onHomePage = location.pathname.startsWith(`${mainRoute}/home`);

//     if (isLoggedIn && userInfo && onLoginPage) {
//       navigate(`${mainRoute}/home`, { replace: true });
//     } else if ((!isLoggedIn || !userInfo) && onHomePage) {
//       navigate(`${mainRoute}/`, { replace: true });
//     }
//   }, [location, navigate]);



  return (
    <>
      <Details />
      <DataProvider>
        <Routes>
          <Route exact path={`${mainRoute}/`} element={<Login />} />
          <Route exact path={`${mainRoute}/home`} element={<Main />} />
          <Route exact path={`${mainRoute}/sop`} element={<CeoSop />} />
          <Route exact path={`${mainRoute}/productsop`} element={<ProductCeoSop />} />
          <Route exact path={`${mainRoute}/edit`} element={<Edit />} />
          <Route exact path={`${mainRoute}/add`} element={<Add />} />
          <Route exact path={`${mainRoute}/view`} element={<ViewWorkTab />} />
          <Route exact path={`${mainRoute}/viewemployee`} element={<ViewEmployee />} />
          <Route exact path={`${mainRoute}/csrlist`} element={<CsrList />} />
          <Route exact path={`${mainRoute}/single`} element={<SingleView />} />
          <Route exact path={`${mainRoute}/addWork`} element={<AddWork />} />
          <Route exact path={`${mainRoute}/addpeople`} element={<AddPeople />} />
          <Route exact path={`${mainRoute}/csr`} element={<MrrTab />} />
          <Route exact path={`${mainRoute}/MrrEdit`} element={<MrrEdit />} />
          <Route exact path={`${mainRoute}/csrform`} element={<CsrTab />} />
          <Route exact path={`${mainRoute}/csrEdit`} element={<CsrEdit />} />
          <Route exact path={`${mainRoute}/csrdownload`} element={<Download />} />
          <Route exact path={`${mainRoute}/csrformdownload`} element={<CsrDownload />} />
          <Route exact path={`${mainRoute}/viewsim`} element={<ViewSim />} />
          <Route exact path={`${mainRoute}/addsim`} element={<AddSim />} />
          <Route exact path={`${mainRoute}/store`} element={<Store />} />
          <Route exact path={`${mainRoute}/production`} element={<Production />} />
          <Route exact path={`${mainRoute}/installsim`} element={<InstallSim />} />
          <Route exact path={`${mainRoute}/underprocess`} element={<UnderProcess />} />
          <Route exact path={`${mainRoute}/otherproduct`} element={<ReturnOtherProduct />} />
          <Route exact path={`${mainRoute}/main`} element={<MainModal />} />
          <Route exact path={`${mainRoute}/tools`} element={<Tools />} />
          <Route exact path={`${mainRoute}/landingpage`} element={<LandinPage />} />
          <Route exact path={`${mainRoute}/pochallan/:dealerid`} element={<POChallan />} />
          <Route exact path={`${mainRoute}/allthirdpartychallan`} element={<AllThirdPartyChallan />} />
          <Route exact path={`${mainRoute}/downloadchallanpdf/:challanNumber`} element={<DownloadChallanPdf />} />
          <Route exact path={`${mainRoute}/downloadproductionchallanpdf/:challanNumber`} element={<DownloadProductionChallanPdf />} />
          <Route exact path={`${mainRoute}/downloadDealerchallanpdf/:challanNumber`} element={<DealerChallanPdf />} />
          <Route exact path={`${mainRoute}/installOtherProduct`} element={<InstallOtherProduct />} />
          <Route exact path={`${mainRoute}/engineerreturnproductsee`} element={<EngineerReturnProductSee />} />
          <Route exact path={`${mainRoute}/activity`} element={<Activity />} />
          <Route exact path={`${mainRoute}/meteredit`} element={<MeterEdit />} />
          <Route exact path={`${mainRoute}/dealer`} element={<Dealer />} />
          <Route exact path={`${mainRoute}/Consumables`} element={<Consumables />} />
          <Route exact path={`${mainRoute}/dealerform`} element={<DealerForm />} />
          <Route exact path={`${mainRoute}/dealeredit`} element={<DealerEditForm />} />
          <Route exact path={`${mainRoute}/dealerinstore`} element={<DealerInStore />} />
          <Route exact path={`${mainRoute}/challanhistory`} element={<ChallanDetail />} />
          <Route exact path={`${mainRoute}/po-table/:dealerid`} element={<POTable />} />
          <Route exact path={`${mainRoute}/po-form`} element={<POForm />} />
          <Route exact path={`${mainRoute}/editpo`} element={<EditPO />} />
          <Route exact path={`${mainRoute}/exchangeproduct`} element={<ExchangeProduct />} />
          <Route exact path={`${mainRoute}/sendproductdealer`} element={<SendProductDealer />} />
          <Route exact path={`${mainRoute}/downloadengineerchallanpdf/:challanNumber`} element={<EngineerChallan />} />
          <Route exact path={`${mainRoute}/thirdpartychallanpdf/:challanNumber`} element={<ThirdPartyChallan />} />
          <Route exact path={`${mainRoute}/thirdpartychallan-non-return/:challanNumber`} element={<ThirdPartyNonChallan />} />
          <Route exact path={`${mainRoute}/engineerreturnproduct`} element={<EngChallanTable />} />
          <Route exact path={`${mainRoute}/challan`} element={<SelectChallantype />}>
            <Route exact path="engineer-returnable" element={<EngineerReturnableChallanPage />}>
              <Route index path="create-challan" element={<EngineerCreateChallan />} />
              <Route exact path="initiate-by-store" element={<EngineerInitiateByStore />} />
              <Route exact path="initiate-by-engineer" element={<EngineerInitiateByDealer />} />
              <Route exact path="challan-history" element={<EngineerChallanHistory />} />
            </Route>
            <Route exact path="engineer" element={<EngineerReturnableNewChallanPage />}>
              <Route index path="create-challan" element={<EngineerNewCreateChallan />} />
              <Route exact path="accept-products" element={<EngineerNewAcceptProduct />} />
              <Route exact path="challan-history" element={<EngineerNewChallanHistory />} />
            </Route>
            <Route exact path="production-non-returnable-challan" element={<ProductionNonReturnableChallanPage />} />
            <Route exact path="production-returnable-challan" element={<ProductionReturnableChallanPage />} />
            <Route exact path="third-party-returnable" element={<ThirdPartyReturnableChallanPage />}>
              <Route index path="create-challan" element={<ThirdPartyCreateChallan />} />
              <Route index path="add-product-onsite" element={<AddProductOnDealer />} />
              <Route index path="create-challan-by-dealer" element={<CreateChallanByDealer />} />
              <Route exact path="initiate-by-store" element={<ThirdPartyInitiateByStore />} />
              <Route exact path="initiate-by-dealer" element={<ThirdPartyInitiateByDealer />} />
              <Route exact path="challan-history" element={<ThirdPartyChallanHistory />} />
            </Route>
            <Route exact path="third-party-non-returnable" element={<ThirdPartyNonReturnableChallanPage />}>
              <Route index path="create-challan" element={<ThirdPartyNonCreateChallan />} />
              <Route exact path="challan-history" element={<ThirdPartyNonChallanHistory />} />
            </Route>
          </Route>
          <Route exact path={`${mainRoute}/view-engineer-challan`} element={<ViewEngineerChallanPage />}>
            <Route path="" element={<InitiateByMe />} />
            <Route path="initiate-by-store" element={<InitiateBy />} />
            <Route path="challan-history" element={<AllChallan />} />
          </Route>
          <Route exact path={`${mainRoute}/downloadengineertoolchallanpdf/:challanNumber`} element={<EngineerToolChallanPdf />} />
          <Route exact path={`${mainRoute}/createengineertoolchallan`} element={<CreateEngineerToolChallan />} />
          <Route exact path={`${mainRoute}/downloadproductiontoolchallanpdf/:challanNumber`} element={<ProductionToolChallanPdf />} />
          <Route exact path={`${mainRoute}/downloadmechanicaltoolchallanpdf/:challanNumber`} element={<MechanicalToolChallanPdf />} />
          <Route exact path={`${mainRoute}/downloadrejectedtoolchallanpdf/:challanNumber`} element={<RejectedToolChallanPdf />} />
          <Route exact path={`${mainRoute}/*`} element={<Error />} />
        </Routes>
      </DataProvider>
    </>
  );
}

export default App;