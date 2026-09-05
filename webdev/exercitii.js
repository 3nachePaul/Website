const TIPURI_EX = [
  { id: "laborator", nume: "Laborator (CSS pe index.html)" },
  { id: "subiect1", nume: "Subiect 1 — CSS pe pagina existentă" },
  { id: "subiect2", nume: "Subiect 2 — pagini noi, galerie, tabele" },
  { id: "subiect3", nume: "Subiect 3 — rute, JavaScript, localStorage" }
];

const EXERCITII = [
  /* ========================= LABORATOR ========================= */
  {
    tip: "laborator",
    titlu: "Cuvânt din titlu rotit la 90 de grade",
    cerinta: "Faceți cuvântul Dulcelind din titlu să fie rotit la 90 de grade (perpendicular pe linia de text).",
    tags: ["rotate", "transform", "titlu", "inline-block", "90"],
    pasi: [
      {
        explicatie: "Dacă în HTML cuvântul nu e separat, îl învelești într-un span. Dacă nu ai voie să atingi HTML-ul, cauți un element care conține doar acel cuvânt.",
        fisier: "index.html — în h1",
        lang: "html",
        cod: `<h1>Cofetăria <span class="rotit">Dulcelind</span></h1>`
      },
      {
        explicatie: "Rotirea propriu-zisă. inline-block e obligatoriu: pe un element inline pur, transform nu are niciun efect.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.rotit {
  display: inline-block;
  transform: rotate(90deg);
}`
      }
    ],
    nota: "Dacă rotirea împinge textul din jur, adaugă transform-origin: center și eventual o lățime fixă pe span."
  },
  {
    tip: "laborator",
    titlu: "Culoare care alternează la infinit",
    cerinta: "Faceți tortul care topăie să își schimbe alternat culoarea la infinit între roșu și albastru.",
    tags: ["keyframes", "animation", "infinite", "alternate", "culoare"],
    pasi: [
      {
        explicatie: "Definești animația: două stări, de la roșu la albastru.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `@keyframes schimbaCuloare {
  from { color: red; }
  to { color: blue; }
}`
      },
      {
        explicatie: "O aplici pe element. infinite = nu se oprește, alternate = face și drumul înapoi, ca să nu sară brusc.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.tort {
  animation: schimbaCuloare 1s infinite alternate;
}`
      }
    ],
    nota: "Dacă elementul are deja o animație (topăitul), scrii amândouă separate prin virgulă: animation: topaie 0.6s infinite, schimbaCuloare 1s infinite alternate;"
  },
  {
    tip: "laborator",
    titlu: "Culori alternate pe poziții impare și pare",
    cerinta: "Faceți butoanele Pateuri, Bomboane, Fursecuri, Prăjituri, Torturi să aibă culori alternate: imparele roșii și parele galbene.",
    tags: ["nth-child", "odd", "even", "alternant", "butoane"],
    pasi: [
      {
        explicatie: "odd prinde pozițiile 1, 3, 5 — deci Pateuri, Fursecuri, Torturi. even prinde 2 și 4.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.buton:nth-child(odd) { background-color: red; }
.buton:nth-child(even) { background-color: yellow; }`
      }
    ],
    nota: "Numărătoarea e față de părinte, nu față de clasă. Dacă butoanele sunt în li-uri, pui selectorul pe li: li:nth-child(odd) .buton."
  },
  {
    tip: "laborator",
    titlu: "Prima literă mai mare",
    cerinta: "Faceți prima literă a butoanelor de mai sus să fie de 2 ori mai mare decât restul textului din buton.",
    tags: ["first-letter", "pseudo-element", "font-size", "em"],
    pasi: [
      {
        explicatie: "em înseamnă „de atâtea ori față de fontul elementului”, deci 2em e exact dublul.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.buton::first-letter {
  font-size: 2em;
}`
      }
    ],
    nota: "::first-letter nu merge pe elemente inline. Dacă butonul e un <a>, adaugă display: inline-block pe el."
  },
  {
    tip: "laborator",
    titlu: "Dublare treptată la hover",
    cerinta: "Când se vine cu cursorul pe ultimul buton Torturi, acesta să își dubleze treptat dimensiunea (pe orizontală și verticală) pe parcursul a 2 secunde.",
    tags: ["transition", "scale", "hover", "last-child", "2 secunde"],
    pasi: [
      {
        explicatie: "transition se pune pe starea NORMALĂ, nu pe :hover. Altfel creșterea e lină, dar revenirea e bruscă.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.buton:last-child {
  transition: transform 2s;
}`
      },
      {
        explicatie: "scale(2) dublează pe ambele axe deodată.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.buton:last-child:hover {
  transform: scale(2);
}`
      }
    ],
    nota: "Dacă butonul crescut e tăiat de marginea containerului, adaugă position: relative și z-index: 10 pe el."
  },
  {
    tip: "laborator",
    titlu: "Text subliniat doar pentru anumite valori",
    cerinta: "Faceți ca datele din anul 2020 să fie subliniate, iar la hover să își schimbe culoarea de fundal în albastru. Doar din CSS.",
    tags: ["atribut", "^=", "datetime", "hover", "2020"],
    pasi: [
      {
        explicatie: "Selectorul de atribut cu ^= prinde tot ce ÎNCEPE cu 2020. Merge fiindcă datetime e scris ca 2020-07-05.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `time[datetime^="2020"] {
  text-decoration: underline;
}

time[datetime^="2020"]:hover {
  background-color: blue;
}`
      }
    ],
    nota: "Dacă anul nu e într-un atribut ci doar în text, din CSS nu se poate — atunci cerința ar trebui rezolvată din JavaScript."
  },
  {
    tip: "laborator",
    titlu: "Chenar doar pe elementele care nu sunt primele",
    cerinta: "Puneți o linie despărțitoare în stânga fiecărui element din meniu, în afară de primul.",
    tags: ["not", "first-child", "border-left", "excludere"],
    pasi: [
      {
        explicatie: ":not(:first-child) exclude primul element, deci linia nu apare la marginea din stânga a meniului.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `nav > ul > li:not(:first-child) {
  border-left: 1px solid gray;
}`
      }
    ]
  },
  {
    tip: "laborator",
    titlu: "Formă diferită pe poziții pare",
    cerinta: "Faceți ca dreptunghiurile de pe poziții impare să aibă textul vertical, iar cele de pe poziții pare să fie rotunjite. Dreptunghiurile nu trebuie să se suprapună.",
    tags: ["writing-mode", "border-radius", "nth-child", "suprapunere"],
    pasi: [
      {
        explicatie: "writing-mode schimbă și dimensiunea cutiei elementului, spre deosebire de rotate — de aceea nu se suprapune peste vecini.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.dreptunghi:nth-child(odd) {
  writing-mode: vertical-rl;
  padding: 10px 5px;
}`
      },
      {
        explicatie: "Rotunjirea pe pozițiile pare.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.dreptunghi:nth-child(even) {
  border-radius: 50%;
  padding: 20px;
}`
      },
      {
        explicatie: "Ca să nu se suprapună, containerul le pune în linie cu spațiu între ele.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.container-dreptunghiuri {
  display: flex;
  align-items: center;
  gap: 1rem;
}`
      }
    ],
    nota: "Dacă foloseai rotate în loc de writing-mode, cutia rămânea orizontală și textul ieșea peste vecini. De aici cerința despre suprapunere."
  },

  /* ========================= SUBIECT 1 ========================= */
  {
    tip: "subiect1",
    titlu: "Meniu rearanjat: primul buton mare, restul pe două rânduri",
    cerinta: "Faceți ca primul buton din meniu să aibă de 2 ori înălțimea unui buton, să fie cu scris italic și subliniat cu roșu. Restul butoanelor să vină în dreapta primului, dispuse pe două rânduri (fiecare rând de 2 butoane).",
    tags: ["grid", "meniu", "grid-area", "nav", "italic", "underline"],
    pasi: [
      {
        explicatie: "Meniul devine grid: 3 coloane, 2 rânduri.",
        fisier: "resurse/css/stil.css",
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
        explicatie: "Primul element ocupă ambele rânduri din prima coloană. Restul se așază câte două pe rând.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `nav > ul > li:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }
nav > ul > li:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
nav > ul > li:nth-child(3) { grid-area: 1 / 3 / 2 / 4; }
nav > ul > li:nth-child(4) { grid-area: 2 / 2 / 3 / 3; }
nav > ul > li:nth-child(5) { grid-area: 2 / 3 / 3 / 4; }`
      },
      {
        explicatie: "Stilul primului buton. text-decoration-color face sublinierea roșie fără să facă și textul roșu.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `nav > ul > li:nth-child(1) > a {
  font-style: italic;
  text-decoration: underline;
  text-decoration-color: red;
}`
      },
      {
        explicatie: "Linkurile trebuie să umple toată celula, altfel butonul mare nu pare mai înalt.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `nav > ul > li > a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}`
      }
    ],
    nota: "grid-area se citește: rând-start / coloană-start / rând-final / coloană-final."
  },
  {
    tip: "subiect1",
    titlu: "Hover diferit pe primul rând față de al doilea, fără să afecteze submeniurile",
    cerinta: "Când se vine cu cursorul pe un buton din primul rând acesta își schimbă culoarea în galben, iar când se vine pe un buton de pe al doilea rând, se face albastru. Aceste efecte să nu se întâmple și asupra butoanelor din submeniuri.",
    tags: ["hover", "submeniu", "copil direct", "meniu", "nth-child"],
    pasi: [
      {
        explicatie: "Cheia e semnul > peste tot. Linkurile din submeniuri sunt mai adânc în arbore, deci nu sunt copii direcți ai li-ului și nu se potrivesc.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `nav > ul > li:nth-child(2):hover > a,
nav > ul > li:nth-child(3):hover > a {
  background-color: yellow;
}

nav > ul > li:nth-child(4):hover > a,
nav > ul > li:nth-child(5):hover > a {
  background-color: blue;
  color: white;
}`
      }
    ],
    nota: "Dacă ai scrie nav li:hover a (fără >), la trecerea peste un element de submeniu s-ar colora și părintele, și copilul. De aceea cerința spune explicit că submeniurile nu trebuie afectate."
  },
  {
    tip: "subiect1",
    titlu: "Buton Bootstrap într-o culoare dată",
    cerinta: "Modificați butonul cu textul bootstrap folosind clasele corespunzătoare și fișierul customizare_bootstrap.scss astfel încât culoarea butonului să fie teal.",
    tags: ["bootstrap", "scss", "primary", "buton", "teal"],
    pasi: [
      {
        explicatie: "Variabila se declară ÎNAINTE de import, altfel Bootstrap își ia deja valoarea implicită și nu se mai schimbă nimic.",
        fisier: "resurse/scss/customizare_bootstrap.scss",
        lang: "scss",
        cod: `$primary: teal;

@import "../../node_modules/bootstrap/scss/bootstrap";`
      },
      {
        explicatie: "În pagină, butonul primește clasele Bootstrap.",
        fisier: "views/pagini/index.ejs",
        lang: "html",
        cod: `<a href="#" class="btn btn-primary">Bootstrap</a>`
      },
      {
        explicatie: "Dacă vrei doar conturul, nu fundal plin.",
        fisier: "views/pagini/index.ejs",
        lang: "html",
        cod: `<a href="#" class="btn btn-outline-primary">Bootstrap</a>`
      }
    ],
    nota: "După modificare trebuie repornit serverul, ca funcția compileazaScss să regenereze fișierul css."
  },
  {
    tip: "subiect1",
    titlu: "Coloane de text cu linie despărțitoare",
    cerinta: "Alegeți o secțiune cu mai mult text și afișați-o pe 3 coloane, cu o linie despărțitoare între ele. Pe ecran mic și mediu se afișează o singură coloană.",
    tags: ["column-count", "column-rule", "media query", "coloane"],
    pasi: [
      {
        explicatie: "Împărțirea pe coloane și linia dintre ele.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `.text-lung {
  column-count: 3;
  column-gap: 2rem;
  column-rule: 1px solid gray;
}`
      },
      {
        explicatie: "Pe ecran mic revine la o singură coloană.",
        fisier: "resurse/css/stil.css",
        lang: "css",
        cod: `@media (max-width: 900px) {
  .text-lung { column-count: 1; }
}`
      }
    ]
  },

  /* ========================= SUBIECT 2 ========================= */
  {
    tip: "subiect2",
    titlu: "Pagină nouă cu tabel din erori.json",
    cerinta: "Creați o pagină nouă accesibilă cu localhost:8080/erori_status. Pagina va păstra aspectul celorlalte pagini, va avea un titlu de nivel 1 cu textul „Erori cu status” și va afișa un tabel cu antetul „Titlu” și „Text”. Fiecare rând corespunde unei erori cu statusul adevărat.",
    tags: ["pagina noua", "ruta", "tabel", "erori.json", "filter", "status"],
    pasi: [
      {
        explicatie: "Ruta citește JSON-ul, păstrează doar erorile cu status adevărat și le trimite în template.",
        fisier: "index.js — obligatoriu ÎNAINTE de app.get(\"/*\")",
        lang: "js",
        cod: `app.get("/erori_status", function (req, res) {
  const cale = path.join(__dirname, "erori.json");
  const date = JSON.parse(fs.readFileSync(cale, "utf8"));

  const erori = date.info_erori.filter(function (e) {
    return e.status;
  });

  res.render("pagini/erori_status", { erori: erori });
});`
      },
      {
        explicatie: "Template-ul. Cele două include păstrează meniul și subsolul identice cu restul site-ului.",
        fisier: "views/pagini/erori_status.ejs — fișier nou",
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
    nota: "Dacă ai deja obGlobal.obErori încărcat la pornire, poți folosi direct obGlobal.obErori.info_erori și scapi de citirea fișierului."
  },
  {
    tip: "subiect2",
    titlu: "Pagină nouă cu statistici pe categorii",
    cerinta: "Creați o pagină /statistici care afișează un tabel cu o linie pentru fiecare categorie de produse, conținând: numele categoriei, numărul de produse, prețul minim, prețul maxim și prețul mediu.",
    tags: ["pagina noua", "statistici", "grupare", "tabel", "reduce", "toFixed"],
    pasi: [
      {
        explicatie: "Grupezi produsele pe categorii într-un obiect, apoi calculezi pentru fiecare grup.",
        fisier: "index.js — înainte de app.get(\"/*\")",
        lang: "js",
        cod: `app.get("/statistici", function (req, res) {
  client.query("SELECT * FROM produse", function (err, rezultat) {
    if (err) {
      afisareEroare(res, 2);
      return;
    }

    const grupuri = {};

    rezultat.rows.forEach(function (p) {
      if (!grupuri[p.categorie]) grupuri[p.categorie] = [];
      grupuri[p.categorie].push(parseFloat(p.pret));
    });

    const statistici = Object.keys(grupuri).map(function (cat) {
      const preturi = grupuri[cat];
      const suma = preturi.reduce(function (a, b) { return a + b; }, 0);

      return {
        categorie: cat,
        cate: preturi.length,
        minim: Math.min(...preturi),
        maxim: Math.max(...preturi),
        medie: (suma / preturi.length).toFixed(2)
      };
    });

    res.render("pagini/statistici", { statistici: statistici });
  });
});`
      },
      {
        explicatie: "Tabelul, cu un tfoot care arată totalul.",
        fisier: "views/pagini/statistici.ejs — fișier nou",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Statistici pe categorii</h1>

  <table>
    <caption>Prețuri pe categorii</caption>
    <thead>
      <tr>
        <th>Categorie</th>
        <th>Produse</th>
        <th>Preț minim</th>
        <th>Preț maxim</th>
        <th>Preț mediu</th>
      </tr>
    </thead>
    <tbody>
      <% statistici.forEach(function (s) { %>
        <tr>
          <td><%= s.categorie %></td>
          <td><%= s.cate %></td>
          <td><%= s.minim %> lei</td>
          <td><%= s.maxim %> lei</td>
          <td><%= s.medie %> lei</td>
        </tr>
      <% }); %>
    </tbody>
    <tfoot>
      <tr>
        <td>Total</td>
        <td colspan="4">
          <%= statistici.reduce(function (a, s) { return a + s.cate; }, 0) %> produse
        </td>
      </tr>
    </tfoot>
  </table>
</main>

<%- include("../fragmente/footer") %>`
      }
    ]
  },
  {
    tip: "subiect2",
    titlu: "Galerie: afișarea tuturor imaginilor",
    cerinta: "Faceți ca pe prima pagină în secțiunea galerie să se afișeze toate imaginile din galerie.json, nu doar cele care corespund datei.",
    tags: ["galerie", "json", "filtrare", "toate", "ejs"],
    pasi: [
      {
        explicatie: "Scoți filtrarea și trimiți vectorul întreg. Dacă exista un .filter(), îl ștergi.",
        fisier: "index.js — în ruta primei pagini",
        lang: "js",
        cod: `app.get(["/", "/index", "/home"], function (req, res) {
  res.render("pagini/index", {
    imagini: obGlobal.obImagini.imagini,
    cale_galerie: obGlobal.obImagini.cale_galerie
  });
});`
      },
      {
        explicatie: "Template-ul rămâne același, doar că acum primește toate imaginile.",
        fisier: "views/pagini/index.ejs — secțiunea galerie",
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
    tip: "subiect2",
    titlu: "Galerie: clase din JSON puse în atributul class",
    cerinta: "În fișierul galerie.json pentru fiecare imagine există proprietatea clase. Clasele sunt separate prin virgulă și spațiu. Asociați atributul class obiectelor <figure> din galerie. Dacă există spații în interiorul numelui unei clase, acesta va fi înlocuit cu „_” prin program.",
    tags: ["clase", "class", "split", "replace", "join", "galerie"],
    pasi: [
      {
        explicatie: "split(\", \") desparte lista, replace înlocuiește spațiile rămase din interiorul numelor, join(\" \") le lipește cum cere atributul class.",
        fisier: "index.js — în ruta primei pagini",
        lang: "js",
        cod: `imagini.forEach(function (img) {
  img.claseCSS = img.clase
    .split(", ")
    .map(function (c) {
      return c.trim().replace(/ /g, "_");
    })
    .join(" ");
});`
      },
      {
        explicatie: "În template pui rezultatul direct în atribut.",
        fisier: "views/pagini/index.ejs",
        lang: "html",
        cod: `<% imagini.forEach(function (img) { %>
  <figure class="<%= img.claseCSS %>">
    <img src="<%= cale_galerie %>/<%= img.cale_relativa %>"
         alt="<%= img.descriere %>">
    <figcaption><%= img.descriere %></figcaption>
  </figure>
<% }); %>`
      }
    ],
    nota: "„la expozitie” devine „la_expozitie”. Fără /g, replace ar schimba doar primul spațiu."
  },
  {
    tip: "subiect2",
    titlu: "Galerie: numărul de elemente din fiecare clasă",
    cerinta: "Sub galerie se vor afișa câte elemente din fiecare clasă există.",
    tags: ["contor", "numarare", "clase", "Object.keys", "galerie"],
    pasi: [
      {
        explicatie: "Contorul se face pe clasele deja transformate, ca să corespundă exact cu ce apare în atributul class.",
        fisier: "index.js — în aceeași rută",
        lang: "js",
        cod: `const contor = {};

imagini.forEach(function (img) {
  img.clase.split(", ").forEach(function (c) {
    const cls = c.trim().replace(/ /g, "_");
    contor[cls] = (contor[cls] || 0) + 1;
  });
});

res.render("pagini/index", {
  imagini: imagini,
  contor: contor,
  cale_galerie: obGlobal.obImagini.cale_galerie
});`
      },
      {
        explicatie: "Afișarea sub galerie.",
        fisier: "views/pagini/index.ejs — după secțiunea galerie",
        lang: "html",
        cod: `<section id="contor-clase">
  <% Object.keys(contor).forEach(function (clasa) { %>
    <p><%= clasa %>: <%= contor[clasa] %></p>
  <% }); %>
</section>`
      }
    ],
    nota: "(contor[cls] || 0) + 1 rezolvă primul element, când cheia încă nu există în obiect."
  },
  {
    tip: "subiect2",
    titlu: "Galerie filtrată după minutul curent",
    cerinta: "Observați vectorul perioade_ore care apare printre proprietățile unor imagini. Dacă e începutul orei (minutele în [0,20)) se afișează imaginile care conțin textul „inceput”, pentru [20,40) cele cu „mijloc”, pentru [40,60) cele cu „final”. Cele care conțin „mereu” se afișează mereu. Imaginile fără proprietatea perioade_ore nu se afișează.",
    tags: ["perioade_ore", "getMinutes", "filter", "includes", "mereu", "galerie"],
    pasi: [
      {
        explicatie: "Funcția de decizie. Prima linie rezolvă cazul imaginilor fără proprietate, a doua cazul „mereu”.",
        fisier: "index.js",
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
        explicatie: "În rută filtrezi cu ea.",
        fisier: "index.js — în ruta primei pagini",
        lang: "js",
        cod: `res.render("pagini/index", {
  imagini: obGlobal.obImagini.imagini.filter(seAfiseaza),
  cale_galerie: obGlobal.obImagini.cale_galerie
});`
      }
    ],
    nota: "Codul e general: funcționează pentru orice oră fiindcă citește minutul la fiecare cerere, nu o singură dată la pornire."
  },
  {
    tip: "subiect2",
    titlu: "Galerie filtrată după ziua săptămânii",
    cerinta: "Fiecare imagine are un vector „zile” cu zilele în care trebuie afișată. Afișați doar imaginile potrivite pentru ziua curentă. Cele fără proprietate se afișează mereu.",
    tags: ["getDay", "zile", "filtrare", "galerie", "saptamana"],
    pasi: [
      {
        explicatie: "getDay() dă 0 pentru duminică, deci vectorul de nume începe tot cu duminica.",
        fisier: "index.js",
        lang: "js",
        cod: `const ZILE = ["duminica", "luni", "marti", "miercuri", "joi", "vineri", "sambata"];

function potrivitAzi(imagine) {
  if (!imagine.zile) return true;
  return imagine.zile.includes(ZILE[new Date().getDay()]);
}`
      },
      {
        explicatie: "Aplicarea în rută.",
        fisier: "index.js — în ruta primei pagini",
        lang: "js",
        cod: `res.render("pagini/index", {
  imagini: obGlobal.obImagini.imagini.filter(potrivitAzi),
  cale_galerie: obGlobal.obImagini.cale_galerie
});`
      }
    ]
  },
  {
    tip: "subiect2",
    titlu: "Galerie grupată pe clase, cu câte o secțiune pentru fiecare",
    cerinta: "Afișați galeria împărțită pe secțiuni: câte o secțiune pentru fiecare clasă, cu titlul clasei și imaginile care îi aparțin.",
    tags: ["grupare", "clase", "sectiuni", "galerie", "Object.keys"],
    pasi: [
      {
        explicatie: "Construiești un obiect în care fiecare cheie e o clasă și valoarea e lista de imagini.",
        fisier: "index.js",
        lang: "js",
        cod: `const peClase = {};

imagini.forEach(function (img) {
  img.clase.split(", ").forEach(function (c) {
    const cls = c.trim().replace(/ /g, "_");
    if (!peClase[cls]) peClase[cls] = [];
    peClase[cls].push(img);
  });
});`
      },
      {
        explicatie: "Două bucle imbricate: una peste clase, una peste imaginile fiecărei clase.",
        fisier: "views/pagini/index.ejs",
        lang: "html",
        cod: `<% Object.keys(peClase).forEach(function (clasa) { %>
  <section class="grup-<%= clasa %>">
    <h3><%= clasa %> (<%= peClase[clasa].length %>)</h3>

    <% peClase[clasa].forEach(function (img) { %>
      <figure>
        <img src="<%= cale_galerie %>/<%= img.cale_relativa %>"
             alt="<%= img.descriere %>">
        <figcaption><%= img.descriere %></figcaption>
      </figure>
    <% }); %>
  </section>
<% }); %>`
      }
    ],
    nota: "O imagine cu mai multe clase apare în mai multe secțiuni. E normal, dacă cerința nu spune altfel."
  },
  {
    tip: "subiect2",
    titlu: "Galerie cu numerotare A) B) C)",
    cerinta: "Fiecare imagine din galerie va avea descrierea precedată de o literă: A), B), C) și așa mai departe.",
    tags: ["index", "fromCharCode", "numerotare", "forEach", "galerie"],
    pasi: [
      {
        explicatie: "Al doilea parametru din forEach e poziția. 65 e codul literei A.",
        fisier: "views/pagini/index.ejs",
        lang: "html",
        cod: `<% imagini.forEach(function (img, i) { %>
  <figure>
    <img src="<%= cale_galerie %>/<%= img.cale_relativa %>"
         alt="<%= img.descriere %>">
    <figcaption>
      <%= String.fromCharCode(65 + i) %>)<%= img.descriere %>
    </figcaption>
  </figure>
<% }); %>`
      }
    ],
    nota: "Alternativă doar din CSS, dacă nu ai voie să atingi template-ul: figure { counter-increment: g; } figcaption::before { content: counter(g, upper-alpha) \")\"; }"
  },
  {
    tip: "subiect2",
    titlu: "Pagină nouă cu orarul dintr-un JSON, ziua curentă marcată",
    cerinta: "Creați o pagină /orar care afișează un tabel cu programul de lucru citit dintr-un fișier JSON. Ziua curentă va fi marcată diferit. Sub tabel se va afișa dacă firma e acum deschisă sau închisă.",
    tags: ["orar", "json", "tabel", "getDay", "getHours", "deschis"],
    pasi: [
      {
        explicatie: "Fișierul de date.",
        fisier: "resurse/json/orar.json — fișier nou",
        lang: "js",
        cod: `{
  "zile": [
    { "nume": "luni",     "deschidere": 8,  "inchidere": 20 },
    { "nume": "marti",    "deschidere": 8,  "inchidere": 20 },
    { "nume": "miercuri", "deschidere": 8,  "inchidere": 20 },
    { "nume": "joi",      "deschidere": 8,  "inchidere": 20 },
    { "nume": "vineri",   "deschidere": 8,  "inchidere": 22 },
    { "nume": "sambata",  "deschidere": 10, "inchidere": 22 },
    { "nume": "duminica", "deschidere": null, "inchidere": null }
  ]
}`
      },
      {
        explicatie: "Ruta calculează ziua curentă și dacă e deschis acum.",
        fisier: "index.js — înainte de app.get(\"/*\")",
        lang: "js",
        cod: `app.get("/orar", function (req, res) {
  const cale = path.join(__dirname, "resurse", "json", "orar.json");
  const orar = JSON.parse(fs.readFileSync(cale, "utf8"));

  const ZILE = ["duminica", "luni", "marti", "miercuri", "joi", "vineri", "sambata"];
  const acum = new Date();
  const numeZi = ZILE[acum.getDay()];
  const ora = acum.getHours();

  const azi = orar.zile.find(function (z) { return z.nume === numeZi; });

  const deschis = azi !== undefined
    && azi.deschidere !== null
    && ora >= azi.deschidere
    && ora < azi.inchidere;

  res.render("pagini/orar", {
    zile: orar.zile,
    numeZi: numeZi,
    deschis: deschis
  });
});`
      },
      {
        explicatie: "Tabelul. Rândul zilei curente primește o clasă în plus.",
        fisier: "views/pagini/orar.ejs — fișier nou",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Program de lucru</h1>

  <table>
    <thead>
      <tr><th>Zi</th><th>Deschidere</th><th>Închidere</th></tr>
    </thead>
    <tbody>
      <% zile.forEach(function (z) { %>
        <tr class="<%= z.nume === numeZi ? 'azi' : '' %>">
          <td><%= z.nume %></td>
          <% if (z.deschidere === null) { %>
            <td colspan="2">închis</td>
          <% } else { %>
            <td><%= z.deschidere %>:00</td>
            <td><%= z.inchidere %>:00</td>
          <% } %>
        </tr>
      <% }); %>
    </tbody>
  </table>

  <p class="<%= deschis ? 'deschis' : 'inchis' %>">
    Acum suntem <%= deschis ? "deschiși" : "închiși" %>.
  </p>
</main>

<%- include("../fragmente/footer") %>`
      },
      {
        explicatie: "Marcarea vizuală.",
        fisier: "resurse/scss/stil.scss",
        lang: "css",
        cod: `tr.azi {
  background: #fff3c4;
  font-weight: bold;
}

.deschis { color: green; }
.inchis  { color: red; }`
      }
    ]
  },
  {
    tip: "subiect2",
    titlu: "Pagină care listează fișierele dintr-un folder",
    cerinta: "Creați o pagină /fisiere care afișează un tabel cu numele, extensia și dimensiunea fișierelor din folderul de imagini.",
    tags: ["readdirSync", "statSync", "fs", "tabel", "extname"],
    pasi: [
      {
        explicatie: "readdirSync dă numele, statSync dă detaliile fiecărui fișier.",
        fisier: "index.js — înainte de app.get(\"/*\")",
        lang: "js",
        cod: `app.get("/fisiere", function (req, res) {
  const folder = path.join(__dirname, "resurse", "imagini");

  const fisiere = fs.readdirSync(folder).map(function (nume) {
    const info = fs.statSync(path.join(folder, nume));
    return {
      nume: nume,
      extensie: path.extname(nume),
      marime: Math.round(info.size / 1024)
    };
  });

  res.render("pagini/fisiere", { fisiere: fisiere });
});`
      },
      {
        explicatie: "Tabelul.",
        fisier: "views/pagini/fisiere.ejs — fișier nou",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Fișiere</h1>

  <table>
    <thead>
      <tr><th>Nume</th><th>Extensie</th><th>Mărime</th></tr>
    </thead>
    <tbody>
      <% fisiere.forEach(function (f) { %>
        <tr>
          <td><%= f.nume %></td>
          <td><%= f.extensie %></td>
          <td><%= f.marime %> KB</td>
        </tr>
      <% }); %>
    </tbody>
  </table>
</main>

<%- include("../fragmente/footer") %>`
      }
    ]
  },
  {
    tip: "subiect2",
    titlu: "Pagină cu lista categoriilor și numărul de produse",
    cerinta: "Creați o pagină /categorii care afișează fiecare categorie distinctă de produse, numărul de produse din ea și un link către pagina categoriei.",
    tags: ["categorii", "distinct", "grupare", "link", "pagina noua"],
    pasi: [
      {
        explicatie: "Numeri produsele pe categorii direct în JavaScript.",
        fisier: "index.js — înainte de app.get(\"/*\")",
        lang: "js",
        cod: `app.get("/categorii", function (req, res) {
  client.query("SELECT * FROM produse", function (err, rezultat) {
    if (err) {
      afisareEroare(res, 2);
      return;
    }

    const contor = {};
    rezultat.rows.forEach(function (p) {
      contor[p.categorie] = (contor[p.categorie] || 0) + 1;
    });

    res.render("pagini/categorii", { contor: contor });
  });
});`
      },
      {
        explicatie: "Lista cu linkuri.",
        fisier: "views/pagini/categorii.ejs — fișier nou",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Categorii</h1>

  <ul>
    <% Object.keys(contor).forEach(function (cat) { %>
      <li>
        <a href="/categorie/<%= cat %>">
          <%= cat %> (<%= contor[cat] %> produse)
        </a>
      </li>
    <% }); %>
  </ul>
</main>

<%- include("../fragmente/footer") %>`
      },
      {
        explicatie: "Ruta către care duc linkurile.",
        fisier: "index.js",
        lang: "js",
        cod: `app.get("/categorie/:nume", function (req, res) {
  client.query("SELECT * FROM produse", function (err, rezultat) {
    if (err) {
      afisareEroare(res, 2);
      return;
    }

    const produse = rezultat.rows.filter(function (p) {
      return p.categorie === req.params.nume;
    });

    res.render("pagini/produse", { produse: produse });
  });
});`
      }
    ]
  },
  {
    tip: "subiect2",
    titlu: "Tabel cu evidențierea valorilor peste medie",
    cerinta: "Într-un tabel cu produse, marcați diferit rândurile în care prețul este peste prețul mediu.",
    tags: ["tabel", "medie", "clasa conditionala", "ejs", "reduce"],
    pasi: [
      {
        explicatie: "Media se calculează în rută și se trimite în template.",
        fisier: "index.js",
        lang: "js",
        cod: `const preturi = produse.map(function (p) { return parseFloat(p.pret); });
const medie = preturi.reduce(function (a, b) { return a + b; }, 0) / preturi.length;

res.render("pagini/produse", { produse: produse, medie: medie });`
      },
      {
        explicatie: "Clasa se pune condiționat pe rând.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<tbody>
  <% produse.forEach(function (p) { %>
    <tr class="<%= p.pret > medie ? 'scump' : '' %>">
      <td><%= p.nume %></td>
      <td><%= p.pret %> lei</td>
    </tr>
  <% }); %>
</tbody>`
      },
      {
        explicatie: "Stilul.",
        fisier: "resurse/scss/stil.scss",
        lang: "css",
        cod: `tr.scump {
  background: #ffe8e8;
  font-weight: bold;
}`
      }
    ]
  },

  /* ========================= SUBIECT 3 ========================= */
  {
    tip: "subiect3",
    titlu: "Rută cu două prețuri în cale",
    cerinta: "Vrem să accesăm o rută de forma /prajitura/[pret1]/[pret2] care să afișeze o pagină cu prăjiturile având prețurile încadrate între pret1 și pret2, de exemplu /prajitura/30/100. Pagina trebuie să aibă headerul și footerul la fel ca restul paginilor.",
    tags: ["req.params", "ruta", "parametri", "filtrare", "parseFloat"],
    pasi: [
      {
        explicatie: "Parametrii vin ca string, deci parseFloat e obligatoriu înainte de comparații.",
        fisier: "index.js — înainte de app.get(\"/*\")",
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
        explicatie: "Template-ul, cu include-urile care păstrează aspectul site-ului.",
        fisier: "views/pagini/prajitura.ejs — fișier nou",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Prăjituri între <%= pret1 %> și <%= pret2 %> lei</h1>

  <% produse.forEach(function (p) { %>
    <p class="prajitura"><b><%= p.nume %></b> — <%= p.pret %> lei</p>
  <% }); %>
</main>

<%- include("../fragmente/footer") %>`
      }
    ],
    nota: "Dacă pui ruta după app.get(\"/*\"), primești 404. E cea mai frecventă greșeală la acest tip de cerință."
  },
  {
    tip: "subiect3",
    titlu: "Text afișat doar pentru anumite produse",
    cerinta: "În cadrul template-ului, pentru fiecare prăjitură se va crea câte un paragraf care conține numele (scris cu bold) și prețul. În plus, strict în cazul prăjiturilor pentru diabetici se va afișa și textul „pentru diabetici”.",
    tags: ["if", "conditie", "ejs", "bold", "clasa conditionala"],
    pasi: [
      {
        explicatie: "Condiția din EJS. Clasa suplimentară e utilă mai târziu, dacă cerința cere și filtrare din JavaScript.",
        fisier: "views/pagini/prajitura.ejs",
        lang: "html",
        cod: `<% produse.forEach(function (p) { %>
  <p class="prajitura <%= p.diabetic ? 'diabetic' : '' %>">
    <b><%= p.nume %></b> — <%= p.pret %> lei
    <% if (p.diabetic) { %> — pentru diabetici<% } %>
  </p>
<% }); %>`
      }
    ],
    nota: "Dacă în tabel coloana se numește altfel (pentru_diabetici, tip), schimbi p.diabetic cu numele real al coloanei."
  },
  {
    tip: "subiect3",
    titlu: "Radio buttons care filtrează ce e deja afișat",
    cerinta: "Pagina va avea și un grup de trei butoane radio (doar unul poate fi bifat la un moment dat) cu etichetele „tot” / „pentru diabetici” / „pentru non-diabetici” și un buton „Afișează”. La click pe buton se vor păstra doar prăjiturile care corespund selecției.",
    tags: ["radio", "filtrare", "display", "checked", "name", "buton"],
    pasi: [
      {
        explicatie: "Radio-urile trebuie să aibă același name ca să se excludă reciproc. type=\"button\" împiedică trimiterea formularului.",
        fisier: "views/pagini/prajitura.ejs",
        lang: "html",
        cod: `<fieldset>
  <input type="radio" name="filtru" id="f-tot" value="tot" checked>
  <label for="f-tot">tot</label>

  <input type="radio" name="filtru" id="f-diab" value="diabetici">
  <label for="f-diab">pentru diabetici</label>

  <input type="radio" name="filtru" id="f-nediab" value="non-diabetici">
  <label for="f-nediab">pentru non-diabetici</label>

  <button type="button" id="afiseaza">Afișează</button>
</fieldset>`
      },
      {
        explicatie: "Filtrarea ascunde ce nu se potrivește. display = \"\" readuce elementul la valoarea din CSS.",
        fisier: "views/pagini/prajitura.ejs — în <script> la final",
        lang: "js",
        cod: `document.getElementById("afiseaza").addEventListener("click", function () {
  const ales = document.querySelector('input[name="filtru"]:checked').value;

  document.querySelectorAll(".prajitura").forEach(function (p) {
    const eDiabetic = p.classList.contains("diabetic");
    let arata = true;

    if (ales === "diabetici") arata = eDiabetic;
    if (ales === "non-diabetici") arata = !eDiabetic;

    p.style.display = arata ? "" : "none";
  });
});`
      }
    ]
  },
  {
    tip: "subiect3",
    titlu: "Ultimul interval reținut în localStorage",
    cerinta: "Se va memora în localStorage ultimul interval de prețuri cerut. La finalul paginii va exista un paragraf în care se va vedea mesajul: intervalul anterior de preturi: [pret1, pret2]. Dacă nu a existat un astfel de interval, nu se va afișa paragraful.",
    tags: ["localStorage", "interval", "JSON.stringify", "anterior", "load"],
    pasi: [
      {
        explicatie: "Paragraful gol în template.",
        fisier: "views/pagini/prajitura.ejs",
        lang: "html",
        cod: `<p id="interval-anterior"></p>`
      },
      {
        explicatie: "Ordinea e esențială: întâi CITEȘTI valoarea veche, apoi SCRII cea nouă. Invers, ai afișa mereu intervalul curent.",
        fisier: "views/pagini/prajitura.ejs — în <script> la final",
        lang: "js",
        cod: `window.addEventListener("load", function () {
  const anterior = localStorage.getItem("intervalPret");

  if (anterior) {
    const interval = JSON.parse(anterior);
    document.getElementById("interval-anterior").textContent =
      "intervalul anterior de preturi: [" + interval[0] + ", " + interval[1] + "]";
  }

  localStorage.setItem("intervalPret", JSON.stringify([<%= pret1 %>, <%= pret2 %>]));
});`
      }
    ],
    nota: "Dacă localStorage e gol, getItem dă null, if-ul nu intră și paragraful rămâne gol — exact ce cere enunțul."
  },
  {
    tip: "subiect3",
    titlu: "Produse peste prețul mediu, la apăsarea unei taste",
    cerinta: "În pagina cu produsele adăugați în ejs un paragraf cu id-ul „prod-scumpe”. La apăsarea tastei w să se scrie în acest paragraf numărul de produse afișate (vizibile) care au prețul mai mare decât prețul mediu al produselor afișate.",
    tags: ["keydown", "offsetParent", "vizibil", "medie", "reduce", "parseFloat"],
    pasi: [
      {
        explicatie: "Paragraful în template.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<p id="prod-scumpe"></p>`
      },
      {
        explicatie: "„Vizibile” înseamnă că trebuie exclus ce a fost ascuns prin filtrare. offsetParent e null exact când elementul are display: none.",
        fisier: "resurse/js/script.js",
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

  const suma = preturi.reduce(function (a, b) { return a + b; }, 0);
  const medie = suma / preturi.length;

  const cate = preturi.filter(function (pret) { return pret > medie; }).length;

  document.getElementById("prod-scumpe").textContent = cate;
});`
      }
    ],
    nota: "Dacă produsele nu au data-pret, iei prețul din text: parseFloat(p.querySelector(\".pret\").textContent)."
  },
  {
    tip: "subiect3",
    titlu: "Contor de apăsări afișat doar la reîncărcare",
    cerinta: "Se va memora în localStorage numărul de apăsări ale tastei w. Creați în ejs un alt paragraf sub paragraful cu id-ul „prod-scumpe”, cu textul „Nr anterior: …”, unde punctele sunt înlocuite cu numărul din localStorage. Acest număr este actualizat doar la reîncărcarea paginii.",
    tags: ["localStorage", "contor", "parseInt", "load", "keydown"],
    pasi: [
      {
        explicatie: "Al doilea paragraf.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<p id="prod-scumpe"></p>
<p id="nr-anterior"></p>`
      },
      {
        explicatie: "La fiecare apăsare doar SCRII în localStorage, fără să atingi paragraful.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `document.addEventListener("keydown", function (e) {
  if (e.key !== "w") return;

  let nr = parseInt(localStorage.getItem("nrApasariW")) || 0;
  localStorage.setItem("nrApasariW", nr + 1);
});`
      },
      {
        explicatie: "Citirea se face o singură dată, la încărcare. De aici vine „se actualizează doar la reîncărcare”.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `window.addEventListener("load", function () {
  const nr = localStorage.getItem("nrApasariW");

  if (nr !== null) {
    document.getElementById("nr-anterior").textContent = "Nr anterior: " + nr;
  }
});`
      }
    ],
    nota: "|| 0 acoperă și prima rulare (null), și un eventual NaN."
  },
  {
    tip: "subiect3",
    titlu: "Rută de căutare după text în nume",
    cerinta: "Creați o rută /cauta/:text care afișează produsele al căror nume conține textul dat, indiferent de diacritice și de literele mari sau mici.",
    tags: ["req.params", "cautare", "includes", "diacritice", "normalize"],
    pasi: [
      {
        explicatie: "Funcția care scoate diacriticele, ca „briose” să găsească „brioșe”.",
        fisier: "index.js",
        lang: "js",
        cod: `function faraDiacritice(text) {
  return text
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase();
}`
      },
      {
        explicatie: "Ruta compară versiunile normalizate ale ambelor texte.",
        fisier: "index.js — înainte de app.get(\"/*\")",
        lang: "js",
        cod: `app.get("/cauta/:text", function (req, res) {
  const cautat = faraDiacritice(req.params.text);

  client.query("SELECT * FROM produse", function (err, rezultat) {
    if (err) {
      afisareEroare(res, 2);
      return;
    }

    const gasite = rezultat.rows.filter(function (p) {
      return faraDiacritice(p.nume).includes(cautat);
    });

    res.render("pagini/cautare", {
      produse: gasite,
      cautat: req.params.text
    });
  });
});`
      },
      {
        explicatie: "Template-ul, cu mesaj când nu se găsește nimic.",
        fisier: "views/pagini/cautare.ejs — fișier nou",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Rezultate pentru „<%= cautat %>”</h1>

  <% if (produse.length === 0) { %>
    <p>Niciun produs găsit.</p>
  <% } else { %>
    <% produse.forEach(function (p) { %>
      <p><b><%= p.nume %></b> — <%= p.pret %> lei</p>
    <% }); %>
  <% } %>
</main>

<%- include("../fragmente/footer") %>`
      }
    ]
  },
  {
    tip: "subiect3",
    titlu: "Sortare la click, cu ultima alegere reținută",
    cerinta: "Adăugați două butoane care sortează produsele afișate crescător și descrescător după preț. Ultima sortare aleasă se reține în localStorage și se aplică automat la reintrarea pe pagină.",
    tags: ["sort", "appendChild", "localStorage", "sortare", "buton"],
    pasi: [
      {
        explicatie: "Butoanele.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<button type="button" id="sort-asc">Preț crescător</button>
<button type="button" id="sort-desc">Preț descrescător</button>`
      },
      {
        explicatie: "appendChild pe un element care există deja îl MUTĂ la sfârșit. Parcurgând lista sortată, ordinea din pagină devine cea dorită.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `function sorteaza(directie) {
  const container = document.querySelector(".lista-produse");
  const produse = Array.from(document.querySelectorAll(".produs"));
  const semn = directie === "asc" ? 1 : -1;

  produse
    .sort(function (a, b) {
      return (parseFloat(a.dataset.pret) - parseFloat(b.dataset.pret)) * semn;
    })
    .forEach(function (p) {
      container.appendChild(p);
    });

  localStorage.setItem("sortare", directie);
}

document.getElementById("sort-asc").addEventListener("click", function () {
  sorteaza("asc");
});

document.getElementById("sort-desc").addEventListener("click", function () {
  sorteaza("desc");
});`
      },
      {
        explicatie: "La încărcare reaplici ultima sortare, dacă există.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `window.addEventListener("load", function () {
  const salvat = localStorage.getItem("sortare");
  if (salvat) sorteaza(salvat);
});`
      }
    ]
  },
  {
    tip: "subiect3",
    titlu: "Ascunderea produselor fără stoc la o tastă",
    cerinta: "La apăsarea tastei s, produsele cu stocul 0 se ascund. La o nouă apăsare, reapar.",
    tags: ["keydown", "toggle", "display", "stoc", "dataset"],
    pasi: [
      {
        explicatie: "O variabilă ține minte starea curentă, ca apăsarea să comute între cele două.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `let ascunse = false;

document.addEventListener("keydown", function (e) {
  if (e.key !== "s") return;

  ascunse = !ascunse;

  document.querySelectorAll(".produs").forEach(function (p) {
    if (parseInt(p.dataset.stoc) === 0) {
      p.style.display = ascunse ? "none" : "";
    }
  });
});`
      }
    ]
  },
  {
    tip: "subiect3",
    titlu: "Cel mai scump și cel mai ieftin produs vizibil",
    cerinta: "La apăsarea tastei m, într-un paragraf cu id-ul „extreme” se afișează numele celui mai ieftin și al celui mai scump produs dintre cele vizibile.",
    tags: ["keydown", "reduce", "minim", "maxim", "vizibil", "offsetParent"],
    pasi: [
      {
        explicatie: "Paragraful.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<p id="extreme"></p>`
      },
      {
        explicatie: "reduce compară două câte două și păstrează câștigătorul.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `document.addEventListener("keydown", function (e) {
  if (e.key !== "m") return;

  const vizibile = Array.from(document.querySelectorAll(".produs"))
    .filter(function (p) { return p.offsetParent !== null; });

  if (vizibile.length === 0) return;

  const ieftin = vizibile.reduce(function (a, b) {
    return parseFloat(a.dataset.pret) < parseFloat(b.dataset.pret) ? a : b;
  });

  const scump = vizibile.reduce(function (a, b) {
    return parseFloat(a.dataset.pret) > parseFloat(b.dataset.pret) ? a : b;
  });

  document.getElementById("extreme").textContent =
    "Cel mai ieftin: " + ieftin.dataset.nume +
    ". Cel mai scump: " + scump.dataset.nume + ".";
});`
      }
    ]
  },
  {
    tip: "subiect3",
    titlu: "Produse ascunse definitiv pentru tabul curent",
    cerinta: "Fiecare produs are un buton de ștergere. Produsele șterse nu mai apar în tabul curent nici după refresh, dar apar normal dacă pagina se deschide în alt tab.",
    tags: ["sessionStorage", "stergere", "tab", "delegare", "closest"],
    pasi: [
      {
        explicatie: "Butonul, în containerul fiecărui produs.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<button type="button" class="sterge-produs">×</button>`
      },
      {
        explicatie: "sessionStorage e legat de tab: se pierde la închiderea lui și nu e partajat cu alte taburi. Exact ce cere enunțul.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `function idSterse() {
  return JSON.parse(sessionStorage.getItem("produseSterse")) || [];
}

