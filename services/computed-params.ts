// Processing request data format
export function computedParams(data: { [key: string]: string }) {
  const urlencoded = new URLSearchParams()
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      urlencoded.append(key, data[key])
    }
  }
  return urlencoded
}
