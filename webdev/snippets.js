const CATEGORII = [
  { id: "selectori", nume: "Selectori CSS" },
  { id: "animatii", nume: "Animații și transformări" },
  { id: "layout", nume: "Layout: grid și flex" },
  { id: "bootstrap", nume: "Bootstrap și SCSS" },
  { id: "dom", nume: "DOM și evenimente" },
  { id: "array", nume: "Array-uri și string-uri" },
  { id: "storage", nume: "localStorage și sessionStorage" },
  { id: "date", nume: "Dată și oră" },
  { id: "express", nume: "Express: rute și fișiere" },
  { id: "ejs", nume: "EJS" },
  { id: "fetch", nume: "Fetch și JSON" },
  { id: "form", nume: "Formulare și inputuri" },
  { id: "tabel", nume: "Tabele" }
];

const SNIPPETS = [
  // ============ SELECTORI CSS ============
  {
    cat: "selectori",
    titlu: "Copil direct vs. descendent",
    cand: "Ca să prinzi doar primul nivel dintr-un meniu și să lași submeniurile neatinse.",
    tags: ["combinator", "descendent", "nav", "meniu", "submeniu"],
    lang: "css",
    cod: `nav > ul > li { background: pink; }

nav ul li { background: pink; }`,
    nota: "Primul prinde doar li-urile de pe primul nivel. Al doilea prinde și li-urile din submeniuri."
  },
  {
    cat: "selectori",
    titlu: "Frate imediat următor și toți frații următori",
    cand: "Când vrei să stilizezi ce vine DUPĂ un element, nu elementul însuși.",
    tags: ["frate", "sibling", "adiacent"],
    lang: "css",
    cod: `h2 + p { font-weight: bold; }

h2 ~ p { color: gray; }`,
    nota: "+ ia doar primul p de după h2. ~ ia toate p-urile care urmează în același părinte."
  },
  {
    cat: "selectori",
    titlu: "Poziții impare și pare",
    cand: "Culori alternante pe butoane, rânduri de tabel, elemente de listă.",
    tags: ["nth-child", "odd", "even", "alternant", "zebra"],
    lang: "css",
    cod: `.buton:nth-child(odd) { background: red; }
.buton:nth-child(even) { background: yellow; }`,
    nota: "odd = 1, 3, 5... (primul e impar). Numărătoarea e față de părinte, nu față de clasă."
  },
  {
    cat: "selectori",
    titlu: "nth-child cu formulă",
    cand: "Fiecare al treilea element, sau tot ce e după primele două.",
    tags: ["nth-child", "formula", "3n"],
    lang: "css",
    cod: `li:nth-child(3n) { color: blue; }
li:nth-child(3n + 1) { color: green; }
li:nth-child(n + 3) { color: red; }
li:nth-child(-n + 3) { color: purple; }`,
    nota: "n pornește de la 0. n+3 = de la al treilea încolo. -n+3 = primele trei."
  },
  {
    cat: "selectori",
    titlu: "Primul, ultimul, singurul copil",
    cand: "Când vrei doar capătul unei liste, fără să numeri.",
    tags: ["first-child", "last-child", "only-child", "nth-last-child"],
    lang: "css",
    cod: `li:first-child { border-top: none; }
li:last-child { border-bottom: none; }
li:only-child { color: gray; }
li:nth-last-child(2) { font-weight: bold; }`,
    nota: "nth-last-child numără de la coadă spre cap."
  },
  {
    cat: "selectori",
    titlu: "first-of-type vs. first-child",
    cand: "Când elementul dorit nu e primul copil, dar e primul de tipul lui.",
    tags: ["first-of-type", "last-of-type", "nth-of-type"],
    lang: "css",
    cod: `p:first-of-type { font-size: 1.2rem; }

p:first-child { font-size: 1.2rem; }`,
    nota: "Dacă înainte de p e un h2, primul selector merge, al doilea nu prinde nimic."
  },
  {
    cat: "selectori",
    titlu: "Selector de atribut: începe cu, se termină cu, conține",
    cand: "Ex: toate datele din 2020, toate linkurile PDF, toate imaginile dintr-un folder.",
    tags: ["atribut", "^=", "$=", "*=", "datetime", "href"],
    lang: "css",
    cod: `time[datetime^="2020"] { text-decoration: underline; }
a[href$=".pdf"] { color: red; }
img[src*="/torturi/"] { border: 2px solid gold; }
a[target="_blank"] { font-style: italic; }`,
    nota: "^= începe cu, $= se termină cu, *= conține oriunde, = exact."
  },
  {
    cat: "selectori",
    titlu: "Atribut care conține un cuvânt din listă",
    cand: "Când atributul class sau data-* are mai multe valori separate prin spațiu.",
    tags: ["atribut", "~=", "|=", "class"],
    lang: "css",
    cod: `figure[class~="online"] { border: 2px solid green; }
p[lang|="en"] { font-style: italic; }`,
    nota: "~= caută un cuvânt întreg din listă separată prin spații. |= prinde en și en-US."
  },
  {
    cat: "selectori",
    titlu: ":not() ca să excluzi",
    cand: "Stilizezi tot în afară de un element sau de o categorie.",
    tags: ["not", "excludere", "negatie"],
    lang: "css",
    cod: `nav > ul > li:not(:first-child) { border-left: 1px solid; }
.produs:not(.epuizat) { opacity: 1; }
input:not([type="hidden"]) { display: block; }`,
    nota: "Merge și cu mai mulți selectori: :not(.a, .b)."
  },
  {
    cat: "selectori",
    titlu: "::first-letter și ::first-line",
    cand: "Prima literă mai mare, primul rând scos în evidență.",
    tags: ["first-letter", "first-line", "pseudo-element", "initiala"],
    lang: "css",
    cod: `.buton::first-letter {
  font-size: 2em;
  font-weight: bold;
}

p::first-line { color: navy; }`,
    nota: "Merge doar pe elemente de tip bloc. Pe un span inline nu are efect."
  },
  {
    cat: "selectori",
    titlu: "::before și ::after cu conținut",
    cand: "Adaugi un simbol, un separator sau un text fără să atingi HTML-ul.",
    tags: ["before", "after", "content", "pseudo-element"],
    lang: "css",
    cod: `.pret::after {
  content: " lei";
  color: gray;
}

.extern::before {
  content: "\\2197";
  margin-right: 0.25rem;
}`,
    nota: "content e obligatoriu, chiar dacă e gol. Codurile Unicode se scriu cu \\ , nu cu &#."
  },
  {
    cat: "selectori",
    titlu: "::selection",
    cand: "Schimbi cum arată textul selectat cu mouse-ul.",
    tags: ["selection", "pseudo-clasa", "selectie"],
    lang: "css",
    cod: `::selection {
  background: var(--accent);
  color: white;
}`
  },
  {
    cat: "selectori",
    titlu: "Stări: hover, focus, active, checked, disabled",
    cand: "Reacție la mouse, la tastatură sau la starea unui input.",
    tags: ["hover", "focus", "active", "checked", "disabled", "focus-visible"],
    lang: "css",
    cod: `.buton:hover { background: yellow; }
.buton:focus-visible { outline: 2px solid navy; }
.buton:active { transform: scale(0.97); }
input:checked + label { font-weight: bold; }
button:disabled { opacity: 0.5; cursor: not-allowed; }`,
    nota: "input:checked + label merge doar dacă label vine imediat după input în HTML."
  },
  {
    cat: "selectori",
    titlu: "Hover pe părinte care schimbă copilul",
    cand: "Treci cu mouse-ul pe un card și se schimbă titlul din el.",
    tags: ["hover", "parinte", "copil"],
    lang: "css",
    cod: `.card:hover .titlu { color: red; }
.card:hover img { transform: scale(1.05); }`
  },
  {
    cat: "selectori",
    titlu: "Variabile CSS",
    cand: "O culoare sau o dimensiune folosită în mai multe locuri, schimbată dintr-un singur punct.",
    tags: ["variabile", "custom properties", "var", "root"],
    lang: "css",
    cod: `:root {
  --principal: #1f4788;
  --spatiere: 1.5rem;
}

.header {
  background: var(--principal);
  padding: var(--spatiere);
}

@media (max-width: 600px) {
  :root { --spatiere: 0.5rem; }
}`,
    nota: "Redefinind variabila într-un media query, se schimbă peste tot unde e folosită."
  },
  {
    cat: "selectori",
    titlu: "Media queries: ecran mic, mediu, mare",
    cand: "Comportament diferit pe telefon, tabletă, desktop.",
    tags: ["media query", "responsive", "max-width", "min-width"],
    lang: "css",
    cod: `@media (max-width: 600px) {
  .meniu { display: none; }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .continut { padding: 1rem; }
}

@media (min-width: 1025px) {
  .continut { padding: 3rem; }
}`
  },
  {
    cat: "selectori",
    titlu: "Stil de printare",
    cand: "Cerința de print: ascunzi meniul, arăți linkurile, alb-negru.",
    tags: ["print", "media print", "printare"],
    lang: "css",
    cod: `@media print {
  nav, footer, .buton { display: none; }

  body { color: black; background: white; }

  a::after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
  }

  .sectiune { page-break-inside: avoid; }
}`,
    nota: "attr(href) scoate adresa linkului în text, ca să se vadă pe hârtie."
  },

  // ============ ANIMATII ============
  {
    cat: "animatii",
    titlu: "Rotire la 90 de grade",
    cand: "Text vertical, iconiță întoarsă, titlu perpendicular.",
    tags: ["rotate", "transform", "90 grade", "rotire"],
    lang: "css",
    cod: `.rotit {
  display: inline-block;
  transform: rotate(90deg);
}`,
    nota: "Fără display: inline-block sau block, transform nu are efect pe un element inline."
  },
  {
    cat: "animatii",
    titlu: "Text vertical cu writing-mode",
    cand: "Cuvântul scris de sus în jos, cu cutia elementului îngustă (nu doar rotit vizual).",
    tags: ["writing-mode", "vertical", "text-orientation"],
    lang: "css",
    cod: `.vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.vertical-invers {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}`,
    nota: "Diferența față de rotate: writing-mode schimbă și dimensiunea cutiei, deci nu se suprapune peste vecini."
  },
  {
    cat: "animatii",
    titlu: "Punctul în jurul căruia se rotește",
    cand: "Rotația iese din cadru sau nu se învârte de unde trebuie.",
    tags: ["transform-origin", "pivot"],
    lang: "css",
    cod: `.element {
  transform-origin: left center;
  transform: rotate(90deg);
}`,
    nota: "Implicit e center center. Valori: top, bottom, left, right, procente, px."
  },
  {
    cat: "animatii",
    titlu: "Mai multe transformări deodată",
    cand: "Scalare + rotire + mutare pe același element.",
    tags: ["transform", "scale", "translate", "rotate", "skew"],
    lang: "css",
    cod: `.element {
  transform: translate(10px, 20px) rotate(15deg) scale(1.2);
}`,
    nota: "Ordinea contează. Un al doilea transform pe același selector îl suprascrie pe primul, nu se adună."
  },
  {
    cat: "animatii",
    titlu: "Transition pe hover",
    cand: "Schimbare lină la trecerea cu mouse-ul, pe o durată dată.",
    tags: ["transition", "hover", "treptat", "lent"],
    lang: "css",
    cod: `.buton {
  transition: transform 2s, background-color 0.3s;
}

.buton:hover {
  transform: scale(2);
  background-color: gold;
}`,
    nota: "transition se pune pe starea normală, nu pe :hover, ca să fie lin și la ieșirea mouse-ului."
  },
  {
    cat: "animatii",
    titlu: "Animație care alternează la infinit",
    cand: "Culoare care pulsează între două valori, fără oprire.",
    tags: ["keyframes", "animation", "infinite", "alternate", "culoare"],
    lang: "css",
    cod: `@keyframes schimbaCuloare {
  from { color: red; }
  to { color: blue; }
}

.element {
  animation: schimbaCuloare 1s infinite alternate;
}`,
    nota: "alternate face drumul înapoi lin. Fără el, sare brusc de la albastru la roșu."
  },
  {
    cat: "animatii",
    titlu: "Animație cu mai multe cadre cheie",
    cand: "Cerințele care cer minim 3 cadre și schimbarea mai multor proprietăți.",
    tags: ["keyframes", "cadre cheie", "opacity", "3 cadre"],
    lang: "css",
    cod: `@keyframes intrare {
  0% {
    opacity: 0;
    transform: translateY(-20px);
    background: red;
  }
  50% {
    opacity: 0.5;
    transform: translateY(5px);
    background: orange;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    background: green;
  }
}

.bara { animation: intrare 0.8s ease-out forwards; }`,
    nota: "forwards păstrează starea finală după terminarea animației."
  },
  {
    cat: "animatii",
    titlu: "Rotire continuă",
    cand: "Iconiță care se învârte, loader.",
    tags: ["keyframes", "rotire", "linear", "spinner"],
    lang: "css",
    cod: `@keyframes rotire {
  to { transform: rotate(360deg); }
}

.icon { animation: rotire 2s linear infinite; }`,
    nota: "linear ca să nu accelereze și să încetinească la fiecare tură."
  },
  {
    cat: "animatii",
    titlu: "Text care se plimbă orizontal",
    cand: "Bandă cu mesaj care traversează ecranul și se reia.",
    tags: ["keyframes", "marquee", "banner", "translateX", "overflow"],
    lang: "css",
    cod: `.container-banner {
  overflow: hidden;
  width: 100%;
}

@keyframes plimba {
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
}

#banner {
  display: inline-block;
  white-space: nowrap;
  animation: plimba 10s linear infinite;
}`,
    nota: "overflow: hidden pe container previne bara de scroll orizontală pe pagină."
  },
  {
    cat: "animatii",
    titlu: "Delay diferit pentru fiecare element",
    cand: "Trei bare de hamburger care pornesc succesiv.",
    tags: ["animation-delay", "succesiv", "hamburger", "nth-child"],
    lang: "css",
    cod: `.bara:nth-child(1) { animation-delay: 0ms; }
.bara:nth-child(2) { animation-delay: 300ms; }
.bara:nth-child(3) { animation-delay: 600ms; }`
  },
  {
    cat: "animatii",
    titlu: "Același delay generat cu for în SCSS",
    cand: "Cerința care cere explicit instrucțiune for în sass.",
    tags: ["scss", "sass", "for", "delay", "loop"],
    lang: "scss",
    cod: `$t: 300ms;

@for $i from 1 through 3 {
  .bara:nth-child(#{$i}) {
    animation-delay: ($i - 1) * $t;
  }
}`,
    nota: "#{$i} interpolează variabila în selector."
  },
  {
    cat: "animatii",
    titlu: "Background fix la scroll",
    cand: "Imaginea de fundal stă pe loc în timp ce conținutul se derulează.",
    tags: ["background-attachment", "fixed", "parallax", "scroll"],
    lang: "css",
    cod: `.sectiune-fundal {
  background-image: url("/resurse/imagini/fundal.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}`
  },
  {
    cat: "animatii",
    titlu: "Text pe coloane",
    cand: "Secțiune lungă de text împărțită ca în ziar, o singură coloană pe mobil.",
    tags: ["column-count", "column-rule", "column-gap", "coloane"],
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
    cat: "animatii",
    titlu: "Efect duotone pe imagine",
    cand: "Imagine în două culori, filtru colorat peste.",
    tags: ["filter", "grayscale", "mix-blend-mode", "duotone"],
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
  },
  {
    cat: "animatii",
    titlu: "Reflexie sub imagine",
    cand: "Efectul de oglindă sub o poză.",
    tags: ["reflexie", "scaleY", "mask-image", "gradient"],
    lang: "css",
    cod: `.reflexie {
  transform: scaleY(-1);
  opacity: 0.4;
  -webkit-mask-image: linear-gradient(transparent 40%, black 100%);
  mask-image: linear-gradient(transparent 40%, black 100%);
}`,
    nota: "Se aplică pe o copie a imaginii, pusă imediat sub original."
  },
  {
    cat: "animatii",
    titlu: "Video ca fundal de pagină",
    cand: "Videoclip care umple ecranul, cu conținut deasupra.",
    tags: ["video", "background", "object-fit", "z-index"],
    lang: "css",
    cod: `.video-fundal {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}`,
    nota: "HTML: <video autoplay muted loop playsinline class=\"video-fundal\">. muted e obligatoriu ca autoplay să meargă."
  },

  // ============ LAYOUT ============
  {
    cat: "layout",
    titlu: "Grid cu coloane și rânduri",
    cand: "Aranjezi elemente într-o rețea fixă.",
    tags: ["grid", "grid-template-columns", "grid-template-rows", "fr"],
    lang: "css",
    cod: `.container {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
}`,
    nota: "auto = cât are nevoie conținutul. 1fr = împarte spațiul rămas în părți egale."
  },
  {
    cat: "layout",
    titlu: "Element care ocupă mai multe rânduri sau coloane",
    cand: "Primul buton din meniu ține cât două rânduri.",
    tags: ["grid-row", "grid-column", "span", "meniu"],
    lang: "css",
    cod: `.primul {
  grid-row: 1 / 3;
}

.mare {
  grid-column: span 2;
}`,
    nota: "1 / 3 = de la linia 1 la linia 3, adică 2 rânduri. span 2 = ocupă două celule de la poziția curentă."
  },
  {
    cat: "layout",
    titlu: "Plasarea explicită a fiecărui element în grid",
    cand: "Meniu cu primul buton mare în stânga și restul pe două rânduri.",
    tags: ["grid", "meniu", "nth-child", "grid-row", "grid-column"],
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
nav > ul > li:nth-child(5) { grid-area: 2 / 3 / 3 / 4; }`,
    nota: "grid-area: rând-start / coloană-start / rând-final / coloană-final."
  },
  {
    cat: "layout",
    titlu: "Grid care se adaptează singur",
    cand: "Galerie de imagini care umple rândul, oricâte ar fi.",
    tags: ["auto-fill", "auto-fit", "minmax", "galerie", "responsive"],
    lang: "css",
    cod: `.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}`,
    nota: "Nu ai nevoie de media query. auto-fit strânge coloanele goale, auto-fill le păstrează."
  },
  {
    cat: "layout",
    titlu: "Flexbox: aliniere pe orizontală și verticală",
    cand: "Bară cu logo în stânga și butoane în dreapta, totul centrat vertical.",
    tags: ["flex", "justify-content", "align-items", "gap"],
    lang: "css",
    cod: `.bara {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}`,
    nota: "justify-content lucrează pe axa principală (orizontal implicit), align-items pe cealaltă."
  },
  {
    cat: "layout",
    titlu: "Flex pe coloană",
    cand: "Elemente unul sub altul, dar cu controlul din flex.",
    tags: ["flex-direction", "column", "wrap"],
    lang: "css",
    cod: `.coloana {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.randuri {
  display: flex;
  flex-wrap: wrap;
}`
  },
  {
    cat: "layout",
    titlu: "Element care umple spațiul rămas",
    cand: "Caseta de căutare se întinde, butoanele rămân la dimensiunea lor.",
    tags: ["flex-grow", "flex", "flex-shrink"],
    lang: "css",
    cod: `.cautare { flex: 1; }
.buton { flex: 0 0 auto; }`
  },
  {
    cat: "layout",
    titlu: "Poziție fixă pe ecran",
    cand: "Buton de întors sus, container de comparare, mesaj temporar.",
    tags: ["position", "fixed", "sticky", "absolute", "z-index"],
    lang: "css",
    cod: `#link-top {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 50;
}

.antet-lipit {
  position: sticky;
  top: 0;
  z-index: 10;
}`,
    nota: "fixed = față de fereastră. sticky = normal până la scroll, apoi se lipește. absolute = față de cel mai apropiat părinte poziționat."
  },
  {
    cat: "layout",
    titlu: "Triunghi din CSS",
    cand: "Săgeata de la butonul de scroll în sus.",
    tags: ["triunghi", "border", "sageata"],
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
    cat: "layout",
    titlu: "Imagini responsive cu limite",
    cand: "Lățime în procente, dar fără să devină uriașă sau minusculă.",
    tags: ["max-width", "min-width", "img", "responsive", "height auto"],
    lang: "css",
    cod: `img, video {
  width: 100%;
  max-width: 600px;
  min-width: 200px;
  height: auto;
}`
  },
  {
    cat: "layout",
    titlu: "Meniu hamburger pe ecran mic",
    cand: "Meniul devine iconiță sub o anumită lățime.",
    tags: ["hamburger", "meniu", "media query", "checkbox", "toggle"],
    lang: "css",
    cod: `#toggle-meniu, .icon-hamburger { display: none; }

@media (max-width: 768px) {
  .icon-hamburger { display: block; cursor: pointer; }
  nav ul { display: none; }
  #toggle-meniu:checked ~ nav ul { display: block; }
}`,
    nota: "HTML: input type=checkbox cu id toggle-meniu, apoi label for=toggle-meniu, apoi nav. Merge fără JavaScript."
  },
  {
    cat: "layout",
    titlu: "Bare din divuri pentru hamburger",
    cand: "Cerința care cere iconița făcută din 3 divuri, nu imagine.",
    tags: ["hamburger", "div", "absolute", "bare"],
    lang: "css",
    cod: `.icon-hamburger {
  position: relative;
  width: 30px;
  height: 24px;
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

  // ============ BOOTSTRAP ============
  {
    cat: "bootstrap",
    titlu: "Customizare culori Bootstrap în SCSS",
    cand: "Butoanele primary trebuie să fie în culoarea ta, nu albastrul implicit.",
    tags: ["scss", "bootstrap", "primary", "theme-colors", "import"],
    lang: "scss",
    cod: `$primary: teal;
$secondary: #b5838d;
$body-color: #2b2118;

@import "../../node_modules/bootstrap/scss/bootstrap";`,
    nota: "Variabilele se declară ÎNAINTE de @import, altfel nu au niciun efect."
  },
  {
    cat: "bootstrap",
    titlu: "Variabile Bootstrap folosite des",
    cand: "Raze de border, dimensiuni de font, breakpoint-uri, font-family.",
    tags: ["scss", "bootstrap", "border-radius", "font-size", "breakpoints", "grid-breakpoints"],
    lang: "scss",
    cod: `$border-radius: 0.75rem;
$border-width: 2px;
$font-family-base: "IBM Plex Sans", sans-serif;
$h1-font-size: 2.5rem;
$h2-font-size: 2rem;

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
    cat: "bootstrap",
    titlu: "Variabile pentru input range",
    cand: "Bulina sliderului mai mare și colorată.",
    tags: ["scss", "range", "form-range", "slider"],
    lang: "scss",
    cod: `$form-range-thumb-width: 1.5rem;
$form-range-thumb-bg: teal;
$form-range-track-bg: #d9dde2;
$form-range-track-height: 0.5rem;

@import "../../node_modules/bootstrap/scss/bootstrap";`
  },
  {
    cat: "bootstrap",
    titlu: "Buton Bootstrap cu iconiță",
    cand: "Buton de filtrare cu glyphicon, text ascuns pe mobil.",
    tags: ["btn", "bootstrap-icons", "d-none", "d-md-inline", "buton"],
    lang: "html",
    cod: `<button class="btn btn-primary">
  <i class="bi bi-funnel"></i>
  <span class="d-none d-md-inline">Filtrează</span>
</button>`,
    nota: "d-none ascunde mereu, d-md-inline îl readuce de la md în sus. Deci pe mobil rămâne doar iconița."
  },
  {
    cat: "bootstrap",
    titlu: "Toggle buttons din checkbox/radio",
    cand: "Butoane care arată outline când sunt nebifate și pline când sunt bifate.",
    tags: ["btn-check", "btn-outline", "toggle", "checkbox", "radio"],
    lang: "html",
    cod: `<input type="checkbox" class="btn-check" id="cat-torturi" autocomplete="off">
<label class="btn btn-outline-primary" for="cat-torturi">Torturi</label>

<input type="checkbox" class="btn-check" id="cat-pateuri" autocomplete="off">
<label class="btn btn-outline-primary" for="cat-pateuri">Pateuri</label>`,
    nota: "Bootstrap face singur trecerea outline → plin la bifare. Nu ai nevoie de CSS propriu."
  },
  {
    cat: "bootstrap",
    titlu: "Floating label",
    cand: "Eticheta care urcă deasupra inputului la scriere.",
    tags: ["form-floating", "floating label", "textarea", "is-invalid"],
    lang: "html",
    cod: `<div class="form-floating">
  <textarea class="form-control" id="comentariu" placeholder="Comentariu"></textarea>
  <label for="comentariu">Comentariu</label>
</div>`,
    nota: "placeholder e obligatoriu, chiar dacă nu se vede. Pentru validare eșuată adaugi clasa is-invalid pe textarea."
  },
  {
    cat: "bootstrap",
    titlu: "Switch",
    cand: "Comutator pentru temă light/dark.",
    tags: ["form-switch", "switch", "tema", "toggle"],
    lang: "html",
    cod: `<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="switch-tema">
  <label class="form-check-label" for="switch-tema">Temă întunecată</label>
</div>`
  },
  {
    cat: "bootstrap",
    titlu: "Grid Bootstrap pentru inputuri",
    cand: "Aliniezi filtrele pe coloane, altfel pe mobil față de desktop.",
    tags: ["row", "col", "col-md", "grid", "bootstrap"],
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
</div>`,
    nota: "Cele 12 coloane se împart pe rând. g-3 pune spațiere între coloane."
  },
  {
    cat: "bootstrap",
    titlu: "Recompilare SCSS din Node",
    cand: "Funcția care compilează scss la pornirea serverului.",
    tags: ["sass", "compile", "compileazaScss", "node"],
    lang: "js",
    cod: `const sass = require("sass");
const fs = require("fs");
const path = require("path");

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

  const rezultat = sass.compile(caleScss, { style: "expanded" });
  fs.writeFileSync(caleCss, rezultat.css);
}`
  },

  // ============ DOM ============
  {
    cat: "dom",
    titlu: "Selectarea elementelor",
    cand: "Primul lucru din orice task de JavaScript.",
    tags: ["querySelector", "querySelectorAll", "getElementById", "selectare"],
    lang: "js",
    cod: `const unul = document.getElementById("prod-scumpe");
const primul = document.querySelector(".produs");
const toate = document.querySelectorAll(".produs");
const dinInterior = container.querySelectorAll("figure");`,
    nota: "querySelectorAll dă o NodeList, nu un array. Pentru .map() sau .filter() o transformi cu Array.from()."
  },
  {
    cat: "dom",
    titlu: "NodeList transformată în array",
    cand: "Când vrei .filter(), .map(), .reduce() pe rezultatul unui querySelectorAll.",
    tags: ["Array.from", "spread", "NodeList", "array"],
    lang: "js",
    cod: `const produse = Array.from(document.querySelectorAll(".produs"));

const produse2 = [...document.querySelectorAll(".produs")];`
  },
  {
    cat: "dom",
    titlu: "Ascultare apăsare de tastă",
    cand: "Cerințele de tipul „la apăsarea tastei w se întâmplă ceva”.",
    tags: ["keydown", "addEventListener", "key", "tasta", "keyup"],
    lang: "js",
    cod: `document.addEventListener("keydown", function (e) {
  if (e.key === "w") {
    console.log("s-a apăsat w");
  }
});`,
    nota: "e.key dă litera efectivă. Pentru combinații: e.ctrlKey, e.shiftKey, e.altKey."
  },
  {
    cat: "dom",
    titlu: "Combinație de taste",
    cand: "Ctrl + tastă, Shift + tastă.",
    tags: ["keydown", "ctrlKey", "shiftKey", "combinatie", "preventDefault"],
    lang: "js",
    cod: `document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "w") {
    e.preventDefault();
    console.log("Ctrl + w");
  }
});`
  },
  {
    cat: "dom",
    titlu: "Verificare dacă un element e vizibil",
    cand: "Cerințele care spun „produsele afișate (vizibile)”, după o filtrare.",
    tags: ["offsetParent", "vizibil", "display none", "filtrare"],
    lang: "js",
    cod: `const vizibile = Array.from(document.querySelectorAll(".produs"))
  .filter(p => p.offsetParent !== null);`,
    nota: "offsetParent e null când elementul are display: none. Nu merge dacă ai ascuns cu visibility: hidden sau opacity: 0."
  },
  {
    cat: "dom",
    titlu: "Ascunderea și afișarea elementelor",
    cand: "Filtrare care păstrează doar ce se potrivește.",
    tags: ["display", "style", "hidden", "ascundere", "filtrare"],
    lang: "js",
    cod: `element.style.display = "none";
element.style.display = "";

element.hidden = true;
element.hidden = false;`,
    nota: "display = \"\" (string gol) revine la valoarea din CSS, pe când display = \"block\" o forțează."
  },
  {
    cat: "dom",
    titlu: "Citirea și scrierea textului",
    cand: "Scrii un rezultat într-un paragraf.",
    tags: ["textContent", "innerHTML", "innerText", "value"],
    lang: "js",
    cod: `document.getElementById("prod-scumpe").textContent = numar;

document.getElementById("lista").innerHTML = "<li>Unu</li><li>Doi</li>";

const valoare = document.getElementById("input-nume").value;`,
    nota: "textContent pune text simplu, innerHTML interpretează tagurile. Pentru inputuri se folosește .value."
  },
  {
    cat: "dom",
    titlu: "Citirea unui atribut data-*",
    cand: "Prețul sau categoria stocată în HTML, citită din JavaScript.",
    tags: ["dataset", "data-", "getAttribute", "atribut"],
    lang: "js",
    cod: `const pret = parseFloat(produs.dataset.pret);
const categorie = produs.dataset.categorie;

const pret2 = parseFloat(produs.getAttribute("data-pret"));`,
    nota: "În HTML: data-pret=\"25.5\" devine dataset.pret. data-nume-lung devine dataset.numeLung."
  },
  {
    cat: "dom",
    titlu: "Adăugarea și eliminarea claselor",
    cand: "Marchezi un element ca selectat, activ, favorit.",
    tags: ["classList", "add", "remove", "toggle", "contains", "clasa"],
    lang: "js",
    cod: `element.classList.add("activ");
element.classList.remove("activ");
element.classList.toggle("activ");

if (element.classList.contains("diabetic")) {
  console.log("e pentru diabetici");
}`
  },
  {
    cat: "dom",
    titlu: "Crearea unui element nou",
    cand: "Adaugi un paragraf sau un rând de tabel din JavaScript.",
    tags: ["createElement", "appendChild", "append", "remove", "creare"],
    lang: "js",
    cod: `const p = document.createElement("p");
p.textContent = "Text nou";
p.classList.add("mesaj");

document.querySelector("main").appendChild(p);

p.remove();`
  },
  {
    cat: "dom",
    titlu: "Click pe buton",
    cand: "Cel mai des folosit eveniment.",
    tags: ["click", "addEventListener", "buton", "onclick"],
    lang: "js",
    cod: `document.getElementById("afiseaza").addEventListener("click", function () {
  console.log("s-a dat click");
});`
  },
  {
    cat: "dom",
    titlu: "Un singur listener pentru mai multe elemente",
    cand: "Ai 20 de butoane și nu vrei 20 de listenere.",
    tags: ["delegare", "event delegation", "closest", "target"],
    lang: "js",
    cod: `document.querySelector(".lista-produse").addEventListener("click", function (e) {
  const buton = e.target.closest(".buton-favorit");
  if (!buton) return;

  const produs = buton.closest(".produs");
  console.log(produs.dataset.id);
});`,
    nota: "closest urcă în sus prin părinți până găsește un element care se potrivește."
  },
  {
    cat: "dom",
    titlu: "Cod care rulează după încărcarea paginii",
    cand: "Când citești din localStorage sau cauți elemente la pornire.",
    tags: ["load", "DOMContentLoaded", "window", "incarcare"],
    lang: "js",
    cod: `window.addEventListener("load", function () {
  // aici e sigur că toate elementele și imaginile există
});

document.addEventListener("DOMContentLoaded", function () {
  // aici HTML-ul e gata, imaginile poate nu
});`
  },
  {
    cat: "dom",
    titlu: "Repetare la interval",
    cand: "Contor care se actualizează în fiecare secundă, temporizator de ofertă.",
    tags: ["setInterval", "setTimeout", "clearInterval", "temporizator", "secunde"],
    lang: "js",
    cod: `const id = setInterval(function () {
  console.log("la fiecare secundă");
}, 1000);

clearInterval(id);

setTimeout(function () {
  mesaj.remove();
}, 3000);`
  },

  // ============ ARRAY ============
  {
    cat: "array",
    titlu: "Filtrare",
    cand: "Păstrezi doar elementele care îndeplinesc o condiție.",
    tags: ["filter", "filtrare", "array"],
    lang: "js",
    cod: `const scumpe = produse.filter(p => p.pret > 50);

const dinCategorie = produse.filter(p => p.categorie === "torturi");

const potrivite = produse.filter(p => p.pret >= min && p.pret <= max);`
  },
  {
    cat: "array",
    titlu: "Transformare",
    cand: "Din obiecte scoți doar prețurile, sau din elemente scoți doar textul.",
    tags: ["map", "transformare", "array"],
    lang: "js",
    cod: `const preturi = produse.map(p => p.pret);

const nume = produse.map(p => p.nume.toLowerCase());`
  },
  {
    cat: "array",
    titlu: "Sumă și medie",
    cand: "Prețul mediu, totalul coșului.",
    tags: ["reduce", "suma", "medie", "total"],
    lang: "js",
    cod: `const suma = preturi.reduce((acc, val) => acc + val, 0);

const medie = suma / preturi.length;`,
    nota: "0 de la final e valoarea de pornire. Fără ea, un array gol dă eroare."
  },
  {
    cat: "array",
    titlu: "Sortare crescătoare și descrescătoare",
    cand: "Sortare după preț, după nume, după dată.",
    tags: ["sort", "sortare", "localeCompare", "crescator", "descrescator"],
    lang: "js",
    cod: `produse.sort((a, b) => a.pret - b.pret);

produse.sort((a, b) => b.pret - a.pret);

produse.sort((a, b) => a.nume.localeCompare(b.nume));`,
    nota: ".sort() modifică array-ul original. Ca să nu-l strici: [...produse].sort(...)."
  },
  {
    cat: "array",
    titlu: "Sortare după două chei",
    cand: "Întâi după categorie, apoi după preț în interiorul fiecărei categorii.",
    tags: ["sort", "doua chei", "sortare multipla"],
    lang: "js",
    cod: `produse.sort((a, b) => {
  const dif = a.categorie.localeCompare(b.categorie);
  if (dif !== 0) return dif;
  return a.pret - b.pret;
});`,
    nota: "Dacă prima comparație dă 0 (egale), treci la a doua cheie."
  },
  {
    cat: "array",
    titlu: "Sortare cu direcție variabilă",
    cand: "Utilizatorul alege crescător sau descrescător dintr-un select.",
    tags: ["sort", "directie", "crescator", "select"],
    lang: "js",
    cod: `const cheie = document.getElementById("cheie").value;
const directie = document.getElementById("directie").value === "asc" ? 1 : -1;

produse.sort((a, b) => {
  if (typeof a[cheie] === "number") return (a[cheie] - b[cheie]) * directie;
  return a[cheie].localeCompare(b[cheie]) * directie;
});`
  },
  {
    cat: "array",
    titlu: "Verificări rapide pe array",
    cand: "Există măcar unul? Sunt toate? Câte sunt?",
    tags: ["includes", "some", "every", "find", "findIndex", "length"],
    lang: "js",
    cod: `vector.includes("mereu");

produse.some(p => p.stoc === 0);

produse.every(p => p.pret > 0);

const gasit = produse.find(p => p.id === 5);

const cati = produse.filter(p => p.pret > medie).length;`
  },
  {
    cat: "array",
    titlu: "Minim și maxim",
    cand: "Cel mai ieftin produs, prețul maxim pentru un input range.",
    tags: ["Math.min", "Math.max", "spread", "minim", "maxim"],
    lang: "js",
    cod: `const preturi = produse.map(p => p.pret);
const minim = Math.min(...preturi);
const maxim = Math.max(...preturi);

const celMaiIeftin = produse.reduce((a, b) => a.pret < b.pret ? a : b);`
  },
  {
    cat: "array",
    titlu: "Numărare pe categorii",
    cand: "Câte elemente are fiecare clasă sau fiecare categorie.",
    tags: ["contor", "numarare", "obiect", "forEach", "grupare"],
    lang: "js",
    cod: `const contor = {};

produse.forEach(p => {
  contor[p.categorie] = (contor[p.categorie] || 0) + 1;
});

// { torturi: 5, pateuri: 2 }`,
    nota: "|| 0 rezolvă primul element, când cheia încă nu există."
  },
  {
    cat: "array",
    titlu: "Parcurgerea unui obiect",
    cand: "Afișezi rezultatul unei numărători pe categorii.",
    tags: ["Object.keys", "Object.entries", "Object.values", "forEach"],
    lang: "js",
    cod: `Object.keys(contor).forEach(cheie => {
  console.log(cheie + ": " + contor[cheie]);
});

Object.entries(contor).forEach(([cheie, valoare]) => {
  console.log(cheie, valoare);
});`
  },
  {
    cat: "array",
    titlu: "String în array și înapoi",
    cand: "Proprietatea „clase” dintr-un JSON, scrisă ca „a, b, c”.",
    tags: ["split", "join", "trim", "string", "clase"],
    lang: "js",
    cod: `const clase = "online, la expozitie".split(", ");
// ["online", "la expozitie"]

const text = clase.join(" ");
// "online la expozitie"

const curat = "  text  ".trim();`
  },
  {
    cat: "array",
    titlu: "Înlocuire în string",
    cand: "Spațiile din numele unei clase devin underscore.",
    tags: ["replace", "replaceAll", "regex", "underscore", "spatii"],
    lang: "js",
    cod: `"la expozitie".replace(/ /g, "_");
// "la_expozitie"

"la expozitie".replaceAll(" ", "_");`,
    nota: "Fără /g, replace schimbă doar prima apariție."
  },
  {
    cat: "array",
    titlu: "Clase din JSON puse în atributul class",
    cand: "Cerința cu proprietatea clase din galerie.json.",
    tags: ["split", "map", "replace", "join", "class", "galerie"],
    lang: "js",
    cod: `imagini.forEach(img => {
  img.claseCSS = img.clase
    .split(", ")
    .map(c => c.trim().replace(/ /g, "_"))
    .join(" ");
});`
  },
  {
    cat: "array",
    titlu: "Text fără diacritice",
    cand: "Căutarea după „briose” trebuie să găsească „brioșe”.",
    tags: ["normalize", "diacritice", "cautare", "regex"],
    lang: "js",
    cod: `function faraDiacritice(text) {
  return text
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase();
}

produse.filter(p => faraDiacritice(p.nume).includes(faraDiacritice(cautat)));`
  },
  {
    cat: "array",
    titlu: "Text în număr",
    cand: "Valoarea dintr-un input sau dintr-un parametru de rută.",
    tags: ["parseFloat", "parseInt", "Number", "isNaN", "toFixed"],
    lang: "js",
    cod: `const pret = parseFloat("25.50");
const nr = parseInt("42");
const n = Number("3.14");

if (isNaN(pret)) { /* nu e număr */ }

const rotunjit = (10 / 3).toFixed(2);  // "3.33"`,
    nota: "Valorile din inputuri sunt mereu string. Fără parseFloat, \"10\" + 5 dă \"105\"."
  },

  // ============ STORAGE ============
  {
    cat: "storage",
    titlu: "Scriere și citire simplă",
    cand: "Reții o preferință între vizite.",
    tags: ["localStorage", "setItem", "getItem", "removeItem"],
    lang: "js",
    cod: `localStorage.setItem("tema", "dark");

const tema = localStorage.getItem("tema");

localStorage.removeItem("tema");
localStorage.clear();`,
    nota: "Se salvează doar string-uri. getItem dă null dacă cheia nu există."
  },
  {
    cat: "storage",
    titlu: "Contor de apăsări",
    cand: "Numeri de câte ori s-a apăsat o tastă, chiar și între reîncărcări.",
    tags: ["localStorage", "contor", "parseInt", "keydown"],
    lang: "js",
    cod: `document.addEventListener("keydown", function (e) {
  if (e.key === "w") {
    let nr = parseInt(localStorage.getItem("nrApasariW")) || 0;
    localStorage.setItem("nrApasariW", nr + 1);
  }
});`,
    nota: "|| 0 acoperă și cazul null (prima rulare), și NaN."
  },
  {
    cat: "storage",
    titlu: "Afișare doar la reîncărcare",
    cand: "Cerința „numărul anterior”, care nu se actualizează în timp real.",
    tags: ["localStorage", "load", "anterior", "reincarcare"],
    lang: "js",
    cod: `window.addEventListener("load", function () {
  const nr = localStorage.getItem("nrApasariW");
  if (nr !== null) {
    document.getElementById("nr-anterior").textContent = "Nr anterior: " + nr;
  }
});`,
    nota: "Citești o singură dată la load. Dacă ai pune citirea în keydown, s-ar actualiza dinamic — exact ce nu se cere."
  },
  {
    cat: "storage",
    titlu: "Obiecte și array-uri în localStorage",
    cand: "Salvezi un interval, o listă de filtre, un set de opțiuni.",
    tags: ["JSON.stringify", "JSON.parse", "localStorage", "obiect"],
    lang: "js",
    cod: `localStorage.setItem("interval", JSON.stringify([20, 100]));

const salvat = localStorage.getItem("interval");
if (salvat) {
  const [pret1, pret2] = JSON.parse(salvat);
  console.log(pret1, pret2);
}`,
    nota: "Fără JSON.stringify, un array ajunge în storage ca \"20,100\" și un obiect ca \"[object Object]\"."
  },
  {
    cat: "storage",
    titlu: "Temă salvată între pagini",
    cand: "Butonul light/dark care își ține minte alegerea pe tot site-ul.",
    tags: ["tema", "dark", "light", "localStorage", "data-tema"],
    lang: "js",
    cod: `const buton = document.getElementById("buton-tema");

window.addEventListener("load", function () {
  const tema = localStorage.getItem("tema") || "light";
  document.documentElement.setAttribute("data-tema", tema);
});

buton.addEventListener("click", function () {
  const acum = document.documentElement.getAttribute("data-tema");
  const noua = acum === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-tema", noua);
  localStorage.setItem("tema", noua);
});`,
    nota: "În CSS: :root[data-tema=\"dark\"] { --fundal: #111; --text: #eee; }"
  },
  {
    cat: "storage",
    titlu: "sessionStorage",
    cand: "Ceva valabil doar pentru tabul curent, care dispare la închiderea lui.",
    tags: ["sessionStorage", "tab", "sesiune"],
    lang: "js",
    cod: `sessionStorage.setItem("produseSterse", JSON.stringify([3, 7]));

const sterse = JSON.parse(sessionStorage.getItem("produseSterse")) || [];`,
    nota: "Aceeași sintaxă ca localStorage. Diferența: se pierde la închiderea tabului și nu e partajat între taburi."
  },
  {
    cat: "storage",
    titlu: "Salvarea valorilor din formular",
    cand: "Filtre persistente, care se reaplică la revenirea pe pagină.",
    tags: ["localStorage", "filtre", "input", "checked", "value"],
    lang: "js",
    cod: `function salveazaFiltre() {
  const filtre = {
    nume: document.getElementById("f-nume").value,
    pretMax: document.getElementById("f-pret").value,
    doarStoc: document.getElementById("f-stoc").checked
  };
  localStorage.setItem("filtre", JSON.stringify(filtre));
}

window.addEventListener("load", function () {
  const salvat = localStorage.getItem("filtre");
  if (!salvat) return;

  const filtre = JSON.parse(salvat);
  document.getElementById("f-nume").value = filtre.nume;
  document.getElementById("f-pret").value = filtre.pretMax;
  document.getElementById("f-stoc").checked = filtre.doarStoc;
  filtreaza();
});`
  },

  // ============ DATE ============
  {
    cat: "date",
    titlu: "Ora, minutul, ziua curentă",
    cand: "Filtrare după momentul din zi sau din săptămână.",
    tags: ["Date", "getMinutes", "getHours", "getDay", "getDate"],
    lang: "js",
    cod: `const acum = new Date();

const minut = acum.getMinutes();   // 0-59
const ora = acum.getHours();       // 0-23
const zi = acum.getDay();          // 0 = duminică
const ziLuna = acum.getDate();     // 1-31
const luna = acum.getMonth();      // 0 = ianuarie
const an = acum.getFullYear();`,
    nota: "getMonth() dă 0 pentru ianuarie. getDay() e ziua săptămânii, getDate() e ziua din lună."
  },
  {
    cat: "date",
    titlu: "Interval de minute din oră",
    cand: "Cerința cu perioade_ore: început, mijloc, final.",
    tags: ["getMinutes", "interval", "perioade_ore", "inceput", "mijloc", "final"],
    lang: "js",
    cod: `const minut = new Date().getMinutes();

let perioada;
if (minut < 20) perioada = "inceput";
else if (minut < 40) perioada = "mijloc";
else perioada = "final";`,
    nota: "Intervalele sunt [0,20) [20,40) [40,60). La minutul 20 se trece deja la mijloc."
  },
  {
    cat: "date",
    titlu: "Filtrare imagini după perioada orei",
    cand: "Se afișează doar ce se potrivește cu momentul curent, plus cele marcate mereu.",
    tags: ["perioade_ore", "filter", "includes", "galerie", "mereu"],
    lang: "js",
    cod: `function seAfiseaza(imagine) {
  if (!imagine.perioade_ore) return false;
  if (imagine.perioade_ore.includes("mereu")) return true;

  const minut = new Date().getMinutes();
  const perioada = minut < 20 ? "inceput" : minut < 40 ? "mijloc" : "final";

  return imagine.perioade_ore.includes(perioada);
}

const deAfisat = imagini.filter(seAfiseaza);`,
    nota: "Fără proprietatea perioade_ore imaginea nu se afișează deloc — de aceea return false pe prima linie."
  },
  {
    cat: "date",
    titlu: "Ziua săptămânii ca text",
    cand: "Marchezi ziua curentă în tabelul cu orarul.",
    tags: ["getDay", "zile", "orar", "saptamana"],
    lang: "js",
    cod: `const zile = ["duminica", "luni", "marti", "miercuri", "joi", "vineri", "sambata"];
const ziCurenta = zile[new Date().getDay()];`
  },
  {
    cat: "date",
    titlu: "Diferența dintre două date",
    cand: "Câte ore, minute, secunde mai sunt până expiră o ofertă.",
    tags: ["diferenta", "temporizator", "countdown", "getTime", "ore minute secunde"],
    lang: "js",
    cod: `const final = new Date(oferta.data_finalizare);
const diferenta = final - new Date();

const ore = Math.floor(diferenta / 3600000);
const minute = Math.floor((diferenta % 3600000) / 60000);
const secunde = Math.floor((diferenta % 60000) / 1000);`,
    nota: "Scăderea a două obiecte Date dă milisecunde. 3600000 ms = o oră."
  },
  {
    cat: "date",
    titlu: "Formatare dată în română",
    cand: "Afișezi data într-un format citibil.",
    tags: ["toLocaleDateString", "format", "romana", "data"],
    lang: "js",
    cod: `const acum = new Date();

acum.toLocaleDateString("ro-RO");
// "4.09.2026"

acum.toLocaleDateString("ro-RO", {
  day: "numeric", month: "long", year: "numeric"
});
// "4 septembrie 2026"

acum.toISOString().split("T")[0];
// "2026-09-04" — formatul pentru atributul datetime`
  },
  {
    cat: "date",
    titlu: "Verificare dacă e într-un interval de timp",
    cand: "Produs nou, ofertă activă, rol valabil.",
    tags: ["interval", "comparare date", "nou", "expirare"],
    lang: "js",
    cod: `const T = 7 * 24 * 60 * 60 * 1000; // 7 zile

const eNou = (new Date() - new Date(produs.data_adaugare)) <= T;

const eActiv = new Date() >= new Date(o.data_incepere)
            && new Date() <= new Date(o.data_finalizare);`
  },

  // ============ EXPRESS ============
  {
    cat: "express",
    titlu: "Rută simplă",
    cand: "Pagină nouă la o adresă fixă.",
    tags: ["app.get", "render", "ruta", "express"],
    lang: "js",
    cod: `app.get("/erori_status", function (req, res) {
  res.render("pagini/erori_status", { titlu: "Erori cu status" });
});`,
    nota: "Trebuie pusă ÎNAINTE de ruta generală app.get(\"/*\"), altfel nu se ajunge niciodată la ea."
  },
  {
    cat: "express",
    titlu: "Rută cu parametri în cale",
    cand: "Adrese de forma /prajitura/30/100.",
    tags: ["req.params", "parametri", "ruta", "app.get", "parseFloat"],
    lang: "js",
    cod: `app.get("/prajitura/:pret1/:pret2", function (req, res) {
  const pret1 = parseFloat(req.params.pret1);
  const pret2 = parseFloat(req.params.pret2);

  const filtrate = produse.filter(p => p.pret >= pret1 && p.pret <= pret2);

  res.render("pagini/prajitura", { produse: filtrate, pret1, pret2 });
});`,
    nota: "req.params dă mereu string-uri. parseFloat e obligatoriu pentru comparații numerice."
  },
  {
    cat: "express",
    titlu: "Parametru opțional și query string",
    cand: "Adrese de tipul /produse?min=10&max=50.",
    tags: ["req.query", "query string", "optional", "ruta"],
    lang: "js",
    cod: `app.get("/produse", function (req, res) {
  const min = parseFloat(req.query.min) || 0;
  const max = parseFloat(req.query.max) || Infinity;

  const filtrate = produse.filter(p => p.pret >= min && p.pret <= max);
  res.render("pagini/produse", { produse: filtrate });
});

app.get("/produse/:categorie?", function (req, res) {
  const cat = req.params.categorie;
});`
  },
  {
    cat: "express",
    titlu: "Aceeași pagină la mai multe adrese",
    cand: "Prima pagină accesibilă și cu /, și cu /index, și cu /home.",
    tags: ["app.get", "vector", "index", "home", "alias"],
    lang: "js",
    cod: `app.get(["/", "/index", "/home"], function (req, res) {
  res.render("pagini/index");
});`
  },
  {
    cat: "express",
    titlu: "Ruta generală și eroarea 404",
    cand: "Orice altă adresă randează pagina cu numele cerut sau dă eroare.",
    tags: ["/*", "404", "callback", "render", "eroare"],
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
});`,
    nota: "Trebuie să fie ULTIMUL app.get din fișier."
  },
  {
    cat: "express",
    titlu: "Citirea unui fișier JSON",
    cand: "Încarci galerie.json, erori.json, oferte.json.",
    tags: ["fs", "readFileSync", "JSON.parse", "path.join", "json"],
    lang: "js",
    cod: `const fs = require("fs");
const path = require("path");

const cale = path.join(__dirname, "resurse", "json", "galerie.json");
const continut = fs.readFileSync(cale, "utf8");
const date = JSON.parse(continut);`,
    nota: "Folosește mereu path.join, nu concatenare cu / — merge și pe Windows, și pe Mac."
  },
  {
    cat: "express",
    titlu: "Scrierea într-un fișier JSON",
    cand: "Salvezi o ofertă nouă generată.",
    tags: ["fs", "writeFileSync", "JSON.stringify", "scriere"],
    lang: "js",
    cod: `fs.writeFileSync(cale, JSON.stringify(date, null, 2));`,
    nota: "null, 2 formatează frumos fișierul, cu indentare de 2 spații."
  },
  {
    cat: "express",
    titlu: "Verificare și creare foldere",
    cand: "Folderele temp, logs, backup create la pornirea serverului.",
    tags: ["fs.existsSync", "mkdirSync", "foldere", "vect_foldere"],
    lang: "js",
    cod: `const vect_foldere = ["temp", "logs", "backup", "fisiere_uploadate"];

vect_foldere.forEach(function (nume) {
  const cale = path.join(__dirname, nume);
  if (!fs.existsSync(cale)) {
    fs.mkdirSync(cale, { recursive: true });
  }
});`,
    nota: "recursive: true creează și folderele părinte, dacă lipsesc."
  },
  {
    cat: "express",
    titlu: "Listarea fișierelor dintr-un folder",
    cand: "Compilezi toate fișierele scss, cauți backup-uri vechi.",
    tags: ["readdirSync", "foldere", "fisiere", "endsWith"],
    lang: "js",
    cod: `const fisiere = fs.readdirSync(obGlobal.folderScss);

fisiere
  .filter(f => f.endsWith(".scss"))
  .forEach(f => compileazaScss(f));`
  },
  {
    cat: "express",
    titlu: "Urmărirea modificărilor dintr-un folder",
    cand: "Recompilare automată scss la fiecare salvare.",
    tags: ["fs.watch", "watch", "modificare", "scss"],
    lang: "js",
    cod: `fs.watch(obGlobal.folderScss, function (eveniment, numeFisier) {
  if (numeFisier && numeFisier.endsWith(".scss")) {
    compileazaScss(numeFisier);
  }
});`
  },
  {
    cat: "express",
    titlu: "Folder static și blocarea listării",
    cand: "Fișierele din /resurse sunt servite, dar folderul gol dă 403.",
    tags: ["express.static", "403", "static", "resurse", "middleware"],
    lang: "js",
    cod: `app.use("/resurse", function (req, res, next) {
  if (req.url.endsWith("/")) {
    afisareEroare(res, 403);
  } else {
    next();
  }
});

app.use("/resurse", express.static(path.join(__dirname, "resurse")));`,
    nota: "Middleware-ul de verificare trebuie pus înaintea express.static."
  },
  {
    cat: "express",
    titlu: "Blocarea cererilor pentru fișiere .ejs",
    cand: "Cerința cu eroarea 400 Bad Request.",
    tags: ["400", "ejs", "middleware", "app.get"],
    lang: "js",
    cod: `app.get("/*.ejs", function (req, res) {
  afisareEroare(res, 400);
});`
  },
  {
    cat: "express",
    titlu: "Trimiterea unui fișier direct",
    cand: "Favicon, un PDF de descărcat.",
    tags: ["sendFile", "favicon", "download"],
    lang: "js",
    cod: `app.get("/favicon.ico", function (req, res) {
  res.sendFile(path.join(__dirname, "resurse", "ico", "favicon.ico"));
});`
  },
  {
    cat: "express",
    titlu: "Citirea datelor dintr-un formular POST",
    cand: "Formular de înregistrare sau de filtrare pe server.",
    tags: ["post", "req.body", "urlencoded", "formular"],
    lang: "js",
    cod: `app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/filtreaza", function (req, res) {
  const min = parseFloat(req.body.min);
  const filtrate = produse.filter(p => p.pret >= min);
  res.render("pagini/produse", { produse: filtrate });
});`
  },
  {
    cat: "express",
    titlu: "IP-ul utilizatorului",
    cand: "Zona de date despre utilizator din layout.",
    tags: ["req.ip", "ip", "utilizator"],
    lang: "js",
    cod: `app.get("/*", function (req, res) {
  res.render("pagini/index", { ip: req.ip });
});`,
    nota: "Local vei vedea mereu ::1, care e localhost în IPv6."
  },
  {
    cat: "express",
    titlu: "Interogare în baza de date",
    cand: "Iei produsele din Postgres și le trimiți în pagină.",
    tags: ["client.query", "postgres", "sql", "select", "baza de date"],
    lang: "js",
    cod: `client.query("SELECT * FROM produse", function (err, rezultat) {
  if (err) {
    afisareEroare(res, 2);
    return;
  }
  res.render("pagini/produse", { produse: rezultat.rows });
});`,
    nota: "Datele sunt în rezultat.rows, nu direct în rezultat."
  },

  // ============ EJS ============
  {
    cat: "ejs",
    titlu: "Afișarea unei valori",
    cand: "Pui în pagină ceva trimis din index.js.",
    tags: ["ejs", "afisare", "escape", "<%=", "<%-"],
    lang: "html",
    cod: `<h1><%= titlu %></h1>

