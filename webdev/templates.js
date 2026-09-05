const GRUPURI_TPL = [
  { id: "tabel", nume: "Tabele" },
  { id: "grid", nume: "Grid și layout" },
  { id: "ruta", nume: "Rute și pagini noi" },
  { id: "galerie", nume: "Galerie" },
  { id: "formular", nume: "Formulare și filtrare" },
  { id: "js", nume: "JavaScript în pagină" },
  { id: "css", nume: "Efecte CSS" },
  { id: "server", nume: "Server și fișiere" }
];

const TEMPLATES = [
  /* ============================ TABELE ============================ */
  {
    grup: "tabel",
    titlu: "Tabel complet scris de mână",
    cand: "Cerința cere thead, tbody, tfoot, caption, th, rowspan sau colspan.",
    tags: ["table", "thead", "tbody", "tfoot", "caption", "th", "rowspan", "colspan"],
    fisiere: [
      {
        nume: "views/pagini/index.ejs",
        explicatie: "Structura completă. Când o celulă are rowspan=\"2\", rândul următor are cu o celulă mai puțin.",
        lang: "html",
        cod: `<table>
  <caption>Program de lucru</caption>

  <thead>
    <tr>
      <th>Zi</th>
      <th>Deschidere</th>
      <th>Închidere</th>
      <th>Observații</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Luni</td>
      <td>08:00</td>
      <td>20:00</td>
      <td rowspan="2">program normal</td>
    </tr>
    <tr>
      <td>Marți</td>
      <td>08:00</td>
      <td>20:00</td>
    </tr>
    <tr>
      <td>Vineri</td>
      <td>08:00</td>
      <td>22:00</td>
      <td>program prelungit</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td colspan="4">Duminica închis</td>
    </tr>
  </tfoot>
</table>`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel generat dintr-un array de obiecte",
    cand: "Ai o listă de produse, erori sau utilizatori și fiecare obiect devine un rând.",
    tags: ["tabel", "forEach", "ejs", "generat", "tbody"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Trimiți array-ul în template.",
        lang: "js",
        cod: `app.get("/tabel", function (req, res) {
  res.render("pagini/tabel", { randuri: produse });
});`
      },
      {
        nume: "views/pagini/tabel.ejs",
        explicatie: "Antetul e fix, corpul se generează cu o buclă.",
        lang: "html",
        cod: `<table>
  <thead>
    <tr>
      <th>Nume</th>
      <th>Categorie</th>
      <th>Preț</th>
    </tr>
  </thead>
  <tbody>
    <% randuri.forEach(function (r) { %>
      <tr>
        <td><%= r.nume %></td>
        <td><%= r.categorie %></td>
        <td><%= r.pret %> lei</td>
      </tr>
    <% }); %>
  </tbody>
</table>`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel cu coloane generate automat din chei",
    cand: "Nu știi dinainte ce coloane are obiectul, sau vrei să meargă pentru orice set de date.",
    tags: ["tabel", "Object.keys", "coloane", "dinamic", "generat"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Iei numele coloanelor din primul obiect.",
        lang: "js",
        cod: `app.get("/tabel_auto", function (req, res) {
  const randuri = produse;
  const coloane = randuri.length > 0 ? Object.keys(randuri[0]) : [];

  res.render("pagini/tabel_auto", { randuri: randuri, coloane: coloane });
});`
      },
      {
        nume: "views/pagini/tabel_auto.ejs",
        explicatie: "Două bucle: una pentru antet, una imbricată pentru celule.",
        lang: "html",
        cod: `<table>
  <thead>
    <tr>
      <% coloane.forEach(function (c) { %>
        <th><%= c %></th>
      <% }); %>
    </tr>
  </thead>
  <tbody>
    <% randuri.forEach(function (r) { %>
      <tr>
        <% coloane.forEach(function (c) { %>
          <td><%= r[c] %></td>
        <% }); %>
      </tr>
    <% }); %>
  </tbody>
</table>`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel cu total calculat în tfoot",
    cand: "Cerința cere o linie de total, sumă sau medie la finalul tabelului.",
    tags: ["tabel", "tfoot", "total", "reduce", "suma", "toFixed"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Calculezi totalurile în rută, nu în template.",
        lang: "js",
        cod: `const total = produse.reduce(function (a, p) {
  return a + parseFloat(p.pret);
}, 0);

const medie = total / produse.length;

res.render("pagini/tabel", {
  produse: produse,
  total: total.toFixed(2),
  medie: medie.toFixed(2)
});`
      },
      {
        nume: "views/pagini/tabel.ejs",
        explicatie: "tfoot cu colspan, ca eticheta să ocupe mai multe coloane.",
        lang: "html",
        cod: `<tfoot>
  <tr>
    <td colspan="2">Total</td>
    <td><%= total %> lei</td>
  </tr>
  <tr>
    <td colspan="2">Preț mediu</td>
    <td><%= medie %> lei</td>
  </tr>
</tfoot>`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel cu rânduri filtrate după o condiție",
    cand: "Se afișează doar înregistrările care îndeplinesc ceva — de exemplu erorile cu status adevărat.",
    tags: ["tabel", "filter", "conditie", "status", "erori"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Filtrarea se face înainte de render, ca template-ul să rămână simplu.",
        lang: "js",
        cod: `const filtrate = date.info_erori.filter(function (e) {
  return e.status;
});

res.render("pagini/tabel", { randuri: filtrate });`
      },
      {
        nume: "views/pagini/tabel.ejs",
        explicatie: "Alternativ, filtrezi direct în template dacă nu vrei să atingi ruta.",
        lang: "html",
        cod: `<tbody>
  <% randuri.filter(function (e) { return e.status; }).forEach(function (e) { %>
    <tr>
      <td><%= e.titlu %></td>
      <td><%= e.text %></td>
    </tr>
  <% }); %>
</tbody>`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel zebră, cu hover și coloane alternante",
    cand: "Cerințele de stilizare a tabelului cu valori alternate.",
    tags: ["nth-child", "zebra", "hover", "tr", "td", "border-collapse"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "border-collapse lipește chenarele, altfel apar duble.",
        lang: "css",
        cod: `table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  text-align: left;
}`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "tr pentru rânduri alternante, td pentru coloane alternante.",
        lang: "css",
        cod: `tbody tr:nth-child(odd) { background: #f2f4f7; }

tbody td:nth-child(even) { background: rgba(0, 0, 0, 0.03); }

tbody tr:hover { background: #dde6f5; }`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel cu bară de scroll și antet fix",
    cand: "Tabel prea lung sau prea lat pentru ecran.",
    tags: ["overflow", "scroll", "sticky", "thead", "max-height"],
    fisiere: [
      {
        nume: "views/pagini/tabel.ejs",
        explicatie: "Tabelul se învelește într-un container care primește scroll-ul.",
        lang: "html",
        cod: `<div class="container-tabel">
  <table>
    <!-- tabelul -->
  </table>
</div>`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "position: sticky pe th ține antetul vizibil la derulare.",
        lang: "css",
        cod: `.container-tabel {
  max-height: 400px;
  overflow: auto;
}

.container-tabel thead th {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel responsive: fiecare rând devine un bloc pe mobil",
    cand: "Pe ecran mic tabelul nu încape, deci se transformă în cartonașe.",
    tags: ["responsive", "data-label", "media query", "before", "tabel"],
    fisiere: [
      {
        nume: "views/pagini/tabel.ejs",
        explicatie: "Fiecare celulă primește numele coloanei în data-label.",
        lang: "html",
        cod: `<tr>
  <td data-label="Nume"><%= p.nume %></td>
  <td data-label="Categorie"><%= p.categorie %></td>
  <td data-label="Preț"><%= p.pret %> lei</td>
</tr>`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "attr(data-label) scoate eticheta în fața valorii, ca să se înțeleagă ce e fiecare linie.",
        lang: "css",
        cod: `@media (max-width: 700px) {
  table, tbody, tr, td { display: block; width: 100%; }

  thead { display: none; }

  tr {
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  td {
    display: flex;
    justify-content: space-between;
    border: none;
    border-bottom: 1px solid #eee;
  }

  td::before {
    content: attr(data-label);
    font-weight: bold;
  }
}`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel transpus pe ecran mic",
    cand: "Coloanele devin rânduri la o anumită dimensiune de ecran.",
    tags: ["transpus", "grid", "display contents", "media query", "tabel"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "display: contents scoate elementul din layout dar îi păstrează copiii, așa că celulele ajung direct în grid.",
        lang: "css",
        cod: `@media (max-width: 700px) {
  table {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(4, auto);
    overflow-x: auto;
  }

  thead, tbody, tr { display: contents; }

  th, td {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
}`
      }
    ],
    nota: "repeat(4, auto) — 4 e numărul de coloane ale tabelului original, care devin rânduri."
  },
  {
    grup: "tabel",
    titlu: "Tabel sortabil la click pe antet",
    cand: "Utilizatorul apasă pe numele coloanei și tabelul se reordonează.",
    tags: ["sortare", "tabel", "click", "th", "appendChild", "localeCompare"],
    fisiere: [
      {
        nume: "views/pagini/tabel.ejs",
        explicatie: "Fiecare th primește indexul coloanei lui.",
        lang: "html",
        cod: `<thead>
  <tr>
    <th data-col="0">Nume</th>
    <th data-col="1">Categorie</th>
    <th data-col="2">Preț</th>
  </tr>
</thead>`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Sortezi rândurile și le re-adaugi în tbody. appendChild mută elementele existente, nu le copiază.",
        lang: "js",
        cod: `let directie = 1;

document.querySelectorAll("thead th").forEach(function (th) {
  th.addEventListener("click", function () {
    const col = parseInt(th.dataset.col);
    const corp = document.querySelector("tbody");
    const randuri = Array.from(corp.querySelectorAll("tr"));

    randuri.sort(function (a, b) {
      const va = a.children[col].textContent.trim();
      const vb = b.children[col].textContent.trim();

      const na = parseFloat(va);
      const nb = parseFloat(vb);

      if (!isNaN(na) && !isNaN(nb)) return (na - nb) * directie;
      return va.localeCompare(vb) * directie;
    });

    directie = -directie;
    randuri.forEach(function (r) { corp.appendChild(r); });
  });
});`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Celule colorate în funcție de valoare",
    cand: "Prețuri peste medie, stoc mic, valori marcate diferit.",
    tags: ["tabel", "conditie", "clasa", "marcaj", "stoc"],
    fisiere: [
      {
        nume: "views/pagini/tabel.ejs",
        explicatie: "Clasa se decide în EJS, în funcție de valoare.",
        lang: "html",
        cod: `<% produse.forEach(function (p) { %>
  <tr>
    <td><%= p.nume %></td>
    <td class="<%= p.stoc < 5 ? 'stoc-mic' : '' %>"><%= p.stoc %></td>
    <td class="<%= p.pret > medie ? 'scump' : 'ieftin' %>"><%= p.pret %> lei</td>
  </tr>
<% }); %>`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Stilurile corespunzătoare.",
        lang: "css",
        cod: `.stoc-mic { background: #ffe0e0; font-weight: bold; }
.scump    { color: #b0342a; }
.ieftin   { color: #1a6b45; }`
      }
    ]
  },
  {
    grup: "tabel",
    titlu: "Tabel construit din JavaScript client",
    cand: "Datele vin cu fetch și tabelul se generează în browser.",
    tags: ["fetch", "innerHTML", "map", "join", "tabel", "client"],
    fisiere: [
      {
        nume: "views/pagini/tabel.ejs",
        explicatie: "În pagină pui doar tabelul gol.",
        lang: "html",
        cod: `<table id="tabel-date">
  <thead>
    <tr><th>Nume</th><th>Preț</th></tr>
  </thead>
  <tbody></tbody>
</table>`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Construiești HTML-ul ca string și îl pui o singură dată — mai rapid decât createElement pentru fiecare celulă.",
        lang: "js",
        cod: `fetch("/resurse/json/produse.json")
  .then(function (r) { return r.json(); })
  .then(function (date) {
    const corp = document.querySelector("#tabel-date tbody");

    corp.innerHTML = date.produse.map(function (p) {
      return "<tr><td>" + p.nume + "</td><td>" + p.pret + " lei</td></tr>";
    }).join("");
  })
  .catch(function (err) { console.error(err); });`
      }
    ]
  },

  /* ============================ GRID ============================ */
  {
    grup: "grid",
    titlu: "Grid cu număr fix de coloane",
    cand: "Aranjezi elemente într-o rețea cu lățimi controlate.",
    tags: ["grid", "grid-template-columns", "fr", "gap"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "1fr împarte spațiul rămas în părți egale. auto ia doar cât are nevoie conținutul.",
        lang: "css",
        cod: `.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.container-mixt {
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 1rem;
}`
      }
    ]
  },
  {
    grup: "grid",
    titlu: "Grid care se adaptează singur, fără media query",
    cand: "Galerie sau listă de carduri care umple rândul, oricâte elemente ar fi.",
    tags: ["auto-fit", "auto-fill", "minmax", "responsive", "galerie"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Coloanele au minim 220px; câte încap pe rând, atâtea se fac.",
        lang: "css",
        cod: `.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}`
      }
    ],
    nota: "auto-fit strânge coloanele goale, auto-fill le păstrează. Pentru galerii, auto-fit e de obicei ce vrei."
  },
  {
    grup: "grid",
    titlu: "Element care ocupă mai multe celule",
    cand: "Un card mare printre altele mici, sau primul buton din meniu pe două rânduri.",
    tags: ["grid-row", "grid-column", "span", "grid-area"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "span 2 e relativ (ocupă două celule de unde e). Numerele sunt absolute (de la linia X la linia Y).",
        lang: "css",
        cod: `.card-mare {
  grid-column: span 2;
  grid-row: span 2;
}

.primul {
  grid-row: 1 / 3;
}

.explicit {
  grid-area: 1 / 1 / 3 / 2;
}`
      }
    ],
    nota: "grid-area: rând-start / coloană-start / rând-final / coloană-final. Liniile se numără de la 1."
  },
  {
    grup: "grid",
    titlu: "Layout de pagină cu zone denumite",
    cand: "Header, meniu, conținut, subsol aranjate clar și rearanjate pe mobil.",
    tags: ["grid-template-areas", "layout", "header", "footer", "aside"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Desenezi layout-ul în text. Fiecare cuvânt e o celulă.",
        lang: "css",
        cod: `body {
  display: grid;
  grid-template-areas:
    "antet    antet"
    "lateral  continut"
    "subsol   subsol";
  grid-template-columns: 250px 1fr;
  gap: 1rem;
}

header { grid-area: antet; }
aside  { grid-area: lateral; }
main   { grid-area: continut; }
footer { grid-area: subsol; }`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Pe mobil redesenezi harta, fără să atingi regulile elementelor.",
        lang: "css",
        cod: `@media (max-width: 800px) {
  body {
    grid-template-areas:
      "antet"
      "continut"
      "lateral"
      "subsol";
    grid-template-columns: 1fr;
  }
}`
      }
    ]
  },
  {
    grup: "grid",
    titlu: "Meniu rearanjat: buton mare plus două rânduri",
    cand: "Cerințele de meniu care cer o dispunere neobișnuită a butoanelor.",
    tags: ["meniu", "grid", "nav", "grid-area", "nth-child", "hover", "submeniu"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Meniul devine grid de 3 coloane și 2 rânduri.",
        lang: "css",
        cod: `nav > ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  list-style: none;
  margin: 0;
  padding: 0;
}`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Fiecare element primește poziția lui explicită.",
        lang: "css",
        cod: `nav > ul > li:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }
nav > ul > li:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
nav > ul > li:nth-child(3) { grid-area: 1 / 3 / 2 / 4; }
nav > ul > li:nth-child(4) { grid-area: 2 / 2 / 3 / 3; }
nav > ul > li:nth-child(5) { grid-area: 2 / 3 / 3 / 4; }

nav > ul > li > a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Hover diferit pe cele două rânduri. Semnul > face ca submeniurile să nu fie afectate.",
        lang: "css",
        cod: `nav > ul > li:nth-child(2):hover > a,
nav > ul > li:nth-child(3):hover > a { background: yellow; }

nav > ul > li:nth-child(4):hover > a,
nav > ul > li:nth-child(5):hover > a { background: blue; color: white; }`
      }
    ]
  },
  {
    grup: "grid",
    titlu: "Spațiere care scade pe ecrane mici",
    cand: "Cerința care cere gap și padding mai mici pe mediu și minime pe mic.",
    tags: ["gap", "variabile", "media query", "padding", "spatiere"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "O singură variabilă, redefinită în media query — se schimbă peste tot unde e folosită.",
        lang: "css",
        cod: `:root {
  --spatiere: 2rem;
}

body {
  padding-left: var(--spatiere);
  padding-right: var(--spatiere);
}

.grila {
  display: grid;
  gap: var(--spatiere);
}

@media (max-width: 1024px) {
  :root { --spatiere: 1rem; }
}

@media (max-width: 600px) {
  :root { --spatiere: 0.5rem; }
}`
      }
    ]
  },
  {
    grup: "grid",
    titlu: "Ordine diferită pe mobil",
    cand: "Pe desktop bara laterală e prima, pe mobil trebuie să ajungă ultima.",
    tags: ["order", "flex", "responsive", "reordonare"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "order schimbă doar ordinea vizuală, nu și cea din HTML.",
        lang: "css",
        cod: `.pagina {
  display: flex;
  flex-direction: column;
}

@media (max-width: 800px) {
  main  { order: 1; }
  nav   { order: 2; }
  aside { order: 3; }
}`
      }
    ]
  },
  {
    grup: "grid",
    titlu: "Flexbox: bară cu elemente la capete",
    cand: "Logo în stânga, butoane în dreapta, totul centrat vertical.",
    tags: ["flex", "justify-content", "align-items", "space-between", "gap"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "space-between împinge primul element la stânga și ultimul la dreapta.",
        lang: "css",
        cod: `.bara {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.bara .cautare { flex: 1; }
.bara .buton   { flex: 0 0 auto; }`
      }
    ]
  },

  /* ============================ RUTE ============================ */
  {
    grup: "ruta",
    titlu: "Pagină nouă la o adresă fixă",
    cand: "Cerința: „creați o pagină accesibilă cu localhost:8080/ceva”.",
    tags: ["ruta", "app.get", "render", "pagina noua", "include"],
    fisiere: [
      {
        nume: "index.js — ÎNAINTE de app.get(\"/*\")",
        explicatie: "Ruta. Dacă o pui după ruta generală, primești 404.",
        lang: "js",
        cod: `app.get("/despre_noi", function (req, res) {
  res.render("pagini/despre_noi", { titlu: "Despre noi" });
});`
      },
      {
        nume: "views/pagini/despre_noi.ejs — fișier nou",
        explicatie: "Cele două include păstrează meniul și subsolul identice cu restul site-ului.",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1><%= titlu %></h1>
  <p>Conținut.</p>
</main>

<%- include("../fragmente/footer") %>`
      }
    ]
  },
  {
    grup: "ruta",
    titlu: "Rută cu parametri în cale",
    cand: "Adrese de forma /prajitura/30/100 sau /produs/5.",
    tags: ["req.params", "parametri", "ruta", "parseFloat", "filtrare"],
    fisiere: [
      {
        nume: "index.js — ÎNAINTE de app.get(\"/*\")",
        explicatie: "req.params dă mereu string-uri, deci parseFloat înainte de orice comparație numerică.",
        lang: "js",
        cod: `app.get("/prajitura/:pret1/:pret2", function (req, res) {
  const pret1 = parseFloat(req.params.pret1);
  const pret2 = parseFloat(req.params.pret2);

  const filtrate = produse.filter(function (p) {
    return p.pret >= pret1 && p.pret <= pret2;
  });

  res.render("pagini/prajitura", {
    produse: filtrate,
    pret1: pret1,
    pret2: pret2
  });
});`
      },
      {
        nume: "views/pagini/prajitura.ejs — fișier nou",
        explicatie: "Template-ul primește produsele deja filtrate.",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Între <%= pret1 %> și <%= pret2 %> lei</h1>

  <% produse.forEach(function (p) { %>
    <p class="produs"><b><%= p.nume %></b> — <%= p.pret %> lei</p>
  <% }); %>
</main>

<%- include("../fragmente/footer") %>`
      }
    ]
  },
  {
    grup: "ruta",
    titlu: "Rută cu query string",
    cand: "Adrese de tipul /produse?min=10&max=50, unde parametrii sunt opționali.",
    tags: ["req.query", "query string", "optional", "Infinity"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "|| 0 și || Infinity acoperă cazul în care parametrul lipsește.",
        lang: "js",
        cod: `app.get("/produse", function (req, res) {
  const min = parseFloat(req.query.min) || 0;
  const max = parseFloat(req.query.max) || Infinity;
  const cat = req.query.categorie;

  let filtrate = produse.filter(function (p) {
    return p.pret >= min && p.pret <= max;
  });

  if (cat) {
    filtrate = filtrate.filter(function (p) {
      return p.categorie === cat;
    });
  }

  res.render("pagini/produse", { produse: filtrate });
});`
      }
    ]
  },
  {
    grup: "ruta",
    titlu: "Rută care citește un fișier JSON",
    cand: "Datele vin dintr-un JSON, nu din baza de date.",
    tags: ["fs", "readFileSync", "JSON.parse", "path.join", "json"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "path.join merge și pe Windows, și pe Mac — spre deosebire de concatenarea cu /.",
        lang: "js",
        cod: `const fs = require("fs");
const path = require("path");

app.get("/date", function (req, res) {
  const cale = path.join(__dirname, "resurse", "json", "date.json");

  try {
    const date = JSON.parse(fs.readFileSync(cale, "utf8"));
    res.render("pagini/date", { date: date });
  } catch (err) {
    console.log("Nu s-a putut citi " + cale + ": " + err.message);
    afisareEroare(res, 2);
  }
});`
      }
    ]
  },
  {
    grup: "ruta",
    titlu: "Rută care interoghează baza de date",
    cand: "Produsele, utilizatorii sau comenzile vin din Postgres.",
    tags: ["client.query", "postgres", "rows", "select", "callback"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Rezultatele sunt în rezultat.rows, nu direct în rezultat.",
        lang: "js",
        cod: `app.get("/produse", function (req, res) {
  client.query("SELECT * FROM produse", function (err, rezultat) {
    if (err) {
      console.log(err);
      afisareEroare(res, 2);
      return;
    }

    res.render("pagini/produse", { produse: rezultat.rows });
  });
});`
      },
      {
        nume: "index.js",
        explicatie: "Cu parametri: $1 se înlocuiește cu prima valoare din vector.",
        lang: "js",
        cod: `client.query(
  "SELECT * FROM produse WHERE categorie = $1 AND pret < $2",
  [req.params.categorie, 100],
  function (err, rezultat) {
    if (err) { afisareEroare(res, 2); return; }
    res.render("pagini/produse", { produse: rezultat.rows });
  }
);`
      }
    ]
  },
  {
    grup: "ruta",
    titlu: "Rută care răspunde cu JSON",
    cand: "Partea de server pentru un apel fetch din pagină.",
    tags: ["res.json", "api", "fetch", "server"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "res.json trimite date, nu o pagină. Nu se folosește render.",
        lang: "js",
        cod: `app.get("/api/produse", function (req, res) {
  client.query("SELECT * FROM produse", function (err, rezultat) {
    if (err) {
      res.status(500).json({ eroare: "Eroare la baza de date" });
      return;
    }

    res.json({ produse: rezultat.rows });
  });
});`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Apelul din pagină.",
        lang: "js",
        cod: `fetch("/api/produse")
  .then(function (r) { return r.json(); })
  .then(function (date) { console.log(date.produse); });`
      }
    ]
  },
  {
    grup: "ruta",
    titlu: "Formular trimis către server",
    cand: "Filtrare pe server, înregistrare, orice trimitere de date prin POST.",
    tags: ["post", "req.body", "formular", "urlencoded", "action"],
    fisiere: [
      {
        nume: "index.js — o singură dată, lângă celelalte app.use",
        explicatie: "Fără această linie, req.body e undefined.",
        lang: "js",
        cod: `app.use(express.urlencoded({ extended: true }));`
      },
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Atributul name al fiecărui input devine cheia din req.body.",
        lang: "html",
        cod: `<form action="/filtreaza" method="post">
  <input type="number" name="min" placeholder="Preț minim">
  <input type="number" name="max" placeholder="Preț maxim">
  <button type="submit">Filtrează</button>
</form>`
      },
      {
        nume: "index.js",
        explicatie: "Ruta care primește datele. Atenție: app.post, nu app.get.",
        lang: "js",
        cod: `app.post("/filtreaza", function (req, res) {
  const min = parseFloat(req.body.min) || 0;
  const max = parseFloat(req.body.max) || Infinity;

  const filtrate = produse.filter(function (p) {
    return p.pret >= min && p.pret <= max;
  });

  res.render("pagini/produse", { produse: filtrate });
});`
      }
    ]
  },
  {
    grup: "ruta",
    titlu: "Aceeași pagină la mai multe adrese",
    cand: "Prima pagină accesibilă cu /, /index și /home.",
    tags: ["vector", "app.get", "index", "home", "alias"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Un vector de căi în loc de un singur string.",
        lang: "js",
        cod: `app.get(["/", "/index", "/home"], function (req, res) {
  res.render("pagini/index");
});`
      }
    ]
  },
  {
    grup: "ruta",
    titlu: "Ruta generală și pagina de eroare",
    cand: "Ultima rută din fișier, care prinde tot ce n-a fost tratat mai sus.",
    tags: ["/*", "404", "callback", "render", "eroare", "ordine"],
    fisiere: [
      {
        nume: "index.js — ULTIMUL app.get din fișier",
        explicatie: "Callback-ul din render prinde eroarea. Mesajul „Failed to lookup view” înseamnă că pagina nu există.",
        lang: "js",
        cod: `app.get("/*", function (req, res) {
  try {
    res.render("pagini" + req.url, function (err, rezultat) {
      if (err) {
        if (err.message.startsWith("Failed to lookup view")) {
          afisareEroare(res, 404);
        } else {
          afisareEroare(res, 0);
        }
      } else {
        res.send(rezultat);
      }
    });
  } catch (err) {
    afisareEroare(res, 0);
  }
});`
      }
    ]
  },

  /* ============================ GALERIE ============================ */
  {
    grup: "galerie",
    titlu: "Galerie simplă din JSON",
    cand: "Structura de bază peste care se adaugă orice cerință de filtrare.",
    tags: ["galerie", "json", "figure", "figcaption", "forEach"],
    fisiere: [
      {
        nume: "index.js — la pornirea serverului",
        explicatie: "Încarci JSON-ul o dată în memorie, ca să nu-l citești la fiecare cerere.",
        lang: "js",
        cod: `function initGalerie() {
  const cale = path.join(__dirname, "resurse", "json", "galerie.json");
  obGlobal.obImagini = JSON.parse(fs.readFileSync(cale, "utf8"));
}

initGalerie();`
      },
      {
        nume: "index.js — în ruta primei pagini",
        explicatie: "Trimiți imaginile și calea de bază.",
        lang: "js",
        cod: `res.render("pagini/index", {
  imagini: obGlobal.obImagini.imagini,
  cale_galerie: obGlobal.obImagini.cale_galerie
});`
      },
      {
        nume: "views/pagini/index.ejs",
        explicatie: "Bucla care generează figurile.",
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
    ]
  },
  {
    grup: "galerie",
    titlu: "Galerie filtrată după momentul curent",
    cand: "Cerințele cu perioade_ore, zile ale săptămânii sau intervale orare.",
    tags: ["perioade_ore", "getMinutes", "filter", "mereu", "galerie"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Funcția de decizie, scrisă separat ca să fie ușor de modificat dacă enunțul cere alte intervale.",
        lang: "js",
        cod: `function seAfiseaza(imagine) {
  if (!imagine.perioade_ore) return false;
  if (imagine.perioade_ore.includes("mereu")) return true;

  const minut = new Date().getMinutes();
  const perioada = minut < 20 ? "inceput" : minut < 40 ? "mijloc" : "final";

  return imagine.perioade_ore.includes(perioada);
}`
      },
      {
        nume: "index.js — în rută",
        explicatie: "Filtrarea la fiecare cerere, ca să reflecte ora curentă.",
        lang: "js",
        cod: `res.render("pagini/index", {
  imagini: obGlobal.obImagini.imagini.filter(seAfiseaza),
  cale_galerie: obGlobal.obImagini.cale_galerie
});`
      }
    ]
  },
  {
    grup: "galerie",
    titlu: "Clase din JSON plus numărătoare",
    cand: "Cerința cu proprietatea „clase” și contorul de sub galerie.",
    tags: ["clase", "class", "contor", "split", "replace", "Object.keys"],
    fisiere: [
      {
        nume: "index.js — în rută",
        explicatie: "Transformi lista de clase și numeri în același timp.",
        lang: "js",
        cod: `const imagini = obGlobal.obImagini.imagini;
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
});`
      },
      {
        nume: "views/pagini/index.ejs",
        explicatie: "Clasele ajung în atribut, contorul se afișează sub galerie.",
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
  <% Object.keys(contor).forEach(function (c) { %>
    <p><%= c %>: <%= contor[c] %></p>
  <% }); %>
</section>`
      }
    ]
  },
  {
    grup: "galerie",
    titlu: "Galerie cu lightbox la click",
    cand: "Imaginea se deschide mare peste pagină, cu fundal întunecat.",
    tags: ["lightbox", "modal", "click", "galerie", "fixed", "delegare"],
    fisiere: [
      {
        nume: "views/pagini/index.ejs",
        explicatie: "Containerul care apare peste pagină.",
        lang: "html",
        cod: `<div id="lightbox" class="ascuns">
  <img id="lightbox-img" src="" alt="">
</div>`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "position: fixed cu inset: 0 acoperă tot ecranul.",
        lang: "css",
        cod: `#lightbox {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  z-index: 100;
  cursor: pointer;
}

#lightbox.ascuns { display: none; }

#lightbox img {
  max-width: 90vw;
  max-height: 90vh;
}`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Un singur listener pe galerie, cu delegare — merge și dacă imaginile se generează dinamic.",
        lang: "js",
        cod: `const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.getElementById("galerie").addEventListener("click", function (e) {
  const img = e.target.closest("img");
  if (!img) return;

  lightboxImg.src = img.src;
  lightbox.classList.remove("ascuns");
});

lightbox.addEventListener("click", function () {
  lightbox.classList.add("ascuns");
});`
      }
    ]
  },

  /* ============================ FORMULARE ============================ */
  {
    grup: "formular",
    titlu: "Set complet de filtre cu buton și reset",
    cand: "Pagina de produse cu mai multe filtre care lucrează împreună.",
    tags: ["filtrare", "reset", "checkbox", "range", "text", "display"],
    fisiere: [
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Inputurile. Fiecare produs are datele în atribute data-*, ca să fie ușor de citit din JavaScript.",
        lang: "html",
        cod: `<fieldset>
  <input type="text" id="f-nume" placeholder="Caută după nume">
  <input type="range" id="f-pret" min="0" max="200" value="200">
  <span id="val-pret">200</span> lei

  <label><input type="checkbox" name="categorie" value="torturi"> Torturi</label>
  <label><input type="checkbox" name="categorie" value="pateuri"> Pateuri</label>

  <button type="button" id="btn-filtreaza">Filtrează</button>
  <button type="button" id="btn-reset">Resetează</button>
</fieldset>

<div class="lista-produse">
  <% produse.forEach(function (p) { %>
    <div class="produs"
         data-id="<%= p.id %>"
         data-nume="<%= p.nume %>"
         data-pret="<%= p.pret %>"
         data-categorie="<%= p.categorie %>">
      <b><%= p.nume %></b> — <%= p.pret %> lei
    </div>
  <% }); %>
</div>`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "O singură funcție care verifică toate condițiile deodată.",
        lang: "js",
        cod: `function filtreaza() {
  const nume = document.getElementById("f-nume").value.toLowerCase();
  const pretMax = parseFloat(document.getElementById("f-pret").value);

  const categorii = Array.from(
    document.querySelectorAll('input[name="categorie"]:checked')
  ).map(function (cb) { return cb.value; });

  document.querySelectorAll(".produs").forEach(function (p) {
    const potrivit =
      p.dataset.nume.toLowerCase().includes(nume) &&
      parseFloat(p.dataset.pret) <= pretMax &&
      (categorii.length === 0 || categorii.includes(p.dataset.categorie));

    p.style.display = potrivit ? "" : "none";
  });
}

document.getElementById("btn-filtreaza").addEventListener("click", filtreaza);`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Resetarea aduce inputurile la starea inițială și reafișează tot.",
        lang: "js",
        cod: `document.getElementById("btn-reset").addEventListener("click", function () {
  document.getElementById("f-nume").value = "";
  document.getElementById("f-pret").value = 200;
  document.getElementById("val-pret").textContent = 200;

  document.querySelectorAll('input[name="categorie"]').forEach(function (cb) {
    cb.checked = false;
  });

  document.querySelectorAll(".produs").forEach(function (p) {
    p.style.display = "";
  });
});`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Filtrare imediată la schimbare, dacă cerința cere onchange în loc de buton.",
        lang: "js",
        cod: `document.getElementById("f-nume").addEventListener("input", filtreaza);

document.getElementById("f-pret").addEventListener("input", function () {
  document.getElementById("val-pret").textContent = this.value;
  filtreaza();
});

document.querySelectorAll('input[name="categorie"]').forEach(function (cb) {
  cb.addEventListener("change", filtreaza);
});`
      }
    ]
  },
  {
    grup: "formular",
    titlu: "Grup de radio buttons cu filtrare",
    cand: "Trei opțiuni care se exclud reciproc și un buton de aplicare.",
    tags: ["radio", "name", "checked", "label", "filtrare", "fieldset"],
    fisiere: [
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Același name pe toate = se exclud reciproc. for din label trebuie egal cu id-ul inputului.",
        lang: "html",
        cod: `<fieldset>
  <legend>Filtrează</legend>

  <input type="radio" name="filtru" id="f-tot" value="tot" checked>
  <label for="f-tot">tot</label>

  <input type="radio" name="filtru" id="f-a" value="a">
  <label for="f-a">pentru diabetici</label>

  <input type="radio" name="filtru" id="f-b" value="b">
  <label for="f-b">pentru non-diabetici</label>

  <button type="button" id="afiseaza">Afișează</button>
</fieldset>`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Citești opțiunea bifată cu :checked.",
        lang: "js",
        cod: `document.getElementById("afiseaza").addEventListener("click", function () {
  const ales = document.querySelector('input[name="filtru"]:checked').value;

  document.querySelectorAll(".produs").forEach(function (p) {
    const are = p.classList.contains("diabetic");
    let arata = true;

    if (ales === "a") arata = are;
    if (ales === "b") arata = !are;

    p.style.display = arata ? "" : "none";
  });
});`
      }
    ]
  },
  {
    grup: "formular",
    titlu: "Inputuri cu valori generate din date",
    cand: "min și max ale unui range luate din prețurile reale, select generat din categorii.",
    tags: ["range", "min", "max", "select", "generat", "ejs"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Calculezi limitele și lista de categorii în rută.",
        lang: "js",
        cod: `const preturi = produse.map(function (p) { return parseFloat(p.pret); });

const categorii = [];
produse.forEach(function (p) {
  if (!categorii.includes(p.categorie)) categorii.push(p.categorie);
});

res.render("pagini/produse", {
  produse: produse,
  pretMin: Math.min(...preturi),
  pretMax: Math.max(...preturi),
  categorii: categorii
});`
      },
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Atributele vin din date, nu sunt scrise manual.",
        lang: "html",
        cod: `<input type="range" id="f-pret"
       min="<%= pretMin %>"
       max="<%= pretMax %>"
       value="<%= pretMax %>">

<select id="f-categorie">
  <option value="">toate</option>
  <% categorii.forEach(function (c) { %>
    <option value="<%= c %>"><%= c %></option>
  <% }); %>
</select>`
      }
    ]
  },
  {
    grup: "formular",
    titlu: "Filtre salvate în localStorage",
    cand: "La revenirea pe pagină, filtrele sunt cum le-ai lăsat.",
    tags: ["localStorage", "filtre", "persistent", "load", "JSON.stringify"],
    fisiere: [
      {
        nume: "resurse/js/script.js",
        explicatie: "Aduni valorile într-un obiect și îl salvezi ca text.",
        lang: "js",
        cod: `function salveazaFiltre() {
  const filtre = {
    nume: document.getElementById("f-nume").value,
    pret: document.getElementById("f-pret").value,
    categorii: Array.from(
      document.querySelectorAll('input[name="categorie"]:checked')
    ).map(function (cb) { return cb.value; })
  };

  localStorage.setItem("filtre", JSON.stringify(filtre));
}`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "La încărcare pui valorile înapoi în inputuri și reaplici filtrarea.",
        lang: "js",
        cod: `window.addEventListener("load", function () {
  const salvat = localStorage.getItem("filtre");
  if (!salvat) return;

  const filtre = JSON.parse(salvat);

  document.getElementById("f-nume").value = filtre.nume;
  document.getElementById("f-pret").value = filtre.pret;

  document.querySelectorAll('input[name="categorie"]').forEach(function (cb) {
    cb.checked = filtre.categorii.includes(cb.value);
  });

  filtreaza();
});`
      }
    ]
  },
  {
    grup: "formular",
    titlu: "Inputuri stilizate cu Bootstrap",
    cand: "Cerința care cere butoane cu iconuri, toggle buttons, floating label, grid de inputuri.",
    tags: ["bootstrap", "btn", "btn-check", "form-floating", "row", "col", "icon"],
    fisiere: [
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Buton cu iconiță; pe mobil rămâne doar iconița.",
        lang: "html",
        cod: `<button class="btn btn-primary">
  <i class="bi bi-funnel"></i>
  <span class="d-none d-md-inline">Filtrează</span>
</button>`
      },
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Toggle buttons: Bootstrap face singur trecerea outline → plin la bifare.",
        lang: "html",
        cod: `<input type="checkbox" class="btn-check" id="cat-torturi" autocomplete="off">
<label class="btn btn-outline-primary" for="cat-torturi">Torturi</label>

<input type="checkbox" class="btn-check" id="cat-pateuri" autocomplete="off">
<label class="btn btn-outline-primary" for="cat-pateuri">Pateuri</label>`
      },
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Floating label. placeholder e obligatoriu, chiar dacă nu se vede.",
        lang: "html",
        cod: `<div class="form-floating">
  <textarea class="form-control" id="comentariu" placeholder="Comentariu"></textarea>
  <label for="comentariu">Comentariu</label>
</div>`
      },
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Grid Bootstrap: cele 12 coloane se împart pe rând.",
        lang: "html",
        cod: `<div class="row g-3">
  <div class="col-12 col-md-6 col-lg-4">
    <input type="text" class="form-control" placeholder="Nume">
  </div>
  <div class="col-12 col-md-6 col-lg-4">
    <input type="number" class="form-control" placeholder="Preț maxim">
  </div>
  <div class="col-12 col-lg-4">
    <button class="btn btn-primary w-100">Filtrează</button>
  </div>
</div>`
      }
    ]
  },

  /* ============================ JAVASCRIPT ============================ */
  {
    grup: "js",
    titlu: "Tastă apăsată plus calcul pe elementele vizibile",
    cand: "Cerințele de tip „la apăsarea tastei X se scrie undeva un număr calculat”.",
    tags: ["keydown", "offsetParent", "vizibil", "medie", "reduce", "parseFloat"],
    fisiere: [
      {
        nume: "views/pagini/produse.ejs",
        explicatie: "Paragraful în care se scrie rezultatul.",
        lang: "html",
        cod: `<p id="prod-scumpe"></p>`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "offsetParent e null exact când elementul are display: none, deci exclude ce a fost ascuns prin filtrare.",
        lang: "js",
        cod: `document.addEventListener("keydown", function (e) {
  if (e.key !== "w") return;

  const vizibile = Array.from(document.querySelectorAll(".produs"))
    .filter(function (p) { return p.offsetParent !== null; });

  const preturi = vizibile.map(function (p) {
    return parseFloat(p.dataset.pret);
  });

  if (preturi.length === 0) return;

  const medie = preturi.reduce(function (a, b) { return a + b; }, 0) / preturi.length;
  const cate = preturi.filter(function (x) { return x > medie; }).length;

  document.getElementById("prod-scumpe").textContent = cate;
});`
      }
    ]
  },
  {
    grup: "js",
    titlu: "Contor în localStorage afișat doar la reîncărcare",
    cand: "Cerința care spune explicit că numărul nu se actualizează dinamic.",
    tags: ["localStorage", "contor", "load", "parseInt", "anterior"],
    fisiere: [
      {
        nume: "resurse/js/script.js",
        explicatie: "La eveniment doar SCRII. Dacă ai citi și afișa aici, s-ar actualiza în timp real.",
        lang: "js",
        cod: `document.addEventListener("keydown", function (e) {
  if (e.key !== "w") return;

  let nr = parseInt(localStorage.getItem("nrApasariW")) || 0;
  localStorage.setItem("nrApasariW", nr + 1);
});`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Citirea o singură dată, la încărcare.",
        lang: "js",
        cod: `window.addEventListener("load", function () {
  const nr = localStorage.getItem("nrApasariW");

  if (nr !== null) {
    document.getElementById("nr-anterior").textContent = "Nr anterior: " + nr;
  }
});`
      }
    ]
  },
  {
    grup: "js",
    titlu: "Valoare reținută între vizite",
    cand: "Ultimul interval, ultima sortare, ultima opțiune aleasă.",
    tags: ["localStorage", "JSON.stringify", "JSON.parse", "anterior", "ordine"],
    fisiere: [
      {
        nume: "views/pagini/prajitura.ejs — în <script> la final",
        explicatie: "Ordinea contează: întâi citești valoarea veche, apoi o scrii pe cea nouă.",
        lang: "js",
        cod: `window.addEventListener("load", function () {
  const anterior = localStorage.getItem("interval");

  if (anterior) {
    const val = JSON.parse(anterior);
    document.getElementById("anterior").textContent =
      "intervalul anterior de preturi: [" + val[0] + ", " + val[1] + "]";
  }

  localStorage.setItem("interval", JSON.stringify([<%= pret1 %>, <%= pret2 %>]));
});`
      }
    ],
    nota: "Codul cu <%= %> trebuie să fie într-un <script> dintr-un fișier .ejs. Într-un .js separat, EJS nu se interpretează."
  },
  {
    grup: "js",
    titlu: "Temă light/dark salvată",
    cand: "Butonul soare/lună care își ține minte alegerea pe tot site-ul.",
    tags: ["tema", "dark", "light", "localStorage", "data-tema", "variabile"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Toate culorile trec prin variabile, ca schimbarea să fie un singur atribut.",
        lang: "css",
        cod: `:root {
  --fundal: #ffffff;
  --text: #14181f;
}

:root[data-tema="dark"] {
  --fundal: #14181f;
  --text: #eef0f3;
}

body {
  background: var(--fundal);
  color: var(--text);
}`
      },
      {
        nume: "views/fragmente/header.ejs",
        explicatie: "Butonul trebuie să fie într-un fragment, ca să apară pe toate paginile.",
        lang: "html",
        cod: `<button type="button" id="buton-tema">
  <i class="fa-solid fa-moon"></i>
</button>`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Aplici tema la încărcare și o comuți la click.",
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
    ]
  },
  {
    grup: "js",
    titlu: "Temporizator cu ore, minute, secunde",
    cand: "Numărătoare inversă până la expirarea unei oferte.",
    tags: ["setInterval", "countdown", "clearInterval", "ore", "minute", "secunde"],
    fisiere: [
      {
        nume: "views/pagini/index.ejs — în <script>",
        explicatie: "Scăderea a două date dă milisecunde. 3600000 ms e o oră.",
        lang: "js",
        cod: `const final = new Date("<%= oferta.data_finalizare %>");
const zona = document.getElementById("temporizator");

const cronometru = setInterval(function () {
  const diferenta = final - new Date();

  if (diferenta <= 0) {
    clearInterval(cronometru);
    zona.textContent = "Oferta a expirat";
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
  },
  {
    grup: "js",
    titlu: "Mesaj temporar cu poziție fixă",
    cand: "Anunț care apare câteva secunde și dispare singur.",
    tags: ["setTimeout", "fixed", "mesaj", "temporar", "classList"],
    fisiere: [
      {
        nume: "views/fragmente/footer.ejs",
        explicatie: "Elementul, ascuns inițial.",
        lang: "html",
        cod: `<div id="mesaj" class="ascuns">Au survenit modificări pe site.</div>`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Poziție fixă, ca să rămână pe ecran la derulare.",
        lang: "css",
        cod: `#mesaj {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem 1rem;
  background: #1f4788;
  color: white;
  border-radius: 6px;
  z-index: 100;
}

#mesaj.ascuns { display: none; }`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Îl arăți și îl ascunzi după 3 secunde.",
        lang: "js",
        cod: `window.addEventListener("load", function () {
  const mesaj = document.getElementById("mesaj");
  mesaj.classList.remove("ascuns");

  setTimeout(function () {
    mesaj.classList.add("ascuns");
  }, 3000);
});`
      }
    ]
  },
  {
    grup: "js",
    titlu: "Sortare și reordonare în pagină",
    cand: "Butoane care reordonează produsele deja afișate.",
    tags: ["sort", "appendChild", "sortare", "localeCompare", "directie"],
    fisiere: [
      {
        nume: "resurse/js/script.js",
        explicatie: "appendChild pe un element existent îl mută la sfârșit. Parcurgând lista sortată, ordinea din pagină devine cea dorită.",
        lang: "js",
        cod: `function sorteaza(cheie, directie) {
  const container = document.querySelector(".lista-produse");
  const semn = directie === "asc" ? 1 : -1;

  Array.from(document.querySelectorAll(".produs"))
    .sort(function (a, b) {
      const va = a.dataset[cheie];
      const vb = b.dataset[cheie];

      if (!isNaN(parseFloat(va))) {
        return (parseFloat(va) - parseFloat(vb)) * semn;
      }
      return va.localeCompare(vb) * semn;
    })
    .forEach(function (p) { container.appendChild(p); });
}`
      },
      {
        nume: "resurse/js/script.js",
        explicatie: "Sortare după două chei: dacă prima comparație dă 0, treci la a doua.",
        lang: "js",
        cod: `function sorteazaDupaDoua(cheie1, cheie2, directie) {
  const container = document.querySelector(".lista-produse");
  const semn = directie === "asc" ? 1 : -1;

  Array.from(document.querySelectorAll(".produs"))
    .sort(function (a, b) {
      const dif = a.dataset[cheie1].localeCompare(b.dataset[cheie1]);
      if (dif !== 0) return dif * semn;

      return (parseFloat(a.dataset[cheie2]) - parseFloat(b.dataset[cheie2])) * semn;
    })
    .forEach(function (p) { container.appendChild(p); });
}`
      }
    ]
  },

  /* ============================ CSS ============================ */
  {
    grup: "css",
    titlu: "Stil de printare",
    cand: "Cerința de print: se ascunde meniul, se arată adresele linkurilor.",
    tags: ["print", "media print", "attr", "page-break", "printare"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "attr(href) scoate adresa în text, ca să fie utilă pe hârtie.",
        lang: "css",
        cod: `@media print {
  nav, footer, .buton, video, iframe { display: none; }

  body {
    color: black;
    background: white;
    font-size: 12pt;
  }

  a::after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    color: #444;
  }

  h1, h2 { page-break-after: avoid; }
  table, figure { page-break-inside: avoid; }
}`
      }
    ]
  },
  {
    grup: "css",
    titlu: "Meniu hamburger fără JavaScript",
    cand: "Meniul devine iconiță sub o anumită lățime.",
    tags: ["hamburger", "checkbox", "media query", "meniu", "toggle"],
    fisiere: [
      {
        nume: "views/fragmente/header.ejs",
        explicatie: "Checkbox-ul ascuns ține starea, label-ul e iconița pe care se apasă.",
        lang: "html",
        cod: `<input type="checkbox" id="toggle-meniu">
<label for="toggle-meniu" class="icon-hamburger">
  <span class="bara"></span>
  <span class="bara"></span>
  <span class="bara"></span>
</label>

<nav>
  <ul>
    <li><a href="/">Acasă</a></li>
    <li><a href="/produse">Produse</a></li>
  </ul>
</nav>`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Barele desenate din span-uri, poziționate absolut în container.",
        lang: "css",
        cod: `#toggle-meniu { display: none; }

.icon-hamburger {
  display: none;
  position: relative;
  width: 30px;
  height: 24px;
  cursor: pointer;
}

.icon-hamburger .bara {
  position: absolute;
  left: 0;
  width: 30px;
  height: 4px;
  background: navy;
}

.icon-hamburger .bara:nth-child(1) { top: 0; }
.icon-hamburger .bara:nth-child(2) { top: 10px; }
.icon-hamburger .bara:nth-child(3) { top: 20px; }`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Pe ecran mic apare iconița; meniul se deschide la bifarea checkbox-ului.",
        lang: "css",
        cod: `@media (max-width: 768px) {
  .icon-hamburger { display: block; }

  nav ul { display: none; }

  #toggle-meniu:checked ~ nav ul { display: block; }
}`
      }
    ]
  },
  {
    grup: "css",
    titlu: "Animație pe barele hamburgerului",
    cand: "Cerința care cere minim 3 cadre cheie și mai multe proprietăți schimbate.",
    tags: ["keyframes", "animation", "delay", "opacity", "transform", "sass", "for"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Trei cadre, cu culoare, transformare și opacitate diferite în fiecare.",
        lang: "css",
        cod: `@keyframes apareBara {
  0% {
    background: red;
    transform: translateX(-40px) rotate(-20deg);
    opacity: 0;
  }
  50% {
    background: orange;
    transform: translateX(5px) rotate(10deg);
    opacity: 0.6;
  }
  100% {
    background: navy;
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
}`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Delay-urile generate cu for, ca barele să pornească succesiv.",
        lang: "scss",
        cod: `$t: 300ms;

.icon-hamburger .bara {
  animation: apareBara 0.6s ease-out both;
}

@for $i from 1 through 3 {
  .icon-hamburger .bara:nth-child(#{$i}) {
    animation-delay: ($i - 1) * $t;
  }
}`
      }
    ]
  },
  {
    grup: "css",
    titlu: "Buton de întors sus, cu triunghi",
    cand: "Cerința „link top”, cu poziție fixă în colț.",
    tags: ["fixed", "link-top", "triunghi", "border", "scroll"],
    fisiere: [
      {
        nume: "views/fragmente/footer.ejs",
        explicatie: "Linkul duce la începutul paginii.",
        lang: "html",
        cod: `<a href="#" id="link-top">
  <div id="triunghi"></div>
</a>`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Triunghiul se face din bordurile unui element fără lățime și înălțime.",
        lang: "css",
        cod: `#link-top {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: navy;
  border-radius: 50%;
  z-index: 50;
}

#triunghi {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 14px solid white;
}`
      }
    ]
  },
  {
    grup: "css",
    titlu: "Customizare Bootstrap",
    cand: "Culori, raze, dimensiuni de font și breakpoint-uri schimbate prin SCSS.",
    tags: ["bootstrap", "scss", "variabile", "primary", "breakpoints", "import"],
    fisiere: [
      {
        nume: "resurse/scss/customizare_bootstrap.scss",
        explicatie: "Toate variabilele se declară ÎNAINTE de @import. După import nu mai au efect.",
        lang: "scss",
        cod: `$primary: teal;
$secondary: #b5838d;

$border-radius: 0.75rem;
$border-width: 2px;

$font-family-base: "IBM Plex Sans", sans-serif;
$h1-font-size: 2.5rem;
$h2-font-size: 2rem;

$form-range-thumb-width: 1.5rem;
$form-range-thumb-bg: teal;
$form-range-track-bg: #d9dde2;

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 800px,
  lg: 1100px,
  xl: 1400px
);

@import "../../node_modules/bootstrap/scss/bootstrap";`
      },
      {
        nume: "views/fragmente/head.ejs",
        explicatie: "CSS-ul Bootstrap se pune PRIMUL, ca stilurile tale să îl poată suprascrie.",
        lang: "html",
        cod: `<link rel="stylesheet" href="/resurse/css/customizare_bootstrap.css">
<link rel="stylesheet" href="/resurse/css/stil.css">`
      }
    ]
  },
  {
    grup: "css",
    titlu: "Efecte diverse cerute la etapa 5",
    cand: "Coloane, selecție, background fix, text care se plimbă.",
    tags: ["column-count", "selection", "background-attachment", "marquee", "efecte"],
    fisiere: [
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Text pe coloane, cu linie despărțitoare.",
        lang: "css",
        cod: `.text-lung {
  column-count: 3;
  column-gap: 2rem;
  column-rule: 1px solid gray;
}

@media (max-width: 900px) {
  .text-lung { column-count: 1; }
}`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Aspectul textului selectat cu mouse-ul.",
        lang: "css",
        cod: `::selection {
  background: var(--accent);
  color: white;
}`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Fundal care stă pe loc la derulare.",
        lang: "css",
        cod: `.sectiune-fundal {
  background-image: url("/resurse/imagini/fundal.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}`
      },
      {
        nume: "resurse/scss/stil.scss",
        explicatie: "Text care traversează ecranul. overflow: hidden previne bara de scroll orizontală.",
        lang: "css",
        cod: `.container-banner {
  overflow: hidden;
  width: 100%;
}

@keyframes plimba {
  from { transform: translateX(100%); }
  to   { transform: translateX(-100%); }
}

#banner {
  display: inline-block;
  white-space: nowrap;
  animation: plimba 10s linear infinite;
}`
      }
    ]
  },

  /* ============================ SERVER ============================ */
  {
    grup: "server",
    titlu: "Structura minimă a serverului",
    cand: "Punctul de pornire, dacă trebuie recreat index.js.",
    tags: ["express", "server", "listen", "static", "views", "8080"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Ordinea liniilor contează: static și view engine înainte de rute, ruta generală ultima.",
        lang: "js",
        cod: `const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use("/resurse", express.static(path.join(__dirname, "resurse")));

var obGlobal = { obErori: null };

app.get(["/", "/index", "/home"], function (req, res) {
  res.render("pagini/index");
});

// ... celelalte rute aici ...

app.get("/*", function (req, res) {
  res.render("pagini" + req.url, function (err, rezultat) {
    if (err) afisareEroare(res, 404);
    else res.send(rezultat);
  });
});

app.listen(8080);
console.log("Serverul rulează pe http://localhost:8080");`
      }
    ]
  },
  {
    grup: "server",
    titlu: "Sistem de erori cu JSON",
    cand: "Erorile 404, 403, 400 randate din același template.",
    tags: ["erori", "404", "403", "400", "erori.json", "afisareEroare", "obGlobal"],
    fisiere: [
      {
        nume: "erori.json — în rădăcina proiectului",
        explicatie: "Structura fișierului.",
        lang: "js",
        cod: `{
  "cale_baza": "/resurse/imagini/erori",
  "eroare_default": {
    "titlu": "Eroare",
    "text": "A apărut o problemă neașteptată.",
    "imagine": "default.png"
  },
  "info_erori": [
    { "identificator": 404, "status": true,
      "titlu": "Pagina nu a fost găsită",
      "text": "Adresa cerută nu există.", "imagine": "404.png" },
    { "identificator": 403, "status": true,
      "titlu": "Acces interzis",
      "text": "Nu ai voie să vezi conținutul acestui folder.", "imagine": "403.png" },
    { "identificator": 400, "status": true,
      "titlu": "Cerere greșită",
      "text": "Nu poți cere direct fișiere de tip ejs.", "imagine": "400.png" }
  ]
}`
      },
      {
        nume: "index.js",
        explicatie: "Încărcarea la pornire, cu completarea căilor imaginilor.",
        lang: "js",
        cod: `function initErori() {
  const cale = path.join(__dirname, "erori.json");
  obGlobal.obErori = JSON.parse(fs.readFileSync(cale, "utf8"));

  const caleBaza = obGlobal.obErori.cale_baza;

  obGlobal.obErori.eroare_default.imagine =
    caleBaza + "/" + obGlobal.obErori.eroare_default.imagine;

  obGlobal.obErori.info_erori.forEach(function (e) {
    e.imagine = caleBaza + "/" + e.imagine;
  });
}

initErori();`
      },
      {
        nume: "index.js",
        explicatie: "Funcția de afișare. Argumentele date explicit au prioritate față de datele din JSON.",
        lang: "js",
        cod: `function afisareEroare(res, identificator, titlu, text, imagine) {
  let eroare = obGlobal.obErori.info_erori.find(function (e) {
    return e.identificator === identificator;
  });

  if (!eroare) eroare = obGlobal.obErori.eroare_default;

  const status = eroare.status ? identificator : 200;

  res.status(status).render("pagini/eroare", {
    titlu: titlu || eroare.titlu,
    text: text || eroare.text,
    imagine: imagine || eroare.imagine
  });
}`
      },
      {
        nume: "views/pagini/eroare.ejs",
        explicatie: "Template-ul comun pentru toate erorile.",
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
    grup: "server",
    titlu: "Compilare automată SCSS cu backup",
    cand: "Cerința cu compileazaScss, folderul backup și fs.watch.",
    tags: ["sass", "scss", "compileazaScss", "backup", "fs.watch", "obGlobal"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "Căile, ținute în obiectul global.",
        lang: "js",
        cod: `const sass = require("sass");

obGlobal.folderScss = path.join(__dirname, "resurse", "scss");
obGlobal.folderCss = path.join(__dirname, "resurse", "css");
obGlobal.folderBackup = path.join(__dirname, "backup");`
      },
      {
        nume: "index.js",
        explicatie: "Funcția de compilare, cu copierea vechiului css în backup înainte de suprascriere.",
        lang: "js",
        cod: `function compileazaScss(caleScss, caleCss) {
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
      console.log("Backup eșuat pentru " + caleCss + ": " + err.message);
    }
  }

  const rezultat = sass.compile(caleScss, { style: "expanded" });
  fs.writeFileSync(caleCss, rezultat.css);
}`
      },
      {
        nume: "index.js",
        explicatie: "Compilare la pornire și urmărirea modificărilor.",
        lang: "js",
        cod: `fs.readdirSync(obGlobal.folderScss)
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
    grup: "server",
    titlu: "Foldere create automat la pornire",
    cand: "Cerința cu vect_foldere: temp, logs, backup, fisiere_uploadate.",
    tags: ["existsSync", "mkdirSync", "foldere", "vect_foldere", "path.join", "gitignore"],
    fisiere: [
      {
        nume: "index.js",
        explicatie: "recursive: true creează și folderele părinte, dacă lipsesc.",
        lang: "js",
        cod: `const vect_foldere = ["temp", "logs", "backup", "fisiere_uploadate"];

vect_foldere.forEach(function (nume) {
  const cale = path.join(__dirname, nume);

  if (!fs.existsSync(cale)) {
    fs.mkdirSync(cale, { recursive: true });
    console.log("Am creat folderul " + nume);
  }
});`
      },
      {
        nume: ".gitignore",
        explicatie: "Folderele generate nu se urcă pe GitHub.",
        lang: "js",
        cod: `node_modules/
temp/
logs/
backup/
fisiere_uploadate/`
      }
    ]
  },
  {
    grup: "server",
    titlu: "Blocarea listării folderelor și a fișierelor ejs",
    cand: "Cerințele cu 403 Forbidden și 400 Bad Request.",
    tags: ["403", "400", "middleware", "static", "ejs", "next"],
    fisiere: [
      {
        nume: "index.js — ÎNAINTE de express.static",
        explicatie: "O cerere care se termină cu / e către folder, nu către fișier.",
        lang: "js",
        cod: `app.use("/resurse", function (req, res, next) {
  if (req.url.endsWith("/")) {
    afisareEroare(res, 403);
  } else {
    next();
  }
});

app.use("/resurse", express.static(path.join(__dirname, "resurse")));`
      },
      {
        nume: "index.js",
        explicatie: "Blocarea cererilor directe către fișiere .ejs.",
        lang: "js",
        cod: `app.get("/*.ejs", function (req, res) {
  afisareEroare(res, 400);
});`
      }
    ]
  }
];
