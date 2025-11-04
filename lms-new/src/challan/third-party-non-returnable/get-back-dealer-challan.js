// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import secureLocalStorage from "react-secure-storage";
// import qs from "query-string";

// /* --------------------------------------------------------------
//    1. CustomAutocomplete – now works with full objects
//    -------------------------------------------------------------- */
// const CustomAutocomplete = ({ options, value, onChange, label }) => {
//   const [input, setInput] = useState(value?.name ?? "");
//   const [open, setOpen] = useState(false);
//   const [filtered, setFiltered] = useState([]);

//   // sync when parent changes value
//   React.useEffect(() => setInput(value?.name ?? ""), [value]);

//   const filter = (txt) => {
//     if (!txt) return options;
//     return options.filter((o) =>
//       o.name.toLowerCase().includes(txt.toLowerCase())
//     );
//   };

//   const handleInput = (e) => {
//     const txt = e.target.value;
//     setInput(txt);
//     setFiltered(filter(txt));
//     setOpen(!!txt);
//     if (!txt) onChange(null);
//   };

//   const select = (opt) => {
//     setInput(opt.name);
//     onChange(opt);               // <-- full object to parent
//     setOpen(false);
//   };

//   const blur = () => setTimeout(() => setOpen(false), 150);

//   return (
//     <div className="relative w-72">
//       <input
//         type="text"
//         value={input}
//         onChange={handleInput}
//         onFocus={() => {
//           setFiltered(filter(input));
//           setOpen(true);
//         }}
//         onBlur={blur}
//         placeholder={label}
//         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//         aria-autocomplete="list"
//         role="combobox"
//         aria-expanded={open}
//       />
//       {open && filtered.length > 0 && (
//         <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
//           {filtered.map((opt) => (
//             <li
//               key={opt.ID}
//               onMouseDown={() => select(opt)}   // mouseDown prevents blur
//               className="p-2 cursor-pointer hover:bg-gray-100"
//               role="option"
//               aria-selected={value?.ID === opt.ID}
//             >
//               {opt.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// /* --------------------------------------------------------------
//    2. Main component
//    -------------------------------------------------------------- */
// const GetBackDealerChallan = () => {
//   const [engineerName, setEngineerName] = useState(null); // full object
//   const [data, setData] = useState([]);
//   const [engineerOptions, setEngineerOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedChallanNumbers, setSelectedChallanNumbers] = useState([]);
//   const [remark, setRemark] = useState("");

//   const stored = secureLocalStorage.getItem("info");
//   const userInfo = stored ? JSON.parse(stored).data : null;

//   /* ---------- fetch dealers ---------- */
//   useEffect(() => {
//     axios
//       .get(`${window.MyApiRoute}dealer/get`)
//       .then((res) => setEngineerOptions(res.data.details))
//       .catch((e) => console.error(e));
//   }, []);

//   /* ---------- search ---------- */
//   const searchChallan = useCallback(async () => {
//     if (!engineerName?.ID) return alert("Please select a dealer.");
//     setLoading(true);
//     setSelectedChallanNumbers([]);

//     const url = qs.stringifyUrl({
//       url: `${window.MyApiRoute}record/get`,
//       query: {
//         category: "3-phaseMeter",
//         issueToDealerId: engineerName.ID,
//         location: "getChallanDetails",
//         challanType: "thirdParty non-returnable challan",
//         month: selectedMonth,
//       },
//     });

//     try {
//       const { data: resp } = await axios.post(url, userInfo);
//       setData(resp.Data || []);
//     } catch (e) {
//       console.error(e);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [engineerName, selectedMonth, userInfo]);

//   /* ---------- months ---------- */
//   const allMonths = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December",
//   ];
//   const availableMonths = allMonths.slice(0, new Date().getMonth() + 1);

//   const toggle = (id) =>
//     setSelectedChallanNumbers((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );

//   const sendBack = async () => {
//     if (!selectedChallanNumbers.length) return alert("Select at least one challan");
//     if (!remark.trim()) return alert("Provide a remark");

