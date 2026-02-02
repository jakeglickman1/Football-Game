const field = document.getElementById("field");
const playLayer = document.getElementById("play-layer");
const ballEl = document.getElementById("ball");
const offenseScoreEl = document.getElementById("offense-score");
const defenseScoreEl = document.getElementById("defense-score");
const downTextEl = document.getElementById("down-text");
const ballSpotEl = document.getElementById("ball-spot");
const messageEl = document.getElementById("play-message");
const powerFillEl = document.getElementById("power-fill");
const losMarkerEl = document.getElementById("los-marker");
const firstDownMarkerEl = document.getElementById("firstdown-marker");
const routeOverlay = document.getElementById("routes-overlay");
const opponentLabelEl = document.getElementById("opponent-name");
const seasonInfoEl = document.getElementById("season-info");
const awayEndzoneEl = document.getElementById("away-endzone");
const homeScreenEl = document.getElementById("home-screen");
const homeRecordEl = document.getElementById("home-record");
const homeStageEl = document.getElementById("home-stage");
const homeOpponentEl = document.getElementById("home-opponent-name");
const homeMessageEl = document.getElementById("home-screen-message");
const homePlayButton = document.getElementById("home-play-button");
const homeSimButton = document.getElementById("home-sim-button");
const rosterListEl = document.getElementById("roster-list");
const rosterSelectEl = document.getElementById("roster-select");
const draftPicksDisplayEl = document.getElementById("draft-picks-display");
const draftBoardEl = document.getElementById("draft-board");
const draftRefreshButton = document.getElementById("draft-refresh-button");
const signPlayerButton = document.getElementById("sign-player");
const releasePlayerButton = document.getElementById("release-player");
const tradePlayerButton = document.getElementById("trade-player");
const popupLayerEl = document.getElementById("popup-layer");
const cpuDriveIndicator = document.createElement("div");
cpuDriveIndicator.id = "cpu-drive-indicator";
cpuDriveIndicator.className = "cpu-drive-indicator";
cpuDriveIndicator.innerHTML = '<div class="drive-dot"></div><span>CPU Drive</span>';
cpuDriveIndicator.style.display = "none";
field.appendChild(cpuDriveIndicator);

const FIELD_PADDING = 35;
const RECEIVER_PRESETS = [
  { label: "WR1", role: "WR", lane: 0.24, breakLane: 0.15, depth: 220, finalLane: 0.12, finalDepth: 140, speed: 150, color: "#ff9c63" },
  { label: "WR2", role: "WR", lane: 0.38, breakLane: 0.5, depth: 250, finalLane: 0.52, finalDepth: 140, speed: 148, color: "#ffda63" },
  { label: "WR3", role: "WR", lane: 0.62, breakLane: 0.75, depth: 230, finalLane: 0.8, finalDepth: 130, speed: 146, color: "#ffa3d6" },
  { label: "TE", role: "TE", lane: 0.48, breakLane: 0.34, depth: 160, finalLane: 0.4, finalDepth: 80, speed: 143, color: "#fff5a1" },
  { label: "RB", role: "RB", lane: 0.7, breakLane: 0.82, depth: 90, finalLane: 0.88, finalDepth: 50, speed: 138, color: "#9de3ff" },
];
const DEFENDER_LANES = [0.22, 0.34, 0.52, 0.68, 0.82];
const OFFENSIVE_LINE_PRESETS = [
  { label: "LT", lane: 0.42 },
  { label: "LG", lane: 0.5 },
  { label: "RG", lane: 0.58 },
  { label: "RT", lane: 0.66 },
];
const DEFENSIVE_LINE_PRESETS = [
  { label: "DE1", lane: 0.4 },
  { label: "DT1", lane: 0.5 },
  { label: "DT2", lane: 0.6 },
  { label: "DE2", lane: 0.7 },
];
const TEAM_POOL = [
  { name: "Cyclones", difficulty: 1.0 },
  { name: "Gladiators", difficulty: 1.05 },
  { name: "Kodiaks", difficulty: 0.95 },
  { name: "Volt", difficulty: 1.1 },
  { name: "Phantoms", difficulty: 1.08 },
  { name: "Outlaws", difficulty: 1.02 },
  { name: "Lynx", difficulty: 0.92 },
  { name: "Comets", difficulty: 1.12 },
  { name: "Sharks", difficulty: 1.04 },
  { name: "Guardians", difficulty: 0.98 },
];
const PLAYOFF_ROUNDS = ["Semifinal", "Championship"];
const GAME_RULES = {
  regularWeeks: 8,
  drivesPerGame: 6,
  targetScore: 35,
};
const ROUTE_PREVIEW_DURATION = 2000;
const CPU_DRIVE_DEFAULT_DISTANCE = 75;
const CPU_DRIVE_BASE_TD = 0.42;
const CPU_DRIVE_BASE_FG = 0.3;
const CPU_DRIVE_ANIMATION_DURATION = 2.4;
const BASE_DRAFT_PICKS = { 1: 1, 2: 1, 3: 1 };
const DRAFT_BOARD_SLOTS_PER_ROUND = 3;
const ROSTER_MIN_SIZE = 5;
const ROSTER_MAX_SIZE = 12;
const INITIAL_ROSTER_POSITIONS = ["QB", "RB", "WR1", "WR2", "WR3", "TE", "LB", "CB"];
const POSITION_RATING_RANGE = {
  QB: [3, 5],
  RB: [2, 5],
  WR1: [3, 5],
  WR2: [2, 5],
  WR3: [2, 4],
  TE: [2, 4],
  LB: [2, 4],
  CB: [2, 4],
  DL: [2, 4],
  S: [2, 4],
};
const FIRST_NAMES = [
  "Miles",
  "Jalen",
  "Tariq",
  "Devin",
  "Harper",
  "Noah",
  "Cruz",
  "Eli",
  "Caleb",
  "Zane",
  "Roman",
];
const LAST_NAMES = [
  "Hendrix",
  "Langford",
  "Samuels",
  "Holloway",
  "Carver",
  "Bennett",
  "Owens",
  "Porter",
  "Dalton",
  "Monroe",
  "Whitaker",
];

const PLAYER_STAT_LABELS = {
  passPower: "Pass Power",
  passAccuracy: "Pass Accuracy",
  speed: "Speed",
  agility: "Agility",
  catching: "Catching",
  strength: "Strength",
  awareness: "Awareness",
  tackling: "Tackling",
  coverage: "Coverage",
};

const POSITION_STAT_FOCUS = {
  QB: ["passPower", "passAccuracy", "speed", "awareness"],
  RB: ["speed", "agility", "strength", "catching"],
  WR1: ["speed", "catching", "agility", "awareness"],
  WR2: ["speed", "catching", "agility", "awareness"],
  WR3: ["speed", "catching", "agility", "awareness"],
  TE: ["strength", "catching", "speed", "awareness"],
  LB: ["tackling", "strength", "speed", "awareness"],
  CB: ["coverage", "speed", "agility", "awareness"],
  DL: ["strength", "tackling", "speed", "awareness"],
  S: ["coverage", "speed", "tackling", "awareness"],
};

const POSITION_ATTRIBUTE_TEMPLATES = {
  default: {
    passPower: [35, 55],
    passAccuracy: [35, 60],
    speed: [48, 82],
    agility: [50, 84],
    catching: [45, 78],
    strength: [48, 82],
    awareness: [45, 82],
    tackling: [45, 78],
    coverage: [45, 78],
  },
  QB: {
    passPower: [60, 97],
    passAccuracy: [58, 96],
    speed: [50, 78],
    agility: [48, 76],
    catching: [35, 60],
    strength: [50, 78],
    awareness: [60, 96],
    tackling: [35, 60],
    coverage: [35, 55],
  },
  RB: {
    passPower: [32, 48],
    passAccuracy: [32, 52],
    speed: [62, 96],
    agility: [62, 96],
    catching: [48, 84],
    strength: [55, 88],
    awareness: [52, 86],
    tackling: [48, 78],
    coverage: [40, 65],
  },
  WR1: {
    passPower: [34, 50],
    passAccuracy: [34, 52],
    speed: [68, 98],
    agility: [65, 95],
    catching: [62, 95],
    strength: [48, 78],
    awareness: [55, 86],
    tackling: [40, 70],
    coverage: [48, 78],
  },
  WR2: {
    passPower: [34, 50],
    passAccuracy: [34, 52],
    speed: [64, 94],
    agility: [62, 92],
    catching: [60, 92],
    strength: [48, 80],
    awareness: [54, 84],
    tackling: [40, 68],
    coverage: [46, 76],
  },
  WR3: {
    passPower: [32, 48],
    passAccuracy: [32, 50],
    speed: [60, 90],
    agility: [60, 90],
    catching: [58, 88],
    strength: [45, 76],
    awareness: [52, 82],
    tackling: [40, 64],
    coverage: [44, 72],
  },
  TE: {
    passPower: [38, 55],
    passAccuracy: [38, 55],
    speed: [56, 82],
    agility: [54, 80],
    catching: [58, 88],
    strength: [60, 92],
    awareness: [56, 86],
    tackling: [50, 80],
    coverage: [46, 74],
  },
  LB: {
    passPower: [35, 50],
    passAccuracy: [35, 52],
    speed: [56, 86],
    agility: [54, 82],
    catching: [48, 74],
    strength: [62, 94],
    awareness: [56, 88],
    tackling: [64, 96],
    coverage: [54, 84],
  },
  CB: {
    passPower: [32, 48],
    passAccuracy: [34, 54],
    speed: [64, 96],
    agility: [66, 96],
    catching: [50, 82],
    strength: [48, 74],
    awareness: [58, 88],
    tackling: [50, 80],
    coverage: [66, 98],
  },
  DL: {
    passPower: [35, 55],
    passAccuracy: [35, 55],
    speed: [52, 78],
    agility: [50, 76],
    catching: [40, 65],
    strength: [66, 98],
    awareness: [54, 84],
    tackling: [66, 98],
    coverage: [46, 72],
  },
  S: {
    passPower: [34, 52],
    passAccuracy: [36, 56],
    speed: [62, 94],
    agility: [64, 94],
    catching: [54, 84],
    strength: [52, 80],
    awareness: [60, 92],
    tackling: [60, 90],
    coverage: [64, 96],
  },
};

const PORTRAIT_SKIN_TONES = ["#f9d0b1", "#f4b98f", "#e09a6d", "#c47a4a", "#9f5c2b", "#7b3f16"];
const PORTRAIT_ACCENTS = ["#ff9c63", "#ffda63", "#ffa3d6", "#9de3ff", "#a090ff", "#6ef3a5"];
const DEFAULT_QB_ACCURACY_SPREAD = 16;

