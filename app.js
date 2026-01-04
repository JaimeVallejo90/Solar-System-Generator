"use strict";

const bandInfo = {
  Hot: { key: "Hot", label: "Hot", code: "H", className: "hot" },
  Temperate: {
    key: "Temperate",
    label: "Temperate",
    code: "T",
    className: "temperate",
  },
  Cold: { key: "Cold", label: "Cold", code: "C", className: "cold" },
};
const bandOrder = ["Hot", "Temperate", "Cold"];
const TAU = Math.PI * 2;

const starTypes = [
  {
    type: "O/B",
    color: "Blue",
    light: "Very bright",
    flora: "Silver/blue",
    skyColor: "White-blue",
    size: "Huge",
    sizeRank: 6,
    hex: "#7fd3ff",
  },
  {
    type: "A",
    color: "White",
    light: "Intense",
    flora: "Pale",
    skyColor: "Pale blue",
    size: "Large",
    sizeRank: 5,
    hex: "#f4f7ff",
  },
  {
    type: "F",
    color: "White-yellow",
    light: "Bright",
    flora: "Light green",
    skyColor: "Vibrant blue",
    size: "Bigger Sun",
    sizeRank: 4,
    hex: "#ffe9b3",
  },
  {
    type: "G",
    color: "Yellow",
    light: "Normal",
    flora: "Green",
    skyColor: "Normal blue",
    size: "Normal Sun",
    sizeRank: 3,
    hex: "#ffd36a",
  },
  {
    type: "K",
    color: "Orange",
    light: "Soft",
    flora: "Red/brown",
    skyColor: "Blue-orange tint",
    size: "Smaller Sun",
    sizeRank: 2,
    hex: "#ff9a4a",
  },
  {
    type: "M",
    color: "Red",
    light: "Dim",
    flora: "Dark/black",
    skyColor: "Red-violet tint",
    size: "Small",
    sizeRank: 1,
    hex: "#ff6a5a",
  },
];

const rockyTables = {
  Hot: [
    {
      planetType: "Venus-like Greenhouse",
      description: "Runaway greenhouse, crushing air, resurfaced crust",
      appearance: "Pale yellow/white, solid cloud deck, no visible surface",
      tectonics: "Dead / None",
      atmosphere: "Thick",
      water: "None",
      references: "Venus",
    },
    {
      planetType: "Hot Volcanic World",
      description: "Extreme geothermal activity, unstable terrain",
      appearance: "Dark red/black, glowing lava scars, heavy haze",
      tectonics: "Active",
      atmosphere: "Thick / Thin",
      water: "None",
      references: "Io (scaled), Mustafar (hard take)",
    },
    {
      planetType: "Hot Desert World",
      description: "Dry, eroded world; thin air, high irradiation",
      appearance: "Tan/ochre with rust tones, bright deserts",
      tectonics: "Dead",
      atmosphere: "Thin",
      water: "None",
      references: "Hot Mars analogs",
    },
    {
      planetType: "Hot Ocean World",
      description: "Global ocean, intense storms; little/no land",
      appearance: "Deep blue with bright spiral storms",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Ocean",
      references: "Ocean exoplanet archetype",
    },
    {
      planetType: "Dry Tectonic World",
      description: "Active crust but water-starved; harsh hydrology",
      appearance: "Brown continents, pale dust veils",
      tectonics: "Active",
      atmosphere: "Thin",
      water: "Partial",
      references: "Arrakis (realistic interpretation)",
    },
    {
      planetType: "Steamy Jungle World",
      description: "Hot, wet, biologically rich; heavy rainfall",
      appearance: "Deep green under white cloud belts",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Partial",
      references: "Pandora (Avatar)",
    },
  ],
  Temperate: [
    {
      planetType: "Temperate Airless World",
      description: "Rocky body with no air; surface locked in geology",
      appearance: "Grey/black, heavily cratered, sharp contrast",
      tectonics: "None",
      atmosphere: "None",
      water: "None",
      references: "Moon (if in temperate orbit)",
    },
    {
      planetType: "Mars-like World",
      description: "Cold, dry fossil continents; thin air",
      appearance: "Rust red with pale caps; dust storms",
      tectonics: "Dead",
      atmosphere: "Thin",
      water: "None",
      references: "Mars, The Expanse (hard habitat)",
    },
    {
      planetType: "Highland Fossil World",
      description: "Old continents, thick air; limited water cycles",
      appearance: "Brown-grey highlands, scattered pale seas",
      tectonics: "Dead",
      atmosphere: "Thick",
      water: "Partial",
      references: "Speculative old Earth worlds",
    },
    {
      planetType: "Ocean World",
      description: "Deep global ocean; stable hydrosphere",
      appearance: "Dark blue, few/no continents",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Ocean",
      references: "Ocean exoplanet archetype",
    },
    {
      planetType: "Dry Earth Analog",
      description: "Earth-like but water-poor; strong regional extremes",
      appearance: "Green-brown continents, bright deserts",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Partial",
      references: "Semi-arid Earth variants",
    },
    {
      planetType: "Earth-like World",
      description: "Active geology, stable oceans; broad habitability",
      appearance: "Blue oceans, green land, white clouds",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Ocean",
      references: "Earth",
    },
  ],
  Cold: [
    {
      planetType: "Frozen Airless World",
      description: "Icy rock with no air; static surface",
      appearance: "White-grey ice with dark rock patches",
      tectonics: "None",
      atmosphere: "None",
      water: "None",
      references: "Pluto / outer moons",
    },
    {
      planetType: "Frozen Fossil World",
      description: "Dead geology; thin air; water locked away",
      appearance: "Pale rust/brown with white caps",
      tectonics: "Dead",
      atmosphere: "Thin",
      water: "None",
      references: "Mars-like (farther out)",
    },
    {
      planetType: "Cold Desert World",
      description: "Thin air; ice limited; dry, harsh terrain",
      appearance: "Pale tan/grey with bright poles",
      tectonics: "Dead",
      atmosphere: "Thin",
      water: "Partial",
      references: "Antarctic Mars analogs",
    },
    {
      planetType: "Titan-like World",
      description: "Thick haze; surface liquids are hydrocarbons",
      appearance: "Orange/gold haze; dark seas",
      tectonics: "None",
      atmosphere: "Thick",
      water: "Partial",
      references: "Titan",
    },
    {
      planetType: "Ice World",
      description: "Frozen shell with internal ocean; active cracking",
      appearance: "White with blue fracture networks",
      tectonics: "Active",
      atmosphere: "Thin",
      water: "Partial",
      references: "Europa",
    },
    {
      planetType: "Cold Ocean World",
      description: "Global ocean under thick ice; strong circulation",
      appearance: "White-blue ice shell, subtle clouding",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Ocean",
      references: "Enceladus/Europa (scaled)",
    },
  ],
};

