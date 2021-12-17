import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import videoRouter from './routers/videoRouter';
import userRouter from './routers/userRouter';
import { localsMiddleware } from './middlewares';
import apiRouter from './routers/apiRouter';
const app = express();
const isHeroku = process.env.NODE_ENV === 'production';

const logger = morgan('dev');
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COKKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(localsMiddleware);
app.use('/', rootRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);
app.use('/api', apiRouter);
app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));

export default app;
