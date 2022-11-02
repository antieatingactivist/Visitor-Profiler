import { useState, useEffect } from 'react';

type Props = {
    getData: Function;
}
export function Header({getData}: Props) {
    const [count, setCount] = useState();
    const [showHidden, setShowHidden] = useState(false);
    const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";
    const getCount = async () => {
        const response = await fetch(`${dataPath}/count`);
        const data = await response.json();
        setCount(data);
    }
    useEffect(() => {
        getCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <div className="basic-div">
            {count} Visitors
            <div className="button-block">
                    <button onClick={() => {getData(!showHidden); setShowHidden(!showHidden)}}>
                        {showHidden ?  <>Hide Hidden</> : <>Show All</>} 
                    </button>
            </div>
        </div>
    );
}