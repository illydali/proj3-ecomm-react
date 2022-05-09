import React from "react"
import { useLocation } from 'react-router-dom';

// The location hook allows us to retrieve details about 
// the current route, including what data has been passed to it. 
// We use the highlighted lines to extract out those variables, and then display it in the JSX.


// in the HTML specs, location refers to one URL --
// basically location stores state info and then brings into 
// whatever new page u call it

export default function SubmittedForm() {

    const location = useLocation();
    let fullName = location.state.formData.fullname;
    let email = location.state.formData.email;

    return (
        <React.Fragment>
            <h1>Feedback received</h1>
            <p>
                Hi {fullName}, thank you for contacting us. We will forward your feedback
                to the relevant department (like real.) Please look forward to
                a reply at your junk folder for your email {email}
            </p>
        </React.Fragment>
    )
}