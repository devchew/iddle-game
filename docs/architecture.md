
```mermaid
flowchart TD
  subgraph Start
    A[🔄 Inicjalizacja gry] --> B[📂 Wczytaj stan gracza i konfigurację]
  end

  subgraph MainLoop [Pętla główna -tick co X ms]
    C[⏰ Wyzwól tick] --> D[🛠 Obsłuż akcje gracza]
    D --> E[📥 Dodaj do kolejki zadań]
    E --> F[⚙️ Przetwarzaj kolejkę zadań]
    F --> G[🏭 Symulacja produkcji]
    G --> H[📊 Aktualizuj zasoby i stany budynków]
    H --> I[🔐 Sprawdź odblokowania / osiągnięcia]
    I --> J[💾 Zapis stanu gry - auto-save]
    J --> K[🎨 Renderuj UI / Wyślij aktualizację do frontendu]
    K --> C
  end

  subgraph UserInput [Wejście użytkownika]
    U1[🖱 Kliknięcie / Tapnięcie] --> D
    U2[📜 Zakup/upgreade] --> D
    U3[⚙️ Zmiana ustawień] --> D
  end

  subgraph Persistence [Trwałe dane]
    B --> P1[(DB: PostgreSQL)]
    J --> P1
    J --> P2[(Cache: Redis)]
    P1 --> B
  end
```

### Krótki opis kroków

1. **Inicjalizacja gry**

   * Załaduj konfiguracje fabryk, template’y budynków i mapę gry.
   * Spróbuj odtworzyć ostatni zapis gracza.

2. **Obsługa wejścia gracza**

   * Kliknięcia w UI (budowa nowego modułu, przyspieszenie produkcji itp.) są zamieniane na “zadania” i wrzucane do kolejki.

3. **Przetwarzanie kolejki zadań**

   * Kolejka asynchronicznie rozdziela zadania: budowa, badania, zakupy.

4. **Symulacja produkcji**

   * Na każdy „tick” obliczaj ile surowców wyprodukowano w poszczególnych modułach (biorąc pod uwagę ulepszenia, multiplikatory, limity magazynowe).

5. **Aktualizacja stanów**

   * Zwiększaj zasoby, aktualizuj stan budynków (np. czas do ukończenia produkcji kolejnego przedmiotu).

6. **Sprawdzanie odblokowań i osiągnięć**

   * Jeśli gracz spełni warunki (np. wyprodukuje X przedmiotów), przyznaj osiągnięcie lub odblokuj nowe technologie.

7. **Auto-zapis**

   * Co ustalony czas (np. co minutę) zapisuj stan gry do bazy i cache’u, by zabezpieczyć przed utratą postępów.

8. **Renderowanie**

   * Wyślij do frontend komponentów dane o stanie gry (JSON przez REST/GraphQL lub WebSocket), a UI odświeży wykresy i panele produkcji.

