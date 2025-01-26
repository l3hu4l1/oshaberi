import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Chip,
    Autocomplete,
} from "@mui/material";
import { API_URL } from "../App";

const existingTags = ["food", "art", "travel", "sports", "gaming"];

const PostCreation: React.FC = () => {
    // const { token } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    /*
    useEffect(() => {
        if (!token) {
            alert(
                "You need to be logged in to create a post. Redirecting to registration page..."
            );
            navigate("/register");
        }
    }, [token, navigate]);
    */

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const payload = { title, content, tags };

        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(
                    errorData.message ||
                        "Failed to create post. Please try again."
                );
                return;
            }

            setSuccess("Post created successfully!");
            setTitle("");
            setContent("");
            setTags([]);
        } catch {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create Post
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 100 }}
                    required
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 1000 }}
                    required
                />
                <Autocomplete
                    multiple
                    options={existingTags}
                    freeSolo
                    value={tags}
                    onChange={(event, newValue) => setTags(newValue)}
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Tags"
                            placeholder="Add tags"
                        />
                    )}
                    sx={{ marginTop: 2 }}
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
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate("/")}
            >
                Back to Home
            </Button>
        </Box>
    );
};

export default PostCreation;
