# Progetto Comparatore di Record in React

Questo progetto è un'interfaccia frontend sviluppata in React per una Single Page Application (SPA). L'applicazione permette agli utenti di visualizzare, cercare, filtrare, confrontare e salvare come preferiti diversi record. Il backend per questa applicazione è preesistente e fornisce le API necessarie per la gestione dei dati.

## Tematica

L'applicazione è un comparatore generico e la tematica specifica dei record (es. prodotti, videogiochi, viaggi) può essere scelta liberamente dallo sviluppatore.

## Funzionalità Principali

L'utente, non autenticato, può:

*   **Sfogliare i Record**: Visualizzare una lista di record con le informazioni principali (titolo e categoria).
*   **Cercare Record**: Effettuare una ricerca testuale nei titoli dei record.
*   **Filtrare Record**: Filtrare i record in base alla loro categoria.
*   **Ordinare Record**: Ordinare i record alfabeticamente per titolo o categoria (A-Z e Z-A).
*   **Visualizzare Dettagli**: Accedere a una pagina di dettaglio per ogni record, mostrando tutte le sue proprietà.
*   **Comparare Record**: Selezionare due record e visualizzarli affiancati per un confronto dettagliato delle loro caratteristiche.
*   **Gestire Preferiti**: Aggiungere o rimuovere record da una lista di preferiti, accessibile da qualsiasi sezione dell'app.

## Interazione con il Backend

Il frontend interagisce con un backend pronto all'uso, clonabile da [questo repository GitHub](https://github.com/boolean-it/progetto-finale-spec-frontend-back). <mcreference link="https://github.com/boolean-it/progetto-finale-spec-frontend-back" index="0">0</mcreference>

### Definizione delle Risorse

Le risorse (es. `Product`, `Game`) vengono definite nel file `types.ts` nella root del progetto backend. Ogni risorsa deve avere almeno le proprietà `title` (string) e `category` (string). <mcreference link="https://github.com/boolean-it/progetto-finale-spec-frontend-back" index="0">0</mcreference> Proprietà come `id`, `createdAt`, e `updatedAt` sono gestite automaticamente dal server. <mcreference link="https://github.com/boolean-it/progetto-finale-spec-frontend-back" index="0">0</mcreference>

Il nome del tipo definito (es. `Product`) determina il nome dell'endpoint API (es. `/products`) e il nome del file JSON di salvataggio dei dati (es. `product.json` nella cartella `/database` del backend). <mcreference link="https://github.com/boolean-it/progetto-finale-spec-frontend-back" index="0">0</mcreference>

### API Disponibili

Il backend espone le seguenti API REST per ogni risorsa:

*   `POST /{tipo}s`: Crea un nuovo record.
*   `GET /{tipo}s/:id`: Restituisce un record specifico.
*   `PUT /{tipo}s/:id`: Aggiorna un record esistente.
*   `DELETE /{tipo}s/:id`: Elimina un record.
*   `GET /{tipo}s`: Restituisce una lista di record. Supporta query string per ricerca (`?search=...`) e filtro per categoria (`?category=...`). <mcreference link="https://github.com/boolean-it/progetto-finale-spec-frontend-back" index="0">0</mcreference>

**Importante**: Il frontend si concentrerà sull'utilizzo delle API `GET` per visualizzare e cercare dati, in quanto l'utente non è autenticato e non può creare, modificare o cancellare record.

### Salvataggio dei Dati

I dati vengono salvati in file JSON nella cartella `/database` del backend. È necessario popolare ogni risorsa con almeno 10 record validi. <mcreference link="https://github.com/boolean-it/progetto-finale-spec-frontend-back" index="0">0</mcreference>

## Tecnologie Utilizzate (Frontend)

*   **React**: Libreria JavaScript per la costruzione di interfacce utente.
*   **Vite**: Build tool per lo sviluppo frontend moderno.
*   **React Router DOM**: Per la gestione del routing all'interno della SPA.
*   **Bootstrap** (o altra libreria di styling come Tailwind CSS, styled-components): Per la gestione dello styling dell'applicazione.
*   **ESLint**: Per il linting del codice.

## Setup e Avvio del Frontend

1.  **Clonare il repository del frontend.**
2.  **Installare le dipendenze:**
    ```bash
    npm install
    ```
3.  **Avviare il server di sviluppo:**
    ```bash
    npm run dev
    ```
    L'applicazione sarà disponibile all'indirizzo `http://localhost:5173` (o la porta indicata da Vite).

## Struttura della Presentazione (10 minuti)

1.  **Introduzione (1 minuto)**
    *   Breve presentazione del progetto: comparatore di record.
    *   Obiettivo: creare un'interfaccia React intuitiva per esplorare e confrontare dati.
    *   Tecnologie chiave utilizzate (React, Vite, Bootstrap/Tailwind).

2.  **Setup del Backend (1 minuto)**
    *   Spiegazione rapida di come funziona il backend fornito.
    *   Come definire le risorse in `types.ts` (esempio: `Product` con `title` e `category`). <mcreference link="https://github.com/boolean-it/progetto-finale-spec-frontend-back" index="0">0</mcreference>
    *   Generazione automatica degli endpoint e dei file JSON. <mcreference link="https://github.com/boolean-it/progetto-finale-spec-frontend-back" index="0">0</mcreference>

3.  **Demo delle Funzionalità Principali (5 minuti)**
    *   **Homepage/Lista Record (1.5 minuti)**
        *   Visualizzazione della lista dei record (mostrando `title` e `category`).
        *   Funzionalità di ricerca per `title`.
        *   Filtro per `category`.
        *   Ordinamento A-Z / Z-A per `title` o `category`.
    *   **Pagina di Dettaglio (1 minuto)**
        *   Navigazione dalla lista alla pagina di dettaglio.
        *   Visualizzazione estesa delle proprietà del record.
    *   **Comparatore (1.5 minuti)**
        *   Modalità di selezione dei record da confrontare (dalla lista, dal dettaglio, ecc.).
        *   Visualizzazione affiancata dei due record selezionati con le loro caratteristiche.
    *   **Preferiti (1 minuto)**
        *   Come aggiungere/rimuovere un record dai preferiti.
        *   Accessibilità e consultazione della lista dei preferiti (es. sezione dedicata, icona).

4.  **Architettura Frontend e Scelte Tecniche (2 minuti)**
    *   Struttura delle componenti React (es. `RecordList`, `RecordDetail`, `ComparisonView`, `FavoritesList`).
    *   Utilizzo di React Router DOM per la navigazione.
    *   Gestione dello stato (es. Context API per preferiti e comparatore, stato locale per filtri/ricerca).
    *   Interazione con le API del backend (utilizzo di `fetch` o `axios`).
    *   Breve accenno allo styling (Bootstrap, Tailwind CSS, o styled-components).

5.  **Conclusioni e Prossimi Passi (1 minuto)**
    *   Riepilogo delle funzionalità implementate.
    *   Eventuali sfide affrontate e come sono state superate.
    *   Possibili miglioramenti futuri (es. autenticazione, funzionalità CRUD complete, test).

---

Questo README fornisce una panoramica del progetto e una guida per la presentazione. Ricorda di personalizzare la tematica dei record e di preparare dati di esempio sufficienti per la demo.
