import Event from "../models/eventModel.js";
import EventRegistration from "../models/eventRegistrationModel.js";
import fs from "fs";
import path from "path";

// Generate unique registration code
const generateRegistrationCode = () => {
  const prefix = "EVT";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

// ========================
// ADMIN/ORGANIZER ROUTES
// ========================

// Create Event (Admin only)
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      purpose,
      description,
      eventDate,
      startTime,
      endTime,
      duration,
      venue,
      capacity,
      itemsToCarry,
      organizer,
      organizerContact,
    } = req.body;

    const userId = req.user._id;
    const userName = req.user.name;

    // Validate required fields
    if (!title || !purpose || !description || !eventDate || !startTime || !endTime || !venue || !capacity) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Event image is required",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    // Parse itemsToCarry if it's a string
    let parsedItems = [];
    if (itemsToCarry) {
      parsedItems = typeof itemsToCarry === 'string' ? JSON.parse(itemsToCarry) : itemsToCarry;
    }

    // Create event
    const newEvent = new Event({
      title,
      purpose,
      description,
      imageUrl,
      eventDate: new Date(eventDate),
      startTime,
      endTime,
      duration,
      venue,
      capacity: parseInt(capacity),
      itemsToCarry: parsedItems,
      organizer: organizer || userName,
      organizerContact: organizerContact || req.user.email,
      createdBy: userId,
      createdByName: userName,
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all events created by admin
export const getAdminEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ createdBy: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get admin events error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check ownership
    if (event.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own events",
      });
    }

    // Update fields
    const updateFields = [
      'title', 'purpose', 'description', 'eventDate', 'startTime', 
      'endTime', 'duration', 'venue', 'capacity', 'organizer', 
      'organizerContact', 'status'
    ];

    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });

    // Handle itemsToCarry
    if (req.body.itemsToCarry) {
      event.itemsToCarry = typeof req.body.itemsToCarry === 'string' 
        ? JSON.parse(req.body.itemsToCarry) 
        : req.body.itemsToCarry;
    }

    // Update image if new one uploaded
    if (req.file) {
      const oldImagePath = path.join(process.cwd(), event.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      event.imageUrl = `/uploads/${req.file.filename}`;
    }

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check ownership
    if (event.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own events",
      });
    }

    // Delete image file
    const imagePath = path.join(process.cwd(), event.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete associated registrations
    await EventRegistration.deleteMany({ eventId });

    // Delete event
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get registrations for an event (Admin only)
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check ownership
    if (event.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const registrations = await EventRegistration.find({ eventId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: registrations,
      total: registrations.length,
      capacity: event.capacity,
      availableSlots: event.capacity - event.registeredCount,
    });
  } catch (error) {
    console.error("Get event registrations error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get event analytics (Admin only)
export const getEventAnalytics = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check ownership
    if (event.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Get registration statistics
    const totalRegistrations = await EventRegistration.countDocuments({ eventId });
    
    const statusCounts = await EventRegistration.aggregate([
      { $match: { eventId: event._id } },
      {
        $group: {
          _id: "$registrationStatus",
          count: { $sum: 1 }
        }
      }
    ]);

    const registrationsByDay = await EventRegistration.aggregate([
      { $match: { eventId: event._id } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const analytics = {
      event: {
        title: event.title,
        eventDate: event.eventDate,
        capacity: event.capacity,
        status: event.status,
      },
      registrations: {
        total: totalRegistrations,
        availableSlots: event.capacity - totalRegistrations,
        capacityPercentage: ((totalRegistrations / event.capacity) * 100).toFixed(2),
      },
      statusBreakdown: statusCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      registrationTrend: registrationsByDay,
    };

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Get event analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get all events analytics for admin dashboard
export const getAllEventsAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ createdBy: userId });

    const totalEvents = events.length;
    const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
    const completedEvents = events.filter(e => e.status === 'completed').length;

    const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
    const totalRegistrations = events.reduce((sum, e) => sum + e.registeredCount, 0);

    const analytics = {
      totalEvents,
      upcomingEvents,
      completedEvents,
      totalCapacity,
      totalRegistrations,
      averageAttendance: totalEvents > 0 ? (totalRegistrations / totalCapacity * 100).toFixed(2) : 0,
      events: events.map(e => ({
        id: e._id,
        title: e.title,
        date: e.eventDate,
        capacity: e.capacity,
        registered: e.registeredCount,
        status: e.status,
        fillRate: ((e.registeredCount / e.capacity) * 100).toFixed(2)
      }))
    };

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Get all events analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ========================
// PUBLIC/BENEFICIARY ROUTES
// ========================

// Get all events (Public)
export const getAllEvents = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ['upcoming', 'ongoing'] };
    }

    const events = await Event.find(query)
      .sort({ eventDate: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

    // Check if user is registered for each event
    let userRegistrations = [];
    if (req.user) {
      const eventIds = events.map(e => e._id);
      const registrations = await EventRegistration.find({
        eventId: { $in: eventIds },
        userId: req.user._id
      });
      userRegistrations = registrations.map(r => r.eventId.toString());
    }

    const eventsWithRegistrationStatus = events.map(event => {
      const eventObj = event.toObject();
      eventObj.isRegistered = userRegistrations.includes(event._id.toString());
      eventObj.isFull = event.registeredCount >= event.capacity;
      return eventObj;
    });

    res.status(200).json({
      success: true,
      data: eventsWithRegistrationStatus,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all events error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get single event details
export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId)
      .populate("createdBy", "name email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const eventObj = event.toObject();

    // Check if user is registered
    if (req.user) {
      const registration = await EventRegistration.findOne({
        eventId,
        userId: req.user._id
      });
      eventObj.isRegistered = !!registration;
      eventObj.registrationDetails = registration;
    }

    eventObj.isFull = event.registeredCount >= event.capacity;

    res.status(200).json({
      success: true,
      data: eventObj,
    });
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Register for event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const {
      participantName,
      participantEmail,
      participantPhone,
      participantAge,
      participantAddress,
      specialRequirements,
    } = req.body;

    const userId = req.user._id;

    // Validate fields
    if (!participantName || !participantEmail || !participantPhone || !participantAge || !participantAddress) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if event is full
    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: "Event is full. No more registrations allowed.",
      });
    }

    // Check if user already registered
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      userId,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this event",
      });
    }

    // Create registration
    const registrationCode = generateRegistrationCode();

    const newRegistration = new EventRegistration({
      eventId,
      userId,
      participantName,
      participantEmail,
      participantPhone,
      participantAge: parseInt(participantAge),
      participantAddress,
      specialRequirements,
      registrationCode,
    });

    await newRegistration.save();

    // Update event registered count
    event.registeredCount += 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: "Successfully registered for the event",
      data: newRegistration,
    });
  } catch (error) {
    console.error("Register for event error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get user's registrations
export const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user._id;

    const registrations = await EventRegistration.find({ userId })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("Get user registrations error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Cancel registration
export const cancelRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const userId = req.user._id;

    const registration = await EventRegistration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    // Check ownership
    if (registration.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Update status instead of deleting
    registration.registrationStatus = "cancelled";
    await registration.save();

    // Decrement event registered count
    await Event.findByIdAndUpdate(registration.eventId, {
      $inc: { registeredCount: -1 }
    });

    res.status(200).json({
      success: true,
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};