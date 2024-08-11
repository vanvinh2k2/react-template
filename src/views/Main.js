import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import layoutDefault from '../hocs/layoutDefault';
import { publicRouter, privateRouter } from '../routers';
import { Fragment } from 'react';

const Main = () => {
    return (
        <Router>
            <div className="container mx-auto flex flex-col min-h-screen">
                <Routes>
                {
                    publicRouter.map((route, index)=>{
                    let Layout = layoutDefault;
                    if(route.layout){
                        Layout = route.layout;
                    }else if(route.layout === null){
                        Layout = Fragment;
                    }
                    return <Route path={route.path} element={
                        <Layout>
                            <route.component/>
                        </Layout>
                    } key={index}/>
                    })
                }
                </Routes>
            </div>
    </Router>
    )
}

export default Main;