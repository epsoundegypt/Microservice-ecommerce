import express, { Router } from "express";
import {
  loginUser,
  userForgotPassword,
  userRegistration,
  verifyUser,
  resetUserPassword,
  verifyUserForgotPassword,
} from "../controller/auth.controller";

const router: Router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "Auth Service",
    timestamp: new Date().toISOString(),
  });
});

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/login-user", loginUser);
router.post("/forgot-password-user", userForgotPassword);
router.post("/reset-password-user", resetUserPassword);
router.post("/verify-forgot-password-user", verifyUserForgotPassword);

export default router;