const expandD6Table = (entries) => [
  entries[0],
  entries[0],
  entries[1],
  entries[1],
  entries[2],
  entries[2],
];

const smallMoonTables = {
  Hot: expandD6Table([
    {
      archetype: "Overheated Rocky Moon",
      description: "Strong solar + tidal stress, fractured crust",
      atmosphere: "Exosphere",
      water: "None",
      geology: "Fractured / stressed",
      appearance: "Dark grey with glowing fissures",
      references: "Inner Jovian moons",
    },
    {
      archetype: "Extreme Volcanic Moon",
      description: "Massive tidal heating, constant resurfacing",
      atmosphere: "None",
      water: "None",
      geology: "Extremely active",
      appearance: "Bright yellow/orange",
      references: "Io (inner-orbit case)",
    },
    {
      archetype: "Transient Atmosphere Moon",
      description: "Volcanic outgassing creates unstable air",
      atmosphere: "Unstable / trace",
      water: "Vapor only",
      geology: "Active",
      appearance: "Brown-grey with hazy plumes",
      references: "Titan (borderline case)",
    },
  ]),
  Temperate: expandD6Table([
    {
      archetype: "Dry Rocky Moon",
      description: "Small rocky body, little internal energy",
      atmosphere: "None",
      water: "None",
      geology: "Weak or dead",
      appearance: "Grey / brown, eroded",
      references: "Phobos, Deimos",
    },
    {
      archetype: "Tidally Active Volcanic Moon",
      description: "Strong tidal heating, extreme volcanism",
      atmosphere: "None",
      water: "None",
      geology: "Extremely active",
      appearance: "Yellow-orange with dark lava regions",
      references: "Io",
    },
    {
      archetype: "Seasonal Ice-Water Moon",
      description: "Mixed ice and liquid water, variable cycles",
      atmosphere: "Very thin",
      water: "Seasonal / subsurface",
      geology: "Moderate (tidal + solar)",
      appearance: "Grey-white with dark patches",
      references: "Triton (analogue)",
    },
  ]),
  Cold: expandD6Table([
    {
      archetype: "Inactive Ice Moon",
      description: "Small, frozen body with no internal heat",
      atmosphere: "None",
      water: "Solid ice",
      geology: "Geologically dead",
      appearance: "Pale white / grey, heavily cratered",
      references: "Callisto",
    },
    {
      archetype: "Subsurface Ocean Moon",
      description: "Thick ice shell with liquid ocean below",
      atmosphere: "None",
      water: "Subsurface ocean",
      geology: "Internally active (tidal)",
      appearance: "White with dark cracks or streaks",
      references: "Europa, Enceladus",
    },
    {
      archetype: "Cold Rocky Moon",
      description: "Rock-ice mix, minimal activity",
      atmosphere: "None",
      water: "Frost / traces",
      geology: "Fossil",
      appearance: "Grey-blue with ice patches",
      references: "Outer system moons",
    },
  ]),
};

const gasGiantTypes = {
  Hot: {
    type: "Hot Gas Giant",
    description: "Strongly irradiated giant close to its star",
    appearance: "Bright yellows and whites, distorted cloud bands",
  },
  Temperate: {
    type: "Temperate Gas Giant",
    description: "Stable giant in mid-system orbit",
    appearance: "Brown and white banding, classic appearance",
  },
  Cold: {
    type: "Cold Gas Giant",
    description: "Distant, cold giant rich in volatiles",
    appearance: "Pale blues and whites, diffuse clouds",
  },
};

const asteroidTables = {
  Hot: [
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
  ],
  Temperate: [
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
  ],
  Cold: [
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
  ],
};

let rng = Math.random;
let currentSeed = "";
let currentSeedIsRandom = true;
let rollCount = 0;

const xmur3 = (input) => {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i += 1) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
};

const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), 1 | t);
  t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const makeSeed = () =>
  `seed-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(
    36
  )}`;

const setSeed = (seedInput) => {
  const trimmed = seedInput ? seedInput.trim() : "";
  const isRandom = trimmed.length === 0;
  const normalized = isRandom ? makeSeed() : trimmed;
  const seedGen = xmur3(normalized);
  rng = mulberry32(seedGen());
  currentSeed = normalized;
  currentSeedIsRandom = isRandom;
  rollCount = 0;
  return normalized;
};

const rand = () => rng();

const rollD6 = () => {
  rollCount += 1;
  return Math.floor(rand() * 6) + 1;
};

const rollStarCount = () => {
  const roll = rollD6();
  if (roll <= 4) {
    return 1;
  }
  if (roll === 5) {
    return 2;
  }
  return 3;
};

