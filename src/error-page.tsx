import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { BsSpotify } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function errorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    console.error(error);
    return "Unknown error";
  }
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex w-screen h-screen justify-center items-center flex-col gap-5 bg-black"
    >
      <BsSpotify className="text-7xl text-spotifake" />
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p>
        <i>{errorMessage(error)}</i>
      </p>
      <Link to="/">
        <Button className="rounded-full hover:scale-110 transition text-md font-semibold p-6">
          Home
        </Button>
      </Link>
    </div>
  );
}
