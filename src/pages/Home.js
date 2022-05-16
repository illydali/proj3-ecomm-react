import React, { useContext, useEffect, useState } from "react";
import MainCarousel from "../components/Carousel";
import UserContext from "../context/UserContext";

import { Card, CardGroup, Button } from 'react-bootstrap'


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
            <div>
            <MainCarousel />
            
    <section className="p-3 cta mx-auto position-absolute top-50 start-50 translate-middle" style={{width: 
    '70vw', backgroundColor: "transparent"}}>
      <div className="p-4 text-white">
        <h1>Find the latest records</h1>
          <div className="row">
            <div className="mt-3">
             
            </div>
          </div> 

          <Button variant='light' type="button" className="p-2 btn btn-lg mt-3 ps-3 pe-3 fs-6">SHOP NOW</Button>

      </div> 
    </section> 
    
            </div>
            <div className="mt-3">
                <p className="text-center">
                    Shop for the latest released vinyl records from the comfort of your home. 
                </p>
                
            </div>
            <div className="scrolling-wrapper row flex-row flex-nowrap flex-lg-wrap m-4 pb-2 pt-2 gap-3 gap-lg-4"></div>
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