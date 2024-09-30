const testCase1 = {
    "keys": {
      "n": 4,
      "k": 3
    },
    "1": {
      "base": "10",
      "value": "4"
    },
    "2": {
      "base": "2",
      "value": "111"
    },
    "3": {
      "base": "10",
      "value": "12"
    },
    "6": {
      "base": "4",
      "value": "213"
    }
  };
  
  const testCase2 = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
  }
  
  function decodeValues(data) {
    return Object.entries(data)
      .filter(([key]) => key !== 'keys')
      .map(([x, { base, value }]) => ({
        x: parseInt(x, 10),
        y: parseInt(value, parseInt(base, 10))
      }));
  }
  
  function lagrangeInterpolation(data, k) {
    let secret = 0;
  
    for (let i = 0; i < k; i++) {
      let { x: xi, y: yi } = data[i];
      let li = 1;
  
      for (let j = 0; j < k; j++) {
        if (i !== j) {
          let { x: xj } = data[j];
          li *= -xj / (xi - xj);
        }
      }
  
      secret += yi * li;
    }
  
    return secret;
  }
  
  function findWrongPoints(data, k) {
    const incorrectPoints = [];
  
    for (let i = k; i < data.length; i++) {
      const { x, y } = data[i];
      let calculatedY = 0;
  
      for (let j = 0; j < k; j++) {
        let { x: xi, y: yi } = data[j];
        let li = 1;
  
        for (let l = 0; l < k; l++) {
          if (j !== l) {
            let { x: xj } = data[l];
            li *= (x - xj) / (xi - xj);
          }
        }
  
        calculatedY += yi * li;
      }
  
      if (Math.round(calculatedY) !== y) {
        incorrectPoints.push({ x, y });
      }
    }
  
    return incorrectPoints;
  }
  
  function main() {
    const points1 = decodeValues(testCase1);
    const points2 = decodeValues(testCase2);
    const k1 = testCase1.keys.k;
    const k2 = testCase2.keys.k;
    const secret1 = lagrangeInterpolation(points1, k1);
    const secret2 = lagrangeInterpolation(points2, k2);
    console.log('OUTPUT for test case 1:', secret1);
    console.log('OUTPUT for test case 2:', secret2);
    const wrongPoints = findWrongPoints(points2, k2);
    console.log('Wrong points (x,y) for test case 2:', wrongPoints);
  }
  
  main();