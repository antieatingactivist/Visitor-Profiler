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
              <div className="container" key={index} style={{
                marginTop: `${20 + visitor.otherVisits?.length! * 5}px`
              }}>
                {visitor.otherVisits?.map((otherVisitor, index) =>
                  <div
                  key={index} 
                  className="absolute" style={{  
                    top: `${-0 - (visitor.otherVisits?.length!-index)*5}px`,
                    left: `${-0 - (visitor.otherVisits?.length!-index)*5}px`,
                    right: `${0 + (visitor.otherVisits?.length!-index)*5}px`,
                    bottom: `${0 + (visitor.otherVisits?.length!-index)*5}px`,
                  }}>
                    <Visitor visitor={visitor} />
                  </div>
                )}
                

                <Visitor visitor={visitor} />
              </div>
            ))}</>
        :
            <>{visitorData.map((visitor, index) => (
              <div className="container" key={index} style={{
                marginTop: `${30 + visitor.otherVisits?.length! * 5}px`
              }}>
                {visitor.otherVisits?.map((otherVisitor, index) =>
                  <div
                  key={index} 
                  className="absolute" style={{  
                    top: `${-0 - (visitor.otherVisits?.length!-index)*5}px`,
                    left: `${-0 - (visitor.otherVisits?.length!-index)*5}px`,
                    right: `${0 + (visitor.otherVisits?.length!-index)*5}px`,
                    bottom: `${0 + (visitor.otherVisits?.length!-index)*5}px`,
                  }}>
                    <Visitor visitor={visitor} />
                  </div>
                )}
                

                <Visitor visitor={visitor} />
              </div>
            ))}</>
        }
      </div>

  );
}

export default App;
