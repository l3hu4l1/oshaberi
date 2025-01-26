import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Chip,
    CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import Post from "../types/PostProps";

const PostCard: React.FC<Post> = ({ id, title, content, tags, createdAt }) => {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardActionArea component={Link} to={`/posts/${id}`}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                    >
                        {new Date(createdAt).toLocaleDateString()}
                    </Typography>
                    <div>
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                sx={{ marginRight: 1, marginTop: 1 }}
                            />
                        ))}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PostCard;
