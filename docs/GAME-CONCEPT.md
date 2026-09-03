# Uppercase+ — Portfolio jouable

Document de conception & feuille de route.
Transformer le portfolio actuel (Next.js 14, esthétique GBA) en un mini-jeu explorable,
avec une direction artistique mixant pixel art et 3D.

**Décisions arrêtées (2026-08-31)**

| Sujet | Décision |
|---|---|
| Périmètre v1 | **2 zones** : Labo/Maison + Quartier des Quêtes. Mise en ligne rapide, extension zone par zone ensuite. |
| Assets | **Assets-as-code** : géométrie composée en Three.js, textures et sprites pixel art générés par du code. Modèles glTF externes seulement en secours ponctuel. |
| Combat « Debug Battle » | **Reporté en v2.** Les badges s'obtiennent par le dialogue. |
| `EXPERIENCE_DATA` | Vrai parcours à fournir par Cédrick → alimentera le Hall des Trophées (v2). 
  Vertim Coders – Développeur Web Frontend (Juillet 2023 – Mars 2026)
    Développement d'applications web de personnalisation (Enseignes lumineuses & Façades) :
    Architecture & Données : Conception de la structure de données et choix technologiques pour plusieurs applications dédiées à la
    configuration sur-mesure.
    Développement Front-End : Création de configurateurs clients intuitifs permettant la personnalisation visuelle (enseignes
    lumineuses et façades).
    Interfaces Admin : Développement de tableaux de bord esthétiques assurant la gestion fluide des commandes pour chaque
    application.
    Expérience Utilisateur (UX) : Optimisation de la navigation et de l'ergonomie pour maximiser la conversion sur les deux plateformes.
  41Devs - Développeur Web Frontend (Avril 2023 – Juin 2023)
    Développement du site vitrine d’un des produits d’une organisation promouvant une application mobile visant à créer et à rassembler
    une grande communauté réunissant les agents de santé en Afrique et favorisant l’apprentissage médicale.
    ANIP (Septembre 2020 – Décembre 2020)
  Agent Contrôleur Qualité recruté de L'Agence Nationale d'Identification des Personnes (ANIP) dans le cadre du projet Contrôle Qualité
    visant à assainir et réguler les informations de la population enregistrer pendant le projet Ravip
|

---

## 1. Le principe directeur

> Le jeu est **une façon de visiter** le portfolio, pas la seule.

Deux modes qui partagent **la même source de données** (`constants.ts` : `QUESTS`, `TECH_DATA`, `EXPERIENCE_DATA`) :

| | Mode Jeu (`/game`) | Mode Classique (`/`, `/projects`, `/stacks`, `/contacts`) |
|---|---|---|
| Cible | visiteur curieux, pairs devs, réseaux sociaux | recruteur pressé, mobile bas de gamme, robots SEO |
| Rendu | canvas WebGL, client-only | SSR, HTML sémantique, léger |
| Rôle | montrer *comment* tu codes | dire *ce que* tu as fait, en 30 secondes |

Ce n'est pas une concession, c'est l'argument : un recruteur qui voit les deux comprend
que tu sais faire du spectaculaire **et** du responsable. Le bouton « CV » et le mode
classique doivent être atteignables depuis le jeu à tout moment.

---

## 2. Concept

### Pitch

Tu es **PLAYER 1**, dev freelance débarquant dans la **région de Cotonou**.
Objectif : explorer la région, remporter les **8 badges de compétences** en affrontant
les gardiens des stacks, et compléter le **Journal de Quêtes** (= les projets livrés).
Chaque zone est une section du portfolio, chaque PNJ raconte une vraie information.

### Le monde — 5 zones

Une carte unique, contiguë, en tiles de 16×16. Pas de menu : on **marche** vers l'info.

```
                    ┌─────────────────┐
                    │  HALL DES       │  Expériences pro (EXPERIENCE_DATA)
                    │  TROPHÉES       │  Vitrines datées + PNJ ex-collègues
                    └────────┬────────┘
                             │
   ┌──────────────┐   ┌──────┴───────┐   ┌──────────────┐
   │  ARÈNE DES   │───│    PLACE     │───│  QUARTIER    │
   │   STACKS     │   │   CENTRALE   │   │  DES QUÊTES  │
   │ (TECH_DATA)  │   │  spawn + PNJ │   │  (QUESTS)    │
   └──────────────┘   │  guide       │   └──────────────┘
                      └──────┬───────┘
          ┌──────────────────┼──────────────────┐
   ┌──────┴───────┐                     ┌───────┴──────┐
   │  LABO / MA   │                     │  CENTRE DE   │
   │  MAISON      │                     │  CONTACT     │
   │ Bio + CV     │                     │  Formulaire  │
   └──────────────┘                     └──────────────┘
```

- **Labo / Maison** — le `Hero` actuel devient une pièce : un poster « Character Bio »,
  un PC qui affiche les stats (XP 4 ans, STR Next.js/Vue 3, LOC Cotonou), et un
  ordinateur qui **télécharge le CV** (interaction la plus importante du jeu).
- **Arène des Stacks** — chaque techno de `TECH_DATA` est un piédestal. S'en approcher
  ouvre la fiche (type, années, projets, « Special Move »). Battre le gardien = badge.
- **Quartier des Quêtes** — chaque projet de `QUESTS` est un **bâtiment visitable**.
  Entrer = panneau de quête plein écran (level, tags, features, lien live).
  Les projets `active: false` (Twitter Clone, Mr Streaming) sont des maisons volets
  fermés avec la mention « Quête archivée ».
- **Hall des Trophées** — timeline verticale à parcourir, une stèle par expérience.
- **Centre de Contact** — pastiche de centre de soins : « On va restaurer votre projet
  à pleine santé ». La borne d'accueil ouvre le formulaire (`Contact.tsx` existant).

### Direction artistique : le mix pixel / 3D

C'est le cœur technique. La recette qui marche, dans l'ordre :

1. **Décor en 3D low-poly.** Modèles simples (cubes, plans, prismes), *flat shading*,
   textures 16 à 32 px appliquées en `NearestFilter` (jamais de filtrage linéaire).
   Un lampadaire, un arbre, un toit ont du volume : ombres portées, parallaxe réelle.
2. **Personnages en sprites pixel art**, sur des plans *billboardés* (toujours face
   caméra). 4 directions × 4 frames de marche. C'est la technique « HD-2D »
   (Octopath Traveler) : le contraste 2D/3D est ce qui rend le look désirable.
3. **Caméra orthographique inclinée** (~35°), légèrement en surplomb, comme les
   overworlds GBA/DS. Pas de perspective : l'ortho préserve la lisibilité pixel.
4. **Passe de pixelisation.** La scène est rendue dans un render target à basse
   résolution — **240×160, la résolution native de la GBA** — puis agrandie en
   nearest neighbor. Tout le monde partage la même grille de pixels : la 3D « devient »
   du pixel art. En pratique on rendra plutôt en 480×320 (×2) pour rester lisible
   sur grand écran, avec le ×1 en easter egg « mode GBA authentique ».
5. **Quantification de palette** via une LUT : la 3D est ramenée à une palette fixe
   d'une trentaine de couleurs, construite autour de tes tokens existants
   (`#76C829` primary, `#2bee79` battle-green, `#e63946` hp-red, `#4cc9f0` xp-blue).
   C'est ce qui unifie définitivement les deux médiums.
6. **Overlay CRT / scanlines** — déjà écrit dans `globals.css` (`.crt-effect`,
   `.scanline-overlay`, `.scan-line-anim`). À réutiliser tel quel par-dessus le canvas.

> ⚠️ Piège n°1 du pixel-3D : le *shimmer*. Si la caméra se déplace en sous-pixels,
> les contours grouillent. Il faut **snapper la position caméra sur la grille de pixels**
> à chaque frame. À régler en phase 2, pas après.

### Boucle de jeu et systèmes

- **Déplacement case par case** (style Pokémon) : une pression = une tuile, ~8 tuiles/s,
  animation de marche interpolée. Bien plus lisible qu'un déplacement libre, et la
  collision devient triviale (grille booléenne).
- **Dialogues** : boîte en bas d'écran, `Press Start 2P`, effet machine à écrire,
  « ▼ » clignotant, avancée avec A/Entrée/clic. Le composant existe déjà en germe dans
  `Hero.tsx` (bulle + « Press A to Continue ») — à extraire en `<DialogueBox />`.
- **Menu START** : Journal de Quêtes (projets), StackDex (technos), Carte, CV,
  Mode Classique, Options (son, scanlines, taille pixel), Sauvegarder.
- **Sauvegarde** en `localStorage` : position, badges obtenus, quêtes lues,
  % de complétion. Retour du visiteur = « Continuer / Nouvelle partie ».
- **Progression visible** : un compteur « 3/8 badges — 42% explorés » qui donne
  envie de finir. C'est le seul vrai mécanisme de rétention.
- **Combat (bonus, phase 5)** : « Debug Battle ». Un bug sauvage apparaît, tu choisis
  une stack, l'attaque est le « Special Move » déjà écrit dans `TECH_DATA`
  (« Virtual DOM Manipulation », « Type Safety Shield »…). Purement scripté, gagné
  d'avance, 20 secondes. Sert de récompense narrative, pas de challenge.

### Mobile & accessibilité (non négociable)

