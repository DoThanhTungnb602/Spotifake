import { BiSolidError } from "react-icons/bi";

export function ArtistError() {
  return (
    <div className="flex items-center justify-center h-[500px] flex-col">
      <BiSolidError className="w-32 h-32 text-spotifake mb-5" />
      <p className="text-spotifake text-4xl">Oops, Something went wrong!</p>
    </div>
  );
}
