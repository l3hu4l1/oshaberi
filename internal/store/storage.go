package store

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

type Storage struct {
	Users interface {
        GetByID(context.Context, int64) (*User, error)
		GetByEmail(context.Context, string) (*User, error)
        Create(context.Context, *sql.Tx, *User) error
		CreateAndInvite(ctx context.Context, user *User, token string, exp time.Duration) error
		Activate(context.Context, string) error
		Delete(context.Context, int64) error
	}
	Posts interface {
		Create(context.Context, *Post) error
		GetByID(context.Context, int64) (*Post, error)
		Delete(context.Context, int64) error
		Update(context.Context, *Post) error
		GetAll(context.Context) ([]Post, error)
	}
	Comments interface {
		Create(context.Context, *Comment) error
		GetByPostID(context.Context, int64) ([]Comment, error)
	}
}

var (
	ErrNotFound          = errors.New("record not found")
	QueryTimeoutDuration = 5 * time.Second
)

func NewStorage(db *sql.DB) Storage {
	return Storage{
		Users:    &UsersStore{db},
		Posts:    &PostsStore{db},
		Comments: &CommentsStore{db},
	}
}

func withTx(db *sql.DB, ctx context.Context, fn func(*sql.Tx) error) error {
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	if err := fn(tx); err != nil {
		_ = tx.Rollback()
		return err
	}

	return tx.Commit()
}
