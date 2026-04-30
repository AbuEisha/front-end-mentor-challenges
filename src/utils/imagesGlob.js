export default function getImages(url) {
  const images = import.meta.glob("../assets/images/*.{jpg,png}", {
    eager: true,
    query: "?url",
    import: "default",
  });
  return images[url];
}
