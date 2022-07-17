const Comment = ({ comment }) => {
  return (
    <div key={comment.id}>{comment.comment}</div>
  )
}

export default Comment
