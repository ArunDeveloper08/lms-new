import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const selectItem = (data) => ({
  type: "SET_SELECTED_ITEM",
  payload: data,
});
export const getTotalCounts = (data) => ({
  type: "GET_COUNTS",
  payload: data,
});
export const getTotalTotalCounts = (data) => ({
  type: "GET_TOOLS_COUNTS",
  payload: data,
});

export const getTotalCountAsync = (selectedItem) => {
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  return (dispatch) => {
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=inStore`,
        {
          ...a.data,
        }
      )
      .then((res) => dispatch(getTotalCounts(res.data)))
      .catch((err) => alert("Error", err.message));
  };
};
export const getTotalToolsCountAsync = (toolID) => {
  const a = JSON.parse(secureLocalStorage?.getItem("info"));
  return (dispatch) => {
    axios
      .post(
        window.MyApiRoute +
          `tool/getallcount?ToolID=${toolID}&Employee_Id=${a?.data.Employee_Id}`,
        {
          ...a.data,
        }
      )
      .then((res) => {
        dispatch(getTotalTotalCounts(res.data));
      })
      .catch((err) => alert("Error", err.message));
  };
};

// export const selectTool = (data) => ({
//   type: "SET_SELECTED_TOOL",
//   payload: data,
// });
// export const getTotalCount = (data) => ({
//   type: "GET_COUNT",
//   payload: data,
// });

// export const getTotalCountsTool = (selectedItem) => {
//   const a = JSON.parse(secureLocalStorage.getItem("info"));
//   return (dispatch) => {
//     axios
//       .post(
//         window.MyApiRoute +
//           `record/get?category=${selectedItem}&location=inStore`,
//         {
//           ...a.data,
//         }
//       )
//       .then((res) => dispatch(getTotalCounts(res.data)))
//       .catch((err) => alert("Error", err.message));
//   };
// };
