import React from 'react'
import '../../styles/notification.css'

const bDtyle = {
  backgroundColor : "rgba(255, 255, 255, 0",
  borderColor : "rgba(255, 255, 255, 0",
  borderStyle : "solid",
  color : "white"
}

const Comment = ({ comment, isYou, deleteNot, redirection }) => {

  return (
    <div onClick={() => redirection(comment.ID_NOT)} className="Comment">
    <div className="Comment-header">
      <div className="Comment-avatar">
        <img src={require(`../../../uploads/${comment.PHOTO}`)} alt={comment.NOM_UTIL_AG} />
      </div>
      <span className="Comment-author">
        {comment.NOM_UTIL_AG}
      </span>
      <span className="Comment-time" >{comment.DATE_NOT}<button style={bDtyle} onClick={() => deleteNot(comment.ID_NOT)} className="Comment-body">X</button></span>
    </div>

    <div className="Comment-body">{comment.BODY_NOT} </div>
    
  </div>
  )
}

export default Comment