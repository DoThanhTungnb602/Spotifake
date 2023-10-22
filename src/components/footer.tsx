import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="flex justify-between flex-col px-8 py-16 gap-8">
      <div className="flex gap-x-20 gap-y-10 flex-wrap justify-between">
        <div className="flex gap-x-20 gap-y-10 flex-wrap">
          <div className="">
            <h2 className="font-semibold text-md mb-2">Company</h2>
            <ul className="text-white/70 transition flex flex-col gap-2">
              <li className="hover:text-white">
                <a href="#">About</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Job</a>
              </li>
              <li className="hover:text-white">
                <a href="#">For the Record</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-semibold text-md mb-2">Communities</h2>
            <ul className="text-white/70 transition flex flex-col gap-2">
              <li className="hover:text-white">
                <a href="#">For Artists</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Developers</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Advertising</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Investors</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Vendors</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-semibold text-md mb-2">Useful links</h2>
            <ul className="text-white/70 transition flex flex-col gap-2">
              <li className="hover:text-white">
                <a href="#">Support</a>
              </li>
              <li className="hover:text-white">
                <a href="#">Free Mobile App</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-4">
          <Button className="rounded-full bg-white/20 hover:bg-white/40 transition text-white p-0 w-10 h-10 text-xl">
            <AiOutlineInstagram />
          </Button>
          <Button className="rounded-full bg-white/20 hover:bg-white/40 transition text-white p-0 w-10 h-10 text-xl">
            <AiOutlineTwitter />
          </Button>
          <Button className="rounded-full bg-white/20 hover:bg-white/40 transition text-white p-0 w-10 h-10 text-xl">
            <BsFacebook />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between text-sm text-white/70 gap-5">
        <div className="flex gap-5 flex-wrap">
          <a href="" className="hover:text-white transition whitespace-nowrap">
            Legal
          </a>
          <a href="" className="hover:text-white transition whitespace-nowrap">
            Privacy Center
          </a>
          <a href="" className="hover:text-white transition whitespace-nowrap">
            Privacy Policy
          </a>
          <a href="" className="hover:text-white transition whitespace-nowrap">
            Cookies
          </a>
          <a href="" className="hover:text-white transition whitespace-nowrap">
            About Ads
          </a>
          <a href="" className="hover:text-white transition whitespace-nowrap">
            Accessibility
          </a>
        </div>
        <p className="whitespace-nowrap">&copy; 2023 Spotify AB</p>
      </div>
    </footer>
  );
}
