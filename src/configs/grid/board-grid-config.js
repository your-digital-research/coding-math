export function getBoardGridLandscapeConfig() {
  return {
    // debug: { color: 0x00ff00 },
    name: "board",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "scene",
        bounds: { x: 0, y: 0, width: 1, height: 1 }
      }
    ]
  };
}

export function getBoardGridPortraitConfig() {
  return {
    // debug: { color: 0x00ff00 },
    name: "board",
    bounds: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    cells: [
      {
        name: "scene",
        bounds: { x: 0, y: 0, width: 1, height: 1 }
      }
    ]
  };
}
