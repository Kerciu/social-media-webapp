import React from 'react'

const Post = ({username, description, formatted_date, like_count}) => {
  return (<>
    <div>{username}</div>
    <div>{description}</div>
    <div>{formatted_date}</div>
    <div>{like_count}</div>
    </>
  )
}

export default Post