<div><%- continutHtml %></div>`,
    nota: "<%= %> scapă tagurile (sigur). <%- %> le interpretează ca HTML (folosit pentru include)."
  },
  {
    cat: "ejs",
    titlu: "Include pentru header și footer",
    cand: "Pagina nouă trebuie să arate ca restul site-ului.",
    tags: ["include", "header", "footer", "fragmente", "ejs"],
    lang: "html",
    cod: `<%- include("../fragmente/header") %>

<main>
  <h1>Erori cu status</h1>
</main>

<%- include("../fragmente/footer") %>`,
    nota: "Calea e relativă la fișierul curent. Din views/pagini/ către views/fragmente/ urci cu ../."
  },
  {
    cat: "ejs",
    titlu: "Include cu date trimise",
    cand: "Același fragment folosit cu conținut diferit.",
    tags: ["include", "parametri", "fragmente"],
    lang: "html",
    cod: `<%- include("../fragmente/card", { produs: p, arataPret: true }) %>`
  },
  {
    cat: "ejs",
    titlu: "Buclă peste un array",
    cand: "Generezi o listă, o galerie, rândurile unui tabel.",
    tags: ["forEach", "bucla", "for", "ejs", "lista"],
    lang: "html",
    cod: `<% produse.forEach(function (p) { %>
  <p><b><%= p.nume %></b> - <%= p.pret %> lei</p>
<% }); %>`,
    nota: "Codul JavaScript stă în <% %> (fără =), doar valorile afișate folosesc <%= %>."
  },
  {
    cat: "ejs",
    titlu: "Buclă cu index",
    cand: "Ai nevoie de poziția elementului, ex. pentru litera A), B), C).",
    tags: ["forEach", "index", "bucla"],
    lang: "html",
    cod: `<% imagini.forEach(function (img, i) { %>
  <figure>
    <figcaption>
      <%= String.fromCharCode(65 + i) %>)<%= img.nume %>
    </figcaption>
  </figure>
<% }); %>`,
    nota: "String.fromCharCode(65) e A, 66 e B și așa mai departe."
  },
  {
    cat: "ejs",
    titlu: "Condiție",
    cand: "Text afișat doar pentru anumite elemente.",
    tags: ["if", "else", "conditie", "ejs"],
    lang: "html",
    cod: `<% if (p.diabetic) { %>
  <span>pentru diabetici</span>
<% } else { %>
  <span>standard</span>
<% } %>

