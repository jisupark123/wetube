import mongoose from 'mongoose';
const isHeroku = process.env.NODE_ENV === 'production';

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.log('DB Error', error));
db.once('open', () => console.log('Connected to DB'));
