import { useState } from "react";
import { Visitor, IVisitor } from "./Visitor";

interface Props {
    visitor: IVisitor;
}

export function VisitorBlock({visitor}: Props) {
    const [showOtherVisits, setShowOtherVisits] = useState(false);

    return (
        <div className="container" style={{
            marginTop: `${20 + (visitor.otherVisits?.length ?? 0) * 5 * +!visitor.hidden * +!showOtherVisits }px`
        }}>
        
            <div style={{position: "relative", zIndex: 1}}>
                <Visitor visitor={visitor} showOtherVisits={showOtherVisits} setShowOtherVisits={setShowOtherVisits}/>
            </div>
            { !showOtherVisits ? <>
                { !visitor.hidden && <>
                    {visitor.otherVisits?.map((otherVisitor, index) => {
                        return (
                            <div key={index} 
                                className="absolute" style={{  
                                    top: `${-0 - ((visitor.otherVisits?.length ?? 0)-index)*5}px`,
                                    left: `${-0 - ((visitor.otherVisits?.length ?? 0)-index)*2}px`,
                                    right: `${0 + ((visitor.otherVisits?.length ?? 0)-index)*2}px`,
                                    bottom: `${0 + ((visitor.otherVisits?.length ?? 0)-index)*5}px`,
                                }}>
                                <Visitor visitor={otherVisitor} noButtons={true}/>
                            </div>
                        );}
                    )}</>
                }</>
                :
                <>{visitor.otherVisits?.map((otherVisitor, index) => {
                    return ( 
                        <div key={index} 
                            className="" 
                            style={{  
                                position: "relative",
                                marginTop: "-20px",
                                left: `${10+10*index}px`,
                                zIndex: -index
                            }}>
                            <Visitor visitor={otherVisitor} noButtons={true}/>
                        </div>
                    );}
                )}</>
            }
        </div>
    );
}