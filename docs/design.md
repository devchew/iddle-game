### Factorio Mobile – Idle Edition: Kompletny Dokument Wytycznych

---

## 1. Wprowadzenie i cel gry

**Nazwa robocza**: Factorio Mobile – Idle Edition

**Główna idea**: Stworzyć mobilną wersję gry Factorio osadzoną w klimacie surowej, industrialnej fabryki, zachowując kluczowe mechaniki automatyzacji, logistyki i drzewka technologii, a jednocześnie rozbudowując rozgrywkę o elementy idle‑game i międzyplanetarnej ekspansji. Gra ma działać w przeglądarce (PWA), być w pełni responsywna na urządzenia mobilne i wykorzystywać offline‑progress.

**Cel dla gracza**: Rozwijać fabrykę na kolejnych planetach, odblokowywać nowe technologie i surowce przez badania, a ich baza działa automatycznie także podczas nieobecności gracza.

---

## 2. Mechanika rozgrywki

### 2.1. Core Loop i idle

1. **Zbieranie surowców** (automatyczne oraz interaktywne kliknięcie) – koparki generują zasoby: żelazo, miedź, węgiel, krzem (Tier I). Gracz może tapnąć na koparki, by natychmiast zebrać drobną porcję.
2. **Budowanie i rozbudowa** – rozmieszczanie maszyn, przenośników i pieców przy pomocy dotykowego drag & drop, pinch‑to‑zoom i pan. Każda maszyna domyślnie działa kolejno, przekazując zasoby dalej.
3. **Badania i drzewko technologii** – wszystkie ulepszenia (maszyny, nowe linie produkcyjne, międzyplanetarna logistyka) odblokowywane są wyłącznie przez badania. Badania trwają również offline – od momentu rozpoczęcia gracz wraca po pewnym czasie, by odebrać wyniki.
4. **Podbój planet** – zamiast prestiżu (Rebirth) gracz wysyła statek międzyplanetarny po odblokowaniu odpowiednich badań, odkrywa kolejną planetę wyższego tieru z bardziej złożonymi surowcami. Fabryka kontynuuje pracę równolegle na wielu planetach.

### 2.2. Drzewko badań jako jedyny napęd rozwoju

#### Główne gałęzie:

1. **Podstawowe surowce (Tier I)**

   * Koparki P1, Piece hutnicze P1, Przenośniki P1
2. **Międzyplanetarna logistyka**

   * Dok Orbitalny, System Transferu Orbitalnego, Magazyny Planetarne
3. **Zaawansowana przeróbka**

   * Rafinerie chemiczne, Linia montażowa elektroniki, Automatyczne sortery
4. **Eksploracja i kolonizacja**

   * Sondy geologiczne, Terraformowanie, Silniki napędu planetarnego
5. **Idle‑owe moduły (bonusy offline)**

   * VIP Manager (zwiększa wydajność offline), Systemy optymalizacji

Każde badanie wymaga surowców z danego tieru i określonego czasu. Po ukończeniu badania nowe technologie stają się dostępne w menu budowy.

### 2.3. Podbój planet i progresja tierów

1. **Planeta startowa (Tier I)**:

   * Dostępne surowce: żelazo, miedź, węgiel, krzem.
   * Maszyny: młode koparki, podstawowe przenośniki taśmowe, piece.
2. **Technologia „Statek międzyplanetarny”**:

   * Po odblokowaniu: budowa Doku Orbitalnego (koszt: 1M żelaza, 500k miedzi).
   * Czas podróży na Planetę II: 30 minut (timer, pracuje offline).
3. **Planeta Tier II**:

   * Nowe surowce: aluminium, stop lekkich metali, ruda niklu.
   * Wymagana wstępna przeróbka: np. pozyskiwanie stopów.
4. **Planeta Tier III**:

   * Zaawansowane materiały: kryształy optoelektroniczne, superstopy, gazy przemysłowe.
   * Konieczność budowy zaawansowanych rafinerii i chemii.
5. **Planeta Tier IV+**:

   * Polimery, materiały kompozytowe, ciekłe wodory. Najbardziej skomplikowane łańcuchy produkcyjne.

Każda planeta ma unikalne środowisko (pustynna, lodowa, gazowa), co wpływa na wydajność koparek i wymaga specyficznych technologii (np. grzejniki na lód).

### 2.4. Mechanika idle i offline progress

