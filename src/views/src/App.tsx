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

function App() {
  const [visitorData, setVisitorData] = useState<IVisitor[]>([]);
  const getData = async () => {
   const response = await fetch("/data");
   const data = await response.json();
   console.log(data);
   setVisitorData(data);
}
  useEffect(() => {
    getData();
  },[])
  return (
    <div className="App">
      {visitorData.map(visitor => (
        <div>
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