function ascundeSterse() {
  const sterse = idSterse();

  document.querySelectorAll(".produs").forEach(function (p) {
    if (sterse.includes(p.dataset.id)) p.style.display = "none";
  });
}

document.querySelector(".lista-produse").addEventListener("click", function (e) {
  const buton = e.target.closest(".sterge-produs");
  if (!buton) return;

  const produs = buton.closest(".produs");
  const sterse = idSterse();

  sterse.push(produs.dataset.id);
  sessionStorage.setItem("produseSterse", JSON.stringify(sterse));

  produs.style.display = "none";
});

window.addEventListener("load", ascundeSterse);`
      }
    ],
    nota: "Dacă cerința ar spune „se păstrează și după închiderea browserului”, se schimbă sessionStorage cu localStorage și nimic altceva."
  },
  {
    tip: "subiect3",
    titlu: "Numărul de produse afișate, actualizat la filtrare",
    cerinta: "Sub lista de produse se va afișa numărul total de produse vizibile. Numărul se modifică automat după fiecare filtrare.",
    tags: ["contor", "vizibil", "filtrare", "offsetParent", "actualizare"],
    pasi: [
      {
        explicatie: "Paragraful.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<p id="nr-produse"></p>`
      },
      {
        explicatie: "O funcție separată, chemată la finalul filtrării și o dată la încărcare.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `function actualizeazaContor() {
  const cate = Array.from(document.querySelectorAll(".produs"))
    .filter(function (p) { return p.offsetParent !== null; })
    .length;

  document.getElementById("nr-produse").textContent =
    cate + (cate === 1 ? " produs afișat" : " produse afișate");
}