* **Progres offline**: fabryka pracuje do 12 godzin (lub więcej) od momentu wyjścia z gry. Zasoby trafiają do magazynów planetarnych.
* **Web Workers**: symulacja produkcji multiple maszyn/przedsiębiorstw w tle bez blokowania interfejsu.
* **Sondy geologiczne**: po uruchomieniu generują przez ustalony czas (np. 2 h) rzadkie minerały, nawet offline.
* **System Transferu Orbitalnego**: po odblokowaniu technologicznym surowce mogą automatycznie przepływać między planetami, wymaga zbudowania Orbitalnego Magazynu.

### 2.5. Monetizacja i nagrody

* **Free-to-play**: brak możliwości kupowania surowców czy menedżerów.
* **Mikrotransakcje kosmetyczne**:

  * Skórki dla statku międzyplanetarnego i maszyn
  * Tematyczne motywy planetarne
  * Ikony i panele UI w różnych stylach metalowych (np. rdza, stal szczotkowana)
* **Boosty czasowe (opcjonalne)**:

  * Przyspieszenie badań (+50% przez 1 h)
  * Turbo Build (znacznie skraca czas budowy doków/maszyn)
  * Dostępne za oglądanie reklamy lub zakup w sklepie
* **Reklamy dobrowolne**:

  * Oglądanie reklamy = dodatkowy boost offline +2 h lub podwójna produkcja na 30 min.

### 2.6. Elementy społecznościowe

* **Ławka rankingowa (Leaderboard)**:

  * Mierzenie całkowitej produkcji surowców Tier III+ na przestrzeni tygodnia.
* **Wspólne eventy**:

  * Cele produkcyjne dla społeczności (np. wyprodukować łącz­nie 1B kryształów).
* **Blueprint sharing**:

  * Udostępnianie schematów budowy Doków Orbitalnych i kompleksów produkcyjnych przez link lub kod wewnętrzny.

---

## 3. Interfejs i UX

### 3.1. Układ ekranu mobilnego

1. **Górny pasek zasobów**:

   * Ikony realistyczne, metalowe wytłoczenia: żelazo, miedź, krzem, gaz (Tier I).
   * Informacje o stanie badań (ikona probówki + pasek progresu).
2. **Centralny obszar fabryki**:

   * Widok top-down, kafelki z teksturą brudnej ziemi, metalowe ścieżki dla przenośników.
   * Maszyny nasycone rdzą, realistyczne detale rur i śrub.
   * Dotykowe gesty:

     * *Tap to Collect* – zebranie surowców z koparek i magazynów.
     * *Drag to Move* – pan po planszy.
     * *Pinch to Zoom* – powiększanie/zmniejszanie widoku.
3. **Dolny pasek nawigacyjny**:

   * Przyciski:

     * **BUILD** (ikona surowych, ciężkich płyt stalowych, obramowanie z nitami)
     * **RESEARCH** (ikona labolatorium: kolba, probówki, surowe stanowisko pracy)
     * **PLANETS** (ikona planety 3D z metalowym wykończeniem)
   * Wszystkie przyciski w stylu stali, patyna, z realistycznym tłoczeniem.
4. **Instrukcje dotykowe**:

   * Napisy w stylu stemplowanych liter („PINCH TO ZOOM”, „TAP TO COLLECT”), wtopione w metalową płytę.
5. **Mapa galaktyczna** (ekran sekundarny):

   * Lista planet z ikonkami metali szlachetnych i surowych ringów. Pokazanie tieru i statusu fabryki.

### 3.2. Styl graficzny

* **Paleta kolorów**: przygaszone, metaliczne barwy – szarości, brązy, rdzawe pomarańcze, ciemne zielenie. Unikać żywych, pastelowych kolorów.
* **Tekstury i detale**:

  * Przypalone kawałki metalu, rdzewiejące łączenia rur, wgniecenia,
  * Odcienie oleju i zabrudzeń wokół maszyn.
* **Font**:

  * Rodzaj szablonowy, wyglądający na wytłoczony w stali (np. typu stencil), przybrudzony.
* **Animacje**:

  * Subtelne, realistyczne – iskry, parę unoszącą się nad piecami, ruch taśmy przenośnika z odgłosem zgrzytania.
* **Przyciski i UI**:

  * Stare, wypolerowane śruby jako kontrolki, przyciski wyglądają jak kawałki płyty stalowej skręcone nitami.
  * Menu badań: struktura drzewka w formie metalowej tablicy z wypalonymi ścieżkami.

