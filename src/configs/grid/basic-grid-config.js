export function getBasicGridLandscapeConfig() {
  return {
    // debug: { color: 0x00ff00 },
    name: "basic",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "cell",
        bounds: { x: 0, y: 0, width: 1, height: 1 }
      }
    ]
  };
}

export function getBasicGridPortraitConfig() {
  return {
    // debug: { color: 0x00ff00 },
    name: "basic",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "cell",
        bounds: { x: 0, y: 0, width: 1, height: 1 }
      }
    ]
  };
}
