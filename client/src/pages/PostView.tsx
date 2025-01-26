import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Box,
} from "@mui/material";
import CommentsList from "../components/CommentsList";

type PostProps = {
    id: number;
    title: string;
    content: string;
    tags: string[];
};

const PostView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<PostProps | null>(null);

    const fetchPost = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: "GET",
            });
            const data = await response.json();
            setPost(data.data);
        } catch (error) {
            console.error("Failed to fetch post", error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleShare = () => {
        const shareData = {
            title: post?.title,
            text: post?.content,
            url: window.location.href,
        };

        if (navigator.share) {
            navigator
                .share(shareData)
                .catch((error) => console.error("Error sharing", error));
        } else {
            navigator.clipboard
                .writeText(window.location.href)
                .then(() => {
                    alert("Link copied to clipboard!");
                })
                .catch((error) =>
                    console.error("Error copying to clipboard", error)
                );
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Box sx={{ marginBottom: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </Button>
            </Box>
            <Card sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.content}
                    </Typography>
                    <div>
                        {post.tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                sx={{ marginRight: 1, marginTop: 1 }}
                            />
                        ))}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 2,
                            padding: "12px 24px",
                            fontSize: "14px",
                            width: "50px",
                        }}
                    >
                        Like
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            marginTop: 2,
                            marginLeft: 2,
                            padding: "12px 24px",
                            fontSize: "14px",
                            width: "75px",
                        }}
                        onClick={handleShare}
                    >
                        Share
                    </Button>
                </CardContent>
            </Card>
            <CommentsList postId={post.id} />
        </div>
    );
};

export default PostView;
