import { useState, useEffect } from 'react';





export function Header() {
    const [count, setCount] = useState();
    const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";
    const getCount = async () => {
        const response = await fetch(`${dataPath}/count`);
        const data = await response.json();
        setCount(data);
    }
    useEffect(() => {
        getCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <div className="basic-div">
            {count} Visitors
        </div>
      );
    }