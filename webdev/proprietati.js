const GRUPURI_PROP = [
  { id: "layout", nume: "Layout și poziționare" },
  { id: "cutie", nume: "Cutia elementului" },
  { id: "flex", nume: "Flexbox" },
  { id: "grid", nume: "Grid" },
  { id: "text", nume: "Text și tipografie" },
  { id: "animatie", nume: "Animații și tranziții" },
  { id: "vizual", nume: "Fundal și efecte vizuale" },
  { id: "unitati", nume: "Unități și valori" }
];

const PROPRIETATI = [
  /* ============================ LAYOUT ============================ */
  {
    grup: "layout",
    nume: "display",
    descriere: "Cea mai importantă proprietate de layout. Decide două lucruri deodată: cum se comportă elementul față de vecini (pe rând nou sau pe același rând) și ce reguli se aplică copiilor lui.",
    tags: ["display", "block", "inline", "inline-block", "flex", "grid", "none", "contents"],
    valori: [
      {
        val: "block",
        ce: "Ocupă toată lățimea disponibilă și forțează rând nou. Acceptă width, height, margin și padding pe toate direcțiile.",
        cand: "Implicit pentru div, p, h1-h6, section, main, footer. Îl setezi manual când vrei ca un link sau un span să umple tot rândul."
      },
      {
        val: "inline",
        ce: "Stă pe același rând cu textul din jur. IGNORĂ width și height, iar margin și padding pe verticală nu împing vecinii.",
        cand: "Implicit pentru span, a, b, i, em. Rar îl setezi tu — de obicei e problema, nu soluția."
      },
      {
        val: "inline-block",
        ce: "Stă pe același rând ca inline, dar acceptă width, height și margin pe verticală ca block.",
        cand: "Butoane pe un rând, elemente rotite cu transform, ::first-letter care trebuie să meargă. Dacă transform sau width nu au efect, asta lipsește."
      },
      {
        val: "flex",
        ce: "Elementul rămâne block, dar copiii lui se aranjează pe o singură axă (rând sau coloană), cu control asupra alinierii și distribuirii spațiului.",
        cand: "Bare de navigare, aliniere pe orizontală, centrare, elemente care trebuie să umple spațiul rămas."
      },
      {
        val: "inline-flex",
        ce: "La fel ca flex pentru copii, dar elementul însuși stă pe rând cu textul din jur.",
        cand: "Un buton cu iconiță plus text, pus în mijlocul unui paragraf."
      },
      {
        val: "grid",
        ce: "Copiii se aranjează într-o rețea cu rânduri și coloane definite dinainte. Control pe două axe simultan.",
        cand: "Layout de pagină, galerii, meniuri rearanjate, orice trebuie poziționat și pe orizontală și pe verticală."
      },
      {
        val: "inline-grid",
        ce: "Grid pentru copii, dar elementul stă pe rând cu textul.",
        cand: "Rar. O rețea mică inserată în text."
      },
      {
        val: "none",
        ce: "Elementul dispare complet. Nu ocupă spațiu, ca și cum nu ar exista în pagină.",
        cand: "Filtrare, ascunderea meniului pe mobil, ascunderea elementelor la print. Atenție: offsetParent devine null, deci se poate detecta din JavaScript."
      },
      {
        val: "contents",
        ce: "Cutia elementului dispare, dar copiii rămân și urcă un nivel în layout.",
        cand: "Tabele transpuse în grid, sau când un wrapper strică un flex/grid și nu ai voie să-l ștergi din HTML."
      },
      {
        val: "list-item",
        ce: "Ca block, dar primește și un bullet sau un număr.",
        cand: "Implicit pentru li. Îl setezi când vrei bullet pe un element care nu e li."
      },
      {
        val: "table, table-row, table-cell",
        ce: "Elementul se comportă ca un tabel, deși nu e.",
        cand: "Rar în cod modern. Util pentru centrare verticală în browsere vechi."
      },
      {
        val: "flow-root",
        ce: "Ca block, dar creează un context nou care conține elementele float din interior.",
        cand: "Când un container nu se întinde cât copiii lui pentru că sunt float. Înlocuiește vechiul clearfix."
      }
    ],
    exemple: [
      {
        explicatie: "Diferența dintre inline și inline-block: pe primul, width și rotirea nu au efect.",
        lang: "css",
        cod: `.nu-merge {
  display: inline;
  width: 200px;
  transform: rotate(90deg);
}

.merge {
  display: inline-block;
  width: 200px;
  transform: rotate(90deg);
}`
      }
    ],
    nota: "Regula practică: block ocupă rândul, inline stă în rând dar ignoră dimensiuni, inline-block face amândouă. flex și grid nu schimbă elementul, ci copiii lui."
  },
  {
    grup: "layout",
    nume: "Cum ascunzi un element",
    descriere: "Trei moduri care par la fel dar se comportă diferit. Alegerea greșită strică filtrarea sau layout-ul.",
    tags: ["display none", "visibility", "opacity", "hidden", "ascundere"],
    valori: [
      {
        val: "display: none",
        ce: "Dispare complet, nu ocupă spațiu. Nu se poate anima.",
        cand: "Filtrare, meniuri închise, elemente ascunse la print. offsetParent devine null."
      },
      {
        val: "visibility: hidden",
        ce: "Devine invizibil, dar spațiul lui rămâne gol în layout.",
        cand: "Când vrei să dispară fără să sară restul paginii. offsetParent rămâne setat."
      },
      {
        val: "opacity: 0",
        ce: "Transparent, dar ocupă spațiu ȘI rămâne clicabil.",
        cand: "Doar pentru animații de apariție/dispariție. Nu pentru ascundere reală."
      },
      {
        val: "hidden (atributul HTML)",
        ce: "Echivalent cu display: none, dar se setează din HTML sau JavaScript.",
        cand: "element.hidden = true, când nu vrei să atingi style-ul."
      }
    ],
    exemple: [
      {
        explicatie: "Pentru cerințele cu „produse vizibile”, doar display: none merge cu offsetParent.",
        lang: "js",
        cod: `p.style.display = "none";

const vizibile = Array.from(document.querySelectorAll(".produs"))
  .filter(function (p) { return p.offsetParent !== null; });`
      },
      {
        explicatie: "Dispariție animată: opacity plus visibility, cu delay pe a doua.",
        lang: "css",
        cod: `.panou {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s, visibility 0s;
}

.panou.ascuns {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0s 0.3s;
}`
      }
    ],
    nota: "display: none nu se poate anima, fiindcă nu are stări intermediare. De aceea combinația opacity + visibility."
  },
  {
    grup: "layout",
    nume: "position",
    descriere: "Decide față de ce se poziționează elementul când îi dai top, right, bottom, left.",
    tags: ["position", "static", "relative", "absolute", "fixed", "sticky"],
    valori: [
      {
        val: "static",
        ce: "Valoarea implicită. Elementul stă unde îl pune fluxul normal. top, left etc. sunt ignorate.",
        cand: "Nu îl scrii niciodată explicit, decât ca să anulezi o poziționare moștenită."
      },
      {
        val: "relative",
        ce: "Rămâne în flux (își păstrează spațiul), dar se poate deplasa față de poziția lui normală. Devine reper pentru copiii cu position: absolute.",
        cand: "Cel mai des ca reper pentru un copil absolut. De exemplu containerul barelor de hamburger."
      },
      {
        val: "absolute",
        ce: "Iese din flux (nu mai ocupă spațiu) și se poziționează față de cel mai apropiat părinte care NU e static.",
        cand: "Barele hamburgerului, un badge peste un card, un tooltip. Dacă niciun părinte nu e poziționat, se raportează la pagină."
      },
      {
        val: "fixed",
        ce: "Iese din flux și se poziționează față de fereastră. Rămâne pe loc la derulare.",
        cand: "Butonul de întors sus, containerul de comparare, mesajele temporare, meniul care rămâne vizibil."
      },
      {
        val: "sticky",
        ce: "Se comportă normal până când ajunge la limita dată (de exemplu top: 0), apoi se lipește acolo.",
        cand: "Antet de tabel care rămâne vizibil, bară de navigare care se lipește sus la derulare."
      }
    ],
    exemple: [
      {
        explicatie: "Reperul: părintele primește relative, copilul absolute.",
        lang: "css",
        cod: `.container {
  position: relative;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
}`
      },
      {
        explicatie: "sticky are nevoie de o valoare de prag, altfel nu face nimic.",
        lang: "css",
        cod: `thead th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}`
      }
    ],
    nota: "sticky nu merge dacă un părinte are overflow: hidden sau overflow: auto. E cea mai frecventă cauză când „nu se lipește”."
  },
  {
    grup: "layout",
    nume: "overflow",
    descriere: "Ce se întâmplă cu conținutul care nu încape în element.",
    tags: ["overflow", "scroll", "hidden", "auto", "clip"],
    valori: [
      { val: "visible", ce: "Implicit. Conținutul iese din cutie și se vede peste vecini.", cand: "Rar util intenționat." },
      { val: "hidden", ce: "Ce nu încape e tăiat și nu se poate derula.", cand: "Bannerul care se plimbă orizontal, ca să nu apară scroll pe pagină. Colțuri rotunjite pe imagini." },
      { val: "scroll", ce: "Apare bară de scroll întotdeauna, chiar dacă nu e nevoie.", cand: "Când vrei ca layout-ul să nu sară la apariția barei." },
      { val: "auto", ce: "Bară de scroll doar când conținutul depășește.", cand: "Cel mai des folosit. Tabele lungi, containere cu înălțime fixă." },
      { val: "clip", ce: "Ca hidden, dar interzice complet derularea, inclusiv din JavaScript.", cand: "Rar." }
    ],
    exemple: [
      {
        explicatie: "Se poate seta separat pe fiecare axă.",
        lang: "css",
        cod: `.container-tabel {
  overflow-x: auto;
  overflow-y: hidden;
}

.zona-lunga {
  max-height: 400px;
  overflow: auto;
}`
      }
    ],
    nota: "Orice valoare diferită de visible strică position: sticky pentru copii și tăie umbrele care ies din cutie."
  },
  {
    grup: "layout",
    nume: "z-index",
    descriere: "Ordinea în care se suprapun elementele. Numărul mai mare stă deasupra.",
    tags: ["z-index", "suprapunere", "stacking", "layer"],
    valori: [
      { val: "auto", ce: "Implicit. Ordinea e dată de poziția în HTML: ce vine mai jos stă deasupra.", cand: "Când nu ai suprapuneri complicate." },
      { val: "număr pozitiv", ce: "Ridică elementul peste cele cu valoare mai mică.", cand: "Butoane fixe, modale, tooltip-uri, antet lipit." },
      { val: "număr negativ", ce: "Trimite elementul în spatele conținutului normal.", cand: "Video sau imagine folosită ca fundal de pagină." }
    ],
    exemple: [
      {
        explicatie: "Scară de valori pe care merită să o păstrezi consecventă.",
        lang: "css",
        cod: `.video-fundal { z-index: -1; }
.antet-lipit  { z-index: 10; }
.buton-fix    { z-index: 50; }
.modal        { z-index: 100; }`
      }
    ],
    nota: "z-index nu are efect pe elemente cu position: static. Dacă „nu funcționează”, aproape sigur asta e cauza."
  },

  /* ============================ CUTIE ============================ */
  {
    grup: "cutie",
    nume: "box-sizing",
    descriere: "Decide dacă width include sau nu padding-ul și borderul.",
    tags: ["box-sizing", "border-box", "content-box", "width", "padding"],
    valori: [
      {
        val: "content-box",
        ce: "Implicit. width e doar conținutul. Padding-ul și borderul se ADAUGĂ peste. Un element cu width 200px și padding 20px ocupă 240px.",
        cand: "Aproape niciodată intenționat."
      },
      {
        val: "border-box",
        ce: "width include padding-ul și borderul. Un element cu width 200px ocupă exact 200px, indiferent de padding.",
        cand: "Practic mereu. Se pune o singură dată, la începutul fișierului de stil."
      }
    ],
    exemple: [
      {
        explicatie: "Linia care se pune în orice proiect, la început.",
        lang: "css",
        cod: `*, *::before, *::after {
  box-sizing: border-box;
}`
      }
    ],
    nota: "Dacă două elemente cu width: 50% nu încap pe același rând, cauza e content-box plus padding."
  },
  {
    grup: "cutie",
    nume: "margin vs. padding",
    descriere: "Spațiul din exteriorul cutiei față de spațiul din interior.",
    tags: ["margin", "padding", "spatiere", "auto", "colapsare"],
    valori: [
      { val: "margin", ce: "Spațiu ÎN AFARA cutiei, între element și vecini. Nu are culoare de fundal.", cand: "Distanța dintre elemente." },
      { val: "padding", ce: "Spațiu ÎN INTERIORUL cutiei, între conținut și margine. Preia fundalul elementului.", cand: "Distanța dintre text și chenar." },
      { val: "margin: auto", ce: "Împarte egal spațiul rămas. Pe orizontală, centrează elementul.", cand: "Centrarea unui element cu lățime fixă." },
      { val: "margin negativ", ce: "Trage elementul spre exterior, peste vecini.", cand: "Rar, când vrei să scoți un element din padding-ul containerului." }
    ],
    exemple: [
      {
        explicatie: "Ordinea valorilor scurte: sus, dreapta, jos, stânga (în sens orar).",
        lang: "css",
        cod: `padding: 10px;
padding: 10px 20px;
padding: 10px 20px 30px;
padding: 10px 20px 30px 40px;

margin: 0 auto;`
      }
    ],
    nota: "Marginile verticale a două elemente vecine se contopesc (colapsare): 20px lângă 30px dă 30px, nu 50px. Padding-ul nu face asta niciodată."
  },
  {
    grup: "cutie",
    nume: "width, min-width, max-width",
    descriere: "Cele trei lucrează împreună; min și max au prioritate față de width.",
    tags: ["width", "min-width", "max-width", "height", "responsive"],
    valori: [
      { val: "width: 100%", ce: "Cât părintele.", cand: "Elemente care umplu containerul." },
      { val: "max-width", ce: "Limită superioară. Elementul nu crește peste ea, oricât spațiu ar fi.", cand: "Imagini care nu trebuie să devină uriașe, text cu lungime de rând confortabilă." },
      { val: "min-width", ce: "Limită inferioară. Elementul nu scade sub ea.", cand: "Butoane care nu trebuie să se strângă, coloane de tabel." },
      { val: "height: auto", ce: "Înălțimea se ia din conținut.", cand: "Pe imagini, împreună cu width, ca să păstreze proporțiile." },
      { val: "min-height: 100vh", ce: "Cel puțin cât înălțimea ferestrei.", cand: "Pagini cu conținut puțin, ca subsolul să ajungă jos." }
    ],
    exemple: [
      {
        explicatie: "Combinația cerută la etapa 2 pentru elementele media.",
        lang: "css",
        cod: `img, video {
  width: 100%;
  max-width: 600px;
  min-width: 200px;
  height: auto;
}`
      }
    ],
    nota: "max-width câștigă în fața lui width. min-width câștigă în fața lui max-width."
  },
  {
    grup: "cutie",
    nume: "border și border-radius",
    descriere: "Chenarul și rotunjirea colțurilor.",
    tags: ["border", "border-radius", "outline", "chenar", "rotunjit"],
    valori: [
      { val: "border", ce: "Grosime, stil, culoare. Ocupă spațiu și mută layout-ul.", cand: "Chenare obișnuite." },
      { val: "outline", ce: "Ca border, dar NU ocupă spațiu și nu mută nimic.", cand: "Marcarea elementului focalizat, sau depanare vizuală." },
      { val: "border-radius: 50%", ce: "Cerc, dacă elementul e pătrat. Elipsă altfel.", cand: "Avatare, butoane rotunde." },
      { val: "border-radius cu 4 valori", ce: "Colțuri diferite: stânga-sus, dreapta-sus, dreapta-jos, stânga-jos.", cand: "Forme asimetrice, bule de chat." },
      { val: "border cu transparent", ce: "Bordurile transparente combinate cu lățime și înălțime zero desenează un triunghi.", cand: "Săgeți, indicatoare." }
    ],
    exemple: [
      {
        explicatie: "Triunghiul din CSS.",
        lang: "css",
        cod: `#triunghi {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid navy;
}`
      },
      {
        explicatie: "Colțuri diferite.",
        lang: "css",
        cod: `.bula {
  border-radius: 12px 12px 12px 2px;
}`
      }
    ],
    nota: "Pentru depanare, outline e mai bun decât border: arată unde e elementul fără să miște nimic în pagină."
  },

  /* ============================ FLEX ============================ */
  {
    grup: "flex",
    nume: "flex-direction",
    descriere: "Stabilește axa principală. De ea depinde ce fac justify-content și align-items.",
    tags: ["flex-direction", "row", "column", "axa", "reverse"],
    valori: [
      { val: "row", ce: "Implicit. Copiii pe orizontală, de la stânga la dreapta. Axa principală e orizontala.", cand: "Bare, meniuri, butoane pe un rând." },
      { val: "column", ce: "Copiii pe verticală. Axa principală devine verticala.", cand: "Formulare, liste, layout de pagină pe mobil." },
      { val: "row-reverse", ce: "Orizontal, dar de la dreapta la stânga.", cand: "Inversarea ordinii fără să atingi HTML-ul." },
      { val: "column-reverse", ce: "Vertical, de jos în sus.", cand: "Liste de mesaje, unde ultimul apare primul." }
    ],
    exemple: [
      {
        explicatie: "Când direcția e column, justify-content aliniază pe verticală, iar align-items pe orizontală. Se inversează.",
        lang: "css",
        cod: `.orizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}`
      }
    ],
    nota: "justify-content lucrează pe axa PRINCIPALĂ, align-items pe cea perpendiculară. Dacă alinierea pare inversată, verifică flex-direction."
  },
  {
    grup: "flex",
    nume: "justify-content",
    descriere: "Distribuie copiii pe axa principală.",
    tags: ["justify-content", "space-between", "center", "flex-start", "distribuire"],
    valori: [
      { val: "flex-start", ce: "Implicit. Toți la începutul axei.", cand: "Comportament normal." },
      { val: "center", ce: "Grupați la mijloc.", cand: "Centrare orizontală." },
      { val: "flex-end", ce: "Grupați la sfârșit.", cand: "Butoane aliniate în dreapta." },
      { val: "space-between", ce: "Primul lipit de început, ultimul de sfârșit, restul distribuiți egal între ele. Fără spațiu la capete.", cand: "Logo în stânga, meniu în dreapta." },
      { val: "space-around", ce: "Fiecare element primește spațiu egal în jur, deci la capete rămâne jumătate.", cand: "Rar. Spațiul inegal la capete arată ciudat." },
      { val: "space-evenly", ce: "Toate spațiile egale, inclusiv la capete.", cand: "Distribuire uniformă adevărată." }
    ],
    exemple: [
      {
        explicatie: "Cea mai folosită combinație pentru o bară.",
        lang: "css",
        cod: `.bara {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`
      }
    ]
  },
  {
    grup: "flex",
    nume: "align-items și align-self",
    descriere: "Aliniază copiii pe axa perpendiculară. align-self face excepție pentru un singur copil.",
    tags: ["align-items", "align-self", "stretch", "baseline", "center"],
    valori: [
      { val: "stretch", ce: "Implicit. Copiii se întind să umple înălțimea containerului.", cand: "Coloane cu aceeași înălțime." },
      { val: "center", ce: "Centrați pe axa perpendiculară.", cand: "Centrare verticală într-o bară." },
      { val: "flex-start", ce: "Lipiți sus (la row) sau stânga (la column).", cand: "Elemente de înălțimi diferite, aliniate la vârf." },
      { val: "flex-end", ce: "Lipiți jos.", cand: "Aliniere la bază." },
      { val: "baseline", ce: "Aliniere după linia de bază a textului, nu după cutie.", cand: "Texte de dimensiuni diferite pe același rând." },
      { val: "align-self", ce: "Suprascrie align-items pentru un singur copil.", cand: "Un element care trebuie să iasă din tipar." }
    ],
    exemple: [
      {
        explicatie: "Centrare completă, pe ambele axe, în două linii.",
        lang: "css",
        cod: `.centrat {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`
      }
    ]
  },
  {
    grup: "flex",
    nume: "flex (grow, shrink, basis)",
    descriere: "Cum se împarte spațiul între copii: cine crește, cine se strânge, de la ce dimensiune pornesc.",
    tags: ["flex", "flex-grow", "flex-shrink", "flex-basis", "spatiu"],
    valori: [
      { val: "flex: 1", ce: "Prescurtare pentru grow 1, shrink 1, basis 0. Elementul umple tot spațiul rămas.", cand: "Caseta de căutare dintr-o bară, coloana principală." },
      { val: "flex: 0 0 auto", ce: "Nu crește, nu se strânge, păstrează dimensiunea din conținut.", cand: "Butoane, iconițe care trebuie să rămână la fel." },
      { val: "flex-grow", ce: "Cât din spațiul RĂMAS primește. 2 înseamnă de două ori cât unul cu 1.", cand: "Coloane cu proporții diferite." },
      { val: "flex-shrink", ce: "Cât se strânge când nu e loc. 0 înseamnă că nu se strânge deloc.", cand: "Elemente care nu au voie să se micșoreze." },
      { val: "flex-basis", ce: "Dimensiunea de pornire, înainte de împărțirea spațiului.", cand: "Ca alternativă la width în flex." }
    ],
    exemple: [
      {
        explicatie: "Bara clasică: căutarea se întinde, butoanele nu.",
        lang: "css",
        cod: `.cautare { flex: 1; }
.buton   { flex: 0 0 auto; }`
      }
    ]
  },
  {
    grup: "flex",
    nume: "flex-wrap și gap",
    descriere: "Dacă elementele trec pe rând nou și cât spațiu rămâne între ele.",
    tags: ["flex-wrap", "wrap", "nowrap", "gap", "row-gap", "column-gap"],
    valori: [
      { val: "nowrap", ce: "Implicit. Totul pe un rând, elementele se strâng ca să încapă.", cand: "Bare care nu trebuie să se rupă." },
      { val: "wrap", ce: "Elementele trec pe rând nou când nu mai încap.", cand: "Liste de etichete, carduri, orice trebuie să fie responsive." },
      { val: "gap", ce: "Spațiu între elemente, fără margin. Nu adaugă spațiu la capete.", cand: "Mereu, în locul lui margin pe copii." },
      { val: "gap: 1rem 2rem", ce: "Prima valoare e între rânduri, a doua între coloane.", cand: "Spațiere diferită pe cele două axe." }
    ],
    exemple: [
      {
        explicatie: "gap funcționează identic în flex și în grid.",
        lang: "css",
        cod: `.etichete {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}`
      }
    ],
    nota: "gap e mai bun decât margin pe copii, fiindcă nu lasă spațiu în plus la marginile containerului."
  },

  /* ============================ GRID ============================ */
  {
    grup: "grid",
    nume: "grid-template-columns",
    descriere: "Definește coloanele rețelei. De aici pleacă tot restul.",
    tags: ["grid-template-columns", "fr", "repeat", "minmax", "auto-fit", "auto-fill"],
    valori: [
      { val: "1fr 1fr 1fr", ce: "Trei coloane egale, care împart spațiul disponibil.", cand: "Rețele simple." },
      { val: "200px 1fr", ce: "Prima fixă, a doua ia tot restul.", cand: "Bară laterală plus conținut." },
      { val: "auto 1fr auto", ce: "Prima și ultima cât au nevoie, mijlocul se întinde.", cand: "Bară cu logo, titlu și butoane." },
      { val: "repeat(3, 1fr)", ce: "Scurtătură pentru trei coloane egale.", cand: "Când numărul e cunoscut." },
      { val: "repeat(auto-fit, minmax(220px, 1fr))", ce: "Câte coloane de minim 220px încap, atâtea se fac. Coloanele goale dispar.", cand: "Galerii și liste de carduri, fără media query." },
      { val: "repeat(auto-fill, minmax(220px, 1fr))", ce: "La fel, dar coloanele goale se păstrează.", cand: "Când vrei ca elementele să nu se întindă când sunt puține." }
    ],
    exemple: [
      {
        explicatie: "Galerie responsive dintr-o singură linie.",
        lang: "css",
        cod: `.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}`
      }
    ],
    nota: "fr înseamnă „fracțiune din spațiul rămas”. Nu poate fi folosit în afara grid-ului."
  },
  {
    grup: "grid",
    nume: "grid-area, grid-row, grid-column",
    descriere: "Unde se așază un anumit element în rețea.",
    tags: ["grid-area", "grid-row", "grid-column", "span", "pozitie"],
    valori: [
      { val: "grid-column: span 2", ce: "Ocupă două coloane, pornind de unde ar fi ajuns normal.", cand: "Un card mai lat printre altele." },
      { val: "grid-row: 1 / 3", ce: "De la linia 1 la linia 3, deci două rânduri. Poziție absolută în rețea.", cand: "Primul buton din meniu, care ține cât două rânduri." },
      { val: "grid-area: 1 / 1 / 3 / 2", ce: "Toate patru deodată: rând-start, coloană-start, rând-final, coloană-final.", cand: "Poziționare exactă a fiecărui element." },
      { val: "grid-area: nume", ce: "Plasare într-o zonă denumită din grid-template-areas.", cand: "Layout de pagină, ușor de rearanjat pe mobil." }
    ],
    exemple: [
      {
        explicatie: "Meniul cu primul buton mare.",
        lang: "css",
        cod: `nav > ul > li:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }
nav > ul > li:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
nav > ul > li:nth-child(3) { grid-area: 1 / 3 / 2 / 4; }
nav > ul > li:nth-child(4) { grid-area: 2 / 2 / 3 / 3; }
nav > ul > li:nth-child(5) { grid-area: 2 / 3 / 3 / 4; }`
      }
    ],
    nota: "Liniile se numără de la 1, iar o rețea cu 3 coloane are 4 linii verticale. De aceea ultima coloană se termină la linia 4."
  },
  {
    grup: "grid",
    nume: "grid-template-areas",
    descriere: "Desenezi layout-ul în text, cu nume de zone. Cel mai lizibil mod de a face un layout de pagină.",
    tags: ["grid-template-areas", "layout", "zone", "responsive"],
    valori: [
      { val: "un cuvânt", ce: "O celulă cu numele respectiv.", cand: "Fiecare zonă a paginii." },
      { val: "același cuvânt repetat", ce: "Zona se întinde peste celulele respective.", cand: "Antet care ocupă toate coloanele." },
      { val: "punct (.)", ce: "Celulă goală, fără conținut.", cand: "Spații intenționate în rețea." }
    ],
    exemple: [
      {
        explicatie: "Layout de pagină și rearanjarea lui pe mobil, fără să atingi regulile elementelor.",
        lang: "css",
        cod: `body {
  display: grid;
  grid-template-areas:
    "antet    antet"
    "lateral  continut"
    "subsol   subsol";
  grid-template-columns: 250px 1fr;
}

header { grid-area: antet; }
aside  { grid-area: lateral; }
main   { grid-area: continut; }
footer { grid-area: subsol; }

@media (max-width: 800px) {
  body {
    grid-template-areas: "antet" "continut" "lateral" "subsol";
    grid-template-columns: 1fr;
  }
}`
      }
    ]
  },
  {
    grup: "grid",
    nume: "Flex sau grid?",
    descriere: "Amândouă aranjează elemente, dar rezolvă probleme diferite.",
    tags: ["flex", "grid", "diferenta", "cand", "alegere"],
    valori: [
      { val: "flex", ce: "O singură axă. Elementele își decid singure dimensiunea, containerul le distribuie.", cand: "Bare, meniuri simple, aliniere, elemente pe un rând care trebuie să umple spațiul." },
      { val: "grid", ce: "Două axe simultan. Containerul definește rețeaua, elementele se așază în ea.", cand: "Layout de pagină, galerii, meniuri rearanjate, orice are și rânduri și coloane." },
      { val: "amândouă", ce: "Se combină des: grid pentru structura mare, flex pentru interiorul fiecărei celule.", cand: "Cardurile dintr-o galerie: grid pentru galerie, flex în interiorul cardului." }
    ],
    exemple: [
      {
        explicatie: "Combinația obișnuită.",
        lang: "css",
        cod: `.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}`
      }
    ],
    nota: "Regula scurtă: dacă desenezi layout-ul pe hârtie și are rânduri ȘI coloane, e grid. Dacă e o linie de elemente, e flex."
  },

  /* ============================ TEXT ============================ */
  {
    grup: "text",
    nume: "white-space",
    descriere: "Cum se tratează spațiile și trecerea pe rând nou.",
    tags: ["white-space", "nowrap", "pre", "pre-wrap", "spatii"],
    valori: [
      { val: "normal", ce: "Implicit. Spațiile multiple devin unul singur, textul trece pe rând nou când nu încape.", cand: "Text obișnuit." },
      { val: "nowrap", ce: "Textul nu trece niciodată pe rând nou, oricât ar fi de lung.", cand: "Bannere care se plimbă, celule de tabel care nu trebuie rupte, butoane." },
      { val: "pre", ce: "Păstrează spațiile și rândurile exact ca în cod. Nu rupe rândurile.", cand: "Blocuri de cod." },
      { val: "pre-wrap", ce: "Păstrează spațiile și rândurile, dar rupe rândurile lungi.", cand: "Cod care trebuie să încapă în lățime." },
      { val: "pre-line", ce: "Comprimă spațiile, dar păstrează rândurile noi.", cand: "Text introdus de utilizator într-un textarea." }
    ],
    exemple: [
      {
        explicatie: "Text scurtat cu trei puncte când nu încape.",
        lang: "css",
        cod: `.scurtat {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`
      }
    ],
    nota: "text-overflow: ellipsis nu funcționează fără nowrap și overflow: hidden. Toate trei sunt necesare."
  },
  {
    grup: "text",
    nume: "writing-mode",
    descriere: "Direcția în care curge textul. Schimbă și forma cutiei, nu doar aspectul.",
    tags: ["writing-mode", "vertical", "text-orientation", "rotate"],
    valori: [
      { val: "horizontal-tb", ce: "Implicit. Text pe orizontală, rândurile se adaugă de sus în jos.", cand: "Text normal." },
      { val: "vertical-rl", ce: "Text pe verticală, coloanele se adaugă de la dreapta la stânga. Cutia devine îngustă și înaltă.", cand: "Etichete verticale, dreptunghiuri cu text rotit care nu trebuie să se suprapună." },
      { val: "vertical-lr", ce: "La fel, dar coloanele merg de la stânga la dreapta.", cand: "Rar." },
      { val: "text-orientation: upright", ce: "Literele rămân drepte în textul vertical, în loc să fie culcate.", cand: "Text vertical citibil literă cu literă." }
    ],
    exemple: [
      {
        explicatie: "Diferența față de rotate: writing-mode schimbă și dimensiunea cutiei, deci vecinii se dau la o parte.",
        lang: "css",
        cod: `.vertical {
  writing-mode: vertical-rl;
}

.rotit {
  display: inline-block;
  transform: rotate(90deg);
}`
      }
    ],
    nota: "Dacă cerința spune „să nu se suprapună cu alte elemente”, folosește writing-mode, nu transform: rotate."
  },
  {
    grup: "text",
    nume: "text-align, vertical-align, line-height",
    descriere: "Trei proprietăți de aliniere a textului care se confundă des.",
    tags: ["text-align", "vertical-align", "line-height", "aliniere", "centrare"],
    valori: [
      { val: "text-align", ce: "Aliniază textul (și elementele inline) pe orizontală, în interiorul unui bloc.", cand: "Titluri centrate, text la dreapta." },
      { val: "text-align: justify", ce: "Întinde rândurile ca ambele margini să fie drepte.", cand: "Text pe coloane, ca în ziar." },
      { val: "vertical-align", ce: "Aliniază elemente INLINE față de linia de bază. NU centrează vertical un bloc.", cand: "Iconițe lângă text, indici și exponenți." },
      { val: "line-height", ce: "Înălțimea unui rând. Fără unitate înseamnă multiplu al fontului.", cand: "1.5 sau 1.6 pentru text lung. Egal cu înălțimea elementului, pentru centrare pe un singur rând." }
    ],
    exemple: [
      {
        explicatie: "Centrare verticală: flex e soluția, nu vertical-align.",
        lang: "css",
        cod: `.centrat {
  display: flex;
  align-items: center;
  justify-content: center;
}

.buton-un-rand {
  height: 40px;
  line-height: 40px;
  text-align: center;
}`
      }
    ],
    nota: "line-height: 1.5 e mai bun decât 150% sau 24px, fiindcă se recalculează corect pentru copiii cu alt font-size."
  },
  {
    grup: "text",
    nume: "font-size și unitățile de font",
    descriere: "Cum se calculează dimensiunea textului și de ce em și rem nu sunt la fel.",
    tags: ["font-size", "em", "rem", "px", "%", "clamp"],
    valori: [
      { val: "px", ce: "Valoare fixă, nu se schimbă niciodată.", cand: "Chenare, umbre. Nu pentru text, fiindcă ignoră setările utilizatorului." },
      { val: "em", ce: "Relativ la fontul PĂRINTELUI. Se acumulează: un em în em în em se înmulțește.", cand: "Padding proporțional cu textul elementului, ::first-letter de două ori mai mare." },
      { val: "rem", ce: "Relativ la fontul rădăcinii (html). Nu se acumulează.", cand: "Dimensiuni de text și spațiere în tot site-ul." },
      { val: "%", ce: "Ca em, relativ la părinte.", cand: "Rar pentru font." },
      { val: "clamp(min, ideal, max)", ce: "Se adaptează între două limite.", cand: "Titluri care cresc cu ecranul, fără media query." }
    ],
    exemple: [
      {
        explicatie: "Capcana lui em: acumularea.",
        lang: "css",
        cod: `.parinte { font-size: 20px; }
.copil   { font-size: 0.5em; }
.nepot   { font-size: 0.5em; }`
      },
      {
        explicatie: "Titlu care se adaptează singur.",
        lang: "css",
        cod: `h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}`
      }
    ],
    nota: "În exemplul de mai sus, nepotul ajunge la 5px, nu la 10px. Cu rem, ambele ar fi fost la fel."
  },
  {
    grup: "text",
    nume: "text-decoration și text-transform",
    descriere: "Sublinieri, tăieri și schimbarea literelor mari și mici.",
    tags: ["text-decoration", "underline", "line-through", "text-transform", "uppercase"],
    valori: [
      { val: "text-decoration: underline", ce: "Subliniere.", cand: "Linkuri, sau cerințe explicite." },
      { val: "text-decoration-color", ce: "Culoarea liniei, independentă de culoarea textului.", cand: "Cerințe de tip „subliniat cu roșu”, dar textul rămâne negru." },
      { val: "text-decoration: none", ce: "Scoate sublinierea implicită.", cand: "Linkuri stilizate ca butoane." },
      { val: "line-through", ce: "Taie textul.", cand: "Prețuri vechi. Deși tagul <s> face asta singur." },
      { val: "text-transform: uppercase", ce: "Afișează cu majuscule fără să schimbe textul din HTML.", cand: "Etichete. Textul rămâne căutabil în forma originală." },
      { val: "capitalize", ce: "Prima literă a fiecărui cuvânt devine majusculă.", cand: "Nume, titluri." }
    ],
    exemple: [
      {
        explicatie: "Subliniere de altă culoare decât textul.",
        lang: "css",
        cod: `.primul-buton {
  text-decoration: underline;
  text-decoration-color: red;
  text-decoration-thickness: 2px;
}`
      }
    ]
  },

  /* ============================ ANIMATIE ============================ */
  {
    grup: "animatie",
    nume: "@keyframes",
    descriere: "Definește cadrele unei animații. Se declară o dată și se poate folosi pe oricâte elemente.",
    tags: ["keyframes", "animation", "cadre", "from", "to", "procente"],
    valori: [
      { val: "from / to", ce: "Două cadre: start și final. Echivalent cu 0% și 100%.", cand: "Animații simple, cu o singură schimbare." },
      { val: "0% 50% 100%", ce: "Oricâte cadre intermediare. Cerințele cer de obicei minim 3.", cand: "Animații cu mai multe etape sau mai multe proprietăți." },
      { val: "doar to", ce: "Se poate scrie doar cadrul final; browserul folosește starea curentă ca început.", cand: "Rotire continuă: to { transform: rotate(360deg); }" },
      { val: "mai multe procente pe același cadru", ce: "0%, 50% { ... } aplică aceleași valori în ambele momente.", cand: "Pauze în animație." }
    ],
    exemple: [
      {
        explicatie: "Cea mai simplă: două cadre.",
        lang: "css",
        cod: `@keyframes schimbaCuloare {
  from { color: red; }
  to   { color: blue; }
}`
      },
      {
        explicatie: "Trei cadre, cu mai multe proprietăți schimbate — formatul cerut de obicei în enunțuri.",
        lang: "css",
        cod: `@keyframes intrare {
  0% {
    opacity: 0;
    transform: translateY(-20px) rotate(-15deg);
    background: red;
  }
  50% {
    opacity: 0.6;
    transform: translateY(5px) rotate(5deg);
    background: orange;
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0);
    background: navy;
  }
}`
      },
      {
        explicatie: "Rotire continuă, cu un singur cadru declarat.",
        lang: "css",
        cod: `@keyframes rotire {
  to { transform: rotate(360deg); }
}`
      }
    ],
    nota: "Numele animației e ales de tine și nu are legătură cu numele clasei. Nu se poate anima display, dar se pot anima opacity, transform, culorile, dimensiunile."
  },
  {
    grup: "animatie",
    nume: "Proprietățile lui animation",
    descriere: "Prescurtarea animation ascunde opt proprietăți. Ordinea lor în scriere nu contează, în afară de cele două durate.",
    tags: ["animation", "duration", "iteration-count", "direction", "fill-mode", "delay", "infinite", "alternate"],
    valori: [
      { val: "animation-name", ce: "Numele din @keyframes.", cand: "Obligatoriu." },
      { val: "animation-duration", ce: "Cât durează o repetare. Prima valoare de timp din prescurtare.", cand: "Obligatoriu; fără ea animația nu pornește." },
      { val: "animation-timing-function", ce: "Ritmul: linear (uniform), ease (implicit, accelerează și încetinește), ease-in, ease-out, steps(n).", cand: "linear pentru rotiri continue, ease-out pentru apariții." },
      { val: "animation-delay", ce: "Cât așteaptă înainte să pornească. A DOUA valoare de timp din prescurtare.", cand: "Bare care pornesc succesiv." },
      { val: "animation-iteration-count", ce: "De câte ori se repetă. infinite înseamnă fără oprire.", cand: "infinite pentru pulsații și rotiri." },
      { val: "animation-direction", ce: "normal, reverse, alternate (dus-întors), alternate-reverse.", cand: "alternate pentru schimbări de culoare care trebuie să fie line în ambele sensuri." },
      { val: "animation-fill-mode", ce: "forwards păstrează starea finală, backwards aplică starea inițială în timpul delay-ului, both le face pe amândouă.", cand: "forwards când animația nu trebuie să sară înapoi la final." },
      { val: "animation-play-state", ce: "running sau paused.", cand: "Oprirea animației la hover." }
    ],
    exemple: [
      {
        explicatie: "Prescurtarea și varianta desfășurată sunt echivalente.",
        lang: "css",
        cod: `.element {
  animation: schimbaCuloare 1s infinite alternate;
}

.element {
  animation-name: schimbaCuloare;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}`
      },
      {
        explicatie: "Cu delay: prima durată e durata, a doua e întârzierea.",
        lang: "css",
        cod: `.bara {
  animation: apare 0.6s ease-out 300ms both;
}`
      },
      {
        explicatie: "Două animații pe același element, separate prin virgulă.",
        lang: "css",
        cod: `.tort {
  animation:
    topaie 0.6s infinite,
    schimbaCuloare 1s infinite alternate;
}`
      },
      {
        explicatie: "Oprirea la hover.",
        lang: "css",
        cod: `.banner:hover {
  animation-play-state: paused;
}`
      }
    ],
    nota: "Dacă animația se termină și elementul sare brusc înapoi la starea inițială, îți lipsește forwards sau both."
  },
  {
    grup: "animatie",
    nume: "transition vs. animation",
    descriere: "Amândouă fac schimbări line, dar pornesc altfel și au posibilități diferite.",
    tags: ["transition", "animation", "hover", "diferenta", "keyframes"],
    valori: [
      { val: "transition", ce: "Trece lin între două stări. Are nevoie de un declanșator: hover, focus, o clasă adăugată din JavaScript. Doar start și final, fără cadre intermediare.", cand: "Hover, focus, deschiderea unui panou, orice reacție la o acțiune." },
      { val: "animation", ce: "Rulează singură, fără declanșator. Poate avea oricâte cadre, se poate repeta la infinit, poate merge dus-întors.", cand: "Pulsații, rotiri continue, bannere, apariții la încărcarea paginii." }
    ],
    exemple: [
      {
        explicatie: "transition se pune pe starea NORMALĂ, nu pe :hover. Altfel creșterea e lină, dar revenirea e bruscă.",
        lang: "css",
        cod: `.buton {
  transition: transform 2s, background-color 0.3s;
}

.buton:hover {
  transform: scale(2);
  background-color: gold;
}`
      },
      {
        explicatie: "Valorile lui transition: proprietate, durată, ritm, întârziere.",
        lang: "css",
        cod: `transition: all 0.3s;
transition: transform 2s ease-out;
transition: opacity 0.3s, visibility 0s 0.3s;`
      }
    ],
    nota: "transition: all e comod dar animează și proprietăți nedorite. E mai sigur să enumeri exact ce vrei."
  },
  {
    grup: "animatie",
    nume: "transform",
    descriere: "Mută, rotește, scalează sau înclină un element, fără să afecteze layout-ul din jur.",
    tags: ["transform", "rotate", "scale", "translate", "skew", "transform-origin"],
    valori: [
      { val: "translate(x, y)", ce: "Mută elementul. Procentele sunt raportate la propria dimensiune.", cand: "Bannere care se plimbă, centrare, mici ajustări." },
      { val: "rotate(deg)", ce: "Rotește în jurul punctului dat de transform-origin.", cand: "Text rotit, iconițe, săgeți." },
      { val: "scale(n)", ce: "Mărește sau micșorează. scale(2) dublează pe ambele axe.", cand: "Creștere la hover, efect de zoom." },
      { val: "scaleY(-1)", ce: "Oglindește pe verticală.", cand: "Efectul de reflexie." },
      { val: "skew(deg)", ce: "Înclină elementul.", cand: "Rar, efecte decorative." },
      { val: "transform-origin", ce: "Punctul în jurul căruia se face transformarea. Implicit e centrul.", cand: "Când rotirea iese din cadru sau nu pivotează de unde trebuie." }
    ],
    exemple: [
      {
        explicatie: "Mai multe transformări deodată, într-o singură declarație. Ordinea contează.",
        lang: "css",
        cod: `.element {
  transform: translate(10px, 20px) rotate(15deg) scale(1.2);
}`
      },
      {
        explicatie: "O a doua declarație transform NU se adaugă, ci o înlocuiește pe prima.",
        lang: "css",
        cod: `.gresit {
  transform: rotate(45deg);
  transform: scale(2);
}

.corect {
  transform: rotate(45deg) scale(2);
}`
      }
    ],
    nota: "transform nu are efect pe elemente cu display: inline. Adaugă inline-block sau block."
  },

  /* ============================ VIZUAL ============================ */
  {
    grup: "vizual",
    nume: "background",
    descriere: "Prescurtare pentru mai multe proprietăți de fundal. Cel mai des ai nevoie de trei dintre ele.",
    tags: ["background", "background-size", "cover", "contain", "background-attachment", "background-position"],
    valori: [
      { val: "background-color", ce: "Culoare plină.", cand: "Zone, butoane, carduri." },
      { val: "background-image: url(...)", ce: "Imagine de fundal. Calea e relativă la fișierul CSS, nu la pagină.", cand: "Fundaluri decorative." },
      { val: "background-size: cover", ce: "Imaginea acoperă toată zona, tăind ce depășește. Păstrează proporțiile.", cand: "Fundaluri de secțiune, imagini de erou." },
      { val: "background-size: contain", ce: "Imaginea încape întreagă, lăsând spațiu gol dacă proporțiile nu se potrivesc.", cand: "Logo-uri, imagini care nu au voie să fie tăiate." },
      { val: "background-attachment: fixed", ce: "Imaginea rămâne pe loc la derulare.", cand: "Efectul de fundal fix cerut la etapa 5." },
      { val: "background-position: center", ce: "Ce parte a imaginii se vede când e tăiată.", cand: "Aproape mereu împreună cu cover." },
      { val: "background-repeat: no-repeat", ce: "Oprește repetarea imaginii.", cand: "Aproape mereu, pentru imagini mari." },
      { val: "linear-gradient(...)", ce: "Degrade. Se folosește în locul unei imagini.", cand: "Fundaluri, măști pentru efectul de reflexie." }
    ],
    exemple: [
      {
        explicatie: "Combinația obișnuită pentru o secțiune cu fundal.",
        lang: "css",
        cod: `.sectiune {
  background-image: url("/resurse/imagini/fundal.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}`
      }
    ]
  },
  {
    grup: "vizual",
    nume: "object-fit",
    descriere: "Ca background-size, dar pentru taguri img și video reale.",
    tags: ["object-fit", "cover", "contain", "img", "video", "object-position"],
    valori: [
      { val: "fill", ce: "Implicit. Deformează imaginea ca să umple exact cutia.", cand: "Aproape niciodată." },
      { val: "cover", ce: "Umple cutia, taie ce depășește, păstrează proporțiile.", cand: "Imagini de card care trebuie să aibă toate aceeași dimensiune." },
      { val: "contain", ce: "Încape întreagă, cu spațiu gol în jur.", cand: "Logo-uri, imagini de produs care nu au voie tăiate." },
      { val: "none", ce: "Dimensiunea originală, tăiată de cutie.", cand: "Rar." },
      { val: "object-position", ce: "Ce parte se vede când imaginea e tăiată.", cand: "Ca să nu se taie capul din poze." }
    ],
    exemple: [
      {
        explicatie: "Imagini de dimensiuni diferite, afișate uniform într-o galerie.",
        lang: "css",
        cod: `figure img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}`
      }
    ],
    nota: "Diferența față de background-size: object-fit funcționează pe conținutul real al unui img, deci imaginea rămâne accesibilă și are alt."
  },
  {
    grup: "vizual",
    nume: "filter și mix-blend-mode",
    descriere: "Efecte aplicate peste elemente și moduri de combinare a straturilor.",
    tags: ["filter", "grayscale", "blur", "mix-blend-mode", "duotone", "opacity"],
    valori: [
      { val: "grayscale(100%)", ce: "Alb-negru.", cand: "Baza pentru efectul duotone, imagini dezactivate." },
      { val: "blur(5px)", ce: "Neclaritate.", cand: "Fundaluri în spatele unui modal." },
      { val: "brightness / contrast / saturate", ce: "Ajustări de luminozitate, contrast, saturație.", cand: "Corecții pe hover." },
      { val: "drop-shadow", ce: "Umbră care urmează forma reală, nu cutia. Merge pe PNG-uri transparente.", cand: "Iconițe, imagini decupate." },
      { val: "mix-blend-mode", ce: "Cum se combină elementul cu ce e sub el: multiply, screen, overlay și altele.", cand: "Duotone, texte peste imagini." }
    ],
    exemple: [
      {
        explicatie: "Efectul duotone: imagine alb-negru plus un strat colorat peste.",
        lang: "css",
        cod: `.duotone {
  position: relative;
  display: inline-block;
}

.duotone img {
  filter: grayscale(100%) contrast(1.2);
  display: block;
}

.duotone::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #1f4788;
  mix-blend-mode: screen;
}`
      }
    ]
  },
  {
    grup: "vizual",
    nume: "box-shadow și text-shadow",
    descriere: "Umbre pentru cutii și pentru text. Aceleași valori, ordine diferită.",
    tags: ["box-shadow", "text-shadow", "inset", "umbra"],
    valori: [
      { val: "box-shadow: x y blur culoare", ce: "Deplasare pe orizontală, pe verticală, cât de difuză, ce culoare.", cand: "Carduri, butoane, zone ridicate." },
      { val: "spread (a patra valoare)", ce: "Mărește sau micșorează umbra înainte de difuzare.", cand: "Contururi colorate în locul unui border." },
      { val: "inset", ce: "Umbra e în interiorul cutiei, nu în exterior.", cand: "Câmpuri apăsate, marcaje pe margine." },
      { val: "mai multe umbre", ce: "Separate prin virgulă; prima e cea de deasupra.", cand: "Efecte de adâncime, contururi multiple." },
      { val: "text-shadow", ce: "La fel, dar pentru text și fără spread.", cand: "Text peste imagini, ca să rămână lizibil." }
    ],
    exemple: [
      {
        explicatie: "Umbră subtilă și marcaj pe margine cu inset.",
        lang: "css",
        cod: `.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.nota {
  box-shadow: inset 3px 0 0 gold;
}

.text-peste-imagine {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}`
      }
    ]
  },

  /* ============================ UNITATI ============================ */
  {
    grup: "unitati",
    nume: "Unități de lungime",
    descriere: "Când folosești fiecare și de ce contează diferența.",
    tags: ["px", "em", "rem", "%", "vw", "vh", "fr", "ch", "unitati"],
    valori: [
      { val: "px", ce: "Fix, absolut. Nu se schimbă niciodată.", cand: "Chenare, umbre, dimensiuni mici care nu trebuie să scaleze." },
      { val: "rem", ce: "Relativ la fontul din html (implicit 16px). Nu se acumulează.", cand: "Text, spațiere, aproape tot. Alegerea implicită." },
      { val: "em", ce: "Relativ la fontul elementului curent sau al părintelui. Se acumulează.", cand: "Padding proporțional cu textul din interior, ::first-letter dublu." },
      { val: "%", ce: "Relativ la părinte. Pe width e lățimea părintelui, pe padding tot lățimea (chiar și pe verticală).", cand: "Lățimi care se adaptează." },
      { val: "vw / vh", ce: "1% din lățimea, respectiv înălțimea ferestrei.", cand: "Secțiuni cât ecranul, imagini care nu depășesc fereastra." },
      { val: "fr", ce: "Fracțiune din spațiul rămas. Funcționează doar în grid.", cand: "Coloane de grid." },
      { val: "ch", ce: "Lățimea caracterului 0 din fontul curent.", cand: "Lățimi de coloană de text, în jur de 60-70ch." },
      { val: "auto", ce: "Browserul calculează. Pe margin orizontal, centrează. Pe height, ia din conținut.", cand: "Centrare, imagini proporționale." }
    ],
    exemple: [
      {
        explicatie: "Alegerea potrivită pentru fiecare context.",
        lang: "css",
        cod: `.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  max-width: 65ch;
  margin: 0 auto;
}

.sectiune-mare {
  min-height: 100vh;
}

.imagine {
  width: 100%;
  max-width: 90vw;
  height: auto;
}`
      }
    ],
    nota: "Regula scurtă: rem pentru spațiere și text, px pentru chenare, % și fr pentru lățimi, vh pentru înălțimi cât ecranul."
  },
  {
    grup: "unitati",
    nume: "Culori",
    descriere: "Moduri de a scrie o culoare și când e util fiecare.",
    tags: ["color", "rgba", "hex", "hsl", "transparent", "currentColor"],
    valori: [
      { val: "#1f4788", ce: "Hexazecimal. Cea mai obișnuită formă.", cand: "Culori fixe din schema cromatică." },
      { val: "#1f478880", ce: "Hexazecimal cu transparență (ultimele două cifre).", cand: "Când vrei transparență fără să treci la rgba." },
      { val: "rgba(31, 71, 136, 0.5)", ce: "Roșu, verde, albastru și transparența.", cand: "Umbre, straturi peste imagini." },
      { val: "hsl(220, 63%, 33%)", ce: "Nuanță, saturație, luminozitate. Ușor de făcut variante mai deschise sau mai închise.", cand: "Generarea unei palete pornind de la o culoare." },
      { val: "transparent", ce: "Complet transparent.", cand: "Bordurile triunghiului, stări inactive." },
      { val: "currentColor", ce: "Culoarea curentă a textului elementului.", cand: "Chenare și iconițe care trebuie să urmeze culoarea textului." },
      { val: "var(--nume)", ce: "O variabilă CSS definită mai devreme.", cand: "Schema cromatică, teme light/dark." }
    ],
    exemple: [
      {
        explicatie: "Variabile pentru schema cromatică, redefinite pentru tema întunecată.",
        lang: "css",
        cod: `:root {
  --principal: #1f4788;
  --fundal: #ffffff;
  --text: #14181f;
}

:root[data-tema="dark"] {
  --fundal: #14181f;
  --text: #eef0f3;
}

.buton {
  background: var(--principal);
  border: 1px solid currentColor;
}`
      }
    ]
  },
  {
    grup: "unitati",
    nume: "Specificitatea selectorilor",
    descriere: "Când două reguli se bat pe același element, câștigă cea mai specifică. Nu cea scrisă ultima.",
    tags: ["specificitate", "important", "selector", "prioritate", "id", "clasa"],
    valori: [
      { val: "tag (p, div)", ce: "Cea mai slabă. Valoare 1.", cand: "Reguli generale, resetare." },
      { val: "clasă (.buton), atribut ([href]), pseudo-clasă (:hover)", ce: "Valoare 10. Bate orice combinație de taguri.", cand: "Aproape tot." },
      { val: "id (#meniu)", ce: "Valoare 100. Bate orice combinație de clase.", cand: "Elemente unice. Greu de suprascris mai târziu." },
      { val: "stil inline (style=\"\")", ce: "Valoare 1000. Bate tot ce e în fișierul CSS.", cand: "Doar din JavaScript." },
      { val: "!important", ce: "Bate tot, inclusiv inline.", cand: "Ultima soluție. De obicei semn că selectorul ar trebui rescris." }
    ],
    exemple: [
      {
        explicatie: "A doua regulă câștigă, deși e scrisă prima, fiindcă are un id.",
        lang: "css",
        cod: `.buton { background: red; }

#salveaza { background: blue; }`
      },
      {
        explicatie: "Ca să suprascrii Bootstrap, adaugi specificitate în loc de !important.",
        lang: "css",
        cod: `.btn.btn-primary {
  border-radius: 0;
}`
      }
    ],
    nota: "Ordinea în fișier contează doar între reguli cu aceeași specificitate. De asta CSS-ul Bootstrap se pune primul."
  }
];
