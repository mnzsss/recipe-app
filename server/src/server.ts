import app from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server ready at ${process.env.APP_URL}`);
});
