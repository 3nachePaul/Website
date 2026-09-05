const stare = {
  sectiune: "fragmente",
  categorie: "toate",
  grupTpl: "toate",
  grupProp: "toate",
  tipEx: "toate",
  cautare: ""
};

const elemContinut = document.getElementById("continut");
const elemRezumat = document.getElementById("rezumat");
const elemFiltre = document.getElementById("filtre");
const elemTitluFiltre = document.getElementById("titlu-filtre");
const elemCautare = document.getElementById("cautare");
const elemBara = document.querySelector(".bara");
const elemCorp = document.querySelector(".corp");

/* ---------- unde se pune codul ---------- */

const FISIER_IMPLICIT = {
  css: "resurse/scss/stil.scss",
  scss: "resurse/scss/customizare_bootstrap.scss",
  html: "views/pagini/*.ejs",
  js: "resurse/js/script.js"
};

const FISIER_PE_CATEGORIE = {
  express: "index.js",
  ejs: "views/pagini/*.ejs",
  fetch: "resurse/js/script.js",
  bootstrap: "resurse/scss/customizare_bootstrap.scss"
};

function undeSePune(s) {
  if (s.fisier) return s.fisier;

  if (s.cat === "express") return "index.js";
  if (s.cat === "ejs") return "views/pagini/*.ejs";
  if (s.cat === "fetch") return s.lang === "js" && s.cod.indexOf("app.get") !== -1
    ? "index.js"
    : "resurse/js/script.js";
  if (s.cat === "bootstrap") {
    return s.lang === "scss"
      ? "resurse/scss/customizare_bootstrap.scss"
      : "views/pagini/*.ejs";
  }

  return FISIER_IMPLICIT[s.lang] || "views/pagini/*.ejs";
}

/* ---------- utilitare ---------- */

