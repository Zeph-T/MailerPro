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
import BackArrow from "../Assets/General/BackArrow.svg";

import MailIcon from "../Assets/General/FooterIcons/Mail.svg";
import LinkedinIcon from "../Assets/General/FooterIcons/Linkedin.svg";
import FacebookIcon from "../Assets/General/FooterIcons/Facebook.svg";

// Landing Page Assets
import UpperImage from "../Assets/LandingPage/UpperImage.svg";
import CircleDesignBlue from "../Assets/LandingPage/CircleDesignBlue.svg";
import CircleDesignYellow from "../Assets/LandingPage/CircleDesignYellow.svg";

export const LOGO_ICON = Logo;
export const BACK_ARROW_ICON = BackArrow;
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

export const MANAGE_CAMPAIGN_DATA = {
  createCampaign: "Create Campaign",
  manageCampaign: "Manage Campaign",
  back: "Back",
  next: "Next",
  steps: [
    {
      name: "Campaign Info",
      inputs: [
        {
          name: "campaignName",
          type: "text",
          placeholder: "Enter Campaign Name",
          required: true,
          label: "Campaign Name",
        },
        {
          name: "notes",
          type: "text",
          placeholder: "Enter description",
          required: false,
          label: "Notes",
        },
        {
          name: "subject",
          type: "text",
          placeholder: "Enter Subject",
          required: true,
          label: "Subject",
        },
        {
          name: "fromEmail",
          type: "email",
          placeholder: "Enter From Email",
          required: true,
          label: "From Email",
        },
        {
          name: "fromName",
          type: "text",
          placeholder: "Enter From Name",
          required: true,
          label: "From Name",
        },
        {
          name: "replyTo",
          type: "email",
          placeholder: "Enter Reply To",
          required: false,
          label: "Reply To",
        },
      ],
    },
    {
      name: "Design Email",
      chooseTemplate: "Choose Template",
    },
    {
      name: "Select Audience",
      options: [
        {
          name: "all",
          label: "To All Subscribers",
        },
        {
          name: "selected",
          label: "To Contact with particular Tags",
        },
      ],
      tags: "Tags",
      selectTags: "Select Tags",
    },
    {
      name: "Schedule",
      options: [
        {
          name: "immediately",
          label: "Send Now",
        },
        {
          name: "later",
          label: "Schedule for Later",
        },
      ],
      dateAndTime: "Date And Time (IST)",
      selectDateAndTime: "Select Date And Time",
    },
  ],
};

export const LANDING_PAGE_DATA = {
  navbar: {
    LOGO_ICON,
    loginText: "Login",
  },
  upperContainer: {
    UpperImage,
    CircleDesignBlue,
    CircleDesignYellow,
    BackArrow,
    title:
      "All in one platform, that assists in sending, managing and analyzing bulk emails and SMS.",
    button: "Get Started",
  },
};
