import {useEffect, useState} from 'react';
import { Visitor, IVisitor } from './components/Visitor';

import './App.css';


const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";

function App() {
  const [visitorData, setVisitorData] = useState<IVisitor[]>([]);

  const getData = async () => {
    const response = await fetch(`${dataPath}/data`);
    const data = await response.json();
    setVisitorData(data);
  }




  useEffect(() => {

    getData();
  },[])
  return (

      <div className="App">
        {visitorData.map(visitor => (
          <Visitor visitor={visitor} key={visitor.id}/>
        ))}
      </div>

  );
}

export default App;
