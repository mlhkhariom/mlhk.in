import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  image: text("image"),
  role: text("role", { enum: ["super_admin", "admin", "manager", "employee", "client"] }).default("client"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: text("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: text("expires_at"),
  password: text("password"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// ─── CRM ─────────────────────────────────────────────────────────────────────

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  source: text("source", { enum: ["website", "referral", "social", "manual", "other"] }).default("website"),
  status: text("status", { enum: ["new", "contacted", "proposal", "won", "lost"] }).default("new"),
  notes: text("notes"),
  assignedTo: text("assigned_to").references(() => users.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const clients = sqliteTable("clients", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  address: text("address"),
  gst: text("gst"),
  notes: text("notes"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const followUps = sqliteTable("follow_ups", {
  id: text("id").primaryKey(),
  leadId: text("lead_id").references(() => leads.id, { onDelete: "cascade" }),
  clientId: text("client_id").references(() => clients.id, { onDelete: "cascade" }),
  note: text("note").notNull(),
  dueDate: text("due_date"),
  done: integer("done", { mode: "boolean" }).default(false),
  createdBy: text("created_by").references(() => users.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// ─── ERP — PROJECTS ──────────────────────────────────────────────────────────

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  clientId: text("client_id").references(() => clients.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["planning", "active", "on_hold", "completed", "cancelled"] }).default("planning"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  budget: integer("budget"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["todo", "in_progress", "review", "done"] }).default("todo"),
  priority: text("priority", { enum: ["low", "medium", "high"] }).default("medium"),
  assignedTo: text("assigned_to").references(() => users.id),
  dueDate: text("due_date"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// ─── ERP — FINANCE ───────────────────────────────────────────────────────────

export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  clientId: text("client_id").references(() => clients.id),
  projectId: text("project_id").references(() => projects.id),
  status: text("status", { enum: ["draft", "sent", "paid", "overdue", "cancelled"] }).default("draft"),
  subtotal: integer("subtotal").default(0),
  gstPercent: integer("gst_percent").default(18),
  total: integer("total").default(0),
  dueDate: text("due_date"),
  paidAt: text("paid_at"),
  notes: text("notes"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const invoiceItems = sqliteTable("invoice_items", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  quantity: integer("quantity").default(1),
  rate: integer("rate").default(0),
  amount: integer("amount").default(0),
});

export const expenses = sqliteTable("expenses", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  amount: integer("amount").notNull(),
  category: text("category"),
  projectId: text("project_id").references(() => projects.id),
  date: text("date"),
  createdBy: text("created_by").references(() => users.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// ─── SUPPORT TICKETS ─────────────────────────────────────────────────────────

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  clientId: text("client_id").references(() => clients.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["open", "in_progress", "resolved", "closed"] }).default("open"),
  priority: text("priority", { enum: ["low", "medium", "high", "urgent"] }).default("medium"),
  assignedTo: text("assigned_to").references(() => users.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const ticketMessages = sqliteTable("ticket_messages", {
  id: text("id").primaryKey(),
  ticketId: text("ticket_id").notNull().references(() => tickets.id, { onDelete: "cascade" }),
  senderId: text("sender_id").references(() => users.id),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// ─── CMS ─────────────────────────────────────────────────────────────────────

export const pages = sqliteTable("pages", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content"),
  metaTitle: text("meta_title"),
  metaDesc: text("meta_desc"),
  status: text("status", { enum: ["draft", "published"] }).default("draft"),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  coverImage: text("cover_image"),
  status: text("status", { enum: ["draft", "published"] }).default("draft"),
  authorId: text("author_id").references(() => users.id),
  publishedAt: text("published_at"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  type: text("type"),
  size: integer("size"),
  uploadedBy: text("uploaded_by").references(() => users.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// ─── WEBSITE ─────────────────────────────────────────────────────────────────

export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"),
  order: integer("order").default(0),
  active: integer("active", { mode: "boolean" }).default(true),
});

export const portfolio = sqliteTable("portfolio", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  tags: text("tags"),
  url: text("url"),
  order: integer("order").default(0),
});

export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  rating: integer("rating").default(5),
  active: integer("active", { mode: "boolean" }).default(true),
});

export const subsidiaries = sqliteTable("subsidiaries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline"),
  description: text("description"),
  logo: text("logo"),
  sector: text("sector"),
  url: text("url"),
  active: integer("active", { mode: "boolean" }).default(true),
});

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value"),
});
