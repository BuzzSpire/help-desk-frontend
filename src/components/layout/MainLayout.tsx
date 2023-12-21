import type { FC, ReactNode } from "react";
import Navbar from "../navbar/Navbar";
import { Toaster } from "../ui/toaster";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="flex justify-center">
      <div className="max-w-[1440px] w-full">
        <Navbar />
        <div className="p-2">{children}</div>
      </div>
      <Toaster />
    </main>
  );
};

export default MainLayout;
