function RightSection({ imageURL, productName, productDescription, learnMore }) {
  return (
    <section className="container product-section">
      <div className="row align-items-center product-row">
        <div className="col-12 col-lg-6 product-copy-column order-2 order-lg-1">
          <div className="product-copy">
            <h2>{productName}</h2>

            <p className="text-muted">{productDescription}</p>

            {learnMore && (
              <div className="d-flex flex-wrap gap-4 product-links">
                <a href={learnMore} className="text-decoration-none">
                  Learn more
                  <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-6 product-media order-1 order-lg-2">
          <img src={imageURL} alt={productName} className="img-fluid product-image" />
        </div>
      </div>
    </section>
  );
}

export default RightSection;
