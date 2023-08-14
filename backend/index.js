import express from "express"
import mysql from "mysql"
import cors from "cors"

//initialisation de expess.js pour gérer le backend
const app = express()

//Connexion au serveur mysql
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database: "test"
})

//Express server middleware pour pouvoir envoyer des requêtes à la bd
app.use(express.json())
app.use(cors())

//Création de la route de base
app.get("/" , (req , res)=>{
    res.json('hello this is the backend')
})

//Cette route permet de recuperer les users de la bd
app.get("/user" , (req , res)=>{
    const q = "SELECT * FROM user"

    //execution de la requête sql
    db.query(q, (err, result)=>{
            if(err){
                console.log(err)
            }
            res.json(result)
        })
    
})

//Ci dessous nous avons tout nos endpoint api pour créer , recuperer, mettre à jour 
//et supprimer des entrées de notre bd.

app.post('/user', (req, res)=>{
    const q = "INSERT INTO user (nom_user) VALUES (?)"
    const values = [req.body.nom_user]
    db.query(q , [values] , (err, result)=>{
        if(err){
            console.log(err)
        }
        res.json(req.body.nom_user + " à été(e) ajouté(s)")
    })
})

app.put('/user/:id' , (req , res) => {
    const id_user = req.params.id
    const q = "UPDATE user SET `nom_user` = ? WHERE id_user = ?"
    const values = [req.body.nom_user] 
    db.query(q, [values , id_user] , (err , result)=>{
        if(err){
            console.log(err)
        }
        res.json("Mise à jour réussie de l\'utilisateur")
    })
})

app.delete('/user/:id' , (req , res) => {
    const id_user = req.params.id
    const q = "DELETE FROM user WHERE id_user = ?"
    db.query(q, [id_user] , (err , result)=>{
        if(err){
            console.log(err)
        }
        res.json("Utilisateur supprimé")
    })
})


//On demarre le serveur node et on écoute au port 8800
app.listen(8800, () =>{
    console.log("connected to backend")
})