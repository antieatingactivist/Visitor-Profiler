import {useEffect, useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
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
    <BrowserRouter basename='/stats'>
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
    </BrowserRouter>
  );
}

export default App;