const rollMajorBodyCount = () => rollD6() + 2;
const rollSmallMoonCount = () => Math.floor((rollD6() - 1) / 2);
const rollGasGiantElementCount = () => rollD6() + 2;
const rollMajorAsteroidCount = () => rollD6() - 1;

const bandKeyFromRoll = (roll) => {
  if (roll <= 2) {
    return "Hot";
  }
  if (roll <= 4) {
    return "Temperate";
  }
  return "Cold";
};

const elementTypeFromRoll = (roll) => {
  if (roll <= 2) {
    return { key: "belt", label: "Asteroid Belt" };
  }
  if (roll <= 4) {
    return { key: "gas", label: "Gas Giant" };
  }
  return { key: "rocky", label: "Rocky Planet" };
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const randomBetween = (min, max) => min + rand() * (max - min);
const orderBodies = (bodies) =>
  [...bodies].sort((a, b) => {
    const bandDelta = bandOrder.indexOf(a.bandKey) - bandOrder.indexOf(b.bandKey);
    if (bandDelta !== 0) {
      return bandDelta;
    }
    return a.bandIndex - b.bandIndex;
  });

const generateSmallMoon = (bandKey) => {
  const roll = rollD6();
  return {
    roll,
    orbitAngle: rand() * TAU,
    ...smallMoonTables[bandKey][roll - 1],
  };
};

const generateRockyWorld = (bandKey, withMoons) => {
  const roll = rollD6();
  const entry = rockyTables[bandKey][roll - 1];
  const world = { roll, ...entry, smallMoons: [] };
  if (withMoons) {
    const moonCount = rollSmallMoonCount();
    for (let i = 0; i < moonCount; i += 1) {
      world.smallMoons.push(generateSmallMoon(bandKey));
    }
  }
  return world;
};

const generateAsteroidBelt = (bandKey) => {
  const majorCount = rollMajorAsteroidCount();
  const asteroids = [];
  for (let i = 0; i < majorCount; i += 1) {
    const roll = rollD6();
    const entry = asteroidTables[bandKey][roll - 1];
    asteroids.push({
      id: `A${i + 1}`,
      roll,
      orbitAngle: rand() * TAU,
      ...entry,
    });
  }
  return { majorCount, asteroids };
};

const generateGasGiant = (bandKey) => {
  const profile = gasGiantTypes[bandKey];
  const elementCount = rollGasGiantElementCount();
  const rings = [];
  const smallMoons = [];
  const majorMoons = [];

  for (let i = 0; i < elementCount; i += 1) {
    const roll = rollD6();
    if (roll <= 2) {
      rings.push({ empty: bandKey === "Hot" });
    } else if (roll <= 4) {
      smallMoons.push(generateSmallMoon(bandKey));
    } else {
      majorMoons.push(generateRockyWorld(bandKey, false));
    }
  }

  rings.forEach((ring, index) => {
    ring.id = `R${index + 1}`;
  });
  smallMoons.forEach((moon, index) => {
    moon.id = `SM${index + 1}`;
  });
  majorMoons.forEach((moon, index) => {
    moon.id = `MM${index + 1}`;
    if (moon.orbitAngle === undefined) {
      moon.orbitAngle = rand() * TAU;
    }
  });

  return {
    ...profile,
    elementCount,
    rings,
    smallMoons,
    majorMoons,
  };
};

const assignOrbitRadii = (bodies) => {
  const grouped = { Hot: [], Temperate: [], Cold: [] };
  bodies.forEach((body) => grouped[body.bandKey].push(body));
  Object.values(grouped).forEach((list) =>
    list.sort((a, b) => a.bandIndex - b.bandIndex)
  );

  const totalBodies = bodies.length;
  const innerRadius = 120;
  const maxRadius = 460;
  const bandGap = 55;
  const available = maxRadius - innerRadius - bandGap * 2;
  const orbitStep = clamp(available / totalBodies, 32, 85);
  let radius = innerRadius;

  bandOrder.forEach((bandKey) => {
    const bandBodies = grouped[bandKey];
    const bandCount = bandBodies.length;
    const baseAngle = rand() * TAU;
    const stepAngle = bandCount > 0 ? TAU / bandCount : TAU;
    const jitter = stepAngle * 0.25;

    bandBodies.forEach((body, index) => {
      body.orbitRadius = radius;
      body.orbitAngle = baseAngle + stepAngle * index + randomBetween(-jitter, jitter);
      radius += orbitStep;
    });
    radius += bandGap;
  });
};

const buildBeltScatter = (body) => {
  if (!body.belt) {
    return;
  }
  const baseRadius = body.orbitRadius;
  const spread = 12;
  const density = {
    Hot: { base: 70, range: 30 },
    Temperate: { base: 75, range: 30 },
    Cold: { base: 70, range: 30 },
  };
  const bandDensity = density[body.bandKey] || density.Temperate;
  const minorCount = bandDensity.base + Math.floor(rand() * bandDensity.range);
  const scatterPoints = [];

  for (let i = 0; i < minorCount; i += 1) {
    const angle = rand() * TAU;
    const radius = baseRadius + randomBetween(-spread, spread);
    const size = randomBetween(0.9, 2.1);
    scatterPoints.push({ angle, radius, size });
  }

  const majorPoints = body.belt.asteroids.map((asteroid) => {
    const angle = asteroid.orbitAngle ?? rand() * TAU;
    const radius = baseRadius + randomBetween(-spread * 0.6, spread * 0.6);
    return { angle, radius, size: randomBetween(3.4, 4.6) };
  });

  body.belt.scatterPoints = scatterPoints;
  body.belt.majorPoints = majorPoints;
};

const generateSystem = () => {
  const starCount = rollStarCount();
  const stars = [];
  for (let i = 0; i < starCount; i += 1) {
    const roll = rollD6();
    stars.push({ roll, ...starTypes[roll - 1] });
  }

  let primaryIndex = 0;
  stars.forEach((star, index) => {
    if (star.sizeRank > stars[primaryIndex].sizeRank) {
      primaryIndex = index;
    }
  });
  stars.forEach((star, index) => {
    star.isPrimary = index === primaryIndex;
  });

  const starsOrdered = [
    stars[primaryIndex],
    ...stars.filter((_, index) => index !== primaryIndex),
  ];

  const bodyCount = rollMajorBodyCount();
  const bodies = [];
  const bandCounters = { Hot: 0, Temperate: 0, Cold: 0 };

  for (let i = 0; i < bodyCount; i += 1) {
    const bandRoll = rollD6();
    const bandKey = bandKeyFromRoll(bandRoll);
    const typeRoll = rollD6();
    const type = elementTypeFromRoll(typeRoll);
    bandCounters[bandKey] += 1;

    const body = {
      bandKey,
      band: bandInfo[bandKey],
      bandIndex: bandCounters[bandKey],
      id: `${bandInfo[bandKey].code}${bandCounters[bandKey]}`,
      typeKey: type.key,
      typeLabel: type.label,
      rolls: { band: bandRoll, type: typeRoll },
    };

    if (type.key === "rocky") {
      body.rocky = generateRockyWorld(bandKey, true);
    } else if (type.key === "gas") {
      body.gas = generateGasGiant(bandKey);
    } else {
      body.belt = generateAsteroidBelt(bandKey);
    }

    bodies.push(body);
  }

  assignOrbitRadii(bodies);
  bodies.forEach((body) => {
    if (body.typeKey === "belt") {
      buildBeltScatter(body);
    }
  });
  const bodiesOrdered = orderBodies(bodies);

  return {
    stars,
    starsOrdered,
    bodyCount,
    bodies,
    bodiesOrdered,
  };
};

const starRadius = (sizeRank) => 14 + sizeRank * 4;

const starOffsets = (count) => {
  if (count === 1) {
    return [[0, 0]];
  }
  if (count === 2) {
    return [
      [0, 0],
      [48, -28],
    ];
  }
  return [
    [0, 0],
    [52, -32],
    [-40, 36],
  ];
};

const renderBeltCloud = (body, center) => {
  if (!body.belt) {
    return "";
  }
  if (!body.belt.scatterPoints) {
    buildBeltScatter(body);
  }

  const bandClass = body.bandKey.toLowerCase();
  const scatter = body.belt.scatterPoints || [];
  const majors = body.belt.majorPoints || [];

  const scatterMarkup = scatter
    .map((point) => {
      const x = center + Math.cos(point.angle) * point.radius;
      const y = center + Math.sin(point.angle) * point.radius;
      return `<circle class="asteroid-point" cx="${x.toFixed(
        1
      )}" cy="${y.toFixed(1)}" r="${point.size.toFixed(2)}" />`;
    })
    .join("");

  const majorMarkup = majors
    .map((point) => {
      const x = center + Math.cos(point.angle) * point.radius;
      const y = center + Math.sin(point.angle) * point.radius;
      const tickX = x + Math.cos(point.angle) * 6;
      const tickY = y + Math.sin(point.angle) * 6;
      return `
        <circle class="asteroid-point asteroid-point--major" cx="${x.toFixed(
          1
        )}" cy="${y.toFixed(1)}" r="${point.size.toFixed(2)}" />
        <line class="asteroid-tick" x1="${x.toFixed(1)}" y1="${y.toFixed(
          1
        )}" x2="${tickX.toFixed(1)}" y2="${tickY.toFixed(1)}" />
      `;
    })
    .join("");

  return `<g class="belt-cloud belt-cloud--${bandClass} focus-dim" data-focus-id="${body.id}">${scatterMarkup}${majorMarkup}</g>`;
};

const renderSatellites = (body, x, y) => {
  if (body.typeKey === "rocky") {
    const moons = body.rocky?.smallMoons || [];
    if (moons.length === 0) {
      return "";
    }
    const baseRadius = 16;
    const maxRadius = 36;
    const step =
      moons.length > 1
        ? clamp((maxRadius - baseRadius) / (moons.length - 1), 6, 10)
        : 0;
    const markup = moons
      .map((moon, index) => {
        const orbitRadius = baseRadius + index * step;
        const angle =
          moon.orbitAngle ?? (moon.orbitAngle = rand() * TAU);
        const mx = x + Math.cos(angle) * orbitRadius;
        const my = y + Math.sin(angle) * orbitRadius;
        return `
          <circle class="satellite-orbit" cx="${x.toFixed(
            1
          )}" cy="${y.toFixed(1)}" r="${orbitRadius.toFixed(1)}" />
          <circle class="satellite-body satellite-body--small" cx="${mx.toFixed(
            1
          )}" cy="${my.toFixed(1)}" r="2.4" />
        `;
      })
      .join("");
    return `<g class="satellites">${markup}</g>`;
  }

  if (body.typeKey === "gas") {
    const elements = [];
    body.gas.rings.forEach((ring) =>
      elements.push({ kind: "ring", empty: ring.empty })
    );
    body.gas.smallMoons.forEach((moon) =>
      elements.push({ kind: "small", moon })
    );
    body.gas.majorMoons.forEach((moon) =>
      elements.push({ kind: "major", moon })
    );

    if (elements.length === 0) {
      return "";
    }

    const baseRadius = 26;
    const maxRadius = 78;
    const step =
      elements.length > 1
        ? clamp((maxRadius - baseRadius) / (elements.length - 1), 6, 12)
        : 0;

    const markup = elements
      .map((element, index) => {
        const orbitRadius = baseRadius + index * step;
        const ringClass =
          element.kind === "ring"
            ? `satellite-orbit satellite-orbit--ring${
                element.empty ? " satellite-orbit--empty" : ""
              }`
            : "satellite-orbit";
        const orbitMarkup = `<circle class="${ringClass}" cx="${x.toFixed(
          1
        )}" cy="${y.toFixed(1)}" r="${orbitRadius.toFixed(1)}" />`;

        if (element.kind === "ring") {
          return orbitMarkup;
        }

        const moon = element.moon;
        const angle =
          moon.orbitAngle ?? (moon.orbitAngle = rand() * TAU);
        const mx = x + Math.cos(angle) * orbitRadius;
        const my = y + Math.sin(angle) * orbitRadius;
        const moonClass =
          element.kind === "major"
            ? "satellite-body satellite-body--major"
            : "satellite-body satellite-body--small";
        const moonRadius = element.kind === "major" ? 3.4 : 2.6;
        return `
          ${orbitMarkup}
          <circle class="${moonClass}" cx="${mx.toFixed(
          1
        )}" cy="${my.toFixed(1)}" r="${moonRadius}" />
        `;
      })
      .join("");

    return `<g class="satellites">${markup}</g>`;
  }

  return "";
};

const renderShadows = (bodies, center) => {
  let defsMarkup = "";
  let linesMarkup = "";

  bodies.forEach((body) => {
    if (body.typeKey !== "rocky" && body.typeKey !== "gas") {
      return;
    }

    const angle = body.orbitAngle;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const bodyRadius = body.typeKey === "gas" ? 20 : 11;
    const length = body.typeKey === "gas" ? 110 : 80;
    const start = body.orbitRadius + bodyRadius + 6;
    const end = body.orbitRadius + bodyRadius + length;
    const x1 = center + dirX * start;
    const y1 = center + dirY * start;
    const x2 = center + dirX * end;
    const y2 = center + dirY * end;
    const gradId = `shadow-${body.id}`;

    defsMarkup += `
      <linearGradient id="${gradId}" gradientUnits="userSpaceOnUse" x1="${x1.toFixed(
        1
      )}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(
        1
      )}" y2="${y2.toFixed(1)}">
        <stop offset="0%" stop-color="rgb(4, 8, 16)" stop-opacity="0.55" />
        <stop offset="60%" stop-color="rgb(4, 8, 16)" stop-opacity="0.18" />
        <stop offset="100%" stop-color="rgb(4, 8, 16)" stop-opacity="0" />
      </linearGradient>
    `;

    linesMarkup += `<line class="shadow-line" x1="${x1.toFixed(
      1
    )}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(
      1
    )}" stroke="url(#${gradId})" stroke-width="${(
      bodyRadius * 2
    ).toFixed(1)}" />`;
  });

  return {
    defsMarkup,
    linesMarkup,
  };
};

const renderMap = (system) => {
  const svg = document.getElementById("system-map");
  const center = 500;
  const offsets = starOffsets(system.starsOrdered.length);
  const bodies = system.bodiesOrdered ?? system.bodies;

  const orbitMarkup = bodies
    .map((body) => {
      if (body.typeKey === "belt") {
        return "";
      }
      const bandClass = body.bandKey.toLowerCase();
      return `<circle class="orbit orbit--${bandClass} focus-dim" data-focus-id="${body.id}" cx="${center}" cy="${center}" r="${body.orbitRadius.toFixed(
        2
      )}" />`;
    })
    .join("");

  const beltMarkup = bodies
    .filter((body) => body.typeKey === "belt")
    .map((body) => renderBeltCloud(body, center))
    .join("");

  const shadowMarkup = renderShadows(bodies, center);

  const starMarkup = system.starsOrdered
    .map((star, index) => {
      const [dx, dy] = offsets[index] || [0, 0];
      const radius = starRadius(star.sizeRank);
      return `
        <g class="star" transform="translate(${center + dx} ${center + dy})">
          <circle class="star-core" r="${radius}" fill="${star.hex}" />
        </g>
      `;
    })
    .join("");

  const bodyMarkup = bodies
    .map((body) => {
      const angle = body.orbitAngle;
      const x = center + Math.cos(angle) * body.orbitRadius;
      const y = center + Math.sin(angle) * body.orbitRadius;
      const labelX = x + Math.cos(angle) * 24;
      const labelY = y + Math.sin(angle) * 24;
      const bandClass = body.bandKey.toLowerCase();
      const satellites = renderSatellites(body, x, y);

      if (body.typeKey === "rocky") {
        return `
          <g class="body body--rocky body--${bandClass} focus-dim" data-focus-id="${body.id}">
            ${satellites}
            <circle class="planet-core" cx="${x.toFixed(
              1
            )}" cy="${y.toFixed(1)}" r="11" />
            <text class="body-label" x="${labelX.toFixed(
              1
            )}" y="${labelY.toFixed(1)}">${body.id}</text>
          </g>
        `;
      }

      if (body.typeKey === "gas") {
        return `
          <g class="body body--gas body--${bandClass} focus-dim" data-focus-id="${body.id}">
            ${satellites}
            <circle class="gas-core" cx="${x.toFixed(1)}" cy="${y.toFixed(
          1
        )}" r="20" />
            <circle class="gas-band" cx="${x.toFixed(1)}" cy="${y.toFixed(
          1
        )}" r="13" />
            <text class="body-label" x="${labelX.toFixed(
              1
            )}" y="${labelY.toFixed(1)}">${body.id}</text>
          </g>
        `;
      }

      return `
        <g class="body body--belt body--${bandClass} focus-dim" data-focus-id="${body.id}">
          <circle class="belt-marker belt-marker--ring" cx="${x.toFixed(
            1
          )}" cy="${y.toFixed(1)}" r="7" />
          <circle class="belt-marker belt-marker--core" cx="${x.toFixed(
            1
          )}" cy="${y.toFixed(1)}" r="2.4" />
          <text class="body-label" x="${labelX.toFixed(
            1
          )}" y="${labelY.toFixed(1)}">${body.id}</text>
        </g>
      `;
    })
    .join("");

  svg.innerHTML = `
    <defs>
      ${shadowMarkup.defsMarkup}
    </defs>
    ${orbitMarkup}
    ${beltMarkup}
    ${shadowMarkup.linesMarkup}
    ${starMarkup}
    ${bodyMarkup}
  `;
};

const infoLine = (label, value, extraClass = "") =>
  `<div class="info-line ${extraClass}"><span class="info-label">${label}</span><span class="info-value">${value}</span></div>`;

const renderTooltip = (title, lines) => {
  const rows = lines
    .map(
      (line) =>
        `<div class="tooltip-row"><span class="tooltip-label">${line.label}</span><span class="tooltip-value">${line.value}</span></div>`
    )
    .join("");
  return `<div class="tooltip"><div class="tooltip-title">${title}</div>${rows}</div>`;
};

const renderItemChip = (label, tooltipTitle, lines) =>
  `<div class="item-chip" tabindex="0">${label}${renderTooltip(
    tooltipTitle,
    lines
  )}</div>`;

const renderItemSection = (title, itemsHtml) =>
  `<div class="sub-section"><div class="sub-title">${title}</div><div class="item-list">${itemsHtml}</div></div>`;

const renderStripDot = (label, className, tooltipTitle, lines) =>
  `<div class="strip-dot ${className}" tabindex="0" aria-label="${label}">${renderTooltip(
    tooltipTitle,
    lines
  )}</div>`;

const renderStripBody = (body) => {
  const bandClass = body.band.className;
  const typeClass =
    body.typeKey === "gas"
      ? "strip-dot--gas"
      : body.typeKey === "belt"
      ? "strip-dot--belt"
      : "strip-dot--rocky";

  let mainLines = [];
  if (body.typeKey === "rocky") {
    mainLines = [
      { label: "Type", value: body.rocky.planetType },
      { label: "Description", value: body.rocky.description },
      { label: "Tectonics", value: body.rocky.tectonics },
      { label: "Atmosphere", value: body.rocky.atmosphere },
      { label: "Water", value: body.rocky.water },
    ];
  } else if (body.typeKey === "gas") {
    mainLines = [
      { label: "Type", value: body.gas.type },
      { label: "Description", value: body.gas.description },
      { label: "Appearance", value: body.gas.appearance },
      { label: "Rings", value: body.gas.rings.length.toString() },
      { label: "Small moons", value: body.gas.smallMoons.length.toString() },
      { label: "Major moons", value: body.gas.majorMoons.length.toString() },
    ];
  } else {
    mainLines = [
      { label: "Major asteroids", value: body.belt.majorCount.toString() },
    ];
  }

  const mainDot = renderStripDot(
    body.id,
    `strip-dot--main strip-dot--${bandClass} ${typeClass}`,
    `${body.id} ${body.typeLabel}`,
    mainLines
  );
  const mainMarkup = `<div class="strip-main">${mainDot}<div class="strip-dot-label">${body.id}</div></div>`;

  const subDots = [];
  if (body.typeKey === "rocky") {
    body.rocky.smallMoons.forEach((moon, index) => {
      const lines = [
        { label: "Archetype", value: moon.archetype },
        { label: "Description", value: moon.description },
        { label: "Geology", value: moon.geology },
        { label: "Atmosphere", value: moon.atmosphere },
        { label: "Water", value: moon.water },
      ];
      subDots.push(
        renderStripDot(
          `SM${index + 1}`,
          `strip-dot--sub strip-dot--${bandClass}`,
          `SM${index + 1}`,
          lines
        )
      );
    });
  } else if (body.typeKey === "gas") {
    body.gas.rings.forEach((ring, index) => {
      const lines = [
        {
          label: "Status",
          value: ring.empty ? "Empty slot" : "Ring system",
        },
      ];
      subDots.push(
        renderStripDot(
          `R${index + 1}`,
          `strip-dot--sub strip-dot--ring strip-dot--${bandClass}`,
          `R${index + 1}`,
          lines
        )
      );
    });
    body.gas.smallMoons.forEach((moon, index) => {
      const lines = [
        { label: "Archetype", value: moon.archetype },
        { label: "Description", value: moon.description },
        { label: "Geology", value: moon.geology },
        { label: "Atmosphere", value: moon.atmosphere },
        { label: "Water", value: moon.water },
      ];
      subDots.push(
        renderStripDot(
          `SM${index + 1}`,
          `strip-dot--sub strip-dot--${bandClass}`,
          `SM${index + 1}`,
          lines
        )
      );
    });
    body.gas.majorMoons.forEach((moon, index) => {
      const lines = [
        { label: "Planet type", value: moon.planetType },
        { label: "Description", value: moon.description },
        { label: "Tectonics", value: moon.tectonics },
        { label: "Atmosphere", value: moon.atmosphere },
        { label: "Water", value: moon.water },
      ];
      subDots.push(
        renderStripDot(
          `MM${index + 1}`,
          `strip-dot--sub strip-dot--${bandClass}`,
          `MM${index + 1}`,
          lines
        )
      );
    });
  } else if (body.typeKey === "belt") {
    body.belt.asteroids.forEach((asteroid, index) => {
      const lines = [
        { label: "Composition", value: asteroid.composition },
        { label: "Surface", value: asteroid.surface },
        { label: "Appearance", value: asteroid.appearance },
      ];
      subDots.push(
        renderStripDot(
          `A${index + 1}`,
          `strip-dot--sub strip-dot--asteroid strip-dot--${bandClass}`,
          `A${index + 1}`,
          lines
        )
      );
    });
  }

  const hasSubs = subDots.length > 0;
  const subHtml = hasSubs
    ? `<div class="strip-stem"></div><div class="strip-subdots">${subDots.join("")}</div>`
    : "";

  return `<div class="strip-body focus-dim${
    hasSubs ? " strip-body--subs" : ""
  }" data-focus-id="${body.id}">${mainMarkup}${subHtml}</div>`;
};

const renderStrip = (system) => {
  const container = document.getElementById("system-strip");
  if (!container) {
    return;
  }
  const bodies = system.bodiesOrdered ?? system.bodies;
  container.innerHTML = bodies.map((body) => renderStripBody(body)).join("");

  const sun = document.getElementById("strip-sun");
  if (sun) {
    const primary = system.starsOrdered[0];
    const starLines = [
      { label: "Type", value: primary.type },
      { label: "Size", value: primary.size },
      { label: "Color", value: primary.color },
      { label: "Light", value: primary.light },
    ];
    sun.style.setProperty("--sun-color", primary.hex);
    sun.title = `Primary ${primary.type} star`;
    sun.setAttribute("tabindex", "0");
    sun.setAttribute("aria-label", `Primary ${primary.type} star`);
    sun.innerHTML = renderTooltip("Primary star", starLines);
  }

  const secondaryWrap = document.getElementById("strip-secondary");
  if (secondaryWrap) {
    const secondaryStars = system.starsOrdered.slice(1);
    secondaryWrap.classList.toggle(
      "has-secondary",
      secondaryStars.length > 0
    );
    secondaryWrap.innerHTML = secondaryStars
      .map(
        (star, index) => {
          const starLines = [
            { label: "Type", value: star.type },
            { label: "Size", value: star.size },
            { label: "Color", value: star.color },
            { label: "Light", value: star.light },
          ];
          return `<div class="strip-secondary-dot" style="--sun-color: ${star.hex}" tabindex="0" aria-label="Secondary ${index + 1} ${star.type} star">${renderTooltip(
            `Secondary ${index + 1}`,
            starLines
          )}</div>`;
        }
      )
      .join("");
  }
};

const groupAsteroids = (asteroids) => {
  const groups = new Map();
  asteroids.forEach((asteroid) => {
    const key = `${asteroid.composition}__${asteroid.surface}__${asteroid.appearance}`;
    if (!groups.has(key)) {
      groups.set(key, {
        composition: asteroid.composition,
        surface: asteroid.surface,
        appearance: asteroid.appearance,
        count: 0,
      });
    }
    groups.get(key).count += 1;
  });
  return Array.from(groups.values());
};

const renderRockyDetails = (world) => {
  let html = "";
  html += infoLine("Planet type", world.planetType);
  html += infoLine("Description", world.description);
  html += infoLine("Appearance", world.appearance);
  html += infoLine("Tectonics", world.tectonics);
  html += infoLine("Atmosphere", world.atmosphere);
  html += infoLine("Water", world.water);

  if (world.smallMoons.length > 0) {
    const items = world.smallMoons
      .map((moon, index) => {
        const label = `SM${index + 1}`;
        const lines = [
          { label: "Description", value: moon.description },
          { label: "Geology", value: moon.geology },
          { label: "Atmosphere", value: moon.atmosphere },
          { label: "Water", value: moon.water },
          { label: "Appearance", value: moon.appearance },
        ];
        return renderItemChip(label, moon.archetype, lines);
      })
      .join("");
    html += renderItemSection(
      `Small moons (${world.smallMoons.length})`,
      items
    );
  } else {
    html += infoLine("Small moons", "0");
  }

  return html;
};

const renderGasDetails = (giant) => {
  let html = "";
  html += infoLine("Giant type", giant.type);
  html += infoLine("Description", giant.description);
  html += infoLine("Appearance", giant.appearance);

  if (giant.rings.length > 0) {
    const items = giant.rings
      .map((ring, index) => {
        const label = `R${index + 1}`;
        const title = ring.empty ? "Empty slot" : "Ring system";
        const lines = [
          {
            label: "Status",
            value: ring.empty ? "Hot giant ring slot is empty" : "Active ring system",
          },
        ];
        return renderItemChip(label, title, lines);
      })
      .join("");
    html += renderItemSection(`Ring slots (${giant.rings.length})`, items);
  }

  if (giant.smallMoons.length > 0) {
    const items = giant.smallMoons
      .map((moon, index) => {
        const label = `SM${index + 1}`;
        const lines = [
          { label: "Description", value: moon.description },
          { label: "Geology", value: moon.geology },
          { label: "Atmosphere", value: moon.atmosphere },
          { label: "Water", value: moon.water },
          { label: "Appearance", value: moon.appearance },
        ];
        return renderItemChip(label, moon.archetype, lines);
      })
      .join("");
    html += renderItemSection(
      `Small moons (${giant.smallMoons.length})`,
      items
    );
  }

  if (giant.majorMoons.length > 0) {
    const items = giant.majorMoons
      .map((moon, index) => {
        const label = `MM${index + 1}`;
        const lines = [
          { label: "Description", value: moon.description },
          { label: "Tectonics", value: moon.tectonics },
          { label: "Atmosphere", value: moon.atmosphere },
          { label: "Water", value: moon.water },
          { label: "Appearance", value: moon.appearance },
        ];
        return renderItemChip(label, moon.planetType, lines);
      })
      .join("");
    html += renderItemSection(
      `Major moons (${giant.majorMoons.length})`,
      items
    );
  }

  return html;
};

const renderBeltDetails = (belt) => {
  let html = "";
  if (belt.asteroids.length === 0) {
    html += infoLine("Asteroids", "None");
    return html;
  }

  const items = groupAsteroids(belt.asteroids)
    .map((group) => {
      const lines = [
        { label: "Surface", value: group.surface },
        { label: "Appearance", value: group.appearance },
      ];
      return renderItemChip(`A x${group.count}`, group.composition, lines);
    })
    .join("");
  html += renderItemSection(`Asteroids (${belt.asteroids.length})`, items);
  return html;
};

const renderDetails = (system) => {
  const container = document.getElementById("details");
  let html = "";

  let secondaryIndex = 0;
  const starLines = system.starsOrdered
    .map((star) => {
      const role = star.isPrimary
        ? "Primary"
        : `Secondary ${++secondaryIndex}`;
      return `
        <div class="sub-section star-section">
          <div class="sub-title">${role} star</div>
          ${infoLine("Type", star.type)}
          ${infoLine("Size", star.size)}
          ${infoLine("Color", star.color)}
          ${infoLine("Light", star.light)}
          ${infoLine("Sky color", star.skyColor)}
          ${infoLine("Flora tint", star.flora)}
        </div>
      `;
    })
    .join("");

  html += `
    <div class="detail-card">
      <div class="card-header">
        <div class="card-title">Stars</div>
        <div class="chip">${system.stars.length} total</div>
      </div>
      ${starLines}
    </div>
  `;

  const bodies = system.bodiesOrdered ?? system.bodies;
  bodies.forEach((body) => {
    const bandClass = body.band.className;
    let bodyDetails = "";
    if (body.typeKey === "rocky") {
      bodyDetails = renderRockyDetails(body.rocky);
    } else if (body.typeKey === "gas") {
      bodyDetails = renderGasDetails(body.gas);
    } else {
      bodyDetails = renderBeltDetails(body.belt);
    }

    html += `
      <div class="detail-card">
        <div class="card-header">
          <div class="card-title">${body.id} ${body.typeLabel}</div>
          <div class="chip ${bandClass}">${body.band.label}</div>
        </div>
        ${bodyDetails}
      </div>
    `;
  });

  container.innerHTML = html;

  const cards = Array.from(container.querySelectorAll(".detail-card"));
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
  });
};

