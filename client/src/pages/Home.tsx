import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    TextField,
    Autocomplete,
    Chip,
    Box,
    Typography,
    Container,
    Button,
} from "@mui/material";
import PostsList from "../components/PostsList";

const existingTags = ["food", "art", "travel", "sports", "gaming"];

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortByDate, setSortByDate] = useState(false);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                お喋り
            </Typography>
            <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
                <TextField
                    label="Search by title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{ flex: 4 }}
                />
                <Autocomplete
                    multiple
                    options={existingTags}
                    freeSolo
                    value={selectedTags}
                    onChange={(event, newValue) => setSelectedTags(newValue)}
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
                            label="Filter by tags"
                            placeholder="Add tags"
                        />
                    )}
                    sx={{ flex: 2 }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    mb: 4,
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", gap: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/register"
                        sx={{
                            padding: "12px 15px",
                            fontSize: "14px",
                            width: "100px",
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/create-post"
                        sx={{
                            padding: "12px 15px",
                            fontSize: "14px",
                            width: "125px",
                        }}
                    >
                        Create Post
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    color="default"
                    onClick={() => setSortByDate(!sortByDate)}
                    sx={{
                        padding: "12px 20px",
                        fontSize: "14px",
                        width: "150px",
                    }}
                >
                    {sortByDate
                        ? "Sort by Date (Newest)"
                        : "Sort by Date (Oldest)"}
                </Button>
            </Box>
            <PostsList searchQuery={searchQuery} selectedTags={selectedTags} />
        </Container>
    );
};

export default Home;
