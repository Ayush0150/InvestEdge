function Pricing() {
  return (
    <div className="container p-3">
      <div className="row p-5">
        <div className="col-4">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See Pricing <i className="fa-solid fa-arrow-right-long"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6 mb-5">
          <div className="row text-center">
            <div className="col p-4 border">
              <h1 className="mb-3">₹0</h1>
              <p>
                Free equity delivery and <br /> direct mutual funds
              </p>
            </div>
            <div className="col p-4 border">
              <h1 className="mb-3">₹20</h1>
              <p>Intraday and F&Q</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
