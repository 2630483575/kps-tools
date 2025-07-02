import { AppContextProvider } from "@/context/app-context";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async (opt) => {
    // console.log('beforeLoad __ ROOT', opt)
    if (opt.location.search) {
      const code = new URLSearchParams(opt.location.search).get("code");
      if (code) {
        localStorage.setItem("token", code);
        const search = new URLSearchParams(opt.location.search);
        search.delete("code");
        const newSearch = search.toString();
        const newUrl = newSearch
          ? `${opt.location.pathname}?${newSearch}`
          : opt.location.pathname;
        window.location.href = newUrl;
      }
    }
  },
});

function RootComponent() {
  return (
    <>
      <AppContextProvider>
        <div className="w-full h-full">
          <Outlet />
        </div>
        <TanStackRouterDevtools position="bottom-right" />
      </AppContextProvider>
    </>
  );
}
