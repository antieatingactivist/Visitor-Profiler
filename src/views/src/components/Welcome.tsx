import { Link, useSearchParams } from "react-router-dom";


export function Welcome() {

    const [searchParams] = useSearchParams();
    

    return (
        <div className="basic-div container" style={{textAlign: "center"}}>
            <h1>Welcome to Visitor Tracker!</h1>
            <h2>Your IP address is {searchParams.get("ip")}</h2><br />
            <p><Link to="/stats" className="button">Continue to the app to see the data!</Link></p>
        </div>
    );
}