<p class="<%= p.diabetic ? 'diabetic' : '' %>">...</p>`
  },
  {
    cat: "ejs",
    titlu: "Atribut generat din date",
    cand: "Clasele figurii vin din JSON.",
    tags: ["class", "atribut", "ejs", "clase"],
    lang: "html",
    cod: `<figure class="<%= img.claseCSS %>">
  <img src="<%= img.cale %>" alt="<%= img.nume %>">
  <figcaption><%= img.nume %></figcaption>
</figure>`
  },
  {
    cat: "ejs",
    titlu: "Verificare că variabila există",
    cand: "Fragment folosit pe mai multe pagini, unde nu toate trimit aceleași date.",
    tags: ["locals", "undefined", "typeof", "verificare"],
    lang: "html",
    cod: `<% if (typeof mesaj !== "undefined") { %>
  <p><%= mesaj %></p>
<% } %>

<h1><%= locals.titlu || "Titlu implicit" %></h1>`,
    nota: "Fără verificare, o variabilă netrimisă dă eroare la randare."
  },
  {
    cat: "ejs",
    titlu: "Trimiterea datelor către JavaScript client",
    cand: "Ai nevoie în script de un array venit de pe server.",
    tags: ["JSON.stringify", "script", "client", "date"],
    lang: "html",
    cod: `<script>
  const produse = <%- JSON.stringify(produse) %>;
