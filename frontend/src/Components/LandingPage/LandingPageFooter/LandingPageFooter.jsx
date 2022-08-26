import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { LOGO_ICON as logo } from "../../../Utils/staticData";
import { LANDING_PAGE_DATA } from "../../../Utils/staticData";
import ImageStackComponent from "./Helpers/ImageStackComponent";
import Styles from "./LandingPageFooter.module.css";

const contactLinks = LANDING_PAGE_DATA.footer.contactLinks;

const Company = ["Who We Are", "Careers", "Team", "Report Fraud"];
const CompanyRoutes = ["", "", "", ""];
const Legal = [
  "Terms & Conditions",
  "Refund & Cancellation",
  "Privacy Policy",
  "Cookie Policy",
  "Offer Terms",
];
const LegalRoutes = ["", "", "", "", ""];
const Support = ["help@mailerpro.abc", "(+91) 1234567890", "(+91) 1234567891"];
const SupportHrefs = [
  "mailto:help@abc.xyz",
  "tel:+911234567890",
  "tel:+911234567891",
];
const SocialMediaIcons = ["Linkedin", "Facebook", "Instagram"];

const CompanyList = Company.map((General, index) => {
  return (
    <li key={index}>
      <Link to={`${CompanyRoutes[index]}`}>{General}</Link>
    </li>
  );
});
const LegalList = Legal.map((Browse, index) => {
  return (
    <li key={index}>
      <Link to={`${LegalRoutes[index]}`}>{Browse}</Link>
    </li>
  );
});
const SupportList = Support.map((Support, index) => {
  return (
    <li key={index}>
      <a href={`${SupportHrefs[index]}`}>{Support}</a>
    </li>
  );
});
const SocialMediaIconsList = SocialMediaIcons.map(
  (SocialMediaIconName, index) => {
    return (
      <ImageStackComponent
        key={index}
        link={"http://localhost:3000/"}
        normalDisplay={LANDING_PAGE_DATA.footer[`${SocialMediaIconName}`]}
        hoverDisplay={LANDING_PAGE_DATA.footer[`${SocialMediaIconName}H`]}
        iconsClass={Styles.Icons}
        iconsWrapperClass={Styles.IconsSubWrapper}
      />
    );
  }
);

function LandingPageFooter() {
  const footerCompanyLinksRef = useRef(12);
  const footerLegalLinksRef = useRef(123);
  const footerSupportLinksRef = useRef(1234);

  function handleFooterLinkTitleClick(ref) {
    if (ref?.current) {
      if (window.getComputedStyle(ref.current).height === "50px") {
        ref.current.style.height = ref.current.scrollHeight + "px";
        ref.current.childNodes[0].childNodes[1].style.transform =
          "rotate(180deg)";
      } else {
        ref.current.style.height = "50px";
        ref.current.childNodes[0].childNodes[1].style.transform =
          "rotate(0deg)";
      }
    }
  }

  return (
    <footer className={Styles.Wrapper}>
      <div className={Styles.UpperContainer}>
        <div className={Styles.Links}>
          <div ref={footerCompanyLinksRef}>
            <span
              onClick={(e) => {
                handleFooterLinkTitleClick(footerCompanyLinksRef);
              }}
            >
              Company
            </span>
            <ul>{CompanyList}</ul>
          </div>
          <div ref={footerLegalLinksRef}>
            <span
              onClick={(e) => {
                handleFooterLinkTitleClick(footerLegalLinksRef);
              }}
            >
              Legal
            </span>
            <ul>{LegalList}</ul>
          </div>
          <div ref={footerSupportLinksRef}>
            <span
              onClick={(e) => {
                handleFooterLinkTitleClick(footerSupportLinksRef);
              }}
            >
              Support
            </span>
            <ul>{SupportList}</ul>
          </div>
        </div>
      </div>

      <div className={Styles.LowerContainer}>
        <div className={Styles.CompanyLogoWrapper}>
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
          <div className={Styles.Copyright}>Copyright (c) 2022</div>
        </div>
        <div className={Styles.IconsWrapper}>
          <div
            style={{
              display: "flex",
            }}
          >
            {SocialMediaIconsList}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LandingPageFooter;
