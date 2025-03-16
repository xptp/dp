import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../ui/loader";
import "../../../styles/pages/commentsPage.scss";
import { TbXboxX } from "react-icons/tb";
import {
  addComment,
  delComment,
  editComments,
  fetchComments,
} from "../../../store/reducers/commentSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiEdit } from "react-icons/fi";

const CommentsPage = () => {
  const dispatch = useDispatch();
  const { comments, isLoading, error } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState();
  const user = useSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [editComment, setEditComment] = useState(null);
  const [editText, setEditText] = useState("");
  const commentsPerPage = 8;

  const handlEditClick = (commentId, commentText) => {
    setEditComment(commentId);
    setEditText(commentText);
  };
  const handleSaveEdit = () => {
    dispatch(editComments(editComment, editText)).then(() => {
      setEditComment(null);
      dispatch(fetchComments());
    });
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const nextPage = () => {
    if (currentPage < Math.ceil(comments.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // console.log(currentComments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment(newComment)).then(() => {
        setNewComment("");
        dispatch(fetchComments());
      });
    }
  };

  const delUserComment = (id, authorId) => {
    if (user.admin || user._id === authorId) {
      dispatch(delComment(id)).then(() => {
        dispatch(fetchComments());
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div className="error">Ошибка</div>;
  }

  return (
    <div className="comment-main-div">
      <h2>Отзывы</h2>

      {comments ? (
        <div className="comment-div">
          {currentComments.map((comment) => (
            <div key={comment._id} className="one-comment-div">
              <div className="comment-name">
                <h4>{comment?.author?.name} </h4>
                <p>{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
              {user ? (
                <>
                  {user.admin || user._id === comment.author._id ? (
                    <>
                      <button
                        className="del-comment-btn"
                        onClick={() =>
                          delUserComment(comment._id, comment.author._id)
                        }
                      >
                        <TbXboxX />
                      </button>
                    </>
                  ) : null}
                  {user._id === comment.author._id ? (
                    <button
                      className="ed-btn"
                      onClick={() => handlEditClick(comment._id, comment.text)}
                    >
                      <FiEdit />
                    </button>
                  ) : null}
                </>
              ) : null}

              <p className="text-comment">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>test</div>
      )}

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <IoIosArrowBack />
        </button>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(comments.length / commentsPerPage)
          }
        >
          <IoIosArrowForward />
        </button>
      </div>

      {editComment && (
        <div className="overlay">
          <div className="edit-modal">
            <textarea
              className="textarea-edith"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div>
              <button className="button-comment-page" onClick={handleSaveEdit}>
                Сохранить
              </button>
              <button
                className="button-comment-page"
                onClick={() => setEditComment(null)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {user ? (
        <div className="new-comment-div">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-text"
            placeholder="Напишите комментарий..."
          />

          <button className="button-comment-page" onClick={handleAddComment}>
            Отправить
          </button>
        </div>
      ) : (
        <h4>Авторизуйтель, чтобы оставить комментарий</h4>
      )}
    </div>
  );
};

export default CommentsPage;
