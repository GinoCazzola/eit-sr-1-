import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "../layout/NavBar"
import Footer from "../layout/Footer"

import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Upload from "../pages/Upload"
import Checkout from "../pages/Checkout"
import Detail from "../pages/Detail"
import About from "../pages/About"


function RouterApp() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/about" element={<About />} />
                
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default RouterApp