const connectedApps = [
  {
    name: "Console",
    logo: "/images/apps/console-logo.png",
    description: "Track portfolio reports, tax P&L, tradebook, and account statements.",
    status: "Connected",
  },
  {
    name: "Coin",
    logo: "/images/apps/coin-logo.png",
    description: "Explore direct mutual funds and long-term SIP investments.",
    status: "Available",
  },
  {
    name: "Varsity",
    logo: "/images/apps/varsity-logo.png",
    description: "Learn market basics, trading concepts, and investing modules.",
    status: "Learning",
  },
  {
    name: "Streak",
    logo: "/images/apps/streakLogo.png",
    description: "Create strategy ideas and backtest trades without writing code.",
    status: "Available",
  },
  {
    name: "Smallcase",
    logo: "/images/apps/smallcaseLogo.png",
    description: "Discover theme-based stock baskets for model portfolio ideas.",
    status: "Available",
  },
  {
    name: "Sensibull",
    logo: "/images/apps/sensibullLogo.svg",
    description: "Analyze options strategies, payoff graphs, and risk scenarios.",
    status: "Available",
  },
];

const Apps = () => {
  return (
    <>
      <h3 className="title">Apps</h3>

      <div className="apps-page">
        <div className="apps-header">
          <div>
            <h4>Trading tools</h4>
            <p>Quick access to companion tools for reports, learning, strategy, and investing.</p>
          </div>
        </div>

        <div className="apps-grid">
          {connectedApps.map((app) => {
            return (
              <div className="app-card" key={app.name}>
                <div className="app-card-top">
                  <div className="app-icon">
                    <img src={app.logo} alt={`${app.name} logo`} />
                  </div>
                  <span>{app.status}</span>
                </div>

                <h5>{app.name}</h5>
                <p>{app.description}</p>

                <button className="app-button">Open</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Apps;