function normalizeaza(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function scapaHtml(text) {
  return String(text)
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
  const bucati = [
    item.titlu || "",
    item.cand || "",
    item.cerinta || "",
    item.intrebare || "",
    item.raspuns || "",
    (item.tags || []).join(" "),
    item.nota || "",
    item.cod || "",
    undeSePune(item.cat ? item : { lang: "", cat: "", cod: "" })
  ];

  (item.fisiere || []).forEach(function (f) {
    bucati.push(f.nume, f.cod, f.explicatie || "");
  });

  (item.pasi || []).forEach(function (p) {
    bucati.push(p.fisier, p.cod, p.explicatie || "");
  });

  bucati.push(item.descriere || "", item.nume || "");

  (item.valori || []).forEach(function (v) {
    bucati.push(v.val, v.ce, v.cand || "");
  });

  (item.exemple || []).forEach(function (ex) {
    bucati.push(ex.cod, ex.explicatie || "");
  });

  return normalizeaza(bucati.join(" "));
}

function seCauta(item, termen) {
  if (!termen) return true;
  return textDeCautat(item).includes(normalizeaza(termen));
}

/* ---------- bucăți de interfață ---------- */

function blocCod(cod, lang, numeFisier, explicatie, termen) {
  let evidentiat;
  try {
    evidentiat = hljs.highlight(cod, { language: lang || "plaintext" }).value;
  } catch (e) {
    evidentiat = scapaHtml(cod);
  }

  const antet = numeFisier
    ? '<div class="cod__fisier"><span class="cod__eticheta">se pune în</span>' +
      "<code>" + evidentiaza(numeFisier, termen) + "</code></div>"
    : "";

  const desc = explicatie
    ? '<p class="cod__explicatie">' + evidentiaza(explicatie, termen) + "</p>"
    : "";

  return (
    '<div class="pas">' +
    antet +
    desc +
    '<div class="cod">' +
    '<button class="copiaza" type="button">Copiază</button>' +
    '<pre><code class="hljs">' + evidentiat + "</code></pre>" +
    "</div></div>"
  );
}

function etichete(tags, termen) {
  if (!tags || tags.length === 0) return "";
  return (
    '<div class="fisa__etichete">' +
    tags.map(function (t) {
      return '<span class="eticheta">' + evidentiaza(t, termen) + "</span>";
    }).join("") +
    "</div>"
  );
}

function nota(text) {
  if (!text) return "";
  return '<div class="fisa__nota">' + scapaHtml(text) + "</div>";
}

/* ---------- randare fragmente ---------- */

function randeazaFragment(s, termen) {
  return (
    '<article class="fisa">' +
    '<div class="fisa__antet">' +
    '<h2 class="fisa__titlu">' + evidentiaza(s.titlu, termen) + "</h2>" +
    (s.cand ? '<p class="fisa__cand">' + evidentiaza(s.cand, termen) + "</p>" : "") +
    etichete(s.tags, termen) +
    "</div>" +
    blocCod(s.cod, s.lang, undeSePune(s), null, termen) +
    nota(s.nota) +
    "</article>"
  );
}

/* ---------- randare exerciții ---------- */

function randeazaExercitiu(ex, termen) {
  const tip = TIPURI_EX.find(function (t) { return t.id === ex.tip; });

  return (
    '<article class="fisa exercitiu">' +
    '<div class="fisa__antet">' +
    '<div class="fisa__tip">' + (tip ? tip.nume : ex.tip) + "</div>" +
    '<h2 class="fisa__titlu">' + evidentiaza(ex.titlu, termen) + "</h2>" +
    '<blockquote class="cerinta">' + evidentiaza(ex.cerinta, termen) + "</blockquote>" +
    etichete(ex.tags, termen) +
    "</div>" +
    ex.pasi.map(function (p) {
      return blocCod(p.cod, p.lang, p.fisier, p.explicatie, termen);
    }).join("") +
    nota(ex.nota) +
    "</article>"
  );
}

/* ---------- randare șabloane ---------- */

function randeazaSablon(t, termen) {
  const grup = GRUPURI_TPL.find(function (g) { return g.id === t.grup; });

  return (
    '<article class="fisa sablon">' +
    '<div class="fisa__antet">' +
    '<div class="fisa__tip">' + (grup ? grup.nume : t.grup) + "</div>" +
    '<h2 class="fisa__titlu">' + evidentiaza(t.titlu, termen) + "</h2>" +
    (t.cand ? '<p class="fisa__cand">' + evidentiaza(t.cand, termen) + "</p>" : "") +
    etichete(t.tags, termen) +
    "</div>" +
    t.fisiere.map(function (f) {
      return blocCod(f.cod, f.lang, f.nume, f.explicatie, termen);
    }).join("") +
    nota(t.nota) +
    "</article>"
  );
}

/* ---------- randare proprietăți ---------- */

function randeazaProprietate(p, termen) {
  const grup = GRUPURI_PROP.find(function (g) { return g.id === p.grup; });

  const tabel =
    '<table class="valori">' +
    "<thead><tr><th>Valoare</th><th>Ce face</th><th>Când o folosesc</th></tr></thead>" +
    "<tbody>" +
    p.valori.map(function (v) {
      return "<tr>" +
        "<td><code>" + evidentiaza(v.val, termen) + "</code></td>" +
        "<td>" + evidentiaza(v.ce, termen) + "</td>" +
        "<td>" + evidentiaza(v.cand || "", termen) + "</td>" +
        "</tr>";
    }).join("") +
    "</tbody></table>";

  const exemple = (p.exemple || []).map(function (ex) {
    return blocCod(ex.cod, ex.lang, null, ex.explicatie, termen);
  }).join("");

  return (
    '<article class="fisa proprietate">' +
    '<div class="fisa__antet">' +
    '<div class="fisa__tip">' + (grup ? grup.nume : p.grup) + "</div>" +
    '<h2 class="fisa__titlu mono">' + evidentiaza(p.nume, termen) + "</h2>" +
    '<p class="fisa__cand">' + evidentiaza(p.descriere, termen) + "</p>" +
    etichete(p.tags, termen) +
    "</div>" +
    tabel +
    exemple +
    nota(p.nota) +
    "</article>"
  );
}

/* ---------- randare structură ---------- */

function randeazaStructura(termen) {
  const intrebari = STRUCTURA.unde.filter(function (u) { return seCauta(u, termen); });

  const arbore =
    '<article class="fisa">' +
    '<div class="fisa__antet">' +
    '<h2 class="fisa__titlu">Structura proiectului</h2>' +
    '<p class="fisa__cand">Unde stă fiecare fișier și ce conține.</p>' +
    "</div>" +
    '<div class="cod arbore">' +
    '<pre><code>' + scapaHtml(STRUCTURA.arbore) + "</code></pre>" +
    "</div></article>";

  const lista = intrebari.length === 0 ? "" :
    '<article class="fisa">' +
    '<div class="fisa__antet">' +
    '<h2 class="fisa__titlu">Unde găsesc ce</h2>' +
    "</div>" +
    '<dl class="unde">' +
    intrebari.map(function (u) {
      return "<dt>" + evidentiaza(u.intrebare, termen) + "</dt>" +
             "<dd>" + evidentiaza(u.raspuns, termen) + "</dd>";
    }).join("") +
    "</dl></article>";

  const comenzi =
    '<article class="fisa">' +
    '<div class="fisa__antet">' +
    '<h2 class="fisa__titlu">Comenzi</h2>' +
    "</div>" +
    '<dl class="unde">' +
    STRUCTURA.comenzi.map(function (c) {
      return "<dt><code>" + scapaHtml(c.cmd) + "</code></dt>" +
             "<dd>" + scapaHtml(c.desc) + "</dd>";
    }).join("") +
    "</dl></article>";

  return arbore + lista + comenzi;
}

/* ---------- filtre laterale ---------- */

function construiesteFiltre() {
  const termen = stare.cautare.trim();
  let titlu, randuri, activ, numara;

  if (stare.sectiune === "fragmente") {
    titlu = "Categorii";
    randuri = [{ id: "toate", nume: "Toate" }].concat(CATEGORII);
    activ = stare.categorie;
    numara = function (id) {
      return SNIPPETS.filter(function (s) {
        if (id !== "toate" && s.cat !== id) return false;
        return seCauta(s, termen);
      }).length;
    };
  } else if (stare.sectiune === "exercitii") {
    titlu = "Tip de subiect";
    randuri = [{ id: "toate", nume: "Toate" }].concat(TIPURI_EX);
    activ = stare.tipEx;
    numara = function (id) {
      return EXERCITII.filter(function (e) {
        if (id !== "toate" && e.tip !== id) return false;
        return seCauta(e, termen);
      }).length;
    };
  } else if (stare.sectiune === "proprietati") {
    titlu = "Grupe de proprietăți";
    randuri = [{ id: "toate", nume: "Toate" }].concat(GRUPURI_PROP);
    activ = stare.grupProp;
    numara = function (id) {
      return PROPRIETATI.filter(function (p) {
        if (id !== "toate" && p.grup !== id) return false;
        return seCauta(p, termen);
      }).length;
    };
  } else {
    titlu = "Tip de cerință";
    randuri = [{ id: "toate", nume: "Toate" }].concat(GRUPURI_TPL);
    activ = stare.grupTpl;
    numara = function (id) {
      return TEMPLATES.filter(function (t) {
        if (id !== "toate" && t.grup !== id) return false;
        return seCauta(t, termen);
      }).length;
    };
  }

  elemTitluFiltre.textContent = titlu;

  elemFiltre.innerHTML = randuri.map(function (c) {
    const n = numara(c.id);
    return (
      "<li>" +
      '<button class="bara__buton" data-id="' + c.id + '"' +
      ' aria-pressed="' + (activ === c.id ? "true" : "false") + '"' +
      (n === 0 ? " disabled" : "") + ">" +
      "<span>" + c.nume + "</span>" +
      '<span class="bara__numar">' + n + "</span>" +
      "</button></li>"
    );
  }).join("");
}

/* ---------- randare principală ---------- */

function elementeCurente(termen) {
  if (stare.sectiune === "fragmente") {
    return SNIPPETS.filter(function (s) {
      if (stare.categorie !== "toate" && s.cat !== stare.categorie) return false;
      return seCauta(s, termen);
    });
  }

  if (stare.sectiune === "exercitii") {
    return EXERCITII.filter(function (e) {
      if (stare.tipEx !== "toate" && e.tip !== stare.tipEx) return false;
      return seCauta(e, termen);
    });
  }

  if (stare.sectiune === "proprietati") {
    return PROPRIETATI.filter(function (p) {
      if (stare.grupProp !== "toate" && p.grup !== stare.grupProp) return false;
      return seCauta(p, termen);
    });
  }

  if (stare.sectiune === "sabloane") {
    return TEMPLATES.filter(function (t) {
      if (stare.grupTpl !== "toate" && t.grup !== stare.grupTpl) return false;
      return seCauta(t, termen);
    });
  }

  return [];
}

function randeaza() {
  const termen = stare.cautare.trim();

  if (stare.sectiune === "structura") {
    elemBara.classList.add("ascuns");
    elemCorp.classList.add("corp--larg");
    elemRezumat.textContent = "";
    elemContinut.innerHTML = randeazaStructura(termen);
    return;
  }

  elemBara.classList.remove("ascuns");
  elemCorp.classList.remove("corp--larg");
  construiesteFiltre();

  const elemente = elementeCurente(termen);

  if (elemente.length === 0) {
    elemRezumat.textContent = "";
    elemContinut.innerHTML =
      '<p class="gol">Nimic pentru <code>' + scapaHtml(termen) + "</code>. " +
      "Încearcă un cuvânt din cod, de exemplu <code>forEach</code>, " +
      "<code>tbody</code> sau <code>req.params</code>.</p>";
    return;
  }

  const cuvant = elemente.length === 1 ? "rezultat" : "rezultate";
  elemRezumat.textContent =
    elemente.length + " " + cuvant + (termen ? ' pentru "' + termen + '"' : "");

  let randeazaUnul;
  if (stare.sectiune === "fragmente") randeazaUnul = randeazaFragment;
  else if (stare.sectiune === "exercitii") randeazaUnul = randeazaExercitiu;
  else if (stare.sectiune === "proprietati") randeazaUnul = randeazaProprietate;
  else randeazaUnul = randeazaSablon;

  elemContinut.innerHTML = elemente.map(function (el) {
    return randeazaUnul(el, termen);
  }).join("");
}

/* ---------- evenimente ---------- */

elemCautare.addEventListener("input", function () {
  stare.cautare = elemCautare.value;
  randeaza();
});

elemFiltre.addEventListener("click", function (e) {
  const buton = e.target.closest(".bara__buton");
  if (!buton) return;

  const id = buton.dataset.id;

  if (stare.sectiune === "fragmente") stare.categorie = id;
  else if (stare.sectiune === "exercitii") stare.tipEx = id;
  else if (stare.sectiune === "proprietati") stare.grupProp = id;
  else stare.grupTpl = id;

  randeaza();
});

document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    stare.sectiune = tab.dataset.sectiune;

    document.querySelectorAll(".tab").forEach(function (t) {
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
    });

    window.scrollTo({ top: 0 });
    randeaza();
  });
});

elemContinut.addEventListener("click", function (e) {
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
