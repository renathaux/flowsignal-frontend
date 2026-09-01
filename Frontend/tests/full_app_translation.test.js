const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const scriptPath = path.join(__dirname, "..", "script.js");
const htmlPath = path.join(__dirname, "..", "app.html");
const source = fs.readFileSync(scriptPath, "utf8");
const html = fs.readFileSync(htmlPath, "utf8");
const start = source.indexOf("const FULL_UI_TRANSLATIONS");
const end = source.indexOf("function tTradeAction", start);

assert.ok(start > 0 && end > start, "full-interface translations are defined centrally");

const context = {};
vm.runInNewContext(`${source.slice(start, end)}
this.translations = FULL_UI_TRANSLATIONS;
this.translate = translateDynamicUiText;
this.canTranslate = isTranslatableUiText;`, context);

assert.ok(Object.keys(context.translations).length >= 180, "the complete app surface is covered");
for (const [english, translations] of Object.entries(context.translations)) {
  assert.ok(english.trim(), "English source text is present");
  assert.ok(String(translations.fr || "").trim(), `${english} has a French translation`);
  assert.ok(String(translations.es || "").trim(), `${english} has a Spanish translation`);
}

assert.equal(context.translate("Broker Accounts", "fr"), "Comptes de courtier");
assert.equal(context.translate("Broker Accounts", "es"), "Cuentas del bróker");
assert.equal(context.translate("FUNDAMENTAL INSIGHT", "fr"), "ANALYSE FONDAMENTALE");
assert.equal(context.translate("FUNDAMENTAL INSIGHT", "es"), "ANÁLISIS FUNDAMENTAL");
assert.equal(context.translate("72.50% Confidence", "fr"), "72.50 % de confiance");
assert.equal(context.translate("72.50% Confidence", "es"), "72.50 % de confianza");
assert.equal(context.translate("● Active Account", "fr"), "● Compte actif");
assert.equal(context.translate("↻ Reset to Defaults", "es"), "↻ Restablecer valores");
assert.equal(context.translate("Strategy profile controls.", "fr"), "Contrôles du profil de stratégie.");
assert.equal(context.translate("Loaded backend settings · production defaults", "es"), "Ajustes del backend cargados · valores de producción predeterminados");
assert.equal(context.translate("Disabled · 9/21", "fr"), "Désactivé · 9/21");
assert.equal(context.translate("Disabled · 9/21", "es"), "Desactivado · 9/21");
assert.equal(context.translate("points", "es"), "puntos");
assert.equal(context.translate("minutes", "es"), "minutos");
assert.equal(context.translate("Foundation only — not active in execution.", "fr"), "Base seulement — non actif dans l’exécution.");
assert.equal(context.translate("Minimum BOS Buffer", "fr"), "Marge BOS minimale");
assert.equal(context.translate("Wired — sets the minimum allowed SL distance; it does not choose the swing.", "es"), "Conectado: define la distancia SL mínima permitida; no elige el swing.");
assert.equal(context.translate("Open Risk Management →", "es"), "Abrir gestión de riesgo →");
assert.equal(context.translate("Allowed: 1–5 R", "fr"), "Autorisé : 1–5 R");
assert.equal(context.translate("Dashboard", "en"), "Dashboard");
assert.equal(context.translate("Signal notifications", "fr"), "Notifications de signal");
assert.equal(context.translate("Signal notifications", "es"), "Notificaciones de señal");
assert.equal(context.canTranslate("Current mode: BLOCK ONLY"), true);

assert.ok(source.includes("translateFullInterface(lang);"), "language changes translate the full app");
assert.ok(source.includes("new MutationObserver"), "dynamic UI refreshes remain translated");
assert.ok(source.includes("document.documentElement.lang = safeLang"), "document language follows selection");
assert.ok(html.includes('script.js?v=123'), "browser cache is busted for the latest dashboard release");

console.log("full app translation tests passed");
