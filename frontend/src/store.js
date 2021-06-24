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
import {
  teamListReducer,
  matchListReducer,
  cosplayListReducer,
  cardListReducer
} from "./reducers/h55eventReducers";
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
import {
  gameListReducer,
  mentorListReducer,
  mentorDetailsReducer,
  mentorUpdateReducer,
  registerListReducer,
} from "./reducers/mentorReducers";

import { kolListReducer } from "./reducers/kolReducers";
import {
  channelListReducer,
  socialMediaListReducer,
  serviceCategoriesListReducer,
  channelCreateReducer,
  channelDetailsReducer,
  channelUpdateReducer,
  quoteItemsListReducer,
  quoteCreateReducer,
  quotesListReducer,
  quoteUpdateReducer,
  quoteDeleteReducer,
  channelTagsCreateReducer,
  tagsListReducer,
  socialDataCreateReducer,
  socialDataListReducer,
  socialDataUpdateReducer,
  socialDataDeleteReducer,
  pricingListReducer,
  channelDeleteReducer,
} from "./reducers/quotesReducers";

const reducer = combineReducers({
  cardList:cardListReducer,
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
  gameList: gameListReducer,
  registerList: registerListReducer,
  kolList: kolListReducer,
  mentorList: mentorListReducer,
  mentorDetails: mentorDetailsReducer,
  mentorUpdate: mentorUpdateReducer,
  cosplayList: cosplayListReducer,
  socialMedias: socialMediaListReducer,
  serviceCategories: serviceCategoriesListReducer,
  channelCreate: channelCreateReducer,
  channelList: channelListReducer,
  channelDetails: channelDetailsReducer,
  channelUpdate: channelUpdateReducer,
  quoteItemsList: quoteItemsListReducer,
  quoteCreate: quoteCreateReducer,
  quotesList: quotesListReducer,
  quoteUpdate: quoteUpdateReducer,
  quoteDelete: quoteDeleteReducer,
  channelTagsCreate: channelTagsCreateReducer,
  tagsList: tagsListReducer,
  socialDataCreate: socialDataCreateReducer,
  socialDataList: socialDataListReducer,
  socialDataUpdate: socialDataUpdateReducer,
  socialDataDelete: socialDataDeleteReducer,
  pricingList: pricingListReducer,
  channelDelete: channelDeleteReducer,
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
