const { response } = require("express")
const express = require("express")
const cors = require("cors")
const { 
    getAdmin, addAdmin, updateAdmin, deleteAdmin,
    getCompte, addCompte, updateCompte, deleteCompte,
    getCategorie, addCategorie, updateCategorie, deleteCategorie,
    getService, addService, updateService, deleteService,
    getDivision, addDivision, updateDivision, deleteDivision, getArticle, addArticle, updateArticle, deleteArticle, getBesoin, deleteBesoin, updateBesoin, getBesoinAtt, getBesoinRef
} = require("./app/utils/querryHelpers")
const app = express()

const err = "Il y a une erreur quelque part"

app.use(express.json())

const whitelist = ["http://localhost:3001"]

// const corsOptions = {
//     origin: function (origin, callback){
//         if (!origin || whitelist.indexOf(origin) !=1){
//             callback(null, true)
//         } else {
//             callback(new Error("Not alowed by CORS"))
//         }
//     },
//     Credential: true,
// }

app.use(cors())

app.post('/admin', function (req, res) {
    let {pseudo, mdp} = req.body
    getAdmin(req, res, pseudo, mdp);
  })

app.get('/user', function (req,res){
    getUser(req,res)
})

app.post('/user', function (req, res) {
    let {MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION} = req.body
    addAdmin(req, res, MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION);
})
app.put('/user/:id', function (req, res) {
    let {MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION} = req.body
    let {id} = req.params
    updateAdmin(req, res, MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION, id);
})

app.delete('/user/:id', function (req, res) {
    let {id} = req.params
    deleteAdmin(req, res, id);
})


//compte controller
app.get('/compte', function (req, res) {
    getCompte(req, res);
  })

app.post('/compte', function (req, res) {
    let {NUM_CMPT, DESIGNTION_CMPT} = req.body
    addCompte(req, res, NUM_CMPT, DESIGNTION_CMPT);
})

app.put('/compte/:id', function (req, res) {
    let {NUM_CMPT, DESIGNTION_CMPT} = req.body
    let {id} = req.params
    updateCompte(req, res, NUM_CMPT, DESIGNTION_CMPT, id);
})

app.delete('/compte/:id', function (req, res) {
    let {id} = req.params
    deleteCompte(req, res, id);
})

//categorie controller

app.get('/categorie', function (req, res) {
    getCategorie(req, res);
  })

app.post('/categorie', function (req, res) {
    let { LABEL_CAT, NUM_CMPT} = req.body
    addCategorie(req, res,  LABEL_CAT, NUM_CMPT);
})

app.put('/categorie/:id', function (req, res) {
    let { LABEL_CAT, NUM_CMPT} = req.body
    let {id} = req.params
    updateCategorie(req, res,  LABEL_CAT, NUM_CMPT, id);
})

app.delete('/categorie/:id', function (req, res) {
    let {id} = req.params
    deleteCategorie(req, res, id);
})

//service controller

app.get('/service', function (req, res) {
    getService(req, res);
  })

app.post('/service', function (req, res) {
    let {CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT} = req.body
    addService(req, res,  CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT);
})

app.put('/service/:id', function (req, res) {
    let { CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT} = req.body
    let {id} = req.params
    updateService(req, res,  CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT, id);
})

app.delete('/service/:id', function (req, res) {
    let {id} = req.params
    deleteService(req, res, id);
})

//division controller

app.get('/division', function (req, res) {
    getDivision(req, res);
  })

app.post('/division', function (req, res) {
    let { CODE_DIVISION, CODE_SER, LABEL_DIVISION} = req.body
    addDivision(req, res,  CODE_DIVISION, CODE_SER, LABEL_DIVISION);
})

app.put('/division/:id', function (req, res) {
    let { CODE_DIVISION, CODE_SER, LABEL_DIVISION} = req.body
    let {id} = req.params
    updateDivision(req, res,  CODE_DIVISION, CODE_SER, LABEL_DIVISION, id);
})

app.delete('/division/:id', function (req, res) {
    let {id} = req.params
    deleteDivision(req, res, id);
})

//Article controller

app.get('/article', function (req, res) {
    getArticle(req, res);
  })

app.post('/article', function (req, res) {
    const {FORMULE, DESIGNATION_ART, SPECIFICITE_ART,UNITE_ART, EFFECTIF_ART, ID_CAT } = req.body;
    addArticle(req, res,  FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT );
})

app.put('/article/:id', function (req, res) {
    let { FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT} = req.body
    let {id} = req.params
    updateArticle(req, res, FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT, id);
})

app.delete('/article/:id', function (req, res) {
    let {id} = req.params
    deleteArticle(req, res, id);
})


//Besoin controller 
    //getter
app.get('/besoin', (req,res)=>{
    getBesoin(req, res)
})
app.get('/besoinAtt', function(req, res){
    getBesoinAtt(req,res);
})
app.get('/besoinRef', function(req, res){
    getBesoinRef(req,res);
})
    //delete
app.delete('/besoin/:id', function(req,res){
    let{id} = req.params;
    deleteBesoin(req, res, id);
})

    //setter
app.put('/besoin/:id', function(req, res){
    let{NUM_BESOIN,MATRICULE,FORMULE,DATE_BESOIN,DATE_CONFIRM,TIME_CONFIRM,QUANTITE,QUANTITE_ACC,UNITE,ETAT_DEMANDE}=req.body
    let{id}=req.params
    updateBesoin(NUM_BESOIN,MATRICULE,FORMULE,DATE_BESOIN,DATE_CONFIRM,TIME_CONFIRM,QUANTITE,QUANTITE_ACC,UNITE,ETAT_DEMANDE,id);
})
    //Creator
app.post('/besoin', function(req, res){
    const {NUM_BESOIN,MATRICULE,FORMULE,DATE_BESOIN,DATE_CONFIRM,TIME_CONFIRM,QUANTITE,QUANTITE_ACC,UNITE,ETAT_DEMANDE}=req.body
    addBesoin(NUM_BESOIN,MATRICULE,FORMULE,DATE_BESOIN,DATE_CONFIRM,TIME_CONFIRM,QUANTITE,QUANTITE_ACC,UNITE,ETAT_DEMANDE,id);
})




app.listen(8080)
console.log("It s running at: http://localhost:8080");
