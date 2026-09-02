
import OpenAccount from "../OpenAccounts";
import Stats from "./Stats";
import Awards from "./Awards";
import Education from "./Education";
import Hero from "./Hero";
import Pricing from "./Pricing";

function HomePage() {
    return (
        <>
            <Hero />
            <Awards />
            <Stats />
            <Pricing />
            <Education />
            <OpenAccount />
        </>
     );
}

export default HomePage;
