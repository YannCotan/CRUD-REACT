# Système CRUD avec React,MySql,Node/Express

## Etape pour créer un système CRUD avec React,MySql,Node/Express

### Etape 1 : créer une dossier pour notre backend 

- **backend** 
   1. Une fois ce dossier créée , lancer la commande nodejs `npm init`. Cette action vas initialiser une fichier ***package.json*** qui va repertorier les dependances utilisées.
   
   2. Après ça installer ***express*** , ***nodemon*** , ***mysql*** , ***cors***  vous pouvez utiliser les ligne de commande node suivante pour le faire.
   
   ```node
   npm install express
   npm install nodemon
   npm install mysql 
   npm install cors
   /*
      Sous macOs

      yarn install express
      yarn install nodemon
      yarn install mysql 
      yarn install cors
   */
   ```
   
   3. Ensuite créer un **index.js** qui vas servir a créer l'Api REST pour communiquer avec la bd
    - Tout d'abord après l'intallation des dependances neccesaire l'on **import** à présent dans le fichier **index.js** et on initialise dans des variable nos libraire.
   ```javascript
   import cors from "cors"
   import express from "express"
   import mysql from "mysql"

   const app = express()

   //Express server middleware pour pouvoir envoyer des requêtes à la bd
   app.use(express.json())
   app.use(cors())
   ```
    - Toujours dans le fichier index.js de notre backend il sagira de créer des endpoint pour communiquer avec la bd MySql. ci dessous le code de connexion du serveur expresse au serveur SQL :
    ```javascript

    const db = mysql.createConnection({
    host: "l'hôte",
    user:"nom d'utilisateur",
    password: "le mot de passe",
    database: "nom de la base de donnée"
      })

   /*On utilisera donc la variable db quand on voudras manipuler les 
   données de notre base de donnée.*/
    ```

    - Apres cela fait si aucune erreure ne survient on peut desormais creer nos endpoint pour notre Api. Vous avez si dessous des exemple d'endpoint pour un simple systeme crud.
    > CRUD pour Create Read Update Delete

    ```javascript
    //Api endpoint pour stocker des données dans la bd

      app.post('/post' , (req , res)=>{
         const query = "INSERT INTO nomDeLaTable(valeure1 , valeur2 , ... , valeureN) VALUES(? , ?)"
         const values = [req.body.valeure1 , req.body.valeure2 , ... , valeureN] //ce tableau n'est pas destiné a stocker des nombres
         db.query(query , [values , req.body.age/*valeures numériques*/] , (err , result)=>{
            if(err){
                  console.log(err) /*On retourne une erreure si il y'en a une*/
            }else{
                  //Sinon on renvoi ce message
                  res.json('Utilisateur ajouté') 
            }
         })
      })
   ```
   > La fonction `query()` prend comme premier paramètre la reqûete SQL , le 
      deuxième paramètre concerne les paramètres de la requête si ils
      existent sont stockés dans un tableau et le troisième paramètre est une fonction callback.
      `query(Query , [Valeures] , (error , result)=>{/*Something*/})`
   ```javascript
      //Récupère les données de la table user_two
      app.get('/get' , (req , res)=>{
         const query = "SELECT * FROM nom de la table"
         db.query(query , (err , result)=>{
            if(err){
                  console.log(err)
            }else{
                  res.json(result)
            }
         })
      })

      app.put('/user/:id' , (req , res) => {
         const id_user = req.params.id
         const q = "UPDATE nomTable SET `nom_de_la_propriété` = ? WHERE id_user = ?"
         const values = [req.body.valeure1 , req.body.valeure2 , ... , valeureN] //ce tableau n'est pas destiné a stocker des nombres
         db.query(query , [values , id_user/*valeures numériques*/] , (err , result)=>{
            if(err){
                  console.log(err) /*On retourne une erreure si il y'en a une*/
            }
            res.json("Mise à jour réussie de l\'utilisateur")
         })
      })

      app.delete('/user/:id' , (req , res) => {
         const id_user = req.params.id
         const q = "DELETE FROM user WHERE id_user = ?"
         db.query(q, [id_user] , (err , result)=>{
            if(err){
                  console.log(err) /*On retourne une erreure si il y'en a une*/
            }
            res.json("Utilisateur supprimé")
         })
      })
    ```
   - Enfin il ne reste plus qu'a demarrer le serveur `express` avec le code suivant.
   ```javascript
      /*On ecoute au port 8801. Veiller à bien vérifier que le port n'est
       pas deja utilisé par un autre service*/
       app.listen(8801 , (err , response)=>{
         if(err){
            console.log(err)
         }else{
            console.log("Serveur demarré avec succes")
         }
      })
   ```
     Notre Serveur `express` est fin près à communiquer avec le serveur `Mysql`
     il ne reste plus qu'a le demarrer avec la commande `node index.js`. 
     Cependant à chaque modification de fichier du backend il va falloir redémarrer le serveur avec la commande vue précédemment. 
     Pour ne pas avoir a refaire cette manipulation a chaque fois nous
     allons utiliser ``nodemon`` pour redémarrer automatiquement le serveur 
     si il y a modification de fichiers sur le serveur.
     Pour ce faire rendez vous dans le fichier `package.json` qui a été créer à l'initialisation de notre **Backend** et rajouter cette ligne de code `"start": "nodemon index.js"` dans **l'objet JSON** `"script":{}`. 
     Enfin pour démarrer le serveur on utilise maintenant la commande `npm start.`

     ---

### Etape 2 : Créer un dossier client et initialiser le Frontend (`React` dans notre cas)
     
