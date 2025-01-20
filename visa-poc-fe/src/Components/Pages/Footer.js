import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "primary.main",
                paddingTop: "1.5rem",
                paddingBottom: "1.5rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Typography color="white" variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography color="white" variant="body2">
                            We provide innovative healthcare solutions to help families manage their medical profiles with ease. Learn more about our mission to improve healthcare management.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography color="white" variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Typography>
                            <Link href="/home" color="inherit" underline="none">
                                Home
                            </Link>
                        </Typography>
                        <Typography>
                            <Link href="/contact" color="inherit" underline="none">
                                Contact Us
                            </Link>
                        </Typography>
                        <Typography>
                            <Link href="/faq" color="inherit" underline="none">
                                FAQs
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography color="white" variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Typography color="white" variant="body2">
                            Stay connected with us on social media for the latest updates:
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                            <IconButton
                                component={Link}
                                href="https://facebook.com"
                                color="inherit"
                                aria-label="facebook"
                                sx={{ color: "white" }}
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                component={Link}
                                href="https://twitter.com"
                                color="inherit"
                                aria-label="twitter"
                                sx={{ color: "white" }}
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                component={Link}
                                href="https://linkedin.com"
                                color="inherit"
                                aria-label="linkedin"
                                sx={{ color: "white" }}
                            >
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container direction="column" alignItems="center" sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <Typography color="white" variant="subtitle1">
                            {` © Copyright ${new Date().getFullYear()} | One Health | All Rights Reserved.`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
