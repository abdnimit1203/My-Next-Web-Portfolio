import imageCompression from "browser-image-compression";
import { authedFetch } from "./authClient";

const SKIP_COMPRESSION_UNDER_MB = 2;

export async function uploadImage(file: File): Promise<string> {
  const needsCompression = file.size > SKIP_COMPRESSION_UNDER_MB * 1024 * 1024;

  const compressed = needsCompression
    ? await imageCompression(file, {
        maxSizeMB: 2.5,
        maxWidthOrHeight: 2200,
        initialQuality: 0.9,
        useWebWorker: true,
      })
    : file;

  const form = new FormData();
  form.append("image", compressed, file.name);

  const res = await authedFetch("/admin/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const { url } = await res.json();
  return url;
}
