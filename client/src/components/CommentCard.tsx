import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface CommentCardProps {
    content: string;
    username: string;
    createdAt: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
    content,
    username,
    createdAt,
}) => {
    console.log("CommentCard props:", { content, username, createdAt });

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {username} - {new Date(createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body1" component="div">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CommentCard;