</script>`,
    nota: "Se folosește <%- (nu <%=), altfel ghilimelele sunt scăpate și JSON-ul devine invalid."
  },

  // ============ FETCH ============
  {
    cat: "fetch",
    titlu: "Fetch pentru un fișier JSON",
    cand: "Încarci date fără să reîncarci pagina.",
    tags: ["fetch", "then", "json", "async"],
    lang: "js",
    cod: `fetch("/resurse/json/galerie.json")
  .then(raspuns => raspuns.json())
  .then(date => {
    console.log(date.imagini);
  })
  .catch(err => console.error(err));`
  },
  {
    cat: "fetch",
    titlu: "Fetch cu async/await",
    cand: "Aceeași treabă, scrisă mai citibil.",
    tags: ["async", "await", "fetch", "try catch"],
    lang: "js",
    cod: `async function incarcaGalerie() {
  try {
    const raspuns = await fetch("/resurse/json/galerie.json");
    const date = await raspuns.json();
    afiseazaImagini(date.imagini);
  } catch (err) {
    console.error(err);
  }
}`
  },
  {
    cat: "fetch",
    titlu: "Fetch cu POST",
    cand: "Trimiți date către server fără formular.",
    tags: ["fetch", "post", "body", "headers", "JSON.stringify"],
    lang: "js",
    cod: `fetch("/actualizeaza-stoc", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: 5, stoc: 20 })
})
  .then(r => r.json())
  .then(date => console.log(date));`
  },
  {
    cat: "fetch",
    titlu: "Actualizare periodică cu fetch",
    cand: "Numărul de favorite se reîmprospătează la fiecare 5 secunde.",
    tags: ["setInterval", "fetch", "actualizare", "periodic"],
    lang: "js",
    cod: `setInterval(function () {
  fetch("/nr-favorite")
    .then(r => r.json())
    .then(date => {
      document.getElementById("nr-favorite").textContent = date.numar;
    });
}, 5000);`
  },
  {
    cat: "fetch",
    titlu: "Ruta care răspunde cu JSON",
    cand: "Partea de server pentru un fetch.",
    tags: ["res.json", "express", "api", "fetch"],
    lang: "js",
    cod: `app.get("/nr-favorite", function (req, res) {
  res.json({ numar: 12 });
});`
  },

  // ============ FORMULARE ============
  {
    cat: "form",
    titlu: "Citirea valorilor din inputuri",
    cand: "Aduni datele înainte de filtrare.",
    tags: ["value", "checked", "input", "select", "citire"],
    lang: "js",
    cod: `const text = document.getElementById("nume").value;
