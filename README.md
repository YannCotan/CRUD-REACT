# CRUD-React-Node-Express-MySQL
You will see how to create a simple CRUD project with React-Node-Express-MySQL 

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
      existe stockés dans un tableau et le troisième paramètre est un fonction callback.
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
     
         