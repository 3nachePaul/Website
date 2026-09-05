const STRUCTURA = {
  arbore: `proiect/
│
├── index.js                    ← serverul. TOATE rutele app.get() stau aici
├── package.json
├── erori.json                  ← definițiile erorilor 404, 403, 400
├── .gitignore
│
├── views/                      ← tot ce randează EJS
│   ├── pagini/                 ← paginile întregi
│   │   ├── index.ejs           ← prima pagină
│   │   ├── produse.ejs         ← lista de produse
│   │   ├── produs.ejs          ← pagina unui singur produs
│   │   ├── despre.ejs
│   │   └── eroare.ejs          ← template-ul comun pentru 404 / 403 / 400
│   │
│   └── fragmente/              ← bucăți refolosite, incluse cu include()
│       ├── header.ejs          ← meniul + antetul
│       ├── footer.ejs          ← subsolul
│       └── head.ejs            ← tagurile meta comune
│
├── resurse/                    ← folderul static (express.static)
│   ├── css/                    ← css COMPILAT — nu se editează manual
│   │   ├── stil.css
│   │   └── customizare_bootstrap.css
│   │
│   ├── scss/                   ← aici scrii stilurile
│   │   ├── stil.scss
│   │   └── customizare_bootstrap.scss
│   │
│   ├── js/                     ← JavaScript care rulează în browser
│   │   └── script.js
│   │
│   ├── json/
│   │   ├── galerie.json
│   │   └── oferte.json
│   │
│   ├── imagini/
│   │   └── galerie/
│   └── ico/
│       └── favicon.ico
│
├── backup/                     ← creat automat de server
├── temp/
└── node_modules/`,

  unde: [
    {
      intrebare: "Vreau să adaug o pagină nouă",
      raspuns: "Două fișiere: ruta în index.js (înainte de app.get(\"/*\")) și template-ul în views/pagini/nume.ejs.",
      tags: ["pagina noua", "ruta", "ejs"]
    },
    {
      intrebare: "Vreau să schimb stilul unui element",
      raspuns: "În resurse/scss/stil.scss. NU în resurse/css/stil.css — acela e generat automat și se suprascrie la fiecare pornire de server.",
      tags: ["css", "scss", "stil"]
    },
    {
      intrebare: "Vreau să schimb culorile Bootstrap",
      raspuns: "În resurse/scss/customizare_bootstrap.scss, cu variabilele declarate ÎNAINTE de @import.",
      tags: ["bootstrap", "scss", "culori"]
    },
    {
      intrebare: "Vreau JavaScript care rulează în browser",
      raspuns: "În resurse/js/script.js, sau direct într-un tag <script> la finalul fișierului .ejs dacă are nevoie de date din pagină.",
      tags: ["javascript", "client", "script"]
    },
    {
      intrebare: "Vreau să modific meniul",
      raspuns: "În views/fragmente/header.ejs. Fiind inclus peste tot, se schimbă pe toate paginile deodată.",
      tags: ["meniu", "header", "nav"]
    },
    {
      intrebare: "Vreau să citesc un fișier JSON",
      raspuns: "În index.js, cu fs.readFileSync + JSON.parse. Fișierul stă în resurse/json/.",
      tags: ["json", "fs", "citire"]
    },
    {
      intrebare: "Unde adaug un fișier JSON nou descărcat",
      raspuns: "În resurse/json/. Apoi îl citești în index.js cu path.join(__dirname, \"resurse\", \"json\", \"fisier.json\").",
      tags: ["json", "descarcat", "resurse"]
    },
    {
      intrebare: "Vreau imagini noi",
      raspuns: "În resurse/imagini/. În pagină le referi cu cale absolută: /resurse/imagini/poza.jpg, nu ../resurse/...",
      tags: ["imagini", "cale", "static"]
    },
    {
      intrebare: "Unde se scriu textele erorilor",
      raspuns: "În erori.json din rădăcină. Template-ul care le afișează e views/pagini/eroare.ejs.",
      tags: ["erori", "404", "json"]
    },
    {
      intrebare: "De ce nu se vede modificarea din CSS",
      raspuns: "Probabil ai editat resurse/css/ în loc de resurse/scss/. Sau nu ai repornit serverul. Sau browserul are cache — Ctrl+Shift+R.",
      tags: ["css", "nu merge", "cache", "scss"]
    },
    {
      intrebare: "De ce ruta nouă dă 404",
      raspuns: "Aproape sigur e scrisă DUPĂ app.get(\"/*\"). Ruta generală prinde totul, deci tot ce vine după ea nu se mai execută.",
      tags: ["404", "ruta", "ordine"]
    },
    {
      intrebare: "Cum pornesc serverul",
      raspuns: "node index.js în terminal, din folderul proiectului. Apoi localhost:8080 în browser. La orice modificare în index.js trebuie repornit.",
      tags: ["server", "node", "pornire", "8080"]
    }
  ],

  comenzi: [
    { cmd: "node index.js", desc: "Pornește serverul. Ctrl+C îl oprește." },
    { cmd: "npm install express ejs sass pg", desc: "Instalează pachetele, dacă lipsesc." },
    { cmd: "npx sass resurse/scss/stil.scss resurse/css/stil.css", desc: "Compilare manuală scss, dacă cea automată nu merge." },
    { cmd: "git add . && git commit -m \"examen\" && git push", desc: "Trimite modificările pe GitHub." }
  ]
};
