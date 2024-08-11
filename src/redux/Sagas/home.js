import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { login } from "../Reducers/homeSlide";

async function getData(data){
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    const result = response.data;
    let kq = Int32Array(data) + 1;
    return {"count": kq}
}

function* getHome(action){
    try {
        const result = yield call(getData, action.payload);
        yield put(login(result));
    }
    catch (e){
        console.log(e);
    }
}

function* homeSaga(){
    yield takeLatest(login.type, getHome);
}

export default homeSaga;