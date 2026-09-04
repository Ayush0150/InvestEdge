import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top"
      style={{ backgroundColor: "rgb(250, 250, 250)" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="/assets/images/investedge-logo.svg"
            alt="InvestEdge"
            style={{ width: "170px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav ms-auto mb-2 mb-lg-0"
            style={{ fontSize: "15px" }}
          >
            <li className="nav-item">
              <Link
                className="nav-link active text-muted"
                aria-current="page"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-muted" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-muted" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-muted" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-muted" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-muted" to="/support">
                Support
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-muted" to="#">
                <i className="fa-solid fa-bars"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
