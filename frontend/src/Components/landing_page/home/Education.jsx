function Education() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img
            src="/assets/images/education.svg"
            alt="education"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-6">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p className="text-muted">
            LearnEdge, an open stock market education hub covering everything
            from the basics to advanced trading.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            LearnEdge <i className="fa-solid fa-arrow-right-long"></i>
          </a>
          <p className="text-muted mt-5">
            Investor Q&A, a community-style space for market-related questions
            and practical investing discussions.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            Investor Q&A <i className="fa-solid fa-arrow-right-long"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
