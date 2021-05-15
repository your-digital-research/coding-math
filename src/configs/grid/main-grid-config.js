export function getMainGridLandscapeConfig() {
  return {
    // debug: { color: 0x000000 },
    name: "main",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "board",
        bounds: { x: 0, y: 0, width: 1, height: 1 }
      }
    ]
  };
}

export function getMainGridPortraitConfig() {
  return {
    // debug: { color: 0x000000 },
    name: "main",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "board",
        bounds: { x: 0, y: 0, width: 1, height: 1 }
      }
    ]
  };
}
