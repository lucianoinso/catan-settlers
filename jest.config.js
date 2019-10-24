module.exports = {
  "coverageDirectory": "coverage",
  "verbose": true,
  "roots": [
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
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 90,
      "lines": 90,
      "statements": 90
    }
  },
  "setupFiles": [
    "./setupTest"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
}