let activeFocusId = "";

const updateFocusState = (focusId) => {
  if (focusId === activeFocusId) {
    return;
  }
  activeFocusId = focusId || "";
  const focusables = document.querySelectorAll("[data-focus-id]");
  focusables.forEach((el) => {
    const isMatch = activeFocusId !== "" && el.dataset.focusId === activeFocusId;
    el.classList.toggle("is-focused", isMatch);
    el.classList.toggle("is-dimmed", activeFocusId !== "" && !isMatch);
  });
};

const setupHoverFocus = () => {
  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest("[data-focus-id]");
    if (target) {
      updateFocusState(target.dataset.focusId);
    }
  });

  document.addEventListener("pointerout", (event) => {
    const from = event.target.closest("[data-focus-id]");
    if (!from) {
      return;
    }
    const to = event.relatedTarget?.closest?.("[data-focus-id]");
    if (to && to.dataset.focusId === from.dataset.focusId) {
      return;
    }
    if (to) {
      updateFocusState(to.dataset.focusId);
    } else {
      updateFocusState("");
    }
  });
};

const buildShareLink = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("seed", currentSeed);
  return url.toString();
};

const renderSystem = (system) => {
  const primary = system.starsOrdered[0];
  const starLabel = `${system.stars.length} star${
    system.stars.length === 1 ? "" : "s"
  }, primary ${primary.type}`;

  const seedDisplay = document.getElementById("seed-display");
  if (seedDisplay) {
    seedDisplay.textContent = `Seed: ${currentSeed}`;
    seedDisplay.classList.toggle("seed-random", currentSeedIsRandom);
  }

  const shareOutput = document.getElementById("share-output");
  if (shareOutput) {
    shareOutput.textContent = "Link: -";
    shareOutput.classList.remove("is-visible");
  }

  const rollDisplay = document.getElementById("roll-count");
  if (rollDisplay) {
    rollDisplay.textContent = rollCount.toString();
  }

  document.getElementById("star-summary").textContent = starLabel;
  document.getElementById("body-count").textContent = `${system.bodyCount} total`;

  renderMap(system);
  renderDetails(system);
  renderStrip(system);
};

const init = () => {
  const button = document.getElementById("generate");
  const seedInput = document.getElementById("seed-input");
  const shareButton = document.getElementById("share-link");
  const shareOutput = document.getElementById("share-output");

  const params = new URLSearchParams(window.location.search);
  const seedFromUrl = params.get("seed");
  if (seedInput && seedFromUrl) {
    seedInput.value = seedFromUrl;
  }

  const generateFromInput = () => {
    const seedValue = seedInput ? seedInput.value : "";
    const seed = setSeed(seedValue || "");
    if (seedInput) {
      seedInput.value = currentSeedIsRandom ? "" : seed;
    }
    const system = generateSystem();
    renderSystem(system);
  };

  generateFromInput();
  setupHoverFocus();

  button.addEventListener("click", generateFromInput);
  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      const url = buildShareLink();
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(url);
          copied = true;
        } catch (error) {
          copied = false;
        }
      }
      if (shareOutput) {
        shareOutput.classList.add("is-visible");
        shareOutput.innerHTML = `${copied ? "Copied" : "Link"}: <a href="${url}" target="_blank" rel="noreferrer">${url}</a>`;
      }
    });
  }
  if (seedInput) {
    seedInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        generateFromInput();
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", init);
