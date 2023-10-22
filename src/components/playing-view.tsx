import { usePlayingView } from "@/hooks/use-playing-view";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "./action-tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { BsFillPlayFill } from "react-icons/bs";
import { BsMusicNote } from "react-icons/bs";

import { BtnSaveTrack } from "./track/btn-save-track.tsx";
import { BtnFollowArtist } from "./artist/btn-follow-artist.tsx";
import { MouseEvent, useEffect } from "react";
import { usePlaybackState } from "@/hooks/use-playback-state-query.ts";
import { useArtistQuery } from "@/hooks/use-artist-query.ts";
import { useCheckSavedTracksQuery } from "@/hooks/use-check-saved-track-query.ts";

export default function PlayingView() {
  const isOpen = usePlayingView((state) => state.isOpen);
  const onClose = usePlayingView((state) => state.onClose);

  const playbackStateQuery = usePlaybackState();

  const artistQuery = useArtistQuery(
    playbackStateQuery.data?.item?.artists[0].id as string,
  );

  const checkSavedTrackQuery = useCheckSavedTracksQuery([
    playbackStateQuery.data?.item?.id as string,
  ]);

  useEffect(() => {
    if (isOpen && !playbackStateQuery.data) {
      onClose();
    }
  });

  return (
    isOpen &&
    playbackStateQuery.data && (
      <ScrollArea className="bg-bg px-3 rounded-md shadow-2xl w-[350px] shrink-0">
        <div className="flex flex-col gap-3 py-3">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              {playbackStateQuery.data?.context?.type}
            </p>
            <ActionTooltip label="Close" align="center" side="bottom">
              <Button
                className="bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition w-10 h-10 p-0"
                onClick={onClose}
              >
                <RxCross2 className="w-6 h-6" />
              </Button>
            </ActionTooltip>
          </div>
          <div className="">
            <img
              src={playbackStateQuery.data?.item?.album.images[0].url}
              alt=""
              className="rounded-md shadow-2xl !relative object-contain !w-full !h-auto"
            />
            <div className="flex gap-2 mt-5 justify-between">
              <div className="">
                <Link
                  className="text-xl font-semibold line-clamp-1 hover:underline transition-all mb-2"
                  to={`${playbackStateQuery.data?.item?.external_urls.spotify}`}
                >
                  {playbackStateQuery.data?.item?.name}
                </Link>
                <Link
                  className="text-md text-white/60 hover:text-white transition hover:underline"
                  to={`/artist/${playbackStateQuery.data?.item?.artists[0].id}`}
                >
                  {playbackStateQuery.data?.item?.artists[0].name}
                </Link>
              </div>
              <div className="flex items-center">
                <BtnSaveTrack
                  id="12"
                  isSaved={checkSavedTrackQuery.data?.[0] as boolean}
                />
                <ActionTooltip label="More options" align="center" side="top">
                  <Button className="text-xl rounded-full h-10 w-10 p-0 bg-transparent text-white/60 hover:text-white transition hover:bg-transparent">
                    <BsThreeDots />
                  </Button>
                </ActionTooltip>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-[#242424] flex flex-col overflow-hidden mt-5">
            <img
              src={artistQuery.data?.images[0].url}
              className="max-h-60 object-cover"
            />
            <div className="flex flex-col gap-3 p-4">
              <Link
                className="text-lg font-semibold hover:underline transition"
                to={`/artist/${artistQuery.data?.id}`}
              >
                {playbackStateQuery.data?.item?.artists[0].name}
              </Link>
              <div className="flex justify-between">
                <span className="text-text-blur">
                  {artistQuery.data?.followers.total.toLocaleString()} Monthly
                  Listeners
                </span>
                <div
                  onClick={(event: MouseEvent<HTMLDivElement>) => {
                    event.stopPropagation();
                  }}
                >
                  <BtnFollowArtist
                    view="playing view"
                    id={playbackStateQuery.data?.item?.artists[0].id as string}
                  />
                </div>
              </div>
              <p className="text-text-blur line-clamp-3">
                No API for this description LMAO. Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Minus et rem ducimus eveniet
                veritatis mollitia ratione quod accusantium quos sint.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-[#232323] p-2 rounded-md overflow-hidden">
            <div className="flex justify-between px-2 pt-2 items-center">
              <p>Next in queue</p>
              <Link
                to="/queue"
                className="text-sm text-white/80 hover:text-white hover:underline transition"
              >
                Open queue
              </Link>
            </div>
            <div className="flex gap-2 items-center hover:bg-[#393939] transition rounded-md p-2 group">
              <ActionTooltip label="Play" align="center" side="top">
                <Button className="bg-transparent text-white/60 hover:text-white transition hover:bg-transparent p-1">
                  <BsFillPlayFill className="w-5 h-5 group-hover:block hidden" />
                  <BsMusicNote className="w-5 h-5 group-hover:hidden block" />
                </Button>
              </ActionTooltip>
              <img
                src="https://i.scdn.co/image/ab67616d00001e0295f754318336a07e85ec59bc"
                className="w-12 h-12 rounded-sm"
              />
              <div className="flex flex-col">
                <Link
                  to="https://open.spotify.com/track/3hUxzQpSfdDqwM3ZTFQY0K?si=ae9446f778764508"
                  className="text hover:underline line-clamp-1 transition"
                >
                  august
                </Link>
                <Link
                  to={`/artist/06HL4z0CvFAxyc27GXpf02`}
                  className="text-white/60 hover:text-white text-sm hover:underline line-clamp-1 transition"
                >
                  Taylor Swift
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    )
  );
}
