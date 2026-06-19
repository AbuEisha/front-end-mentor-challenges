import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

const jobImages = import.meta.glob("./assets/images/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});
export default function JobCard({ detials, jobInfo, keywords, handleFilter }) {
  return (
    <Box
      sx={{
        position: "relative",
        p: { xs: "2rem 1.5rem 1.5rem", md: "2rem 2.5rem" },
        paddingBlockStart:
          detials.new || detials.featured
            ? "2rem"
            : { xs: "2.5rem", md: "2rem" },
        backgroundColor: "white",
        borderRadius: "6px",
        borderLeft: "5px solid transparent",
        borderLeftColor: detials.featured ? "primary.main" : "transparent",
        boxShadow: "5px 5px 20px hsl(180deg 29% 50% / 25%)",
      }}
    >
      <Grid container alignItems="center" rowGap={{ xs: 2.25, md: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack flexDirection="row" alignItems="center" gap={3}>
            <Box
              component="img"
              src={jobImages[detials.logo]}
              alt={detials.position}
              sx={{
                position: { xs: "absolute", md: "static" },
                width: { xs: 48, md: "auto" },
                left: { xs: 24, md: "auto" },
                top: { xs: -24, md: "auto" },
              }}
            />
            <Box>
              <Stack flexDirection="row" alignItems="center">
                <Typography
                  variant="body1"
                  fontWeight={700}
                  lineHeight={1}
                  color="primary.main"
                  marginInlineEnd={{ xs: "1.5rem", md: "1rem" }}
                >
                  {detials.company}
                </Typography>
                {detials.new && (
                  <Typography
                    variant="body1"
                    fontSize="13px"
                    fontWeight={700}
                    lineHeight={1}
                    textTransform="uppercase"
                    sx={{
                      padding: "7px 8px 4px",
                      borderRadius: "16px",
                      backgroundColor: "primary.main",
                      color: "white",
                      marginInlineEnd: ".5rem",
                    }}
                  >
                    New!
                  </Typography>
                )}
                {detials.featured && (
                  <Typography
                    variant="body1"
                    fontSize="13px"
                    fontWeight={700}
                    lineHeight={1}
                    textTransform="uppercase"
                    sx={{
                      padding: "7px 8px 4px",
                      borderRadius: "16px",
                      backgroundColor: "primary.dark",
                      color: "white",
                    }}
                  >
                    Featured
                  </Typography>
                )}
              </Stack>
              <Typography
                variant="h1"
                fontSize={{ xs: "15px", md: "21px" }}
                fontWeight={700}
                lineHeight={1}
                color="primary.dark"
                sx={{
                  cursor: "pointer",
                  marginBlock: { xs: "14px 16px", md: ".75rem" },
                  transition: "color .3s ease",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {detials.position}
              </Typography>
              <Stack flexDirection="row" gap={{ xs: "24px", md: "38px" }}>
                {jobInfo.map((info) => (
                  <Typography
                    variant="body1"
                    key={info}
                    fontSize={{ xs: "15px", md: "1rem" }}
                    fontWeight={500}
                    lineHeight={1}
                    color="primary.light"
                    position="relative"
                    sx={{
                      "&:not(:last-of-type)": {
                        "&::before": {
                          content: "''",
                          width: "3px",
                          height: "3px",
                          borderRadius: "50%",
                          backgroundColor: "primary.light",
                          position: "absolute",
                          fontWeight: 700,
                          right: { xs: -12, md: -19 },
                          top: 5,
                        },
                      },
                    }}
                  >
                    {info}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <List
            sx={{
              p: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              gap: { xs: "16px 18px", md: "16px" },
              paddingBlockStart: { xs: 2, md: 0 },
              borderTop: {
                xs: "1px solid hsl(180deg 8% 52% / 50%)",
                md: "none",
              },
            }}
          >
            {keywords.map((word) => (
              <ListItem key={word} sx={{ p: 0, width: "auto" }}>
                <Button
                  disableRipple
                  aria-label={`Add ${word} Keyword To Filter`}
                  sx={{
                    minWidth: "auto",
                    padding: "9px 8px 8px",
                    backgroundColor: "background.default",
                    color: "primary.main",
                    textTransform: "none",
                    fontSize: { xs: "16px", md: "15px" },
                    fontWeight: 700,
                    lineHeight: 1,
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "background.default",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "primary.main",
                      color: "background.default",
                    },
                  }}
                  onClick={() => handleFilter(word)}
                >
                  {word}
                </Button>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
