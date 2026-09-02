function Hero() {
  return (
    <section className="container-fluid" id="supportHero">

      <div id="supportWrapper">
        <h4>Support Portal</h4>

        <a href="#" className="text-decoration-none">
          Track Tickets
        </a>
      </div>

      <div className="row m-0" id="searchRow">

        {/* Search Section */}
        <div className="col-12 col-lg-6 p-3 mb-3">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>

          <input
            className="mt-2"
            type="text"
            placeholder="Eg: how do i activate F&O, why is my order getting rejected.."
          />

          <div className="mt-4">
            <a href="#" className="me-3">
              Track account opening
            </a>

            <a href="#" className="me-3">
              Track segment activation
            </a>

            <a href="#" className="me-3">
              Intraday margins
            </a>

            <br />

            <a href="#">InvestEdge user manual</a>
          </div>
        </div>

        {/* Featured Section */}
        <div className="col-12 col-lg-6 p-3">
          <h3>Featured</h3>

          <ol>
            <li className="mb-3">
              <a href="#">
                Current Takeovers and Delisting - January 2024
              </a>
            </li>

            <li>
              <a href="#">
                Latest Intraday leverages - MIS &amp; CO
              </a>
            </li>
          </ol>
        </div>

      </div>
    </section>
  );
}

export default Hero;
