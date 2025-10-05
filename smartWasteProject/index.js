
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');


const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'waste-data.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
// express.json() is not needed for form-data; remove to avoid confusion
// Move static after body parsing
app.use(express.static(path.join(__dirname, 'public')));

// Load or initialize waste records
defaultWaste = [];
if (fs.existsSync(DATA_FILE)) {
  try {
    defaultWaste = JSON.parse(fs.readFileSync(DATA_FILE));
  } catch {
    defaultWaste = [];
  }
}
let wasteRecords = defaultWaste;

function saveWaste() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(wasteRecords, null, 2));
}


app.get('/', (req, res) => {
  res.render('index', { wasteRecords });
});


app.post('/add', upload.single('photo'), (req, res) => {
  // Defensive: ensure req.body is always defined
  const body = req.body || {};
  const { type, amount, name, location, email, phone, status } = body;
  let photo = req.file ? '/uploads/' + req.file.filename : null;
  if (type && amount && name && location && email && phone && status) {
    wasteRecords.push({
      type,
      amount: Number(amount),
      name,
      location,
      email,
      phone,
      status,
      photo
    });
    saveWaste();
  } else {
    console.warn('Missing fields in /add:', body);
  }
  res.redirect('/');
});

app.post('/delete/:idx', (req, res) => {
  const idx = parseInt(req.params.idx);
  if (!isNaN(idx)) {
    wasteRecords.splice(idx, 1);
    saveWaste();
  }
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Smart Waste Tracking app running at http://localhost:${PORT}`);
});
