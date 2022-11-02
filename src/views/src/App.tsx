import {useEffect, useState} from 'react';

import './App.css';

interface IVisitor {
  id: number;
  ip: string,
  time: string,
  userAgent: string,
  city: string,
  region: string,
  country: string,
}
const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";

function App() {
  const [visitorData, setVisitorData] = useState<IVisitor[]>([]);

  const getData = async () => {
    const response = await fetch(`${dataPath}/data`);
    const data = await response.json();
    setVisitorData(data);
  }
  const getRaw = async (id: number) => {
    const response = await fetch(`${dataPath}/raw/${id}`);
    const data = await response.json();
    return JSON.stringify(data);
  }



  useEffect(() => {

    getData();
  },[])
  return (

      <div className="App">
        {visitorData.map(visitor => (
          <div className="visitor" key={visitor.id}>
            <p>{visitor.ip}</p>
            <p>{visitor.time}</p>
            <p>{visitor.userAgent}</p>
            <p>{visitor.city}</p>
            <p>{visitor.region}</p>
            <p>{visitor.country}</p>
            
          </div>
        ))}
      </div>

  );
}

export default App;
