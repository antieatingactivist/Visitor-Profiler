import { useState } from 'react';
import { Visitor, IVisitor } from './Visitor';
type Props = {
    visitor: IVisitor;
    index: number;
}


export function VisitorBlock({visitor, index}: Props) {
    const [showOtherVisits, setShowOtherVisits] = useState(false);

    return (
        
            
              <div className="container" key={index} style={{
                marginTop: `${20 + visitor.otherVisits?.length! * 5 * +!visitor.hidden * +!showOtherVisits }px`,
                // marginBottom: `${20 + visitor.otherVisits?.length! * 5}px`
              }}>
                
                <div style={{position: "relative", zIndex: 1}}>
                    <Visitor visitor={visitor} showOtherVisits={showOtherVisits} setShowOtherVisits={setShowOtherVisits}/>
                </div>
                    { !showOtherVisits ?
                        <>{ !visitor.hidden &&

                            <>
                            {visitor.otherVisits?.map((otherVisitor, index) =>
                                
                                <div key={index} 
                                className="absolute" style={{  
                                    top: `${-0 - (visitor.otherVisits?.length!-index)*5}px`,
                                    left: `${-0 - (visitor.otherVisits?.length!-index)*2}px`,
                                    right: `${0 + (visitor.otherVisits?.length!-index)*2}px`,
                                    bottom: `${0 + (visitor.otherVisits?.length!-index)*5}px`,
                                    
                                }}>
                                    <Visitor visitor={otherVisitor} noButtons={true}/>
                                    
                                </div>
                            )}
                            </>
                        }</>
                        :
                        <>{visitor.otherVisits?.map((otherVisitor, index) =>
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
                            
                        )}</>
                    }
                </div>
            
        
    );
}