---

## 4. Technologie i architektura techniczna

### 4.1. Silniki i biblioteki do renderingu 2D / kafelków

**Phaser 3**

* Wsparcie tilemap: łatwe zarządzanie kafelkami i warstwami
* Obsługa WebGL z fallbackiem na Canvas
* System scen, tweens, wbudowana obsługa dotyku
* Wtyczki: pathfinding, izometria, zarządzanie stanem

**PixiJS**

* Lekki, wydajny renderer WebGL
* Pozwala na integrację z własnym ECS (np. bitecs) do symulacji
* Kontrola nad warstwami, shaderami i efektami świetlnymi

**Godot (HTML5 export)**

* Open‑source’owy silnik 2D/3D z wizualnym edytorem
* Eksport do WebAssembly + WebGL, działa w przeglądarce
* Wbudowane tilemapy, skryptowanie w GDScript lub TypeScript

### 4.2. Stos językowy i architektura

**TypeScript**

* Statyczne typowanie, czytelny i skalowalny kod
* Kompilacja do ES6+ z automatycznym bundlerem (Vite)

**React / Vue (opcjonalnie)**

* UI komponenty: panele zasobów, drzewko badań, mapa galaktyczna
* State management: Redux (React) lub Pinia (Vue) – globalny stan gry (zasoby, badania, stan planety)

**Web Workers**

* W tle obliczanie produkcji, symulacja transferów międzyplanetarnych
* Separacja ciężkiej logiki od wątku głównego interfejsu

**IndexedDB + Dexie.js**

* Trwałe przechowywanie stanu gry (zasoby, postęp badań, układ fabryki) w przeglądarce
* Obsługa wersjonowania schematu bazy danych dla przyszłych aktualizacji

### 4.3. Offline i PWA

**Service Workers + Workbox**

* Cache’owanie plików HTML, JS, assetów graficznych do działania offline
* Obsługa powiadomień push (opcjonalnie) informująca o zakończeniu badań lub dotarciu statku na planetę

**Manifest Web App**

* Ustawienia PWA: nazwa, ikona, tryb pełnoekranowy, splash screen
* Możliwość instalacji gry na ekran domowy smartfona

### 4.4. Wydajność i skalowalność

**WebAssembly (Wasm)**

* Option: przeniesienie krytycznej logiki symulacji (idle, ekonomia) do Rust/C++ → Wasm
* Zwiększenie wydajności na dużych planetarnych mapach, obsługa setek maszyn

**ECS (Entity-Component System)**

* Biblioteki: **bitecs**, **perform‑ecs** lub rozwiązanie wbudowane w Godot
* Efektywne zarządzanie setkami jednostek (maszyny, przenośniki, koparki)

### 4.5. Build, test i CI/CD

**Vite**

* Szybki bundler z hot-reload, obsługa TypeScript i React/Pixi/Phaser

**Jest / Vitest**

* Testy jednostkowe: symulacja produkcji, logika drzewka technologii, transfery surowców
* Testy e2e (np. Cypress) dla głównych scenariuszy interakcji UI

**GitHub Actions / CircleCI**

* Automatyczne buildy, testy i deploy do hostingu (GitHub Pages, Netlify, Vercel)
* Lintery, formatowanie (ESLint, Prettier)

---

## 5. Roadmapa i plan pracy (Product Owner)

### 5.1. Podział na epiki i sprinty (2‑tygodniowe)

