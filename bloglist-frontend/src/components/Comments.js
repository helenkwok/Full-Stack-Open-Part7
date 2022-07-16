

const Comments = ({ comments }) => {
  console.log(comments)
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {comments.length > 0?
          comments.map(comment =>
            <li key={comment.id}>{comment.comment}</li>
          )
          :
          <div>no comment</div>
        }
      </ul>
    </div>
  )
}

export default Comments