window.addEventListener("load", actualizeazaContor);`
      },
      {
        explicatie: "O chemi la finalul funcției de filtrare existente.",
        fisier: "resurse/js/script.js — în funcția filtreaza()",
        lang: "js",
        cod: `function filtreaza() {
  // ... filtrarea existentă ...

  actualizeazaContor();
}`
      }
    ]
  },
  {
    tip: "subiect3",
    titlu: "Rută cu interval și filtrare pe categorii din pagină",
    cerinta: "Creați ruta /interval/:min/:max care afișează produsele din intervalul de preț. Pagina va conține și checkbox-uri cu categoriile disponibile, care filtrează suplimentar produsele afișate.",
    tags: ["req.params", "checkbox", "categorii", "filtrare", "generat din date"],
    pasi: [
      {
        explicatie: "Ruta trimite și lista de categorii distincte, ca să genereze checkbox-urile automat.",
        fisier: "index.js — înainte de app.get(\"/*\")",
        lang: "js",
        cod: `app.get("/interval/:min/:max", function (req, res) {
  const min = parseFloat(req.params.min);
  const max = parseFloat(req.params.max);

  client.query("SELECT * FROM produse", function (err, rezultat) {
    if (err) {
      afisareEroare(res, 2);
      return;
    }

    const produse = rezultat.rows.filter(function (p) {
      return p.pret >= min && p.pret <= max;
    });

    const categorii = [];
    produse.forEach(function (p) {
      if (!categorii.includes(p.categorie)) categorii.push(p.categorie);
    });

    res.render("pagini/interval", {
      produse: produse,
      categorii: categorii,
      min: min,
      max: max
    });
  });
});`
      },
      {
        explicatie: "Checkbox-urile se generează din categoriile primite, nu scrise manual.",
        fisier: "views/pagini/interval.ejs — fișier nou",
        lang: "html",
        cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Produse între <%= min %> și <%= max %> lei</h1>

  <fieldset>
    <% categorii.forEach(function (c) { %>
      <input type="checkbox" name="categorie" id="c-<%= c %>" value="<%= c %>">
      <label for="c-<%= c %>"><%= c %></label>
    <% }); %>
  </fieldset>

  <div class="lista-produse">
    <% produse.forEach(function (p) { %>
      <div class="produs" data-categorie="<%= p.categorie %>">
        <b><%= p.nume %></b> — <%= p.pret %> lei
      </div>
    <% }); %>
  </div>
</main>

<script src="/resurse/js/script.js"></script>
<%- include("../fragmente/footer") %>`
      },
      {
        explicatie: "Când niciun checkbox nu e bifat se afișează tot — de aici verificarea length === 0.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `document.querySelectorAll('input[name="categorie"]').forEach(function (cb) {
  cb.addEventListener("change", filtreazaCategorii);
});

