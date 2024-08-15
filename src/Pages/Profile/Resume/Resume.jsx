import React from "react";
import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import TemplateCard1 from "./TemplateCard1";
import TemplateCard2 from "./TemplateCard2";
import TemplateCard3 from "./TemplateCard3";
import TemplateCard4 from "./TemplateCard4";

const Resume = () => {
  React.useEffect(() => {
    document.title = "CodeRoutine | Resume";
  }, []);
  const { state } = useLocation();
  const user = state?.userProfile;
  const resumeCard = [
    {
      id: 1,
      title: "Template Card 1",
      component: TemplateCard1,
    },
    {
      id: 2,
      title: "Template Card 2",
      component: TemplateCard2,
    },
    {
      id: 3,
      title: "Template Card 3",
      component: TemplateCard3,
    },
    {
      id: 4,
      title: "Template Card 4",
      component: TemplateCard4,
    },
  ];
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {resumeCard.map((card) => (
        <Grid item xs={12} md={6} lg={4} key={card.id} sx={{ mb: 4 }}>
          <card.component user={user} />
        </Grid>
      ))}
    </Container>
  );
};

export default Resume;
