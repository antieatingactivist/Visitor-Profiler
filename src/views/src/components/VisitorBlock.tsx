import { Key } from 'react';
import { Visitor, IVisitor } from './Visitor';
type Props = {
    visitorData: IVisitor[];
}


export function VisitorBlock({visitorData}: Props) {

    return (
        <>
            {visitorData.map((visitor, index) => (
              <div className="container" key={index} style={{
                marginTop: `${20 + visitor.otherVisits?.length! * 5}px`
                
              }}>
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
                

                <Visitor visitor={visitor} />
              </div>
            ))}
        </>
    );
}