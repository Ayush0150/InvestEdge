function Brokerage() {
  return (
    <div className="container border-top mb-5">
      <div className="row py-5 mt-4">

        {/* Brokerage Information */}
        <div className="col-12 col-lg-8">
          <h3
            className="fs-4 mb-4"
            style={{ color: "#387ED1" }}
          >
            Brokerage calculator
          </h3>

          <ul className="text-muted lh-lg ps-4 mb-0">
            <li className="mb-3">
              Call & Trade and RMS auto-squareoff: Additional charges of ₹50 +
              GST per order.
            </li>

            <li className="mb-3">
              Digital contract notes will be sent via e-mail.
            </li>

            <li className="mb-3">
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>

            <li className="mb-3">
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>

            <li className="mb-3">
              For NRI account (PIS), 0.5% or ₹200 per executed order for
              equity (whichever is lower).
            </li>

            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>

        {/* List of Charges */}
        <div className="col-12 col-lg-4 mt-5 mt-lg-0">
          <h3
            className="fs-4 mb-4 ms-5"
            style={{ color: "#387ED1" }}
          >
            List of charges
          </h3>
        </div>

      </div>
    </div>
  );
}

export default Brokerage;
