import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';

import indexRoutes from './routes/index.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import reviewRoute from './routes/reviewRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ===========================
// View Engine Setup
// ===========================
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// ===========================
// Middleware
// ===========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ===========================
// Routes
// ===========================
app.use('/', indexRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/review', reviewRoute);

// Inventory route to dynamically load images
app.get('/inventory-images', (req, res) => {
    const imageFolder = path.join(__dirname, 'public/images/vehicles');
    let images = [];
    try {
        images = fs.readdirSync(imageFolder)
            .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
            .map(file => '/images/vehicles/' + file);
    } catch (err) {
        console.error('Error reading image folder:', err);
    }
    res.render('inventory', { images });
});

// ===========================
// 404 Handler
// ===========================
app.use((req, res) => {
    res.status(404).render('errors/error', { message: 'Page Not Found', status: 404 });
});

// ===========================
// Error Handler
// ===========================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('errors/error', {
        message: err.message || 'Internal Server Error',
        status: err.status || 500
    });
});

// ===========================
// Start Server
// ===========================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});