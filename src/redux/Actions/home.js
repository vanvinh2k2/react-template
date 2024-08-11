// import TypeAction from '../../constants/index';

// export const addData = (req) =>{
//     return {type: TypeAction.LOGIN, payload: {'count': req}}
// }

import { login } from "../Reducers/homeSlide";

export const requestLogin = (payload) => login(payload);