- D-pad + boutons A/B tactiles en overlay, canvas au ratio 3:2.
- Navigation clavier complète, focus visible dans les menus.
- `prefers-reduced-motion` → coupe scanlines, shake, particules.
- Détection WebGL absent ou FPS < 25 sur 5 s → bandeau « Passer en mode classique ? ».
- Tout texte de dialogue existe aussi dans le DOM du mode classique → contenu jamais
  prisonnier du canvas (SEO + lecteurs d'écran).

### Stratégie d'assets : *assets-as-code*

Décision structurante : **aucun fichier binaire d'art**. Tuiles, props et sprites sont
décrits en TypeScript et générés à l'exécution. Conséquences concrètes : identité 100%
unique, poids quasi nul, tout est versionné et *diffable* dans git, et modifier une
couleur du décor est un changement d'une ligne au lieu d'un aller-retour dans un éditeur
d'image.

**a) Textures pixel — une grille de caractères.** On écrit le pixel art comme de l'ASCII
art, avec une palette nommée. C'est lisible, éditable à la main, et versionnable :

```ts
// src/game/assets/textures/grass.ts
export const grass: PixelArt = {
  size: 16,
  palette: { '.': '#2f6b1f', ',': '#3a7d26', "'": '#4a8f2e', '-': '#265c1a' },
  pixels: [
    '..,..-...,..,-..',
    ".'..,..-..,'...,",
    // … 16 lignes de 16 caractères
  ],
};
```

Un helper unique `makePixelTexture(art)` dessine la grille dans un `<canvas>` hors écran
et renvoie une `THREE.CanvasTexture` en `NearestFilter` / `magFilter: NearestFilter`.
Coût : quelques dizaines de textures 16 px, générées en moins de 5 ms au total.

**b) Props 3D — composition de primitives.** Pas de Blender : chaque prop est une
fonction qui assemble des `BoxGeometry` / `CylinderGeometry` et renvoie un `THREE.Group`.
Un arbre = un tronc + deux boîtes de feuillage. Un lampadaire = trois boîtes. Le style
low-poly volontairement anguleux *est* le style — il n'y a rien à sculpter.
Les géométries statiques d'une zone sont fusionnées (`mergeGeometries`) et instanciées
(`InstancedMesh` pour les tuiles répétées) pour tenir le budget de draw calls.

**c) Sprites de personnages — même DSL, assemblés en atlas.** 4 directions × 4 frames de
marche, chaque frame en 16×24 px, écrites dans le même format grille → un atlas 64×96
généré au chargement, animé par décalage d'UV sur un plan billboardé.

**d) Palette unique.** Toutes les palettes dérivent d'un seul fichier construit sur tes
tokens existants (`#76C829`, `#2bee79`, `#e63946`, `#4cc9f0`). C'est ce qui garantit que
le décor 3D et les sprites 2D appartiennent au même monde.

> ⚠️ Le vrai coût de cette approche n'est pas technique, c'est **le dessin lui-même**.
> Générer par code ne dispense pas de décider à quoi ressemble une touffe d'herbe.
> Parade : un jeu de 6 tuiles et 4 props maximum pour la v1, réutilisés partout.
> Un modèle glTF externe reste possible pour un ou deux props signature (le PC du Labo)
> si le code n'y arrive pas — le chargeur restera en place pour ça.

### Contraintes légales

Aucun asset Nintendo : ni sprite, ni musique, ni police extraite, ni nom de marque.
« Inspiré de » est libre, copier ne l'est pas. Donc : vocabulaire original
(**StackDex** et non Pokédex, **Centre de Contact** et non Centre Pokémon,
**Badges de compétences**, **Debug Battle**), assets faits main ou CC0.

---

## 3. Architecture technique

```
src/
  app/
    page.tsx              → écran d'accueil : ▶ JOUER / MODE CLASSIQUE
    (classic)/            → le site actuel, inchangé, SSR
    game/page.tsx         → dynamic(() => import('@/game/Game'), { ssr: false })
  data/
    constants.ts          → SOURCE UNIQUE (déplacé depuis la racine)
    map.json              → export Tiled : tuiles + collisions + interactables
  game/
    Game.tsx              → <Canvas> + HUD
    engine/               → boucle, input, grille de collision, caméra
    world/                → tilemap, props glTF, zones
    entities/             → Player, NPC (sprites billboard)
    ui/                   → DialogueBox, StartMenu, QuestPanel, TouchControls
    fx/                   → PixelationPass, PaletteLUT, transitions
    store/                → zustand : position, dialogue, save, flags
  assets/game/            → sprites, tilesets, .glb, audio
```

**Dépendances à ajouter** (~150 kB gzip, chargées uniquement sur `/game`) :
`three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`,
`zustand`. Audio : API Web Audio native suffit, `howler` si ça devient pénible.

**Outils gratuits** : Tiled (cartes), Aseprite ou LibreSprite/Piskel (sprites),
Blender (props low-poly → glTF), BeepBox (musique chiptune), jsfxr (bruitages).
Packs CC0 en secours : Kenney.nl.

**Budget perf** (à tenir, pas à espérer) : `/game` < 2,5 Mo total au premier chargement,
assets chargés par zone, < 80 draw calls, 60 fps sur un mobile milieu de gamme de 2022.
Le mode classique ne doit **rien** payer pour tout ça.

---

## 4. Feuille de route

Périmètre **v1 = Labo/Maison + Quartier des Quêtes**, assets générés par code, sans combat.
Estimations en jours de travail effectif (~4 h). En soirées/weekends : compter 4 à 6 semaines
pour la v1 en ligne.

> Les Stacks ne disparaissent pas de la v1 : un terminal dans le Labo ouvre le **StackDex**
> (la fiche de chaque techno de `TECH_DATA`). C'est l'Arène des Stacks — la version
> explorable — qui attend la v2.

### Phase 0 — Assainir la base · 1 j
Non glamour, mais tout le reste s'appuie dessus.
- [x] Retirer `<script src="cdn.jsdelivr.net/npm/@tailwindcss/browser@4">` de `layout.tsx` :
      il entre en conflit avec la build Tailwind v3 locale et bloque le rendu.
- [x] Retirer `experimental.appDir` de `next.config.mjs` (obsolète en Next 14).
- [x] Supprimer le code mort : `projects.tsx`, `contacts.tsx`, `stacks.tsx`, `Home.tsx`,
      `trash.js` (aucun import). Décider du sort de `Experiences.tsx` (jamais monté).
- [x] `page.tsx` importe `Navbar` sans le rendre → rendre ou retirer.
- [x] Déplacer `constants.ts` et `types.ts` → `src/data/`, alias `@/data`.
- [x] Auto-héberger les 6 familles via **Fontsource** (paquets npm). `next/font/google`
      a été écarté : Google Fonts est injoignable depuis l'environnement de build.
      Les .ttf de `src/app/fonts` sont Geist/Montserrat/Nunito — ni utilisés, ni référencés.
- [x] Vrai parcours intégré dans `EXPERIENCE_DATA` : Vertim Coders, 41Devs, ANIP.

Corrigé en plus, hors périmètre annoncé :
- [x] `page.tsx` dupliquait le state de thème, la scanline et la grille déjà fournis par
      `ThemeProvider`, avec un `<main>` imbriqué → deux overlays empilés sur l'accueil.
- [x] `metadata.icons` pointait vers `/favicon.svg` alors que `public/` n'existe pas
      → renommé `src/app/icon.svg` (convention App Router).
- [x] `Projectss.tsx` : `key` posée sur l'`<article>` au lieu de la racine du `.map`.
- [x] `TechStack.tsx` : `fill-opacity` → `fillOpacity` (×2).
- [x] `.claude/launch.json` : épingle Node 20 (le Node par défaut de la machine est en
      16.20, sous le minimum de Next 14).

Laissé volontairement de côté :
- `src/app/fonts/` : 1,1 Mo de .ttf non référencés (Geist, Montserrat, Nunito). Aucun coût
  à l'exécution car jamais importés — à supprimer quand tu confirmes.
- `src/app/favico.ico` : doublon typographique de `favicon.ico`.
- Material Symbols et Font Awesome restent en CDN (2 feuilles de style bloquantes).
- `Projectss.tsx` utilise `<a>` au lieu de `next/link` → rechargement complet à chaque clic.

### Phase 1 — Prototype boîte grise · fait ⭐ la phase qui décide de tout
Zéro art. Des cubes gris. On valide la *sensation*.
- [x] Route `/game`, canvas r3f client-only (`ssr: false`), store zustand.
- [x] Carte de test 40×25 tuiles en grille de caractères (`src/data/maps/test-map.ts`).
- [x] Déplacement case-par-case clavier + D-pad tactile.
- [x] Caméra ortho inclinée à 35° qui suit le joueur avec lissage.
- [x] Rendu en tampon basse résolution 480×443 (2× la largeur GBA), `image-rendering: pixelated`.
- [x] Panneaux interactables ouvrant une `<DialogueBox />` sur A, avec machine à écrire.

Ajouté en cours de route, non prévu au plan :
- [x] **Règles extraites en fonction pure** (`src/game/engine/movement.ts`) : `decide()`
      ne touche ni au store ni à three.js. Testable hors navigateur, et la boucle de
      rendu ne fait plus qu'appliquer l'intention retournée.
- [x] **19 assertions moteur** (`npm run test:engine`) : parsing, collisions, règles de
      pas, dialogue, plus un parcours en largeur qui vérifie que **chaque panneau est
      atteignable depuis le spawn** — un panneau enfermé est un bug de contenu silencieux.
- [x] **Groupes de routes** : le site classique passe sous `src/app/(site)/` avec son
      `ThemeProvider`, `/game` reste hors du groupe pour s'afficher plein écran.
      Les URLs sont inchangées.
- [x] `src/game/**` **ajouté aux `content` de Tailwind** — sans ça aucune classe du
      moteur n'était générée et le canvas restait en hauteur 0.

Détails de mise au point qui valent d'être notés :
- L'ordre des déclarations `image-rendering` compte : `pixelated` doit venir en dernier,
  sinon `crisp-edges` gagne.
- `event.code` désigne la touche *physique* : `KeyW/A/S/D` couvre donc WASD en QWERTY
  **et** ZQSD en AZERTY sans aucune détection de disposition.
