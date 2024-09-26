import React from "react";
import {
  Typography,
  Button,
  Grid,
  Container,
  Box,
  useMediaQuery,
} from "@mui/material";
import styled from "@emotion/styled";
import { AttachMoney, FastForward, Lightbulb } from "@mui/icons-material";
import { Link } from "react-router-dom";

const PaddedBox = styled(Box)`
  padding: 6rem 0;
`;

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="h4" textAlign="center" sx={{ marginBottom: "2rem" }}>
    {children}
  </Typography>
);

const StyledImg = styled.img`
  width: 100%;
  max-height: 10rem;
  object-fit: cover;
  border-radius: 1rem;
`;

const HeroGrid = styled(Grid)`
  background-image: url(/assets/burger-hero-min.jpg);
  background-size: cover;
  background-position: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 35rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }
`;

const ReadableTypography = styled(Typography)`
  color: white;
  z-index: 20 !important;
  position: relative;
  margin: 0 auto;
`;

const About: React.FC = () => {
  const isSmDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isXsDown = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const headingVariant = isXsDown ? "h6" : isSmDown ? "h5" : "h4";
  return (
    <div>
      <HeroGrid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Container maxWidth="lg" disableGutters>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <ReadableTypography variant={headingVariant} color="white">
                Higher CPD = More Value
              </ReadableTypography>
            </Grid>

            <Grid item>
              <ReadableTypography variant="body1" maxWidth="40rem">
                CalsPerDollar is here to help you maximize your meals by showing
                you the best calorie-per-dollar options from your favorite
                restaurants. Save money and make smart choices without the
                hassle.
              </ReadableTypography>
            </Grid>

            <Grid item>
              <Button
                component={Link}
                to="/browse"
                color="primary"
                variant="contained"
              >
                Start Saving On Meals Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </HeroGrid>
      <PaddedBox>
        <Container maxWidth="sm">
          <Heading>Our Mission</Heading>
          <Typography variant="body1" textAlign="center">
            We believe that everyone should have access to affordable and
            nutritious meals. Our mission is to help you make the best choices
            when it comes to your meals by providing you with the information
            you need to make informed decisions. With CalsPerDollar, you can
            find the best value for your meals, one calorie at a time.
          </Typography>
        </Container>
      </PaddedBox>
      <PaddedBox sx={{ backgroundColor: "#e3ffe5" }}>
        <Container maxWidth="lg">
          <Heading>How It Works</Heading>

          <Grid item container xs={12} spacing={6}>
            <Grid item xs={12} md={4}>
              <StyledImg
                src="/assets/search-min.jpg"
                alt="Search for a restaurant"
              />
              <Typography variant="h6">Search for a Restaurant</Typography>
              <Typography variant="body2">
                Find your favorite restaurants or explore new spots with ease.
                CalsPerDollar helps you discover the best places based on value
                and preference.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledImg
                src="/assets/compare-min.jpg"
                alt="Compare menu items"
              />
              <Typography variant="h6">Compare Menu Items</Typography>
              <Typography variant="body2">
                Quickly browse menu items and see how many calories you get for
                each dollar. Compare meals easily to find the best option for
                your budget and diet.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledImg
                src="/assets/choice-min.jpg"
                alt="Make informed choices"
              />
              <Typography variant="h6">Make Informed Choices</Typography>
              <Typography variant="body2">
                Get the best value without sacrificing nutrition or taste.
                CalsPerDollar helps you make smarter food choices by showing the
                best calorie-per-dollar deals.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </PaddedBox>

      <PaddedBox>
        <Container maxWidth="lg">
          <Heading>Why Use CalsPerDollar?</Heading>
          <Grid item container xs={12} spacing={6}>
            <Grid
              item
              xs={12}
              md={4}
              container
              alignItems="center"
              direction="column"
            >
              <AttachMoney
                sx={{ fontSize: 100, color: "green", margin: "0 auto" }}
              />
              <Typography variant="h6" textAlign="center">
                Save Money
              </Typography>
              <Typography variant="body2" textAlign="center">
                Stretch your dollar further by choosing meals that offer the
                best value. Whether you're a student, a family, or anyone trying
                to budget, we help you find the right meal at the right price.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              alignItems="center"
              direction="column"
            >
              <Lightbulb
                sx={{ fontSize: 100, color: "gold", margin: "0 auto" }}
              />
              <Typography variant="h6" textAlign="center">
                Eat Smart
              </Typography>
              <Typography variant="body2" textAlign="center">
                Don't sacrifice nutrition just to save a few bucks.
                CalsPerDollar helps you balance both by providing a clear view
                of the calorie-per-dollar ratio, so you can make smarter,
                healthier choices.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              alignItems="center"
              direction="column"
            >
              <FastForward
                sx={{ fontSize: 100, color: "blue", margin: "0 auto" }}
              />
              <Typography variant="h6" textAlign="center">
                Fast & Easy
              </Typography>
              <Typography variant="body2" textAlign="center">
                Say goodbye to endless searching for menu prices and nutritional
                info. With CalsPerDollar, you can quickly find what you need,
                all in one place.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </PaddedBox>

      <PaddedBox sx={{ backgroundColor: "#e3ffe5" }}>
        <Container maxWidth="lg">
          <Heading>Start Saving on Meals Today</Heading>
          <Typography
            variant="body1"
            textAlign="center"
            maxWidth="40rem"
            sx={{ margin: "0 auto" }}
          >
            Join CalsPerDollar today and start saving on your meals. With our
            easy-to-use platform, you can find the best value for your meals and
            make informed choices without the hassle. Save money and eat well
            with CalsPerDollar.
          </Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                component={Link}
                to="/browse"
                color="primary"
                variant="contained"
                sx={{ margin: "2rem auto" }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </PaddedBox>
    </div>
  );
};

export default About;
