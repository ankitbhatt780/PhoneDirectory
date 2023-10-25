import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const [contacts, setContacts] = React.useState([]);
    const [userId, setUserId] = React.useState("");
    const [groups, setGroups] = React.useState([]);
    const [groupId, setGroupId] = React.useState("");


    let auth = {};
    var token = JSON.stringify(localStorage.getItem("token"));

    const navigate = useNavigate();


    useEffect(() => {
        // console.log("llllll", auth._id);
        if (!auth) navigate("/login");
        getContacts();
        // getGroups();
        // searchContacts();

    }, []);

    // console.log("mmmmmm", auth._id);

    const getContacts = async () => {
        auth = JSON.parse(localStorage.getItem("user"));
        // console.log("auth===============", auth)

        let result = await fetch(`http://localhost:8000/api/contact/getContact/${auth._id}`, {
            headers: { token: token }
        });
        console.log(" ============", result)
        if (result.status === 401) {
            localStorage.removeItem("user");
            // localStorage.removeItem("token");
            navigate("/login");
        }
        result = await result.json();

        setContacts(result.result);
        // console.log(result);

    };


    const deleteContact = async (id) => {
        // console.log("=============> delete", Id)

        let result = await fetch(`http://localhost:8000/api/contact/deleteContact/${id}`, {
            method: "delete",
        });
        getContacts();
    };
    const searchContacts = async (e) => {
        auth = JSON.parse(localStorage.getItem("user"));
        if (e.target.value) {
            console.log("test1")
            let result = await fetch(`http://localhost:5000/searchContact/${e.target.value}/${auth._id}`, {
                method: "get",
                headers: { token: token }
            });
            result = await result.json();
            setContacts(result.data);
        }
        else {
            console.log("test2", userId)
            getContacts();
        }
    };




    const getGroups = async () => {
        // let userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = [];
        fetch(`http://localhost:5000/getGroups/${userId}`, {
            headers: { token: token }
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


    // console.log("contact=>", contacts);

    return (
        <div className="dashboard " >
            <h3>Contact List</h3>
            <input type="text" onChange={searchContacts} className="searchBox" placeholder="search Contact" />
            <div>
                <select className="input-box searchBox group-search"
                    // onChange={(e) => setGroupId(e.target.value)}>
                    onChange={searchContacts}>

                    <option >No Group </option>

                    {
                        groups.map((group, index) => {
                            return <>
                                <option value={group._id}>{group.group}</option>
                            </>
                        })
                    }

                </select>
            </div>


            <div className="table">
                <table >
                    <thead >
                        <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">mobile</th>
                            <th scope="col">address</th>
                            {/* <th scope="col">Groups</th> */}
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody className="gap-2">
                        {contacts.length > 0 ? contacts.map((contact, index) => (
                            <tr key={index + 1}>
                                <td className="td">{index + 1}</td>
                                <td className="td">{contact.name}</td>
                                <td className="td">{contact.email}</td>
                                <td className="td">{contact.mobile}</td>
                                <td className="td">{contact.address}</td>
                                {/* <td className="td">{contact.group.group}</td> */}

                                <td>
                                    <button className="btn btn-danger"

                                        onClick={() => deleteContact(contact._id)}>
                                        {/* console.log("contactId"); */}
                                        <i class="bi bi-trash-fill"></i>{" "}
                                    </button>
                                    <Link className="btn btn-primary" to={`/updateContact/${contact._id}`}>
                                        <i class="bi bi-pencil-square"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))
                            :
                            <tr>
                                <td colSpan={"6"}><h4>No Contact Found</h4></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div >

    );
}
export default Dashboard;







