import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function AddGroup() {
    const [group, setGroup] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    var token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        var auth = JSON.parse(localStorage.getItem("user"))

        if (!auth) navigate("/login");

    }, []);

    const AddGroup = async () => {
        if (!group) {
            setError(true);
            return false;
        }
        let userId = JSON.parse(localStorage.getItem("user"))._id;

        let result = await fetch("http://localhost:5000/addGroup", {
            method: "POST",
            body: JSON.stringify({ group, userId }),
            headers: { "Content-Type": "application/json", token: token },
        });
        result = await result.json();
        if (result.status === 200) {
            navigate("/");
        }
        // console.log("userId=>", userId);
    };
    // console.log("group=>", group);
    return (
        <div className="input">
            <h2>Add Group</h2>
            <input type="text"
                className="input-box form-control "
                onChange={(e) => setGroup(e.target.value)}
                value={group}
                placeholder="Enter Name"
            />
            {error && !group && <span className="error-msg text-danger">Enter valid group Name</span>}
            <button className="btn btn-primary" onClick={AddGroup}>Add</button>

        </div>
    );
}
export default AddGroup;