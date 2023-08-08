const { response } = require("express")
const express = require("express")
const multer = require('multer')
const cors = require("cors")
const bodyParser = require('body-parser')
const path = require('path');
const http = require('http')
const { 
    getAdmin, getAdminList, addAdmin, updateAdmin, deleteAdmin,
    getCompte, addCompte, updateCompte, deleteCompte,
    getCategorie, addCategorie, updateCategorie, deleteCategorie,
    getService, addService, updateService, deleteService,
    getDivision, addDivision, updateDivision, deleteDivision
} = require("./app/utils/querryHelpers")
const socketIO = require("socket.io");
const app = express()
app.use(cors())

app.use(express.json())
app.use(bodyParser.json());

//server io

const server = http.createServer(app)

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {

    socket.on("userLoggedIn", (data) => {
        console.log(`${data.username} s'est connecté`);
        // Perform any desired actions when a user logs in
        socket.on("disconnect", () => {
            console.log(`${data.username} s'est deconnecté`);
        });
    });

    
});

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Front/src/uploads/'); // Set the destination folder for file uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Use original filename with timestamp
    },
  });
  
  const upload = multer({ storage });




//requetes

app.get('/admin/userList', function (req, res) {
    getAdminList(req, res);
  })

app.post('/admin', function (req, res) {
    let {pseudo, mdp} = req.body
    getAdmin(req, res, pseudo, mdp);
  })

app.post('/admin/newUser', upload.single('PHOTO'), function (req, res) {
    let {MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, GENRE, ACTIVATION, CODE_DIVISION} = req.body
    const PHOTO = req.file ? req.file.filename : null;
    addAdmin(req, res, MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION);
})


app.put('/admin/:id', upload.single('PHOTO'),function (req, res) {
    let {MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, GENRE, ACTIVATION, CODE_DIVISION} = req.body
    const PHOTO = req.file ? req.file.filename : null;
    let {id} = req.params
    updateAdmin(req, res, MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION, id);
})

app.delete('/admin/:id', function (req, res) {
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

server.listen(8080, () =>{
    console.log("Server is runnign")
})