//     setLoading(true);
//     const payload = {
//       ...userInfo,
//       remark,
//       action: "sendBackToStore",
//       challans: data
//         .filter((i) => selectedChallanNumbers.includes(i._id))
//         .map((c) => ({
//           challanId: c._id,
//           challanNumber: c.challanNumber,
//           products: c.Products.map((p) => ({
//             productId: p.id,
//             productSrNo: p.productSrNo,
//             productType: p.productType,
//           })),
//         })),
//     };

//     try {
//       const { data: res } = await axios.post(
//         `${window.MyApiRoute}record/sendBackToStore`,
//         payload
//       );
//       if (res.success) {
//         alert("Challans sent back!");
//         setRemark("");
//         setSelectedChallanNumbers([]);
//         searchChallan();
//       } else alert(res.message || "Failed");
//     } catch (e) {
//       console.error(e);
//       alert("Error sending challans");
//     } finally {
//       setLoading(false);
//     }
//   };


//   /* ---------- render ---------- */
//   return (
//     <section className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Get Back Dealer Challans</h2>

//       <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
//         <CustomAutocomplete
//           options={engineerOptions}
//           value={engineerName}
//           onChange={setEngineerName}
//           label="Select Dealer Name"
//         />

//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="w-48 h-10 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="">Select a month</option>
//           {availableMonths.map((m) => (
//             <option key={m} value={m}>{m}</option>
//           ))}
//         </select>

//         <p className="text-lg font-medium">No of Challans: {data.length}</p>

//         <button
//           onClick={searchChallan}
//           className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md"
//         >
//           Search
//         </button>
//       </div>

//       {loading && (
//         <div className="flex justify-center items-center p-8">
//           <svg className="animate-spin h-8 w-8 text-purple-600" viewBox="0 0 24 24">
//             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"/>
//             <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//           </svg>
//           <span className="ml-3 text-xl">Loading...</span>
//         </div>
//       )}

//       {!loading && data.length === 0 && (
//         <p className="text-center text-xl text-gray-500">No challans found.</p>
//       )}

//       {!loading && data.length > 0 && (
//         <div className="mt-8">
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <textarea
//               placeholder="Remark for return"
//               value={remark}
//               onChange={(e) => setRemark(e.target.value)}
//               className="flex-grow p-3 border rounded-md focus:ring-2 focus:ring-pink-500"
//               rows={2}
//             />
//             <button
//               onClick={sendBack}
//               disabled={!selectedChallanNumbers.length || loading}
//               className={`px-8 py-3 rounded-md text-white font-semibold
//                 ${selectedChallanNumbers.length && !loading
//                   ? "bg-pink-600 hover:bg-pink-700"
//                   : "bg-gray-400 cursor-not-allowed"}`}
//             >
//               Send Selected ({selectedChallanNumbers.length})
//             </button>
//           </div>

//           {data.map((item) => (
//             <div key={item._id} className="bg-white border rounded-lg shadow-sm p-4 mb-6">
//               <div className="flex justify-between items-center border-b pb-2 mb-2">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedChallanNumbers.includes(item._id)}
//                     onChange={() => toggle(item._id)}
//                     className="h-5 w-5 text-pink-600"
                  
//                   />
//                   <label className="font-bold text-lg">
//                     Challan No: {item.challanNumber}
//                   </label>
//                 </div>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold
//                     ${item.Status === "open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
//                 >
//                   {item.Status === "open" ? "Open" : "Closed"}
//                 </span>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-800 text-white">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-xs uppercase">Product</th>
//                       <th className="px-4 py-2 text-left text-xs uppercase">Serial No.</th>
//                       <th className="px-4 py-2 text-left text-xs uppercase">Dealer</th>
//                       <th className="px-4 py-2 text-left text-xs uppercase">Sent By Store</th>
//                       <th className="px-4 py-2 text-left text-xs uppercase">Accepted By Dealer</th>
//                       <th className="px-4 py-2 text-left text-xs uppercase">Activity Log</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {item.Products.map((p) => {
//                       const logs = p.ActivityLog ? JSON.parse(p.ActivityLog) : [];
//                       return (
//                         <tr key={p.id} className="hover:bg-gray-50">
//                           <td className="px-4 py-2 text-sm">{p.productType}</td>
//                           <td className="px-4 py-2 text-sm">{p.productSrNo}</td>
//                           <td className="px-4 py-2 text-sm">{p.issueToDealerName}</td>
//                           <td className="px-4 py-2 text-sm">{p.storeOutTime || "-"}</td>
//                           <td className="px-4 py-2 text-sm">{p.dealerInTime || "-"}</td>
//                           <td className="px-4 py-2 text-sm">
//                             {logs.length ? (
//                               <ul className="list-disc list-inside">
//                                 {logs.map((l, i) => (
//                                   <li key={i}><strong>{l.date}:</strong> {l.remark}</li>
//                                 ))}
//                               </ul>
//                             ) : "No activities"}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default GetBackDealerChallan;
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import qs from "query-string";