function filtreazaCategorii() {
  const alese = Array.from(
    document.querySelectorAll('input[name="categorie"]:checked')
  ).map(function (cb) { return cb.value; });

  document.querySelectorAll(".produs").forEach(function (p) {
    const potrivit = alese.length === 0 || alese.includes(p.dataset.categorie);
    p.style.display = potrivit ? "" : "none";
  });
}`
      }
    ]
  },
  {
    tip: "subiect3",
    titlu: "Produse marcate ca favorite, păstrate între vizite",
    cerinta: "Fiecare produs are un buton de favorit. La click, produsul e marcat vizual. Marcajele se păstrează la reintrarea pe pagină.",
    tags: ["localStorage", "favorite", "classList", "toggle", "delegare"],
    pasi: [
      {
        explicatie: "Butonul.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<button type="button" class="favorit">♥</button>`
      },
      {
        explicatie: "Un singur listener pe container, cu closest, în loc de câte unul pe fiecare buton.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `function favorite() {
  return JSON.parse(localStorage.getItem("favorite")) || [];
}

document.querySelector(".lista-produse").addEventListener("click", function (e) {
  const buton = e.target.closest(".favorit");
  if (!buton) return;

  const produs = buton.closest(".produs");
  const id = produs.dataset.id;
  let lista = favorite();

  if (lista.includes(id)) {
    lista = lista.filter(function (x) { return x !== id; });
  } else {
    lista.push(id);
  }

  localStorage.setItem("favorite", JSON.stringify(lista));
  produs.classList.toggle("e-favorit");
});

