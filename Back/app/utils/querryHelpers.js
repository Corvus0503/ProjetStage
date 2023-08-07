const OracleDB = require("oracledb");
const { outFormat } = require("oracledb");
const getConnection = require("./db");
const jsonStringify = require('json-stringify-safe');

function replacer(key, value) {
  // If the property is circular, skip it
  if (key === 'parent' && value instanceof Array) {
    return undefined;
  }
  return value;
}

const getAdmin = async (req, res, pseudo, mdp) => {
    
      try {
        const connection = await getConnection()
        const result = await connection.execute('SELECT * FROM AGENT WHERE NOM_UTIL_AG=:pseudo AND PASSWORD=:mdp', [pseudo, mdp]);
        if (result.rows.length == 0) {
          res.status(401).json({ message: 'Invalid credentials' });
        } else {
          // Authentication reussi
          const jsonString = jsonStringify(result.rows, replacer, 2);
          res.send(jsonString)
        }
    
        await connection.close();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

const getAdminList = async (req, res) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('SELECT * FROM AGENT');
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addAdmin = async (req, res, MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION, photoPath) => {
  console.log(PHOTO)
  try {
    // PHOTO.mv(photoPath, async (error) =>{
    //   if (error) {
    //     console.error('Error while moving photo:', error.message);
    //     return res.status(500).json({ message: 'Failed to upload photo' });
    //   }
      
    // })
    const connection = await getConnection()
    const result = await connection.execute(
      'INSERT INTO AGENT (MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION) values (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11, :12, :13, :14)', 
      [MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION]).catch((error) => {
        console.error(error);
        throw error; // Re-throw the error to be caught by the global error handler
      });;
    console.log(PHOTO)
    res.json(result.rows);
    connection.commit();
    console.log("donnée ajoutée")
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAdmin = async (req, res, MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION, id) => {
  console.log("id = "+PHOTO)
  try {
    console.log("id = "+id)
    const connection = await getConnection()
    const result = await connection.execute('UPDATE AGENT SET MATRICULE=:1, FONCTION_AG=:2, MAIL_AG=:3, NOM_AG=:4, NOM_UTIL_AG=:5, TYPE_AG=:6, PRENOM_AG=:7, ADRESSE_AG=:8, TEL_AG=:9, PASSWORD=:10, PHOTO=:11, GENRE=:12, ACTIVATION=:13, CODE_DIVISION=:14 where MATRICULE=:15', 
      [MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION, id]);
    res.json(result.rows);
    connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAdmin = async (req, res, id) => {
  
  try {
    const connection = await getConnection()
    const result = await connection.execute('DELETE FROM AGENT where MATRICULE=:1', [id]);
    res.json(result.rows);
    connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Requete compte
const getCompte = async (req, res) => {
    
  try {
    const connection = await getConnection()
    const result = await connection.execute('SELECT * FROM COMPTE');
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addCompte = async (req, res, NUM_CMPT, DESIGNTION_CMPT) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('INSERT INTO COMPTE(NUM_CMPT, DESIGNTION_CMPT) values (?,?)', [NUM_CMPT, DESIGNTION_CMPT]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCompte = async (req, res, NUM_CMPT, DESIGNTION_CMPT, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('UPDATE COMPTE SET NUM_CMPT=?, DESIGNTION_CMPT=? where NUM_CMPT=?', [NUM_CMPT, DESIGNTION_CMPT, id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCompte = async (req, res, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('DELETE FROM COMPTE where NUM_CMPT=?', [id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Requtes categories
const getCategorie = async (req, res) => {
    
  try {
    const connection = await getConnection()
    const result = await connection.execute('SELECT * FROM CATEGORIE');
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addCategorie = async (req, res, ID_CAT, LABEL_CAT, NUM_CMPT) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('INSERT INTO CATEGORIE(ID_CAT, LABEL_CAT, NUM_CMPT) values (ID_CAT.nextval,?,?)', [LABEL_CAT, NUM_CMPT]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCategorie = async (req, res, LABEL_CAT, NUM_CMPT, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('UPDATE CATEGORIE SET LABEL_CAT=?, NUM_CMPT=? where ID_CAT=?', [LABEL_CAT, NUM_CMPT, id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCategorie = async (req, res, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('DELETE FROM CATEGORIE where ID_CAT=?', [id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Requetes services
const getService = async (req, res) => {
    
  try {
    const connection = await getConnection()
    const result = await connection.execute('SELECT * FROM SERVICE');
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addService = async (req, res, CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('INSERT INTO SERVICE(CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT) values (?,?,?,?,?,?,?,?,?,?,?)', [CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateService = async (req, res, CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('UPDATE CATEGORIE SET CODE_SER=?, LIBELLE=?, ENTETE1=?, ENTETE2=?, ENTETE3=?, ENTETE4=?, ENTETE5=?, SIGLE=?, VILLE=?, ADRESSE=?, CONTACT=? where CODE_SER=?', [CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT, id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteService = async (req, res, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('DELETE FROM SERVICE where CODE_SER=?', [id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Requetes division

const getDivision = async (req, res) => {
    
  try {
    const connection = await getConnection()
    const result = await connection.execute('SELECT * FROM DIVISION');
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addDivision = async (req, res, CODE_DIVISION, CODE_SER, LABEL_DIVISION) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('INSERT INTO CA DIVISION(CODE_DIVISION, CODE_SER, LABEL_DIVISION) values (?,?,?)', [CODE_DIVISION, CODE_SER, LABEL_DIVISION]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateDivision = async (req, res, CODE_DIVISION, CODE_SER, LABEL_DIVISION, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('UPDATE CA DIVISION SET CODE_DIVISION=?, CODE_SER=?, LABEL_DIVISION=? where CODE_DIVISION=?', [CODE_DIVISION, CODE_SER, LABEL_DIVISION, id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteDivision = async (req, res, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('DELETE FROM DIVISION where CODE_SER=?', [id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Vous pouvez utiliser ces fonctions dans vos contrôleurs pour gérer les requêtes liées à la base de données.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//requete Besoin


const addBesoin = async (req, res,NUM_BESOIN, MATRICULE, FORMULE, DATE_BESOIN, DATE_CONFIRM, TIME_CONFIRM, QUANTITE, QUANTITE_ACC, UNITE, ETAT_DEMANDE) => {
  const query = `
    INSERT INTO BESOIN (NUM_BESOIN, MATRICULE, FORMULE, DATE_BESOIN, DATE_CONFIRM, TIME_CONFIRM, QUANTITE, QUANTITE_ACC, UNITE, ETAT_DEMANDE)
    VALUES (:NUM_BESOIN, :MATRICULE, :FORMULE, :DATE_BESOIN, :DATE_CONFIRM, :TIME_CONFIRM, :QUANTITE, :QUANTITE_ACC, :UNITE, :ETAT_DEMANDE)
  `;


  try {
    const connection = await getConnection();
    const result = await connection.execute(query, [NUM_BESOIN,MATRICULE,FORMULE,DATE_BESOIN,DATE_CONFIRM,TIME_CONFIRM,QUANTITE,QUANTITE_ACC,UNITE,ETAT_DEMANDE], 
      { autoCommit: true });
    res.json(result.rows);
    console.log('Besoin ajouté :', result.rowsAffected);
    connection.release();
  } catch (err) {
    console.error('Erreur lors de l\'ajout du besoin :', err);
  }
};

const updateBesoin = async (NUM_BESOIN,MATRICULE,FORMULE,DATE_BESOIN,DATE_CONFIRM,TIME_CONFIRM,QUANTITE,QUANTITE_ACC,UNITE,ETAT_DEMANDE,id) => {
  const query = `
    UPDATE BESOIN SET MATRICULE = :MATRICULE, FORMULE = :FORMULE, DATE_BESOIN = :DATE_BESOIN, DATE_CONFIRM = :DATE_CONFIRM,
    TIME_CONFIRM = :TIME_CONFIRM, QUANTITE = :QUANTITE, QUANTITE_ACC = :QUANTITE_ACC, UNITE = :UNITE, ETAT_DEMANDE = :ETAT_DEMANDE
    WHERE NUM_BESOIN = :NUM_BESOIN
  `;

  try {
    const connection = await getConnection();
    const result = await connection.execute(query, [NUM_BESOIN,MATRICULE,FORMULE,DATE_BESOIN,DATE_CONFIRM,TIME_CONFIRM,QUANTITE,QUANTITE_ACC,UNITE,ETAT_DEMANDE,id], { autoCommit: true });
    console.log('Besoin mis à jour :', result.rowsAffected);
    res.json(result.rows);
    connection.release();
  } catch (err) {
    console.error('Erreur lors de la mise à jour du besoin :', err);
  }
};

const getBesoin= async (req, res)=> {
  const query = `SELECT BESOIN.* , ARTICLE.*, AGENT.* FROM ((BESOIN
    INNER JOIN ARTICLE ON BESOIN.FORMULE = ARTICLE.FORMULE)
    INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE)
    
  `;

  try {
    const connection = await getConnection();
    const result = await connection.execute(query);
    res.json(result.rows)
    connection.commit();
    connection.release();
  } catch (error) {
    console.error("Erreur lors de l'affichage du besoin :", error);
  }
}


const deleteBesoin = async (req, res, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM BESOIN WHERE NUM_BESOIN=:id', [id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getBesoinAtt = async (req,res) =>{
  const query = `
  SELECT BESOIN.*, ARTICLE.*, AGENT.*
  FROM ((BESOIN
  INNER JOIN ARTICLE ON BESOIN.FORMULE = ARTICLE.FORMULE)
  INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE)
  WHERE BESOIN.ETAT_BESOIN = 'En attente'
`;
  try {
    const connection = await getConnection();
    const result = await connection.execute(query);
    res.json(result.rows)
    connection.commit();
    connection.release();
  } catch (error) {
    console.error("Erreur lors de l'affichage du besoin :", error);
  }
}
const getBesoinRef = async (req,res) =>{
  const query = `
  SELECT BESOIN.*, ARTICLE.*, AGENT.*
  FROM ((BESOIN
  INNER JOIN ARTICLE ON BESOIN.FORMULE = ARTICLE.FORMULE)
  INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE)
  WHERE BESOIN.ETAT_BESOIN = 'refusé'
`;
  try {
    const connection = await getConnection();
    const result = await connection.execute(query);
    res.json(result.rows)
    connection.commit();
    connection.release();
  } catch (error) {
    console.error("Erreur lors de l'affichage du besoin :", error);
  }
}

////////////////////////////////////////////////////////////////////////

// Requetes article

const getArticle = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT ARTICLE.*, CATEGORIE.LABEL_CAT FROM ARTICLE INNER JOIN CATEGORIE ON ARTICLE.ID_CAT = CATEGORIE.ID_CAT');
    res.json(result.rows);
    connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const addArticle = async (req, res, FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'INSERT INTO ARTICLE(FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT) VALUES (:1, :2, :3, :4, :5, :6)',
      [FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT]
    );
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateArticle = async (req, res, FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT, id) => {
  try {
    // Convertir les champs numériques en nombres entiers

    const connection = await getConnection();
    const result = await connection.execute(
      'UPDATE ARTICLE SET FORMULE=:1, DESIGNATION_ART=:2, SPECIFICITE_ART=:3, UNITE_ART=:4, EFFECTIF_ART=:5, ID_CAT=:6 WHERE FORMULE=:7',
      [FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT, id]
    );
    res.json(result.rows);
    connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



const deleteArticle = async (req, res, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM ARTICLE WHERE FORMULE=:id', [id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    getAdmin,
    getAdminList,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getCompte,
    addCompte,
    updateCompte,
    deleteCompte,
    getCategorie,
    addCategorie,
    updateCategorie,
    deleteCategorie,
    getService,
    addService,
    updateService,
    deleteService,
    getDivision,
    addDivision,
    updateDivision,
    deleteDivision
};