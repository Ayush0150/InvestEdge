function Hero() {
  return (
    <div className="container">

      {/* Hero Heading */}
      <div className="row mt-5 py-5">
        <div className="col text-center">
          <h1 className="fs-2">
            InvestEdge brings trading, portfolio tracking, and analytics
            <br />
            together in a clean full-stack investing experience.
          </h1>
        </div>
      </div>

      {/* About Section */}
      <div
        className="row border-top py-5 mt-4"
        style={{
          lineHeight: "1.8",
          fontSize: "1.05rem",
        }}
      >
        {/* Left Content */}
        <div className="col-12 col-md-6 px-4 px-md-5">
          <p>
            InvestEdge was built as a modern stock trading platform focused on
            the workflows that matter most to investors: account access,
            holdings, positions, funds, orders, and portfolio summaries.
          </p>

          <p>
            The platform combines a polished React landing experience with a
            protected trading dashboard powered by Node.js, Express, MongoDB,
            and JWT authentication.
          </p>

          <p>
            The goal is to demonstrate practical product engineering:
            responsive UI, reusable components, backend APIs, secure sessions,
            and a realistic trading-style user journey.
          </p>
        </div>

        {/* Right Content */}
        <div className="col-12 col-md-6 px-4 px-md-5">
          <p>
            InvestEdge keeps the experience simple for users while still
            covering the important pieces of a brokerage-style application.
          </p>

          <p>
            <a
              href="#"
              className="text-decoration-none"
            >
              InvestEdge Labs
            </a>
            , our product and engineering space, focuses on improving the
            platform with better analytics, usability, and learning-friendly
            investment tools.
          </p>

          <p>
            The project is designed as a portfolio-ready fintech application
            that can continue growing with features like watchlists, charts,
            transaction history, and richer market data integrations.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Hero;
