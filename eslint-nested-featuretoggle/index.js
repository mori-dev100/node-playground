const featureflags = {
  "feature-1": true,
  "feature-2": false,
};

function main() {
  console.log("Hello world");
  if (featureflags["feature-1"]) {
    console.log("feature-1 is enabled");
    // noop
    // noop
    // noop

    if (featureflags["feature-2"]) {
      console.log("feature-2 is enabled");
      if (120 > Math.random() * 100) {
        console.log("hello");
      }
    }
  }
}
main();
