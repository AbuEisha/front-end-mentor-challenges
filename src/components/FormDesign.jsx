import { Box, Button, FormControl, Typography } from "@mui/material";
import InputFileUpload from "./InputFileUpload";
import { useState } from "react";
import CustomInput from "./CustomInput";

export default function FormDesign({
  values,
  handleChange,
  handleDrop,
  handleDelete,
  handleFormSubmit,
}) {
  const [formErrors, setFormErrors] = useState({
    fileError: false,
    fullNameError: false,
    emailError: false,
    userNameError: false,
  });

  const inputsArray = [
    {
      label: "Full Name",
      name: "fullName",
      placeholder: "First Last",
      errorName: "fullNameError",
      errorMsg: "Please enter your full name",
    },
    {
      label: "Email Address",
      name: "email",
      placeholder: "example@email.com",
      errorName: "emailError",
      errorMsg: "Please enter a valid email address",
    },
    {
      label: "GitHub Username",
      name: "userName",
      placeholder: "@yourusername",
      errorName: "userNameError",
      errorMsg: "Please enter a valid username",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!values.imageFile) {
      errors.fileError = true;
    }
    const nameRegex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

    if (!nameRegex.test(values.fullName)) {
      errors.fullNameError = true;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(values.email)) {
      errors.emailError = true;
    }
    const usernameRegex = /^@[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
    if (!usernameRegex.test(values.userName)) {
      errors.userNameError = true;
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      handleFormSubmit();
    }
  };

  const handleChangeFile = (e, valueName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 500 * 1024) {
        handleChange(e, valueName);
        setFormErrors((prev) => ({ ...prev, fileError: false }));
      } else {
        handleDelete();
        setFormErrors((prev) => ({ ...prev, fileError: true }));
      }
    }
  };

  const handleDropFile = (file) => {
    if (file) {
      if (file.size <= 500 * 1024) {
        handleDrop(file);
        setFormErrors((prev) => ({ ...prev, fileError: false }));
      } else {
        handleDelete();
        setFormErrors((prev) => ({ ...prev, fileError: true }));
      }
    }
  };
  return (
    <>
      <Typography
        variant="h1"
        fontSize={{ xs: "1.75rem", md: "3.5rem" }}
        fontWeight={700}
      >
        Your Journey to Coding Conf 2025 Starts Here!
      </Typography>
      <Typography
        variant="body1"
        color="hsl(252, 6%, 83%)"
        fontSize={{ xs: "1.25rem", sm: "1.35rem" }}
        fontWeight={500}
        marginBlock={{ xs: "1.75rem 2.5rem", md: "2rem 3rem" }}
      >
        Secure your spot at next year&apos;s biggest coding conference.
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        textAlign="start"
        maxWidth="27.8125rem"
        marginInline="auto"
      >
        <FormControl fullWidth>
          <Typography variant="body1" fontSize="1.25rem" marginBlockEnd=".5rem">
            Upload Avatar
          </Typography>
          <InputFileUpload
            imageFile={values.imageFile}
            handleChange={handleChangeFile}
            handleDrop={handleDropFile}
            handleDelete={handleDelete}
            error={formErrors.fileError}
          />
        </FormControl>
        {inputsArray.map((input, i) => (
          <CustomInput
            key={i}
            info={input}
            value={values[input.name]}
            handleChange={handleChange}
            error={formErrors[input.errorName]}
          />
        ))}
        <Button
          type="submit"
          fullWidth
          disableRipple
          sx={{
            marginBlockStart: "1.5rem",
            background: "hsl(7, 88%, 67%)",
            color: "hsl(248, 70%, 10%)",
            padding: ".5rem",
            fontWeight: 800,
            textTransform: "none",
            fontSize: "1.25rem",
            borderRadius: "0.75rem",
            borderBottom: ".25rem solid transparent",
            "&:focus": {
              outline: "0.125rem solid hsl(245, 15%, 58%)",
              outlineOffset: "0.125rem",
              boxShadow: "none",
            },
            "&:hover": {
              backgroundColor: "hsl(7, 71%, 60%)",
              borderBottomColor: "hsl(7, 88%, 67%)",
            },
          }}
          onClick={handleSubmit}
        >
          Generate My Ticket
        </Button>
      </Box>
    </>
  );
}
