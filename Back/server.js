const { response } = require("express")
const express = require("express")
const multer = require('multer')
const cors = require("cors")
const OracleDB = require("oracledb");
const getConnection = require("./app/utils/db.js");
const { 
    getAdmin, getAdminList, addAdmin, updateAdmin, deleteAdmin,
    getCompte, addCompte, updateCompte, deleteCompte,
    getCategorie, addCategorie, updateCategorie, deleteCategorie,
    getService, addService, updateService, deleteService,
    getDivision, addDivision, updateDivision, deleteDivision
} = require("./app/utils/querryHelpers")
const app = express()

const err = "Il y a une erreur quelque part"

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

// Configure multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const whitelist = ["http://localhost:3001"]

const corsOptions = {
    origin: function (origin, callback){
        if (!origin || whitelist.indexOf(origin) !=1){
            callback(null, true)
        } else {
            callback(new Error("Not alowed by CORS"))
        }
    },
    Credential: true,
}

app.use(cors(corsOptions))

app.get('/admin/userList', function (req, res) {
    getAdminList(req, res);
  })

app.post('/admin', function (req, res) {
    let {pseudo, mdp} = req.body
    getAdmin(req, res, pseudo, mdp);
  })

app.post('/admin/newUser', upload.single('photo'), async function (req, res) {
    const formData = req.body;
    const photo = req.file;

  try {
    const connection = await getConnection()
    const procedure = `BEGIN INSERT_AGENT_WITH_IMAGE(
    :MATRICULE,
    :FONCTION_AG,
    :MAIL_AG,
    :NOM_AG,
    :NOM_UTIL_AG,
    :TYPE_AG,
    :PRENOM_AG,
    :ADRESSE_AG,
    :TEL_AG,
    :PASSWORD,
    :GENRE,
    :ACTIVATION,
    :CODE_DIVISION,
    :photo); END;`;

    // Bind the parameters to the procedure call
    const binds = {
      MATRICULE: formData.MATRICULE,
      FONCTION_AG: formData.FONCTION_AG,
      MAIL_AG: formData.MAIL_AG,
      NOM_AG: formData.NOM_AG,
      NOM_UTIL_AG: formData.NOM_UTIL_AG,
      TYPE_AG: formData.TYPE_AG,
      PRENOM_AG: formData.PRENOM_AG,
      ADRESSE_AG: formData.ADRESSE_AG,
      TEL_AG: formData.TEL_AG,
      PASSWORD: formData.PASSWORD,
      GENRE: formData.GENRE,
      ACTIVATION: formData.ACTIVATION,
      CODE_DIVISION: formData.CODE_DIVISION,
      photo: { val: photo ? photo.buffer : null, type: OracleDB.BLOB }
    };

    // Execute the procedure
    const result = await connection.execute(procedure, binds, { autoCommit: true });
    connection.release();

    res.json(result.rows);
  } catch (error) {
    console.error('Error while subscribing:', error);
    res.status(500).json({ message: 'Failed to subscribe' });
  }
})


app.put('/admin/:id', function (req, res) {
    let {MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION} = req.body
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

app.listen(8080)
console.log("It s running");