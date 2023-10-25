import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';


function UpdateContact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [contactId, setContactId] = useState("");
    const [group, setGroup] = useState("");
    const [groupId, setGroupId] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        var auth = JSON.parse(localStorage.getItem("user"));
        if (!auth) navigate("/login");
        getContact();
    }, []);

    const updateContact = async () => {
        if (!name || !email || !mobile || !address) {
            setError(true);
            return false;
        }
        // let userId = JSON.parse(localStorage.getItem("user"))._id;

        let result = await fetch(`http://localhost:5000/updateContact/${contactId},${groupId}`,
            {
                method: "put",
                body: JSON.stringify({ name: name, email: email, mobile: mobile, address: address, group: group }),
                headers: { "Content-Type": "application/json" },
            }
        );
        result = await result.json();
        // console.log("-----", result)
        if (result.status === 200) {
            navigate("/");
        }
        console.log(result);

    };
    // console.log(params.id);
    const getContact = async () => {

        let result = await fetch(`http://localhost:5000/getContactById/${params.id}`,
            {
                method: "get",
                headers: { "Content-Type": "application/json" },
            }

        );
        result = await result.json();
        console.log("mahakal", result);

        if (result.data) {
            setName(result.data.name);
            setEmail(result.data.email);
            setMobile(result.data.mobile);
            setAddress(result.data.address);
            setContactId(result.data._id);
            setGroupId(result.data._id);

        }
    };

    return (
        <div className="contact card mt-5 mb-4">
            <h2>Update Contact</h2>

            <input type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control input-box mt-5"
                placeholder="enter Name"
            />
            {error && !name && <span className="error-msg">Enter a valid name</span>}

            <input type="email"

                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control input-box mt-5"
                placeholder="enter Email"

            />
            {error && !email && <span className=" error-msg">Enter valid email</span>}

            <input type="tel" placeholder="Enter mobile no"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                className="form-control input-box mt-5"

            />
            {error && !mobile && <span className="error-msg">Enter a valid mobile no</span>}

            <input type="Address" placeholder="Enter Your Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="form-control input-box mt-5"


            />
            <select onChange={(e) => setGroup(e.target.value)}
                value={group}
            ></select>


            {error && !address && (<span className="error-msg">Enter a valid address</span>)}
            <button className="btn btn-primary mt-4"
                onClick={updateContact}><i class="bi bi-pen-fill"></i>Update</button>

        </div>
    );
}
export default UpdateContact;
