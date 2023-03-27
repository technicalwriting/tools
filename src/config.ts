import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://technicalwriting.tools",
  author: "Kayce Basques",
  desc: "TOOLS",
  title: "technicalwriting.tools",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: false,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/kaycebasques",
    linkTitle: `Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/kaycebasques",
    linkTitle: `LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:admin@technicalwriting.tools",
    linkTitle: `Email`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/kaycebasques",
    linkTitle: `Twitter`,
    active: true,
  },
  {
    name: "Reddit",
    href: "https://reddit.com/u/kaycebasques",
    linkTitle: `Reddit`,
    active: true,
  }
];
