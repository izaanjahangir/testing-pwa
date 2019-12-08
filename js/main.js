if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(res => console.log("service worker is registred =>", res))
    .catch(err => console.log("error registering service worker =>", err));
}

saveImage();

async function saveImage() {
  try {
    const cache = await caches.open("dynas");
    const url =
      "https://firebasestorage.googleapis.com/v0/b/izaan-hackathon.appspot.com/o/ads%2F1533146816514-venom_artwork_4k_2-1600x900.jpg?alt=media&token=8de804b9-1861-48b5-b496-dead200ef7e4";

    const req = new Request(url, { mode: "no-cors" });

    const response = await fetch(req);
    return cache.put(req, response);

    // await cache.add(
    //   "https://firebasestorage.googleapis.com/v0/b/izaan-hackathon.appspot.com/o/ads%2F1533146816514-venom_artwork_4k_2-1600x900.jpg?alt=media&token=8de804b9-1861-48b5-b496-dead200ef7e4"
    // );

    // const json = {
    //   name: "izaan",
    //   download: "https://firebasestorage.googleapis.com/v0/b/izaan-hackathon.appspot.com/o/ads%2F1533146816514-venom_artwork_4k_2-1600x900.jpg?alt=media&token=8de804b9-1861-48b5-b496-dead200ef7e4"
    // }

    // localStorage.setItem("json", json);

    // console.log("image cached");
  } catch (e) {
    console.log("e =>", e);
  }
}
