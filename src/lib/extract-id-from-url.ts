export function extractIdFromUrl(url: string): string {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 1];
}
