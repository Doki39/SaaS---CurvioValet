export async function videoSourceAvailable(src: string): Promise<boolean> {
  if (!src) return false;
  try {
    const response = await fetch(src, { method: "HEAD" });
    if (response.ok) return true;
    if (response.status === 405) {
      const getResponse = await fetch(src, { method: "GET", headers: { Range: "bytes=0-1" } });
      return getResponse.ok;
    }
    return false;
  } catch {
    return false;
  }
}
