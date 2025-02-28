"use client";
import { usePathname } from "next/navigation";

const excludeRoutes = ["/Login", "/Register", "/Booking"];

const ExcludedWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();


  if (!excludeRoutes.includes(path)) return children
};

export default ExcludedWrapper;
