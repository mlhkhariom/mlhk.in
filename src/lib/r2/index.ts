export async function uploadToR2(
  r2: R2Bucket,
  key: string,
  file: ArrayBuffer,
  contentType: string
): Promise<string> {
  await r2.put(key, file, { httpMetadata: { contentType } });
  return `https://f53940e94f9aadb31afc5d7019f82096.r2.cloudflarestorage.com/mlhk-in/${key}`;
}

export async function deleteFromR2(r2: R2Bucket, key: string) {
  await r2.delete(key);
}
