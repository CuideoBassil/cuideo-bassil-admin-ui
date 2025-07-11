import {
  Categories,
  Coupons,
  Invoice,
  Leaf,
  Orders,
  Pages,
  Products,
  Profile,
  Reviews,
  Sales,
  Setting,
  StuffUser,
  Type,
} from "@/svg";
import { ISidebarMenus } from "./../types/menu-types";

const sidebar_menu: Array<ISidebarMenus> = [
  // {
  //   id: 1,
  //   icon: Dashboard,
  //   link: "/dashboard",
  //   title: "Dashboard",
  // },
  {
    id: 1,
    icon: Products,
    link: "/product-list",
    title: "Products",
    subMenus: [
      { title: "Product List", link: "/product-list" },
      // { title: "Product Grid", link: "/product-grid" },
      { title: "Add Product", link: "/add-product" },
    ],
  },
  {
    id: 2,
    icon: Sales,
    link: "/featured",
    title: "Featured",
  },
  {
    id: 3,
    icon: Invoice,
    link: "/delivery-districts",
    title: "Delivery Districts",
  },
  {
    id: 4,
    icon: Type,
    link: "/product-types",
    title: "Products Types",
  },
  {
    id: 5,
    icon: Categories,
    link: "/category",
    title: "Categories",
  },

  {
    id: 6,
    icon: Leaf,
    link: "/brands",
    title: "Brands",
  },
  {
    id: 6,
    icon: Reviews,
    link: "/reviews",
    title: "Reviews",
  },
  {
    id: 7,
    icon: Coupons,
    link: "/tags",
    title: "Tags",
  },
  // // {
  //   id: 7,
  //   icon: Coupons,
  //   link: "/coupon",
  //   title: "Coupons",
  // },
  {
    id: 8,
    icon: Orders,
    link: "/orders",
    title: "Orders",
  },
  {
    id: 9,
    icon: Profile,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 10,
    icon: Setting,
    link: "#",
    title: "Online store",
  },
  {
    id: 11,
    icon: StuffUser,
    link: "/our-staff",
    title: "Our Staff",
  },
  {
    id: 12,
    icon: Pages,
    link: "/",
    title: "Pages",
    subMenus: [{ title: "About Us", link: "/about" }],
  },
];

export default sidebar_menu;