let fieldSize = getFieldSize();

const THROW_MIN_SPEED = 200;
const THROW_MAX_SPEED = 420;
const THROW_CHARGE_TIME = 1.2;

const state = {
  offenseScore: 0,
  defenseScore: 0,
  drive: 1,
  down: 1,
  ballOn: 20,
  nextFirstDown: 30,
  lineOfScrimmage: 20,
  playClock: 0,
  playActive: false,
  keyState: new Set(),
  lastTime: performance.now(),
  players: {
    qb: null,
    receivers: [],
    defenders: [],
    offensiveLine: [],
    defensiveLine: [],
  },
  controlledPlayer: null,
  ball: {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    z: 0,
    vz: 0,
    gravity: -900,
    flightDuration: 0,
    inFlight: false,
    flightTime: 0,
    carrier: null,
    targetPoint: null,
  },
  chargingThrow: false,
  throwCharge: 0,
  pointer: {
    x: 0,
    y: 0,
    inside: false,
  },
  routePreviewVisible: false,
  routePreviewTimeout: null,
  franchise: null,
  cpuDrive: null,
  homeScreen: {
    visible: false,
    busy: false,
    pendingMessage: "",
    selectedProspectId: null,
  },
  draftBoard: [],
  qbModifiers: {
    power: 1,
    accuracySpread: DEFAULT_QB_ACCURACY_SPREAD,
  },
  awaitingSnap: false,
};

function setBallCarrier(player) {
  if (state.ball.carrier && state.ball.carrier.element) {
    state.ball.carrier.element.classList.remove("has-ball");
  }
  state.ball.carrier = player || null;
  if (player?.element) {
    player.element.classList.add("has-ball");
  }
}

