package main

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/l3hu4l1/oshaberi/internal/store"
)

type CreateCommentPayload struct {
	Content string `json:"content" validate:"required,max=200"`
}

func (app *application) createCommentHandler(w http.ResponseWriter, r *http.Request) {
	post := getPostFromCtx(r)

	var payload CreateCommentPayload
	if err := readJSON(w, r, &payload); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	if err := Validate.Struct(payload); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	user := getUserFromContext(r)

	comment := &store.Comment{
		UserID:  user.ID,
		Content: payload.Content,
		PostID:  post.ID,
	}

	ctx := r.Context()
	if err := app.store.Comments.Create(ctx, comment); err != nil {
		app.internalServerError(w, r, err)
		return
	}

	if err := app.jsonResponse(w, http.StatusCreated, comment); err != nil {
		app.internalServerError(w, r, err)
		return
	}
}

func (app *application) getCommentsHandler(w http.ResponseWriter, r *http.Request) {
	postIDParam := chi.URLParam(r, "postID")
	postID, err := strconv.ParseInt(postIDParam, 10, 64)
	if err != nil || postID < 1 {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	comments, err := app.store.Comments.GetByPostID(r.Context(), postID)
	if err != nil {
		app.internalServerError(w, r, err)
		return
	}

	err = app.jsonResponse(w, http.StatusOK, comments)
	if err != nil {
		app.internalServerError(w, r, err)
	}
}
