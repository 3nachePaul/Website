const stare = {
  vizualizare: "fragmente",
  categorie: "toate",
  cautare: ""
};

const elemFise = document.getElementById("fise");
const elemRezumat = document.getElementById("rezumat");
const elemCategorii = document.getElementById("lista-categorii");
const elemCautare = document.getElementById("cautare");

function normalizeaza(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function scapaHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function scapaRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function evidentiaza(text, termen) {
  if (!termen) return scapaHtml(text);
  const tipar = new RegExp("(" + scapaRegex(termen) + ")", "gi");
  return scapaHtml(text).replace(tipar, "<mark>$1</mark>");
}

function textDeCautat(item) {
  const bucati = [item.titlu, item.cand || "", (item.tags || []).join(" "), item.nota || ""];

  if (item.cod) bucati.push(item.cod);
  if (item.fisiere) {
    item.fisiere.forEach(f => bucati.push(f.nume, f.cod));
  }

  return normalizeaza(bucati.join(" "));
}

function seCauta(item, termen) {
  if (!termen) return true;
  return textDeCautat(item).includes(normalizeaza(termen));
}

function blocCod(cod, lang, numeFisier) {
  const contineNume = numeFisier
    ? '<div class="cod__nume">' + scapaHtml(numeFisier) + "</div>"
    : "";

  let evidentiat;
  try {
    evidentiat = hljs.highlight(cod, { language: lang || "plaintext" }).value;
  } catch (e) {
    evidentiat = scapaHtml(cod);
  }

  return (
    '<div class="cod">' +
    contineNume +
    '<button class="copiaza" type="button">Copiază</button>' +
    '<pre><code class="hljs">' + evidentiat + "</code></pre>" +
    "</div>"
  );
}

function etichete(tags, termen) {
  if (!tags || tags.length === 0) return "";
  return (
    '<div class="fisa__etichete">' +
    tags.map(t => '<span class="eticheta">' + evidentiaza(t, termen) + "</span>").join("") +
    "</div>"
  );
}

function nota(text) {
  if (!text) return "";
  return '<div class="fisa__nota">' + scapaHtml(text) + "</div>";
}

function randeazaFragment(s, termen) {
  return (
    '<article class="fisa">' +
    '<div class="fisa__antet">' +
    '<h2 class="fisa__titlu">' + evidentiaza(s.titlu, termen) + "</h2>" +
    (s.cand ? '<p class="fisa__cand">' + evidentiaza(s.cand, termen) + "</p>" : "") +
    etichete(s.tags, termen) +
    "</div>" +
    blocCod(s.cod, s.lang) +
    nota(s.nota) +
    "</article>"
  );
}

function randeazaSablon(t, termen) {
  return (
    '<article class="fisa sablon">' +
    '<div class="fisa__antet">' +
    '<h2 class="fisa__titlu">' + evidentiaza(t.titlu, termen) + "</h2>" +
    (t.cand ? '<p class="fisa__cand">' + evidentiaza(t.cand, termen) + "</p>" : "") +
    etichete(t.tags, termen) +
    "</div>" +
    t.fisiere.map(f => blocCod(f.cod, f.lang, f.nume)).join("") +
    nota(t.nota) +
    "</article>"
  );
}

function elementeCurente() {
  const termen = stare.cautare.trim();

  if (stare.vizualizare === "sabloane") {
    return TEMPLATES.filter(t => seCauta(t, termen));
  }

  return SNIPPETS.filter(function (s) {
    if (stare.categorie !== "toate" && s.cat !== stare.categorie) return false;
    return seCauta(s, termen);
  });
}

function construiesteCategorii() {
  const termen = stare.cautare.trim();

  const numar = function (idCat) {
    return SNIPPETS.filter(function (s) {
      if (idCat !== "toate" && s.cat !== idCat) return false;
      return seCauta(s, termen);
    }).length;
  };

  const randuri = [{ id: "toate", nume: "Toate" }].concat(CATEGORII);

  elemCategorii.innerHTML = randuri
    .map(function (c) {
      const n = numar(c.id);
      const apasat = stare.categorie === c.id ? "true" : "false";
      return (
        "<li>" +
        '<button class="bara__buton" data-cat="' + c.id + '" aria-pressed="' + apasat + '"' +
        (n === 0 ? " disabled" : "") + ">" +
        "<span>" + c.nume + "</span>" +
        '<span class="bara__numar">' + n + "</span>" +
        "</button></li>"
      );
    })
    .join("");
}

function randeaza() {
  const termen = stare.cautare.trim();
  const elemente = elementeCurente();

  const bara = document.querySelector(".bara");
  const corp = document.querySelector(".corp");

  if (stare.vizualizare === "fragmente") {
    construiesteCategorii();
    bara.classList.remove("ascuns");
    corp.classList.remove("corp--larg");
  } else {
    bara.classList.add("ascuns");
    corp.classList.add("corp--larg");
  }

  if (elemente.length === 0) {
    elemRezumat.textContent = "";
    elemFise.innerHTML =
      '<p class="gol">Nimic pentru <code>' + scapaHtml(termen) + "</code>. " +
      "Încearcă un cuvânt din cod, de exemplu <code>forEach</code> sau <code>nth-child</code>.</p>";
    return;
  }

  const cuvant = elemente.length === 1 ? "rezultat" : "rezultate";
  elemRezumat.textContent =
    elemente.length + " " + cuvant + (termen ? ' pentru "' + termen + '"' : "");

  elemFise.innerHTML = elemente
    .map(el => (stare.vizualizare === "sabloane"
      ? randeazaSablon(el, termen)
      : randeazaFragment(el, termen)))
    .join("");
}

/* ---------- evenimente ---------- */

elemCautare.addEventListener("input", function () {
  stare.cautare = elemCautare.value;
  randeaza();
});

elemCategorii.addEventListener("click", function (e) {
  const buton = e.target.closest(".bara__buton");
  if (!buton) return;
  stare.categorie = buton.dataset.cat;
  randeaza();
});

document.getElementById("tab-fragmente").addEventListener("click", function () {
  stare.vizualizare = "fragmente";
  this.setAttribute("aria-selected", "true");
  document.getElementById("tab-sabloane").setAttribute("aria-selected", "false");
  randeaza();
});

document.getElementById("tab-sabloane").addEventListener("click", function () {
  stare.vizualizare = "sabloane";
  this.setAttribute("aria-selected", "true");
  document.getElementById("tab-fragmente").setAttribute("aria-selected", "false");
  randeaza();
});

elemFise.addEventListener("click", function (e) {
  const buton = e.target.closest(".copiaza");
  if (!buton) return;

  const cod = buton.parentElement.querySelector("code").textContent;

  navigator.clipboard.writeText(cod).then(function () {
    buton.textContent = "Copiat";
    buton.dataset.copiat = "da";
    setTimeout(function () {
      buton.textContent = "Copiază";
      delete buton.dataset.copiat;
    }, 1400);
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "/" && document.activeElement !== elemCautare) {
    e.preventDefault();
    elemCautare.focus();
    elemCautare.select();
  }
  if (e.key === "Escape" && document.activeElement === elemCautare) {
    elemCautare.value = "";
    stare.cautare = "";
    randeaza();
  }
});

randeaza();
