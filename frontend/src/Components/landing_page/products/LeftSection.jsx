function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <section className="container product-section">
      <div className="row align-items-center product-row">
        <div className="col-12 col-lg-6 product-media">
          <img src={imageURL} alt={productName} className="img-fluid product-image" />
        </div>

        <div className="col-12 col-lg-6 product-copy-column">
          <div className="product-copy">
            <h2>{productName}</h2>

            <p className="text-muted">{productDescription}</p>

            <div className="d-flex flex-wrap gap-4 product-links">
              {tryDemo && (
                <a href={tryDemo} className="text-decoration-none">
                  Try demo
                  <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </a>
              )}

              {learnMore && (
                <a href={learnMore} className="text-decoration-none">
                  Learn more
                  <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </a>
              )}
            </div>

            {(googlePlay || appStore) && (
              <div className="d-flex align-items-center flex-wrap gap-3 product-badges">
                {googlePlay && (
                  <a href={googlePlay}>
                    <img
                      src="/assets/images/googlePlayBadge.svg"
                      alt="Download on Google Play"
                    />
                  </a>
                )}

                {appStore && (
                  <a href={appStore}>
                    <img
                      src="/assets/images/appstoreBadge.svg"
                      alt="Download on the App Store"
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeftSection;