- r3f exclut volontairement `size` de ses props côté web et mesure son conteneur
  lui-même : ne pas chercher à lui imposer une taille.
- Ne jamais lancer `next build` pendant que `next dev` tourne : les deux écrivent dans
  `.next` et le serveur de dev casse sur un `Cannot find module './xxx.js'`.

> **Porte de sortie — à toi de trancher.** Le comportement est vérifié (pas, collisions,
> pivot sur place, dialogue, gel du déplacement). En revanche « est-ce que c'est agréable »
> ne se mesure pas : lance `npm run dev`, va sur `/game`, et juge la vitesse des pas
> (`STEP_MS`), le lissage caméra (`CAMERA_LERP`) et le cadrage (`VISIBLE_TILES_X`) —
> les trois se règlent dans `src/game/config.ts`.

### Phase 2 — Pipeline assets-as-code & direction artistique · fait
- [x] `PixelArt` : grille de caractères + validation, rasteriseur pur, puis
      `textureFromRaster()` en `NearestFilter` sans mipmaps.
- [x] Palette unique de 32 couleurs (`assets/palette.ts`), bâtie sur les tokens Tailwind.
- [x] 6 tuiles 16×16 : herbe, herbe fleurie, chemin, brique (face et dessus), plancher.
- [x] 4 props composés de primitives (arbre, lampadaire, panneau, bâtiment), géométries
      fusionnées et rendues en `InstancedMesh`.
- [x] Héros : atlas 64×96 généré par code, billboard incliné, ombre au sol,
      animation par décalage d'UV.
- [x] Snap caméra sur la grille de pixels (anti-shimmer).
- [x] Overlay CRT réutilisé depuis `globals.css`, avec respect de `prefers-reduced-motion`.
- [x] **Outillage** : `npm run assets:preview` écrit une planche PNG de tous les assets
      (encodeur PNG maison, ~60 lignes). Générer du pixel art sans jamais le regarder
      est le meilleur moyen de livrer une texture cassée.
- [x] **14 assertions d'assets** (`npm run test:assets`) sur ce que l'œil ne tranche pas :
      symétrie exacte gauche/droite, asymétrie du profil, opacité complète des tuiles,
      et le fait que le cycle de marche anime réellement quelque chose.

**Écart assumé au plan : pas de LUT de quantification.** La LUT était un moyen, pas une
fin — l'objectif était que chaque pixel soit exactement une couleur de la palette. En
cuisant une couleur par orientation de face dans l'attribut `color` des géométries et en
rendant le tout en `meshBasicMaterial`, **la scène ne contient aucune lumière** : il n'y a
donc aucune teinte intermédiaire à corriger. Mesuré sur le tampon réel : 28 couleurs
distinctes, dont 26 sont des entrées exactes de `PALETTE` ; les 2 restantes (24 pixels,
**0,014 %**) sont l'ombre semi-transparente du héros mélangée à l'herbe, ce qui est voulu.
Résultat obtenu sans passe plein écran ni dépendance supplémentaire — un gain net pour le
budget mobile.

**Cadrage corrigé par la mesure.** Le doc annonçait 35° d'inclinaison. En orthographique,
plus la vue est rasante, plus le champ s'étire en profondeur : à 35°, on voyait 20 tuiles
de large pour **32 de profondeur**, et donc le vide au-delà des bords de la carte.
Passé à **55°** (`CAMERA_OFFSET = [0, 10, 7]`) : 22,5 tuiles de profondeur, cadrage
quasi carré, plus aucun hors-carte visible.

**Règle de level design qui en découle** : avec une caméra inclinée, tout décor situé au
sud du joueur passe devant lui et masque ses jambes. Les props plantés sur les cases de
circulation doivent rester sous ~0,8 tuile de haut. Le panneau a été raccourci pour ça.

**Poids** : le site classique ne paie rien pour le jeu. `/game` n'ajoute que 1,66 kB au
First Load ; three.js et la scène partent dans un chunk chargé à la demande de **165 kB
gzip**, sous le budget des 2,5 Mo fixé pour la v1.

> **Porte de sortie — à toi de juger.** Le comportement et la palette sont vérifiés par
> la mesure, mais « est-ce que la capture donne envie de la poster » ne se mesure pas.
> Les réglages sont dans `src/game/config.ts` (inclinaison, cadrage, vitesse) et
> `src/game/assets/palette.ts` (toutes les couleurs).

### Phase 2b — Passe de direction artistique · fait
Calée sur une référence d'overworld portable fournie par Cédrick (vue légèrement
basculée, verts pâles, bâtiments à toit quadrillé, clôtures, hautes herbes).

- [x] **Échelle de texels rendue entière.** Le réglage précédent affichait 1,5 pixel de
      tampon par texel : un texel sur deux s'étalait sur 2 pixels, l'autre sur 1, et les
      arêtes bavaient. `PIXEL_BUFFER_WIDTH` est désormais *dérivé* de
      `VISIBLE_TILES_X x TILE_TEXELS x TEXEL_SCALE`, donc l'échelle ne peut plus
      redevenir fractionnaire par accident.
- [x] **Cadrage resserré** : 11 tuiles visibles au lieu de 20, à l'échelle x3.
      Le personnage passe de 24x36 à **48x72 px à l'écran**, soit deux fois plus grand.
- [x] Palette repensée : verts pâles et gris-vert clairs, 45 couleurs.
- [x] 8 tuiles : herbe, massif fleuri, hautes herbes, dalles, terre, toiture à
      quadrillage clair, façade, plancher.
