import {useEffect, useState} from 'react';
import { Visitor, IVisitor } from './components/Visitor';
import { Header } from './components/Header';
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
            <>{[...visitorData].reverse().map((visitor, index) => (
              <div className="container" style={{
                marginTop: `${20 + visitor.otherVisits?.length! * 5}px`
              }}>
                {visitor.otherVisits?.map((otherVisitor, index) =>
                  <div className="absolute" style={{  
                    top: `${-10 - index*3}px`,
                    left: `${-10 - index*3}px`,
                    right: `${10 + index*10}px`,
                    bottom: `${10 + index*10}px`,
                    zIndex: -index
                  }}>
                    <Visitor visitor={visitor} key={index}/>
                  </div>
                )}
                

                <Visitor visitor={visitor} key={index}/>
              </div>
            ))}</>
        :
            <>{visitorData.map((visitor, index) => (
              <div className="container" style={{
                marginTop: `${20 + visitor.otherVisits?.length! * 5}px`
              }}>
                {visitor.otherVisits?.map((otherVisitor, index) =>
                  <div className="absolute" style={{  
                    top: `${-10 - index*3}px`,
                    left: `${-10 - index*3}px`,
                    right: `${10 + index*10}px`,
                    bottom: `${10 + index*10}px`,
                    zIndex: -index
                  }}>
                    <Visitor visitor={visitor} key={index}/>
                  </div>
                )}
                

                <Visitor visitor={visitor} key={index}/>
              </div>
            ))}</>
        }
      </div>

  );
}

export default App;
