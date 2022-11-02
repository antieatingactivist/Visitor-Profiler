import {useEffect, useState} from 'react';

import './App.css';

interface IVisitor {
  ip: string,
  time: string,
  userAgent: string,
  city: string,
  region: string,
  country: string,
}
const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004/data" : "/data"

function App() {
  const [visitorData, setVisitorData] = useState<IVisitor[]>([]);
  const getData = async () => {
   const response = await fetch(dataPath);
   const data = await response.json();

   setVisitorData(data);
}
  useEffect(() => {
    console.log(process.env.NODE_ENV);
    getData();
  },[])
  return (

      <div className="App">
        {visitorData.map(visitor => (
          <div className="visitor">
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
