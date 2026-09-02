import Brokerage from "./Brokerage";
import Hero from "./Hero";
import OpenAccount from "../OpenAccounts"

function PricingPage() {
    return (
        <>
            <Hero />
            <OpenAccount />
            <Brokerage />
        </>
     );
}

export default PricingPage;
