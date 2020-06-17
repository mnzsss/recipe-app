import app from './app';

app.listen(3333, () => {
  console.log(`🚀 Server ready at ${process.env.APP_URL}`);
});
