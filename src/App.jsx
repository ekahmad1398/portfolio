
import './style.css'
import React from 'react'
import Header_Footer from './Componnets/Header_Footer'
import Section_1 from './Componnets/Section_1'
import Section_3 from './Componnets/Section_3'
import Section_2 from './Componnets/Section_2'
import Section_4 from './Componnets/Section_4'
import Section_5 from './Componnets/Section_5'




const App = () => {
    return (
        <Header_Footer>
            <Section_1 />
            <Section_2 />
            <Section_3 />
            <Section_4 />
            <Section_5 />
        </Header_Footer>
    )
}


export default App
