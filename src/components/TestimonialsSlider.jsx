import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState, useRef, useEffect, useCallback } from "react";
import CustomButton from "./CustomButton";

import avatarAnisha from "../assets/images/avatar-anisha.png";
import avatarAli from "../assets/images/avatar-ali.png";
import avatarRichard from "../assets/images/avatar-richard.png";
import avatarShanai from "../assets/images/avatar-shanai.png";

import designPattern from "../assets/images/bg-tablet-pattern.svg";

const testimonials = [
  {
    name: "Anisha Li",
    img: avatarAnisha,
    opinion:
      "“Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.”",
  },
  {
    name: "Ali Bravo",
    img: avatarAli,
    opinion:
      "“We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.”",
  },
  {
    name: "Richard Watts",
    img: avatarRichard,
    opinion:
      "“Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop recommending them to everyone I talk to!”",
  },
  {
    name: "Shanai Gough",
    img: avatarShanai,
    opinion:
      "“Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive.”",
  },
];

export default function TestimonialsSlider() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const gap = isSmallScreen ? 0 : 36;

  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [, setContainerWidth] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);
  const firstCardRef = useRef(null);
  const startX = useRef(0);
  const startOffset = useRef(0);

  const calculateDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidthVal = container.getBoundingClientRect().width;
    setContainerWidth(containerWidthVal);

    let cardWidthVal;
    if (isSmallScreen) {
      cardWidthVal = containerWidthVal;
    } else {
      if (!firstCardRef.current) return;
      cardWidthVal = firstCardRef.current.getBoundingClientRect().width;
    }
    setCardWidth(cardWidthVal);

    const totalContentWidth =
      testimonials.length * cardWidthVal + (testimonials.length - 1) * gap;
    const newMaxOffset = Math.max(0, totalContentWidth - containerWidthVal);
    setMaxOffset(newMaxOffset);
    setOffset((prev) => Math.min(prev, newMaxOffset));
  }, [gap, isSmallScreen, testimonials.length]);

  useEffect(() => {
    calculateDimensions();
  }, [calculateDimensions, isSmallScreen]);

  useEffect(() => {
    const handleResize = () => {
      calculateDimensions();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateDimensions]);

  useEffect(() => {
    if (cardWidth === 0) return;
    const index = Math.round(offset / (cardWidth + gap));
    const clamped = Math.min(index, testimonials.length - 1);
    setCurrentIndex(clamped);
  }, [offset, cardWidth, gap, testimonials.length]);

  const getNearestIndex = useCallback(
    (offsetValue) => {
      const lastIndex = testimonials.length - 1;
      if (Math.abs(offsetValue - maxOffset) < 1) {
        return lastIndex;
      }
      const index = Math.round(offsetValue / (cardWidth + gap));
      return Math.min(index, lastIndex);
    },
    [maxOffset, cardWidth, gap, testimonials.length],
  );

  const snapToCard = useCallback(
    (index) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidthVal = container.getBoundingClientRect().width;
      setContainerWidth(containerWidthVal);

      let cardWidthVal;
      if (isSmallScreen) {
        cardWidthVal = containerWidthVal;
      } else {
        if (!firstCardRef.current) return;
        cardWidthVal = firstCardRef.current.getBoundingClientRect().width;
      }
      setCardWidth(cardWidthVal);

      const totalContentWidth =
        testimonials.length * cardWidthVal + (testimonials.length - 1) * gap;
      const currentMaxOffset = Math.max(
        0,
        totalContentWidth - containerWidthVal,
      );
      setMaxOffset(currentMaxOffset);

      let targetOffset;
      if (index === testimonials.length - 1) {
        targetOffset = currentMaxOffset;
      } else {
        targetOffset = Math.min(index * (cardWidthVal + gap), currentMaxOffset);
      }
      setOffset(targetOffset);
      setCurrentIndex(index);
    },
    [gap, isSmallScreen, testimonials.length],
  );

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startOffset.current = offset;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX.current;
    const newOffset = Math.min(
      Math.max(startOffset.current - deltaX, 0),
      maxOffset,
    );
    setOffset(newOffset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (cardWidth === 0) return;
    const nearestIndex = getNearestIndex(offset);
    snapToCard(nearestIndex);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    startX.current = touch.clientX;
    startOffset.current = offset;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX.current;
    const newOffset = Math.min(
      Math.max(startOffset.current - deltaX, 0),
      maxOffset,
    );
    setOffset(newOffset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (cardWidth === 0) return;
    const nearestIndex = getNearestIndex(offset);
    snapToCard(nearestIndex);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        setIsDragging(false);
        if (cardWidth > 0) {
          const nearestIndex = getNearestIndex(offset);
          snapToCard(nearestIndex);
        }
      }
    };
    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => window.removeEventListener("mouseup", handleMouseUpGlobal);
  }, [isDragging, offset, cardWidth, getNearestIndex, snapToCard]);

  return (
    <Box
      component="section"
      textAlign="center"
      paddingInline={{ xs: "16px", md: 0 }}
      paddingBlockEnd={{ xs: "42px", md: "11.75rem" }}
      position="relative"
      zIndex={1}
    >
      {!isSmallScreen && (
        <Box
          component="img"
          src={designPattern}
          alt="Design Pattern"
          sx={{
            position: "absolute",
            left: "-35%",
            top: "-60%",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      )}

      <Typography
        variant="h2"
        fontSize={{ xs: "2rem", md: "2.25rem" }}
        fontWeight={700}
        color="text.primary"
        marginBlockEnd={{ xs: "3.3rem", md: "4rem" }}
      >
        {"What they’ve said"}
      </Typography>

      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          overflow: "hidden",
          cursor: "grab",
          userSelect: "none",
          touchAction: "none",
          paddingTop: "50px",
          "&:active": { cursor: "grabbing" },
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Box
          sx={{
            display: "flex",
            gap: `${gap}px`,
            width: "max-content",
            transform: `translateX(-${offset}px)`,
            transition: isDragging
              ? "none"
              : "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
            marginBlockEnd: { xs: "1.75rem", md: "3rem" },
          }}
        >
          {testimonials.map((test, index) => (
            <Box
              key={test.name}
              ref={index === 0 ? firstCardRef : null}
              sx={{
                width: isSmallScreen ? `${cardWidth}px` : "543px",
                flexShrink: 0,
                padding: { xs: "36px 24px 40px", md: "2.5rem" },
                backgroundColor: "hsl(0, 0%, 96%)",
                position: "relative",
                borderRadius: "8px",
                overflow: "visible",
                boxSizing: "border-box",
              }}
            >
              <Box
                component="img"
                src={test.img}
                alt={test.name}
                sx={{
                  position: "absolute",
                  width: 72,
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: -36,
                  borderRadius: "50%",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
              <Typography
                variant="h3"
                fontSize="1rem"
                fontWeight={700}
                color="text.primary"
                marginBlock="1.75rem 1.5rem"
              >
                {test.name}
              </Typography>
              <Typography
                variant="body1"
                fontSize={{ xs: "14.5px", md: "1rem" }}
                lineHeight={{ xs: 1.85, md: 1.5 }}
                color="text.secondary"
              >
                {test.opinion}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        sx={{
          marginBlockEnd: "3rem",
          display: { xs: "flex", md: "none" },
        }}
      >
        {testimonials.map((_, index) => (
          <Box
            key={index}
            onClick={() => snapToCard(index)}
            sx={{
              width: 10,
              height: 10,
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: "50%",
              backgroundColor:
                currentIndex === index ? "primary.main" : "transparent",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          />
        ))}
      </Stack>

      <CustomButton color="primary.main" />
    </Box>
  );
}
