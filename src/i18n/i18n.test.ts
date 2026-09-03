/**
 * Tests du dictionnaire.
 *   npm run test:i18n
 *
 * La complétude est déjà garantie par le typage (`Record<StringKey, string>`),
 * mais le typage ne dit rien de la *qualité* du remplissage : une chaîne vide,
 * un doublon copié-collé d'une langue à l'autre ou un « TODO » oublié passent
 * la compilation sans broncher. C'est exactement ce que ce fichier attrape.
 */
import assert from 'node:assert/strict';
import { LANGS } from './lang';
import { dictionaries, type StringKey } from './strings';

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed++;
  console.log(`  ok  ${label}`);
}

console.log('\ndictionnaire');

const keys = Object.keys(dictionaries.en) as StringKey[];

check('les deux langues couvrent les memes cles', () => {
  for (const lang of LANGS) {
    assert.deepEqual(Object.keys(dictionaries[lang]).sort(), [...keys].sort(), `langue ${lang}`);
  }
});

check('aucune chaine vide', () => {
  for (const lang of LANGS) {
    for (const key of keys) {
      assert.ok(dictionaries[lang][key].trim().length > 0, `${lang}:${key} est vide`);
    }
  }
});

check('aucun marqueur de travail oublie', () => {
  for (const lang of LANGS) {
    for (const key of keys) {
      assert.doesNotMatch(dictionaries[lang][key], /TODO|FIXME|\bXXX\b/i, `${lang}:${key}`);
    }
  }
});

check('le francais ne recopie pas l anglais', () => {
  /* Quelques termes sont identiques dans les deux langues — noms propres,
     sigles, symboles. On tolere ces cas-la, mais pas une majorite de lignes
     recopiees : ce serait le signe d'une traduction abandonnee en route. */
  const identiques = keys.filter((k) => dictionaries.en[k] === dictionaries.fr[k]);
  const part = identiques.length / keys.length;
  assert.ok(part < 0.2, `${identiques.length}/${keys.length} lignes identiques : ${identiques.slice(0, 8)}`);
});

console.log(`\n${passed} assertions passees\n`);
