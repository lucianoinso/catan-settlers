module.exports = {
  coverageDirectory: "coverage",
  verbose: true,
  roots: [
    "./",
    "./src",
    "./src/App",
    "./src/Game/Board",
    "./src/Game/Build",
    "./src/Game/DevCard",
    "./src/Game/Dice",
    "./src/Game/Resource",
    "./src/Game/TradeBank",
    "./src/Lobby",
    "./src/Login"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  setupFiles: ["./setupTest"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
