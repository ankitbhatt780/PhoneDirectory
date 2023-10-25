import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Singup/Singup";
import Dashboard from "../Dashboard/Dashboard";
import Logout from "../Logout/Logout";
import AddContact from "../Contact/Contact";
import UpdateContact from "../Update/UpdateContact";
import AddGroup from "../Groups/AddGroup";
// import AddContact from "./AddContact";

function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route element={<Dashboard />} path={"/"}></Route>
                <Route element={<AddContact />} path={"/addContact"}></Route>
                {/* <Route element={< AddGroup />} path={"/addGroup"}></Route> */}
                <Route element={<UpdateContact />} path={"/updateContact/:id"}></Route>
                <Route element={<Login />} path={"/login"}></Route>
                <Route element={<Signup />} path={"/signup"}></Route>
                <Route element={<Logout />} path={"/logout"}></Route>

            </Routes>
        </div>
    );
}

export default AllRoutes;
