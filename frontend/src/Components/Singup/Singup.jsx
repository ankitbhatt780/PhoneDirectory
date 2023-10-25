import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [pass_error, setPassError] = useState("");
    const navigate = useNavigate();

    async function submitData(e) {
        e.preventDefault();

        if (password !== confPassword) setPassError("Password not match");
        else {
            setPassError("");
            let result = await fetch("http://localhost:8000/api/users/signup", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
                headers: { "Content-Type": "application/json" },
            });
            if (result.statusText === "OK") {
                navigate("/login");
            } else {
                setPassError(result.msg);
            }
        }
    }

    return (
        <div className="sign-form card">
            {pass_error !== "" ? (
                <div className="alert alert-danger">{pass_error}</div>
            ) : (
                ""
            )}
            <h2>Sign Up</h2>
            <form method="post" onSubmit={submitData}>
                <input
                    type="text"
                    required
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    className="form-control"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                />
                <br />
                <br />
                <input
                    type="email"
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
                    required

                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="form-control"
                    name="password"
                    placeholder="Enter Password Id"

                    value={password}
                />
                <br />
                <br />
                <input
                    type="password"
                    required
                    onChange={(e) => {
                        setConfPassword(e.target.value);
                    }}
                    className="form-control"
                    name="conf_password"
                    placeholder="Confirm Password Id"
                    value={confPassword}
                />
                <br />
                <br />
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
export default Signup;
