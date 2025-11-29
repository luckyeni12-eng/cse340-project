/********************************************
 * Primary server file for the CSE Motors app
 ********************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const app = express()

// Static routes
const static = require("./routes/static")

// Session and Database
const session = require("express-session")
const pool = require("./database/")

// Flash Messages
const flash = require("connect-flash")

/* ***********************
 * Middleware
 *************************/

// Sessions
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false, // better practice
    saveUninitialized: false,
    name: "sessionId",
    cookie: { secure: false }, // MUST stay false in development
  })
)

// Flash middleware
app.use(flash())

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Static Files
 *************************/
app.use(express.static("public"))

/* ***********************
 * Routes
 *************************/
app.use(static)

// Home Route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 5500
const host = process.env.HOST || "localhost"

/* ***********************
 * Confirm Server Running
 *************************/
app.listen(port, () => {
  console.log(`App listening on http://${host}:${port}`)
})