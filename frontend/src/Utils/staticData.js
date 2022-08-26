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
      name: "Templates",
      icon: Templates,
      iconActive: TemplatesActive,
      path: "/templates",
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
  copyright: "Copyright © 2022",
};

export const MANAGE_CAMPAIGN_DATA = {
  createCampaign: "Create Campaign",
  manageCampaign: "Manage Campaign",
  back: "Back",
  next: "Next",
  save: "Save",
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
          name: "ALL",
          label: "To All Subscribers",
        },
        {
          name: "TAGS",
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
      value: "EMAIL",
    },
    {
      label: "SMS",
      value: "SMS",
    },
  ],
  navButtons: {
    createSMSTemplate: "Create SMS Template",
    createEmailTemplate: "Create Email Template",
  },
};

export const DIRECTORY_PAGE_DATA = {
  title: "Directory",
  subtitle: "All your subscribers in one happy place",
  navButtons: {
    manageTags: "Manage tags",
    importContacts: "Import Contacts from File",
    addContact: "Add Contact",
    manageCustomFields: "Manage Custom Fields",
  },
  highlightsData: [
    {
      label: "Total Subscribers",
      accessor: "total",
      resultColor: "var(--primary-blue)",
      backgroundColor: "var(--primary-background)",
    },
    // {
    //   label: "Inactive Contacts",
    //   accessor: "inactive",
    //   resultColor: "var(--inactive-yellow)",
    // },
    {
      label: "Unsubscribed Contacts",
      accessor: "unsubscribed",
      resultColor: "var(--primary-orange)",
      backgroundColor: "var(--background-oragne)",
    },
  ],
  tableData: [
    {
      label: "Contact",
      renderer: (val) => val.email || val.phone,
      width: "25%",
    },
    {
      label: "Tags",
      renderer: (val) =>
        val.tags.length > 0 ? val.tags.map((tag) => tag.name).join(", ") : "-",
      width: "25%",
    },
    {
      label: "Status",
      renderer: (val) => val.status,
      width: "20%",
    },
    {
      label: "Added",
      renderer: (val) => new Date(val.createdOn).toLocaleDateString(),
      width: "20%",
    },
    {
      label: "Updated",
      renderer: (val) => new Date(val.updatedOn).toLocaleDateString(),
      width: "20%",
    },
  ],
};

export const MANAGE_TEMPLATE_DATA = {
  createTemplate: "Create Email Template",
  manageTemplate: "Edit Email Template",
  createSMSTemplate: "Create SMS Template",
  manageSMSTemplate: "Edit SMS Template",
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
  content: "Content",
  addContent: "Add Content",
};

export const MANAGE_TAGS_POPUP_DATA = {
  title: "Tags",
  header: ["Name", "Contacts"],
  buttons: ["Add New", "Save", "Discard"],
};

export const MANAGE_CUSTOM_FIELDS_POPUP_DATA = {
  title: "Custom Fields",
  labels: {
    type: "Type",
    name: "Name",
  },
  buttons: {
    add: "Add New",
    save: "Save",
    discard: "Discard",
  },
  typeOptions: [
    {
      label: "Text",
      value: "Text",
    },
    {
      label: "Number",
      value: "Number",
    },
    {
      label: "Date",
      value: "Date",
    },
  ],
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
  RecentActivities: "Recent Activities",
  RecentActivitiesSubText: "Subscriber additions in the period",
  MailerPro:
    "MailerPro is a web platform, that assists in sending, managing and analyzing bulk emails and SMS. You can easily send highly customized mails to your contacts. A Huge amount of information can be sent to a large audience with better segregation and categorization using our tags functionality. You will be provided with templates and you can easily create one using our drag and drop editor. You can also import contacts from a CSV file. We provide statistics on the number of opens, clicks, bounces and unsubscribes. You can also manage your tags and custom fields.",
  subscriberData: [
    {
      date: "21 August,2022",
      subscribers: "13000",
    },
    {
      date: "22 August,2022",
      subscribers: "11000",
    },
    {
      date: "23 August,2022",
      subscribers: "15000",
    },
    {
      date: "24 August,2022",
      subscribers: "12000",
    },
    {
      date: "25 August,2022",
      subscribers: "13000",
    },
    {
      date: "26 August,2022",
      subscribers: "9000",
    },
    {
      date: "27 August,2022",
      subscribers: "17000",
    },
    {
      date: "28 August,2022",
      subscribers: "8000",
    },
    {
      date: "29 August,2022",
      subscribers: "12500",
    },
  ],
  unSubscriberData: [
    {
      date: "21 August,2022",
      subscribers: "10000",
    },
    {
      date: "22 August,2022",
      subscribers: "3300",
    },
    {
      date: "23 August,2022",
      subscribers: "3000",
    },
    {
      date: "24 August,2022",
      subscribers: "5000",
    },
    {
      date: "25 August,2022",
      subscribers: "6000",
    },
    {
      date: "26 August,2022",
      subscribers: "100",
    },
    {
      date: "27 August,2022",
      subscribers: "1000",
    },
    {
      date: "28 August,2022",
      subscribers: "2000",
    },
    {
      date: "29 August,2022",
      subscribers: "12000",
    },
  ],
};