const numar = parseFloat(document.getElementById("pret").value);
const bifat = document.getElementById("stoc").checked;
const ales = document.getElementById("categorie").value;`
  },
  {
    cat: "form",
    titlu: "Radio button selectat",
    cand: "Grupul „tot / pentru diabetici / pentru non-diabetici”.",
    tags: ["radio", "checked", "querySelector", "name"],
    lang: "js",
    cod: `const ales = document.querySelector('input[name="filtru"]:checked').value;`,
    nota: "Radio-urile din același grup trebuie să aibă același atribut name."
  },
  {
    cat: "form",
    titlu: "Toate checkbox-urile bifate",
    cand: "Filtrare pe mai multe categorii deodată.",
    tags: ["checkbox", "checked", "querySelectorAll", "map"],
    lang: "js",
    cod: `const alese = Array.from(
  document.querySelectorAll('input[name="categorie"]:checked')
).map(cb => cb.value);

if (alese.length === 0 || alese.includes(p.categorie)) {
  // produsul trece filtrul
}`,
    nota: "Când nimic nu e bifat, de obicei se afișează tot — de aici verificarea length === 0."
  },
  {
    cat: "form",
    titlu: "Grup de radio buttons",
    cand: "Structura HTML corectă, cu etichete care funcționează la click.",
    tags: ["radio", "label", "for", "name", "html"],
    lang: "html",
    cod: `<fieldset>
  <legend>Filtrează</legend>

  <input type="radio" name="filtru" id="f-tot" value="tot" checked>
  <label for="f-tot">tot</label>

  <input type="radio" name="filtru" id="f-diab" value="diabetici">
  <label for="f-diab">pentru diabetici</label>

  <input type="radio" name="filtru" id="f-nediab" value="non-diabetici">
  <label for="f-nediab">pentru non-diabetici</label>

  <button type="button" id="afiseaza">Afișează</button>
