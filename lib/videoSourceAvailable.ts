export function encodePublicAssetUrl(path: string): string {
  if (!path.startsWith("/")) return path;
  return path
    .split("/")
    .map((segment, index) => (index === 0 || segment === "" ? segment : encodeURIComponent(segment)))
    .join("/");
}

async function probeVideoUrl(url: string): Promise<boolean> {
  const getResponse = await fetch(url, { method: "GET", headers: { Range: "bytes=0-1" } });
  return getResponse.ok;
}

export async function videoSourceAvailable(src: string): Promise<boolean> {
  if (!src) return false;
  const url = encodePublicAssetUrl(src);
  try {
    const headResponse = await fetch(url, { method: "HEAD" });
    if (headResponse.ok) return true;
    if (headResponse.status === 405 || headResponse.status === 404) {
      return await probeVideoUrl(url);
    }
    return false;
  } catch {
    try {
      return await probeVideoUrl(url);
    } catch {
      return false;
    }
  }
}
