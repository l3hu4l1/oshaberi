import React, { useEffect, useState } from "react";
import { API_URL } from "../App";
import CommentCard from "./CommentCard";
import Comment from "../types/Comment";
import CommentCreationForm from "./CommentCreationForm";

interface CommentsListProps {
    postId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = async () => {
        try {
            const response = await fetch(
                `${API_URL}/posts/${postId}/comments`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setComments(data.data);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleCommentCreated = (newComment: Comment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    return (
        <div>
            {comments.map((comment) => (
                <CommentCard
                    key={comment.id}
                    content={comment.content}
                    username={comment.user.username}
                    createdAt={comment.created_at}
                />
            ))}
            <CommentCreationForm
                postId={postId}
                onCommentCreated={handleCommentCreated}
            />
        </div>
    );
};

export default CommentsList;
