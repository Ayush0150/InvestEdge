function Hero() {
  return (
    <div className="container border-bottom">
      <div className="row p-5 mt-5 py-5 border-bottom text-center">
        <h1>Pricing</h1>
        <h3 className="text-muted fs-5 mt-5">
          Free equity investments and flat ₹20 intraday and F&O trades
        </h3>
      </div>
      <div className="row py-5 text-center g-4 p-5">
        <div className="col-12 col-md-6 col-lg-4 p-5">
          <img src="/assets/images/pricingEquity.svg" alt="0" />
          <h2>Free equity delivery</h2>
          <p className="text-muted small">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 p-5">
          <img src="/assets/images/intradayTrades.svg" alt="0" />
          <h2>Intraday and F&O trades</h2>
          <p className="text-muted small">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 p-5">
          <img src="/assets/images/pricingEquity.svg" alt="0" />
          <h2>Free direct MF</h2>
          <p className="text-muted small">
            All direct mutual fund investments are absolutely free — <br />₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
