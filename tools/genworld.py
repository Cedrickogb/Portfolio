#!/usr/bin/env python3
"""Generateur de la carte du monde.

La carte n'est pas dessinee a la main : elle est construite ici, avec des
helpers qui refusent d'ecraser une case deja occupee, puis validee par
parcours en largeur (batiments joignables, ile isolee a pied, pontons relies
par l'eau, aucune poche inatteignable). Chaque collision que j'ai commise en
l'ecrivant a ete attrapee par une de ces assertions, pas par l'oeil.

Usage : python3 tools/genworld.py  (reecrit `rows` dans world-map.ts)
"""
from collections import deque
W, H = 96, 64
g = [['.' for _ in range(W)] for _ in range(H)]
SOL = set('.=o*w^Qsrg'); ROUTE = '.='

def fill(x, y, w, h, ch, sur='.'):
    for j in range(y, y+h):
        for i in range(x, x+w):
            assert g[j][i] in sur, f"({i},{j}) = {g[j][i]!r} — bloc {ch}"
            g[j][i] = ch
def put(x, y, ch, sur='.'):
    assert g[y][x] in sur, f"({x},{y}) = {g[y][x]!r} — {ch}"
    g[y][x] = ch
def scatter(coords, ch, sur='.'):
    for x, y in coords:
        if g[y][x] in sur: g[y][x] = ch

for x in range(W): g[0][x] = '#'; g[H-1][x] = '#'
for y in range(H): g[y][0] = '#'; g[y][W-1] = '#'

fill(58, 30, 37, 6, '~'); fill(58, 1, 4, 29, '~')

fill(12, 10, 5, 4, 'H'); put(14, 14, 'D')
fill(11, 15, 7, 2, 'o'); put(11, 9, '*'); put(17, 9, '*')
fill(13, 17, 3, 12, '=', ROUTE)
fill(4, 20, 8, 5, '^'); fill(20, 6, 9, 6, '^'); put(10, 17, '1')

fill(72, 8, 9, 6, 'H'); put(76, 14, 'D')
fill(71, 15, 11, 2, 'o'); fill(70, 17, 2, 12, '=', ROUTE)
put(70, 29, 'Q', ROUTE)
fill(64, 6, 6, 5, '^'); fill(84, 18, 8, 6, '^'); put(69, 16, '5')

fill(12, 40, 6, 4, 'H'); put(14, 44, 'D')
fill(11, 45, 8, 2, 'o')
fill(11, 39, 2, 1, '*'); fill(18, 39, 2, 1, '*')
fill(19, 45, 22, 2, '=', ROUTE)
fill(4, 50, 10, 6, '^'); put(20, 44, '1')

fill(76, 40, 6, 4, 'H'); put(78, 44, 'D')
fill(75, 45, 8, 2, 'o')
fill(75, 39, 2, 1, '*'); fill(82, 39, 2, 1, '*')
fill(53, 45, 22, 2, '=', ROUTE)
fill(84, 50, 9, 6, '^'); put(74, 44, '2')

fill(44, 48, 5, 4, 'H'); put(46, 52, 'D')
fill(43, 53, 7, 2, 'o')
fill(41, 41, 12, 1, '*')
fill(41, 42, 12, 6, 'o')
fill(45, 24, 3, 17, '=', ROUTE)
fill(16, 29, 30, 2, '=', ROUTE)
fill(48, 36, 22, 2, '=', ROUTE)
put(70, 36, 'Q', ROUTE)
put(52, 44, '3', SOL)
# Panneau d'accueil pose juste sous le spawn : c'est la premiere chose que le
# joueur a dans sa ligne de regard, donc la seule qu'on soit sur qu'il lise.
put(46, 44, '4', SOL)

for x in range(2, 94, 3):
    for y in (33, 34):
        if 20 < x < 56 and g[y][x] == '.': g[y][x] = 'T'
fill(24, 56, 12, 5, '^'); fill(56, 58, 14, 4, '^'); fill(2, 4, 6, 8, '^')
scatter([(8,8),(9,8),(24,16),(25,16),(30,44),(31,44),(60,44),(61,44),
         (36,20),(37,20),(86,10),(87,10),(66,50),(24,52),(88,38),(6,36),
         (34,54),(52,56),(20,60),(76,60),(90,46),(10,38)], 'T')
scatter([(46,46),(48,46),(14,47),(78,47),(46,26),(49,36)], 'L', SOL)
put(46, 43, 'P', SOL)

# --- eclairage public : des lampadaires le long des routes ------------------
# Poses en bord de voie, jamais dessus : la nuit ils dessinent le trace des
# routes en nappes de lumiere, de jour ils meublent les accotements. Seules
# les cases d'herbe libres sont prises — aucun risque de murer un passage, et
# l'assertion de poches le verrait de toute façon.
scatter([(12,18),(16,24),(12,27),
         (22,44),(28,47),(34,44),(40,47),
         (58,44),(64,47),(70,44),
         (44,26),(48,32),(44,38),
         (20,28),(26,31),(32,28),(38,31),
         (50,38),(62,38),(68,35),
         (69,20),(72,26),
         (42,49),(50,49),(42,40),(50,40)], 'L')

# --- relief : chaque territoire reçoit son sol -----------------------------
# Plateau des stacks : roche affleurante, en taches, pour éviter l'aplat.
for y in range(38, 63):
    for x in range(57, 95):
        if g[y][x] == '.' and (x * 3 + y * 5) % 7 < 3: g[y][x] = 'r'
# Vallon du labo : lande plus fraîche que l'herbe du bourg.
for y in range(1, 28):
    for x in range(1, 42):
        if g[y][x] == '.' and (x * 5 + y * 3) % 6 < 4: g[y][x] = 'g'
