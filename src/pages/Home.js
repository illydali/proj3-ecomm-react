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
                <p className="text-center">
                    Shop for the latest released vinyl records from the comfort of your home. 
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