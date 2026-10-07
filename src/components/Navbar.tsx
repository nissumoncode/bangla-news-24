import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="relative max-w-7xl mx-auto px-4 py-4">
      <div className="relative flex items-center justify-center">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 mx-auto">
          <Image
            className="w-12 h-12 object-contain"
            height={50}
            width={50}
            src="/logo.webp"
            alt="Bangla News 24 logo"
          />

          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold">Bangla News 24</span>

            <span className="text-xs text-neutral-500">{date}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <UserInfo />
      <NavLinks />
    </header>
  );
};

export default Navbar;
