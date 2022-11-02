import { useState} from 'react';
type Props = {
    visitor: IVisitor;
}
export interface IVisitor {
    id: number;
    ip: string,
    time: string,
    userAgent: string,
    city: string,
    region: string,
    country: string,
  }
const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";



export function Visitor({visitor}: Props) {
    const [rawData, setRawData] = useState();
    const [showRaw, setShowRaw] = useState(false);
    
    const getRaw = async (id: number) => {
        const show = !showRaw;
        if (show) {
            const response = await fetch(`${dataPath}/raw/${id}`);
            const data = await response.json();
            setRawData( data );
            setShowRaw(true);
        } else {
            setShowRaw(false);
        }
        
   
    }
    return (
        <div className="visitor">
            <p>{visitor.ip}</p>
            <p>{visitor.time}</p>
            <p>{visitor.userAgent}</p>
            <p>{visitor.city}</p>
            <p>{visitor.region}</p>
            <p>{visitor.country}</p>
            <button onClick={() => getRaw(visitor.id)}>{showRaw ? <>Hide</> : <>Show</>} Raw Data</button>
            {showRaw && <pre>{JSON.stringify(rawData, null, 2)}</pre>}
        </div>
      );
    }