window.addEventListener("load", function () {
  const lista = favorite();

  document.querySelectorAll(".produs").forEach(function (p) {
    if (lista.includes(p.dataset.id)) p.classList.add("e-favorit");
  });
});`
      },
      {
        explicatie: "Marcajul vizual.",
        fisier: "resurse/scss/stil.scss",
        lang: "css",
        cod: `.produs.e-favorit {
  border: 2px solid crimson;
  background: #fff0f3;
}`
      }
    ]
  },
  {
    tip: "subiect3",
    titlu: "Paginare a produselor",
    cerinta: "Afișați doar K produse pe pagină. Sub listă vor apărea linkuri numerotate care duc la grupurile următoare de produse.",
    tags: ["paginare", "slice", "Math.ceil", "butoane", "K"],
    pasi: [
      {
        explicatie: "Numărul de pagini e partea întreagă superioară din N/K.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `const K = 6;
const produse = Array.from(document.querySelectorAll(".produs"));
const nrPagini = Math.ceil(produse.length / K);

function arataPagina(p) {
  produse.forEach(function (prod, i) {
    const inPagina = i >= (p - 1) * K && i < p * K;
    prod.style.display = inPagina ? "" : "none";
  });
}`
      },
      {
        explicatie: "Generarea butoanelor.",
        fisier: "resurse/js/script.js",
        lang: "js",
        cod: `const zona = document.getElementById("paginare");

for (let i = 1; i <= nrPagini; i++) {
  const buton = document.createElement("button");
  buton.type = "button";
  buton.textContent = i;
  buton.addEventListener("click", function () {
    arataPagina(i);
  });
  zona.appendChild(buton);
}

arataPagina(1);`
      },
      {
        explicatie: "Containerul pentru butoane.",
        fisier: "views/pagini/produse.ejs",
        lang: "html",
        cod: `<div id="paginare"></div>`
      }
    ]
  }
];
