import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h5 className="text-muted">
          Want to know more about our technology stack? Check out the{" "}
          <a href="#" className="text-decoration-none">
            InvestEdge Labs
          </a>{" "}
          blog.
        </h5>

        <h4 className="mt-5 pt-5">The InvestEdge Ecosystem</h4>

        <p className="mt-4 text-muted">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="row mt-5">
          {/* Smallcase */}
          <div className="col-12 col-md-6 col-lg-4 p-4">
            <div
              className="d-flex align-items-center justify-content-center mb-4"
              style={{ height: "70px" }}
            >
              <img
                src="/assets/images/smallcaseLogo.png"
                alt="Smallcase"
                style={{
                  maxWidth: "180px",
                  maxHeight: "60px",
                  objectFit: "contain",
                }}
              />
            </div>

            <p className="small text-muted">
              Thematic investing platform that helps you invest in diversified
              baskets of stocks or ETFs.
            </p>
          </div>

          {/* Streak */}
          <div className="col-12 col-md-6 col-lg-4 p-4">
            <div
              className="d-flex align-items-center justify-content-center mb-4"
              style={{ height: "70px" }}
            >
              <img
                src="/assets/images/streakLogo.png"
                alt="Streak"
                style={{
                  maxWidth: "180px",
                  maxHeight: "60px",
                  objectFit: "contain",
                }}
              />
            </div>

            <p className="small text-muted">
              Systematic trading platform that allows you to create and backtest
              strategies without coding.
            </p>
          </div>

          {/* Sensibull */}
          <div className="col-12 col-md-6 col-lg-4 p-4">
            <div
              className="d-flex align-items-center justify-content-center mb-4"
              style={{ height: "70px" }}
            >
              <img
                src="/assets/images/sensibullLogo.svg"
                alt="Sensibull"
                style={{
                  maxWidth: "180px",
                  maxHeight: "60px",
                  objectFit: "contain",
                }}
              />
            </div>

            <p className="small text-muted">
              Options trading platform that lets you create strategies, analyze
              positions, and examine data points like open interest, FII/DII,
              and more.
            </p>
          </div>

          {/* InvestEdge Funds */}
          <div className="col-12 col-md-6 col-lg-4 p-4">
            <div
              className="d-flex align-items-center justify-content-center mb-4"
              style={{ height: "70px" }}
            >
              <img
                src="/assets/images/investedge-logo.svg"
                alt="InvestEdge Funds"
                style={{
                  maxWidth: "180px",
                  maxHeight: "60px",
                  objectFit: "contain",
                }}
              />
            </div>

            <p className="small text-muted">
              Our asset management venture that is creating simple and
              transparent index funds to help you save for your goals.
            </p>
          </div>

          {/* GoldenPi */}
          <div className="col-12 col-md-6 col-lg-4 p-4">
            <div
              className="d-flex align-items-center justify-content-center mb-4"
              style={{ height: "70px" }}
            >
              <img
                src="/assets/images/goldenpiLogo.png"
                alt="GoldenPi"
                style={{
                  maxWidth: "180px",
                  maxHeight: "60px",
                  objectFit: "contain",
                }}
              />
            </div>

            <p className="small text-muted">
              Invest in bonds and fixed-income products from one simple place.
            </p>
          </div>

          {/* Ditto */}
          <div className="col-12 col-md-6 col-lg-4 p-4">
            <div
              className="d-flex align-items-center justify-content-center mb-4"
              style={{ height: "70px" }}
            >
              <img
                src="/assets/images/dittoLogo.png"
                alt="Ditto"
                style={{
                  maxWidth: "180px",
                  maxHeight: "60px",
                  objectFit: "contain",
                }}
              />
            </div>

            <p className="small text-muted">
              Personalized advice on life and health insurance. No spam and no
              mis-selling.
            </p>
          </div>
        </div>

        <Link to="/signup" className="btn btn-primary px-4 py-2 mb-5 mt-4">
          Sign up for free
        </Link>
      </div>
    </div>
  );
}

export default Universe;
