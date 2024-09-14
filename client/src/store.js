import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { getReducer } from "./reducers/EmployeeReducer";


const middleware = [thunk];
const rootReducer = combineReducers({
  getData: getReducer
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
