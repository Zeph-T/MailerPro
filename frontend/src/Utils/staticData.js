import Home from "../Assets/General/NavIcons/Home.svg";
import Settings from "../Assets/General/NavIcons/Settings.svg";
import Directory from "../Assets/General/NavIcons/Directory.svg";
import Campaign from "../Assets/General/NavIcons/Campaign.svg";
import HomeActive from "../Assets/General/NavIcons/HomeActive.svg";
import SettingsActive from "../Assets/General/NavIcons/SettingsActive.svg";
import DirectoryActive from "../Assets/General/NavIcons/DirectoryActive.svg";
import CampaignActive from "../Assets/General/NavIcons/CampaignActive.svg";
import MenuIcon from "../Assets/General/Menu.svg";
import Logo from "../Assets/General/Logo.svg";

import MailIcon from "../Assets/General/FooterIcons/Mail.svg";
import LinkedinIcon from "../Assets/General/FooterIcons/Linkedin.svg";
import FacebookIcon from "../Assets/General/FooterIcons/Facebook.svg";

export const LOGO_ICON = Logo;
export const NAVBAR_DATA = {
  menuIcon: MenuIcon,
  navLinks: [
    {
      name: "Home",
      icon: Home,
      iconActive: HomeActive,
      path: "/dashboard",
    },
    {
      name: "Directory",
      icon: Directory,
      iconActive: DirectoryActive,
      path: "/directory",
    },
    {
      name: "Campaign",
      icon: Campaign,
      iconActive: CampaignActive,
      path: "/campaign",
    },
    {
      name: "Settings",
      icon: Settings,
      iconActive: SettingsActive,
      path: "/settings",
    },
  ],
};

export const FOOTER_DATA = {
  links: [
    {
      name: "Mail",
      icon: MailIcon,
      path: "mailto:",
    },
    {
      name: "Linkedin",
      icon: LinkedinIcon,
      path: "https://www.linkedin.com/",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      path: "https://www.facebook.com/",
    },
  ],
  privacyPolicy: "Privacy Policy",
  termsOfUse: "Terms of Use",
  copyright: "Copyright © 2020",
};
