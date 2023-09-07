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
    getDivision, addDivision, updateDivision, deleteDivision,
    getArticle, addArticle, getCategorieArticle,
    updateArticle, deleteArticle, getBesoin, deleteBesoin, updateBesoin, getBesoinDetail, getSelectedArticle, addBesoin,
    getBesoinListe, addValidation, getValidation, getValidationBesoin,getPrixPrevisionnel,
    getNotification, addNotification, getNotificationUser, deleteNotification, addPrevision,
    getPrevision
} = require("./app/utils/querryHelpers")
const getConnection = require("./app/utils/db.js");
const socketIO = require("socket.io");
const app = express()
app.use(cors())

app.use(express.json())
app.use(bodyParser.json());

//server io

const server = http.createServer(app)

let onlineUser = []

const addNewUser = (username, socketId) =>{
    !onlineUser.some((user) => user.username === username) && onlineUser.push({username, socketId})
}

const removeUser = (socketId) =>{
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId)
}
const getUser = (username) =>{
    return onlineUser.find((user) => user.username === username)
}

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {

    socket.on("userLoggedIn", (user) => {
        console.log(`${user.username} s'est connecté`);
        addNewUser(user.username, user.socketId)
        // Perform any desired actions when a user logs in
        console.log("utilidateur connecté ", onlineUser)
        socket.on("disconnect", () => {
            console.log(`${user.username} s'est deconnecté`);
            removeUser(user.username)
        });
    });

    //notification controiller
    app.get('/notification/:id', function (req, res) {
        let {id} = req.params
        getNotification(req, res, id);
    })

    app.get('/notificationUser/:id', function (req, res) {
        let {id} = req.params
        getNotificationUser(req, res, id);
    })

    app.post('/notification', async function (req, res) {
        let {BODY_NOT, MATRICULE, DATE_NOT} = req.body
        try {
            const connection = await getConnection();
            const result = await connection.execute('INSERT INTO NOTIFICATION(ID_NOT, BODY_NOT, MATRICULE, DATE_NOT) VALUES (SEQ_NOTIFICATION.nextval, :1, :2, :3)', 
            [BODY_NOT, MATRICULE, DATE_NOT]
            );
            await connection.commit();
            await connection.close();
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    })

    app.post('/notificationRet', async function (req, res) {
        let {BODY_NOT, MATRICULE, DATE_NOT, MATR_DEST} = req.body
        try {
            const connection = await getConnection();
            const result = await connection.execute('INSERT INTO NOTIFICATION(ID_NOT, BODY_NOT, MATRICULE, DATE_NOT, MATR_DEST) VALUES (SEQ_NOTIFICATION.nextval, :1, :2, :3, :4)', 
            [BODY_NOT, MATRICULE, DATE_NOT, MATR_DEST]
            );
            await connection.commit();
            await connection.close();
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    })

    app.delete('/notification/:id', function (req, res) {
        let {id} = req.params
        deleteNotification(req, res, id);
    })

    
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
app.get('/articleCat/:id',(req,res)=>{
    const{id}=req.params
    getCategorieArticle(req,res,id)
})
app.post('/article', function (req, res) {
    const { DESIGNATION_ART, SPECIFICITE_ART,UNITE_ART, PRIX_ART, ID_CAT ,DATE_MODIFICATION} = req.body;
    addArticle(req, res, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, PRIX_ART, ID_CAT,DATE_MODIFICATION );
})

app.put('/article/:id', function (req, res) {
    let {DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, PRIX_ART, ID_CAT,DATE_MODIFICATION} = req.body
    let {id} = req.params
    updateArticle(req, res, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, PRIX_ART, ID_CAT,DATE_MODIFICATION, id);
})

app.delete('/article/:id', function (req, res) {
    let {id} = req.params
    deleteArticle(req, res, id);
})

//Besoin controller 
    //getter
    app.get('/besoin/:id', (req,res)=>{
        const{id} = req.params;
        getBesoin(req, res,id)
    })
    app.get('/besoinAtt', function(req, res){
        getBesoinAtt(req,res);
    })
    app.get('/besoinBag', function(req, res){
        getBesoinListe(req,res);
    })
    app.get('/articleSelected/:id', async (req, res) => {
        const{id} = req.params;
        getSelectedArticle(req,res,id)
      });
      app.get('/besoinDetail/:id', async (req, res) => {
        const { id } = req.params;
        getBesoinDetail(req, res, id );
      });
        //delete
    app.delete('/besoin/:id', function(req,res){
        let{id} = req.params;
        deleteBesoin(req, res, id);
    })

    //Validation des besoins Controller
    //getter :
app.get('/validation',(req,res)=>{
    getValidation(req,res);
  })
  
  app.get('/validationList',(req,res)=>{
    getValidationBesoin(req,res);
  } )
  app.get('/prixTotal',(req,res)=>{
    getPrixPrevisionnel(req,res);
  })
  app.get('/prevision',(req,res)=>{
    getPrevision(req,res)
  })
  app.post('/prevision',(req,res)=>{
    const{PREVISION, DATE_PREVISION}=req.body;
    addPrevision(req,res,PREVISION, DATE_PREVISION)
  })
    
        //setter
    app.put('/besoins/:id', async (req, res) => {
      const { id } = req.params;
      const {
        MATRICULE,
        FORMULE,
        DATE_BESOIN,
        QUANTITE,
        UNITE,
        ETAT_BESOIN
      } = req.body;
        
      try {
        await updateBesoin(
          MATRICULE,
          FORMULE,
          DATE_BESOIN,
          QUANTITE,
          UNITE,
          ETAT_BESOIN,
          id,
        );
        res.json({ message: 'Besoin mis à jour avec succès' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du besoin' });
      }
    });
        //Creator
    app.post('/besoin', function(req, res){
        const {MATRICULE,FORMULE,DATE_BESOIN,QUANTITE,UNITE,ETAT_BESOIN}=req.body
        addBesoin(req, res,MATRICULE,FORMULE,DATE_BESOIN,QUANTITE,UNITE,ETAT_BESOIN);
    })
    
    //Validation des besoins Controller
    //getter :
app.get('/validation',(req,res)=>{
    getValidation(req,res);
  })
  app.get('/validationList',(req,res)=>{
    getValidationBesoin(req,res);
  } )
  
      //setter :
  
      //Creator :
  app.post('/validation', function(req,res){
      // let{id}=req.params;
      // addValidation(req, res, id)
      const {NUM_BESOIN,DATE_VALIDATION, QUANTITE_ACC}=req.body;
      addValidation(req, res, NUM_BESOIN,DATE_VALIDATION, QUANTITE_ACC)
  })

server.listen(8080, () =>{
    console.log("Server is running")
})