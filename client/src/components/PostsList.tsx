import React, { useEffect, useState } from "react";
import { API_URL } from "../App";
import PostCard from "./PostCard";
import Post from "../types/PostProps";

interface PostsListProps {
    searchQuery: string;
    selectedTags: string[];
    sortByDate: boolean;
}

const PostsList: React.FC<PostsListProps> = ({
    searchQuery,
    selectedTags,
    sortByDate,
}) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: "GET",
            });
            const data = await response.json();
            setPosts(data.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) => {
        const matchesSearchQuery = post.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.every((tag) =>
            post.tags.includes(tag)
        );
        return matchesSearchQuery && matchesTags;
    });

    const sortedPosts = sortByDate
        ? [...filteredPosts].sort(
              (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
          )
        : filteredPosts;

    return (
        <div>
            {sortedPosts.map((post) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    tags={post.tags}
                    createdAt={post.created_at}
                />
            ))}
        </div>
    );
};

export default PostsList;