function getFieldSize() {
  const rect = field.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function yardsToX(yards) {
  const playableWidth = fieldSize.width - FIELD_PADDING * 2;
  return FIELD_PADDING + (yards / 100) * playableWidth;
}

function xToYards(x) {
  const playableWidth = fieldSize.width - FIELD_PADDING * 2;
  return clamp(((x - FIELD_PADDING) / playableWidth) * 100, 0, 100);
}

function hasBallCarrierCrossedLos() {
  if (!state.ball.carrier) {
    return false;
  }
  const yards = xToYards(state.ball.carrier.x);
  return yards >= state.lineOfScrimmage + 0.25;
}

function defenderShouldStayInCoverage(assigned, carrier, carrierPastLos) {
  if (!assigned) {
    return false;
  }
  if (!carrier) {
    return true;
  }
  if (state.ball.inFlight) {
    return true;
  }
  if (carrier === state.players.qb && !carrierPastLos) {
    return true;
  }
  if (carrier === assigned && !carrierPastLos) {
    return true;
  }
  return false;
}

function createPlayer(label, team, role) {
  const el = document.createElement("div");
  el.className = `player ${team} ${role}`;
  const avatar = document.createElement("div");
  avatar.className = "player-avatar";
  const badge = document.createElement("span");
  badge.className = "player-label";
  badge.textContent = label;
  el.appendChild(avatar);
  el.appendChild(badge);
  playLayer.appendChild(el);
  return {
    label,
    team,
    role,
    x: 0,
    y: 0,
    speed: 200,
    baseSpeed: 200,
    element: el,
    labelElement: badge,
    defaultLabel: label,
    displayName: label,
    routePhase: 0,
    breakPoint: null,
    goPoint: null,
    assignment: null,
  };
}

function createPlayers() {
  state.players.qb = createPlayer("QB", "offense", "qb");
  state.players.qb.speed = 140;
  state.players.qb.baseSpeed = 140;
  state.players.receivers = RECEIVER_PRESETS.map((preset) => {
    const receiver = createPlayer(preset.label, "offense", "receiver");
    receiver.speed = preset.speed;
    receiver.baseSpeed = preset.speed;
    receiver.catchRadius = 18;
    receiver.baseCatchRadius = 18;
    receiver.preset = preset;
    receiver.routeColor = preset.color;
    return receiver;
  });
  state.players.defenders = DEFENDER_LANES.map((lane, index) => {
    const defender = createPlayer(`DB${index + 1}`, "defense", "defender");
    defender.speed = 125 + index * 8;
    defender.baseSpeed = defender.speed;
    defender.lane = lane;
    defender.assignmentIndex = index;
    return defender;
  });
  state.players.offensiveLine = OFFENSIVE_LINE_PRESETS.map((preset) => {
    const blocker = createPlayer(preset.label, "offense", "lineman");
    blocker.speed = 115;
    blocker.baseSpeed = blocker.speed;
    blocker.anchor = { lane: preset.lane };
    return blocker;
  });
  state.players.defensiveLine = DEFENSIVE_LINE_PRESETS.map((preset, index) => {
    const rusher = createPlayer(preset.label, "defense", "lineman");
    rusher.speed = 130 + index * 5;
    rusher.baseSpeed = rusher.speed;
    rusher.anchor = { lane: preset.lane };
    return rusher;
  });
}

function generateSchedule(weeks, seasonNumber = 1) {
  const schedule = [];
  const pool = [...TEAM_POOL];
  for (let i = 0; i < weeks; i += 1) {
    if (pool.length === 0) {
      pool.push(...TEAM_POOL);
    }
    const index = Math.floor(Math.random() * pool.length);
    const team = pool.splice(index, 1)[0];
    const difficultyBoost = 0.05 * Math.min(seasonNumber - 1, 4) + 0.02 * i;
    schedule.push({
      name: team.name,
      difficulty: Math.max(0.85, team.difficulty + difficultyBoost),
    });
  }
  return schedule;
}

function generatePlayoffOpponents(seasonNumber = 1) {
  return PLAYOFF_ROUNDS.map((round, index) => {
    const team = TEAM_POOL[(index + seasonNumber) % TEAM_POOL.length];
    const difficulty = team.difficulty + 0.1 * (index + 1) + 0.06 * seasonNumber;
    return {
      name: `${team.name} ${round === "Championship" ? "Elite" : ""}`.trim(),
      difficulty: Math.min(1.4, difficulty),
    };
  });
}

function getOpponentDifficultyMultiplier() {
  const opponent = state.franchise?.opponent;
  return opponent ? clamp(opponent.difficulty, 0.8, 1.4) : 1;
}

function describeCpuDriveOutcome(outcome, reason) {
  if (outcome === "td") {
    return reason === "short-field"
      ? "Short field: opponent cashes in for six."
      : "Opponent answers with a touchdown.";
  }
  if (outcome === "fg") {
    return reason === "short-field"
      ? "Defense bends but gives up three."
      : "Opponent tacks on a field goal.";
  }
  return reason === "short-field"
    ? "Defense stiffens after the short field."
    : "Defense forces a stop.";
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function randomItem(list) {
  if (!list || list.length === 0) {
    return null;
  }
  return list[Math.floor(Math.random() * list.length)];
}

function getPositionRatingRange(position) {
  return POSITION_RATING_RANGE[position] || [2, 4];
}

function mapStatToRange(statValue, min, max, invert = false) {
  const clamped = clamp(statValue ?? 60, 35, 99);
  const ratio = clamp((clamped - 40) / 55, 0, 1);
  if (invert) {
    return max - (max - min) * ratio;
  }
  return min + (max - min) * ratio;
}

function mapStatToMultiplier(statValue, min = 0.85, max = 1.25) {
  return mapStatToRange(statValue, min, max);
}

function rollAttributeValue(range, rating) {
  const [min, max] = range || [40, 80];
  const ratingRatio = clamp((rating - 1) / 4, 0, 1);
  const base = min + (max - min) * ratingRatio;
  const variance = randomInRange(-6, 6);
  const raw = base + variance;
  return clamp(Math.round(raw), Math.min(min, max) - 5, Math.max(min, max));
}

function generateAttributesForPosition(position, rating) {
  const template = POSITION_ATTRIBUTE_TEMPLATES[position] || POSITION_ATTRIBUTE_TEMPLATES.default;
  const stats = {};
  Object.keys(POSITION_ATTRIBUTE_TEMPLATES.default).forEach((key) => {
    const range = template[key] || POSITION_ATTRIBUTE_TEMPLATES.default[key];
    stats[key] = rollAttributeValue(range, rating);
  });
  return stats;
}

function getPositionDisplayStats(position) {
  return POSITION_STAT_FOCUS[position] || ["speed", "agility", "strength", "awareness"];
}

function getPlayerDisplayStats(player, limit = 4) {
  if (!player?.stats) {
    return [];
  }
  const focus = getPositionDisplayStats(player.position);
  const stats = [];
  focus.forEach((key) => {
    if (stats.length >= limit) {
      return;
    }
    const label = PLAYER_STAT_LABELS[key] || key;
    const value = player.stats[key];
    if (typeof value === "number") {
      stats.push({ key, label, value });
    }
  });
  return stats;
}

function createPortraitSeed(position) {
  return {
    hue: Math.floor(Math.random() * 360),
    accent: randomItem(PORTRAIT_ACCENTS),
    tone: randomItem(PORTRAIT_SKIN_TONES),
    pattern: Math.random() > 0.5 ? "diag" : "rings",
    position,
  };
}

function svgToDataUrl(svg) {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml,${encoded}`;
}

function generatePortraitDataUrl(seed) {
  if (!seed) {
    return "";
  }
  const jerseyHue = seed.hue;
  const accent = seed.accent || "#ff9c63";
  const tone = seed.tone || "#f9d0b1";
  const bg = `hsl(${jerseyHue}, 65%, 30%)`;
  const patternColor = `hsl(${(jerseyHue + 40) % 360}, 70%, 45%)`;
  const stroke = seed.pattern === "diag" ? patternColor : accent;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="${patternColor}"/>
      </linearGradient>
    </defs>
    <rect width="160" height="200" rx="18" ry="18" fill="url(#bg)"/>
    ${
      seed.pattern === "rings"
        ? '<circle cx="80" cy="40" r="50" fill="none" stroke="' +
          stroke +
          '" stroke-width="8" opacity="0.35"/><circle cx="20" cy="150" r="35" fill="none" stroke="' +
          stroke +
          '" stroke-width="6" opacity="0.35"/>'
        : '<path d="M-20 40 L60 -20 M60 220 L-20 140 M120 -20 L200 60 M120 220 L200 140" stroke="' +
          stroke +
          `" stroke-width="14" opacity="0.3"/>`
    }
    <circle cx="80" cy="70" r="32" fill="${tone}" stroke="#1b0c05" stroke-width="4"/>
    <rect x="45" y="100" width="70" height="70" rx="18" fill="${accent}" stroke="#020203" stroke-width="4"/>
    <rect x="55" y="122" width="50" height="60" rx="14" fill="${accent}" opacity="0.9"/>
    <rect x="40" y="120" width="20" height="50" rx="12" fill="${accent}" opacity="0.85"/>
    <rect x="100" y="120" width="20" height="50" rx="12" fill="${accent}" opacity="0.85"/>
  </svg>`;
  return svgToDataUrl(svg);
}

function renderPlayerCard(player, options = {}) {
  if (!player) {
    return "";
  }
  const stats = getPlayerDisplayStats(player);
  const ratingStars = formatRatingStars(player.rating);
  const classes = ["player-card"];
  if (options.mode === "draft") {
    classes.push("draft-card");
  } else {
    classes.push("roster-card");
  }
  const projectionLabel =
    options.mode === "draft" && typeof player.roundProjection === "number"
      ? `<span class="player-card-projection">Proj R${player.roundProjection}</span>`
      : "";
  const cardStats =
    stats.length > 0
      ? stats
          .map(
            (stat) =>
              `<div class="stat-line"><span>${stat.label}</span><strong>${stat.value}</strong></div>`
          )
          .join("")
      : '<div class="stat-line"><span>Rating</span><strong>--</strong></div>';
  let actionMarkup = "";
  if (options.mode === "draft") {
    const canDraft = options.canDraft && options.draftRound;
    const buttonLabel = canDraft
      ? `Draft (R${options.draftRound})`
      : "Need Pick";
    actionMarkup = `<button class="draft-card-button" data-action="draft" data-player-id="${player.id}" data-round-projection="${player.roundProjection || ""}" data-pick-round="${options.draftRound || ""}" ${canDraft ? "" : "disabled"}>${buttonLabel}</button>`;
  }
  return `
    <div class="${classes.join(" ")}" data-player-id="${player.id}">
      <div class="player-card-media">
        <img src="${player.portrait || ""}" alt="${player.name} portrait" loading="lazy" />
        <span class="player-card-position">${player.position}</span>
        ${projectionLabel}
      </div>
      <div class="player-card-body">
        <div class="player-card-name">${player.name}</div>
        <div class="player-card-rating">
          <span class="stars">${ratingStars}</span>
          <span class="numeric">${player.rating}★</span>
        </div>
        <div class="player-card-stats">
          ${cardStats}
        </div>
        ${actionMarkup}
      </div>
    </div>
  `;
}

function formatRatingStars(rating) {
  const rounded = clamp(Math.round(rating), 1, 5);
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

function updateQuarterbackThrowModifiers(stats) {
  if (!stats) {
    state.qbModifiers.power = 1;
    state.qbModifiers.accuracySpread = DEFAULT_QB_ACCURACY_SPREAD;
    return;
  }
  state.qbModifiers.power = mapStatToMultiplier(stats.passPower ?? 60, 0.9, 1.3);
  state.qbModifiers.accuracySpread = mapStatToRange(stats.passAccuracy ?? 60, 5, 22, true);
}

function applyPlayerAttributeEffects(player) {
  if (!player) {
    return;
  }
  const stats = player.rosterProfile?.stats || null;
  if (!stats) {
    player.speed = player.baseSpeed;
    if (player.role === "receiver") {
      player.catchRadius = player.baseCatchRadius || 18;
    }
    if (player.role === "qb") {
      updateQuarterbackThrowModifiers(null);
    }
    return;
  }
  if (typeof stats.speed === "number") {
    player.speed = player.baseSpeed * mapStatToMultiplier(stats.speed, 0.85, 1.35);
  } else {
    player.speed = player.baseSpeed;
  }
  if (player.role === "receiver") {
    const hands = stats.catching ?? 60;
    const agility = stats.agility ?? 60;
    const boost = mapStatToMultiplier((hands + agility) / 2, 0.85, 1.4);
    player.catchRadius = (player.baseCatchRadius || 18) * boost;
  }
  if (player.role === "qb") {
    const mobility = stats.speed ?? 60;
    player.speed = player.baseSpeed * mapStatToMultiplier(mobility, 0.9, 1.3);
    updateQuarterbackThrowModifiers(stats);
  }
}

function assignFieldPlayerLabel(player, rosterEntry) {
  if (!player || !player.labelElement) {
    return;
  }
  const label = rosterEntry ? rosterEntry.name : player.defaultLabel;
  player.displayName = label;
  player.labelElement.textContent = label;
  if (rosterEntry) {
    player.labelElement.title = `${rosterEntry.position} · ${formatRatingStars(rosterEntry.rating)}`;
    player.rosterProfile = rosterEntry;
  } else {
    player.labelElement.removeAttribute("title");
    player.rosterProfile = null;
  }
  applyPlayerAttributeEffects(player);
}

function generatePlayer(options = {}) {
  const position = options.position || randomItem(Object.keys(POSITION_RATING_RANGE));
  const [minRating, maxRating] = options.ratingRange || getPositionRatingRange(position);
  const rating = clamp(Math.round(randomInRange(minRating, maxRating)), 1, 5);
  const stats = generateAttributesForPosition(position, rating);
  const portraitSeed = createPortraitSeed(position);
  const portrait = generatePortraitDataUrl(portraitSeed);
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    name: `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`,
    position,
    rating,
    stats,
    portrait,
    portraitSeed,
    roundProjection: options.roundProjection || null,
  };
}

function generateInitialRoster() {
  return INITIAL_ROSTER_POSITIONS.map((position) => generatePlayer({ position }));
}

function cloneDraftPicks(picks) {
  const source = picks || BASE_DRAFT_PICKS;
  return {
    1: source[1] ?? BASE_DRAFT_PICKS[1],
    2: source[2] ?? BASE_DRAFT_PICKS[2],
    3: source[3] ?? BASE_DRAFT_PICKS[3],
  };
}

function ensureDraftPicks(franchise) {
  if (!franchise) {
    return cloneDraftPicks(BASE_DRAFT_PICKS);
  }
  if (!franchise.draftPicks) {
    franchise.draftPicks = cloneDraftPicks(BASE_DRAFT_PICKS);
  }
  return franchise.draftPicks;
}

function getDraftRatingRange(round) {
  if (round === 1) {
    return [4, 5];
  }
  if (round === 2) {
    return [3, 5];
  }
  return [2, 4];
}

function getTradeRoundForRating(rating) {
  if (rating >= 5) {
    return 1;
  }
  if (rating >= 4) {
    return 2;
  }
  return 3;
}

function createDraftProspects(roundSlots = DRAFT_BOARD_SLOTS_PER_ROUND) {
  const prospects = [];
  const positions = Object.keys(POSITION_RATING_RANGE);
  [1, 2, 3].forEach((round) => {
    for (let i = 0; i < roundSlots; i += 1) {
      const position = randomItem(positions);
      const ratingRange = getDraftRatingRange(round);
      const prospect = generatePlayer({
        position,
        ratingRange,
        roundProjection: round,
      });
      prospects.push(prospect);
    }
  });
  return prospects;
}

function ensureDraftBoard(franchise) {
  if (!franchise) {
    return [];
  }
  if (!Array.isArray(franchise.draftBoard) || franchise.draftBoard.length === 0) {
    franchise.draftBoard = createDraftProspects();
  }
  state.draftBoard = franchise.draftBoard;
  return franchise.draftBoard;
}

function findPickRoundForProspect(franchise, projection) {
  if (!franchise) {
    return null;
  }
  const picks = ensureDraftPicks(franchise);
  const projected = clamp(projection || 3, 1, 3);
  for (let round = projected; round >= 1; round -= 1) {
    if ((picks[round] || 0) > 0) {
      return round;
    }
  }
  return null;
}

function spendDraftPick(franchise, round) {
  if (!franchise) {
    return false;
  }
  const picks = ensureDraftPicks(franchise);
  if (!picks[round] || picks[round] <= 0) {
    return false;
  }
  picks[round] -= 1;
  return true;
}

function removeProspectFromBoard(franchise, playerId) {
  if (!franchise || !Array.isArray(franchise.draftBoard)) {
    return null;
  }
  const index = franchise.draftBoard.findIndex((prospect) => prospect.id === playerId);
  if (index === -1) {
    return null;
  }
  const [removed] = franchise.draftBoard.splice(index, 1);
  state.draftBoard = franchise.draftBoard;
  return removed;
}

function renderDraftBoard(message) {
  if (!draftBoardEl) {
    return;
  }
  const franchise = state.franchise;
  if (!franchise) {
    draftBoardEl.innerHTML =
      '<div class="draft-empty">Start a new season to scout prospects.</div>';
    return;
  }
  const board = ensureDraftBoard(franchise);
  if (board.length === 0) {
    draftBoardEl.innerHTML =
      '<div class="draft-empty">No prospects available right now. Hit \"New Prospects\" to refresh.</div>';
    return;
  }
  draftBoardEl.innerHTML = board
    .map((prospect) => {
      const availableRound = findPickRoundForProspect(franchise, prospect.roundProjection);
      return renderPlayerCard(prospect, {
        mode: "draft",
        canDraft: Boolean(availableRound),
        draftRound: availableRound,
      });
    })
    .join("");
  highlightSelectedDraftCard();
  if (message) {
    setHomeScreenMessage(message);
  }
}

function refreshDraftBoard(message) {
  const franchise = state.franchise;
  if (!franchise) {
    return;
  }
  franchise.draftBoard = createDraftProspects();
  state.draftBoard = franchise.draftBoard;
  state.homeScreen.selectedProspectId = null;
  renderDraftBoard(message);
}

function highlightSelectedDraftCard() {
  if (!draftBoardEl) {
    return;
  }
  const selectedId = state.homeScreen.selectedProspectId;
  const cards = draftBoardEl.querySelectorAll(".player-card");
  cards.forEach((card) => {
    const cardId = card.getAttribute("data-player-id");
    const isSelected = Boolean(selectedId && cardId === selectedId);
    card.classList.toggle("selected", isSelected);
  });
}

function selectDraftProspect(playerId) {
  if (!state.franchise) {
    state.homeScreen.selectedProspectId = null;
    highlightSelectedDraftCard();
    return;
  }
  const board = ensureDraftBoard(state.franchise);
  const exists = board.some((prospect) => prospect.id === playerId);
  state.homeScreen.selectedProspectId = exists ? playerId : null;
  highlightSelectedDraftCard();
}

function clearSelectedProspectIfMatch(playerId) {
  if (state.homeScreen.selectedProspectId === playerId) {
    state.homeScreen.selectedProspectId = null;
    highlightSelectedDraftCard();
  }
}

function draftProspect(playerId) {
  const franchise = state.franchise;
  if (!franchise || !playerId) {
    return false;
  }
  const roster = franchise.roster || [];
  if (roster.length >= ROSTER_MAX_SIZE) {
    setHomeScreenMessage("Roster full. Make space before drafting.");
    return false;
  }
  const board = ensureDraftBoard(franchise);
  const prospect = board.find((player) => player.id === playerId);
  if (!prospect) {
    setHomeScreenMessage("Prospect not found. Refresh the board.");
    return false;
  }
  const pickRound = findPickRoundForProspect(franchise, prospect.roundProjection);
  if (!pickRound) {
    setHomeScreenMessage("No draft picks available for that prospect.");
    return false;
  }
  if (!spendDraftPick(franchise, pickRound)) {
    setHomeScreenMessage("Unable to spend pick right now.");
    return false;
  }
  removeProspectFromBoard(franchise, playerId);
  roster.push(prospect);
  updateRosterUI();
  updateDraftPicksDisplay();
  clearSelectedProspectIfMatch(playerId);
  renderDraftBoard(`Drafted ${prospect.name} with a round ${pickRound} pick.`);
  return true;
}

function runSeasonDraft(franchise) {
  if (!franchise) {
    return [];
  }
  const picks = ensureDraftPicks(franchise);
  const summary = [];
  [1, 2, 3].forEach((round) => {
    const pickCount = Math.max(picks[round] || 0, 0);
    for (let i = 0; i < pickCount; i += 1) {
      const rookie = generatePlayer({ ratingRange: getDraftRatingRange(round) });
      franchise.roster.push(rookie);
      summary.push(`R${round}: ${rookie.name} (${rookie.position}) ${rookie.rating}★`);
    }
  });
  franchise.draftPicks = cloneDraftPicks(BASE_DRAFT_PICKS);
  return summary;
}

function extractRosterPlayer(roster, position) {
  if (!roster || roster.length === 0) {
    return null;
  }
  const index = roster.findIndex((player) => player.position === position);
  if (index === -1) {
    return null;
  }
  return roster.splice(index, 1)[0];
}

function applyRosterToPlayers() {
  if (!state.players?.qb) {
    return;
  }
  const rosterPool = state.franchise?.roster ? [...state.franchise.roster] : [];
  const assignByPosition = (position, fieldPlayer) => {
    if (!fieldPlayer) {
      return;
    }
    const rosterEntry = extractRosterPlayer(rosterPool, position);
    assignFieldPlayerLabel(fieldPlayer, rosterEntry);
  };
  assignByPosition("QB", state.players.qb);
  state.players.receivers.forEach((receiver) => {
    assignByPosition(receiver.preset.label, receiver);
  });
  const fallbackTargets = [
    ...state.players.offensiveLine,
    ...state.players.defensiveLine,
    ...state.players.defenders,
  ];
  fallbackTargets.forEach((player) => {
    const rosterEntry = rosterPool.length > 0 ? rosterPool.shift() : null;
    assignFieldPlayerLabel(player, rosterEntry);
  });
}

function rollCpuDriveOutcome(options = {}) {
  const difficulty = getOpponentDifficultyMultiplier();
  const distanceToGoal = clamp(
    options.distanceToGoal ?? CPU_DRIVE_DEFAULT_DISTANCE,
    18,
    95
  );
  const shortFieldBoost = Math.max(0, (90 - distanceToGoal) / 135);
  let tdChance = CPU_DRIVE_BASE_TD * difficulty + shortFieldBoost;
  let fgChance = CPU_DRIVE_BASE_FG * (0.8 + 0.2 * difficulty) + shortFieldBoost * 0.5;
  tdChance = clamp(tdChance, 0.08, 0.85);
  const fgCap = Math.max(0, 0.95 - tdChance);
  if (fgCap <= 0) {
    fgChance = 0;
  } else {
    fgChance = clamp(fgChance, 0.05, fgCap);
  }
  const roll = Math.random();
  let outcome = "stop";
  let points = 0;
  if (roll < tdChance) {
    outcome = "td";
    points = 7;
  } else if (roll < tdChance + fgChance) {
    outcome = "fg";
    points = 3;
  }
  let yardsAdvanced = distanceToGoal * randomInRange(0.35, 0.7);
  if (outcome === "td") {
    yardsAdvanced = distanceToGoal;
  } else if (outcome === "fg") {
    const minGain = distanceToGoal * 0.55;
    yardsAdvanced = Math.max(minGain, distanceToGoal - randomInRange(6, 18));
  }
  yardsAdvanced = clamp(yardsAdvanced, 6, distanceToGoal);
  return {
    outcome,
    points,
    summary: describeCpuDriveOutcome(outcome, options.reason || "standard"),
    distanceToGoal,
    yardsAdvanced,
  };
}

function resetCpuDriveSimulation() {
  state.cpuDrive = null;
  cpuDriveIndicator.style.display = "none";
  cpuDriveIndicator.style.opacity = "0";
}

function startCpuDriveSimulation(options = {}, onComplete) {
  if (state.cpuDrive?.active) {
    finishCpuDriveSimulation();
  }
  const roll = rollCpuDriveOutcome(options);
  const startYard = clamp(roll.distanceToGoal, 5, 95);
  let endYard;
  if (roll.outcome === "td") {
    endYard = 0;
  } else {
    endYard = Math.max(
      roll.outcome === "fg" ? 8 : 18,
      startYard - roll.yardsAdvanced
    );
  }
  const startX = yardsToX(startYard);
  const endX = yardsToX(endYard);
  state.cpuDrive = {
    active: true,
    elapsed: 0,
    duration: CPU_DRIVE_ANIMATION_DURATION,
    startX,
    endX,
    outcome: roll,
    callback: onComplete,
  };
  cpuDriveIndicator.style.display = "flex";
  cpuDriveIndicator.style.opacity = "1";
  cpuDriveIndicator.style.left = `${startX}px`;
  if (options.introMessage) {
    setMessage(options.introMessage);
  } else {
    setMessage("Defense takes the field...");
  }
}

function updateCpuDriveSimulation(dt) {
  const sim = state.cpuDrive;
  if (!sim?.active) {
    return;
  }
  sim.elapsed += dt;
  const ratio = clamp(sim.elapsed / sim.duration, 0, 1);
  const eased = ratio * ratio * (3 - 2 * ratio);
  const currentX = sim.startX + (sim.endX - sim.startX) * eased;
  cpuDriveIndicator.style.left = `${currentX}px`;
  if (ratio >= 1) {
    finishCpuDriveSimulation();
  }
}

function finishCpuDriveSimulation() {
  const sim = state.cpuDrive;
  if (!sim) {
    return;
  }
  state.cpuDrive = null;
  cpuDriveIndicator.style.opacity = "0";
  setTimeout(() => {
    cpuDriveIndicator.style.display = "none";
  }, 260);
  if (sim.outcome.points > 0) {
    state.defenseScore += sim.outcome.points;
  }
  if (typeof sim.callback === "function") {
    sim.callback(sim.outcome.summary);
  }
}

function applyOpponentDifficulty(opponent) {
  const multiplier = opponent ? Math.min(1.4, Math.max(0.8, opponent.difficulty)) : 1;
  state.players.defenders.forEach((player) => {
    player.speed = player.baseSpeed * multiplier;
  });
  state.players.defensiveLine.forEach((player) => {
    player.speed = player.baseSpeed * multiplier;
  });
}

function updateOpponentBranding() {
  const opponentName = state.franchise?.opponent?.name || "CPU";
  if (opponentLabelEl) {
    opponentLabelEl.textContent = opponentName;
  }
  if (awayEndzoneEl) {
    awayEndzoneEl.textContent = opponentName.toUpperCase();
  }
}

function describeFranchiseStage(franchise) {
  if (!franchise) {
    return "Exhibition";
  }
  if (franchise.stage === "regular") {
    return `Week ${Math.min(franchise.week, franchise.regularWeeks)}/${franchise.regularWeeks}`;
  }
  if (franchise.stage === "playoffs") {
    return `Playoffs · ${PLAYOFF_ROUNDS[franchise.playoffRound] || "Final"}`;
  }
  return "Exhibition";
}

function updateSeasonHud() {
  if (!seasonInfoEl) {
    return;
  }
  const franchise = state.franchise;
  if (!franchise) {
    seasonInfoEl.textContent = "Season setup...";
    return;
  }
  const stageLabel = describeFranchiseStage(franchise);
  const opponentName = franchise.opponent ? `vs ${franchise.opponent.name}` : "";
  const recordText = `Record ${franchise.record.wins}-${franchise.record.losses}`;
  const trophyText = franchise.trophies > 0 ? ` · Rings ${franchise.trophies}` : "";
  seasonInfoEl.textContent = `Season ${franchise.season} · ${stageLabel} · ${opponentName} · ${recordText}${trophyText}`;
}

function setHomeScreenMessage(text) {
  if (homeMessageEl) {
    homeMessageEl.textContent = text || "";
  }
}

function updateDraftPicksDisplay() {
  if (!draftPicksDisplayEl) {
    return;
  }
  const picks = state.franchise?.draftPicks || BASE_DRAFT_PICKS;
  const round1 = picks[1] ?? BASE_DRAFT_PICKS[1];
  const round2 = picks[2] ?? BASE_DRAFT_PICKS[2];
  const round3 = picks[3] ?? BASE_DRAFT_PICKS[3];
  draftPicksDisplayEl.textContent = `Draft Picks: R1×${round1} · R2×${round2} · R3×${round3}`;
}

function updateRosterUI() {
  const roster = state.franchise?.roster || [];
  if (rosterListEl) {
    if (roster.length === 0) {
      rosterListEl.innerHTML = '<div class="roster-empty">No players signed yet.</div>';
    } else {
      rosterListEl.innerHTML = roster.map((player) => renderPlayerCard(player, { mode: "roster" })).join("");
    }
  }
  if (rosterSelectEl) {
    if (roster.length === 0) {
      rosterSelectEl.innerHTML = '<option value="">No players</option>';
      rosterSelectEl.disabled = true;
    } else {
      rosterSelectEl.disabled = false;
      rosterSelectEl.innerHTML = roster
        .map(
          (player) =>
            `<option value="${player.id}">${player.position} · ${player.name} (${player.rating}★)</option>`
        )
        .join("");
    }
  }
  updateDraftPicksDisplay();
  applyRosterToPlayers();
}

function updateHomeScreenPanel(message) {
  const franchise = state.franchise;
  if (!franchise) {
    if (homeRecordEl) {
      homeRecordEl.textContent = "Record 0-0";
    }
    if (homeStageEl) {
      homeStageEl.textContent = "Season setup";
    }
    if (homeOpponentEl) {
      homeOpponentEl.textContent = "CPU";
    }
    setHomeScreenMessage(message);
    return;
  }
  if (homeRecordEl) {
    homeRecordEl.textContent = `Record ${franchise.record.wins}-${franchise.record.losses}`;
  }
  if (homeStageEl) {
    homeStageEl.textContent = `Season ${franchise.season} · ${describeFranchiseStage(franchise)}`;
  }
  if (homeOpponentEl) {
    homeOpponentEl.textContent = franchise.opponent ? franchise.opponent.name : "CPU";
  }
  if (typeof message !== "undefined") {
    setHomeScreenMessage(message);
  }
  updateRosterUI();
  renderDraftBoard();
}

function showHomeScreen(message) {
  if (!homeScreenEl) {
    return;
  }
  const displayMessage = message ?? state.homeScreen.pendingMessage;
  state.homeScreen.pendingMessage = "";
  updateHomeScreenPanel(displayMessage);
  ensureDraftBoard(state.franchise);
  state.homeScreen.selectedProspectId = null;
  renderDraftBoard();
  homeScreenEl.classList.remove("hidden");
  state.homeScreen.visible = true;
  setHomeScreenBusy(false);
}

function hideHomeScreen() {
  if (!homeScreenEl) {
    return;
  }
  homeScreenEl.classList.add("hidden");
  state.homeScreen.visible = false;
  if (homeMessageEl) {
    homeMessageEl.textContent = "";
  }
}

function setHomeScreenBusy(isBusy) {
  state.homeScreen.busy = isBusy;
  if (homePlayButton) {
    homePlayButton.disabled = isBusy;
  }
  if (homeSimButton) {
    homeSimButton.disabled = isBusy;
  }
  if (draftRefreshButton) {
    draftRefreshButton.disabled = isBusy;
  }
  if (signPlayerButton) {
    signPlayerButton.disabled = isBusy;
  }
  if (releasePlayerButton) {
    releasePlayerButton.disabled = isBusy || (state.franchise?.roster || []).length === 0;
  }
  if (tradePlayerButton) {
    tradePlayerButton.disabled = isBusy || (state.franchise?.roster || []).length === 0;
  }
  if (rosterSelectEl) {
    rosterSelectEl.disabled = isBusy || (state.franchise?.roster || []).length === 0;
  }
  updateRosterUI();
}

function queueHomeScreenMessage(message) {
  state.homeScreen.pendingMessage = message || "";
}

function appendHomeScreenMessage(message) {
  if (!message) {
    return;
  }
  if (state.homeScreen.pendingMessage) {
    state.homeScreen.pendingMessage = `${state.homeScreen.pendingMessage} ${message}`;
    return;
  }
  state.homeScreen.pendingMessage = message;
}

function getSelectedRosterPlayerId() {
  if (!rosterSelectEl) {
    return null;
  }
  return rosterSelectEl.value || null;
}

function removeRosterPlayer(franchise, playerId) {
  if (!franchise || !playerId) {
    return null;
  }
  const roster = franchise.roster || [];
  const index = roster.findIndex((player) => player.id === playerId);
  if (index === -1) {
    return null;
  }
  const [removed] = roster.splice(index, 1);
  return removed;
}

function signRandomPlayer() {
  const franchise = state.franchise;
  if (!franchise) {
    return;
  }
  const roster = franchise.roster || [];
  if (roster.length >= ROSTER_MAX_SIZE) {
    setHomeScreenMessage("Roster full. Release or trade a player first.");
    return;
  }
  const newPlayer = generatePlayer();
  roster.push(newPlayer);
  updateRosterUI();
  setHomeScreenMessage(`Signed ${newPlayer.name} (${newPlayer.position})`);
}

function attemptDraftSelectedProspect() {
  const selectedId = state.homeScreen.selectedProspectId;
  if (!selectedId) {
    return false;
  }
  const success = draftProspect(selectedId);
  if (!success) {
    // If drafting failed, keep selection only if prospect still exists (e.g., roster full handled elsewhere)
    const board = state.franchise ? ensureDraftBoard(state.franchise) : [];
    const stillExists = board.some((player) => player.id === selectedId);
    if (!stillExists) {
      state.homeScreen.selectedProspectId = null;
      highlightSelectedDraftCard();
    }
  }
  return success;
}

function releaseSelectedPlayer() {
  const franchise = state.franchise;
  if (!franchise) {
    return;
  }
  const roster = franchise.roster || [];
  if (roster.length <= ROSTER_MIN_SIZE) {
    setHomeScreenMessage("Need to keep core intact. Sign someone before releasing.");
    return;
  }
  const playerId = getSelectedRosterPlayerId();
  const removed = removeRosterPlayer(franchise, playerId);
  if (!removed) {
    setHomeScreenMessage("Select a player to release.");
    return;
  }
  updateRosterUI();
  setHomeScreenMessage(`Released ${removed.name}.`);
}

function tradeSelectedPlayer() {
  const franchise = state.franchise;
  if (!franchise) {
    return;
  }
  const roster = franchise.roster || [];
  if (roster.length <= ROSTER_MIN_SIZE) {
    setHomeScreenMessage("Roster too thin to trade right now.");
    return;
  }
  const playerId = getSelectedRosterPlayerId();
  const removed = removeRosterPlayer(franchise, playerId);
  if (!removed) {
    setHomeScreenMessage("Select a player to trade.");
    return;
  }
  const round = getTradeRoundForRating(removed.rating);
  const picks = ensureDraftPicks(franchise);
  picks[round] = (picks[round] || 0) + 1;
  updateRosterUI();
  setHomeScreenMessage(`Traded ${removed.name} for a round ${round} pick.`);
}

function pickNextOpponent() {
  const franchise = state.franchise;
  if (!franchise) {
    return;
  }
  let opponent = null;
  if (franchise.stage === "regular") {
    opponent = franchise.schedule[Math.min(franchise.week - 1, franchise.schedule.length - 1)];
  } else if (franchise.stage === "playoffs") {
    const fallbackIndex = Math.max(franchise.playoffOpponents.length - 1, 0);
    opponent = franchise.playoffOpponents[franchise.playoffRound] || franchise.playoffOpponents[fallbackIndex];
  }
  if (!opponent) {
    opponent = { name: "CPU", difficulty: 1 };
  }
  franchise.opponent = opponent;
  applyOpponentDifficulty(opponent);
  updateOpponentBranding();
  updateSeasonHud();
  if (state.homeScreen.visible) {
    updateHomeScreenPanel();
  }
}

function resetInGameState() {
  state.playActive = false;
  state.awaitingSnap = false;
  state.ball.inFlight = false;
  setBallCarrier(null);
  hideRoutePreview();
  state.offenseScore = 0;
  state.defenseScore = 0;
  state.drive = 1;
  state.down = 1;
  state.ballOn = 20;
  state.lineOfScrimmage = 20;
  state.nextFirstDown = 30;
  updateHud();
  resetCpuDriveSimulation();
}

function prepareMatch() {
  hideHomeScreen();
  applyRosterToPlayers();
  resetInGameState();
  startPlay();
}

function setupFormation() {
  const lineX = yardsToX(state.ballOn);
  const qb = state.players.qb;
  qb.x = lineX - 60;
  qb.y = fieldSize.height / 2;
  qb.speed = 140;

  state.players.receivers.forEach((receiver) => {
    const preset = receiver.preset;
    const startY = fieldSize.height * preset.lane;
    const startX = lineX - 20;
    receiver.x = startX;
    receiver.y = startY;
    receiver.routePhase = 0;
    receiver.breakPoint = {
      x: clamp(lineX + preset.depth, FIELD_PADDING + 30, fieldSize.width - FIELD_PADDING - 70),
      y: fieldSize.height * preset.breakLane,
    };
    receiver.goPoint = {
      x: clamp(
        (lineX + preset.depth) + (preset.finalDepth || 100),
        FIELD_PADDING + 50,
        fieldSize.width - FIELD_PADDING - 20
      ),
      y: fieldSize.height * (preset.finalLane ?? preset.breakLane),
    };
    receiver.routePath = [
      { x: startX, y: startY },
      { ...receiver.breakPoint },
      { ...receiver.goPoint },
    ];
  });

  state.players.defenders.forEach((defender, index) => {
    const assignment = state.players.receivers[index] || null;
    defender.assignment = assignment;
    if (assignment) {
      defender.x = clamp(lineX + 30 + index * 10, FIELD_PADDING + 40, fieldSize.width - FIELD_PADDING - 60);
      defender.y = assignment.y - 18;
    } else {
      defender.x = clamp(lineX + 120 + index * 30, FIELD_PADDING + 40, fieldSize.width - FIELD_PADDING - 40);
      defender.y = fieldSize.height * defender.lane;
    }
  });
  state.players.offensiveLine.forEach((blocker, index) => {
    blocker.x = lineX - 25;
    blocker.y = fieldSize.height * blocker.anchor.lane;
    blocker.assignment = state.players.defensiveLine[index] || null;
  });
  state.players.defensiveLine.forEach((rusher) => {
    rusher.x = lineX + 25;
    rusher.y = fieldSize.height * rusher.anchor.lane;
    rusher.assignment = null;
  });

  setBallCarrier(qb);
  state.ball.inFlight = false;
  state.ball.targetPoint = null;
  state.ball.flightTime = 0;
  state.ball.flightDuration = 0;
  state.playClock = 0;
  state.controlledPlayer = qb;
  state.chargingThrow = false;
  state.throwCharge = 0;
  updatePowerMeter(0);
  state.pointer.x = qb.x;
  state.pointer.y = qb.y;
  state.pointer.inside = true;
  showRoutePreview();
}

function formatDown(down) {
  switch (down) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    default:
      return "4th";
  }
}

function updateHud() {
  offenseScoreEl.textContent = state.offenseScore;
  defenseScoreEl.textContent = state.defenseScore;
  const yardsToGo = Math.max(1, Math.round(state.nextFirstDown - state.ballOn));
  downTextEl.textContent = `${formatDown(state.down)} & ${yardsToGo}`;
  ballSpotEl.textContent = `Ball On: ${Math.round(state.ballOn)}`;
  updateMarkers();
  updateSeasonHud();
}

function updateMarkers() {
  if (!losMarkerEl || !firstDownMarkerEl) {
    return;
  }
  const losX = yardsToX(state.lineOfScrimmage);
  const firstX = yardsToX(Math.min(100, state.nextFirstDown));
  losMarkerEl.style.left = `${losX}px`;
  firstDownMarkerEl.style.left = `${firstX}px`;
}

const POPUP_MAX_STACK = 4;

function showPopup(text, options = {}) {
  if (!popupLayerEl) {
    return;
  }
  const { type = "info", duration = 1900 } = options;
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.textContent = text;
  popupLayerEl.appendChild(popup);
  requestAnimationFrame(() => {
    popup.classList.add("visible");
  });
  setTimeout(() => {
    popup.classList.remove("visible");
    popup.classList.add("exiting");
    setTimeout(() => popup.remove(), 250);
  }, duration);
  while (popupLayerEl.childElementCount > POPUP_MAX_STACK) {
    popupLayerEl.removeChild(popupLayerEl.firstElementChild);
  }
}

function showDownDistancePopup() {
  const yardsToGo = Math.max(1, Math.round(state.nextFirstDown - state.ballOn));
  showPopup(`${formatDown(state.down)} & ${yardsToGo} · Ball ${Math.round(state.ballOn)}`, {
    type: "info",
    duration: 1500,
  });
}

function showYardagePopup(yards) {
  const rounded = Math.round(yards);
  if (rounded === 0) {
    showPopup("No gain", { type: "info", duration: 1500 });
    return;
  }
  const type = rounded > 0 ? "success" : "warning";
  const absVal = Math.abs(rounded);
  const label = rounded > 0 ? `Gain of ${absVal}` : `Loss of ${absVal}`;
  showPopup(`${label} yds`, { type, duration: 1800 });
}

function setMessage(text) {
  messageEl.textContent = text;
}

function updatePowerMeter(ratio) {
  if (!powerFillEl) {
    return;
  }
  const clampedRatio = clamp(ratio, 0, 1);
  powerFillEl.style.width = `${(clampedRatio * 100).toFixed(1)}%`;
}

function renderRoutePreview() {
  if (!routeOverlay) {
    return;
  }
  routeOverlay.innerHTML = "";
  routeOverlay.setAttribute("viewBox", `0 0 ${fieldSize.width} ${fieldSize.height}`);
  routeOverlay.setAttribute("width", "100%");
  routeOverlay.setAttribute("height", "100%");
  state.players.receivers.forEach((receiver) => {
    if (!receiver.routePath) {
      return;
    }
    const path = receiver.routePath.map((point) => `${point.x},${point.y}`).join(" ");
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", path);
    polyline.setAttribute("class", "route-line");
    if (receiver.routeColor) {
      polyline.style.stroke = receiver.routeColor;
    }
    routeOverlay.appendChild(polyline);
  });
}

function showRoutePreview() {
  if (!routeOverlay) {
    return;
  }
  renderRoutePreview();
  routeOverlay.classList.add("visible");
  state.routePreviewVisible = true;
  if (state.routePreviewTimeout) {
    clearTimeout(state.routePreviewTimeout);
  }
  state.routePreviewTimeout = setTimeout(() => {
    hideRoutePreview();
  }, ROUTE_PREVIEW_DURATION);
}

function hideRoutePreview() {
  if (!routeOverlay || !state.routePreviewVisible) {
    return;
  }
  routeOverlay.classList.remove("visible");
  routeOverlay.innerHTML = "";
  state.routePreviewVisible = false;
  if (state.routePreviewTimeout) {
    clearTimeout(state.routePreviewTimeout);
    state.routePreviewTimeout = null;
  }
}

function updatePointerFromEvent(event) {
  const rect = field.getBoundingClientRect();
  const localX = event.clientX - rect.left;
  const localY = event.clientY - rect.top;
  state.pointer.x = clamp(localX, FIELD_PADDING, fieldSize.width - FIELD_PADDING);
  state.pointer.y = clamp(localY, FIELD_PADDING, fieldSize.height - FIELD_PADDING);
  state.pointer.inside = true;
}

function handleFieldPointerMove(event) {
  updatePointerFromEvent(event);
}

function handleFieldPointerDown(event) {
  if (event.button !== 0) {
    return;
  }
  event.preventDefault();
  updatePointerFromEvent(event);
  startChargingThrow();
}

function handleFieldPointerLeave() {
  state.pointer.inside = false;
}

function handleGlobalPointerUp(event) {
  if (event.button !== 0) {
    return;
  }
  releaseThrow();
}

function startPlay() {
  setupFormation();
  state.playActive = false;
  state.awaitingSnap = true;
  setMessage(
    `Drive ${state.drive} · ${formatDown(state.down)} & ${Math.max(
      1,
      Math.round(state.nextFirstDown - state.ballOn)
    )} · Press Space to snap`
  );
  updateHud();
  showDownDistancePopup();
}

function snapBall() {
  if (!state.awaitingSnap || state.playActive || state.homeScreen.visible) {
    return;
  }
  state.awaitingSnap = false;
  state.playActive = true;
  state.playClock = 0;
  setMessage("Ball snapped! Routes developing...");
}

function resetGame() {
  resetFranchiseProgress();
}

function beginSeason(seasonNumber, trophies, carryover = {}) {
  const roster =
    carryover.roster && carryover.roster.length > 0
      ? [...carryover.roster]
      : generateInitialRoster();
  const draftPicks = cloneDraftPicks(carryover.draftPicks || BASE_DRAFT_PICKS);
  state.franchise = {
    season: seasonNumber,
    week: 1,
    regularWeeks: GAME_RULES.regularWeeks,
    stage: "regular",
    record: { wins: 0, losses: 0 },
    playoffRound: 0,
    trophies,
    schedule: generateSchedule(GAME_RULES.regularWeeks, seasonNumber),
    playoffOpponents: [],
    opponent: null,
    roster,
    draftPicks,
    draftBoard: createDraftProspects(),
  };
  state.draftBoard = state.franchise.draftBoard;
  applyRosterToPlayers();
  pickNextOpponent();
  showHomeScreen();
}

function advanceSeason() {
  const previous = state.franchise;
  const trophies = previous ? previous.trophies : 0;
  const nextSeason = previous ? previous.season + 1 : 1;
  let carryover = {};
  if (previous) {
    const draftSummary = runSeasonDraft(previous);
    carryover = {
      roster: previous.roster ? [...previous.roster] : [],
      draftPicks: previous.draftPicks ? { ...previous.draftPicks } : cloneDraftPicks(BASE_DRAFT_PICKS),
    };
    const draftMessage =
      draftSummary.length > 0
        ? `Draft haul · ${draftSummary.join(" · ")}`
        : "Draft complete. Roster reloaded for the new season.";
    appendHomeScreenMessage(draftMessage);
  }
  beginSeason(nextSeason, trophies, carryover);
}

function resetFranchiseProgress() {
  beginSeason(1, 0);
}

function canStartThrow() {
  return (
    state.playActive &&
    !state.ball.inFlight &&
    state.ball.carrier === state.players.qb &&
    !state.chargingThrow
  );
}

function startChargingThrow() {
  if (!canStartThrow()) {
    return;
  }
  state.chargingThrow = true;
  state.throwCharge = 0;
  updatePowerMeter(0);
  setMessage("Charging throw... release the click to fire.");
}

function releaseThrow() {
  if (!state.chargingThrow) {
    return;
  }
  const charge = clamp(state.throwCharge, 0, 1);
  state.chargingThrow = false;
  updatePowerMeter(0);
  attemptPass(charge);
}

function attemptPass(powerRatio = 0.5) {
  if (
    !state.playActive ||
    state.ball.inFlight ||
    state.ball.carrier !== state.players.qb
  ) {
    return;
  }
  hideRoutePreview();
  const normalizedPower = clamp(powerRatio, 0, 1);
  const accuracySpread = state.qbModifiers?.accuracySpread ?? DEFAULT_QB_ACCURACY_SPREAD;
  const jitterX = randomInRange(-accuracySpread, accuracySpread);
  const jitterY = randomInRange(-accuracySpread, accuracySpread);
  const passTarget = {
    x: clamp(state.pointer.x + jitterX, FIELD_PADDING, fieldSize.width - FIELD_PADDING),
    y: clamp(state.pointer.y + jitterY, FIELD_PADDING, fieldSize.height - FIELD_PADDING),
  };
  state.ball.targetPoint = passTarget;
  state.ball.inFlight = true;
  state.ball.flightTime = 0;
  setBallCarrier(null);
  const dx = passTarget.x - state.players.qb.x;
  const dy = passTarget.y - state.players.qb.y;
  const horizontalDistance = Math.hypot(dx, dy) || 1;
  const powerMultiplier = state.qbModifiers?.power ?? 1;
  const baseHorizontalSpeed =
    (THROW_MIN_SPEED + (THROW_MAX_SPEED - THROW_MIN_SPEED) * normalizedPower) * powerMultiplier;
  const duration = clamp(horizontalDistance / baseHorizontalSpeed, 0.75, 1.45);
  state.ball.flightDuration = duration;
  state.ball.z = 10;
  state.ball.vx = dx / duration;
  state.ball.vy = dy / duration;
  state.ball.vz = -(state.ball.z + 0.5 * state.ball.gravity * duration * duration) / duration;
  setMessage(`Ball in the air · Power ${Math.round(normalizedPower * 100)}%`);
}

function movePlayer(player, dx, dy) {
  player.x = clamp(player.x + dx, FIELD_PADDING, fieldSize.width - FIELD_PADDING);
  player.y = clamp(player.y + dy, FIELD_PADDING, fieldSize.height - FIELD_PADDING);
}

function handleUserMovement(dt) {
  const controlled = state.controlledPlayer;
  if (!controlled) {
    return;
  }
  const horizontal = (state.keyState.has("ArrowRight") ? 1 : 0) -
    (state.keyState.has("ArrowLeft") ? 1 : 0);
  const vertical = (state.keyState.has("ArrowDown") ? 1 : 0) -
    (state.keyState.has("ArrowUp") ? 1 : 0);
  if (horizontal === 0 && vertical === 0) {
    return;
  }
  if (state.routePreviewVisible) {
    hideRoutePreview();
  }
  const sprintMultiplier = state.keyState.has("Shift") ? 1.25 : 1;
  const magnitude = Math.hypot(horizontal, vertical) || 1;
  const speed = controlled.speed * sprintMultiplier * dt;
  movePlayer(
    controlled,
    (horizontal / magnitude) * speed,
    (vertical / magnitude) * speed
  );
}

function moveToward(player, targetX, targetY, speed, dt) {
  const dx = targetX - player.x;
  const dy = targetY - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) {
    return;
  }
  movePlayer(player, (dx / distance) * speed * dt, (dy / distance) * speed * dt);
}

function updateReceivers(dt) {
  state.players.receivers.forEach((receiver) => {
    if (state.ball.carrier === receiver) {
      return;
    }
    const target = receiver.routePhase === 0 ? receiver.breakPoint : receiver.goPoint;
    moveToward(receiver, target.x, target.y, receiver.speed, dt);
    const distance = Math.hypot(receiver.x - target.x, receiver.y - target.y);
    if (distance < 6 && receiver.routePhase === 0) {
      receiver.routePhase = 1;
    }
  });
}

function updateTrenchBattles(dt) {
  const qb = state.players.qb;
  state.players.offensiveLine.forEach((blocker) => {
    const targetX = qb.x - 20;
    const targetY = fieldSize.height * blocker.anchor.lane;
    moveToward(blocker, targetX, targetY, 85, dt);
  });
  state.players.defensiveLine.forEach((rusher) => {
    const targetX = qb.x - 4;
    const targetY = fieldSize.height * rusher.anchor.lane;
    moveToward(rusher, targetX, targetY, 120, dt);
  });
  state.players.offensiveLine.forEach((blocker, index) => {
    const rusher = state.players.defensiveLine[index];
    if (!rusher) {
      return;
    }
    const dx = rusher.x - blocker.x;
    const dy = rusher.y - blocker.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 26) {
      const pushX = dx / (distance || 1);
      const pushY = dy / (distance || 1);
      const pushForce = 110 * dt;
      blocker.x -= pushX * pushForce * 0.6;
      blocker.y -= pushY * pushForce * 0.6;
      rusher.x += pushX * pushForce * 0.8;
      rusher.y += pushY * pushForce * 0.8;
    }
  });
}

function updateDefenders(dt) {
  const carrier = state.ball.carrier;
  const carrierPastLos = hasBallCarrierCrossedLos();
  state.players.defenders.forEach((defender) => {
    let targetX = defender.x;
    let targetY = defender.y;
    const assigned = defender.assignment;
    const stayInCoverage = defenderShouldStayInCoverage(assigned, carrier, carrierPastLos);
    if (stayInCoverage) {
      const leadPoint = assigned.routePhase === 0 ? assigned.breakPoint : assigned.goPoint;
      const mix = assigned.routePhase === 0 ? 0.35 : 0.2;
      const cushion = assigned.role === "TE" ? 10 : 14;
      targetX = assigned.x * (1 - mix) + leadPoint.x * mix - cushion;
      targetY = assigned.y * (1 - mix) + leadPoint.y * mix;
    } else if (carrier) {
      targetX = carrier.x;
      targetY = carrier.y;
    } else if (assigned) {
      const anchorY = fieldSize.height * defender.lane;
      targetX = assigned.x - 12;
      targetY = anchorY;
    }
    moveToward(defender, targetX, targetY, defender.speed, dt);
  });
}

function updateBall(dt) {
  if (state.ball.carrier) {
    state.ball.x = state.ball.carrier.x;
    state.ball.y = state.ball.carrier.y - 6;
    state.ball.z = 0;
    state.ball.vz = 0;
    return;
  }
  if (!state.ball.inFlight) {
    state.ball.x = state.players.qb.x;
    state.ball.y = state.players.qb.y - 6;
    state.ball.z = 0;
    state.ball.vz = 0;
    return;
  }
  state.ball.flightTime += dt;
  state.ball.x += state.ball.vx * dt;
  state.ball.y += state.ball.vy * dt;
  state.ball.z += state.ball.vz * dt;
  state.ball.vz += state.ball.gravity * dt;
  if (state.ball.z < 0) {
    state.ball.z = 0;
    state.ball.vz = 0;
  }
  attemptOffensiveCatch();
  if (!state.ball.inFlight) {
    return;
  }
  if (state.ball.targetPoint) {
    const distanceToPoint = Math.hypot(
      state.ball.targetPoint.x - state.ball.x,
      state.ball.targetPoint.y - state.ball.y
    );
    if (distanceToPoint < 8) {
      endPlay("incomplete", state.lineOfScrimmage);
      return;
    }
  }
  if (state.ball.z === 0 && state.ball.flightTime > state.ball.flightDuration) {
    endPlay("incomplete", state.lineOfScrimmage);
    return;
  }
  if (
    state.ball.flightTime > 1.8 ||
    state.ball.x <= FIELD_PADDING ||
    state.ball.x >= fieldSize.width - FIELD_PADDING
  ) {
    endPlay("incomplete", state.lineOfScrimmage);
  }
}

function attemptOffensiveCatch() {
  if (!state.ball.inFlight) {
    return;
  }
  const planeDistance = (player) => Math.hypot(player.x - state.ball.x, player.y - state.ball.y);

  const eligible = state.players.receivers.slice().sort((a, b) => {
    const aDist = planeDistance(a);
    const bDist = planeDistance(b);
    const aLead = Math.hypot(
      state.ball.targetPoint ? state.ball.targetPoint.x - a.x : 0,
      state.ball.targetPoint ? state.ball.targetPoint.y - a.y : 0
    );
    const bLead = Math.hypot(
      state.ball.targetPoint ? state.ball.targetPoint.x - b.x : 0,
      state.ball.targetPoint ? state.ball.targetPoint.y - b.y : 0
    );
    return aLead - bLead || aDist - bDist;
  });

  for (const receiver of eligible) {
    const baseRadius = receiver.catchRadius || 18;
    const radius = state.ball.z > 10 ? baseRadius * 1.8 : baseRadius;
    if (planeDistance(receiver) < radius) {
      completePass(receiver);
      return;
    }
  }

  const qb = state.players.qb;
  if (
    !state.ball.carrier &&
    state.ball.flightTime > 0.25 &&
    planeDistance(qb) < (state.ball.z > 10 ? 28 : 14)
  ) {
    setBallCarrier(qb);
    state.ball.inFlight = false;
    state.ball.targetPoint = null;
    state.controlledPlayer = qb;
    setMessage("QB caught his own pass!");
  }
}

function completePass(receiver) {
  setBallCarrier(receiver);
  state.ball.inFlight = false;
  state.ball.targetPoint = null;
  state.ball.z = 0;
  state.ball.vz = 0;
  state.controlledPlayer = receiver;
  setMessage(`${receiver.label} hauls it in!`);
}

function handleCollisions() {
  if (!state.ball.carrier) {
    return;
  }
  const carrier = state.ball.carrier;
  const tacklers = [
    ...state.players.defenders,
    ...state.players.defensiveLine,
  ];
  for (const defender of tacklers) {
    const distance = Math.hypot(defender.x - carrier.x, defender.y - carrier.y);
    if (distance < 20) {
      const yardLine = xToYards(carrier.x);
      endPlay("tackle", yardLine);
      return;
    }
  }
}

function handleInterceptions() {
  if (!state.ball.inFlight) {
    return;
  }
  if (state.ball.z > 8) {
    return;
  }
  const defenders = [
    ...state.players.defenders,
    ...state.players.defensiveLine,
  ];
  for (const defender of defenders) {
    const distance = Math.hypot(defender.x - state.ball.x, defender.y - state.ball.y);
    if (distance < 18) {
      state.ball.inFlight = false;
      setBallCarrier(null);
      setMessage("Picked off!");
      endPlay("turnover", xToYards(defender.x));
      return;
    }
  }
}

function checkForTouchdown() {
  if (!state.ball.carrier) {
    return;
  }
  const yardLine = xToYards(state.ball.carrier.x);
  if (yardLine >= 100) {
    endPlay("touchdown", 100);
  }
}

function endPlay(outcome, yardLine) {
  state.playActive = false;
  state.awaitingSnap = false;
  state.ball.inFlight = false;
  state.ball.targetPoint = null;
  setBallCarrier(null);
  state.controlledPlayer = state.players.qb;
  state.chargingThrow = false;
  state.throwCharge = 0;
  updatePowerMeter(0);
  hideRoutePreview();
  const yard = clamp(yardLine, 0, 100);
  const previousLine = state.lineOfScrimmage;
  const yardsGained = yard - previousLine;

  if (outcome === "touchdown") {
    state.offenseScore += 7;
    state.drive += 1;
    state.ballOn = 20;
    state.lineOfScrimmage = 20;
    state.nextFirstDown = 30;
    state.down = 1;
    const baseMessage = "Touchdown! Defense heads to the field...";
    const finalizeDrive = (cpuSummary) => {
      const combinedMessage = cpuSummary
        ? `Touchdown! ${cpuSummary}`
        : "Touchdown! Defense holds.";
      updateHud();
      if (maybeFinishGame()) {
        setMessage(combinedMessage);
        return;
      }
      setMessage(combinedMessage);
      setTimeout(startPlay, 1400);
    };
    startCpuDriveSimulation({ reason: "kickoff", introMessage: baseMessage }, finalizeDrive);
    return;
  }

  if (outcome === "turnover") {
    state.drive += 1;
    const cpuDistance = clamp(100 - yard, 18, 95);
    state.ballOn = 20;
    state.lineOfScrimmage = 20;
    state.nextFirstDown = 30;
    state.down = 1;
    const introMessage = "Turnover! Defense races out...";
    const finalizeDrive = (cpuSummary) => {
      const combinedMessage = cpuSummary
        ? `Turnover! ${cpuSummary}`
        : "Turnover! Defense holds.";
      updateHud();
      if (maybeFinishGame()) {
        setMessage(combinedMessage);
        return;
      }
      setMessage(combinedMessage);
      setTimeout(startPlay, 1400);
    };
    startCpuDriveSimulation(
      { reason: "short-field", distanceToGoal: cpuDistance, introMessage: introMessage },
      finalizeDrive
    );
    return;
  }

  if (outcome === "incomplete") {
    state.down += 1;
    if (state.down > 4) {
      turnoverOnDowns();
      return;
    }
    setMessage("Incomplete. Back to the huddle.");
    showPopup("Incomplete", { type: "warning", duration: 1400 });
    updateHud();
    setTimeout(startPlay, 900);
    return;
  }

  state.ballOn = yard;
  showYardagePopup(yardsGained);
  if (state.ballOn >= state.nextFirstDown) {
    state.lineOfScrimmage = state.ballOn;
    state.nextFirstDown = Math.min(100, state.ballOn + 10);
    state.down = 1;
    setMessage("Move the chains! First down.");
    showPopup("First down!", { type: "success", duration: 1600 });
  } else {
    state.lineOfScrimmage = state.ballOn;
    state.down += 1;
    if (state.down > 4) {
      turnoverOnDowns();
      return;
    }
    setMessage("Wrapped up. Get ready for the next snap.");
  }
  updateHud();
  setTimeout(startPlay, 900);
}

function turnoverOnDowns() {
  const turnoverSpot = state.ballOn;
  state.drive += 1;
  state.ballOn = 20;
  state.lineOfScrimmage = 20;
  state.nextFirstDown = 30;
  state.down = 1;
  const introMessage = "Turnover on downs. Defense scrambles back out...";
  const finalizeDrive = (cpuSummary) => {
    const combinedMessage = cpuSummary
      ? `Turnover on downs. ${cpuSummary}`
      : "Turnover on downs. Defense stands tall.";
    updateHud();
    if (maybeFinishGame()) {
      setMessage(combinedMessage);
      return;
    }
    setMessage(combinedMessage);
    setTimeout(startPlay, 1200);
  };
  startCpuDriveSimulation(
    {
      reason: "short-field",
      distanceToGoal: clamp(100 - turnoverSpot, 18, 95),
      introMessage,
    },
    finalizeDrive
  );
}

function maybeFinishGame() {
  const franchise = state.franchise;
  if (!franchise) {
    return false;
  }
  const drivesLimitReached = state.drive > GAME_RULES.drivesPerGame;
  const mercyRule =
    state.offenseScore >= GAME_RULES.targetScore ||
    state.defenseScore >= GAME_RULES.targetScore;
  if (!drivesLimitReached && !mercyRule) {
    return false;
  }
  const playerWon = state.offenseScore >= state.defenseScore;
  finalizeMatch(playerWon);
  return true;
}

function finalizeMatch(playerWon, options = {}) {
  state.playActive = false;
  state.ball.inFlight = false;
  hideRoutePreview();
  const franchise = state.franchise;
  const opponentName = franchise?.opponent?.name || "CPU";
  let summary =
    options.summaryOverride ||
    (playerWon ? `You beat the ${opponentName}!` : `Fell to the ${opponentName}.`);

  if (!franchise) {
    setMessage(summary);
    setTimeout(() => showHomeScreen(summary), options.postGameDelay ?? 2000);
    return;
  }

  if (franchise.stage === "regular") {
    if (playerWon) {
      franchise.record.wins += 1;
    } else {
      franchise.record.losses += 1;
    }
    franchise.week += 1;
    const seasonComplete = franchise.week > franchise.regularWeeks;
    if (seasonComplete) {
      const winsNeeded = Math.ceil(franchise.regularWeeks / 2);
      if (franchise.record.wins >= winsNeeded) {
        franchise.stage = "playoffs";
        franchise.playoffRound = 0;
        franchise.playoffOpponents = generatePlayoffOpponents(franchise.season);
        summary += " Playoffs bound!";
        pickNextOpponent();
        setMessage(summary);
        setTimeout(
          () => showHomeScreen(summary),
          options.postGameDelay ?? 2200
        );
        return;
      }
      summary += " Season over. Restarting for a new year.";
      setMessage(summary);
      queueHomeScreenMessage(summary);
      setTimeout(() => advanceSeason(), options.postGameDelay ?? 2400);
      return;
    }
    pickNextOpponent();
    setMessage(summary);
    setTimeout(() => showHomeScreen(summary), options.postGameDelay ?? 1800);
    return;
  }

  if (franchise.stage === "playoffs") {
    if (playerWon) {
      franchise.playoffRound += 1;
      if (franchise.playoffRound >= PLAYOFF_ROUNDS.length) {
        franchise.trophies += 1;
        summary += " Champions!";
        setMessage(summary);
        queueHomeScreenMessage(summary);
        setTimeout(() => advanceSeason(), options.postGameDelay ?? 2500);
        return;
      }
      summary += ` Advancing to the ${PLAYOFF_ROUNDS[franchise.playoffRound]}.`;
      pickNextOpponent();
      setMessage(summary);
      setTimeout(() => showHomeScreen(summary), options.postGameDelay ?? 2000);
      return;
    }
    summary += " Playoff run ends here.";
    setMessage(summary);
    queueHomeScreenMessage(summary);
    setTimeout(() => advanceSeason(), options.postGameDelay ?? 2400);
  }
}

function simulateNextGame() {
  const franchise = state.franchise;
  if (!franchise || state.homeScreen.busy) {
    return;
  }
  if (!franchise.opponent) {
    updateHomeScreenPanel("No opponent available yet.");
    return;
  }
  setHomeScreenBusy(true);
  hideHomeScreen();
  const opponentName = franchise.opponent.name;
  setMessage(`Simulating vs ${opponentName}...`);
  const difficulty = getOpponentDifficultyMultiplier();
  const variance = randomInRange(-0.05, 0.05);
  const baseChance = clamp(0.62 - (difficulty - 1) * 0.75 + variance, 0.18, 0.85);
  const playerWon = Math.random() < baseChance;
  let playerScore = Math.round(randomInRange(20, 38));
  let opponentScore = Math.round(randomInRange(17, 34));
  if (playerWon && playerScore <= opponentScore) {
    playerScore = opponentScore + Math.floor(Math.random() * 6) + 1;
  } else if (!playerWon && opponentScore <= playerScore) {
    opponentScore = playerScore + Math.floor(Math.random() * 6) + 1;
  }
  state.offenseScore = playerScore;
  state.defenseScore = opponentScore;
  updateHud();
  const summary = playerWon
    ? `Sim win! Beat the ${opponentName} ${playerScore}-${opponentScore}.`
    : `Sim loss to the ${opponentName} ${opponentScore}-${playerScore}.`;
  finalizeMatch(playerWon, { summaryOverride: summary, postGameDelay: 1500 });
}

if (homePlayButton) {
  homePlayButton.addEventListener("click", () => {
    if (state.homeScreen.busy) {
      return;
    }
    prepareMatch();
  });
}

if (homeSimButton) {
  homeSimButton.addEventListener("click", () => {
    if (state.homeScreen.busy) {
      return;
    }
    simulateNextGame();
  });
}

if (signPlayerButton) {
  signPlayerButton.addEventListener("click", () => {
    if (state.homeScreen.busy) {
      return;
    }
    if (state.homeScreen.selectedProspectId) {
      if (attemptDraftSelectedProspect()) {
        return;
      }
      return;
    }
    signRandomPlayer();
  });
}

if (releasePlayerButton) {
  releasePlayerButton.addEventListener("click", () => {
    if (state.homeScreen.busy) {
      return;
    }
    releaseSelectedPlayer();
  });
}

if (tradePlayerButton) {
  tradePlayerButton.addEventListener("click", () => {
    if (state.homeScreen.busy) {
      return;
    }
    tradeSelectedPlayer();
  });
}

if (draftRefreshButton) {
  draftRefreshButton.addEventListener("click", () => {
    if (state.homeScreen.busy) {
      return;
    }
    refreshDraftBoard("Scouting refreshed the board.");
  });
}

if (draftBoardEl) {
  draftBoardEl.addEventListener("click", (event) => {
    if (state.homeScreen.busy) {
      return;
    }
    const button = event.target.closest("[data-action='draft']");
    if (button) {
      const playerId = button.getAttribute("data-player-id");
      draftProspect(playerId);
      return;
    }
    const card = event.target.closest(".player-card");
    if (card) {
      const playerId = card.getAttribute("data-player-id");
      selectDraftProspect(playerId);
    }
  });
}

function renderPlayers() {
  const allPlayers = [
    state.players.qb,
    ...state.players.receivers,
    ...state.players.defenders,
    ...state.players.offensiveLine,
    ...state.players.defensiveLine,
  ];
  allPlayers.forEach((player) => {
    player.element.style.left = `${player.x}px`;
    player.element.style.top = `${player.y}px`;
  });
  ballEl.style.left = `${state.ball.x}px`;
  ballEl.style.top = `${state.ball.y - state.ball.z}px`;
}

function handleKeyDown(event) {
  const key = event.key;
  if (event.code === "Space" || key === " ") {
    event.preventDefault();
    snapBall();
    return;
  }
  const lower = key.toLowerCase();
  const handled = [
    "arrowup",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "shift",
    "r",
  ];
  if (handled.includes(lower)) {
    event.preventDefault();
  }
  if (key.startsWith("Arrow")) {
    state.keyState.add(key);
  } else if (key === "Shift") {
    state.keyState.add("Shift");
  } else if (lower === "r") {
    resetGame();
  }
}

function handleKeyUp(event) {
  if (event.key.startsWith("Arrow") && state.keyState.has(event.key)) {
    state.keyState.delete(event.key);
  }
  if (event.key === "Shift" && state.keyState.has("Shift")) {
    state.keyState.delete("Shift");
  }
}

function resizeField() {
  const previous = { ...fieldSize };
  fieldSize = getFieldSize();
  if (previous.width === 0) {
    return;
  }
  const scaleX = (fieldSize.width - FIELD_PADDING * 2) / (previous.width - FIELD_PADDING * 2);
  const scaleY = fieldSize.height / previous.height;
  const scalePlayer = (player) => {
    const yards = xToYards(player.x);
    player.x = yardsToX(yards);
    player.y *= scaleY;
  };
  const everyone = [
    state.players.qb,
    ...state.players.receivers,
    ...state.players.defenders,
    ...state.players.offensiveLine,
    ...state.players.defensiveLine,
  ];
  everyone.forEach(scalePlayer);
  state.players.receivers.forEach((receiver) => {
    if (receiver.routePath) {
      receiver.routePath = receiver.routePath.map((point) => ({
        x: yardsToX(xToYards(point.x)),
        y: point.y * scaleY,
      }));
    }
  });
  state.ball.x = yardsToX(xToYards(state.ball.x));
  state.ball.y *= scaleY;
  updateMarkers();
  if (state.controlledPlayer) {
    state.pointer.x = state.controlledPlayer.x;
    state.pointer.y = state.controlledPlayer.y;
  } else {
    state.pointer.x = yardsToX(state.ballOn);
    state.pointer.y = fieldSize.height / 2;
  }
  state.pointer.inside = true;
  if (state.routePreviewVisible) {
    renderRoutePreview();
  }
}

function update(dt) {
  updateCpuDriveSimulation(dt);
  if (state.chargingThrow) {
    state.throwCharge = clamp(
      state.throwCharge + dt / THROW_CHARGE_TIME,
      0,
      1
    );
    updatePowerMeter(state.throwCharge);
  }
  if (state.playActive) {
    state.playClock += dt;
    handleUserMovement(dt);
    updateReceivers(dt);
    updateTrenchBattles(dt);
    updateDefenders(dt);
    updateBall(dt);
    handleInterceptions();
    handleCollisions();
    checkForTouchdown();
  } else if (!state.ball.carrier) {
    state.ball.x = yardsToX(state.ballOn);
    state.ball.y = fieldSize.height / 2;
  }
}

function loop(timestamp) {
  const dt = Math.min((timestamp - state.lastTime) / 1000, 0.05);
  state.lastTime = timestamp;
  update(dt);
  renderPlayers();
  requestAnimationFrame(loop);
}

function init() {
  createPlayers();
  resetFranchiseProgress();
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  field.addEventListener("pointermove", handleFieldPointerMove);
  field.addEventListener("pointerdown", handleFieldPointerDown);
  field.addEventListener("pointerleave", handleFieldPointerLeave);
  window.addEventListener("pointerup", handleGlobalPointerUp);
  window.addEventListener("resize", () => {
    resizeField();
    updateHud();
  });
  requestAnimationFrame(loop);
}

init();
