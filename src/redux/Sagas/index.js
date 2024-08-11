import { fork } from "redux-saga/effects";
import homeSaga from "./home";

export default function* root (){
    yield fork(homeSaga)
}