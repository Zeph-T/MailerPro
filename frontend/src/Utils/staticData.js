import Home from "../Assets/General/NavIcons/Home.svg";
import Settings from "../Assets/General/NavIcons/Settings.svg";
import Directory from "../Assets/General/NavIcons/Directory.svg";
import Campaign from "../Assets/General/NavIcons/Campaign.svg";
import Templates from "../Assets/General/NavIcons/Templates.svg";
import HomeActive from "../Assets/General/NavIcons/HomeActive.svg";
import SettingsActive from "../Assets/General/NavIcons/SettingsActive.svg";
import DirectoryActive from "../Assets/General/NavIcons/DirectoryActive.svg";
import CampaignActive from "../Assets/General/NavIcons/CampaignActive.svg";
import TemplatesActive from "../Assets/General/NavIcons/TemplatesActive.svg";
import MenuIcon from "../Assets/General/Menu.svg";
import Logo from "../Assets/General/Logo.svg";
import BackArrow from "../Assets/General/BackArrow.svg";
import CrossIcon from "../Assets/General/Cross.svg";

import MailIcon from "../Assets/General/FooterIcons/Mail.svg";
import LinkedinIcon from "../Assets/General/FooterIcons/Linkedin.svg";
import FacebookIcon from "../Assets/General/FooterIcons/Facebook.svg";

// Landing Page Assets
import UpperImage from "../Assets/LandingPage/UpperImage.svg";
import CircleDesignBlue from "../Assets/LandingPage/CircleDesignBlue.svg";
import CircleDesignYellow from "../Assets/LandingPage/CircleDesignYellow.svg";
import MiddleImage from "../Assets/LandingPage/MiddleImage.svg";
import EllipseImage from "../Assets/LandingPage/EllipseImage.svg";
import MiddleDots from "../Assets/LandingPage/MiddleDots.svg";
import Facebook from "../Assets/LandingPage/Footer/Icons/Facebook.svg";
import FacebookH from "../Assets/LandingPage/Footer/Icons/FacebookH.svg";
import Instagram from "../Assets/LandingPage/Footer/Icons/Instagram.svg";
import InstagramH from "../Assets/LandingPage/Footer/Icons/InstagramH.svg";
import Linkedin from "../Assets/LandingPage/Footer/Icons/Linkedin.svg";
import LinkedinH from "../Assets/LandingPage/Footer/Icons/LinkedinH.svg";

export const LOGO_ICON = Logo;
export const BACK_ARROW_ICON = BackArrow;
export const CROSS_ICON = CrossIcon;
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
      name: "Templates",
      icon: Templates,
      iconActive: TemplatesActive,
      path: "/templates",
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
  middleContainer: {
    MiddleImage,
    EllipseImage,
    MiddleDots,
    title: "Send Customized emails to your contacts.",
  },
  footer: {
    Facebook,
    FacebookH,
    Instagram,
    InstagramH,
    Linkedin,
    LinkedinH,
    contactLinks: {
      Facebook: "https://www.facebook.com/",
      Linkedin: "https://www.linkedin.com/",
      Instagram: "https://www.instagram.com/",
    },
  },
};

export const SIGN_IN_DATA = {
  title: "Sign In",
  bottomContent: {
    upperText: {
      title: "Don't have an account?",
      link: "Sign Up",
      linkTo: "/signup",
    },
    bottomText: {
      title: "By clicking on Continue, you agree to IndieFoods's",
      link: "Terms of Service",
      link2: " Privacy Policy",
      linkTo: "/terms",
      linkTo2: "/privacy",
    },
  },
};

export const SIGN_UP_DATA = {
  title: "Sign Up",
  bottomContent: {
    upperText: {
      title: "Already have an account?",
      link: "Sign In",
      linkTo: "/signin",
    },
    bottomText: {
      title: "By signing up you agree to IndieFoods's",
      link: "Terms of Service",
      link2: " Privacy Policy",
      linkTo: "/terms",
      linkTo2: "/privacy",
    },
  },
};

export const TEMPLATES_PAGE_DATA = {
  title: "Templates",
  tabs: [
    {
      label: "Email",
      value: "email",
    },
    {
      label: "SMS",
      value: "sms",
    },
  ],
  navButtons: {
    createSMSTemplate: "Create SMS Template",
    createEmailTemplate: "Create Email Template",
  },
};

export const MANAGE_TEMPLATE_DATA = {
  createTemplate: "Create Email Template",
  manageTemplate: "Edit Email Template",
  design: "Design",
  save: "Save",
  tabs: [
    {
      label: "Text Editor",
      value: "textEditor",
    },
    {
      label: "Drag & Drop",
      value: "dragDrop",
    },
  ],
  inputs: {
    name: {
      name: "templateName",
      type: "text",
      placeholder: "Enter Template Name",
      required: true,
      label: "Template Name",
      fullWidth: true,
    },
  },
};

export const MANAGE_TAGS_POPUP_DATA = {
  title: "Tags",
  header: ["Name", "Contacts"],
  buttons: ["Add New", "Save", "Discard"],
};

export const CAMPAIGN_INSIGHTS_POPUP_DATA = {
  title: "Campaign Insights",
  header: ["Name", "Contacts"],
  buttons: ["Add New", "Save", "Discard"],
  filterOptions: [
    { label: "Opens", value: "opens" },
    { label: "Clicks", value: "clicks" },
    { label: "Bounces", value: "bounces" },
    { label: "Unsubscribes", value: "unsubscribes" },
  ],
  navButtons: {
    createSMSTemplate: "Create SMS Template",
    createEmailTemplate: "Create Email Template",
  },
};

export const DASHBOARD_DATA = {
  RecentActivities : "Recent Activities",
  RecentActivitiesSubText : "Subscriber additions in the period",
  subscriberData: [
    {
      date:"21 August,2022",
      subscribers: "13000"
    },
    {
      date:"22 August,2022",
      subscribers: "11000"
    },
    {
      date:"23 August,2022",
      subscribers: "15000"
    },
    {
      date:"24 August,2022",
      subscribers: "12000"
    },
    {
      date:"25 August,2022",
      subscribers: "13000"
    },
    {
      date:"26 August,2022",
      subscribers: "9000"
    },
    {
      date:"27 August,2022",
      subscribers: "17000"
    },
    {
      date:"28 August,2022",
      subscribers: "8000"
    },
    {
      date:"29 August,2022",
      subscribers: "12500"
    },
  ]
}
