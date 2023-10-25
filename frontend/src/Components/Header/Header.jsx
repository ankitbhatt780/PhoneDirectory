import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header() {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem("user");
        navigate("/login");
    }
    var auth = JSON.parse(JSON.stringify(localStorage.getItem("user")));
    // var token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

    return (
        <div className="navBar bg-Warning">
            {auth ? (
                <>
                    <Link to={"/"}><h3>Dashboard</h3></Link>
                    <Link to={"/addContact"}><h3>Add Contact</h3></Link>
                    <Link to={"/addGroup"}><h3>Add Group</h3></Link>
                    <Link to={"/login"} onClick={logout}>
                        <h3>Logout</h3> (<span>{auth[0].name}</span>)
                    </Link>
                </>
            ) : (
                <>
                    <Link to={"/login"}><h3>Login</h3> </Link>
                    <Link to={"/signup"}><h3>Signup</h3></Link>
                </>

            )}
        </div>
    );
}

export default Header;