</fieldset>`,
    nota: "for din label trebuie să fie egal cu id-ul inputului. type=\"button\" previne trimiterea formularului."
  },
  {
    cat: "form",
    titlu: "Reacție imediată la schimbarea unui input",
    cand: "Filtrare la onchange, fără buton.",
    tags: ["change", "input", "onchange", "addEventListener"],
    lang: "js",
    cod: `document.querySelectorAll(".filtru").forEach(function (el) {
  el.addEventListener("change", filtreaza);
});

document.getElementById("cautare").addEventListener("input", filtreaza);`,
    nota: "change se declanșează la ieșirea din input, input la fiecare tastă apăsată."
  },
  {
    cat: "form",
    titlu: "Resetarea filtrelor",
    cand: "Butonul de reset care aduce totul la starea inițială.",
    tags: ["reset", "value", "checked", "resetare"],
    lang: "js",
    cod: `document.getElementById("reset").addEventListener("click", function () {
  document.querySelectorAll('input[type="text"]').forEach(i => i.value = "");
  document.querySelectorAll('input[type="checkbox"]').forEach(i => i.checked = false);
  document.querySelectorAll(".produs").forEach(p => p.style.display = "");
});`
  },
  {
    cat: "form",
    titlu: "Validare cu marcaj vizual",
    cand: "Textarea devine roșie dacă valoarea nu e bună și revine când se corectează.",
    tags: ["validare", "is-invalid", "is-valid", "classList", "input"],
    lang: "js",
    cod: `const zona = document.getElementById("comentariu");

