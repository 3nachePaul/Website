(() => {
  "use strict";

  const STORAGE_KEY = "arhiva021-team-v1";
  const TEST_MODE = new URLSearchParams(window.location.search).get("test") === "1";
  const ORGANIZER_PHONE = "+40 784 149 450";
  const EVIDENCE_HUB = "https://arhiva-021-command-center.brainy-lion-7419.chatgpt.site";
  const TEAM_SYNC_API = `${EVIDENCE_HUB}/api/team`;
  const LIVE_MISSIONS_API = `${EVIDENCE_HUB}/api/live`;
  const MAX_EVIDENCE_BYTES = 20 * 1024 * 1024;

  const TUTORIAL_OPEN = new Date("2026-11-07T11:20:00+02:00");
  const GAME_START = new Date("2026-11-07T11:30:00+02:00");
  const DEADLINE = new Date("2026-11-07T14:20:00+02:00");
  const HARD_CLOSE = new Date("2026-11-07T14:30:00+02:00");

  const ROUTES = {
    red: ["M0", "M1", "M2", "M3", "M4", "M5"],
    blue: ["M0", "M2", "M3", "M4", "M1", "M5"],
    gold: ["M0", "M4", "M3", "M2", "M1", "M5"]
  };

  const ROUTE_NAMES = {
    red: "Roșie",
    blue: "Albastră",
    gold: "Aurie"
  };

  const MISSIONS = {
    M0: {
      code: "M0",
      title: "Patru mentori",
      shortLocation: "Universitate",
      location: "Piața Universității / tutorial",
      points: 20,
      prompt: "Dinspre Calea Victoriei spre Pasajul Universitate, introduceți inițialele prenumelor celor patru oameni reprezentați de statui.",
      proof: "Echipa se aliniază în aceeași ordine și reproduce pozițiile; al treilea membru mimează un cal imaginar. Fără urcat pe socluri.",
      hint: "Citiți plăcuțele de la stânga la dreapta și folosiți numai inițiala prenumelui fiecăruia.",
      answerHashes: ["47fb1642c650ce9c334dbffe5c18b5abbd81f369c0be034a43299fa064c00d2c"],
      placeholder: "Patru inițiale",
      fragment: { number: 1, word: "UNDE" }
    },
    M1: {
      code: "M1",
      title: "Distribuția imposibilă",
      shortLocation: "TNB",
      location: "Caragealiana / Teatrul Național",
      points: 80,
      prompt: "Câte sculpturi sunt în întregul ansamblu dedicat lui I.L. Caragiale, incluzându-l pe dramaturg?",
      proof: "Film mut de 8-12 secunde inspirat de personaje. Toți membrii trebuie să fie vizibili; fără atingerea sculpturilor.",
      hint: "Numărați separat dramaturgul și fiecare personaj din grup; nu includeți elementele decorative.",
      answerHashes: ["b17ef6d19c7a5b1ee83b907c595526dcb1eb06db8227d650d5dda0a9f4ce8cd9"],
      placeholder: "Număr",
      fragment: { number: 2, word: "ESTE" }
    },
    M2: {
      code: "M2",
      title: "Cele două brațe",
      shortLocation: "Pasaj",
      location: "Pasajul acoperit dintre Calea Victoriei și Lipscani",
      points: 80,
      prompt: "Găsiți punctul de întâlnire al celor două brațe. Descoperiți denumirile lor istorice și introduceți-le în ordine alfabetică, separate prin semnul +.",
      proof: "Fotografie de echipă în formă de V, cu acoperișul pasajului vizibil. Nu blocați circulația ori mesele localurilor.",
      hint: "Priviți inscripțiile de la intrări și comparați denumirile celor două ramuri înainte să le ordonați alfabetic.",
      answerHashes: [
        "e982cae48da03cde10471f1707649dfc25abb249aa1f5b66acc6b11fd14ac452",
        "1991e18b335058699024d0a6f7ac8814416e30b9bac7e154489715ed007852a5"
      ],
      placeholder: "NUME+NUME",
      fragment: { number: 3, word: "COMOARA" }
    },
    M3: {
      code: "M3",
      title: "Un cuvânt pentru libertate",
      shortLocation: "Revoluției",
      location: "Memorialul Renașterii / Piața Revoluției",
      points: 80,
      prompt: "Ce an completează numele monumentului: «Revoluția Română din Decembrie ____»?",
      proof: "Video de maximum 12 secunde. Fiecare membru spune un singur cuvânt care descrie libertatea. Păstrați respectul locului.",
      hint: "Răspunsul se află pe inscripția monumentului; nu este nevoie de căutare online.",
      answerHashes: ["9113b98df80f877c7a2ee5d865a04c9514b4e9bf25a49d315b0b15f115d2f0d2"],
      placeholder: "Anul",
      fragment: { number: 4, word: "VOASTRĂ" }
    },
    M4: {
      code: "M4",
      title: "Orchestra fără sunet",
      shortLocation: "Ateneul",
      location: "Ateneul Român",
      points: 80,
      prompt: "Numărați coloanele frontale și medalioanele de mozaic de deasupra intrării. Înmulțiți cele două numere observate.",
      proof: "Video mut de 8-12 secunde: un dirijor și instrumente diferite. Ateneul trebuie să fie recognoscibil.",
      hint: "Faceți două numărători separate. La coloane luați în calcul numai fațada principală, nu elementele laterale.",
      answerHashes: ["624b60c58c9d8bfb6ff1886c2fd605d2adeb6ea4da576068201b6c6958ce93f4"],
      placeholder: "Rezultatul",
      fragment: { number: 5, word: "ACOLO" }
    },
    M5: {
      code: "M5",
      title: "Cercul de doisprezece",
      shortLocation: "Cișmigiu",
      location: "Rotonda Scriitorilor / Cișmigiu",
      points: 80,
      prompt: "Doi scriitori s-au născut în ani consecutivi: 1818 și 1819. Introduceți numele lor de familie în ordine cronologică, separate prin +.",
      proof: "Doi membri reproduc expresiile busturilor, iar ceilalți formează o ramă. Fără atingerea monumentelor.",
      hint: "Citiți anii de pe toate soclurile și căutați singura pereche de ani consecutivi, apoi notați numele de familie.",
      answerHashes: ["87f5c6f8e606bedea0bc216c939ff42bdee73ab8334f94506e6f7ab9c6a8cee8"],
      placeholder: "NUME+NUME",
      fragment: { number: 6, word: "VA FI ȘI INIMA VOASTRĂ" }
    }
  };

  const FINAL_HASHES = [
    "816fca8fd4ccb65e3167547036f4d1d8d150a8e6b6325d19ff5f37d623a81b69",
    "4da27f150e788dbb8f7d5f82e60c3e30fae61cff199aff6f04b3704b651a3644"
  ];

  const SIDE_QUESTS = [
    { code: "S1", title: "OSCEB ascuns în oraș", text: "Colaj cu O, S, C, E și B găsite în forme arhitecturale sau naturale. Nu sunt acceptate litere tipărite." },
    { code: "S2", title: "Albumul trupei", text: "O fotografie cu toată echipa, cel puțin o reflexie și un titlu de maximum patru cuvinte." },
    { code: "S3", title: "Știrile din 2126", text: "Video de 12-20 secunde: un obiect banal devine invenția care va schimba orașul. Minimum trei membri vorbesc." },
    { code: "S4", title: "Forța perspectivei", text: "Un coechipier pare să țină ori să echilibreze un monument. Toți ceilalți apar în cadru." },
    { code: "S5", title: "Zece secunde de București", text: "Video exact 10 secunde, fără vocea echipei, cu minimum trei surse sonore enumerate." },
    { code: "S6", title: "Ghidul complet greșit", text: "Video de 12-18 secunde: un obiect public banal este prezentat ca monument esențial al capitalei." },
    { code: "S7", title: "Întâlnirea 021", text: "Fotografie cu altă echipă și ambele gesturi secrete. Fiecare echipă introduce codul celeilalte." },
    { code: "S8", title: "Cadrul imposibil", text: "O singură fotografie: ceva vechi, ceva roșu, un obiect care arată ora și toată echipa." }
  ];

  const FLASHES = [
    {
      code: "F1",
      time: "12:15",
      title: "Nordul comun",
      text: "Formați o busolă din încălțămintea tuturor. În cadru: câte o mână de la fiecare și ora vizibilă pe telefon.",
      start: new Date("2026-11-07T12:15:00+02:00"),
      end: new Date("2026-11-07T12:23:00+02:00"),
      color: "var(--signal)"
    },
    {
      code: "F2",
      time: "13:10",
      title: "Glitch de emoji",
      text: "Recreați într-o singură fotografie secvența afișată: crab / coroană / rachetă.",
      start: new Date("2026-11-07T13:10:00+02:00"),
      end: new Date("2026-11-07T13:20:00+02:00"),
      color: "var(--coral)"
    }
  ];

  const GESTURES = ["Satelit", "Coroană", "Crab", "Busolă", "Fulger", "Bufniță"];

  const els = {
    landing: document.getElementById("landing-screen"),
    game: document.getElementById("game-screen"),
    teamForm: document.getElementById("team-form"),
    resumePanel: document.getElementById("resume-panel"),
    resumeTeam: document.getElementById("resume-team"),
    resumeButton: document.getElementById("resume-button"),
    newGameButton: document.getElementById("new-game-button"),
    timer: document.getElementById("timer"),
    timerLabel: document.getElementById("timer-label"),
    testRibbon: document.getElementById("test-ribbon"),
    routeStops: document.getElementById("route-stops"),
    railTeamName: document.getElementById("rail-team-name"),
    railTeamCode: document.getElementById("rail-team-code"),
    mobileTeam: document.getElementById("mobile-team-strip"),
    missionTab: document.getElementById("tab-mission"),
    bonusTab: document.getElementById("tab-bonus"),
    teamTab: document.getElementById("tab-team"),
    bonusBadge: document.getElementById("bonus-badge"),
    score: document.getElementById("score-value"),
    jokers: document.getElementById("jokers-value"),
    hints: document.getElementById("hints-value"),
    fragments: document.getElementById("fragment-list"),
    toast: document.getElementById("toast"),
    fragmentDialog: document.getElementById("fragment-dialog"),
    fragmentNumber: document.getElementById("fragment-number"),
    fragmentWord: document.getElementById("fragment-word"),
    fragmentNext: document.getElementById("fragment-next"),
    helpButton: document.getElementById("help-button"),
    helpDialog: document.getElementById("help-dialog"),
    organizerPhone: document.getElementById("organizer-phone"),
    liveSignal: document.getElementById("live-signal")
  };

  let state = loadState();
  let activeTab = "mission";
  let toastTimer = null;
  let lastOpenFlashCodes = "";
  let liveMissions = [];
  let lastLiveCodes = "";
  let syncTimer = null;
  let liveServicesStarted = false;
  let currentLocation = null;
  let locationWatchId = null;
  let lastLocationSentAt = 0;

  function defaultState(teamName, teamCode, route) {
    return {
      version: 1,
      teamName,
      teamCode: teamCode || generateTeamCode(teamName),
      route,
      createdAt: Date.now(),
      completedMissions: {},
      sideQuests: {},
      jokerTargets: {},
      flashes: {},
      hints: [],
      attempts: {},
      cooldowns: {},
      uploads: {},
      liveBonuses: {},
      locationConsent: false,
      locationStatus: "disabled",
      finalCompletedAt: null,
      selectedMission: null
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !ROUTES[parsed.route] || parsed.version !== 1) return null;
      parsed.completedMissions ||= {};
      parsed.sideQuests ||= {};
      parsed.jokerTargets ||= {};
      parsed.flashes ||= {};
      parsed.hints ||= [];
      parsed.attempts ||= {};
      parsed.cooldowns ||= {};
      parsed.uploads ||= {};
      parsed.liveBonuses ||= {};
      parsed.locationConsent = Boolean(parsed.locationConsent);
      parsed.locationStatus ||= parsed.locationConsent ? "requesting" : "disabled";
      return parsed;
    } catch {
      return null;
    }
  }

  function saveState() {
    if (!state) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    queueTeamSync();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderEvidenceTools(code, inputId = `evidence-${code}`) {
    const sent = Boolean(state?.uploads?.[code]);
    return `
      <details class="evidence-tools ${sent ? "is-sent" : ""}">
        <summary>${sent ? "Dovadă trimisă organizatorului ✓" : "Trimite dovada organizatorului"}</summary>
        <div class="evidence-tools__inner">
          <input class="file-input" id="${inputId}" type="file" accept="image/*,video/*" capture="environment">
          <button class="small-button" type="button" data-share-evidence="${code}">${sent ? "Trimite din nou" : "Trimite acum"}</button>
          <small class="upload-note">Poza sau clipul ajunge direct în Command Center. Maximum 20 MB.</small>
        </div>
      </details>`;
  }

  function normalizeAnswer(value) {
    return String(value)
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z0-9+]/g, "");
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const buffer = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function hashNumber(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function generateTeamCode(teamName) {
    const initials = normalizeAnswer(teamName).replaceAll("+", "").slice(0, 3) || "ECH";
    const randomValue = globalThis.crypto?.getRandomValues
      ? globalThis.crypto.getRandomValues(new Uint32Array(1))[0]
      : hashNumber(`${teamName}:${Date.now()}`);
    const suffix = randomValue.toString(36).toUpperCase().padStart(4, "0").slice(-4);
    return `${initials}-${suffix}`;
  }

  function teamGesture() {
    if (!state) return "-";
    return GESTURES[hashNumber(`${state.teamName}:${state.teamCode}`) % GESTURES.length];
  }

  function currentMissionCode() {
    if (!state) return null;
    return ROUTES[state.route].find((code) => !state.completedMissions[code]) || null;
  }

  function usedJokers() {
    return Object.keys(state?.jokerTargets || {}).length;
  }

  function completedSideCount() {
    return Object.keys(state?.sideQuests || {}).length;
  }

  function calculateScore() {
    if (!state) return 0;
    let score = 0;
    Object.keys(state.completedMissions).forEach((code) => {
      score += MISSIONS[code]?.points || 0;
    });
    Object.values(state.sideQuests).forEach((entry) => {
      score += entry.joker ? 100 : 50;
    });
    score += Object.keys(state.flashes).length * 40;
    Object.values(state.liveBonuses || {}).forEach((entry) => {
      score += Number(entry.points) || 0;
    });
    if (state.finalCompletedAt) score += 150;
    score -= state.hints.length * 15;

    if (!TEST_MODE && state.finalCompletedAt && state.finalCompletedAt > DEADLINE.getTime()) {
      const lateMinutes = Math.ceil((state.finalCompletedAt - DEADLINE.getTime()) / 60000);
      score -= Math.min(lateMinutes, 10) * 10;
    }
    return Math.max(0, score);
  }

  function teamSyncPayload() {
    const payload = {
      teamName: state.teamName,
      teamCode: state.teamCode,
      route: state.route,
      score: calculateScore(),
      currentMission: state.finalCompletedAt ? "FINAL" : (currentMissionCode() || "FINAL"),
      missionCodes: Object.keys(state.completedMissions),
      sideCodes: Object.keys(state.sideQuests),
      flashCodes: Object.keys(state.flashes),
      liveCodes: Object.keys(state.liveBonuses || {}),
      hintCount: state.hints.length,
      locationStatus: state.locationStatus || "unknown"
    };
    if (currentLocation) {
      payload.latitude = currentLocation.latitude;
      payload.longitude = currentLocation.longitude;
      payload.locationAccuracy = currentLocation.accuracy;
    }
    return payload;
  }

  async function syncTeam() {
    if (!state || !navigator.onLine) return;
    window.clearTimeout(syncTimer);
    syncTimer = null;
    try {
      const response = await fetch(TEAM_SYNC_API, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(teamSyncPayload()),
        keepalive: true
      });
      if (response.ok && currentLocation) lastLocationSentAt = Date.now();
    } catch {
      // Progresul local rămâne sursa de siguranță când conexiunea este slabă.
    }
  }

  function queueTeamSync(immediate = false) {
    if (!state) return;
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(() => void syncTeam(), immediate ? 0 : 450);
  }

  function storeLocationState() {
    if (!state) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function stopLocationTracking(sync = true) {
    if (locationWatchId !== null && navigator.geolocation) navigator.geolocation.clearWatch(locationWatchId);
    locationWatchId = null;
    currentLocation = null;
    if (!state) return;
    state.locationConsent = false;
    state.locationStatus = "disabled";
    storeLocationState();
    if (sync) queueTeamSync(true);
    if (activeTab === "team") renderTeamTab();
  }

  function startLocationTracking() {
    if (!state?.locationConsent || locationWatchId !== null) return;
    if (!("geolocation" in navigator)) {
      state.locationConsent = false;
      state.locationStatus = "unavailable";
      storeLocationState();
      queueTeamSync(true);
      if (activeTab === "team") renderTeamTab();
      return;
    }

    state.locationStatus = "requesting";
    storeLocationState();
    queueTeamSync(true);
    if (activeTab === "team") renderTeamTab();

    locationWatchId = navigator.geolocation.watchPosition((position) => {
      const firstFix = !currentLocation;
      currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: Math.round(position.coords.accuracy || 0)
      };
      state.locationStatus = "active";
      storeLocationState();
      if (firstFix || Date.now() - lastLocationSentAt >= 15_000) queueTeamSync(true);
      if (activeTab === "team") renderTeamTab();
    }, (error) => {
      currentLocation = null;
      if (error.code === error.PERMISSION_DENIED) {
        if (locationWatchId !== null) navigator.geolocation.clearWatch(locationWatchId);
        locationWatchId = null;
        state.locationConsent = false;
        state.locationStatus = "denied";
        showToast("Locația a fost refuzată. O poți activa mai târziu din secțiunea Echipă.", true);
      } else {
        state.locationStatus = "unavailable";
      }
      storeLocationState();
      queueTeamSync(true);
      if (activeTab === "team") renderTeamTab();
    }, {
      enableHighAccuracy: true,
      maximumAge: 15_000,
      timeout: 20_000
    });
  }

  function toggleLocationTracking() {
    if (!state) return;
    if (state.locationConsent || locationWatchId !== null) {
      stopLocationTracking();
      showToast("Partajarea locației a fost oprită.");
      return;
    }
    state.locationConsent = true;
    state.locationStatus = "requesting";
    storeLocationState();
    startLocationTracking();
  }

  async function fetchLiveMissions() {
    if (!state || !navigator.onLine) return;
    try {
      const response = await fetch(LIVE_MISSIONS_API, { cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json();
      const next = Array.isArray(payload.missions) ? payload.missions : [];
      const nextCodes = next.map((mission) => mission.code).join(",");
      const unseen = next.find((mission) => !state.liveBonuses?.[mission.code] && !liveMissions.some((current) => current.code === mission.code));
      liveMissions = next;
      if (unseen && nextCodes !== lastLiveCodes) showToast(`MISIUNE LIVE: ${unseen.title}. Timpul a pornit!`);
      lastLiveCodes = nextCodes;
      renderLiveSignal();
      updateBonusBadge();
      if (activeTab === "bonus") renderBonusTab();
    } catch {
      // Următorul polling reîncearcă automat.
    }
  }

  function renderLiveSignal() {
    if (!els.liveSignal) return;
    const mission = liveMissions.find((entry) => !state?.liveBonuses?.[entry.code]);
    if (!state || !mission) {
      els.liveSignal.hidden = true;
      return;
    }
    els.liveSignal.hidden = false;
    els.liveSignal.innerHTML = `
      <div><span>TRANSMISIE LIVE / ${escapeHtml(mission.code)}</span><strong>${escapeHtml(mission.title)}</strong></div>
      <b data-live-countdown data-end="${new Date(mission.endsAt).getTime()}">--:--</b>
      <button type="button" data-open-live>Deschide</button>`;
    updateLiveCountdowns();
  }

  function updateLiveCountdowns() {
    document.querySelectorAll("[data-live-countdown]").forEach((element) => {
      const remaining = Math.max(0, Number(element.dataset.end) - Date.now());
      const seconds = Math.ceil(remaining / 1000);
      const minutes = Math.floor(seconds / 60);
      element.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    });
  }

  function startLiveServices() {
    if (liveServicesStarted || !state) return;
    liveServicesStarted = true;
    queueTeamSync(true);
    if (state.locationConsent) startLocationTracking();
    void fetchLiveMissions();
    window.setInterval(() => void syncTeam(), 20_000);
    window.setInterval(() => void fetchLiveMissions(), 10_000);
    window.setInterval(updateLiveCountdowns, 1000);
  }

  function formatDuration(milliseconds) {
    const safe = Math.max(0, milliseconds);
    const totalSeconds = Math.floor(safe / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
  }

  function updateTimer() {
    const now = Date.now();
    if (TEST_MODE) {
      els.timerLabel.textContent = "Simulare activă";
      els.timer.textContent = "MOD TEST";
    } else if (now < TUTORIAL_OPEN.getTime()) {
      els.timerLabel.textContent = "Până la deschidere";
      els.timer.textContent = formatDuration(TUTORIAL_OPEN.getTime() - now);
    } else if (now <= DEADLINE.getTime()) {
      els.timerLabel.textContent = "Până la închidere";
      els.timer.textContent = formatDuration(DEADLINE.getTime() - now);
    } else if (now <= HARD_CLOSE.getTime()) {
      els.timerLabel.textContent = "Penalizare activă";
      els.timer.textContent = `+${formatDuration(now - DEADLINE.getTime()).slice(3)}`;
    } else {
      els.timerLabel.textContent = "Arhiva s-a închis";
      els.timer.textContent = "00:00:00";
    }

    if (state && !state.finalCompletedAt) {
      const openCodes = FLASHES.filter((flash) => flashStatus(flash) === "open" && !state.flashes[flash.code]).map((flash) => flash.code).join(",");
      if (openCodes !== lastOpenFlashCodes) {
        if (openCodes) showToast("Flash Mission disponibilă în secțiunea Bonus.");
        lastOpenFlashCodes = openCodes;
        updateBonusBadge();
        if (activeTab === "bonus") renderBonusTab();
      }
    }
  }

  function canOpenMission(code) {
    if (TEST_MODE) return true;
    const now = Date.now();
    if (now > HARD_CLOSE.getTime()) return false;
    if (code === "M0") return now >= TUTORIAL_OPEN.getTime();
    return now >= GAME_START.getTime();
  }

  function showLanding() {
    document.body.removeAttribute("data-route");
    els.game.hidden = true;
    els.landing.hidden = false;
    els.testRibbon.hidden = !TEST_MODE;
    if (state) {
      els.resumePanel.hidden = false;
      els.resumeTeam.textContent = `${state.teamName} / Ruta ${ROUTE_NAMES[state.route]}`;
    } else {
      els.resumePanel.hidden = true;
    }
  }

  function showGame() {
    if (!state) return showLanding();
    els.landing.hidden = true;
    els.game.hidden = false;
    els.testRibbon.hidden = !TEST_MODE;
    document.body.dataset.route = state.route;
    renderGame();
    startLiveServices();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderGame() {
    if (!state) return;
    els.railTeamName.textContent = state.teamName;
    els.railTeamCode.textContent = `${state.teamCode} / Ruta ${ROUTE_NAMES[state.route]}`;
    els.mobileTeam.innerHTML = `<strong>${escapeHtml(state.teamName)}</strong><span>${escapeHtml(state.teamCode)} / ${ROUTE_NAMES[state.route]}</span>`;
    renderRouteStops();
    renderStatus();
    renderMissionTab();
    renderBonusTab();
    renderTeamTab();
    setActiveTab(activeTab);
    updateBonusBadge();
  }

  function renderRouteStops() {
    const current = currentMissionCode();
    els.routeStops.innerHTML = ROUTES[state.route].map((code, index) => {
      const mission = MISSIONS[code];
      const complete = Boolean(state.completedMissions[code]);
      const currentClass = code === current ? "is-current" : "";
      const completeClass = complete ? "is-complete" : "";
      return `
        <li class="rail-stop ${currentClass} ${completeClass}">
          <button type="button" data-view-mission="${code}" ${complete ? "" : "disabled"}>
            <span class="rail-stop__dot">${complete ? "✓" : index + 1}</span>
            <span class="rail-stop__copy"><strong>${escapeHtml(mission.shortLocation)}</strong><small>${escapeHtml(mission.title)}</small></span>
          </button>
        </li>`;
    }).join("");
  }

  function renderStatus() {
    els.score.textContent = calculateScore();
    els.jokers.textContent = Math.max(0, 2 - usedJokers());
    els.hints.textContent = state.hints.length;
    const found = Object.values(MISSIONS)
      .filter((mission) => state.completedMissions[mission.code])
      .map((mission) => mission.fragment.number);
    els.fragments.innerHTML = Object.values(MISSIONS)
      .sort((a, b) => a.fragment.number - b.fragment.number)
      .map((mission) => {
        const isFound = found.includes(mission.fragment.number);
        return `<li class="${isFound ? "is-found" : ""}" data-number="${mission.fragment.number}">${isFound ? escapeHtml(mission.fragment.word) : "Semnal necunoscut"}</li>`;
      }).join("");
  }

  function renderMissionTab() {
    if (state.finalCompletedAt) {
      renderCompletion();
      return;
    }

    const missionCode = state.selectedMission || currentMissionCode();
    if (!missionCode) {
      renderFinalVault();
      return;
    }

    const mission = MISSIONS[missionCode];
    const isHistorical = Boolean(state.completedMissions[missionCode]);
    const actualCurrent = currentMissionCode();
    if (!isHistorical && missionCode !== actualCurrent) state.selectedMission = null;

    if (!isHistorical && !canOpenMission(missionCode)) {
      const isBeforeMainStart = missionCode !== "M0" && Date.now() < GAME_START.getTime();
      const closed = !TEST_MODE && Date.now() > HARD_CLOSE.getTime();
      els.missionTab.innerHTML = `
        <section class="locked-panel">
          <div class="locked-panel__icon" aria-hidden="true"></div>
          <h1>${closed ? "Arhiva s-a închis" : "Semnal blocat"}</h1>
          <p>${closed ? "Nu mai pot fi începute misiuni noi. Deschide secțiunea Echipă pentru raportul provizoriu." : isBeforeMainStart ? "Tutorialul este complet. Următoarele misiuni se deschid la 11:30." : "Prima misiune se deschide sâmbătă la 11:20."}</p>
        </section>`;
      bindMissionEvents();
      return;
    }

    const hintUsed = state.hints.includes(missionCode);
    const cooldownUntil = state.cooldowns[missionCode] || 0;
    const cooldownActive = Date.now() < cooldownUntil;
    els.missionTab.innerHTML = `
      <article class="mission-card">
        <header class="mission-head">
          <div class="mission-code">${mission.code}</div>
          <div class="mission-title">
            <h1>${escapeHtml(mission.title)}</h1>
            <p class="mission-location">${escapeHtml(mission.location)}</p>
          </div>
          <div class="points-flag">${mission.points} pct</div>
        </header>
        <div class="mission-body">
          ${isHistorical ? `<div class="hint-box hint-box--success"><strong>Misiune recuperată.</strong> Fragmentul ${mission.fragment.number}: ${escapeHtml(mission.fragment.word)}</div>` : ""}
          <p class="mission-prompt">${escapeHtml(mission.prompt)}</p>
          <div class="proof-brief"><strong>Dovada</strong><p>${escapeHtml(mission.proof)}</p></div>
          ${hintUsed ? `<div class="hint-box"><strong>Indiciu folosit:</strong> ${escapeHtml(mission.hint)}</div>` : ""}
          ${isHistorical ? `
            <button class="small-button" type="button" data-return-current>Înapoi la misiunea curentă</button>
            ${renderEvidenceTools(missionCode, "mission-evidence")}
          ` : `
            <form class="mission-form" id="mission-answer-form" data-mission="${missionCode}">
              <label class="proof-check">
                <input type="checkbox" id="proof-ready" required>
                <span>Dovada este pregătită și respectă toate criteriile.</span>
              </label>
              <div class="answer-row">
                <input id="mission-answer" name="answer" type="text" autocomplete="off" autocapitalize="characters" placeholder="${escapeHtml(mission.placeholder)}" aria-label="Răspunsul misiunii" ${cooldownActive ? "disabled" : ""} required>
                <button class="button" type="submit" ${cooldownActive ? "disabled" : ""}>${cooldownActive ? "Așteaptă..." : "Verifică răspunsul"}</button>
              </div>
              <p class="inline-error" id="answer-error">${cooldownActive ? `Mai poți încerca în ${Math.ceil((cooldownUntil - Date.now()) / 1000)} secunde.` : ""}</p>
            </form>
            <div class="mission-actions">
              <button class="small-button small-button--hint" type="button" data-use-hint="${missionCode}">${hintUsed ? "Arată din nou indiciul" : "Folosește indiciu -15"}</button>
              ${renderEvidenceTools(missionCode, "mission-evidence")}
            </div>
          `}
        </div>
      </article>`;
    bindMissionEvents();
  }

  function bindMissionEvents() {
    document.getElementById("mission-answer-form")?.addEventListener("submit", submitMissionAnswer);
  }

  async function submitMissionAnswer(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const code = form.dataset.mission;
    const mission = MISSIONS[code];
    const answerInput = form.querySelector("#mission-answer");
    const proofInput = form.querySelector("#proof-ready");
    const error = form.querySelector("#answer-error");

    if (!proofInput.checked) {
      error.textContent = "Confirmă mai întâi că dovada este pregătită.";
      return;
    }

    if (Date.now() < (state.cooldowns[code] || 0)) return;
    const normalized = normalizeAnswer(answerInput.value);
    const answerHash = await sha256(normalized);
    if (!mission.answerHashes.includes(answerHash)) {
      state.attempts[code] = (state.attempts[code] || 0) + 1;
      state.cooldowns[code] = Date.now() + (TEST_MODE ? 2000 : 30000);
      saveState();
      error.textContent = TEST_MODE ? "Răspuns greșit. Reîncearcă în 2 secunde." : "Răspuns greșit. Reîncearcă în 30 de secunde.";
      answerInput.disabled = true;
      form.querySelector("button[type='submit']").disabled = true;
      setTimeout(() => renderMissionTab(), TEST_MODE ? 2100 : 30100);
      return;
    }

    state.completedMissions[code] = { completedAt: Date.now(), attempts: state.attempts[code] || 0 };
    state.selectedMission = null;
    delete state.cooldowns[code];
    saveState();
    showFragment(mission);
    renderGame();
  }

  function showFragment(mission) {
    els.fragmentNumber.textContent = `Fragment ${mission.fragment.number} din 6`;
    els.fragmentWord.textContent = mission.fragment.word;
    els.fragmentNext.textContent = mission.code === "M5" ? "Toate fragmentele sunt complete. Seiful final este deschis." : "Următorul checkpoint a fost deblocat.";
    els.fragmentDialog.showModal();
  }

  function renderFinalVault() {
    els.missionTab.innerHTML = `
      <section class="final-vault">
        <p class="mission-location">Rotonda Scriitorilor / seiful final</p>
        <h1>Reconstruiți mesajul</h1>
        <p>Cele șase fragmente formează un singur mesaj. Introduceți referința biblică în formatul CARTE CAPITOL:VERSET.</p>
        <blockquote class="final-verse">„Unde este comoara voastră, acolo va fi și inima voastră.”</blockquote>
        <form class="mission-form" id="final-form">
          <div class="answer-row">
            <input id="final-answer" type="text" autocomplete="off" autocapitalize="characters" placeholder="CARTE 0:00" aria-label="Referința biblică" required>
            <button class="button" type="submit">Deschide seiful</button>
          </div>
          <p class="inline-error" id="final-error"></p>
        </form>
      </section>`;
    document.getElementById("final-form")?.addEventListener("submit", submitFinalAnswer);
  }

  async function submitFinalAnswer(event) {
    event.preventDefault();
    if (!TEST_MODE && Date.now() > HARD_CLOSE.getTime()) {
      document.getElementById("final-error").textContent = "Arhiva s-a închis la 14:30.";
      return;
    }
    const input = document.getElementById("final-answer");
    const finalHash = await sha256(normalizeAnswer(input.value));
    if (!FINAL_HASHES.includes(finalHash)) {
      document.getElementById("final-error").textContent = "Referința nu este corectă. Verificați cartea, capitolul și versetul.";
      return;
    }
    state.finalCompletedAt = Date.now();
    saveState();
    renderGame();
    showToast("ARHIVA 021 a fost restaurată.");
  }

  function renderCompletion() {
    const score = calculateScore();
    const report = reportCode();
    els.missionTab.innerHTML = `
      <section class="completion-screen">
        <p class="mission-location">Semnal complet / ${escapeHtml(state.teamCode)}</p>
        <h1>Arhiva a fost restaurată.</h1>
        <p>Ați găsit mesajul. Acum verificați dacă ați observat și comoara care a mers cu voi tot traseul.</p>
        <div class="summary-grid">
          <div class="summary-stat"><span>Scor provizoriu</span><strong>${score}</strong></div>
          <div class="summary-stat"><span>Side quest-uri</span><strong>${completedSideCount()}/5</strong></div>
          <div class="summary-stat"><span>Indicii</span><strong>${state.hints.length}</strong></div>
        </div>
        <span class="report-code">${report}</span>
        <div class="button-row">
          <button class="button button--signal" type="button" data-share-report>Partajează raportul</button>
          <button class="button button--quiet" type="button" data-open-team>Detalii echipă</button>
        </div>
      </section>`;
  }

  function flashStatus(flash) {
    if (TEST_MODE) return "open";
    const now = Date.now();
    if (now < flash.start.getTime()) return "upcoming";
    if (now <= flash.end.getTime()) return "open";
    return "closed";
  }

  function renderBonusTab() {
    if (!state) return;
    const completedCount = completedSideCount();
    const remainingJokers = Math.max(0, 2 - usedJokers());
    els.bonusTab.innerHTML = `
      <div class="bonus-intro">
        <div><h1>Misiuni bonus</h1><p>Alegeți maximum cinci side quest-uri. Punctajul rămâne provizoriu până când organizatorii văd dovezile.</p></div>
        <div class="joker-counter">${remainingJokers} Jokere</div>
      </div>
      ${liveMissions.length ? `
        <section class="live-drop-section">
          <div class="section-heading"><h2>Transmisie live</h2><span>misiuni-surpriză cu timp limitat</span></div>
          <div class="live-drop-grid">${liveMissions.map(renderLiveMissionCard).join("")}</div>
        </section>` : ""}
      <section class="flash-section">
        <div class="section-heading"><h2>Live</h2><span>Disponibile numai în fereastra indicată</span></div>
        <div class="flash-grid">
          ${FLASHES.map(renderFlashCard).join("")}
        </div>
      </section>
      <section>
        <div class="section-heading"><h2>Side quests</h2><span>${completedCount}/5 finalizate</span></div>
        <div class="side-list">${SIDE_QUESTS.map(renderSideQuest).join("")}</div>
      </section>`;
    updateLiveCountdowns();
  }

  function renderLiveMissionCard(mission) {
    const complete = state.liveBonuses?.[mission.code];
    const end = new Date(mission.endsAt).getTime();
    return `
      <article class="live-drop-card ${complete ? "is-complete" : ""}">
        <header><span>LIVE / ${escapeHtml(mission.code)}</span><strong data-live-countdown data-end="${end}">--:--</strong></header>
        <h3>${escapeHtml(mission.title)}</h3>
        <p>${escapeHtml(mission.instructions)}</p>
        <div class="live-drop-meta"><span>+${Number(mission.points) || 0} pct</span><span>Dovadă obligatorie</span></div>
        ${complete ? `<div class="live-complete-mark">Dovadă trimisă / punctaj provizoriu ✓</div>` : renderEvidenceTools(mission.code)}
      </article>`;
  }

  function renderFlashCard(flash) {
    const status = flashStatus(flash);
    const complete = Boolean(state.flashes[flash.code]);
    const statusLabel = complete ? "finalizată" : status === "open" ? (TEST_MODE ? "test" : "acum") : status === "upcoming" ? "în așteptare" : "închisă";
    return `
      <article class="flash-card ${status !== "open" ? "is-locked" : ""} ${complete ? "is-complete" : ""}" style="--flash-color:${flash.color}">
        <div class="flash-time">${flash.time}<small>${statusLabel}</small></div>
        <h3>${escapeHtml(flash.title)}</h3>
        <p>${escapeHtml(flash.text)}</p>
        ${complete ? `<span class="score-chip">+40 pct</span>` : status === "open" ? `
          <label class="side-proof"><input type="checkbox" data-flash-proof="${flash.code}"> Dovada este pregătită</label>
          <button class="small-button" type="button" data-complete-flash="${flash.code}">Finalizează +40</button>
        ` : ""}
        ${status === "open" || complete ? renderEvidenceTools(flash.code) : ""}
      </article>`;
  }

  function renderSideQuest(quest) {
    const complete = state.sideQuests[quest.code];
    const jokerActive = Boolean(state.jokerTargets[quest.code]);
    const maxReached = completedSideCount() >= 5 && !complete;
    return `
      <article class="side-quest ${complete ? "is-complete" : ""}">
        <div class="side-quest__code">${quest.code}</div>
        <div>
          <h3>${escapeHtml(quest.title)}</h3>
          <p>${escapeHtml(quest.text)}</p>
        </div>
        <div class="side-quest__meta">
          <span class="score-chip ${jokerActive ? "is-joker" : ""}">${jokerActive ? "100 pct" : "50 pct"}</span>
          ${complete ? "<strong>Finalizat</strong>" : ""}
        </div>
        ${complete ? `<div class="side-actions">${renderEvidenceTools(quest.code)}</div>` : `
          <div class="side-actions">
            <label class="side-proof"><input type="checkbox" data-side-proof="${quest.code}" ${maxReached ? "disabled" : ""}> Dovada este pregătită</label>
            <button class="small-button joker-button ${jokerActive ? "is-active" : ""}" type="button" data-toggle-joker="${quest.code}" ${maxReached ? "disabled" : ""}>${jokerActive ? "Joker activ" : "Activează Joker x2"}</button>
            <button class="small-button" type="button" data-complete-side="${quest.code}" ${maxReached ? "disabled" : ""}>Finalizează</button>
            ${renderEvidenceTools(quest.code)}
          </div>`}
      </article>`;
  }

  function renderTeamTab() {
    if (!state) return;
    const coreCount = Object.keys(state.completedMissions).length;
    const locationActive = state.locationConsent && state.locationStatus === "active";
    const locationLabel = locationActive ? "GPS activ" : state.locationStatus === "requesting" ? "Se conectează" : state.locationStatus === "denied" ? "Permisiune refuzată" : state.locationStatus === "unavailable" ? "Semnal indisponibil" : "GPS oprit";
    els.teamTab.innerHTML = `
      <div class="team-intro">
        <div><h1>${escapeHtml(state.teamName)}</h1><p>Progresul este salvat pe telefon și sincronizat live cu organizatorii.</p></div>
      </div>
      <div class="team-grid">
        <div class="team-card"><span>Cod echipă</span><strong>${escapeHtml(state.teamCode)}</strong><small>Pentru Întâlnirea 021</small></div>
        <div class="team-card"><span>Ruta</span><strong>${ROUTE_NAMES[state.route]}</strong><small>${ROUTES[state.route].map((code) => MISSIONS[code].shortLocation).join(" → ")}</small></div>
        <div class="team-card"><span>Gest secret</span><strong>${teamGesture()}</strong><small>Folosiți-l în fotografia cu altă echipă</small></div>
        <div class="team-card"><span>Progres</span><strong>${coreCount}/6</strong><small>${completedSideCount()} side quest-uri / ${state.hints.length} indicii</small></div>
        <div class="team-card team-card--location"><span>Locație pentru organizatori</span><strong>${locationLabel}</strong><small>${locationActive ? `Precizie curentă ±${currentLocation?.accuracy || "?"} m. Se trimite doar cât pagina este deschisă.` : "Opțională. Poți activa sau opri partajarea în orice moment."}</small><button class="small-button" type="button" data-toggle-location>${state.locationConsent ? "Oprește locația" : "Activează locația"}</button></div>
      </div>
      <div class="team-actions">
        <button class="button button--signal" type="button" data-share-report>Partajează raportul</button>
        <button class="button button--quiet" type="button" data-open-current>Misiunea curentă</button>
        <button class="button danger-button" type="button" data-reset-game>Șterge progresul local</button>
      </div>`;
  }

  function setActiveTab(tabName) {
    activeTab = tabName;
    document.querySelectorAll(".game-tab").forEach((button) => button.classList.toggle("is-active", button.dataset.tab === tabName));
    els.missionTab.hidden = tabName !== "mission";
    els.bonusTab.hidden = tabName !== "bonus";
    els.teamTab.hidden = tabName !== "team";
    if (tabName === "bonus") renderBonusTab();
    if (tabName === "team") renderTeamTab();
  }

  function updateBonusBadge() {
    if (!state) return;
    const flashCount = FLASHES.filter((flash) => flashStatus(flash) === "open" && !state.flashes[flash.code]).length;
    const liveCount = liveMissions.filter((mission) => !state.liveBonuses?.[mission.code]).length;
    const count = flashCount + liveCount;
    els.bonusBadge.hidden = count === 0;
    els.bonusBadge.textContent = count || "";
  }

  function useHint(code) {
    const mission = MISSIONS[code];
    if (state.hints.includes(code)) {
      showToast(mission.hint);
      return;
    }
    if (!window.confirm("Folosiți indiciul pentru -15 puncte?")) return;
    state.hints.push(code);
    saveState();
    renderGame();
    showToast(mission.hint);
  }

  function toggleJoker(code) {
    if (state.sideQuests[code]) return;
    if (state.jokerTargets[code]) {
      delete state.jokerTargets[code];
      saveState();
      renderGame();
      return;
    }
    if (usedJokers() >= 2) {
      showToast("Ați repartizat deja ambele Jokere.", true);
      return;
    }
    state.jokerTargets[code] = true;
    saveState();
    renderGame();
    showToast(`Joker x2 activat pentru ${code}.`);
  }

  function completeSideQuest(code) {
    if (state.sideQuests[code]) return;
    if (completedSideCount() >= 5) {
      showToast("Ați atins limita de cinci side quest-uri.", true);
      return;
    }
    const checkbox = document.querySelector(`[data-side-proof="${code}"]`);
    if (!checkbox?.checked) {
      showToast("Confirmați mai întâi că dovada este pregătită.", true);
      return;
    }
    state.sideQuests[code] = { completedAt: Date.now(), joker: Boolean(state.jokerTargets[code]) };
    saveState();
    renderGame();
    showToast(`${code} finalizat. Punctajul este provizoriu.`);
  }

  function completeFlash(code) {
    const flash = FLASHES.find((entry) => entry.code === code);
    if (!flash || state.flashes[code] || flashStatus(flash) !== "open") return;
    const checkbox = document.querySelector(`[data-flash-proof="${code}"]`);
    if (!checkbox?.checked) {
      showToast("Confirmați mai întâi că dovada este pregătită.", true);
      return;
    }
    state.flashes[code] = { completedAt: Date.now() };
    saveState();
    renderGame();
    showToast(`${code} finalizat: +40 puncte provizorii.`);
  }

  function reportCode() {
    const payload = `${state.teamCode}|${state.route}|${calculateScore()}|${Object.keys(state.completedMissions).length}|${completedSideCount()}|${state.hints.length}`;
    return hashNumber(payload).toString(36).toUpperCase().padStart(7, "0").slice(-7);
  }

  function reportText() {
    return [
      "ARHIVA 021 - raport echipă",
      `Echipă: ${state.teamName}`,
      `Cod: ${state.teamCode}`,
      `Ruta: ${ROUTE_NAMES[state.route]}`,
      `Scor provizoriu: ${calculateScore()}`,
      `Checkpoint-uri: ${Object.keys(state.completedMissions).length}/6`,
      `Side quest-uri: ${completedSideCount()}/5`,
      `Flash missions: ${Object.keys(state.flashes).length}/2`,
      `Misiuni live: ${Object.keys(state.liveBonuses || {}).length}`,
      `Indicii: ${state.hints.length}`,
      `Cod raport: ${reportCode()}`
    ].join("\n");
  }

  async function shareReport() {
    const text = reportText();
    if (navigator.share) {
      try {
        await navigator.share({ title: `ARHIVA 021 - ${state.teamName}`, text });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    await copyText(text);
    showToast("Raport copiat. Trimite-l organizatorului.");
  }

  async function shareEvidence(code, button) {
    const input = code.startsWith("M") ? document.getElementById("mission-evidence") : document.getElementById(`evidence-${code}`);
    const file = input?.files?.[0];
    if (!file) {
      showToast("Alege mai întâi fotografia sau clipul.", true);
      input?.click();
      return;
    }
    if (file.size > MAX_EVIDENCE_BYTES) {
      showToast("Fișierul depășește limita de 20 MB. Alege un clip mai scurt sau o fotografie.", true);
      return;
    }
    if (!navigator.onLine) {
      showToast("Nu ai conexiune. Progresul rămâne salvat; trimite dovada când revii online.", true);
      return;
    }

    const originalLabel = button?.textContent || "Trimite acum";
    if (button) {
      button.disabled = true;
      button.textContent = "Se trimite…";
    }

    const form = new FormData();
    form.append("teamName", state.teamName);
    form.append("teamCode", state.teamCode);
    form.append("challengeCode", code);
    form.append("file", file, file.name);

    try {
      const response = await fetch(`${EVIDENCE_HUB}/api/upload`, { method: "POST", body: form });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Dovada nu a putut fi trimisă.");
      state.uploads ||= {};
      state.uploads[code] = { id: payload.id, sentAt: Date.now() };
      const liveMission = liveMissions.find((mission) => mission.code === code);
      if (liveMission) {
        state.liveBonuses ||= {};
        state.liveBonuses[code] = {
          title: liveMission.title,
          points: Number(liveMission.points) || 0,
          completedAt: Date.now()
        };
      }
      saveState();
      if (button) button.textContent = "Trimis ✓";
      showToast(`${code}: dovada a ajuns la organizator.`);
      if (liveMission) {
        renderStatus();
        renderBonusTab();
        renderLiveSignal();
      }
    } catch (error) {
      if (button) button.textContent = originalLabel;
      showToast(error instanceof Error ? error.message : "Dovada nu a putut fi trimisă. Reîncearcă.", true);
    } finally {
      if (button) button.disabled = false;
    }
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }

  function showToast(message, isError = false) {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.toggle("is-error", isError);
    els.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 4300);
  }

  function resetGame() {
    if (!window.confirm("Ștergi progresul ARHIVA 021 de pe acest telefon? Acțiunea nu poate fi anulată.")) return;
    stopLocationTracking(false);
    localStorage.removeItem(STORAGE_KEY);
    state = null;
    activeTab = "mission";
    showLanding();
    showToast("Progresul local a fost șters.");
  }

  els.teamForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const teamName = String(data.get("teamName") || "").trim();
    const route = String(data.get("route") || "");
    const suppliedCode = String(data.get("teamCode") || "").trim().toUpperCase();
    if (!teamName || !ROUTES[route]) return;
    state = defaultState(teamName, suppliedCode, route);
    state.locationConsent = data.get("locationConsent") === "on";
    state.locationStatus = state.locationConsent ? "requesting" : "disabled";
    saveState();
    showGame();
  });

  els.resumeButton.addEventListener("click", showGame);
  els.newGameButton.addEventListener("click", () => {
    els.resumePanel.hidden = true;
    els.teamForm.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll(".game-tab").forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;

    if (target.matches("[data-close-dialog]")) target.closest("dialog")?.close();
    if (target.dataset.useHint) useHint(target.dataset.useHint);
    if (target.dataset.toggleJoker) toggleJoker(target.dataset.toggleJoker);
    if (target.dataset.completeSide) completeSideQuest(target.dataset.completeSide);
    if (target.dataset.completeFlash) completeFlash(target.dataset.completeFlash);
    if (target.dataset.shareEvidence) shareEvidence(target.dataset.shareEvidence, target);
    if (target.hasAttribute("data-share-report")) shareReport();
    if (target.hasAttribute("data-reset-game")) resetGame();
    if (target.hasAttribute("data-toggle-location")) toggleLocationTracking();
    if (target.hasAttribute("data-open-live")) {
      setActiveTab("bonus");
      document.querySelector(".live-drop-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (target.hasAttribute("data-open-current") || target.hasAttribute("data-return-current")) {
      state.selectedMission = null;
      saveState();
      setActiveTab("mission");
      renderMissionTab();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (target.hasAttribute("data-open-team")) setActiveTab("team");
    if (target.dataset.viewMission && state.completedMissions[target.dataset.viewMission]) {
      state.selectedMission = target.dataset.viewMission;
      saveState();
      setActiveTab("mission");
      renderMissionTab();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  els.helpButton.addEventListener("click", () => els.helpDialog.showModal());

  if (ORGANIZER_PHONE) {
    els.organizerPhone.href = `tel:${ORGANIZER_PHONE.replace(/\s/g, "")}`;
    els.organizerPhone.textContent = `Sună ${ORGANIZER_PHONE}`;
    els.organizerPhone.removeAttribute("aria-disabled");
  } else {
    els.organizerPhone.addEventListener("click", (event) => event.preventDefault());
  }

  window.addEventListener("offline", () => showToast("Ești offline. Misiunile și progresul local continuă să funcționeze."));
  window.addEventListener("online", () => {
    showToast("Conexiunea a revenit. Progresul se sincronizează.");
    queueTeamSync(true);
    void fetchLiveMissions();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && state) void syncTeam();
  });

  if ("serviceWorker" in navigator && !TEST_MODE) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }

  if (state) showLanding();
  else showLanding();
  updateTimer();
  window.setInterval(updateTimer, 1000);
})();
