import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { getLoginUrl } from "@/lib/get-login-url";

export function AuthActions() {
  const getLoginUrlQuery = useQuery({
    queryKey: ["login-url"],
    queryFn: getLoginUrl,
  });

  return (
    <>
      <Button className="rounded-full text-black font-bold p-5 bg-black/70 text-white/70 hover:bg-black/70 hover:text-white transition">
        Sign Up
      </Button>
      <Link
        to={getLoginUrlQuery.data || "/"}
        className="rounded-full text-black font-bold py-2 px-5 bg-white hover:bg-white"
      >
        Log In
      </Link>
    </>
  );
}
