import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c602aa03/health", (c) => {
  return c.json({ status: "ok" });
});

// Authentication routes
app.post("/make-server-c602aa03/auth/register", async (c) => {
  try {
    const { email, password, name, phone } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phone },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Registration error in server:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: "User registered successfully", 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        phone: data.user.user_metadata?.phone,
      }
    });
  } catch (error: any) {
    console.error('Registration error in server:', error);
    return c.json({ error: "Registration failed: " + error.message }, 500);
  }
});

// Protected route example - get user profile
app.get("/make-server-c602aa03/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    return c.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name,
      phone: user.user_metadata?.phone,
      avatar: user.user_metadata?.avatar,
      createdAt: user.created_at,
    });
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return c.json({ error: "Failed to fetch profile: " + error.message }, 500);
  }
});

// Save user inquiry
app.post("/make-server-c602aa03/inquiries", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const inquiryData = await c.req.json();
    
    let userId = null;
    if (accessToken) {
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      if (!error && user) {
        userId = user.id;
      }
    }

    const inquiry = {
      ...inquiryData,
      id: crypto.randomUUID(),
      userId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    await kv.set(`inquiry_${inquiry.id}`, inquiry);
    
    if (userId) {
      // Also store in user's inquiries list
      const userInquiries = await kv.get(`user_inquiries_${userId}`) || [];
      userInquiries.push(inquiry.id);
      await kv.set(`user_inquiries_${userId}`, userInquiries);
    }

    return c.json({ message: "Inquiry saved successfully", inquiry });
  } catch (error: any) {
    console.error('Inquiry save error:', error);
    return c.json({ error: "Failed to save inquiry: " + error.message }, 500);
  }
});

// Get user inquiries (protected route)
app.get("/make-server-c602aa03/inquiries", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    const inquiryIds = await kv.get(`user_inquiries_${user.id}`) || [];
    const inquiries = [];
    
    for (const inquiryId of inquiryIds) {
      const inquiry = await kv.get(`inquiry_${inquiryId}`);
      if (inquiry) {
        inquiries.push(inquiry);
      }
    }

    return c.json(inquiries);
  } catch (error: any) {
    console.error('Inquiries fetch error:', error);
    return c.json({ error: "Failed to fetch inquiries: " + error.message }, 500);
  }
});

Deno.serve(app.fetch);