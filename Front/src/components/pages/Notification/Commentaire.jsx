import React from 'react'
import parseISO from "date-fns/parseISO";
import formatDistance from "date-fns/formatDistance";

function formatDate(dateStr) {
  const date = parseISO(dateStr);
  return formatDistance(date, new Date(), { addSuffix: true });
}


const Commentaire = (comment) => {
  return (
    <div className="Comment">
    <div className="Comment-header">
      <div className="Comment-avatar">
        <img src={comment.MATRICULE} alt={comment.author.name} />
      </div>
      <span className="Comment-author">
        {isYou ? "You" : comment.author.name}
      </span>
      <span className="Comment-time">{formatDate(comment.insertedAt)}</span>
    </div>

    <div className="Comment-body">{comment.body}</div>
  </div>
  )
}

export default Commentaire