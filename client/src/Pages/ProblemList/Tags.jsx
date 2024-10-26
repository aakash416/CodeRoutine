import { Box, Chip, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Icon for view more
import ExpandLessIcon from "@mui/icons-material/ExpandLess"; // Icon for view less

const Tags = ({ questions, onTagClick, selectedTags }) => {
  const [expanded, setExpanded] = useState(false); // State to track expanded view

  const tagCountMap = questions?.reduce((acc, question) => {
    question.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const uniqueTags = Object.entries(tagCountMap || {}).map(([tag, count]) => ({
    tag,
    count,
  }));

  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  // Function to handle expanding/collapsing
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        display: "flex",
        alignItems: "center",
        mb: 3,
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {uniqueTags
          .slice(0, expanded ? uniqueTags.length : 5)
          .map(({ tag, count }) => (
            <Chip
              key={tag}
              label={`${capitalizeWords(tag)} (${count})`}
              variant={selectedTags.includes(tag) ? "filled" : "outlined"}
              color={selectedTags.includes(tag) ? "primary" : "default"}
              onClick={() => onTagClick(tag)}
            />
          ))}
      </Box>

      <Button onClick={toggleExpand} variant="outlined">
        {expanded ? (
          <>
            <ExpandLessIcon />
            <Typography variant="body2">View Less</Typography>
          </>
        ) : (
          <>
            <ExpandMoreIcon />
            <Typography variant="body2">View More</Typography>
          </>
        )}
      </Button>
    </Box>
  );
};

export default Tags;
