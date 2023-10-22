import { useLocalStorage } from "@uidotdev/usehooks";

import { getLoginUrl } from "@/lib/get-login-url";
import { IUser } from "@/type";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = useLocalStorage<IUser>("user");
  useEffect(() => {
    if (!user) {
      getLoginUrl().then((url) => {
        window.location.replace(url);
      });
    }
  });
  return <>{children}</>;
}
