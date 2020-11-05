import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { teamListReducer, matchListReducer } from "./reducers/h55eventReducers";
import {
  roleListReducer,
  roleEditReducer,
  resourceListReducer,
  resourceDeleteReducer,
  resourceDetailsReducer,
  resourceUpdateReducer,
  resourceCreateReducer,
  rolePermissionsReducer,
} from "./reducers/manageReducers";

const reducer = combineReducers({
  teamList: teamListReducer,
  matchList: matchListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  roleList: roleListReducer,
  roleEdit: roleEditReducer,
  resourceList: resourceListReducer,
  resourceDelete: resourceDeleteReducer,
  resourceDetails: resourceDetailsReducer,
  resourceUpdate: resourceUpdateReducer,
  resourceCreate: resourceCreateReducer,
  rolePermissions: rolePermissionsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
