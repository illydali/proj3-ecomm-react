import React, { useContext, useEffect, useState } from "react";
import MainCarousel from "../components/Carousel";
import UserContext from "../context/UserContext";

import { Card, CardGroup } from 'react-bootstrap'


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
            <div class="scrolling-wrapper row flex-row flex-nowrap flex-lg-wrap m-4 pb-2 pt-2 gap-3 gap-lg-4"></div>
            <CardGroup>
            {allRecords.map((p => {
                    return ( <Card key={p.id}>
         
                        <Card.Title className="text-center">
                            {p.title}
                        </Card.Title>
                        </Card>)
                }))}

       </CardGroup>
        </React.Fragment>
    )
}