import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function submitData(e) {
        e.preventDefault();
        // if(!email||!password)
        let result = await fetch("http://localhost:8000/api/users/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: { "Content-Type": "application/json" },
        });
        result = await result.json();
        // console.log("result=====>", result.user._id);
        if (result.status == 200) {
            // localStorage.setItem("user", JSON.stringify(result.data));
            localStorage.setItem("user", JSON.stringify(result.user));

            // localStorage.setItem("token", JSON.stringify(result.token));
            navigate("/");
        } else {
            setMsg(result.msg);
        }
    }

    return (
        <div className="login-form card">
            {msg !== "" ? <div className="alert alert-danger">{msg}</div> : ""}
            <h2>Login</h2>
            <form method="post" onSubmit={submitData}>
                <input
                    type="text"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    className="form-control"
                    name="email"
                    placeholder="Enter Email Id"
                    value={email}
                />

                <br />
                <br />
                <input
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="form-control"
                    name="password"
                    required
                    placeholder="Enter Password Id"
                    value={password}
                />


                <br />
                <br />
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}
export default Login;