- [x] Héros retravaillé : **format 16x18, soit 1,125 tuile de haut** (48x54 px à
      l'écran), calé sur l'échelle de la référence — un personnage plus grand écrase le
      décor et fait paraître la carte minuscule. Pas de couvre-chef, coupe courte,
      carnation foncée, et un **contour sombre** sans lequel un sprite aux teintes
      moyennes se noie dans l'herbe.

      Trois pièges de lisibilité rencontrés à cette taille, tous tranchés par la mesure
      plutôt qu'à l'estime :
      - les yeux doivent tenir sur **une seule rangée**, sinon il ne reste plus assez de
        peau au-dessus et en dessous pour qu'un visage se lise ;
      - empiler les valeurs sombres (ombre de torse + ceinture + pantalon + contour)
        transforme tout le bas du corps en une seule tache ;
      - la chaussure ne peut être ni brune (elle se confond avec la carnation) ni noire
        (elle se confond avec le contour) : c'est une ardoise très sombre.

      Les dimensions monde du sprite et de son ombre sont **dérivées** du format via
      `TILE_TEXELS` : redimensionner le héros ne demande plus de resynchroniser des
      constantes à la main, et les tests portent sur des propriétés plutôt que sur des
      nombres codés en dur.
- [x] Clôtures basses, et **bâtiments multi-tuiles** : un bloc de `H` dans la grille
      devient une emprise rectangulaire, détectée par `findRectRegions`. Une emprise non
      rectangulaire lève une erreur explicite au lieu de produire un décor incohérent.
- [x] Carte de test redessinée en petit bourg : quatre bâtiments, place dallée compacte,
      ruelles, massifs le long des façades, clôtures, deux zones de hautes herbes.

**Pourquoi un bâtiment n'est pas une seule boîte texturée** : `BoxGeometry` n'a qu'un jeu
d'UV par face, donc impossible d'y mettre le quadrillage sur le dessus et le crépi sur
l'avant. Le bâtiment est décomposé en cinq morceaux — corps, bandeau de toit, porte et
enseigne en couleurs cuites, plus deux quads texturés pour les seules faces qui portent
un motif. Chaque bâtiment clone les textures pour avoir son propre `repeat` : une seule
image décodée en mémoire, autant de cadrages que de tailles.

**Level design mesuré, pas deviné.** La première version plaçait le spawn au centre d'une
place de 9x7 : à 11 tuiles visibles, l'écran ne montrait que de la pierre et pas un seul
bâtiment. Relu sur le tampon de rendu, corrigé en resserrant la place et en déplaçant le
spawn au pied du bâtiment sud-ouest.

### Phase 2c — Ombres portées, silhouette finale et enseignes · fait

- [x] **Silhouette calée sur la référence** : format 16x16, soit exactement une
      tuile, avec des proportions trapues — tête 50 %, torse 29 %, jambes 21 %.
      Sans couvre-chef, coupe courte, carnation foncée.
- [x] **Ombres portées** sur le joueur, les bâtiments, les arbres, les lampadaires,
      les panneaux, les clôtures et les massifs.
- [x] **Police bitmap 3x5** (42 glyphes) et **enseignes de façade lisibles** :
      LAB, QUESTS, STACKS, CONTACT.
- [x] Massifs dotés d'un peu de volume, pour qu'ils portent eux aussi une ombre.

**Les ombres ne sont pas calculées, elles sont projetées.** La scène ne contient
aucune lumière — toutes les couleurs sont cuites — donc pas de shadow mapping
possible, et c'est tant mieux : une ombre calculée a des bords dégradés qui
jureraient avec du pixel art. Chaque ombre est un quad sombre posé au sol et
décalé à l'opposé du soleil, proportionnellement à la hauteur de l'objet
(`shadowOffset()` dans `config.ts`). Bord franc, une seule couleur, un draw call
par famille de décor. Les hauteurs sont exportées depuis `geometry.ts` en
`PROP_HEIGHT`, pour qu'agrandir un arbre sans corriger son ombre soit impossible.

**Ce que ça coûte à la promesse de palette exacte.** Les ombres sont
transparentes par nature, donc elles se mélangent au sol : le nombre de couleurs
à l'écran passe de 27 à 58, et **3,6 % des pixels** sont des mélanges. C'est
assumé — un bord d'ombre opaque jurerait — mais la promesse devient « toute
surface non ombrée est exactement une couleur de PALETTE ».

**Deux fautes de saisie attrapées par les garde-fous, le jour même où ils ont été
écrits** : une enseigne de 8 caractères pour 7 disponibles, et un libellé rattaché
à une case où aucun bâtiment ne commence. Les deux échouent au chargement avec un
message explicite, au lieu de rogner le texte ou de faire disparaître l'enseigne
en silence.

### Phase 2d — Styles de bâtiment et lisibilité des panneaux · fait

- [x] **Bâtiments agrandis** : emprises 5x4 et 6x4 au lieu de 4x3, corps de 1,8 à
      2,2 tuiles selon le style.
- [x] **Quatre styles distincts** (`assets/buildings.ts`) : LAB toit vert et crépi
      crème, QUESTS toit de tuiles rouges sur crépi chaud, STACKS toit bleu et
      façade grise à large débord, CONTACT toit turquoise épais sur crépi blanc.
      Chacun fait varier la toiture, le crépi, la menuiserie, la hauteur, le
      débord de toit et la présence de fenêtres.
- [x] **Fenêtres vitrées** réparties de part et d'autre de la porte, en nombre
      fonction de la largeur de la façade.
- [x] **Panneaux de bord de route rendus visibles.**

**Les motifs sont générés, pas dessinés.** Toiture et crépi ne sont plus deux
grilles figées dans `tiles.ts` mais des fonctions prenant les couleurs du style.
Ajouter un cinquième style est une entrée dans une table, pas deux nouvelles
grilles de 16x16 à composer — et le test vérifie que chaque style produit des
motifs valides, sans trou et sans couleur hors palette.

**Pourquoi les panneaux étaient invisibles.** Leur face avant était en `#76C829`,
le vert de la marque : du vert vif posé sur de l'herbe verte. Ce n'était pas un
problème de taille. La correction est un contraste en sandwich — planche claire
nettement au-dessus de la luminance de l'herbe, cadre en bois sombre nettement
en dessous — avec trois traits suggérant du texte, comme dans les tilesets
d'origine. Le test mesure les deux écarts de luminance plutôt que de se fier à
un jugement à l'œil.

**Un garde-fou de plus** : un style inconnu dans la carte lève une erreur au
chargement, au lieu de faire retomber silencieusement le bâtiment sur le style
par défaut.

### Phase 2e — Contrôle visuel réel via Playwright · fait

Jusqu'ici le rendu n'avait **jamais été vu** : le pane du navigateur intégré est
masqué, et je travaillais par lecture du framebuffer et planches PNG. Playwright
ouvre un vrai navigateur, à 60 fps, et permet la capture d'écran. Trois défauts
sont apparus en une seule image, dont aucun n'était détectable autrement.

- [x] **Cadrage** : à 11 tuiles fixes, chaque tuile occupait une centaine de pixels
      sur un écran d'ordinateur — le jeu ressemblait à une loupe. Le nombre de
      tuiles fixe était une fausse bonne idée. On vise désormais ~17 tuiles, avec
      une **échelle de texel entière** qui s'adapte par paliers à la largeur
      (`texelScaleFor`). Desktop : x4, 17 tuiles. Mobile : x2, 12 tuiles.
- [x] **Enseignes coupées par le toit** : la hauteur de l'enseigne est maintenant
      *déduite* du débord et de l'inclinaison de la caméra (`eaveOcclusion`), au
      lieu d'un décalage fixe. Une avancée de toit masque `débord / tan(55°)` de
      façade sous elle ; toutes les enseignes dépassaient cette limite de 12 à
      26 centièmes de tuile. Les gabarits ont été relevés en conséquence.
- [x] **Massifs fleuris** qui ressemblaient à des blocs blancs : flancs verts,
      sommets rouges, et hauteur réduite.
- [x] **Calage de la caméra sur les bords de carte** : sur un écran étroit et haut,
      le champ vertical couvre 24 tuiles, et le joueur près d'un bord laissait voir
      le vide au-delà de la carte. La caméra est bornée à l'emprise, et centre la
      carte quand celle-ci est plus petite que le champ.

**Leçon de méthode.** La mesure du framebuffer valide des propriétés — palette,
dimensions, présence d'un élément — mais elle ne remplace pas de *voir*. Aucune
des quatre corrections ci-dessus n'aurait été trouvée sans capture d'écran :
elles relèvent toutes du jugement visuel, pas de l'assertion.

### Phase 2f — Finitions de silhouette · fait

- [x] **Arbres** : le problème n'était pas l'occultation du tronc (61 % restait
      visible) mais la silhouette — deux grosses boîtes lisent comme une haie
      taillée. Canopée en trois gradins de largeur décroissante, chacun d'une
      teinte différente, sur un tronc allongé.
- [x] **Jambes du héros** : collées l'une à l'autre, elles formaient au repos un
      bloc de 6 px qui lisait comme une jupe. Deux fuseaux de 2 px séparés par un
      vide central, que le contour vient cerner — c'est la séparation qui fait
      lire deux jambes, pas la différence de teinte. Pantalon éclairci au passage.
- [x] **Porte du style STACKS** : sa menuiserie était en `ink`, donc la porte
      apparaissait comme un rectangle noir découpé dans la façade. Les menuiseries
      doivent rester des matériaux, jamais des trous.

### Phase 3 — Les deux zones et le contenu · en cours

**Fait — la tranche verticale « données → jeu ».**
- [x] **Portes interactives** : chaque bâtiment porteur d'une quête expose une case
      d'accès, calculée au sud du milieu de sa façade. `parseMap` lève une erreur
      si cette case est bloquée ou hors carte — un bâtiment inaccessible est un
      bug de contenu silencieux.
- [x] **`<QuestPanel />`** : fiche plein écran alimentée par `QUESTS` — capture,
      description, fonctionnalités, lien. A ou B la referme, Échap aussi.
- [x] **Enseignes tirées des données** : le libellé vient du titre réel du projet.
      Un identifiant de quête absent de `QUESTS` lève une erreur.

**Point d'architecture tranché en route.** La carte avait d'abord importé `QUESTS`
directement, ce qui a cassé la compilation Node de l'outillage : `constants.ts`
importe des `.webp`, que seul webpack sait résoudre. Le symptôme a révélé le vrai
problème de couches — **la carte est de la donnée de terrain**, elle doit rester
lisible et testable sans rien connaître des projets. Elle ne porte donc que des
identifiants, et la jonction avec le contenu vit dans `world/questBinding.ts`,
côté rendu.

**Fait — intérieurs visitables.**
- [x] **Cartes multiples et téléportation.** Registre `MAPS`, analyse mise en cache,
      et `validateWarps()` qui vérifie au chargement qu'aucune destination ne pointe
      vers une carte inconnue, un mur, ou — pire — une autre case de téléportation,
      ce qui enfermerait le joueur dans un aller-retour sans fin.
- [x] **On entre en marchant** sur le paillasson posé devant la façade, pas en
      pressant une touche. Les arrivées sont toujours *voisines* d'un paillasson.
- [x] **Quatre intérieurs** au gabarit commun : salle de 17x13, comptoir en travers,
      personnage derrière, sortie au sud.
- [x] **PNJ sans un sprite de plus** : le héros étant dessiné par une fonction, un
      personnage n'est que le même dessin avec un autre jeu de couleurs (`LOOKS`).
- [x] **On parle par-dessus le comptoir** : `decide()` cherche l'interlocuteur sur la
      case au-delà du meuble, sinon il faudrait le contourner.
- [x] **`<ListMenu />`** ouvert en fin de dialogue : Journal de quêtes (`QUESTS`) et
      StackDex (`TECH_DATA`), navigables au clavier, qui ouvrent `<QuestPanel />` et
      `<TechPanel />`.
- [x] Fondu au noir sur changement de carte.

**Enseignes redevenues thématiques.** Les avoir rendues data-driven avait transformé
les bâtiments en « un bâtiment par projet ». Ce sont des **pôles** : LAB, QUESTS,
STACKS, CONTACT. La liste des projets vit à l'intérieur, au comptoir — c'est sa place.

**Fait — mobilier, congé, paillassons.**
- [x] **Quatre styles d'intérieur** (`assets/interiors.ts`) : parquet chaud pour le
      registre, damier de boutique pour l'inventaire, carrelage froid pour le labo,
      sol clair pour le contact. Sol et mur sont générés depuis quelques couleurs,
      comme les toitures — ajouter un pôle est une entrée dans une table.
- [x] **Mobilier** : rayonnages garnis, terminal à écran allumé, plantes en pot,
      chacun reprenant la couleur d'accent de son pôle.
- [x] **Réplique de congé** en refermant le menu du comptoir : quitter sans un mot
      donnait l'impression d'avoir coupé la conversation.
- [x] **Paillassons visibles**, dedans comme dehors. C'est la seule case praticable
      qui change l'état du jeu ; rien ne l'indiquait.

**Deux occultations de caméra, même cause.** Le paillasson de sortie était invisible :
le mur sud, plus proche de la caméra que toute la pièce, masque le sol derrière lui
sur `hauteur / tan(55°)` ≈ 1,5 tuile — soit exactement la case du paillasson. C'est le
même phénomène que l'enseigne coupée par l'avancée de toit. Les jeux en vue de dessus
ne dessinent pas ce mur-là ; il reste bloquant mais son rendu est abaissé à 0,35.

**Corrigé — quatre défauts d'intérieur.**
- [x] **Paillassons extérieurs retirés.** La porte du bâtiment suffit à dire par où
      l'on entre ; un tapis de plus au sol encombrait la façade. Ils restent à
      l'intérieur, où rien d'autre ne signale la sortie.
- [x] **Les styles d'intérieur s'appliquent enfin.** Les couleurs de la boîte de mur
      étaient codées en dur en brun au lieu de venir du style — et comme la caméra
      plonge, c'est la face *supérieure* du mur qu'on voit le plus. Toutes les salles
      paraissaient donc identiques malgré quatre styles bien distincts.
- [x] **Le sol prend le style du pôle.** Les cases de plancher posaient en plus leurs
      propres quads de parquet par-dessus le plan de sol, recouvrant le damier ou le
      carrelage. Ces quads ne servent plus qu'aux perrons extérieurs.
- [x] **Comptoirs de bord à bord** : on pouvait contourner le meuble et se retrouver
      derrière, du mauvais côté du guichet.
- [x] **StackDex en cartes**, avec l'icône de chaque techno et sa couleur de marque ;
      la fiche reprend la même icône. Navigation à quatre directions dans la grille.

**Le même bug de `content` glob, une troisième fois.** Les icônes du StackDex
s'affichaient toutes en noir : `src/data/` n'était pas dans les globs de Tailwind,
donc les classes `text-[#42b883]` portées par `TECH_DATA` n'étaient jamais générées.
Après `src/game`, c'est la deuxième fois que du code hors de `src/app` perd
silencieusement ses classes — les deux dossiers sont désormais déclarés.

**Fait — habillage des panneaux et formulaire de contact.**
- [x] **`<GameWindow />`** : le cadre commun à tous les panneaux — double bordure,
      cartouches d'angle vertes, titre en Press Start 2P, barre d'aide en bas.
      Les premières versions étaient des modales web génériques posées sur un jeu
      en pixel art : ni le cadre, ni la typographie, ni le vocabulaire du reste.
- [x] **Corps de texte en VT323**, pas en police d'interface. C'est une police
      pixel : elle appartient au monde, là où Rajdhani lui était étrangère.
- [x] **Jauges segmentées** plutôt que continues. Une barre lisse est un
      graphique de tableau de bord ; une barre en cases est un objet de jeu.
- [x] **« Attaque spéciale »** : chaque description de `TECH_DATA` se terminait
      déjà par « Special Move: … », une donnée écrite pour le site et jamais
      montrée. Elle est extraite du texte et mise en valeur.
- [x] **Formulaire de contact** au comptoir du centre, avec `POST /api/contact`.

**L'envoi passe par le serveur, jamais par le navigateur.** Le paquet `emailjs`
déjà installé est un client SMTP Node — utilisable dans une route, pas côté
client. Des identifiants de messagerie livrés au navigateur sont des identifiants
publics. La route valide les champs, refuse une adresse malformée, et **répond
503 avec un motif explicite tant qu'elle n'est pas configurée** : l'interface le
dit au visiteur au lieu d'avaler son message. Un formulaire qui fait semblant
d'envoyer est pire que pas de formulaire.

Variables à définir : `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO`,
et `SMTP_PORT` (465 par défaut). `NEXT_PUBLIC_CONTACT_EMAIL` affiche en plus un
lien direct quand l'envoi n'est pas branché.

**Un piège de saisie au passage** : le gestionnaire clavier du jeu faisait
`preventDefault()` sur Espace et Entrée pour tout le document — impossible
d'écrire un message. Il ignore désormais les événements venant d'un champ.

**Corrigé — B ne revenait jamais en arrière.**

Chaque panneau posait son propre écouteur `keydown` sur `window`. Quand la fiche
d'une techno s'ouvrait par-dessus le StackDex, Échap déclenchait **les deux à la
fois** : au lieu de revenir à la liste, tout se refermait d'un coup. B était donc
toujours un « quitter », jamais un « retour ».

La correction n'est pas d'ajouter des gardes dans chaque panneau — ce serait la
même course, écrite quatre fois — mais de n'avoir **qu'un** point d'entrée,
`ui/useUiInput.ts`, qui connaisse la pile des couches (`détail > menu > dialogue
> monde`) et ne serve que la plus haute. Effet de bord bienvenu : il lit la même
file que le déplacement, donc **le bouton B du pavé tactile fonctionne enfin**
dans les panneaux, et le D-pad y déplace le curseur. C'était impossible tant que
la logique vivait dans des écouteurs clavier.

- [x] Le curseur de menu vit dans le store : clavier et tactile passent par le
      même chemin, la souris ne fait que le suivre.
- [x] Échap traverse la garde de saisie : on n'est plus piégé dans le formulaire.
- [x] **CV branché** au comptoir du laboratoire, avec la fiche personnage —
      dont les compteurs sont *calculés* depuis `QUESTS` et `TECH_DATA`, jamais
      saisis à la main.
- [x] Fichier renommé `cedrick-ogoubiyi-cv.pdf` : le nom d'origine contenait un
      accent, donc une URL en `%C3%A9`, fragile selon les serveurs et les CDN.

**Un piège de police au passage** : `text-transform: uppercase` sur du Press
Start 2P donnait « CéDRICK » et « QUêTES LIVRéES » — la fonte n'a pas les
majuscules accentuées, qui retombaient en police de secours. Les libellés sont
désormais écrits dans la casse voulue, sans transformation CSS.

**Reste à faire en phase 3**
- [ ] **Quêtes archivées** dans le Journal, grisées et non sélectionnables.
      Aujourd'hui `questEntries()` filtre sur `active` : Twitter Clone et
      Mr Streaming n'existent pas dans le jeu.
- [x] **Hall des Trophées** : cinquième bâtiment, volontairement isolé au nord
      derrière un rideau d'arbres, sur un parvis dallé. Carte du bourg agrandie
      de 40x25 à **52x32** pour lui laisser sa distance.
      - Style `hall` hors gabarit : trois tuiles de haut, large débord, toit
        **cuivré** et **colonnade** en façade. Un édifice qui aurait la même
        silhouette que les maisons voisines ne se lirait pas comme un monument.
      - Intérieur en dallage clair, sans comptoir ni personnage : on n'y vient
        pas demander quelque chose, on y circule entre des stèles.
      - **Consultation par approche**, pas par pression de touche : on se tient
        devant un piédestal et la plaque se lit. C'est le geste qu'on a dans une
        salle d'exposition, et ça évite d'apprendre au visiteur qu'il faut
        appuyer sur A devant un objet qui n'a pas l'air d'un interlocuteur. Le
        panneau ne bloque donc rien et suit les pas.
      - `parseMap` refuse un piédestal sans donnée **et** une donnée sans
        piédestal : un socle vide et une expérience invisible sont deux bugs.
- [ ] **Dialogues à réécrire par Cédrick.** Les miens sont fonctionnels mais
      neutres — 4 panneaux dans le bourg, 4 personnages, 4 panneaux intérieurs.

*Superseded en cours de route, à ne pas reprendre tel quel :* le plan prévoyait
un bâtiment par projet et le StackDex dans le Labo. Les bâtiments sont devenus
des **pôles** (LAB, QUESTS, STACKS, CONTACT) avec la liste au comptoir — c'est
mieux, et c'est ce qui est en place.

### Phase 3b — Le monde · fait

La carte cesse d'être un bourg pour devenir un **monde de 96x64**, découpé en
cinq territoires reliés par des routes.

- [x] **Territoires** : Vallon du Labo, Quartier des Quêtes, Bourg, Plateau des
      Stacks, Île des Trophées — plus **Le Détroit** pour la traversée. Chacun
      annonce son nom à l'entrée et **change la musique**.
- [x] **Six pistes** partageant le même séquenceur : seules changent l'échelle,
      la basse, l'onde et le tempo. Assez pour sentir qu'on a changé de région,
      bien moins coûteux qu'autant de fichiers. Le changement se fait sans
      couper le flux — un arrêt-relance ferait un silence à chaque frontière.
- [x] **Vélo** : ne change aucune règle de franchissement, seulement la cadence.
      Mesuré en jeu : **12 cases en 2 s à pied, 20 à vélo**. Sur une carte de
      cette taille, c'est ce qui sépare la corvée de la promenade.
- [x] **Barque et détroit.** L'île des trophées est **volontairement injoignable
      à pied**. Le franchissement devient contextuel : à pied on suit les
      chemins, en barque on ne suit que l'eau, et le ponton est la seule case
      commune aux deux mondes — donc le seul endroit où l'on embarque.

**La contrainte est vérifiée par le test, pas par la relecture.** Un parcours en
largeur confirme à chaque exécution que l'île reste inaccessible à pied, et un
second parcours *à deux modes* — terre, puis eau depuis chaque ponton atteint,
en alternance jusqu'à stabilisation — confirme qu'aucun contenu n'est pour
autant abandonné. Un raccourci ouvert par mégarde priverait la barque de sa
raison d'être sans que rien ne le signale ; une île trop bien isolée rendrait le
hall inatteignable. Les deux échouent désormais bruyamment.

Le générateur de carte applique la même discipline : rien ne peut écraser une
case déjà occupée, et les emprises de bâtiment sont vérifiées rectangulaires
avant écriture. Trois collisions ont été attrapées ainsi pendant la conception —
dont un panneau posé *dans* un bâtiment et un pont d'une seule case laissé entre
l'eau et la bordure de carte.

**Corrigé au passage** : « Nouvelle partie » ne déplaçait pas le joueur s'il se
trouvait déjà sur la carte du monde — l'effet de placement ne réagissait qu'au
changement de carte. Et l'écran titre ne proposait « Continuer » qu'à qui avait
ouvert une fiche : un joueur ayant seulement marché n'avait pas le choix.

### Phase 3c — Relief, montures et carte du monde · fait

Retour de Cédrick après la première visite du monde : *« la map est juste plus
grande, il n'y a pas vraiment le dynamisme que je recherchais »*, le quai et la
barque introuvables, le vélo sans effet visible, et l'envie d'un plan général
dans le menu. Quatre reproches, quatre causes distinctes.

- [x] **L'eau était enterrée.** Les nappes d'eau étaient posées à `y = -0,06`,
      sous le plan d'herbe qui couvre toute la carte : le détroit existait dans
      les données, était traversable, et n'apparaissait nulle part à l'écran.
      Remontées à `y = 0,008`, avec une **grève de sable** partout où la terre
      touche l'eau — c'est le liseré clair qui fait lire un rivage.
- [x] **Falaises.** Un gradin de 0,8 tuile, infranchissable, taillé au bord des
      plateaux. Le dessus est en **roche, pas en herbe** : la caméra n'ayant
      aucun décalage horizontal, les faces est et ouest sont vues par la tranche
      et chaque gradin masque la face avant de son voisin du nord. Une muraille
      orientée nord-sud ne montrait donc que ses dessus — verts, comme le sol,
      donc invisible. C'est le genre d'erreur qu'aucune relecture n'attrape et
      qu'une capture d'écran tranche en une seconde.
- [x] **Les gradins se taillent dans le sol, jamais dans une route.** Là où une
      route croise la ligne de falaise, l'ouverture se creuse d'elle-même et
      devient la rampe d'accès : aucune passe n'est percée à la main, donc
      aucune ne peut être oubliée.
- [x] **Sols par taches, plus par damier.** Le premier jet teintait le sol des
      territoires avec une formule arithmétique (`(x*3 + y*5) % 7`). En jeu, ça
      donnait des rayures diagonales et des cases isolées qui lisaient comme des
      gravats. Un bruit grossier — une valeur par bloc de 3x3 — dessine la
      tache, un bruit fin en déchire le bord. Même traitement pour les
      rectangles de hautes herbes, rongés au bruit sur leur pourtour.
- [x] **Rochers et buissons**, deux décors bas qui meublent sans jamais masquer
      le joueur.
- [x] **Vélo et barque dessinés.** Deux atlas de plus, choisis par le mode de
      déplacement. Les montures se dessinent **par-dessus** le héros : la coque
      doit masquer les jambes, sinon le rameur marche sur l'eau. Les pneus sont
      en gris sombre et non en noir — le contour de la silhouette est déjà noir
      et une roue noire s'y fondait.
- [x] **Carte du monde dans le menu START**, peinte depuis les données de la
      carte, une case par pixel : elle ne peut pas mentir sur la géographie,
      elle *est* la géographie. Un canvas plutôt qu'une grille d'éléments —
      96x64 demandait six mille nœuds pour une image qui ne bouge jamais.
- [x] **Poches inatteignables comptées par le générateur.** Une falaise mal
      placée n'isole pas un bâtiment — les assertions existantes le verraient —
      mais peut enfermer un bout de prairie où personne n'ira jamais. Ce n'est
      pas une panne, c'est du décor mort : le générateur en affiche le compte à
      chaque exécution (0 aujourd'hui).

**Corrigé au passage** : la touche qui quitte l'écran titre restait dans la file
d'entrées et actionnait la première entrée du menu dès son ouverture — appuyer
sur B après « PRESS START » ouvrait le menu *et* le Journal de quêtes dans la
foulée. Un changement de contexte repart désormais d'une file vide.

### Phase 6 — Une seule langue à la fois · v1

Demandé par Cédrick : **le site est en anglais, le jeu et ses dialogues en
français ; un bouton doit basculer l'ensemble.**

**L'anglais est la langue par défaut**, celle que voient les moteurs de
recherche et le premier visiteur : le portfolio s'adresse d'abord à des
recruteurs anglophones. Le français est un choix explicite, retenu d'une visite
à l'autre.

**Cookie, pas `localStorage`.** Le stockage local n'est lisible qu'après
hydratation : une page rendue au serveur partirait donc toujours en anglais
puis basculerait sous les yeux du visiteur francophone. Le cookie accompagne la
requête — le premier pixel est déjà dans la bonne langue. Prix payé : les pages
qui le lisent deviennent dynamiques, Next ne les pré-génère plus. Pour un
portfolio dont le contenu tient en mémoire, c'est le bon échange.

**Deux chemins, une source.** Les composants serveur lisent le cookie
(`getLang()`), les composants client lisent un contexte (`useT`). La bascule
écrit le cookie, met à jour le contexte — le jeu, entièrement client, change
à l'instant — puis appelle `router.refresh()`, qui rejoue le rendu serveur avec
le nouveau cookie sans recharger la page ni perdre la partie en cours.

**La complétude est un problème de types, pas de discipline.** L'anglais définit
les clés, le français est déclaré `Record<StringKey, string>` : une traduction
oubliée est une erreur de compilation, pas un mot anglais qui traîne dans une
page française. Même principe dans les données du jeu — répliques de personnage
et panneaux portent `Translated<string[]>`, et `parseMap` refuse un personnage
muet dans une seule langue.

- [x] Interface du jeu : menus, panneaux, écran titre, indications de commandes,
      bandeaux de territoire, plaques gravées du hall (« SORTIE » / « EXIT »).
- [x] Tous les dialogues et panneaux du monde, dans les deux langues. Le
      français a récupéré ses accents au passage : ils étaient proscrits du
      temps où je croyais les afficher à la fonte 3x5, alors que ces textes
      passent par du HTML.
- [x] Chrome du site : navigation, fiche du personnage, statistiques, centre de
      contact, StackDex.
- [x] `t()` pure, testée : couverture des deux langues, aucune chaîne vide,
      aucun marqueur de travail oublié, et une garde contre la traduction
      abandonnée en route (moins de 20 % de lignes identiques d'une langue à
      l'autre).

**Ce qui reste en anglais dans les deux langues** — et c'est délibéré pour
cette v1 : les textes longs des *données*, c'est-à-dire les descriptions de
projets, leurs piles techniques et les réalisations du parcours. Ce n'est plus
un travail d'ingénierie mais d'écriture, et ces paragraphes-là parlent au nom
de Cédrick : ils lui reviennent, ou me reviennent en relecture. Le mécanisme
est prêt (`Translated`, resolvers), il ne manque que le texte.

### Réglage — voir le corps suivre le regard · fait

Précision de Cédrick : **« si je regarde à gauche, le corps du perso doit
proportionnellement se tourner dans le même sens ».**

Le corps suivait déjà le regard. Ce qui manquait, c'était de le *voir* : la
caméra était vissée derrière lui, exactement dans son axe. Corps et caméra
pivotaient donc du même angle au même instant, la silhouette ne changeait pas
d'un pixel, et seule la salle semblait tourner autour d'un personnage immobile.

Le remède n'est pas de tourner le corps davantage mais de **désaccoupler
l'orbite de la caméra du cap du regard** : le corps rattrape vite (18/s),
l'orbite traîne (4,2/s). C'est l'écart entre les deux qui rend la rotation
lisible — on voit l'épaule partir dans le sens du regard, puis la caméra se
replacer derrière. Le rapport entre les deux souplesses *est* le réglage.

Mesuré, un quart de tour à gauche :

| instant | regard | corps | orbite |
|---|---|---|---|
| repos | 0,00 | 0,00 | 0,00 |
| 150 ms | −0,34 | −0,24 | −0,10 |
| 350 ms | −0,80 | −0,70 | −0,40 |
| touche lâchée | −0,80 | −0,79 | −0,56 |
| +1 s | −0,80 | −0,80 | −0,80 |

Le corps tient 70 à 90 % de l'angle du regard pendant le mouvement, l'orbite 12
à 50 % : c'est cette différence qui s'affiche. Tout converge ensuite. La visée
suit l'orbite et non le regard, sinon le personnage filerait au bord du cadre à
chaque coup d'œil.

### Correctif — le corps tournait à l'envers · fait

Signalé par Cédrick : **tourner à gauche devrait faire pivoter le corps avec le
regard, pas seulement la caméra.**

Le corps *suivait* déjà le cap — mais le modèle était bâti **face à +z** (nuque
en -z, mains et pointes de pieds en +z) alors que « devant » vaut **-z** dans
tout le moteur : `forwardOf(0)` rend (0, -1), et une case au nord a un z plus
petit. Conséquence : 180° d'écart permanent entre le corps et sa marche. Le
visiteur avançait à reculons, on voyait son visage alors qu'on le suivait de
dos, et un virage à gauche faisait pivoter le corps à l'opposé du regard.

Une erreur de convention ne se voit pas sur une silhouette symétrique : un cube
de peau surmonté d'une calotte se lit aussi bien de face que de dos. C'est
pourquoi elle a survécu à deux relectures — et pourquoi le personnage a
maintenant **deux yeux**. Ils ne sont pas décoratifs : ils rendent l'avant du
corps visible, donc l'erreur constatable.

Tout ce qui est asymétrique en z se lit désormais à un seul endroit, via deux
constantes `FRONT` / `BACK`, et le sens de la foulée s'en déduit au lieu d'être
recopié.

### Correctif — la mobilité ne suivait pas la caméra · fait

Signalé par Cédrick : **« la mobilité du personnage ne suit pas vraiment
l'angle de vue caméra et le positionnement ».** Diagnostic dans le code, pas à
l'œil — quatre défauts, dont un vrai bug de lecture des entrées.

1. **Une seule touche était entendue.** `heldDir()` rend la *dernière*
   direction pressée : c'est le bon choix en vue de dessus, où deux touches
   simultanées produiraient une diagonale que la grille n'a pas. Dans une salle
   en volume, c'est exactement l'inverse — presser ← en marchant remplaçait
   « avance » par « pivote », le visiteur s'arrêtait net et tournait sur place.
   **Aucune trajectoire courbe n'était possible**, et c'est ça qui donnait la
   sensation que le personnage ne suivait pas la caméra. Les deux axes sont
   maintenant lus ensemble (`heldDirs`), donc on avance en tournant.
2. **La caméra traversait les murs.** Elle était posée à 3,1 cases derrière,
   sans aucun test : dos à une cloison, on regardait la salle depuis
   l'extérieur, à travers la maçonnerie. Le bras se mesure désormais pas à pas
   et se replie avant l'obstacle (`boomLength`, pure et testée), avec
   compensation de hauteur — replié sans elle, l'écran n'est plus qu'une touffe
   de cheveux.
3. **La caméra était soudée au cap.** Elle pivotait au même instant que le
   personnage, ce qui se lit comme « la salle tourne autour de moi » et non
   « je tourne ». Elle rejoint sa place avec un lissage exponentiel — donc
   identique à 30 ou 60 images par seconde — et le corps rattrape le cap au
   lieu d'y être collé. L'arrivée, elle, ne se lisse pas : une caméra qui
   *rejoint* sa place depuis l'origine du monde ferait entrer le visiteur par
   un vol plané à travers la façade.
4. **On ne pouvait pas lever les yeux.** Le bandeau gravé est à 2,35 de haut,
   les cartels à 0,62 : sans regard vertical, la moitié de la salle était hors
   champ. La souris glissée donne le cap *et* l'inclinaison, bornée à ±0,5 rad,
   et le déplacement reste horizontal — viser le plafond ne fait pas décoller.

### Phase 5 — Le hall en volume · fait

Demandé par Cédrick : **en entrant dans le hall, le jeu passe de la 2D à la 3D
— on voit la salle, les décors et les piédestaux devant soi, à la 1re ou à la
3e personne.**

Le moteur reposait sur trois règles fondatrices : caméra orthographique calée
au pixel, aucune lumière (toutes les couleurs cuites), déplacement case par
case. Cette salle rompt les trois **et c'est le propos** : on pousse une porte
dans un jeu à la Game Boy et on se retrouve dans une salle d'exposition où l'on
marche. La rupture est locale, déclarée par la donnée (`spatial: true` sur la
carte) et non par le nom du lieu — un deuxième lieu en volume ne demandera
qu'un drapeau de plus.

Ce qui **ne** change pas, et qui fait que la salle appartient encore au même
monde : c'est la même grille de caractères, les stèles sont les mêmes cases
`'X'`, les cartels sont gravés à la même fonte 3x5 que les enseignes du bourg,
et les textures sortent de la même palette, filtrées au plus proche voisin.

- [x] **Déplacement libre** : ↑↓ avancent et reculent dans la direction du
      regard, ←→ pivotent, la souris balaie. Le personnage est un carré de 0,6
      case et la collision se teste **un axe à la fois** — c'est cette
      séparation, et non une optimisation, qui produit le glissement le long
      des murs. Testée d'un bloc, la moindre friction contre un mur arrêterait
      net. `slide()` est pur, donc testé dans node (5 assertions).
- [x] **1re et 3e personne**, réglage « Vue » du menu (éteint hors salle en
      volume). En 3e personne, l'avatar est **le sprite du jeu** en billboard
      face à la caméra : un modèle 3D ferait deux personnages différents.
- [x] **Éclairage réel** : ambiante qui suit la phase du jour, un projecteur
      par stèle, lanterneau visible au plafond — une salle éclairée sans source
      visible a l'air d'un défaut de rendu.
- [x] **Cartels et fiches** : le cartel gravé sur la stèle, la fiche complète
      qui s'affiche à l'approche — le même `trophyNear` que la version 2D, qui
      ne lit que la case entière.

Quatre défauts, dont un signalé par Cédrick après coup :

0. **Le panneau d'accueil s'ouvrait et rien ne pouvait le fermer.** Les règles
   de dialogue vivaient au début de `decide`, la fonction de *déplacement* —
   or le hall n'a ni case ni pas, il n'appelle donc pas `decide`. Une règle
   rangée au mauvais endroit n'est pas dupliquée par accident : elle est
   *oubliée*. Elle est désormais isolée dans `dialogueIntent`, appelée par les
   deux rendus, et un test vérifie que `decide` s'appuie bien dessus au lieu
   d'en garder une copie.

0 bis. **Deux défauts signalés ensuite : pas de porte, et un joueur resté
   plat.**

   *La porte.* Le mur du fond était continu : rien ne disait par où l'on
   repart, dans une salle dont on sait pourtant qu'on est entré quelque part.
   La porte n'est pas placée en dur — on prend la **case de mur qui touche la
   case de téléportation**, donc l'embrasure est toujours là où la carte dit
   qu'on sort, et une salle à deux sorties en aurait deux sans une ligne de
   plus. Chambranle, seuil de cuivre, jour qui entre, plaque « SORTIE » gravée
   à la fonte du jeu. Piège au passage : un plan regarde vers +z par défaut, et
   posé du mauvais côté il ne montrait à la salle que son dos — l'embrasure
   s'ouvrait sur le vide noir derrière le mur.

   *Le personnage.* La première version réutilisait le sprite en billboard, au
   motif qu'un modèle 3D ferait « deux personnages différents ». À l'écran,
   l'argument s'est retourné : un carton plat au milieu d'une salle en
   perspective ne lit pas comme un choix de style, il lit comme un décor pas
   fini. Le visiteur est donc en boîtes, **à la palette et aux proportions
   exactes du sprite** (tête 50 %, torse 29 %, jambes 21 %), membres qui
   pivotent à la hanche et à l'épaule en opposition — c'est le balancement,
   plus que la silhouette, qui fait qu'on se reconnaît de dos. La foulée passe
   par une *référence* et non une prop : en valeur, elle se figeait entre deux
   rendus et le visiteur marchait une jambe en l'air.

Trois autres, trouvés en pilotant la salle :

1. **La fonte a refusé les données.** Elle lève une erreur sur un caractère
   inconnu — utile pour attraper une enseigne mal écrite au chargement, fatal
   pour un cartel gravé depuis `EXPERIENCE_DATA`, où « ANIP — Agence… » et les
   accents sont normaux. D'où `fontSafe()`, qui translittère au lieu de
   refuser. La sévérité reste où elle sert.
2. **La scène ignorait la sauvegarde.** Elle démarrait la visite au spawn de la
   carte alors que le store pouvait dire « devant la deuxième stèle » : la case
   affichée et la position réelle se contredisaient. Même famille que le bug de
   sortie de bâtiment — deux sources pour une seule vérité.
3. **Sortir ramenait aussitôt dedans.** Dans la salle, ↑ veut dire « avance » ;
   dehors, ↑ veut dire « nord ». Une touche encore enfoncée au moment du
   basculement change donc de sens en vol : le visiteur sortait vers le sud et
   la même touche le renvoyait aussitôt sur le paillasson. La file d'entrées se
   vide désormais à chaque changement de mode de rendu — c'est le même remède
   que pour la touche qui quittait l'écran titre.

Reste ouvert : une deuxième salle en volume si l'envie vient, et le son de pas
en réverbération dans le hall.

### Phase 5 — Cycle jour / nuit · fait

Demandé par Cédrick : **un cycle jour/nuit, l'ambiance qui change, et des
lampadaires quand la nuit tombe.**

**L'heure vient de l'horloge du visiteur**, pas d'un temps de jeu accéléré : un
recruteur qui ouvre le portfolio à 22 h arrive de nuit. Un cycle accéléré
aurait produit l'effet inverse de celui recherché — au bout de trente secondes
de visite, l'ambiance clignoterait. Bornes : aube 6-8, jour 8-18, crépuscule
18-20, nuit 20-6.

Corollaire assumé, et c'est le point produit : **la moitié des visiteurs ne
verraient jamais la nuit.** D'où l'entrée « Ambiance » du menu, qui force la
phase et reboucle sur l'heure réelle. Sans elle, le travail resterait invisible
pour la plupart des gens. Le choix est enregistré comme la sourdine — champ
facultatif de la sauvegarde, pas de version à bousculer.

**Deux calques, pas un.** Une multiplication assombrit mais ne déplace pas la
teinte : du vert multiplié reste vert, et la première nuit avait des airs de
sous-bois. Un voile translucide, lui, déplace la teinte mais délave le pixel
art dès qu'il est assez opaque pour assombrir. Les deux ensemble donnent une
nuit bleue et sombre qui garde son piqué — c'est très exactement ce que
faisaient les palettes de nuit des consoles portables.

- [x] **Lampadaires allumés** : nappe de lumière au sol et tête allumée, en
      fondu additif. 31 lampadaires posés par le générateur en bord de voie —
      la nuit, ils dessinent le tracé des routes.
- [x] **Fenêtres allumées** sur les façades, même principe.
- [x] **Plus d'ombres portées la nuit** : l'ombre vient du soleil. La garder
      sous la lune donnerait un éclairage impossible, et c'est le genre de
      détail qui trahit une ambiance plaquée.
- [x] Les intérieurs ne sont pas teintés : une salle n'a pas de ciel. La
      teinter en bleu la nuit donnerait une panne d'électricité.

Deux pièges rencontrés, tous deux dans l'ordre de rendu :

1. **Le héros se promenait en plein jour dans une ville de nuit.** Le voile
   était un matériau *opaque* : il partait donc dans la passe opaque, alors que
   les sprites (joueur, touffes d'herbe) sont transparents et passent après.
   Marqué `transparent`, le voile rejoint la même passe, où `renderOrder`
   tranche. Les halos, eux, passent *après* le voile — un halo multiplié par le
   bleu de la nuit n'éclaire plus rien.
2. **Les halos disparaissaient par intermittence.** La sphère englobante d'un
   `InstancedMesh` est calculée une seule fois, à la première image, puis mise
   en cache. Peuplées dans un `useEffect`, les matrices arrivaient parfois trop
   tard : la sphère se réduisait à l'origine du monde et tout le tas passait à
   la trappe dès que la caméra s'en éloignait. `useLayoutEffect` +
   `computeBoundingSphere()` explicite. Un défaut intermittent est pire qu'une
   panne franche : on l'attribue à autre chose.

Reste ouvert : une variante nocturne des musiques (les pistes sont déjà par
territoire, il n'y a qu'un jeu de hauteurs à décaler).

### Correctif — la plaque du hall, ou l'erreur qui attendait son bâtiment · fait

Signalé par Cédrick : **la plaque du hall est cachée à moitié par le toit.**

`eaveOcclusion` *divisait* par la pente de la caméra au lieu de la multiplier.
Le rayon qui va d'un point de façade vers la caméra s'élève de
`CAMERA_OFFSET.y / CAMERA_OFFSET.z` ≈ 1,43 par unité avancée : pour sortir de
sous le toit il doit franchir tout le débord avant d'atteindre la sous-face, la
hauteur perdue vaut donc `débord × 1,43`, pas `débord ÷ 1,43`.

L'erreur réservait 0,7 fois le débord au lieu de 1,43 — moitié de ce qu'il faut.
Sur les quatre maisons, débord ~0,3, l'écart tenait dans la marge de sécurité et
ne se voyait pas. Sur le hall, débord 0,55, il mangeait les deux tiers de la
plaque. Une erreur de signe dans une formule géométrique n'est pas visible
au moment où on l'écrit : elle attend le cas qui la révèle.

Conséquence en cascade : avec la bonne marge, trois façades devenaient trop
basses pour loger porte (1,1) **et** plaque (0,5) sous l'ombre du débord. Les
hauteurs de corps sont donc désormais **déduites de cette contrainte** —
lab 2 → 2,2, stacks 2,05 → 2,35, contact 2,1 → 2,25 — et non choisies à l'œil.

- [x] **Test géométrique** : pour chaque style, on suit le rayon parti du haut
      de la plaque et on exige qu'il ait franchi le débord avant la sous-face,
      puis que la plaque reste au-dessus de la porte. La propriété physique,
      pas son algèbre — écrire `assert(eave === débord × pente)` n'aurait fait
      que recopier le bug s'il avait été dans l'autre sens. Tout nouveau style
      de bâtiment est couvert d'office.

### Correctif — deux réconciliateurs, une position · fait

Signalé par Cédrick : **on ne ressort pas devant la porte du bâtiment, on est
renvoyé au point de départ du monde.**

La position d'arrivée n'était pas posée par le store mais par un effet du
joueur, à partir d'une *intention* (`pendingSpawn`) que le store déposait. Or le
joueur vit dans le rendu du canvas, qui est un **autre réconciliateur React**
que celui du DOM : l'intention lui parvenait une image avant la nouvelle carte.
La trace le dit sans ambiguïté :

```
[placement] map= Monde              pending= {14,45}   ← posé pendant qu'on est encore dehors
[placement] map= Monde              pending= null      ← intention consommée
[placement] map= Registre des quetes pending= null     ← la carte arrive, plus rien à consommer
                                                        → repli sur le spawn de la carte
```

À l'entrée le symptôme était invisible parce que le spawn de l'intérieur tombe
justement sur la case d'arrivée : le repli donnait par hasard le bon résultat.

Deux sources de vérité qui se croisent ne se rattrapent pas par un garde de
plus. `warpTo` pose désormais **carte, case et orientation dans la même mise à
jour**, et l'effet de placement a disparu — la boucle de rendu lisait déjà la
case logique à chaque image, elle n'avait besoin de personne pour la lui dire.
`pendingSpawn`, `consumeSpawn` et `warping` sont supprimés avec lui.

- [x] **Le vélo ne franchit plus les portes.** Entrer dans un bâtiment remet
      pied à terre, comme la barque le faisait déjà, et l'entrée « Vélo » du
      menu reste visible mais éteinte à l'intérieur — la masquer décalerait
      toutes les suivantes d'un cran.
- [x] **Test de données** : chaque sortie d'intérieur doit tomber à exactement
      une case du paillasson qui y mène — ni plus loin (on ressortirait
      ailleurs), ni dessus (on rentrerait aussitôt). Le bug venait du câblage,
      pas de la donnée, mais une destination erronée donnerait exactement le
      même symptôme, en silence.

### Phase 4 — Systèmes de jeu · en cours

**Fait — sauvegarde et menu START.**
- [x] **Sauvegarde locale** : carte, position, orientation, quêtes lues et technos
      vues. Écrite par abonnement au store — quand quelque chose change, pas
      toutes les secondes — et jamais au milieu d'un pas.
- [x] **Relecture validée champ par champ.** Le contenu de `localStorage` survit
      aux refactors, aux changements de carte et à une console ouverte : une
      donnée douteuse est jetée et la partie repart du début, ce qui vaut
      toujours mieux qu'un joueur téléporté dans un mur. Un numéro de version
      permet d'invalider les sauvegardes d'une forme antérieure.
- [x] **Menu START** ouvert par B dans le monde — il n'y a rien d'autre à annuler
      à ce niveau, et c'est la touche que le joueur essaie en premier. Bouton `≡`
      ajouté au pavé tactile, où aucune touche Échap n'existe.
- [x] **Compteur de progression** : quêtes lues et technos vues. Ce n'est pas
      décoratif — c'est ce qui donne envie de finir le tour, et la preuve visible
      que la partie a été retenue.
- [x] Entrée « Nouvelle partie », qui remet à zéro sans recharger la page.

**Fait — écran titre et audio.**
- [x] **Écran titre** « PRESS START », puis Continuer / Nouvelle partie quand une
      sauvegarde existe. Il sert trois choses à la fois : annoncer où l'on arrive,
      laisser choisir, et fournir le **geste utilisateur** sans lequel aucun
      navigateur n'autorise le son.
- [x] **Audio entièrement synthétisé**, aucun fichier. Même raisonnement que pour
      les textures : un bruitage de pas est une onde carrée de 40 ms, pas un .wav
      de 12 ko. Le jeu reste à poids constant quel que soit le nombre de sons.
- [x] **Boucle musicale séquencée sur l'horloge audio.** Un `setInterval` qui
      jouerait les notes directement dériverait — les timers du navigateur sont
      approximatifs et le décalage s'entend au bout de quelques mesures. On
      planifie 200 ms d'avance sur l'horloge du contexte, qui elle est exacte.
- [x] Sourdine réglable depuis le menu START et **persistée avec la sauvegarde**.
- [x] **Sauvegarde validée à la relecture**, désormais y compris la case : une
      carte remaniée pouvait replacer le joueur dans un mur. La validation est
      extraite en fonction pure et couverte par **9 assertions**.

Vérifié en conditions réelles : aucun contexte audio n'est créé avant un geste
de l'utilisateur, et il passe à `running` juste après.

### Phase 4 (plan initial) · 3 j
- [ ] Écran titre « PRESS START », choix Continuer / Nouvelle partie.
- [ ] Menu START : Journal de Quêtes, StackDex, CV, Mode Classique, Options, Sauvegarder.
- [ ] Sauvegarde localStorage + compteur de quêtes lues / % exploré.
- [ ] Audio : boucle chiptune, SFX (pas, A, menu), mute persistant,
      **jamais d'autoplay** sans geste utilisateur.

### Phase 5 — Intégration, perf & mise en ligne · 3 j
- [x] **Portes d'entrée vers le jeu** : bouton « ▶ Jouer » en tête du Hero et
      entrée dans la navigation. **Écart assumé au plan** — celui-ci prévoyait un
      écran de choix des deux modes à la racine. Un interstitiel avant le contenu
      ferait perdre le recruteur pressé et sortirait le texte de la page indexée ;
      les deux portes coexistent donc sur l'accueil, sans passage obligé.
- [ ] Aperçu animé du jeu sur l'accueil (GIF ou vidéo courte).
- [ ] `/game?goto=trust-flow` téléporte devant la quête (partageable depuis LinkedIn).
- [ ] Mode classique : bouton « Voir dans le jeu » sur chaque projet, et inversement.
- [x] SEO : `/game` en `noindex`, tout le contenu indexable reste côté classique.
- [x] `prefers-reduced-motion` respecté ; navigation clavier complète dans les menus.
- [ ] Détection matériel faible → proposition de bascule vers le mode classique.
- [ ] Tests sur vrai mobile Android bas/milieu de gamme. Lighthouse sur `/` inchangé.

**Total v1 ≈ 19 jours effectifs.**

### v2 — après la mise en ligne de la v1
Arène des Stacks explorable · Hall des Trophées (`EXPERIENCE_DATA`) · Centre de Contact ·
Debug Battle · mode « GBA authentique » en 240×160.

---

## 5. Risques

| Risque | Réalité | Parade |
|---|---|---|
| **Le scope explose** | c'est l'issue par défaut de ce genre de projet | phases 0–4 = version livrable. Le combat est un bonus, pas une étape. |
| **L'art prend 3× le temps prévu** | oui, toujours | 1 tileset, 1 palette, 1 sprite héros. Réutiliser. Kenney CC0 en secours. |
| **Le recruteur ne trouve pas le CV** | échec total du portfolio | CV atteignable en 1 clic dans les deux modes, toujours visible. |
| **Perf mobile** | WebGL + textures = mort sur bas de gamme | budget chiffré dès la phase 1, bascule automatique proposée. |
| **Perte de motivation à mi-chemin** | le vrai risque | déployer à la fin de **chaque** phase. Un prototype en ligne bat un chef-d'œuvre local. |

---

## 6. Point ouvert

Le **vrai parcours professionnel** reste à fournir : intitulés de poste, entreprises
(Vertim Coders…), périodes, lieux, réalisations. Il remplacera les placeholders de
`EXPERIENCE_DATA` en phase 0 et alimentera le Hall des Trophées en v2.
