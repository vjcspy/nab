export function generateRandomString(length = 5) {
  return Buffer.from(Math.random().toString())
    .toString('base64')
    .substr(10, length);
}
