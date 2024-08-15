import * as React from "react";
import { Box, Container, Paper, CircularProgress, Button } from "@mui/material";
import { getUserByUserName } from "../../Api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import ProblemsSolved from "./ProblemsSolved";
import Skills from "./Skills";
import SocialLinks from "./SocialLinks/SocialLinks";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import CopyRight from "../../Component/CopyRight/CopyRight";
import Training from "./Training/Training";
import Project from "./Project/Project";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import { toast } from "react-toastify";
import { ContextStore } from "../../Context/ContextStore";

const Profile = () => {
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { id: userName } = useParams();
  const { userData } = ContextStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserByUserName(userName);
        setUserProfile(response.data.user);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName]);

  React.useEffect(() => {
    document.title = "CodeRoutine | Profile";
  }, []);

  const hasSocialLinks = (socialLinks) => {
    if (!socialLinks) return false;
    const { linkedin, github, x, blog, portfolio, additional } = socialLinks;
    return (
      linkedin ||
      github ||
      x ||
      blog ||
      portfolio ||
      (additional && additional.length > 0)
    );
  };

  const hasPersonalInformation = (profile) => {
    if (!profile) return false;
    const {
      firstName,
      lastName,
      headline,
      currentPosition,
      education,
      city,
      gender,
      country,
    } = profile;
    return (
      firstName ||
      lastName ||
      headline ||
      currentPosition ||
      education ||
      city ||
      gender ||
      country
    );
  };

  const isLogin = () => {
    return (
      userData?._id && userProfile?._id && userData._id === userProfile._id
    );
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        style={{
          marginTop: "80px",
          marginBottom: "100px",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  const renderSection = (Component, condition) => {
    if (isLogin() || condition) {
      return <Component userProfile={userProfile} />;
    }
    return null;
  };

  return (
    <>
      <Container
        maxWidth="lg"
        style={{ marginTop: "40px", marginBottom: "80px" }}
      >
        <Paper elevation={3} sx={{ borderRadius: "10px", overflow: "hidden" }}>
          <Box
            sx={{
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "white",
              padding: "20px",
              textAlign: "center",
              height: "200px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            {isLogin() && (
              <Box
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                  onClick={() =>
                    navigate(`/profile/resume/${userProfile?.userName}`, {
                      state: { userProfile },
                    })
                  }
                >
                  Resume
                </Button>
                {/* <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                  onClick={() =>
                    navigate(`/resume/${userProfile?.userName}`, {
                      state: { userProfile },
                    })
                  }
                >
                  Custom Resume
                </Button> */}
              </Box>
            )}
          </Box>
          <Container>
            {renderSection(
              PersonalInformation,
              hasPersonalInformation(userProfile?.profile)
            )}
            {renderSection(Experience, userProfile?.experience?.length > 0)}
            {renderSection(Education, userProfile?.education?.length > 0)}
            {renderSection(Training, userProfile?.training?.length > 0)}
            {renderSection(Project, userProfile?.project?.length > 0)}
            {renderSection(Skills, userProfile?.skills?.length > 0)}
            {renderSection(
              SocialLinks,
              hasSocialLinks(userProfile?.socialLinks)
            )}
            <ProblemsSolved problemsSolved={userProfile?.problemsSolved} />
          </Container>
        </Paper>
      </Container>
      <CopyRight />
    </>
  );
};

export default Profile;
