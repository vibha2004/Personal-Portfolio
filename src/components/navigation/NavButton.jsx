import {
  Github,
  Home,
  Linkedin,
  NotebookText,
  Palette,
  Phone,
  User,
  Twitter
} from "lucide-react";
import Link from "next/link";
import React from "react";
import ResponsiveComponent from "../ResponsiveComponent";
import clsx from "clsx";
import { motion } from "framer-motion";

// Icon mapping
const getIcon = (icon) => {
  switch (icon) {
    case "home":
      return <Home className="w-full h-auto" strokeWidth={1.5} />;
    case "about":
      return <User className="w-full h-auto" strokeWidth={1.5} />;
    case "projects":
      return <Palette className="w-full h-auto" strokeWidth={1.5} />;
    case "contact":
      return <Phone className="w-full h-auto" strokeWidth={1.5} />;
    case "github":
      return <Github className="w-full h-auto" strokeWidth={1.5} />;
    case "linkedin":
      return <Linkedin className="w-full h-auto" strokeWidth={1.5} />;
    case "twitter":
      return <Twitter className="w-full h-auto" strokeWidth={1.5} />;
    case "resume":
      return <NotebookText className="w-full h-auto" strokeWidth={1.5} />;
    default:
      return <Home className="w-full h-auto" strokeWidth={1.5} />;
  }
};

// Framer Motion Animation Variant
const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

const NavLink = motion(Link);

// Main Component
const NavButton = ({
  x,
  y,
  label,
  link,
  icon,
  newTab,
  labelDirection = "right",
}) => {
  return (
    <ResponsiveComponent>
      {({ size }) => {
        const isMobile = size && size < 480;

        return isMobile ? (
          // ✅ Mobile View (Stacked layout)
          <div className="relative z-50 w-full flex items-center justify-start px-4 py-2">
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted w-full transition-all duration-300"
              aria-label={label}
              name={label}
              prefetch={false}
              scroll={false}
            >
              <span className="w-6 h-6 text-foreground">{getIcon(icon)}</span>
              <span className="text-sm text-foreground">{label}</span>
            </NavLink>
          </div>
        ) : (
          // ✅ Desktop View (Floating position)
          <div
            className="absolute cursor-pointer z-50"
            style={{ transform: `translate(${x}, ${y})` }}
          >
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              className="text-foreground rounded-full flex items-center justify-center custom-bg"
              aria-label={label}
              name={label}
              prefetch={false}
              scroll={false}
            >
              <span className="relative w-14 h-14 p-4 animate-spin-slow-reverse group-hover:pause hover:text-accent transition-transform duration-300 hover:scale-110">
                {getIcon(icon)}

                <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />

                <span
                  className={clsx(
                    "absolute px-3 py-2 left-full mx-2.5 top-1/2 -translate-y-1/2 bg-background/90 text-foreground text-sm rounded-lg shadow-md whitespace-nowrap group-hover:opacity-100 opacity-0 transition-all duration-300",
                    labelDirection === "left" ? "right-full left-auto" : ""
                  )}
                >
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default NavButton;
