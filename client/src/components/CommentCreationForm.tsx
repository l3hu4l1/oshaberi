import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { API_URL } from "../App";

interface CommentCreationFormProps {
    postId: number;
    onCommentCreated: (comment: Comment) => void;
}

const CommentCreationForm: React.FC<CommentCreationFormProps> = ({
    postId,
    onCommentCreated,
}) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (content.length > 200) {
            setError("Content exceeds the maximum length of 200 characters.");
            return;
        }

        const payload = { content };

        try {
            const response = await fetch(
                `${API_URL}/posts/${postId}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setError(
                    errorData.message ||
                        "Failed to create comment. Please try again."
                );
                return;
            }

            const newComment = await response.json();
            onCommentCreated(newComment);
            setSuccess("Comment created successfully!");
            setContent("");
        } catch {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 200 }}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default CommentCreationForm;
