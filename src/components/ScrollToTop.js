import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { IoChevronUpSharp } from 'react-icons/io5'

export default function ScrollToTop() {

    const { pathname } = useLocation()
    const [backToTop, setBackToTop] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                setBackToTop(true)
            } else {
                setBackToTop(false)
            }
        })
    }, [])

    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname] )

    const scrollTop = () => {
        window.scrollTo({
            top: 50,
            behavior: 'smooth'
        })
    }


    return (
        <>
        { backToTop && ( 
            <IoChevronUpSharp
             style={{
                position: 'fixed',
                bottom: '50px',
                right: '50px',
                height:  '50px',
                width: '50px',
                fontSize: '50px',
                color: 'darkolivegreen',
                zIndex: '999'
            }}
                onClick={scrollTop}
                /> 
        )}
        </>
    )
}