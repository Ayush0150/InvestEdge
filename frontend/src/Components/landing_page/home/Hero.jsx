import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="assets/images/homeHero.png"
          alt="Hero Image"
          className="mb-5"
        />
        <h1 className="mt-5 mb-4">Invest in everything</h1>
        <p className="mb-4">
          Online platform to invest in stocks, derivates, mutual funds, and more
        </p>
        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mt-2 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up now
        </Link>
      </div>
    </div>
  );
}

export default Hero;
