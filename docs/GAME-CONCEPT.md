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
