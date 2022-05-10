
# Xat en temps real utilizant la llibreria Socket.io

## Introducció
Aquest xat té el popòsit de connectar múltiples clients (usuaris amb un navegador) a través de web sockets per poder interactuar en temps real.    
Per poder tenir un millor control del models d'entrada, surtida i errors, aquesta aplicació també fa ús d'intercanvi d'informació a través de 
crides a una API Rest (Express).    
L'stack tecnològic escollit per al desenvolupament ha estat **Angular** per al Frontend i **NodeJs** amb Express per al Backend. La persistència de les dades es gestiona
amb la base de dades NoSQL documental **MongoDB**.

## Prerequisits   

Per poder instal·lar i executar aquesta aplicació a qualsevol dispositiu, s'hauran de cobrir uns requisits de software mínims: 
- Node versió 16 o posterior. Es pot descarregar a https://nodejs.org/en/
- El CLI d'angular amb la versió 13 o posterior. Es pot instal·lar amb npm de forma global amb el comandament (cal exposar l'executable al 
PATH per poder fer ús de la referencia "ng" a la terminal): 
  ```bash
  npm install -g @angular/cli
  ```
- MongoDB instalat i el servidor executant-se al port per defecte. Es pot descarregar a https://www.mongodb.com/try/download/community

## Instal·lació i arranc del projecte   

Un cop satisfets els requisits anteriors, s'hauran d'obrir dues terminals apuntat al aquest respositori clonat a la màquina local.   
Utilitzarem dos terminals perquè la part del Frontend (UI) i la del Backend (server) estan completament separades, tot i que es versionin
a Github a un mateix repo per temes de comoditat.

### Frontend    

La seqüència de comandaments per instal·lar i arrancar la part de Frontend és molt simple:
```bash
cd front
npm install
npm start
```

### Backend   

Per al Backend les instruccions són quasi idèntiques: 
```bash
cd back
npm install
npm start
```
