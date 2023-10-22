import { VscSearchStop } from "react-icons/vsc";

export default function Search() {
  return (
    <div className="flex w-full h-96 items-center justify-center flex-col gap-5">
      <VscSearchStop className="text-9xl text-spotifake" />
      <p className="text-3xl text-spotifake">
        Sorry but the search feature is not available yet!
      </p>
    </div>
  );
}
