import React from "react";
import Header from "./component/Header";
import Meme from "./component/Meme";
import Footer from "./component/Footer";

export default function App(){
    return (
        <div className="app">
            <Header />
            <Meme />
            <Footer />
        </div>
    )
} 