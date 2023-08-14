import { useEffect, useState } from "react";
import Comment from "./Commentaire";
import axios from "axios"
import { format } from 'date-fns';
import '../../styles/notification.css'
import { Navigate, useNavigate } from "react-router-dom";




const Comments = ({ user, comments, setComments, IsOpenNot, togleNot }) => {
  const navigate = useNavigate();
  const matr = user[0].MATRICULE
  const [input, setInput] = useState({
    BODY_NOT : "", 
    MATRICULE : "", 
    DATE_NOT : format(new Date(), 'yyyy-MM-dd')
  })

  console.log(user[0].MATRICULE)
  

  async function sendComment() {
    console.log(user[0].MATRICULE)
    setInput({ ...input, MATRICULE: user[0].MATRICULE });
    try {
        await axios.post(`http://localhost:8080/notification`, input)
        alert("submited")
        setInput({
            BODY_NOT : "", 
            MATRICULE : `${user[0].MATRICULE}`,  
            DATE_NOT : format(new Date(), 'yyyy-MM-dd')
          });
        fetchComments();

    } catch (error) {
        console.log(`Erreur : ${error}`)
    }
  }

  async function fetchComments() {
    try {
        const response = await axios.get('http://localhost:8080/notification');
        setComments(response.data);
        console.log("data loaded");
      } catch (error) {
        console.error(error);
      }
  }

  const deleteNot = id => {
    axios.delete(`http://localhost:8080/notification/${id}`).then(response => {
      fetchComments()
      console.log('Le USer a été supprimé avec succès.');
    }).catch(error =>{console.error(error);})
  }

  const redirection = (id) =>{
    navigate("/BesoinBag", { replace: true })
    deleteNot(id)
    if (user[0].TYPE_AG.includes("Admin")){
      const fetchArticleList = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/notification/${user[0].MATRICULE}`);
          setComments(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchArticleList();
    }
  }

  useEffect(() => {
    if (user[0].TYPE_AG.includes("Admin")){
      const fetchArticleList = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/notification/${user[0].MATRICULE}`);
          setComments(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchArticleList();
    }
    
  }, [user[0].MATRICULE]);


  return (
    <div className={`Comments ${IsOpenNot ? "" : "open"}`}>
      <h3 className="Comments-title">
        {comments.length === 1 ? `1 comment` : `${comments.length} comments`}
      </h3>
      
      <div className="Comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.ID_NOT}
            comment={comment}
            deleteNot={deleteNot}
            redirection={redirection}
            isYou={user === comment.MATRICULE}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;