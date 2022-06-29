import { useRef } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import useIsInViewport from "../../hooks/useInViewPort";

function Home() {
  const block = "main";

  const divShopperRef = useRef();
  const divFinancialRef = useRef();

  const onViewDivShoppers = useIsInViewport(divShopperRef);
  const onViewDivFinancial = useIsInViewport(divFinancialRef);

  return (
    <>
      <header className="header">
        <Navbar />

        <div className="hero-card">
          <p className="hero-card__text">See if you are approved</p>
          <h2 className="hero-card__title">
            Don't miss out on the opportunity to join the greatest bank
          </h2>
          <p className="hero-card__sub-text">
            See all the benefits of our products and be amazed
          </p>
          <NavLink to="create_account" className="hero-card__btn">
            Open Account
          </NavLink>
        </div>
      </header>

      <main className={`${block}`} role="main">
        <section className={`${block}__callout`}>
          <div className={`${block}__callout-container`}>
            <div className={`${block}__callout-content`}>
              <img
                alt="Easy access to your money"
                className={`${block}__callout-img`}
                src="https://acortar.link/ir2rXn"
              />
              <h2 className={`${block}__callout-title`}>
                Easy access to your account
              </h2>
              <p className={`${block}__callout-text`}>
                Check your banking information anywhere, anytime.
              </p>
            </div>

            <div className={`${block}__callout-content`}>
              <img
                alt="Check out our account types"
                className={`${block}__callout-img`}
                src="https://acortar.link/z3gbBZ"
              />
              <h2 className={`${block}__callout-title`}>Bank accounts</h2>
              <p className={`${block}__callout-text`}>
                Checking? Savings? CDs? Teens? Kids? We've got you covered.
              </p>
            </div>

            <div className={`${block}__callout-content`}>
              <img
                alt="Before you buy your car"
                className={`${block}__callout-img`}
                src="https://acortar.link/kIsXVt"
              />
              <h2 className={`${block}__callout-title`}>Easier car buying</h2>
              <p className={`${block}__callout-text`}>
                Pre-qualify to see your real rate and payment before visiting
                the dealer.
              </p>
            </div>
          </div>
        </section>

        <section className={`${block}__benefits`}>
          <h2 className={`${block}__benefits-title`}>Why us?</h2>
          <div
            ref={divShopperRef}
            className={
              onViewDivShoppers
                ? `${block}__benefits-content animate`
                : `${block}__benefits-content`
            }
          >
            <div className={`${block}__benefits-img`}>
              <img alt="" src="https://i.imgur.com/l7fbBP6.png" />
            </div>
            <div className={`${block}__benefits-text`}>
              <h4>Deals for shoppers</h4>
              <p className={`${block}__benefits-headline`}>
                Automatically get better deals when you shop online
              </p>
              <p className={`${block}__benefits-description`}>
                Use our free tool that instantly searches for savings and
                applies them to your cart
              </p>
            </div>
          </div>

          <div
            ref={divFinancialRef}
            className={
              onViewDivFinancial
                ? `${block}__benefits-content reverse animate`
                : `${block}__benefits-content reverse`
            }
          >
            <div className={`${block}__benefits-img`}>
              <img alt="" src="https://i.imgur.com/D4FU2us.png" />
            </div>
            <div className={`${block}__benefits-text`}>
              <h4>Financial wellness</h4>
              <p className={`${block}__benefits-headline`}>
                Show off your credit score
              </p>
              <p className={`${block}__benefits-description`}>
                Our clients get exclusive access to credit score information on
                all our platforms
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
