package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"math/rand"

	"github.com/l3hu4l1/oshaberi/internal/store"
)

var usernames = []string{
	"tom", "alice", "john", "mary", "steve", "david",
	"olivia", "michael", "sophia", "chris", "james", "mia",
	"robert", "nancy", "paul", "evelyn", "mark", "abigail",
	"peter", "andrew", "kevin", "beth", "brian", "ella",
	"jason", "grace", "ryan", "lily", "eric", "zoey",
	"matthew", "ava", "richard", "scott", "nathan", "samuel",
}

var titles = []string{
	"Tasty Street Eats", "Mastering Pasta", "Fresh Farm Finds", "Culinary Journeys",
	"Art of Sketching", "Exploring Abstracts", "Street Art Wonders", "Creative Canvases",
	"Hidden Beaches", "Mountain Escapes", "City Adventures", "Epic Treks",
	"Soccer Drills 101", "Basketball Basics", "Skateboarding Secrets", "Winning Strategies",
	"Retro Gaming Gems", "Top RPG Titles", "Board Game Nights", "Game Dev Insights",
}

var contents = []string{
	"Discover the best street food dishes in your area.",
	"Learn how to craft the perfect homemade pasta.",
	"Explore the freshest produce from local farms.",
	"Embark on culinary adventures with diverse cuisines.",

	"Dive into the basics of pencil sketching techniques.",
	"Understand the techniques behind abstract art.",
	"Uncover hidden stories in vibrant street art.",
	"Bring your imagination to life on a blank canvas.",

	"Visit lesser-known beaches for relaxation and beauty.",
	"Plan your next getaway to serene mountain destinations.",
	"Discover the hidden gems of bustling urban hubs.",
	"Get ready for thrilling hikes and nature treks.",

	"Sharpen your soccer skills with these beginner drills.",
	"Learn the essentials of playing basketball like a pro.",
	"Master these skateboarding secrets.",
	"Improve your winning edge in any sport you love.",

	"Explore the charm of classic video games.",
	"Find the best role-playing games to dive into.",
	"Host fun-filled nights with family and board games.",
	"Learn the basics of creating your own video game.",
}

var tags = []string{
	"food", "art", "travel", "sports", "gaming",
}

var comments = []string{
	"This is amazing!",
	"I totally agree with you.",
	"Wow, I need to try this!",
	"Can you share more details?",
	"This made my day, thank you!",
	"What a beautiful shot!",
	"Love this so much!",
	"Where did you find this?",
	"This looks incredible!",
	"Such a great idea, thanks for sharing.",
	"I've been looking for something like this!",
	"Keep up the awesome work!",
	"This is so inspiring!",
	"I didn't know about this—thank you!",
	"Just what I needed to see today.",
	"This is gold, saving it for later!",
	"Can't wait to try this myself.",
	"This deserves way more likes!",
	"Absolutely agree, so well said.",
	"Thanks for the recommendation, very helpful!",
}

func Seed(store store.Storage, db *sql.DB) {
	ctx := context.Background()

	users := generateUsers(10)
	tx, _ := db.BeginTx(ctx, nil)

	for _, user := range users {
		if err := store.Users.Create(ctx, tx, user); err != nil {
			_ = tx.Rollback()
			log.Println("failed to create user:", err)
			return
		}
	}

	tx.Commit()

	posts := generatePosts(5, users)
	for _, post := range posts {
		if err := store.Posts.Create(ctx, post); err != nil {
			log.Println("failed to create post:", err)
			return
		}
	}

	comments := generateComments(10, users, posts)
	for _, comment := range comments {
		if err := store.Comments.Create(ctx, comment); err != nil {
			log.Println("failed to create comment:", err)
			return
		}
	}

	log.Println("seeding successful")
}

func generateUsers(num int) []*store.User {
	users := make([]*store.User, num)

	for i := 0; i < num; i++ {
		rand_user := usernames[rand.Intn(len(usernames))]
		rand_num := rand.Intn(len(usernames))
		users[i] = &store.User{
			Email:    rand_user + fmt.Sprintf("%d", rand_num) + "@nus.com",
			Username: rand_user + fmt.Sprintf("%d", rand_num),
		}
	}

	return users
}

func generatePosts(num int, users []*store.User) []*store.Post {
	posts := make([]*store.Post, num)

	for i := 0; i < num; i++ {
		rand_user := users[rand.Intn(len(users))]
		rand_num := rand.Intn(len(titles))

		posts[i] = &store.Post{
			Title:   titles[rand_num],
			Content: contents[rand_num],
			UserID:  rand_user.ID,
			Tags: []string{
				tags[rand_num/4],
			},
		}
	}

	return posts
}

func generateComments(num int, users []*store.User, posts []*store.Post) []*store.Comment {
	cmt := make([]*store.Comment, num)

	for i := 0; i < num; i++ {
		cmt[i] = &store.Comment{
			PostID:  posts[rand.Intn(len(posts))].ID,
			UserID:  users[rand.Intn(len(users))].ID,
			Content: comments[rand.Intn(len(comments))],
		}
	}

	return cmt
}
