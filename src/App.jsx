import { useEffect, useState, useRef } from "react";
import "./App.css";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import bgPatternDesktop from "./assets/images/pattern-bg-desktop.png";
import bgPatternMobile from "./assets/images/pattern-bg-mobile.png";
import arrowIcon from "./assets/images/icon-arrow.svg";
import locationIcon from "./assets/images/icon-location.svg";

function App() {
  const [ipInput, setIpInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [location, setLocation] = useState({
    ip: "",
    city: "",
    region: "",
    postCode: "",
    isp: "",
    lat: "",
    lng: "",
    timeZone: "",
  });

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const fetchLoaction = async (idValue = "") => {
    try {
      setIsLoading(true);
      const url = "https://geo.ipify.org/api/v2/country,city";
      const apiKey = import.meta.env.VITE_IPIFY_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Check your .env file.");
      }

      const response = await fetch(
        `${url}?apiKey=${apiKey}&ipAddress=${idValue}`,
      );
      const geoInfo = await response.json();

      const ip = geoInfo.ip;
      const city = geoInfo.location.city;
      const region = geoInfo.location.region;
      const postCode = geoInfo.location.postalCode;
      const isp = geoInfo.isp;
      const lat = geoInfo.location.lat;
      const lng = geoInfo.location.lng;
      const timeZone = geoInfo.location.timezone;

      setLocation({ ip, city, region, postCode, isp, lat, lng, timeZone });
    } catch {
      setErrors(
        "We couldn't connect to the server. Please try again in a few moments",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoaction();
  }, []);

  useEffect(() => {
    if (errors || isLoading) {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    }
  }, [errors, isLoading]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!location.lat || !location.lng) return;
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView([location.lat, location.lng], 20);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    const customIcon = L.icon({ iconUrl: locationIcon });
    const marker = L.marker([location.lat, location.lng], {
      icon: customIcon,
    }).addTo(map);
    markerRef.current = marker;
  }, [location.lat, location.lng]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!location.lat || !location.lng) return;

    const map = mapRef.current;
    const newCenter = [location.lat, location.lng];

    map.setView(newCenter, 20);

    if (markerRef.current) {
      markerRef.current.remove();
    }
    const customIcon = L.icon({ iconUrl: locationIcon });
    const newMarker = L.marker(newCenter, { icon: customIcon }).addTo(map);
    markerRef.current = newMarker;
  }, [location.lat, location.lng]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ipInput)) {
      setErrors("This Is Wrong IP Address, Please Enter Valid IP Address");
      return;
    }
    fetchLoaction(ipInput);
  };

  const handleReset = () => {
    setErrors(null);
    setIpInput("");
    fetchLoaction();
  };
  return (
    <Box
      component="main"
      position="relative"
      height="100vh"
      zIndex={1}
      overflow="hidden"
    >
      <Box
        component="img"
        src={bgPatternMobile}
        alt="Mobile Pattern"
        position="absolute"
        left="0"
        top={0}
        width="100%"
        height="300px"
        zIndex={-1}
        display={{ xs: "block", sm: "none" }}
      />
      <Box
        component="img"
        src={bgPatternDesktop}
        alt="Desktop Pattern"
        position="absolute"
        left="0"
        top={0}
        width="100%"
        height="280px"
        zIndex={-1}
        display={{ xs: "none", sm: "block" }}
      />
      {errors ? (
        <Container
          maxWidth="md"
          sx={{
            position: "absolute",
            top: "210px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "2rem",
            backgroundColor: "white",
            textAlign: "center",
            borderRadius: "12px",
            boxShadow: "5px 5px 10px hsl(0deg 0% 0% / 15%)",
          }}
        >
          <Typography variant="body1" fontSize="1.5rem" fontWeight={500}>
            {errors}
          </Typography>
          <Button
            aria-label="Click to try again"
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              padding: "0.5rem 1rem",
              borderRadius: ".5rem",
              marginBlockStart: "1.5rem",
              "&:hover": {
                backgroundColor: "hsl(0, 0%, 17%)",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(0, 0%, 17%)",
              },
            }}
            onClick={handleReset}
          >
            Try Again
          </Button>
        </Container>
      ) : (
        <Container
          sx={{
            maxWidth: { lg: "1110px" },
            paddingInline: { xs: "24px", lg: 0 },
          }}
        >
          <Typography
            variant="h1"
            textAlign="center"
            fontSize={{ xs: "1.5rem", sm: "2rem" }}
            fontWeight={500}
            color="white"
            paddingBlock={{ xs: "1.75rem", md: "2rem 1.75rem" }}
          >
            IP Address Tracker
          </Typography>
          <Stack
            component="form"
            flexDirection="row"
            maxWidth="555px"
            marginInline="auto"
          >
            <TextField
              type="text"
              inputMode="numeric"
              autoComplete="off"
              fullWidth
              id="ip-field"
              placeholder="Search for any IP address or domain"
              variant="filled"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "white",
                  borderRadius: "16px 0 0 16px",
                  fontSize: "18px",
                  "&::before": {
                    borderBottom: "0",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white",
                  },
                  "&:hover": {
                    backgroundColor: "white",
                    "&:not(.Mui-disabled, .Mui-error)": {
                      "&::before": {
                        borderBottom: "0",
                      },
                    },
                  },
                  "&::after": {
                    borderBottom: "0",
                  },
                },
                "& input": {
                  padding: "16.25px 1.25rem 18px",
                },
              }}
            />
            <Button
              type="submit"
              disableRipple
              aria-label="Search for IP"
              sx={{
                backgroundColor: "black",
                borderRadius: "0 16px 16px 0",
                "&:hover": {
                  backgroundColor: "hsl(0, 0%, 17%)",
                },
                "&.Mui-focusVisible": {
                  backgroundColor: "hsl(0, 0%, 17%)",
                },
              }}
              onClick={handleSubmit}
            >
              <Box component="img" src={arrowIcon} alt="Arrow Icon" />
            </Button>
          </Stack>

          <Stack
            component="section"
            flexDirection={{ xs: "column", md: "row" }}
            textAlign={{ xs: "center", md: "start" }}
            gap={{ xs: "24px", md: 0 }}
            paddingBlock={{ xs: "24px", md: "32px" }}
            minHeight="160px"
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              marginBlockStart: { xs: "24px", md: "48px" },
              boxShadow: "5px 5px 10px hsl(0deg 0% 0% / 6%)",
            }}
          >
            <Box
              flex={1}
              paddingInline={{ xs: "16px", md: "32px" }}
              borderRight={{ xs: "none", md: "1px solid hsl(0, 0%, 58%)" }}
            >
              <Typography
                variant="body1"
                fontSize={{ xs: "11px", lg: "14px" }}
                fontWeight={500}
                textTransform="uppercase"
                letterSpacing="2px"
                color="hsl(0, 0%, 58%)"
              >
                IP Address
              </Typography>
              <Typography
                variant="h2"
                fontSize={{ xs: "1.25rem", lg: "1.65rem" }}
                fontWeight={500}
                marginBlockStart={{ xs: "6px", md: "8px" }}
              >
                {isLoading ? "-" : location.ip}
              </Typography>
            </Box>

            <Box
              flex={1}
              paddingInline={{ xs: "16px", md: "32px" }}
              borderRight={{ xs: "none", md: "1px solid hsl(0, 0%, 58%)" }}
            >
              <Typography
                variant="body1"
                fontSize={{ xs: "11px", lg: "14px" }}
                fontWeight={500}
                textTransform="uppercase"
                letterSpacing="2px"
                color="hsl(0, 0%, 58%)"
              >
                Location
              </Typography>
              <Typography
                variant="h2"
                fontSize={{ xs: "1.25rem", lg: "1.65rem" }}
                fontWeight={500}
                marginBlockStart={{ xs: "6px", md: "8px" }}
              >
                {isLoading
                  ? "-"
                  : `${location.city}, ${location.region ?? ""} ${location.postCode ?? ""}`}
              </Typography>
            </Box>
            <Box
              flex={1}
              paddingInline={{ xs: "16px", md: "32px" }}
              borderRight={{ xs: "none", md: "1px solid hsl(0, 0%, 58%)" }}
            >
              <Typography
                variant="body1"
                fontSize={{ xs: "11px", lg: "14px" }}
                fontWeight={500}
                textTransform="uppercase"
                letterSpacing="2px"
                color="hsl(0, 0%, 58%)"
              >
                Timezone
              </Typography>
              <Typography
                variant="h2"
                fontSize={{ xs: "1.25rem", lg: "1.65rem" }}
                fontWeight={500}
                marginBlockStart={{ xs: "6px", md: "8px" }}
              >
                {isLoading ? "-" : `UTC ${location.timeZone}`}
              </Typography>
            </Box>
            <Box flex={1} paddingInline={{ xs: "16px", md: "32px" }}>
              <Typography
                variant="body1"
                fontSize={{ xs: "11px", lg: "14px" }}
                fontWeight={500}
                textTransform="uppercase"
                letterSpacing="2px"
                lineHeight={{ xs: 1, md: 1.5 }}
                color="hsl(0, 0%, 58%)"
              >
                ISP
              </Typography>
              <Typography
                variant="h2"
                fontSize={{ xs: "1.25rem", lg: "1.65rem" }}
                fontWeight={500}
                marginBlockStart={{ xs: "6px", md: "8px" }}
              >
                {isLoading ? "-" : location.isp}
              </Typography>
            </Box>
          </Stack>
        </Container>
      )}
      {!errors && (
        <Box
          ref={mapContainerRef}
          sx={{
            position: "absolute",
            width: "100%",
            height: { xs: "calc(100% - 300px)", sm: "calc(100% - 280px)" },
            left: 0,
            bottom: 0,
            zIndex: -2,
          }}
        ></Box>
      )}
    </Box>
  );
}

export default App;
