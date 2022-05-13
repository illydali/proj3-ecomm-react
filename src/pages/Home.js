import React, { useContext, useEffect, useState } from "react";
import MainCarousel from "../components/Carousel";
import UserContext from "../context/UserContext";


export default function Home() {
    const context = useContext(UserContext)
    const [allRecords, setRecords] = useState([])

    useEffect(() => {
        const getRecords = async () => {
            let result = await context.records()
            console.log(result)
            setRecords(result)
        }
        getRecords()
    }, [])



    return (
        <React.Fragment>
            <MainCarousel />
            <div className="mt-3">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <ul>
                {allRecords.map((p => {
                    return (
                        <li key={p.id}>
                            {p.title}
                        </li>)
                }))}

            </ul>
        </React.Fragment>
    )
}