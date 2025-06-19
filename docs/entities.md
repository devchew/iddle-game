Poniżej rozbudowana „baza maszyn” o niemal wszystkie urządzenia odblokowywane w drzewie technologii Factorio. Podzieliłem je na kategorie, by łatwiej się w tym odnaleźć. Dla każdej maszyny podaję:

* **Koszt stworzenia** (crafty),
* **Co produkuje / funkcja**,
* **Koszt działania** (energia lub paliwo).

---

### 1. Wydobycie i pobór płynów

| Nazwa                     | Koszt stworzenia                                             | Funkcja                     | Koszt działania                                             |
| ------------------------- | ------------------------------------------------------------ | --------------------------- | ----------------------------------------------------------- |
| **Burner Mining Drill**   | 1 × Iron Plate<br>1 × Gear Wheel<br>1 × Engine Unit          | Wydobywa rudę (0,275 /s)    | 180 kW spalania (np. węgiel 20 kJ/szt → \~9 szt/s)          |
| **Electric Mining Drill** | 10 × Iron Plate<br>3 × Gear Wheel<br>3 × Electronic Circuit  | Wydobywa rudę (0,525 /s)    | 90 kW poboru elektrycznego                                  |
| **Pumpjack**              | 10 × Iron Plate<br>10 × Gear Wheel<br>2 × Electronic Circuit | Wydobywa ropę (\~0,3 /s)    | 90 kW poboru elektrycznego                                  |
| **Offshore Pump**         | 10 × Iron Plate<br>2 × Pipe                                  | Pobór wody z morza/rzeki    | Działa bez zużycia energii, wymaga podłączenia do sieci rur |
| **Pipe**                  | 1 × Iron Plate                                               | Transport płynów            | Brak                                                        |
| **Pump**                  | 1 × Iron Plate<br>1 × Electronic Circuit                     | Przepompowuje płyny (45 /s) | 0,5 kW poboru elektrycznego                                 |

---

### 2. Przeróbka rud i produkcja metali

| Nazwa                | Koszt stworzenia                            | Produkcja                   | Koszt działania                           |
| -------------------- | ------------------------------------------- | --------------------------- | ----------------------------------------- |
| **Stone Furnace**    | 5 × Stone                                   | 1 ruda → 1 płytka           | 1 kJ/spawka paliwa (np. węgiel 20 kJ/szt) |
| **Steel Furnace**    | 5 × Steel Plate<br>10 × Stone Furnace       | 1 ruda → 1 płytka (szybszy) | 0,5 kJ/spawka                             |
| **Electric Furnace** | 10 × Steel Plate<br>10 × Electronic Circuit | 1 ruda → 1 płytka           | 90 kW poboru elektrycznego                |

---

### 3. Produkcja komponentów i chemii

| Nazwa                    | Koszt stworzenia                                                                 | Funkcja / Produkcja                 | Koszt działania             |
| ------------------------ | -------------------------------------------------------------------------------- | ----------------------------------- | --------------------------- |
| **Assembling Machine 1** | 4 × Iron Plate<br>5 × Electronic Circuit                                         | Craft 0,5 jednostki/s               | 90 kW poboru elektrycznego  |
| **Assembling Machine 2** | 9 × Iron Plate<br>5 × Steel Plate<br>10 × Electronic Circuit                     | Craft 0,75 /s                       | 150 kW poboru elektrycznego |
| **Assembling Machine 3** | 5 × Steel Plate<br>10 × Advanced Circuit<br>10 × Electric Engine Unit            | Craft 1,25 /s                       | 375 kW poboru elektrycznego |
| **Chemical Plant**       | 5 × Steel Plate<br>5 × Gear Wheel<br>5 × Pipe<br>5 × Electronic Circuit          | Reakcje chemiczne (plastik, itp.)   | 210 kW poboru elektrycznego |
| **Oil Refinery**         | 10 × Steel Plate<br>10 × Gear Wheel<br>10 × Pipe<br>10 × Electronic Circuit      | Przerób ropy na produkty (x3)       | 420 kW poboru elektrycznego |
| **Centrifuge**           | 5 × Steel Plate<br>5 × Pipe<br>10 × Advanced Circuit<br>5 × Electric Engine Unit | Wzbogacanie uranu (10 /s)           | 350 kW poboru elektrycznego |
| **Cracker**              | 10 × Steel Plate<br>5 × Pipe<br>10 × Electronic Circuit                          | Dalsze przetwarzanie produktów ropy | 250 kW poboru elektrycznego |

---

