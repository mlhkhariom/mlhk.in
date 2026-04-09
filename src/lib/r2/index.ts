export async function uploadToR2(
  r2: R2Bucket,
  key: string,
  file: ArrayBuffer,
  contentType: string
): Promise<string> {
  await r2.put(key, file, { httpMetadata: { contentType } });
  return `https://ec0a9ef71c2605e8e98f56312162e5ee.r2.cloudflarestorage.com/mlhk-in/${key}`;
}

export async function deleteFromR2(r2: R2Bucket, key: string) {
  await r2.delete(key);
}