/* --------------------------------------------------------------
   1. CustomAutocomplete – unchanged
   -------------------------------------------------------------- */
const CustomAutocomplete = ({ options, value, onChange, label }) => {
  const [input, setInput] = useState(value?.name ?? "");
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);

  React.useEffect(() => setInput(value?.name ?? ""), [value]);

  const filter = (txt) => {
    if (!txt) return options;
    return options.filter((o) =>
      o.name.toLowerCase().includes(txt.toLowerCase())
    );
  };

  const handleInput = (e) => {
    const txt = e.target.value;
    setInput(txt);
    setFiltered(filter(txt));
    setOpen(!!txt);
    if (!txt) onChange(null);
  };

  const select = (opt) => {
    setInput(opt.name);
    onChange(opt);
    setOpen(false);
  };

  const blur = () => setTimeout(() => setOpen(false), 150);

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={input}
        onChange={handleInput}
        onFocus={() => {
          setFiltered(filter(input));
          setOpen(true);
        }}
        onBlur={blur}
        placeholder={label}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-autocomplete="list"
        role="combobox"
        aria-expanded={open}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {filtered.map((opt) => (
            <li
              key={opt.ID}
              onMouseDown={() => select(opt)}
              className="p-2 cursor-pointer hover:bg-gray-100"
              role="option"
              aria-selected={value?.ID === opt.ID}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* --------------------------------------------------------------
   2. Main Component – FULLY FIXED
   -------------------------------------------------------------- */
const GetBackDealerChallan = () => {
  const [engineerName, setEngineerName] = useState(null);
  const [data, setData] = useState([]);
  const [engineerOptions, setEngineerOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  
  // Only ONE challanNumber allowed
  const [selectedChallanNumber, setSelectedChallanNumber] = useState(null);
  
  const [remark, setRemark] = useState("");

  const stored = secureLocalStorage.getItem("info");
  const userInfo = stored ? JSON.parse(stored).data : null;

  /* ---------- fetch dealers ---------- */
  useEffect(() => {
    axios
      .get(`${window.MyApiRoute}dealer/get`)
      .then((res) => setEngineerOptions(res.data.details))
      .catch((e) => console.error(e));
  }, []);

  /* ---------- search ---------- */
  const searchChallan = useCallback(async () => {
    if (!engineerName?.ID) return alert("Please select a dealer.");
    setLoading(true);
    setSelectedChallanNumber(null); // Reset selection

    const url = qs.stringifyUrl({
      url: `${window.MyApiRoute}record/get`,
      query: {
        category: "3-phaseMeter",
        issueToDealerId: engineerName.ID,
        location: "getChallanDetails",
        challanType: "thirdParty non-returnable challan",
        month: selectedMonth,
      },
    });

    try {
      const { data: resp } = await axios.post(url, userInfo);
      setData(resp.Data || []);
    } catch (e) {
      console.error(e);
      setData ([]);
    } finally {
      setLoading(false);
    }
  }, [engineerName, selectedMonth, userInfo]);

  /* ---------- months ---------- */
  const allMonths = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const availableMonths = allMonths.slice(0, new Date().getMonth() + 1);

  /* ---------- SELECT ONLY ONE CHALLAN ---------- */
  const selectChallan = (challanNumber) => {
    setSelectedChallanNumber((prev) => (prev === challanNumber ? null : challanNumber));
  };

  /* ---------- SEND BACK ---------- */
  const sendBack = async () => {
    if (!selectedChallanNumber) return alert("Please select exactly one challan.");
    if (!remark.trim()) return alert("Provide a remark");

    setLoading(true);

    const selectedChallan = data.find((c) => c.challanNumber === selectedChallanNumber);
    if (!selectedChallan) {
      alert("Selected challan not found.");
      setLoading(false);
      return;
    }

    const payload = {
      ...userInfo,
      remark,
      action: "sendBackToStore",
      challans: [{
        challanId: selectedChallan._id,
        challanNumber: selectedChallan.challanNumber,
        products: selectedChallan.Products.map((p) => ({
          productId: p.id,
          productSrNo: p.productSrNo,
          productType: p.productType,
        })),
      }],
    };

    try {
      const { data: res } = await axios.post(
        `${window.MyApiRoute}record/sendBackToStore`,
        payload
      );
      if (res.success) {
        alert("Challan sent back successfully!");
        setRemark("");
        setSelectedChallanNumber(null);
        searchChallan();
      } else {
        alert(res.message || "Failed to send back");
      }
    } catch (e) {
      console.error(e);
      alert("Error sending challan");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Get Back Dealer Challans</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <CustomAutocomplete
          options={engineerOptions}
          value={engineerName}
          onChange={setEngineerName}
          label="Select Dealer Name"
        />

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-48 h-10 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select a month</option>
          {availableMonths.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <p className="text-lg font-medium">No of Challans: {data.length}</p>

        <button
          onClick={searchChallan}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center p-8">
          <svg className="animate-spin h-8 w-8 text-purple-600" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"/>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span className="ml-3 text-xl">Loading...</span>
        </div>
      )}

      {!loading && data.length === 0 && (
        <p className="text-center text-xl text-gray-500">No challans found.</p>
      )}

      {!loading && data.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <textarea
              placeholder="Remark for return"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="flex-grow p-3 border rounded-md focus:ring-2 focus:ring-pink-500"
              rows={2}
            />
            <button
              onClick={sendBack}
              disabled={!selectedChallanNumber || loading}
              className={`px-8 py-3 rounded-md text-white font-semibold
                ${selectedChallanNumber && !loading
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gray-400 cursor-not-allowed"}`}
            >
              Send Selected (1)
            </button>
          </div>

          {/* =============== MAIN MAP WITH UNIQUE CHALLAN NUMBER =============== */}
          {data.map((item) => {
            const checkboxId = `challan-${item.challanNumber}`;

            return (
              <div key={item.challanNumber} className="bg-white border rounded-lg shadow-sm p-4 mb-6">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={checkboxId}
                      checked={selectedChallanNumber === item.challanNumber}
                      onChange={() => selectChallan(item.challanNumber)}
                      className="h-5 w-5 text-pink-600"
                    />
                    <label
                      htmlFor={checkboxId}
                      className="font-bold text-lg cursor-pointer select-none"
                    >
                      Challan No: {item.challanNumber}
                    </label>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${item.Status === "open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {item.Status === "open" ? "Open" : "Closed"}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs uppercase">Product</th>
                        <th className="px-4 py-2 text-left text-xs uppercase">Serial No.</th>
                        <th className="px-4 py-2 text-left text-xs uppercase">Dealer</th>
                        <th className="px-4 py-2 text-left text-xs uppercase">Sent By Store</th>
                        <th className="px-4 py-2 text-left text-xs uppercase">Accepted By Dealer</th>
                        <th className="px-4 py-2 text-left text-xs uppercase">Activity Log</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {item.Products.map((p) => {
                        const logs = p.ActivityLog ? JSON.parse(p.ActivityLog) : [];
                        return (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm">{p.productType}</td>
                            <td className="px-4 py-2 text-sm">{p.productSrNo}</td>
                            <td className="px-4 py-2 text-sm">{p.issueToDealerName}</td>
                            <td className="px-4 py-2 text-sm">{p.storeOutTime || "-"}</td>
                            <td className="px-4 py-2 text-sm">{p.dealerInTime || "-"}</td>
                            <td className="px-4 py-2 text-sm">
                              {logs.length ? (
                                <ul className="list-disc list-inside">
                                  {logs.map((l, i) => (
                                    <li key={i}><strong>{l.date}:</strong> {l.remark}</li>
                                  ))}
                                </ul>
                              ) : "No activities"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
          {/* =============== END OF MAP =============== */}
        </div>
      )}
    </section>
  );
};

export default GetBackDealerChallan;