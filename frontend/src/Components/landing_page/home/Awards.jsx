function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5">
          <img src="/assets/images/largestBroker.svg" alt="" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>Modern trading platform for India</h1>
          <p className="mb-5">
            InvestEdge gives users a simple way to explore trading workflows,
            portfolio insights, and order management in one full-stack platform.
            The experience is designed around everyday investing needs:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks and IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>
          <img src="/assets/images/pressLogos.png" alt="market coverage logos" style={{width: "90%"}}/>
        </div>
      </div>
    </div>
  );
}

export default Awards;