- **Frontend**
  Après avoir bien mis en place notre serveur et notre base de donnée avec notre API
  nous allons maitenant nous attaquer à la partie client **`client side`**.

  #### Installation de `React` avec `Node.js`

  Pour se faire il va falloir installer `React` avec la commande node suivante :
   ```node
      npm install React
      /*Sous macOs yarn install React*/
   ```
  Ensuite naviguer vers le dossier du projet puis executer la commande `npx create-react-app client`.
  Cette commande node va initialiser le projet react et vas créer les fichiers et dossiers requis pour démarrer le frontend. Après que cette 
  commande se soit executer nous allons nous rendre dans le dossier **`src/`** de notre **client** et ouvrir le fichier `App.jsx` qui contiendra par défaut plusieurs lignes de code à l'intérieur de la fonction **`function App(){}`** que nous allons supprimer en laissant la **div** `<div className="App"></div>`.

   #### **Création des routes et pages**

   > Nous allons créer différentes pages pour atteindre nos **Api Endpoint** mais notez que cela n'est pas forcément necessaire. Vous pouvez tout a fait atteindre l'api en regroupant tout votre code sur l\'`App.jsx`

   Comme dit nous allons créer à l'intérieue de **`src/`** un dossier **`pages/`**  à lintérieur du quel on créer les fichiers **`Add.jsx`** , **`Update.jsx`** , **`Users.jsx`** et **`index.js`** .
   
   A l'interieur de nos fichiers **`Add.jsx`** , **`Update.jsx`** , **`Users.jsx`** on aura le squelette du composant react qui peut être écris automatiquement avec l'extension [**ES7+**](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) avec le racourci `rafc`.
   Du coup pour par exemple le fichier **`Users.jsx`** on aura ce code :
   ```javascript

      import React from 'react'

      export const Add = () => {
         return (
            <div>Add</div>
         )
      }

   ```

   Le fichier `index.js` servira à exporter les différents composants que sont les pages que nous avions créer avec le code qui suit :

   ```javascript

      import Add from "./Add";
      import Users from "./Users";
      import Update from "./Update";

      export {Add,Users,Update} 
   ```

   > Vous remarquerez que les nom de nos pages sont similaires aux différents noms des endpoints .

   Nous aurons besoin d'installer une dernière dépendance pour pouvoir créer des routes avec **`react`** avec la commande

   ```node
   npm install react-router-dom 
   /*Sous macOs*/ 
   yarn install react-router-dom
   ```
   Ensuite à l'intérieur du fichier **`App.js`** on va ajouter ces lignes de code 
   ```javascript

      import {
      BrowserRouter,
      Routes,
      Route
      } from "react-router-dom";
   ``` 
   au tout début du script jsx. Puis toujours dans le fichier `App.js` dans la fonction **`return(){}`** on va créer les différentes routes pour atteindre les différentes pages créées voici à quoi le code ressemble
   ```javascript

      return (
         <div className="App">
            <BrowserRouter>
            <Routes>
               <Route path="/" element={<Users />} />/*si la route est pas
                                             précisée rediriger vers la page Users*/
               <Route path="/add" element={<Add />} />
               <Route path="/update" element={<Update />} />
            </Routes>
            </BrowserRouter>
         </div>

         /*<Route path="/Nom de la route" element={<Nom_du_composant_react/>}*/
      );
   ```
   Tout est fin prêt pour lier le front au back. Nous allons dans ce tuto comment insérer et recupérer des données d'une base de données MySQL.

   #### Création du formulaire (Add.js)

   Je vous mets le code commenté en dessous :
   ```javascript

       import axios from "axios";
      import { useState, useEffect } from 'react';

      function App() {
         // État local pour stocker le nom, l'âge et les données de l'utilisateur
         const [nom, setNom] = useState("");
         const [age, setAge] = useState(0);
         const [data, setData] = useState([]);

         // Utilisation de useEffect pour charger les données initiales depuis l'API
         useEffect(() => {
            const fetchAllData = async () => {
               try {
                  // Appel à l'API pour obtenir les données des utilisateurs
                  const response = await axios.get('http://localhost:8801/get/');
                  setData(response.data); // Mise à jour des données avec la réponse de l'API
               } catch (error) {
                  console.log(error);
               }
            };
            fetchAllData();
         }, []);

         // Fonction pour ajouter un nouvel utilisateur
         const postUser = () => {
            if (nom.trim() !== "" && age > 0) {
               // Vérification pour s'assurer que le nom n'est pas vide et l'âge est positif
               axios.post('http://localhost:8801/post/', {
                  nom: nom,
                  age: age
               }).then(() => {
                  // Mise à jour des données locales après avoir ajouté un nouvel utilisateur
                  setData([...data, {
                     nom, age
                  }]);
                  setNom(""); // Réinitialisation du champ de nom
                  setAge(0); // Réinitialisation du champ d'âge
               });
            }
         };

         // Rendu de l'interface utilisateur
         return (
            <div className="App">
               <table>
                  <thead>
                     <tr>
                        <th>nom</th>
                        <th>age</th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* Mapping à travers les données pour afficher chaque utilisateur */}
                     {data.map((item, key) => (
                        <tr key={key}>
                           <td>{item.nom}</td>
                           <td>{item.age}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               
               {/* Champs de saisie et bouton pour ajouter un utilisateur */}
               <input type="text" placeholder='nom' value={nom} onChange={(e) => {
                  setNom(e.target.value);
               }} />
               <input type="number" placeholder='age' value={age} onChange={(e) => {
                  setAge(e.target.value);
               }} />
               <button onClick={postUser}>save</button>
            </div>
         );
      }

      export default App;

   ```
   Le code ci dessus utilise **`axios`** pour effectuer des requêtes via les **Endpoints d'Api** créer précedemment lors de la création de nos routes et la mise en place du serveur express pour notre partie backend.