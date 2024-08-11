import { configureStore as createToolkitStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Reducers';
import rootSaga from '../Sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createToolkitStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(sagaMiddleware),
    devTools: true,
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
