import { useEffect, useState } from "react";
import ButtonBlock from "./ButtonBlock";

interface Props {
    visitor: IVisitor;
    noButtons?: boolean;
    showOtherVisits?: boolean;
    setShowOtherVisits?: (boolean: boolean) => void;
}
interface IVisitorPartial {
    hidden: boolean,
    id: number,
    ip?: string,
    time: string,
    unixTime?: string,
    userAgent?: string,
    city?: string,
    region?: string,
    country?: string,
    flag?: string,
}
export interface IVisitor extends IVisitorPartial {
    otherVisits?: IVisitorPartial[]
}
const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";



export function Visitor(props: Props) {
    const { visitor, noButtons } = props;
    const [rawData, setRawData] = useState();
    const [showRaw, setShowRaw] = useState(false);
    const [warning, setWarning] = useState(false);
    const [hidden, setHidden] = useState(visitor.hidden);

    const getRaw = async (id: number) => {
        const show = !showRaw;
        if (show) {
            const response = await fetch(`${dataPath}/raw/${id}`);
            const data = await response.json();
            setRawData(data);
            setShowRaw(true);
        } else {
            setShowRaw(false);
        }
    };
    const hide = async (id: number) => {
        await fetch(`${dataPath}/hide/${id}`, {
            method: "PUT"
        });
        setWarning(true);
        setShowRaw(false);
        setHidden(true);
    };
    const show = async (id: number) => {
        await fetch(`${dataPath}/show/${id}`, {
            method: "PUT"
        });
        setWarning(false);
        setHidden(false);
    };
    const buttonProps = { ...props, hidden, getRaw, showRaw, hide, show };
    useEffect(() => {
        setHidden(visitor.hidden);
    }, [visitor.hidden]);


    return (

        <div className={hidden && !noButtons ? "basic-div visitor hidden" : " basic-div visitor"}>
            {/* <p>{hidden ? <>hidden</> : <>not hidden</>}</p>
            <p>{visitor.hidden ? <>hidden</> : <>not hidden</>}</p> */}
            <p><b>{visitor.ip}</b></p>
            <p>{visitor.time}</p>
            <p>{visitor.userAgent}</p>
            <p>{visitor.city}</p>
            <p>{visitor.region}</p>
            <p>{visitor.flag} {visitor.country}</p>
            {warning && <p className="warning">This entry is marked hidden and will not be shown again. Click "Show" to revert.</p>}
            {showRaw && <pre>{JSON.stringify(rawData, null, 2)}</pre>}
            {!noButtons &&
                <ButtonBlock {...buttonProps} />
            }
            <div className="flag">
                {visitor.flag}
            </div>
        </div>

    );
}

