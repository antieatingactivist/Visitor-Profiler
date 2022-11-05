import {useEffect, useState} from "react";
import { IVisitor } from "./components/Visitor";
import { Header } from "./components/Header";
import { VisitorBlock } from "./components/VisitorBlock";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";


const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";

function App() {
    const [visitorData, setVisitorData] = useState<IVisitor[]>([]);
    const [reversed, setReversed] = useState(false);
    const [show, setShow] = useState(true);

    const getData = async (includeHidden?: boolean) => {

        const queryString = includeHidden ? "?showHidden=true" : "";
        const response = await fetch(`${dataPath}/data${queryString}`);
        const data = await response.json();
        setVisitorData(data);
    };

    useEffect(() => {
        setShow(false);
        setTimeout(() => 
            setShow(true), 20
        );
    },[reversed]);

    useEffect(() => {
        getData();
    },[]);
    return (
        <div className="App">
            <Header getData={getData} reversed={reversed} setReversed={setReversed}/>  
            { show && <>{ reversed ? 
                <>{visitorData.map((visitor, index) => (
                    <VisitorBlock visitor={visitor} key={index}/>
                ))}</>
                :
                <>{[...visitorData].reverse().map((visitor, index) => (
                    <VisitorBlock visitor={visitor} key={index}/>
                ))}</>
            }</>}
        </div>

    );
}

export default App;
