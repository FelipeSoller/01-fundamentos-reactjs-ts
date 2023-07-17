/* eslint-disable react/prop-types */
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'
import { useState } from 'react'

export function Post({ author, content, publishedAt }) {
  const [newCommentText, setNewCommentText] = useState('')
  const [comments, setComments] = useState([
    'Post muito bacana, ein?'
  ])

  const publishedAtDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH':'mm", { locale: ptBR })

  const publishedAtDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleCreateNewComment() {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function deleteComment(commentToDelete) {
    const commentsWIthoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentsWIthoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time dateTime={publishedAtDateFormatted} title={publishedAtDateFormatted}>
          {publishedAtDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map(item => {
          if (item.type === 'paragraph') {
            return <p key={item.content} >{item.content}</p>
          } else if (item.type === 'link')
            return <p key={item.content} ><a href='#'>{item.content}</a></p>
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty} >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment
                    key={comment}
                    content={comment}
                    onDeleteComment={deleteComment}
                  />
        })}
      </div>
    </article>
  )
}
