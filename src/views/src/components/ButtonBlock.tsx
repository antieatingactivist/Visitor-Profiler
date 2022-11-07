import { IVisitor } from "./Visitor";


interface Props {
    hidden: boolean,
    showRaw: boolean,
    getRaw: (id: number) => void,
    visitor: IVisitor;
    showOtherVisits?: boolean;
    setShowOtherVisits?: (state: boolean) => void;
    show: (id: number) => void;
    hide: (id: number) => void;
}
export default function ButtonBlock({
    hidden, 
    showRaw, 
    getRaw, 
    visitor, 
    showOtherVisits,
    setShowOtherVisits, 
    show, 
    hide
}: Props) {

    return (
        <div className="button-block">
            { ((visitor.otherVisits?.length ?? 0) > 0 ) &&
                <>{showOtherVisits ? 
                    <button onClick={setShowOtherVisits && (() => setShowOtherVisits(false))}>Hide Other Visits</button>
                    :
                    <button onClick={setShowOtherVisits && (() => setShowOtherVisits(true))}>Other Visits</button>
                }</>   
            }

            {!hidden && 
                <button onClick={() => getRaw(visitor.id)}>{showRaw ? <>Hide </> : <></>}Raw Data</button>
            }

            {hidden ?
                <button onClick={() => show(visitor.id)}>Show</button>
                :
                <button onClick={() => hide(visitor.id)}>Hide</button>
            }
        </div>
    );
}
