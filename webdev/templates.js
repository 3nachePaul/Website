const TEMPLATES = [
  {
    titlu: "Pagină nouă completă (rută + EJS)",
    cand: "Cerințele de tipul „creați o pagină accesibilă la /ceva, cu același aspect ca restul site-ului”.",
    tags: ["ruta", "ejs", "pagina noua", "include", "express", "header", "footer"],
    fisiere: [
      {
        nume: "index.js — se pune ÎNAINTE de app.get(\"/*\")",
        lang: "js",
        cod: `app.get("/erori_status", function (req, res) {
  const cale = path.join(__dirname, "erori.json");
  const date = JSON.parse(fs.readFileSync(cale, "utf8"));

  const erori = date.info_erori.filter(e => e.status);

  res.render("pagini/erori_status", { erori: erori });
});`
      },
      {
        nume: "views/pagini/erori_status.ejs",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Erori cu status</h1>

  <table>
    <thead>
      <tr>
        <th>Titlu</th>
        <th>Text</th>
      </tr>
    </thead>
    <tbody>
      <% erori.forEach(function (e) { %>
        <tr>
          <td><%= e.titlu %></td>
          <td><%= e.text %></td>
        </tr>
      <% }); %>
    </tbody>
  </table>
</main>

<%- include("../fragmente/footer") %>`
      }
    ],
    nota: "Verifică numele exacte ale fragmentelor din views/fragmente/ înainte de a copia (header, antet, head)."
  },
  {
    titlu: "Rută cu parametri + filtrare + localStorage",
    cand: "Cerințele de tip /prajitura/30/100 cu radio de filtrare și interval reținut.",
    tags: ["req.params", "ruta", "radio", "localStorage", "filtrare", "interval"],
    fisiere: [
      {
        nume: "index.js",
        lang: "js",
        cod: `app.get("/prajitura/:pret1/:pret2", function (req, res) {
  const pret1 = parseFloat(req.params.pret1);
  const pret2 = parseFloat(req.params.pret2);

  client.query("SELECT * FROM produse", function (err, rezultat) {
    if (err) {
      afisareEroare(res, 2);
      return;
    }

    const filtrate = rezultat.rows.filter(function (p) {
      return p.pret >= pret1 && p.pret <= pret2;
    });

    res.render("pagini/prajitura", {
      produse: filtrate,
      pret1: pret1,
      pret2: pret2
    });
  });
});`
      },
      {
        nume: "views/pagini/prajitura.ejs",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Prăjituri între <%= pret1 %> și <%= pret2 %> lei</h1>

  <% produse.forEach(function (p) { %>
    <p class="prajitura <%= p.diabetic ? 'diabetic' : '' %>">
      <b><%= p.nume %></b> — <%= p.pret %> lei
      <% if (p.diabetic) { %> — pentru diabetici<% } %>
    </p>
  <% }); %>

  <fieldset>
    <input type="radio" name="filtru" id="f-tot" value="tot" checked>
    <label for="f-tot">tot</label>

    <input type="radio" name="filtru" id="f-diab" value="diabetici">
    <label for="f-diab">pentru diabetici</label>

    <input type="radio" name="filtru" id="f-nediab" value="non-diabetici">
    <label for="f-nediab">pentru non-diabetici</label>

    <button type="button" id="afiseaza">Afișează</button>
  </fieldset>

  <p id="interval-anterior"></p>
</main>

<script>
  document.getElementById("afiseaza").addEventListener("click", function () {
    const ales = document.querySelector('input[name="filtru"]:checked').value;

    document.querySelectorAll(".prajitura").forEach(function (p) {
      const eDiabetic = p.classList.contains("diabetic");
      let arata = true;

      if (ales === "diabetici") arata = eDiabetic;
      if (ales === "non-diabetici") arata = !eDiabetic;

      p.style.display = arata ? "" : "none";
    });
  });

  window.addEventListener("load", function () {
    const anterior = localStorage.getItem("intervalPret");

    if (anterior) {
      const interval = JSON.parse(anterior);
      document.getElementById("interval-anterior").textContent =
        "intervalul anterior de preturi: [" + interval[0] + ", " + interval[1] + "]";
    }

    localStorage.setItem("intervalPret", JSON.stringify([<%= pret1 %>, <%= pret2 %>]));
  });
</script>

<%- include("../fragmente/footer") %>`
      }
    ],
    nota: "Ordinea contează: citești din localStorage întâi, scrii pe urmă. Invers, ai afișa mereu intervalul curent."
  },
  {
    titlu: "Galerie din JSON, filtrată după oră",
    cand: "Cerința cu perioade_ore: început, mijloc, final, mereu.",
    tags: ["galerie", "json", "perioade_ore", "getMinutes", "filter", "ejs"],
    fisiere: [
      {
        nume: "index.js",
        lang: "js",
        cod: `function initGalerie() {
  const cale = path.join(__dirname, "resurse", "json", "galerie.json");
  const date = JSON.parse(fs.readFileSync(cale, "utf8"));
  obGlobal.obImagini = date;
}

function seAfiseaza(imagine) {
  if (!imagine.perioade_ore) return false;
  if (imagine.perioade_ore.includes("mereu")) return true;

  const minut = new Date().getMinutes();
  const perioada = minut < 20 ? "inceput" : minut < 40 ? "mijloc" : "final";

  return imagine.perioade_ore.includes(perioada);
}

app.get(["/", "/index", "/home"], function (req, res) {
  const toate = obGlobal.obImagini.imagini;

  res.render("pagini/index", {
    imagini: toate.filter(seAfiseaza),
    cale_galerie: obGlobal.obImagini.cale_galerie
  });
});`
      },
      {
        nume: "views/pagini/index.ejs — secțiunea galerie",
        lang: "html",
        cod: `<section id="galerie">
  <h2>Galerie</h2>

  <% imagini.forEach(function (img) { %>
    <figure>
      <img src="<%= cale_galerie %>/<%= img.cale_relativa %>"
           alt="<%= img.descriere %>">
      <figcaption><%= img.descriere %></figcaption>
    </figure>
  <% }); %>
</section>`
      }
    ],
    nota: "Ca să afișezi TOATE imaginile (varianta fără filtrare), trimiți direct toate în render, fără .filter(seAfiseaza)."
  },
  {
    titlu: "Galerie cu clase din JSON + contor",
    cand: "Cerința care cere atributul class generat din proprietatea „clase” și numărătoare sub galerie.",
    tags: ["clase", "class", "contor", "split", "replace", "galerie", "numarare"],
    fisiere: [
      {
        nume: "index.js",
        lang: "js",
        cod: `app.get(["/", "/index", "/home"], function (req, res) {
  const imagini = obGlobal.obImagini.imagini;
  const contor = {};

  imagini.forEach(function (img) {
    const lista = img.clase.split(", ").map(function (c) {
      return c.trim().replace(/ /g, "_");
    });

    img.claseCSS = lista.join(" ");

    lista.forEach(function (c) {
      contor[c] = (contor[c] || 0) + 1;
    });
  });

  res.render("pagini/index", {
    imagini: imagini,
    contor: contor,
    cale_galerie: obGlobal.obImagini.cale_galerie
  });
});`
      },
      {
        nume: "views/pagini/index.ejs",
        lang: "html",
        cod: `<section id="galerie">
  <% imagini.forEach(function (img, i) { %>
    <figure class="<%= img.claseCSS %>">
      <img src="<%= cale_galerie %>/<%= img.cale_relativa %>"
           alt="<%= img.descriere %>">
      <figcaption>
        <%= String.fromCharCode(65 + i) %>)<%= img.descriere %>
      </figcaption>
    </figure>
  <% }); %>
</section>

<section id="contor-clase">
  <% Object.keys(contor).forEach(function (clasa) { %>
    <p><%= clasa %>: <%= contor[clasa] %></p>
  <% }); %>
</section>`
      }
    ],
    nota: "Contorul se face pe clasele deja transformate (cu _), ca să corespundă cu ce apare în atributul class."
  },
  {
    titlu: "Tastă apăsată + calcul pe elemente vizibile",
    cand: "Cerințele de tip „la apăsarea tastei w se scrie numărul de produse peste prețul mediu”.",
    tags: ["keydown", "vizibile", "offsetParent", "medie", "reduce", "parseFloat", "localStorage"],
    fisiere: [
      {
        nume: "views/pagini/produse.ejs — în HTML",
        lang: "html",
        cod: `<p id="prod-scumpe"></p>
<p id="nr-anterior"></p>`
      },
      {
        nume: "JavaScript",
        lang: "js",
        cod: `document.addEventListener("keydown", function (e) {
  if (e.key !== "w") return;

  const vizibile = Array.from(document.querySelectorAll(".produs"))
    .filter(function (p) {
      return p.offsetParent !== null;
    });

  const preturi = vizibile.map(function (p) {
    return parseFloat(p.dataset.pret);
  });

  if (preturi.length === 0) return;

  const medie = preturi.reduce(function (a, b) { return a + b; }, 0) / preturi.length;
  const cate = preturi.filter(function (pret) { return pret > medie; }).length;

  document.getElementById("prod-scumpe").textContent = cate;

  let nr = parseInt(localStorage.getItem("nrApasariW")) || 0;
  localStorage.setItem("nrApasariW", nr + 1);
});

window.addEventListener("load", function () {
  const nr = localStorage.getItem("nrApasariW");
  if (nr !== null) {
    document.getElementById("nr-anterior").textContent = "Nr anterior: " + nr;
  }
});`
      }
    ],
    nota: "Dacă produsele nu au data-pret, ia prețul din text: parseFloat(p.querySelector(\".pret\").textContent)."
  },
  {
    titlu: "Filtrare și sortare pe pagina de produse",
    cand: "Structura de bază pentru orice cerință de filtrare cu mai multe inputuri.",
    tags: ["filtrare", "sortare", "reset", "filter", "sort", "display", "onchange"],
    fisiere: [
      {
        nume: "JavaScript",
        lang: "js",
        cod: `const produse = Array.from(document.querySelectorAll(".produs"));

function filtreaza() {
  const nume = document.getElementById("f-nume").value.toLowerCase();
  const pretMax = parseFloat(document.getElementById("f-pret").value) || Infinity;

  const categorii = Array.from(
    document.querySelectorAll('input[name="categorie"]:checked')
  ).map(function (cb) { return cb.value; });

  produse.forEach(function (p) {
    const potrivit =
      p.dataset.nume.toLowerCase().includes(nume) &&
      parseFloat(p.dataset.pret) <= pretMax &&
      (categorii.length === 0 || categorii.includes(p.dataset.categorie));

    p.style.display = potrivit ? "" : "none";
  });
}

function sorteaza() {
  const cheie = document.getElementById("cheie").value;
  const semn = document.getElementById("directie").value === "asc" ? 1 : -1;
  const container = document.querySelector(".lista-produse");

  produse
    .slice()
    .sort(function (a, b) {
      const va = a.dataset[cheie];
      const vb = b.dataset[cheie];

      if (!isNaN(parseFloat(va))) return (parseFloat(va) - parseFloat(vb)) * semn;
      return va.localeCompare(vb) * semn;
    })
    .forEach(function (p) { container.appendChild(p); });
}

function reseteaza() {
  document.getElementById("f-nume").value = "";
  document.getElementById("f-pret").value = "";
  document.querySelectorAll('input[name="categorie"]').forEach(function (cb) {
    cb.checked = false;
  });
  produse.forEach(function (p) { p.style.display = ""; });
}

document.getElementById("btn-filtreaza").addEventListener("click", filtreaza);
document.getElementById("btn-sorteaza").addEventListener("click", sorteaza);
document.getElementById("btn-reset").addEventListener("click", reseteaza);`
      }
    ],
    nota: "appendChild pe un element deja existent îl MUTĂ, nu îl copiază. Așa se reordonează lista."
  },
  {
    titlu: "Temă light/dark cu variabile CSS",
    cand: "Butonul soare/lună care își ține minte alegerea pe tot site-ul.",
    tags: ["tema", "dark", "light", "variabile", "localStorage", "data-tema"],
    fisiere: [
      {
        nume: "CSS",
        lang: "css",
        cod: `:root {
  --fundal: #ffffff;
  --text: #14181f;
  --accent: #1f4788;
}

:root[data-tema="dark"] {
  --fundal: #14181f;
  --text: #eef0f3;
  --accent: #8fb3f0;
}

body {
  background: var(--fundal);
  color: var(--text);
}`
      },
      {
        nume: "JavaScript",
        lang: "js",
        cod: `const butonTema = document.getElementById("buton-tema");

function aplicaTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);
  butonTema.innerHTML = tema === "dark"
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

window.addEventListener("load", function () {
  aplicaTema(localStorage.getItem("tema") || "light");
});

butonTema.addEventListener("click", function () {
  const acum = document.documentElement.getAttribute("data-tema");
  const noua = acum === "dark" ? "light" : "dark";
  aplicaTema(noua);
  localStorage.setItem("tema", noua);
});`
      }
    ],
    nota: "Butonul trebuie să fie într-un fragment EJS inclus pe toate paginile, altfel tema nu se schimbă peste tot."
  },
  {
    titlu: "Meniu rearanjat în grid cu hover pe rânduri",
    cand: "Cerințele de meniu care cer un buton mare și restul pe două rânduri, fără să afecteze submeniurile.",
    tags: ["meniu", "grid", "hover", "submeniu", "nav", "grid-area"],
    fisiere: [
      {
        nume: "CSS",
        lang: "css",
        cod: `nav > ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav > ul > li:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }
nav > ul > li:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
nav > ul > li:nth-child(3) { grid-area: 1 / 3 / 2 / 4; }
nav > ul > li:nth-child(4) { grid-area: 2 / 2 / 3 / 3; }
nav > ul > li:nth-child(5) { grid-area: 2 / 3 / 3 / 4; }

nav > ul > li > a {
  display: block;
  height: 100%;
  text-align: center;
}

nav > ul > li:nth-child(1) > a {
  font-style: italic;
  text-decoration: underline;
  text-decoration-color: red;
}

nav > ul > li:nth-child(2):hover > a,
nav > ul > li:nth-child(3):hover > a {
  background: yellow;
}

nav > ul > li:nth-child(4):hover > a,
nav > ul > li:nth-child(5):hover > a {
  background: blue;
  color: white;
}`
      }
    ],
    nota: "Toți selectorii folosesc > (copil direct). Astfel linkurile din submeniuri, fiind mai adânc, nu sunt atinse."
  },
  {
    titlu: "Compilare automată SCSS la pornirea serverului",
    cand: "Cerința cu compileazaScss, backup și fs.watch.",
    tags: ["sass", "scss", "compileazaScss", "backup", "fs.watch", "obGlobal"],
    fisiere: [
      {
        nume: "index.js",
        lang: "js",
        cod: `const sass = require("sass");

obGlobal.folderScss = path.join(__dirname, "resurse", "scss");
obGlobal.folderCss = path.join(__dirname, "resurse", "css");
obGlobal.folderBackup = path.join(__dirname, "backup");

function compileazaScss(caleScss, caleCss) {
  if (!path.isAbsolute(caleScss)) {
    caleScss = path.join(obGlobal.folderScss, caleScss);
  }

  if (!caleCss) {
    caleCss = path.basename(caleScss).replace(".scss", ".css");
  }
  if (!path.isAbsolute(caleCss)) {
    caleCss = path.join(obGlobal.folderCss, caleCss);
  }

  const caleBackup = path.join(obGlobal.folderBackup, "resurse", "css");
  if (!fs.existsSync(caleBackup)) {
    fs.mkdirSync(caleBackup, { recursive: true });
  }

  if (fs.existsSync(caleCss)) {
    try {
      fs.copyFileSync(caleCss, path.join(caleBackup, path.basename(caleCss)));
    } catch (err) {
      console.log("Nu s-a putut face backup pentru " + caleCss + ": " + err.message);
    }
  }

  const rezultat = sass.compile(caleScss, { style: "expanded" });
  fs.writeFileSync(caleCss, rezultat.css);
}

fs.readdirSync(obGlobal.folderScss)
  .filter(function (f) { return f.endsWith(".scss"); })
  .forEach(function (f) { compileazaScss(f); });

fs.watch(obGlobal.folderScss, function (eveniment, numeFisier) {
  if (numeFisier && numeFisier.endsWith(".scss")) {
    compileazaScss(numeFisier);
  }
});`
      }
    ]
  },
  {
    titlu: "Sistem de erori cu JSON",
    cand: "Erorile 404, 403, 400 randate din același template.",
    tags: ["erori", "404", "403", "400", "erori.json", "afisareEroare", "obGlobal"],
    fisiere: [
      {
        nume: "index.js",
        lang: "js",
        cod: `var obGlobal = { obErori: null };

function initErori() {
  const cale = path.join(__dirname, "erori.json");
  obGlobal.obErori = JSON.parse(fs.readFileSync(cale, "utf8"));

  const caleBaza = obGlobal.obErori.cale_baza;

  obGlobal.obErori.eroare_default.imagine =
    path.join(caleBaza, obGlobal.obErori.eroare_default.imagine);

  obGlobal.obErori.info_erori.forEach(function (eroare) {
    eroare.imagine = path.join(caleBaza, eroare.imagine);
  });
}

function afisareEroare(res, identificator, titlu, text, imagine) {
  let eroare = obGlobal.obErori.info_erori.find(function (e) {
    return e.identificator === identificator;
  });

  if (!eroare) {
    eroare = obGlobal.obErori.eroare_default;
  }

  const status = eroare.status ? identificator : 200;

  res.status(status).render("pagini/eroare", {
    titlu: titlu || eroare.titlu,
    text: text || eroare.text,
    imagine: imagine || eroare.imagine
  });
}

initErori();`
      },
      {
        nume: "views/pagini/eroare.ejs",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1><%= titlu %></h1>
  <p><%= text %></p>
  <img src="<%= imagine %>" alt="<%= titlu %>">
</main>

<%- include("../fragmente/footer") %>`
      }
    ]
  },
  {
    titlu: "Temporizator cu ore, minute, secunde",
    cand: "Numărătoare inversă până la expirarea unei oferte.",
    tags: ["setInterval", "temporizator", "countdown", "ore", "minute", "secunde"],
    fisiere: [
      {
        nume: "JavaScript",
        lang: "js",
        cod: `const final = new Date("<%= oferta.data_finalizare %>");
const zona = document.getElementById("temporizator");

const cronometru = setInterval(function () {
  const diferenta = final - new Date();

  if (diferenta <= 0) {
    clearInterval(cronometru);
    zona.textContent = "Oferta a expirat";
    location.reload();
    return;
  }

  const ore = Math.floor(diferenta / 3600000);
  const minute = Math.floor((diferenta % 3600000) / 60000);
  const secunde = Math.floor((diferenta % 60000) / 1000);

  zona.textContent = ore + "h " + minute + "m " + secunde + "s";
  zona.classList.toggle("urgent", diferenta <= 10000);
}, 1000);`
      }
    ]
  }
];
