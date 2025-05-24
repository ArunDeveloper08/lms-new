import  secureLocalStorage  from  "react-secure-storage";
const initialState = {
  selectedItem: "sim",
};

export const selectedItem = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_ITEM":
      secureLocalStorage.setItem("selectedItem", action.payload);
      return { ...state, selectedItem: action.payload };
    default:
      return state;
  }
};

const simCounts = {
  simCounts: {},
};
const toolsCounts = {
  toolsCounts: {},
};

export const totalCounts = (state = simCounts, action) => {
  switch (action.type) {
    case "GET_COUNTS":
      return { ...state, simCounts: action.payload };
    default:
      return state;
  }
};

export const toolsTotalCounts = (state = toolsCounts, action) => {
  switch (action.type) {
    case "GET_TOOLS_COUNTS":
      return { ...state, toolsCounts: action.payload };
    default:
      return state;
  }
};



// const initialStates = {
//   selectedTool: "",
// };

// export const selectedTool = (state = initialStates, action) => {
//   switch (action.type) {
//     case "SET_SELECTED_TOOL":
//       secureLocalStorage.setItem("selectedTool", action.payload);
//       return { ...state, selectedTool: action.payload };
//     default:
//       return state;
//   }
// };

// const ToolCounts = {
//   ToolCounts: {},
// };

// export const totalCount = (state = ToolCounts, action) => {
//   switch (action.type) {
//     case "GET_COUNT":
//       return { ...state, TotalCounts: action.payload };
//     default:
//       return state;
//   }
// };
