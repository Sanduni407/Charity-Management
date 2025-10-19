import express from "express";
import {
  // Admin/Organizer routes
  createEvent,
  getAdminEvents,
  updateEvent,
  deleteEvent,
  getEventRegistrations,
  getEventAnalytics,
  getAllEventsAnalytics,
  
  // Public/Beneficiary routes
  getAllEvents,
  getEventById,
  registerForEvent,
  getUserRegistrations,
  cancelRegistration,
} from "../controllers/eventController.js";
import userAuth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ========================
// PUBLIC ROUTES
// ========================
router.get("/all", getAllEvents); // Can be accessed with or without auth
router.get("/:eventId", getEventById); // Can be accessed with or without auth

// ========================
// AUTHENTICATED USER ROUTES (Beneficiaries)
// ========================
router.post("/:eventId/register", userAuth, registerForEvent);
router.post("/user/registrations", userAuth, getUserRegistrations);
router.post("/registration/:registrationId/cancel", userAuth, cancelRegistration);

// ========================
// ADMIN/ORGANIZER ROUTES
// ========================
router.post("/admin/create",  upload.single("image"),userAuth, createEvent);
router.post("/admin/my-events", userAuth, getAdminEvents);
router.put("/admin/:eventId", upload.single("image"),userAuth, updateEvent);
router.post("/admin/:eventId", userAuth, deleteEvent);
router.post("/admin/:eventId/registrations", userAuth, getEventRegistrations);
router.post("/admin/:eventId/analytics", userAuth, getEventAnalytics);
router.post("/admin/analytics/all", userAuth, getAllEventsAnalytics);

export default router;