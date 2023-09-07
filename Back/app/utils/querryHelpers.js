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

//Notificzation controller

const getNotification = async (req, res, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('SELECT NOTIFICATION.*, AGENT.NOM_UTIL_AG, AGENT.PHOTO FROM NOTIFICATION INNER JOIN AGENT ON NOTIFICATION.MATRICULE = AGENT.MATRICULE WHERE NOT NOTIFICATION.MATRICULE=:1', [id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getNotificationUser = async (req, res, id) => {
  try {
    const connection = await getConnection()
    const result = await connection.execute('SELECT NOTIFICATION.*, AGENT.NOM_UTIL_AG, AGENT.PHOTO FROM NOTIFICATION INNER JOIN AGENT ON NOTIFICATION.MATRICULE = AGENT.MATRICULE WHERE NOTIFICATION.MATR_DEST=:1', [id]);
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addNotification = async (req, res, BODY_NOT, MATRICULE, DATE_NOT) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO NOTIFICATION(ID_NOT, BODY_NOT, MATRICULE, DATE_NOT) VALUES (SEQ_NOTIFICATION.nextval, :1, :2, :3)', 
    [BODY_NOT, MATRICULE, DATE_NOT]
    );
    await connection.commit();
    await connection.close();
    io.emit("new-comment", result.rows );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteNotification = async (req, res, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM NOTIFICATION WHERE ID_NOT = :id', [id]);
    await connection.commit();
    await connection.close();
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Requete compte
const getCompte = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM COMPTE');
    res.json(result.rows)
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

const addCompte = async (NUM_CMPT, DESIGNTION_CMPT) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO COMPTE(NUM_CMPT, DESIGNTION_CMPT) VALUES (:NUM_CMPT, :DESIGNTION_CMPT)', {
      NUM_CMPT: NUM_CMPT,
      DESIGNTION_CMPT: DESIGNTION_CMPT
    });
    await connection.commit();
    await connection.close();
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

const updateCompte = async (NUM_CMPT, DESIGNTION_CMPT, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('UPDATE COMPTE SET NUM_CMPT = :NUM_CMPT, DESIGNTION_CMPT = :DESIGNTION_CMPT WHERE NUM_CMPT = :id', {
      NUM_CMPT: NUM_CMPT,
      DESIGNTION_CMPT: DESIGNTION_CMPT,
      id: id
    });
    await connection.commit();
    await connection.close();
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

const deleteCompte = async (id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM COMPTE WHERE NUM_CMPT = :id', [id]);
    await connection.commit();
    await connection.close();
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};


//Requete Pour Service

const getService = async () => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM SERVICE');
    await connection.close();
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

const addService = async (CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO SERVICE(CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT) VALUES (:CODE_SER, :LIBELLE, :ENTETE1, :ENTETE2, :ENTETE3, :ENTETE4, :ENTETE5, :SIGLE, :VILLE, :ADRESSE, :CONTACT)', {
      CODE_SER: CODE_SER,
      LIBELLE: LIBELLE,
      ENTETE1: ENTETE1,
      ENTETE2: ENTETE2,
      ENTETE3: ENTETE3,
      ENTETE4: ENTETE4,
      ENTETE5: ENTETE5,
      SIGLE: SIGLE,
      VILLE: VILLE,
      ADRESSE: ADRESSE,
      CONTACT: CONTACT
    });
    await connection.commit();
    await connection.close();
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

const updateService = async (CODE_SER, LIBELLE, ENTETE1, ENTETE2, ENTETE3, ENTETE4, ENTETE5, SIGLE, VILLE, ADRESSE, CONTACT, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('UPDATE SERVICE SET CODE_SER = :CODE_SER, LIBELLE = :LIBELLE, ENTETE1 = :ENTETE1, ENTETE2 = :ENTETE2, ENTETE3 = :ENTETE3, ENTETE4 = :ENTETE4, ENTETE5 = :ENTETE5, SIGLE = :SIGLE, VILLE = :VILLE, ADRESSE = :ADRESSE, CONTACT = :CONTACT WHERE CODE_SER = :id', {
      CODE_SER: CODE_SER,
      LIBELLE: LIBELLE,
      ENTETE1: ENTETE1,
      ENTETE2: ENTETE2,
      ENTETE3: ENTETE3,
      ENTETE4: ENTETE4,
      ENTETE5: ENTETE5,
      SIGLE: SIGLE,
      VILLE: VILLE,
      ADRESSE: ADRESSE,
      CONTACT: CONTACT,
      id: id
    });
    await connection.commit();
    await connection.close();
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

const deleteService = async (id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM SERVICE WHERE CODE_SER = :id', [id]);
    await connection.commit();
    await connection.close();
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getDivision = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT DIVISION.*,SERVICE.* FROM DIVISION INNER JOIN SERVICE ON DIVISION.CODE_SER = SERVICE.CODE_SER');
    res.json(result.rows)
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

const addDivision = async (req,res,CODE_DIVISION, CODE_SER, LABEL_DIVISION) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO DIVISION(CODE_DIVISION, CODE_SER, LABEL_DIVISION) VALUES (:CODE_DIVISION, :CODE_SER, :LABEL_DIVISION)',
    [CODE_DIVISION,      CODE_SER,      LABEL_DIVISION] );
    res.json(result.rows);
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateDivision = async (req,res,CODE_DIVISION, CODE_SER, LABEL_DIVISION, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('UPDATE DIVISION SET CODE_DIVISION = :CODE_DIVISION, CODE_SER = :CODE_SER, LABEL_DIVISION = :LABEL_DIVISION WHERE CODE_DIVISION = :id',[CODE_DIVISION, CODE_SER, LABEL_DIVISION, id]);
    res.json(result.rows)
    await connection.commit();
    await connection.close();
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteDivision = async (req,res,id) => {
  try {
    const query = "DELETE FROM AGENT WHERE AGENT.CODE_DIVISION = :id"
    const connection = await getConnection();
    const reponse= await connection.execute(query,[id]);
    res.json(reponse.rows);
    await connection.commit();
    const result = await connection.execute('DELETE FROM DIVISION WHERE CODE_DIVISION = :id', [id]);    
    res.json(result.rows);
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//requete Besoin


const updateBesoin = async (MATRICULE, FORMULE, DATE_BESOIN, QUANTITE, UNITE, ETAT_BESOIN, NUM_BESOIN) => {
  const query = `
    UPDATE BESOIN
    SET MATRICULE = :MATRICULE,
        FORMULE = :FORMULE,
        DATE_BESOIN = :DATE_BESOIN,
        QUANTITE = :QUANTITE,
        UNITE = :UNITE,
        ETAT_BESOIN = :ETAT_BESOIN
    WHERE NUM_BESOIN = :NUM_BESOIN
  `;

  try {
    const connection = await getConnection();
    const result = await connection.execute(query, {
      MATRICULE,
      FORMULE,
      DATE_BESOIN,
      QUANTITE,
      UNITE,
      ETAT_BESOIN,
      NUM_BESOIN,  // Utiliser le même nom que dans la requête SQL
    });
    console.log('Besoin mis à jour :', result.rowsAffected);
    connection.commit();
    connection.release();
  } catch (err) {
    console.error('Erreur lors de la mise à jour du besoin :', err);
    throw err;
  }
};
const getBesoin= async (req, res,id)=> {
  const query = `SELECT BESOIN.* , ARTICLE.*, AGENT.*, CATEGORIE.*,DIVISION.* FROM ((((BESOIN
    INNER JOIN ARTICLE ON BESOIN.FORMULE = ARTICLE.FORMULE)
    INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE)
    INNER JOIN CATEGORIE ON ARTICLE.ID_CAT=CATEGORIE.ID_CAT)
    INNER JOIN DIVISION ON AGENT.CODE_DIVISION=DIVISION.CODE_DIVISION)
    WHERE BESOIN.MATRICULE = :id 
  `;

  try {
    const connection = await getConnection();
    const result = await connection.execute(query,[id]);
    res.json(result.rows)
    connection.commit();
    connection.release();
  } catch (error) {
    console.error("Erreur lors de l'affichage du besoin :", error);
  }
}

const getBesoinListe = async(req,res)=>{
    const query = `SELECT BESOIN.MATRICULE,BESOIN.DATE_BESOIN, BESOIN.ETAT_BESOIN, AGENT.MATRICULE AS AGENT_MATRICULE, AGENT.NOM_AG AS AGENT_NOM, AGENT.PRENOM_AG AS AGENT_PRENOM, DIVISION.LABEL_DIVISION, 
      COUNT(BESOIN.NUM_BESOIN) AS BESOIN_COUNT FROM BESOIN 
        INNER JOIN ARTICLE ON BESOIN.FORMULE = ARTICLE.FORMULE
        INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE
        INNER JOIN DIVISION ON AGENT.CODE_DIVISION = DIVISION.CODE_DIVISION
        WHERE BESOIN.ETAT_BESOIN = 'En Attente'
      GROUP BY BESOIN.MATRICULE, BESOIN.DATE_BESOIN, BESOIN.ETAT_BESOIN, AGENT.MATRICULE, AGENT.NOM_AG, AGENT.PRENOM_AG, DIVISION.LABEL_DIVISION    
      `
    try {
      const connection = await getConnection();
      const result= await connection.execute(query);
      res.json(result.rows)
      connection.commit();
      connection.release();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

const getBesoinDetail = async (req, res, id) => { // Utilisation dans l'ordre correct
    const query = `
      SELECT BESOIN.*, ARTICLE.*, AGENT.*, CATEGORIE.*, DIVISION.*
      FROM (((((BESOIN
      INNER JOIN ARTICLE ON BESOIN.FORMULE = ARTICLE.FORMULE)
      INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE)
      INNER JOIN CATEGORIE ON ARTICLE.ID_CAT = CATEGORIE.ID_CAT)
      INNER JOIN DIVISION ON AGENT.CODE_DIVISION = DIVISION.CODE_DIVISION))
      WHERE BESOIN.ETAT_BESOIN = 'En Attente' AND BESOIN.MATRICULE = :id`;
  
    try {
      const connection = await getConnection();
      const result = await connection.execute(query, [id]);
      await connection.commit();
      await connection.close();
      res.json(result.rows);
    } catch (error) {
      console.error("Erreur lors de l'affichage du besoin :", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


const getSelectedArticle = async (req,res,id) => {
    const query = 'SELECT * FROM ARTICLE WHERE ID_CAT = :id';
    
    try {
        const connection = await getConnection();
        const result = await connection.execute(query, [id]);
        res.json(result.rows);      
        connection.commit();
        await connection.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };

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

const addBesoin = async (req, res, MATRICULE, FORMULE, DATE_BESOIN, QUANTITE, UNITE, ETAT_BESOIN) => {
    const query = `
      INSERT INTO BESOIN (NUM_BESOIN, MATRICULE, FORMULE, DATE_BESOIN, QUANTITE, UNITE, ETAT_BESOIN)
      VALUES (NUM_BESOIN.nextval, :MATRICULE, :FORMULE, TO_DATE(:DATE_BESOIN, 'YYYY-MM-DD'), :QUANTITE, :UNITE, :ETAT_BESOIN)
    `;
    try {
      const connection = await getConnection();
      const result = await connection.execute(query, [MATRICULE, FORMULE, DATE_BESOIN, QUANTITE, UNITE, ETAT_BESOIN]);
      res.json(result.rows);
      console.log('Besoin ajouté :', result.rowsAffected);
      connection.commit();
      connection.release();
    } catch (err) {
      console.error('Erreur lors de l\'ajout du besoin :', err);
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//requete Validation

const getValidation = async (req,res) =>{
  const query=`SELECT VALIDATION.*,BESOIN.*, ARTICLE.*, AGENT.*, CATEGORIE.*, DIVISION.*,SERVICE.*, COMPTE.*
          FROM (((((((VALIDATION 
              INNER JOIN BESOIN ON VALIDATION.NUM_BESOIN = BESOIN.NUM_BESOIN)
              INNER JOIN ARTICLE ON BESOIN.FORMULE=ARTICLE.FORMULE)
              INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE)
              INNER JOIN CATEGORIE ON ARTICLE.ID_CAT = CATEGORIE.ID_CAT)
              INNER JOIN DIVISION ON AGENT.CODE_DIVISION = DIVISION.CODE_DIVISION)
              INNER JOIN SERVICE ON DIVISION.CODE_SER = DIVISION.CODE_SER)
              INNER JOIN COMPTE ON CATEGORIE.NUM_CMPT = COMPTE.NUM_CMPT)
              `;
  try {
      const connection = await getConnection();
      const result = await connection.execute(query);
      res.json(result.rows)
      connection.commit();
      await connection.close();
  } catch (error) {
      console.error("Erreur lors de l'affichage du besoin :", error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

const getValidationBesoin = async (req,res)=>{
  const query=`
              SELECT
              SERVICE.CODE_SER,
              SERVICE.LIBELLE,
              COMPTE.NUM_CMPT,
              COMPTE.DESIGNATION_CMPT,
              SUM(VALIDATION.QUANTITE_ACC * ARTICLE.PRIX_ART) AS TOTAL
                  FROM
                  (((((((VALIDATION
                  INNER JOIN BESOIN ON VALIDATION.NUM_BESOIN = BESOIN.NUM_BESOIN)
                  INNER JOIN ARTICLE ON BESOIN.FORMULE = ARTICLE.FORMULE)
                  INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE)
                  INNER JOIN CATEGORIE ON ARTICLE.ID_CAT = CATEGORIE.ID_CAT)
                  INNER JOIN DIVISION ON AGENT.CODE_DIVISION = DIVISION.CODE_DIVISION)
                  INNER JOIN SERVICE ON DIVISION.CODE_SER = SERVICE.CODE_SER)
                  INNER JOIN COMPTE ON CATEGORIE.NUM_CMPT = COMPTE.NUM_CMPT)
                      GROUP BY
                          SERVICE.CODE_SER,
                          SERVICE.LIBELLE,
                          COMPTE.NUM_CMPT,
                          COMPTE.DESIGNATION_CMPT`;
  try {
      const connection= await getConnection();
      const result = await connection.execute(query);
      res.json(result.rows);
      connection.commit();
      await connection.close()
  } catch (error) {
      console.error("Erreur lors de l'affichage du besoin :", error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

const getPrixPrevisionnel=async (req,res)=>{
  const query =`
                SELECT SERVICE.LIBELLE, SUM(VALIDATION.QUANTITE_ACC * ARTICLE.PRIX_ART) AS PREVISION FROM
                    (((((((VALIDATION
                    INNER JOIN BESOIN ON VALIDATION.NUM_BESOIN = BESOIN.NUM_BESOIN)
                    INNER JOIN ARTICLE ON BESOIN.FORMULE = ARTICLE.FORMULE)
                    INNER JOIN AGENT ON BESOIN.MATRICULE = AGENT.MATRICULE)
                    INNER JOIN CATEGORIE ON ARTICLE.ID_CAT = CATEGORIE.ID_CAT)
                    INNER JOIN DIVISION ON AGENT.CODE_DIVISION = DIVISION.CODE_DIVISION)
                    INNER JOIN SERVICE ON DIVISION.CODE_SER = SERVICE.CODE_SER)
                    INNER JOIN COMPTE ON CATEGORIE.NUM_CMPT = COMPTE.NUM_CMPT)
                    GROUP BY 
                        SERVICE.LIBELLE`;
  try {
        const connection = await getConnection();
        const result = await connection.execute(query);
        res.json(result.rows);
        await connection.commit();
        await connection.close()
  } catch (error) {
    console.error("Erreur lors de l'affichage du besoin :", error);
    res.status(500).json({ error: 'Internal server error' });
}
}

const addValidation = async(req,res,NUM_BESOIN, DATE_VALIDATION, QUANTITE_ACC) => {
  const query = `
      INSERT INTO VALIDATION (NUM_VALIDATION,NUM_BESOIN, DATE_VALIDATION, QUANTITE_ACC) 
      VALUES (NUM_VALIDATION.nextval, :NUM_BESOIN, :DATE_VALIDATION, :QUANTITE_ACC)`;
  try {
      const connection = await getConnection();
      const result = await connection.execute(query,[NUM_BESOIN,DATE_VALIDATION, QUANTITE_ACC])
      res.json(result.rows)
      connection.commit();
      await connection.close();
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Requete Categorie

const getCategorie = async (req,res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM CATEGORIE');
    res.json(result.rows);
    await connection.close();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' }) };
};

const addCategorie = async (req, res, LABEL_CAT, NUM_CMPT) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('INSERT INTO CATEGORIE(ID_CAT, LABEL_CAT, NUM_CMPT) VALUES (:LABEL_CAT, :NUM_CMPT)', {
      LABEL_CAT: LABEL_CAT,
      NUM_CMPT: NUM_CMPT,
      
    });
    res.json(result.rows)
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCategorie = async (req, res,LABEL_CAT, NUM_CMPT, id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('UPDATE CATEGORIE SET LABEL_CAT = :LABEL_CAT, NUM_CMPT = :NUM_CMPT WHERE ID_CAT = :id', {
      LABEL_CAT: LABEL_CAT,
      NUM_CMPT: NUM_CMPT,
      id: id
    });
    res.json(result.rows)
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCategorie = async (req, res,id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('DELETE FROM CATEGORIE WHERE ID_CAT = :id', [id]);
    res.json(result.rows)
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getArticle = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT ARTICLE.*, CATEGORIE.LABEL_CAT FROM ARTICLE INNER JOIN CATEGORIE ON ARTICLE.ID_CAT = CATEGORIE.ID_CAT');
    res.json(result.rows);
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCategorieArticle = async (req,res,id) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM CATEGORIE WHERE NUM_CMPT= :id',[id]);
    res.json(result.rows);
    await connection.commit();
    await connection.close();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' }) };
};


const addArticle = async (req, res, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, PRIX_ART, ID_CAT,DATE_MODIFICATION) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'INSERT INTO ARTICLE(FORMULE, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, PRIX_ART, ID_CAT ,DATE_MODIFICATION) VALUES (FORMULE.nextval, :DESIGNATION_ART, :SPECIFICITE_ART, :UNITE_ART, :ID_CAT, :PRIX_ART, :DATE_MODIFICATION)',
      [DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, PRIX_ART, ID_CAT,DATE_MODIFICATION]
    );
    res.json(result.rows);
    connection.commit()
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateArticle = async (req, res, DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, PRIX_ART, ID_CAT,DATE_MODIFICATION, id) => {
  try {
    // Convertir les champs numériques en nombres entiers

    const connection = await getConnection();
    const result = await connection.execute(
      'UPDATE ARTICLE SET  DESIGNATION_ART=:DESIGNATION_ART, SPECIFICITE_ART=:SPECIFICITE_ART, UNITE_ART=:UNITE_ART, PRIX_ART=:PRIX_ART, ID_CAT=:ID_CAT, DATE_MODIFICATION= :DATE_MODIFICATION WHERE FORMULE=:id',
      [DESIGNATION_ART, SPECIFICITE_ART, UNITE_ART, PRIX_ART, ID_CAT,DATE_MODIFICATION, id]
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

const addPrevision = async(req,res,PREVISION, DATE_PREVISION)=>{
  const query = ` INSERT INTO PREVISION (NUM_PREVISION, PREVISION, DATE_PREVISION) VALUES(NUM_PREVISION.nextval,:PREVISION, :DATE_PREVISION) `
  try {
      const connection = await getConnection();
      const result = await connection.execute(query,[PREVISION, DATE_PREVISION]);
      res.json(result.rows);
      connection.commit()
      await connection.close()
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

const getPrevision = async(req,res)=>{
  const query = 'SELECT DATE_PREVISION, PREVISION FROM PREVISION'
  try {
      const connection = await getConnection();
      const result=await connection.execute(query);
      res.json(result.rows);
      await connection.close();
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
}


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
    deleteDivision,
    getArticle,
    getCategorieArticle,
    addArticle,
    updateArticle,
    deleteArticle,
    addBesoin,
    updateBesoin,
    getBesoin,
    deleteBesoin,
    getBesoinRef,
    getBesoinDetail,
    getSelectedArticle,
    getBesoinListe,
    addValidation,
    getValidation,
    getPrixPrevisionnel,
    getValidationBesoin,
    getNotification,
    getNotificationUser,
    addNotification,
    deleteNotification,
    addPrevision,
    getPrevision
};