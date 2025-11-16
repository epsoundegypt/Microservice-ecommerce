"use client";
import Link from "next/link";
import React from "react";
import { Phone, ShieldCheck } from "lucide-react";

const Topbar = ({
  navItems = [
    { name: "About", link: "/about" },
    { name: "My Account", link: "/my-account" },
    { name: "Wishlist", link: "/wishlist" },
    { name: "Orders", link: "/orders" },
  ],
  phone = "+880 1234 56789",
  message = "100% Secure delivery without contacting the courier",
}) => {
  return (
    <header className="w-full bg-white border-b">
      {/* Entire topbar hidden below md */}
      <div className="hidden md:flex w-[80%] mx-auto py-2 items-center justify-between gap-4">
        {/* left: nav items */}
        <nav
          aria-label="Top navigation"
          className="flex items-center gap-4 text-sm whitespace-nowrap flex-shrink-0"
        >
          {navItems.map((item, i) => (
            <React.Fragment key={item.name + i}>
              <Link
                href={item.link}
                className="hover:text-green-600 transition font-medium"
              >
                {item.name}
              </Link>
              {i !== navItems.length - 1 && (
                <span className="text-gray-300 select-none">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* center: secure message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-green-700 flex items-center justify-center gap-2 truncate">
            <ShieldCheck size={16} aria-hidden="true" className="flex-shrink-0" />
            <span>{message}</span>
          </p>
        </div>

        {/* right: contact */}
        <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
          <Phone size={16} aria-hidden="true" />
          <a
            href={`tel:${phone.replace(/[^+0-9]/g, "")}`}
            className="text-sm font-medium text-gray-700 hover:text-green-600"
          >
            Need help? Call Us: <span className="font-semibold">{phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
