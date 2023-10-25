import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function AddContact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [groupId, setGroupId] = useState("");
    const [error, setError] = useState(false);
    const [groups, setGroups] = useState([]);


    const navigate = useNavigate();
    var token = JSON.stringify(localStorage.getItem("token"));

    useEffect(() => {
        var auth = JSON.parse(localStorage.getItem("user"));
        if (!auth) navigate("/login");
        // getGroups();
    }, []);

    const getGroups = async () => {
        let userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = [];
        fetch(`http://localhost:5000/getGroups/${userId}`, {
            // headers: { token: token }
        }).then((result) => {
            result.json().then((result) => {
                setGroups(result.data);
            });

        })
        if (result.status == 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate("/login");
        }

    }

    const addContact = async () => {
        if (!name || !email || !mobile || !address) {
            setError(true);
            return false;
        }
        let userId = JSON.parse(localStorage.getItem("user"))._id;
        console.log("result=========userid ", userId._id);

        let result = await fetch("http://localhost:8000/api/contact/addContact", {
            method: "POST",
            body: JSON.stringify({ name, email, mobile, address, userId }),
            headers: { "Content-Type": "application/json", token: token },
        });
        result = await result.json();
        if (result.status === 200) {
            navigate("/");
        }

    };

    // console.log("groupIdmnu==>", groupId);


    return (
        <div className="add-contact card">

            <h2>Add Contact</h2>
            <input
                type="text"
                className="form-control input-box"
                onChange={(e) => {
                    setName(e.target.value);
                }}
                value={name}
                placeholder="Enter name"
            />
            {error && !name && <span className="error-msg text-danger">Enter Valid Name</span>}

            <input
                type="text"
                className="form-control input-box"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                value={email}
                placeholder="Enter email"
            />
            {error && !email && <span className="error-msg text-danger">Enter Valid email</span>}
            <input
                type="text"
                className="form-control input-box"
                onChange={(e) => {
                    setMobile(e.target.value);
                }}
                value={mobile}
                placeholder="Enter mobile"
            />
            {error && !mobile && (
                <span className="error-msg text-danger">Enter Valid mobile</span>
            )}

            <input
                type="text"
                className="form-control input-box"
                onChange={(e) => {
                    setAddress(e.target.value);
                }}
                value={address}
                placeholder="Enter address"
            />
            {error && !address && (
                <span className="error-msg text-danger">Enter Valid address</span>
            )}

            {/* <select className=" input-box " onChange={(e) => setGroupId(e.target.value)}>
                <option>No Group</option>
                {
                    groups.map((group, index) => {
                        return <>
                            <option value={group._id}>{group.group}</option>
                        </>
                    })
                }

            </select> */}


            <button className="btn btn-primary" onClick={addContact}>
                Add
            </button>
        </div>
    );
}
export default AddContact;