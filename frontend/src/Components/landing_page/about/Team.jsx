function Team() {
  return (
    <div className="container">
      <div className="row border-top mt-5 pt-5">
        <div className="col text-center">
          <h1 className="fs-2 mb-0">People</h1>
        </div>
      </div>
      <div
        className="row align-items-center py-5 mt-4"
        style={{
          lineHeight: "1.8",
          fontSize: "1.05rem",
        }}
      >
        <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
          <img
            src="/assets/images/profile.png"
            alt="Ayush Rai"
            className="img-fluid"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <h4 className="mt-4 mb-2">Ayush Rai</h4>
          <p className="text-muted mb-0">Full-Stack Developer</p>
        </div>
        <div className="col-12 col-md-7 text-muted">
          <p>
            Ayush Rai built InvestEdge as a full-stack trading platform to
            demonstrate practical experience with modern frontend development,
            REST APIs, authentication, and database-backed financial workflows.
          </p>
          <p>
            The application includes account signup and login, JWT-protected
            dashboard routes, holdings, positions, funds, orders, and a clean
            interface inspired by real investment products.
          </p>
          <p>
            The project reflects a focus on building production-style user
            experiences with React, Node.js, Express, and MongoDB.
          </p>
          <p className="mb-0">
            Connect on{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              Homepage
            </a>{" "}
            /{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              GitHub
            </a>{" "}
            /{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Team;