zona.addEventListener("input", function () {
  const valid = zona.value.trim().length >= 10;
  zona.classList.toggle("is-invalid", !valid);
  zona.classList.toggle("is-valid", valid);
});`,
    nota: "toggle cu al doilea argument adaugă clasa dacă e true și o scoate dacă e false."
  },
  {
    cat: "form",
    titlu: "Atribute de input generate din date",
    cand: "min și max pentru un range luate din prețurile reale.",
    tags: ["range", "min", "max", "ejs", "generat"],
    lang: "html",
    cod: `<input type="range"
       min="<%= Math.min(...produse.map(p => p.pret)) %>"
       max="<%= Math.max(...produse.map(p => p.pret)) %>"
       id="pret">`
  },

  // ============ TABELE ============
  {
    cat: "tabel",
    titlu: "Structura completă a unui tabel",
    cand: "Cerința cu thead, tbody, tfoot, caption, th.",
    tags: ["table", "thead", "tbody", "tfoot", "caption", "th", "colspan", "rowspan"],
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
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">Duminica închis</td>
    </tr>
  </tfoot>
</table>`,
    nota: "Când o celulă are rowspan=\"2\", rândul următor are cu o celulă mai puțin."
  },
  {
    cat: "tabel",
    titlu: "Tabel generat din JSON",
    cand: "Fiecare rând vine dintr-un obiect.",
    tags: ["ejs", "tabel", "forEach", "tbody", "json"],
    lang: "html",
    cod: `<table>
  <thead>
    <tr><th>Titlu</th><th>Text</th></tr>
  </thead>
  <tbody>
    <% erori.forEach(function (e) { %>
      <tr>
        <td><%= e.titlu %></td>
        <td><%= e.text %></td>
      </tr>
    <% }); %>
  </tbody>
</table>`
  },
  {
    cat: "tabel",
    titlu: "Rânduri și coloane colorate alternant",
    cand: "Efectul de zebră pe tabel.",
    tags: ["nth-child", "tr", "td", "alternant", "zebra", "tabel"],
    lang: "css",
    cod: `tbody tr:nth-child(odd) { background: #f2f4f7; }

tbody td:nth-child(even) { background: #e8ecf2; }

tbody tr:hover { background: #dde6f5; }`,
    nota: "tr pentru rânduri, td pentru coloane. Se pot combina."
  },
  {
    cat: "tabel",
    titlu: "Tabel cu bară de scroll",
    cand: "Tabel prea lat sau prea înalt pentru ecran.",
    tags: ["overflow", "scroll", "tabel", "responsive"],
    lang: "css",
    cod: `.container-tabel {
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
}

table { border-collapse: collapse; width: 100%; }`,
    nota: "Tabelul se pune într-un div cu clasa container-tabel."
  },
  {
    cat: "tabel",
    titlu: "Tabel responsive pe mobil",
    cand: "Pe ecran mic fiecare rând devine un bloc, cu numele coloanei în față.",
    tags: ["responsive", "tabel", "data-label", "media query", "before"],
    lang: "css",
    cod: `@media (max-width: 700px) {
  table, thead, tbody, tr, td { display: block; }

  thead { display: none; }

  tr { margin-bottom: 1rem; border: 1px solid #ccc; }

  td::before {
    content: attr(data-label) ": ";
    font-weight: bold;
  }
}`,
    nota: "În HTML fiecare td primește data-label=\"Nume coloană\"."
  },
  {
    cat: "tabel",
    titlu: "Tabel transpus",
    cand: "Coloanele devin rânduri pe o anumită dimensiune de ecran.",
    tags: ["transpus", "grid", "tabel", "media query", "grid-auto-flow"],
    lang: "css",
    cod: `@media (max-width: 700px) {
  table {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(4, auto);
  }
  thead, tbody { display: contents; }
  tr { display: contents; }
}`,
    nota: "display: contents face ca elementul să dispară din layout, dar copiii lui rămân — așa ajung celulele direct în grid."
  }
];
