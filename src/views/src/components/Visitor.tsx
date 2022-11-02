import { useState } from 'react';
type Props = {
    visitor: IVisitor;
}
export interface IVisitor {
    hidden: boolean;
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
    const [collapsed, setCollapsed] = useState(false);
    const [hidden, setHidden] = useState(visitor.hidden);

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
    const hide = async (id: number) => {
        await fetch(`${dataPath}/hide/${id}`, {
            method: 'PUT'
        });
        setCollapsed(true);
        setShowRaw(false);
    }
    const show = async (id: number) => {
        await fetch(`${dataPath}/show/${id}`, {
            method: 'PUT'
        });
        setCollapsed(false);
        setHidden(false);
    }
    const classString = hidden ? "visitor basic-div hidden" : "visitor basic-div";
    return (
        <>
        {
            collapsed ?
            <div className="visitor basic-div hidden">
                <p><b>{visitor.ip}</b></p>
                <p className="warning">This entry is marked hidden and will not be shown again. Click "Show" to revert.</p>
                <div className="button-block">
                    <button onClick={() => show(visitor.id)}>Show</button>
                </div>
            </div>
            :
            <div className={classString}>
                <p><b>{visitor.hidden}</b></p>
                <p><b>{visitor.ip}</b></p>
                <p>{visitor.time}</p>
                <p>{visitor.userAgent}</p>
                <p>{visitor.city}</p>
                <p>{visitor.region}</p>
                <p>{visitor.country}</p>
                {showRaw && <pre>{JSON.stringify(rawData, null, 2)}</pre>}
                <div className="button-block">
                    <button onClick={() => getRaw(visitor.id)}>{showRaw ? <>Hide</> : <>Show</>} Raw Data</button>
                    {hidden ? 
                        <button onClick={() => show(visitor.id)}>Show</button>
                        :
                        <button onClick={() => hide(visitor.id)}>Hide</button>
                    }
                </div>
            </div>
        }
        </>
    );
}