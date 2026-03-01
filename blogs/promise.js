// const launchMonth = "January";

// const gtaLaunch = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (launchMonth === "November") {
//       resolve("GTA VI launched successfully");
//     } else {
//       reject("GTA VI was not launched on time");
//     }
//   }, 3000);
// });

// gtaLaunch
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err))
//   .finally(() => console.log("Enjoy your game"));

// const launchPromise = Promise.resolve("Launch GTA VI immediately");
// console.log(launchPromise);

// const scrapPromise = Promise.reject(new Error("Scrap GTA VI development"));
// console.log(scrapPromise);

// const game1 = Promise.reject(new Error("Game1 will be delayed"));
const game2 = Promise.resolve("Game2 will launch on time");
const game3 = Promise.resolve("Game3 will launch on time");

// const results = Promise.any([game1, game2, game3]);
// results.then(console.log);

// const results = Promise.all([game3, game2]);
// results.then(console.log);

// const results = Promise.allSettled([game1, game2, game3]);
// results.then((data) => console.log(data)).catch((err) => console.error(err));

const results = Promise.race([game2, game3]);
results.then((data) => console.log(data)).catch((err) => console.error(err));
