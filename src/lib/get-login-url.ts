import qs from "query-string";
import { getCredentials } from "./get-credentials";

export async function getLoginUrl() {
  const scope =
    "user-read-private user-read-email playlist-read-private user-follow-read user-follow-modify user-library-read playlist-modify-public playlist-modify-private user-library-modify user-read-playback-state user-read-currently-playing user-modify-playback-state";
  const { client_id, redirect_uri } = await getCredentials();
  const queryParams = qs.stringify({
    client_id,
    redirect_uri,
    scope,
    response_type: "code",
  });
  return `https://accounts.spotify.com/authorize?${queryParams}`;
}
