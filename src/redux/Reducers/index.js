import { combineReducers } from 'redux';
import homeSlide  from './homeSlide';

const appReducer = combineReducers({
    home: homeSlide,
});

export default appReducer