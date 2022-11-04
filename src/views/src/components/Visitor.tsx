import { useState } from 'react';

type Props = {
    visitor: IVisitor;
    noButtons?: boolean;
    setShowOtherVisits?: Function;
}
export interface IVisitor {
    hidden?: boolean,
    id: number,
    ip?: string,
    time: string,
    unixTime?: string,
    userAgent?: string,
    city?: string,
    region?: string,
    country?: string,
    flag?: string,
    otherVisits?: {
        id: number,
        time: string
    }[],
}
const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";



export function Visitor({visitor, noButtons, setShowOtherVisits}: Props) {
    const [rawData, setRawData] = useState();
    const [showRaw, setShowRaw] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [hidden, setHidden] = useState(false);

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
    const classString = visitor.hidden ? "basic-div visitor hidden" : " basic-div visitor";

    return (
        <>
        {
            collapsed ?
            <div className="basic-div hidden">
                
                <p><b>{visitor.ip}</b></p>
                <p className="warning">This entry is marked hidden and will not be shown again. Click "Show" to revert.</p>
                <div className="button-block">
                    <button onClick={() => show(visitor.id)}>Show</button>
                </div>
            </div>
            :

            <div className={classString}>
                <p><b>{visitor.ip}</b></p>
                <p>{visitor.time}</p>
                <p>{visitor.userAgent}</p>
                <p>{visitor.city}</p>
                <p>{visitor.region}</p>
                <p>{visitor.flag} {visitor.country}</p>
                {showRaw && <pre>{JSON.stringify(rawData, null, 2)}</pre>}
                {!noButtons && <div className="button-block">
                    {(visitor.otherVisits?.length!>0) && <button onClick={() => setShowOtherVisits!(true)}>Other Visits</button>}
                    <button onClick={() => getRaw(visitor.id)}>{showRaw ? <>Hide </> : <></>}Raw Data</button>
                    {hidden ? 
                        <button onClick={() => show(visitor.id)}>Show</button>
                        :
                        <button onClick={() => hide(visitor.id)}>Hide</button>
                    }
                </div>}
                <div className="flag">
                    
                    {visitor.flag}
                </div>
            </div>
            
        }
        </>
    );
}