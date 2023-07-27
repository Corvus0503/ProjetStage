const OracleDB = require("oracledb");
const { outFormat } = require("oracledb");
const getConnection = require("./db");

//admin

const getAdmin = async (req, res, pseudo, mdp) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM AGENT WHERE NOM_UTIL_AG=:pseudo AND PASSWORD=:mdp',
      [pseudo, mdp]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.send(result.rows);
    }

    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM AGENT');
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addAdmin = async (req, res, MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'INSERT INTO AGENT values (:MATRICULE, :FONCTION_AG, :MAIL_AG, :NOM_AG, :NOM_UTIL_AG, :TYPE_AG, :PRENOM_AG, :ADRESSE_AG, :TEL_AG, :PASSWORD, :PHOTO, :GENRE, :ACTIVATION, :CODE_DIVISION)',
      [MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION]
    );
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAdmin = async (req, res, MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'UPDATE AGENT SET MATRICULE=:MATRICULE, FONCTION_AG=:FONCTION_AG, MAIL_AG=:MAIL_AG, NOM_AG=:NOM_AG, NOM_UTIL_AG=:NOM_UTIL_AG, TYPE_AG=:TYPE_AG, PRENOM_AG=:PRENOM_AG, ADRESSE_AG=:ADRESSE_AG, TEL_AG=:TEL_AG, PASSWORD=:PASSWORD, PHOTO=:PHOTO, GENRE=:GENRE, ACTIVATION=:ACTIVATION, CODE_DIVISION=:CODE_DIVISION where MATRICULE=:id',
      [MATRICULE, FONCTION_AG, MAIL_AG, NOM_AG, NOM_UTIL_AG, TYPE_AG, PRENOM_AG, ADRESSE_AG, TEL_AG, PASSWORD, PHOTO, GENRE, ACTIVATION, CODE_DIVISION, id]
    );
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAdmin = async (req, res, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM AGENT where NUM_CMPT=:id', [id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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
      'INSERT INTO ARTICLE(FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, EFFECTIF_ART, ID_CAT) VALUES (:FORMULE, :DESIGNATION_ART, :SPECIFICITE_ART, :UNITE_ART, :EFFECTIF_ART, :ID_CAT)',
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
    const formuleInt = parseInt(FORMULE, 10);
    const effectifInt = parseInt(EFFECTIF_ART, 10);
    const idCatInt = parseInt(ID_CAT, 10);

    // Valider si les conversions sont valides
    if (isNaN(formuleInt) || isNaN(effectifInt) || isNaN(idCatInt)) {
      throw new Error("Veuillez saisir des valeurs numériques valides.");
    }

    const connection = await getConnection();
    const result = await connection.execute(
      'UPDATE ARTICLE SET FORMULE=:1, DESIGNATION_ART=:2, SPECIFICITE_ART=:3, UNITE_ART=:4, EFFECTIF_ART=:5, ID_CAT=:6 WHERE FORMULE=:7',
      [formuleInt, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, effectifInt, idCatInt, id]
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



// Requete compte

const getCompte = async (req, res) => {
  try {
    const connection = await getConnection();
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
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO COMPTE(NUM_CMPT, DESIGNTION_CMPT) VALUES (?, ?)', [NUM_CMPT, DESIGNTION_CMPT]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCompte = async (req, res, NUM_CMPT, DESIGNTION_CMPT, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('UPDATE COMPTE SET NUM_CMPT=?, DESIGNTION_CMPT=? WHERE NUM_CMPT=?', [NUM_CMPT, DESIGNTION_CMPT, id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCompte = async (req, res, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM COMPTE WHERE NUM_CMPT=?', [id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Requetes categories

const getCategorie = async (req, res) => {
  try {
    const connection = await getConnection();
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
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO CATEGORIE(ID_CAT, LABEL_CAT, NUM_CMPT) VALUES (ID_CAT.nextval, ?, ?)', [LABEL_CAT, NUM_CMPT]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCategorie = async (req, res, LABEL_CAT, NUM_CMPT, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('UPDATE CATEGORIE SET LABEL_CAT=?, NUM_CMPT=? WHERE ID_CAT=?', [LABEL_CAT, NUM_CMPT, id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCategorie = async (req, res, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM CATEGORIE WHERE ID_CAT=?', [id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Requetes services

const getService = async (req, res) => {
  try {
    const connection = await getConnection();
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
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO SERVICE(CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateService = async (req, res, CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('UPDATE SERVICE SET CODE_SER=?, LIBELLE=?, ENTETE1=?, ENTETE2=?, ENTETE3=?, ENTETE4=?, ENTETE5=?, SIGLE=?, VILLE=?, ADRESSE=?, CONTACT=? WHERE CODE_SER=?', 
    [CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT, id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteService = async (req, res, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM SERVICE WHERE CODE_SER=?', [id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Requetes division

const getDivision = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM DIVISION');
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addDivision = async (req, res, CODE_DIVISION, CODE_SER, LABEL_DIVISION) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO DIVISION(CODE_DIVISION, CODE_SER, LABEL_DIVISION) VALUES (?, ?, ?)', [CODE_DIVISION, CODE_SER, LABEL_DIVISION]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateDivision = async (req, res, CODE_DIVISION, CODE_SER, LABEL_DIVISION, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('UPDATE DIVISION SET CODE_DIVISION=?, CODE_SER=?, LABEL_DIVISION=? WHERE CODE_DIVISION=?', [CODE_DIVISION, CODE_SER, LABEL_DIVISION, id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteDivision = async (req, res, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM DIVISION WHERE CODE_SER=?', [id]);
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


 module.exports = {
   getUser,
   getAdmin,
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
   deleteDivision,
   getArticle,
   addArticle,
   updateArticle,
   deleteArticle,
 };

