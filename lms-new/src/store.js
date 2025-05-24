import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import {
  selectedItem as itemReducer,
  // selectedTool as toolReducer,
  totalCounts as totalReducer,
  toolsTotalCounts as toolsTotalReducer
  // totalCount as totalToolReducer,
} from "./redux/reducers";
const reducers = combineReducers({
  itemReducer,
  totalReducer,
  toolsTotalReducer
  // toolReducer,
  // totalToolReducer
});
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
