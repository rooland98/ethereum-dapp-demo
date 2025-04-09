import { Outlet } from "@tanstack/react-router";

const RootLayout = () => {
  return (
    <main className="grow h-full font-inter-regular">
      <Outlet />
    </main>
  );
};

export default RootLayout;
