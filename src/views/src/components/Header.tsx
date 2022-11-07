import { useState, useEffect } from "react";

type Props = {
    getData: (boolean?: boolean) => void;
    reversed: boolean;
    setReversed: (boolean: boolean) => void;
}
export function Header({getData, reversed, setReversed}: Props) {
    const [count, setCount] = useState();
    const [showHidden, setShowHidden] = useState(false);
    const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";
    const getCount = async () => {
        const response = await fetch(`${dataPath}/count`);
        const data = await response.json();
        setCount(data);
    };
    useEffect(() => {
        getCount();

    },[]);
    
    return (
        <div className="basic-div">
            <p>{count} Visitors</p>
            <div className="button-block">
                <button onClick={() => setReversed(!reversed)}>
                    {reversed ?  
                        <>
                            <i className="bi bi-caret-up-fill"></i> Time </> : <><i className="bi bi-caret-down-fill"></i> Time
                        </>
                    } 
                </button>
                <button onClick={() => {getData(!showHidden); setShowHidden(!showHidden);}}>
                    {showHidden ?  
                        <>Hide Hidden</> 
                        : 
                        <>Show All</>
                    } 
                </button>
            </div>
        </div>
    );
}