| Sprint     | Epik                             | Zakres                                                                                                                                                                                              |
| ---------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 (2 tyg.) | **Projekt architektury & PoC**   | • Scaffold projektu w TypeScript + Vite<br>• Integracja silnika (Phaser 3 lub PixiJS)<br>• Prosty tilemap builder i widok planszy 10×10<br>• Pierwszy idle‑simulator generowania surowców (offline) |
| 2 (2 tyg.) | **Core Idle & Drzewko Badawcze** | • Logika generowania i zbierania zasobów (online/offline)<br>• Struktura danych drzewka technologii<br>• UI drzewka badań i odblokowywanie węzłów<br>• Persistencja stanu badań w IndexedDB         |
| 3 (3 tyg.) | **Podbój planet & Transfer**     | • Mechanika budowy Doku Orbitalnego<br>• Logika podróży międzyplanetarnej (timer + callback)<br>• UI i dane mapy planet (tiers, surowce)<br>• System transferu surowców międzyplanetarnych          |
| 4 (2 tyg.) | **Interfejs dotykowy & UX**      | • Drag & drop maszyn i przenośników<br>• Gesty pinch‑to‑zoom, pan<br>• Panele zasobów, powiadomienia<br>• Dostosowanie do mobile first (responsywność)                                              |
| 5 (2 tyg.) | **Offline & PWA**                | • Service Worker + Workbox (cache, offline assets)<br>• IndexedDB/Dexie.js do zapisu stanu gry<br>• Manifest PWA (instalacja, splash screen)                                                        |
| 6 (2 tyg.) | **Eventy społecznościowe**       | • Leaderboard dla produkcji Tier III+<br>• Blueprint sharing (URL/kod wewnętrzny)<br>• Eventy badawcze: cele społecznościowe                                                                        |
| 7 (2 tyg.) | **Polishing & QA**               | • Testy jednostkowe z pokryciem \~80% logiki (Vitest)<br>• Testy e2e (Cypress)<br>• Profilowanie wydajności (option: Wasm, optymalizacja ECS)<br>• Lokalizacja na język polski i angielski          |
| 8 (2 tyg.) | **Beta & Release**               | • Publiczny dostęp beta (feedback)<br>• Ostateczne poprawki i optymalizacje<br>• Finalny build PWA<br>• Deploy (Netlify/Vercel), Launch marketing                                                   |

### 5.2. Kluczowe kamienie milowe (Milestones)

1. **M1: PoC Idle + Tilemap** (koniec sprintu 1)

   * Działa prosty widok planszy z kafelkami 10×10
   * Koparki generują żelazo/miedź offline
   * Basic UI bez detalicznych stylów

2. **M2: Podstawowe badania i drzewko** (koniec sprintu 2)

   * Drzewko technologii w UI wczytuje węzły i umożliwia odblokowywanie
   * Badania odliczają czas i zapisują stan w IndexedDB
   * Prostota w budowaniu pierwszych maszyn po odblokowaniu

3. **M3: Pierwszy lot międzyplanetarny** (koniec sprintu 3)

   * Możliwość budowy Doku Orbitalnego po odblokowaniu research
   * Statek startuje i po 30 min trafia na Planetę II
   * Na Planecie II pojawiają się zasoby Tier II i nowe węzły badawcze

4. **M4: Pełne sterowanie dotykowe** (koniec sprintu 4)

   * Drag/drop budynków i przenośników działa na urządzeniach mobilnych
   * Gesty pinch, pan działają płynnie przy dużych mapach
   * UI reaguje na tapnięcia (Tap to Collect)

5. **M5: Offline & PWA ready** (koniec sprintu 5)

   * Gra działa offline, cachowanie zasobów przez Service Worker
   * Instalacja PWA na ekranie domowym (manifest)
   * Progres offline min. 12 h

6. **M6: Social features & eventy** (koniec sprintu 6)

   * Leaderboard, ranking produkcji Tier III+ działa i aktualizuje się
   * Blueprint sharing – generowanie linku lub kodu z gotową konfiguracją
   * Event badawczy: wspólne cele badawcze dla graczy

7. **M7: Internal Alpha & QA** (koniec sprintu 7)

   * Wewnętrzna alfa z pokryciem testów jednostkowych \~80%
   * Profile wydajności: ocena potrzeby Wasm/ECS
   * Lokalizacja gotowa: język polski, angielski

