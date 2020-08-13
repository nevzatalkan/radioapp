import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import globalReducer from "./global";

export default combineReducers({
  routing: routerReducer, 
  global: globalReducer
});
