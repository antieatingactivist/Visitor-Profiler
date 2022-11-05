import { IVisitor } from './Visitor';

type Props = {
    hidden: boolean,
    showRaw: boolean,
    getRaw: Function,
    visitor: IVisitor;
    showOtherVisits?: boolean;
    setShowOtherVisits?: Function;
    show: Function;
    hide: Function;
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
                { visitor.otherVisits?.length!>0 &&
                            <>{showOtherVisits ? 
                                <button onClick={() => setShowOtherVisits!(false)}>Hide Other Visits</button>
                                :
                                <button onClick={() => setShowOtherVisits!(true)}>Other Visits</button>
                            }</>
                }

                {!hidden && <button onClick={() => getRaw(visitor.id)}>{showRaw ? <>Hide </> : <></>}Raw Data</button>}

                
                {hidden ? 
                
                    <button onClick={() => show(visitor.id)}>Show</button>
                    :
                    <button onClick={() => hide(visitor.id)}>Hide</button>
                }
    </div>
  )
}
