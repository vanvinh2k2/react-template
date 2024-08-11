
// import { useState } from "react";
import notFoundImg from "../asset/image/not_found.png"
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { requestLogin } from "../redux/Actions/home";

const NotFound = () => {
    // const [count, setCount] = useState(0);
    // const dispatch = useDispatch();
    // const { login } = useSelector(state => state.home);

    // function creamentCount(){
    //     setCount(count + 1);
    // }

    // useEffect(()=>{
    //     dispatch(requestLogin({"count": count}));
    // }, [count, dispatch]);

    return (
        <div className="flex flex-col items-center my-16">
            <div className="flex flex-col items-center rounded-sm bg-gray-50 border w-full px-2 py-5">
                <img className="w-24 h-20" src={notFoundImg}/>
                <p className="text-black font-bold text-3xl my-2">404 - page not found</p>
                <a href="/" className="rounded px-5 py-1 bg-blue-500 text-white my-3">Return to the home page</a>
            </div>
            {/* <button className="rounded px-3 py-2 bg-blue-500 text-white my-7" onClick={creamentCount}>Add item</button>
            <p className="text-sm my-3">Result: {login?.count || 0}</p> */}
        </div>
    )
}

export default NotFound;