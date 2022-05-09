import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        'fullname': '',
        'email': ''
    })

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    function submitForm() {
        navigate('/form-submitted', {
            'state': {
                'formData': formState
            }
        })
    }

    return (<>
        <div>
            <div>
                <label>Full Name:</label>
                <input type="text" name="fullname"
                    value={formState.fullname}
                    onChange={updateFormField} />
            </div>
            <div>
                <label>Email:</label>
                <input type="text" name="email"
                    value={formState.email}
                    onChange={updateFormField} />
            </div>
            <button onClick={submitForm}>Submit</button>
        </div>

    </>
    )
}