export const ADD_CONTACTS_POPUP_DATA = {
  title: "Add Contact",
  titleUpdate: "Update Contact",
  inputType: [
    [
      {
        name: "email",
        label: "Email",
        type: "email",
      },
      {
        name: "fname",
        label: "First Name",
        type: "text",
      },
      {
        name: "mname",
        label: "Middle Name",
        type: "text",
      },
      {
        name: "phone",
        label: "Mobile Number",
        type: "number",
      },
      {
        name: "lname",
        label: "Last Name",
        type: "text",
      },
    ],
    [
      {
        name: "dob",
        label: "Date Of Birth",
        type: "date",
      },
      {
        name: "status",
        label: "Status",
        options: [
          {
            value: "Subscribed",
            label: "Subscribed",
            color: "var(--subscribed-green)",
          },
          {
            value: "Unsubscribed",
            label: "Unsubscribed",
            color: "var(--unsubscribed-red)",
          },
        ],
      },
      {
        name: "tags",
        label: "Tags",
        options: [
          {
            value: "coffeeLover",
            label: "Coffee Lover",
          },
          {
            value: "teaLover",
            label: "Tea Lover",
          },
          {
            value: "milkLover",
            label: "Milk Lover",
          },
        ],
      },
    ],
  ],
  button: "Create",
  buttonDetails: ["Add Field", "Save", "Cancel"],
};
export const UPLOAD_FILE_POPUP_DATA = {
  title: "Upload Contacts",
  selectTags: "Select Tags to add (optional)",
  buttons: {
    upload: "Upload",
  },
};

export const CAMPAIGN_DATA = {
  title: "Campaign",
  subTitle: "Schedule one-time newsletters, updates and invites",
  createSMSCampaign: "Create SMS Campaign",
  createEmailCampaign: "Create Email Campaign",
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
  tableData: [
    {
      label: "Name",
      renderer: (val) => val.name,
      width: "25%",
      align: "left",
    },
    {
      label: "Status",
      renderer: (val) => val.status,
      width: "7%",
      align: "left",
    },
    {
      label: "Sent",
      renderer: (val) => (val.stats ? val.stats.sent : "-"),
      width: "7%",
      align: "left",
    },
    {
      label: "Fail",
      renderer: (val) =>
        val.stats ? (val.stats.fail ? val.stats.fail : 0) : "-",
      width: "30%",
      align: "left",
    },
    {
      label: "Opens",
      renderer: (val) => (val.stats ? val.stats.open : "-"),
      width: "10%",
      align: "center",
    },
    {
      label: "Clicks",
      renderer: (val) => (val.stats ? val.stats.click : "-"),
      width: "10%",
      align: "center",
    },
    {
      label: "Bounces",
      renderer: (val) => (val.stats ? val.stats.bounce : "-"),
      width: "10%",
      align: "center",
    },
    {
      label: "Unsubscribes",
      renderer: (val) => (val.stats ? val.stats.unsubscribe : "-"),
      width: "10%",
      align: "right",
    },
  ],
  tableDataSMS: [
    {
      label: "Name",
      renderer: (val) => val.name,
      width: "25%",
      align: "left",
    },
    {
      label: "Status",
      renderer: (val) => val.status,
      width: "30%",
      align: "center",
    },
    {
      label: "Sent",
      renderer: (val) => (val.stats ? val.stats.sent : "-"),
      width: "7%",
      align: "center",
    },
    {
      label: "Fail",
      renderer: (val) =>
        val.stats ? (val.stats.fail ? val.stats.failed : 0) : "-",
      width: "7%",
      align: "center",
    },
    {
      label: "Queued",
      renderer: (val) => (val.stats ? val.stats.queued : "-"),
      width: "6%",
      align: "right",
    },
  ],
};

export const SETTINGS_PAGE_DATA = {
  title: "Settings",
  logOut: "Log Out",
  sectionList: [
    {
      title: "Personal Details",
      inputRequired: [
        {
          name: "name",
          label: "Name",
          type: "text",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
        },
      ],
      buttons: "Save Personal Details",
    },
    {
      title: "Unsubscription Message",
      inputRequired: [
        {
          name: "unSubscriptionForm",
          label: "Description",
          type: "text",
        },
      ],
      buttons: "Save Form Info",
    },
    {
      title: "Change Password",
      inputRequired: [
        {
          name: "password",
          label: "Password",
          type: "password",
        },
        {
          name: "newPassword",
          label: "New Password",
          type: "password",
        },
        {
          name: "newConfirmPassword",
          label: "Confirm Password",
          type: "password",
        },
      ],
      buttons: "Update Password",
    },
    {
      title: "Add New Admin",
      inputRequired: [
        {
          name: "adminEmail",
          label: "Admin Email",
          type: "email",
        },
      ],
      buttons: "Add New Admin",
    },
    {
      title: "Remove Admin",
      inputRequired: [
        {
          name: "removeAdmin",
          label: "Remove Admin",
          type: "email",
          select: true,
        },
      ],
      buttons: "Remove Admin",
    },
  ],
};
