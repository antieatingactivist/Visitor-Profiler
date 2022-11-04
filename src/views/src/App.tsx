import {useEffect, useState} from 'react';
import { Visitor, IVisitor } from './components/Visitor';
import { Header } from './components/Header';
import { VisitorBlock } from './components/VisitorBlock'
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css';


const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";

function App() {
  const [visitorData, setVisitorData] = useState<IVisitor[]>([]);
  const [reversed, setReversed] = useState(true);

  const getData = async (includeHidden?: boolean) => {
    const queryString = includeHidden ? "?showHidden=true" : "";
    const response = await fetch(`${dataPath}/data${queryString}`);
    const data = await response.json();
    setVisitorData(data);
  }




  useEffect(() => {

    getData();
  },[])
  return (
      <div className="App">
        <Header getData={getData} reversed={reversed} setReversed={setReversed}/>
        
        { reversed ?
            <VisitorBlock visitorData={[...visitorData].reverse()}/>
        :
            <VisitorBlock visitorData={visitorData}/>
        }
      </div>

  );
}

export default App;
