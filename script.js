// ===== 1. Hamburger menü =====
var menugomb = document.getElementById("menugomb");
var menu = document.getElementById("menu");

// Gombnyomásra ki/be kapcsoljuk a "nyitva" osztályt
menugomb.onclick = function () {
  menu.classList.toggle("nyitva");
};

// Link kattintás után bezárjuk a menüt
menu.onclick = function () {
  menu.classList.remove("nyitva");
};


// ===== 2. Sötét mód =====
var sotetGomb = document.getElementById("sotetgomb");

// Beállítja a gomb ikonját az aktuális mód szerint
function ikonFrissites() {
  if (document.body.classList.contains("sotet")) {
    sotetGomb.innerHTML = "☀️";
  } else {
    sotetGomb.innerHTML = "🌙";
  }
}

// Oldalbetöltéskor megnézzük, mit választott legutóbb a látogató
if (localStorage.getItem("tema") === "sotet") {
  document.body.classList.add("sotet");
}
ikonFrissites();

// Kattintásra átváltunk, és el is mentjük a böngészőbe
sotetGomb.onclick = function () {
  document.body.classList.toggle("sotet");

  if (document.body.classList.contains("sotet")) {
    localStorage.setItem("tema", "sotet");
  } else {
    localStorage.setItem("tema", "vilagos");
  }
  ikonFrissites();
};


// ===== 3. A szolgáltatások adatai =====
var szolgaltatasok = {
  sved:  { nev: "svéd masszázs",          perc: 60, ar: "12 000 Ft" },
  talp:  { nev: "talpmasszázs",           perc: 30, ar: "6 000 Ft" },
  nyak:  { nev: "nyak- és hátmasszázs",   perc: 45, ar: "9 000 Ft" },
  aroma: { nev: "aromaterápiás masszázs", perc: 75, ar: "15 000 Ft" }
};

var szolgaltatasLista = document.getElementById("szolgaltatas");
var arKiiras = document.getElementById("arkiiras");

// Ha választunk egy szolgáltatást, kiírjuk az árat és az időtartamot
szolgaltatasLista.onchange = function () {
  var kivalasztott = szolgaltatasok[szolgaltatasLista.value];
  if (kivalasztott) {
    arKiiras.innerHTML = kivalasztott.perc + " perc · " + kivalasztott.ar;
  } else {
    arKiiras.innerHTML = "";
  }
};


// ===== 4. Dátum: múltbeli napok és vasárnap tiltása =====
var datumMezo = document.getElementById("datum");

// A mai dátum (ÉÉÉÉ-HH-NN), ennél korábbit nem lehet választani
datumMezo.min = new Date().toISOString().split("T")[0];

datumMezo.onchange = function () {
  var nap = new Date(datumMezo.value).getUTCDay(); // 0 = vasárnap
  if (nap === 0) {
    alert("Vasárnap zárva vagyunk, kérjük, válassz másik napot!");
    datumMezo.value = "";
  }
};


// ===== 5. Űrlap elküldése =====
var urlap = document.getElementById("urlap");
var visszaigazolas = document.getElementById("visszaigazolas");
var napNevek = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];

urlap.onsubmit = function (esemeny) {
  esemeny.preventDefault(); // ne töltse újra az oldalt

  // (Ide csak akkor jutunk, ha a böngésző szerint minden mező helyes)
  var nev = document.getElementById("nev").value.trim().split(" ")[0];
  var szolg = szolgaltatasok[szolgaltatasLista.value];
  var nap = napNevek[new Date(datumMezo.value).getUTCDay()];
  var ido = document.querySelector('input[name="ido"]:checked').value;

  visszaigazolas.innerHTML = "Köszönjük, " + nev + "! Foglalásod: " + nap + " " + ido +
    ", " + szolg.nev + " (" + szolg.perc + " perc, " + szolg.ar + ").";
  visszaigazolas.style.display = "block";

  urlap.reset();
  arKiiras.innerHTML = "";
};