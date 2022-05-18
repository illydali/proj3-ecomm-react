import React, { useEffect, useState} from 'react'
import { IoChevronUpSharp } from 'react-icons/io5'

export default function ScrollToTop() {

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

    const scrollTop = () => {
        window.scrollTo({
            top: 100,
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
                fontSize: '50px'
            }}
                onClick={scrollTop}
                /> 
        )}
        </>
    )
}