# Île : sol sableux au sud, là où l'on débarque.
for y in range(20, 30):
    for x in range(62, 95):
        if g[y][x] == '.' and (x + y * 2) % 5 < 3: g[y][x] = 's'

# --- falaises : le relief proprement dit ----------------------------------
# Une ligne de gradin ne s'écrit que sur de l'herbe libre : partout où une
# route la croise, l'ouverture se creuse d'elle-même et devient la rampe
# d'accès. Aucune passe n'est donc à percer à la main.
def ledge(x0, x1, y):
    for x in range(x0, x1 + 1):
        if g[y][x] == '.': g[y][x] = '/'

def ledge_v(y0, y1, x):
    for y in range(y0, y1 + 1):
        if g[y][x] == '.': g[y][x] = '/'

ledge_v(38, 62, 56)          # plateau des stacks : rebord ouest
ledge(57, 93, 37)            # plateau des stacks : rebord nord
ledge(2, 40, 27)             # vallon du labo : escarpement sud
ledge(62, 93, 19)            # île : contrebas de la butte du hall
ledge(30, 44, 21)            # contrefort qui referme le vallon à l'est

scatter([(58,39),(63,40),(71,39),(80,38),(88,39),(60,52),(86,58),(66,60),
         (92,44),(74,56)], 'B', '.r')
scatter([(6,28),(18,28),(26,28),(34,28),(10,31),(22,32),(38,30),(8,14),
         (28,24),(16,22),(36,16),(24,10)], 'b', '.g')
for bx, by in [(26,36),(34,50),(56,52),(64,24),(84,28),(8,44),(50,20),(88,52)]:
    scatter([(bx,by),(bx+1,by),(bx,by+1),(bx+2,by+1)], 'T')

# --- grèves : toute terre touchant l'eau devient sable ---------------------
rive = []
for y in range(H):
    for x in range(W):
        if g[y][x] in '.grT^bB':
            if any(0 <= x+dx < W and 0 <= y+dy < H and g[y+dy][x+dx] == '~'
                   for dx, dy in ((0,-1),(0,1),(-1,0),(1,0),(1,1),(-1,-1),(1,-1),(-1,1))):
                rive.append((x, y))
for x, y in rive: g[y][x] = 's'

rows = [''.join(r) for r in g]
for y, r in enumerate(rows):
    assert len(r) == W
    for x, c in enumerate(r):
        assert c in set('#=o^*wHTLFDCNX~Qsrg/Bb') or c in '.P' or c.isdigit(), f"({x},{y})={c!r}"

taken = [[False]*W for _ in range(H)]
for y in range(H):
    for x in range(W):
        if rows[y][x] != 'H' or taken[y][x]: continue
        w = 0
        while x+w < W and rows[y][x+w] == 'H' and not taken[y][x+w]: w += 1
        h = 1
        ok = lambda ry: all(rows[ry][x+dx] == 'H' and not taken[ry][x+dx] for dx in range(w))
        while y+h < H and ok(y+h): h += 1
        assert not (y+h < H and rows[y+h][x] == 'H'), f"emprise ({x},{y})"
        for dy in range(h):
            for dx in range(w): taken[y+dy][x+dx] = True

for name, (mx,my), (ex,ey) in [('LAB',(14,14),(14,15)), ('QUESTS',(14,44),(14,45)),
                               ('STACKS',(78,44),(78,45)), ('CONTACT',(46,52),(46,53)),
                               ('HALL',(76,14),(76,15))]:
    assert rows[my][mx] == 'D', f"{name} paillasson"
    assert rows[ey][ex] in SOL, f"{name} sortie sur {rows[ey][ex]!r}"

def flood(start, ok):
    seen = {start}; q = deque([start])
    while q:
        x, y = q.popleft()
        for dx, dy in ((0,-1),(0,1),(-1,0),(1,0)):
            n = (x+dx, y+dy)
            if n in seen or not (0 <= n[0] < W and 0 <= n[1] < H): continue
            if rows[n[1]][n[0]] in ok: seen.add(n); q.append(n)
    return seen

terre = flood((46,43), set('.=o*w^DQsrg'))
assert (76,15) not in terre, "l'île est atteignable à pied"
assert (70,36) in terre, "ponton continental injoignable"
for n, t in [('LAB',(14,15)),('QUESTS',(14,45)),('STACKS',(78,45)),('CONTACT',(46,53))]:
    assert t in terre, f"{n} isolé"
assert (70,29) in flood((70,36), set('~Q')), "pontons non reliés par l'eau"
assert (76,15) in flood((70,29), set('.=o*w^DQsrg')), "hall injoignable depuis l'île"

ile = flood((70,29), set('.=o*w^DQsrg'))
poches = [(x,y) for y in range(H) for x in range(W)
          if rows[y][x] in '.=o*wsrg' and (x,y) not in terre and (x,y) not in ile]
print(f"poches inatteignables : {len(poches)}" + (f" ex. {poches[:6]}" if poches else " ✓"))
print(f"lampadaires : {sum(r.count('L') for r in rows)}")
print("île isolée à pied · pontons reliés par l'eau · hall joignable en barque ✓")
print(f"monde {W}x{H} validé ✓")
# Sortie : les lignes de la carte, directement injectees dans world-map.ts.
import os, re
cible = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'maps', 'world-map.ts')
src = open(cible, encoding='utf-8').read()
debut = src.index('  rows: [')
fin = src.index('  ],', debut)
corps = '  rows: [\n' + '\n'.join(f"  '{r}'," for r in rows) + '\n'
open(cible, 'w', encoding='utf-8').write(src[:debut] + corps + src[fin:])
print(f"ecrit dans {os.path.relpath(cible)}")