### 4. Generacja i magazynowanie energii

| Nazwa               | Koszt stworzenia                                                 | Funkcja                         | Koszt działania                                 |
| ------------------- | ---------------------------------------------------------------- | ------------------------------- | ----------------------------------------------- |
| **Boiler**          | 10 × Stone<br>1 × Pipe                                           | Podgrzewanie wody               | 1 MW spalania (np. węgiel 20 kJ/szt → 50 szt/s) |
| **Steam Engine**    | 5 × Iron Plate<br>5 × Gear Wheel<br>5 × Pipe                     | Para → energia (gen. ≤900 kW)   | 60 kW poboru pary na silnik                     |
| **Steam Turbine**   | 10 × Steel Plate<br>10 × Pipe<br>10 × Advanced Circuit           | Para wysokociśnieniowa → 5 MW   | 10 MW poboru pary                               |
| **Solar Panel**     | 15 × Steel Plate<br>15 × Electronic Circuit<br>5 × Copper Plate  | Generuje ≈60 kW w pełnym słońcu | Brak                                            |
| **Accumulator**     | 5 × Iron Plate<br>5 × Battery                                    | Magazynuje energię (5 MJ)       | 300 kW ładowania/rozładowania                   |
| **Nuclear Reactor** | 200 × Steel Plate<br>50 × Advanced Circuit<br>1 × Heat Exchanger | Rozszczepienie uranu 40 MW      | 40 MW „produkcji ciepła”                        |
| **Heat Exchanger**  | 10 × Steel Plate<br>10 × Pipe<br>10 × Advanced Circuit           | Zamienia ciepło na parę         | Pobór pary 41 MW                                |

---

### 5. Automatyzacja i badania

| Nazwa                  | Koszt stworzenia                                                  | Funkcja                          | Koszt działania                                 |
| ---------------------- | ----------------------------------------------------------------- | -------------------------------- | ----------------------------------------------- |
| **Lab**                | 10 × Iron Plate<br>10 × Electronic Circuit<br>10 × Copper Plate   | Konsumpcja pakietów badań        | 120 kW poboru elektrycznego                     |
| **Radar**              | 10 × Iron Plate<br>10 × Electronic Circuit<br>5 × Copper Plate    | Odkrywa/mapuje teren             | 10 kW poboru elektrycznego                      |
| **Roboport**           | 45 × Steel Plate<br>45 × Advanced Circuit<br>1 × Battery          | Bazowy punkt robotów             | 300 kW ładowania/rozładowania + pole robotyczne |
| **Construction Robot** | 1 × Electric Engine Unit<br>1 × Battery<br>1 × Electronic Circuit | Automaty budowy i napraw         | Zużycie energii z akumulatora                   |
| **Logistic Robot**     | 1 × Electric Engine Unit<br>1 × Battery<br>1 × Electronic Circuit | Transport przedmiotów w sieci    | Zużycie energii z akumulatora                   |
| **Logistic Chest**     | 1 × Iron Plate<br>1 × Electronic Circuit                          | Bufor i dystrybucja przez roboty | Brak                                            |
| **Beacon**             | 20 × Steel Plate<br>20 × Advanced Circuit                         | Wzmacnia moduły w okolicy        | 480 kW poboru elektrycznego                     |

---

### 6. Końcowe i specjalne

| Nazwa                | Koszt stworzenia                                                                                           | Funkcja                        | Koszt działania                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------ |
| **Rocket Silo**      | 1000 × Steel Plate<br>200 × Concrete<br>200 × Electric Engine Unit<br>200 × Pipe<br>200 × Advanced Circuit | Rakieta kosmiczna (koniec gry) | 10 MW poboru elektrycznego podczas montażu |
| **Artillery Turret** | 20 × Steel Plate<br>10 × Advanced Circuit<br>10 × Pipe                                                     | Obrażenia obszarowe            | 150 kW poboru elektrycznego                |
| **Wall**             | 5 × Stone Brick                                                                                            | Obrona przed bitersów          | Brak                                       |

---

> **Uwagi do wykorzystania:**
>
> * **Skalowanie produkcji** dobieraj liczbę maszyn zgodnie z ich przepustowościami (np. 0,525 rudy/s vs 1,25 craftu/s).
> * **Bilans energetyczny**: sprawdź całkowite zużycie (kW/MW) i dobierz źródła energii (spalanie, solar + akumulatory, nuklearny układ).
> * **Logistyka**: uwzględnij robota logistycznego, beacony i chesty, gdy chcesz zredukować użycie taśm.
