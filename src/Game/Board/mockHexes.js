import { resourceNames } from "../SatanDictionary.js";


// Create a mock [HEX] to use in a mock board.

const getMockHexes = () => {
  const resources = Object.keys(resourceNames);

  const getHex = (level, index, resource, token) => {
    return { position: { level, index }, resource: resourceNames[resource], token };
  };

  const mockHexes = [];

  // Level 0
  mockHexes.push(getHex(0, 0, "wool", 3));

  // Level 1
  for (let i = 0; i < 6; i++) {
    mockHexes.push(getHex(1, i, resources[i % resources.length], 2 + i));
  }

  // Level 2
  for (let i = 0; i < 12; i++) {
    mockHexes.push(getHex(2, i, resources[i % resources.length], 2 + (i % 10)));
  }

  return mockHexes;
};

export default getMockHexes;