8. **M8: Public Beta & Launch** (koniec sprintu 8)

   * Publiczna beta, zbieranie i analiza feedbacku
   * Ostateczne poprawki (UX, bugfix'y, optymalizacje)
   * Finalny build PWA i deploy (Netlify/Vercel)
   * Launch marketing (media społecznościowe, strona docelowa)

### 5.3. Przykładowe User Stories / Zadania Backlogu

#### Epik 1: Projekt architektury i PoC

* **US1.1**: Jako deweloper chcę mieć szkielet projektu w TypeScript + Vite, aby od razu rozpocząć pracę.
* **US1.2**: Jako gracz chcę zobaczyć planszę kafelkową 10×10, abym mógł rozmieścić koparki i przenośniki.
* **US1.3**: Jako architekt chcę zintegrować Phaser 3 (lub PixiJS), aby wyświetlać tilemapy w WebGL.

#### Epik 2: Core Idle i Drzewko Badawcze

* **US2.1**: Jako gracz chcę, aby koparki generowały surowce co sekundę, nawet gdy nie gram.
* **US2.2**: Jako gracz chcę drzewko badań w UI, by odblokowywać kolejne technologie.
* **US2.3**: Jako system chcę przechowywać stan badań w IndexedDB, żeby postęp był zachowany po wyłączeniu przeglądarki.

#### Epik 3: Podbój planet i transfer zasobów

* **US3.1**: Jako gracz chcę zbudować Dok Orbitalny po odblokowaniu technologii, aby wysłać statek na drugą planetę.
* **US3.2**: Jako system chcę odliczać 30 min czasu podróży międzyplanetarnej, aby po czasie odkryć nową planetę.
* **US3.3**: Jako gracz chcę zobaczyć listę planet wraz z ikonkami tierów i dostępnymi surowcami.

#### Epik 4: Interfejs dotykowy i UX

* **US4.1**: Jako użytkownik chcę przesuwać palcem po planszy (pan), abym mógł obejrzeć dowolny fragment fabryki.
* **US4.2**: Jako użytkownik chcę gestem pinch‑to‑zoom powiększać i pomniejszać widok fabryki.
* **US4.3**: Jako gracz chcę przeciągnąć ikonę maszyny i upuścić ją na wolne kafelki, aby wybudować maszynę.

#### Epik 5: Offline i PWA

* **US5.1**: Jako gracz chcę, żeby gra działała offline i kontynuowała zbieranie surowców przez 12 h bez Internetu.
* **US5.2**: Jako użytkownik chcę zainstalować grę na ekranie domowym, aby mieć łatwy dostęp.
* **US5.3**: Jako system chcę zapisać stan gry w IndexedDB, aby nie utracić postępu po zamknięciu przeglądarki.

#### Epik 6: Eventy społecznościowe

* **US6.1**: Jako gracz chcę zobaczyć leaderboardy produkcji Tier III, aby porównać się z innymi.
* **US6.2**: Jako gracz chcę wygenerować kod/do odczytu blueprintu, abym mógł podzielić się moją konfiguracją z innymi.
* **US6.3**: Jako społeczność chcę wspólnie wykonać cel produkcyjny (np. łącznie 1 B kryształów), aby odblokować nagrodę.

#### Epik 7: Polishing i QA

* **US7.1**: Jako zespół QA chcę mieć pokrycie testami jednostkowymi \~80%, aby zminimalizować regresje.
* **US7.2**: Jako architekt chcę przeprowadzić profilowanie wydajności i ewentualnie przenieść krytyczne fragmenty do Wasm.
* **US7.3**: Jako społeczność międzynarodowa chcę mieć lokalizację na język polski i angielski.

#### Epik 8: Beta i Release

* **US8.1**: Jako gracz beta chcę zgłosić uwagi do rozgrywki, aby ulepszyć ostateczną wersję.
* **US8.2**: Jako deweloper chcę zdeployować ostateczny build PWA na Netlify/Vercel.
* **US8.3**: Jako marketing chcę przygotować stronę promocyjną i materiały graficzne do Launch.

---

## 6. Technologie i narzędzia do implementacji przez zespół

### 6.1. Rendering 2D i silnik gry

* **Phaser 3** (zalecany) lub **PixiJS** jako alternatywa:

  * Obsługa tilemap, animacji, WebGL
  * Obsługa dotyku (drag, tap, pinch, pan)
* **Godot Engine** (HTML5 export) – alternatywa dla zespołów preferujących środowisko wizualne i GDScript/TypeScript.

### 6.2. Języki, frameworki i biblioteki

* **TypeScript** – podstawowy język logiki gry
* **React** (+ Redux) lub **Vue** (+ Pinia) – do komponentów UI (menu, drzewko, panele)
* **Web Workers** – do symulacji produkcji i transferów offline
* **IndexedDB** (przez **Dexie.js**) – trwały storage stanu gry
* **Service Workers + Workbox** – PWA, offline cache, push notifications
* **WebAssembly (opcjonalnie)** – Rust/C++ → Wasm do przyspieszenia symulacji ekonomicznej
* **ECS** (np. bitecs) – zarządzanie obiektami i maszynami na mapie

### 6.3. Narzędzia build & CI/CD

* **Vite** – bundler, dev server, hot reload
* **ESLint + Prettier** – utrzymanie spójnego stylu kodu
* **Jest / Vitest** – testy jednostkowe
* **Cypress** – testy end‑to‑end UI
* **GitHub Actions / CircleCI** – automatyzacja buildów, testów i deployu
* **Netlify / Vercel** – hosting PWA i statycznych buildów

---

## 7. UI/UX – Stylowanie i szczegóły wizualne

### 7.1. Styl graficzny: surowy, industrialny

1. **Paleta kolorów**:

   * Szarości: stal szczotkowana, grafit, metal ciemny
   * Brązy: rdzewiejący mosiądz, miedziane odcienie
   * Zielenie przykurzone, brudne, jako akcent w tle
   * Delikatne akcenty żółci/amber (ostrzeżenia, napędy)

2. **Tekstury**:

   * Metal z drobnymi wgnieceniami, rdzewiejącymi krawędziami, zarysowaniami
   * Zabrudzony dirt (ziemia) pod maszynami i przenośnikami
   * Ślady oleju, wycieki wokół elementów mechanicznych

3. **Fonty i napisy**:

   * Stencilowe lub industrialne (czcionka w stylu maszyn drukarskich)
   * Napisy wypalane lub wytłaczane w stali (lekko przybrudzone)

4. **UI**:

   * Przyciski jako płyty metalowe, przytwierdzone nitami
   * Ramki i obramowania w stylu stalowych płyt z widocznymi śrubami
   * Pasek zasobów jako metalowy panel z wyciętymi ikonami surowców

5. **Animacje**:

   * Subtelne pęcherzyki pary i iskry przy piecach hutniczych
   * Ruch taśm przenośników z realistycznym, lekko zgrzytliwym efektem
   * Rozbłyski przy zakończeniu badań (światło LED, migający panel)

### 7.2. Interfejs dotykowy – detale UX

1. **Tap to Collect**

   * Wskaźnik nad każdą koparką: metaliczna ręka tapnięcia lub napis w metalowej ramce

2. **Drag to Move (Pan)**

   * Ikona czterech strzałek w rogu ekranu, gdy przeciąganie jest aktywne
   * Delikatne wibracje (haptic feedback) przy zmianie sectoru fabryki (opcjonalnie)

3. **Pinch to Zoom**

   * Animator skalowania kafelków: metalowe kraty rozsuwają się/zbliżają dynamicznie

4. **Panel budowy (Build)**

   * Po tapnięciu w „BUILD” wysuwa się pionowa belka z ikonami maszyn– każda ikona w formie odrzuconego, rdzawego fragmentu metalowego
   * Przytrzymanie ikony wyświetla tooltip z nazwą i kosztem surowców (wyświetlane na metalowej tabliczce)

5. **Panel badań (Research)**

   * Po tapnięciu w „RESEARCH” otwiera się drzewko technologii w formie metalowej tablicy z podświetlonymi połączeniami między węzłami
   * Odblokowane węzły mają metaliczny połysk, węzły w toku migają delikatnym czerwonym światłem

6. **Panel planet (Planets)**

   * Ikony planet w stylu metalicznego rendering: Planeta I, II, III z symbolicznymi ringami
   * Wyświetlanie statystyk planety w metalowym sidebarze: dostępne surowce, stan doku orbitalnego, progres badań

7. **Powiadomienia**

   * W prawym górnym rogu subtelny alert (mały znak wykrzyknika w metalowym okręgu) informuje o: zakończeniu badań, przylocie statku, kolejnym evencie społecznościowym

---

## 8. Podsumowanie

Ta dokumentacja zbiera wszystkie wytyczne i założenia dla projektu **Factorio Mobile – Idle Edition**. Zawiera:

* Szczegółowy opis koncepcji gry, mechanik idle i międzyplanetarnego podboju
* Struktura drzewka badań jako jedyny napęd rozwoju
* Opis UI/UX w surowym, industrialnym stylu graficznym
* Stos technologiczny: silniki, języki, biblioteki, PWA, offline, Wasm, ECS
* Roadmapę z podziałem na epiki, sprinty, kamienie milowe oraz przykładowe user stories
* Wytyczne wizualne: paleta kolorów, tekstury, fonty, detale animacji i elementy dotykowe

Niniejszy dokument stanowi punkt odniesienia dla zespołu deweloperskiego, grafiki, QA oraz marketingu. Każdy dział może sięgnąć po odpowiednie sekcje, by poznać swoje zadania i standardy.

Powodzenia w realizacji projektu!
