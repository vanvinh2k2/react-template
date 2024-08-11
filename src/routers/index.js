import Home from '../views/Home/index'
import Login from '../views/Login';
import NotFound from '../views/NotFound';

const publicRouter = [
    {path: '/', component: Home},
    {path: '/login', component: Login, layout: null },
    {path: '*', component: NotFound},
]

const privateRouter = [
]

export {publicRouter, privateRouter};