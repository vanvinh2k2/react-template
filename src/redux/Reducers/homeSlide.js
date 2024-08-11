// import initialState from "./initialState"
// import TypeAction from "../../constants/index"

// export const home = (state=initialState.login, action) => {
//     console.log(action)
//     switch(action.type){
//         case TypeAction.LOGIN:
//             return {
//                 ...state,
//                 login: action.payload,
//             }
//         default:
//             return state;
//     }
// }

import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState.login,
  reducers: {
    login: (state, action) => {
      console.log(action, "ok")
      state.login = action.payload;
    },
  },
});

export const { login } = homeSlice.actions;
export default homeSlice.reducer;
