import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "primary.main",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    {/* <Grid item xs={12}>
                        <Typography color="black" variant="h5">
                            
                        </Typography>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Typography color="white" variant="subtitle1">
                            {`${new Date().getFullYear()} | React | Material UI | React Router`} 
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;