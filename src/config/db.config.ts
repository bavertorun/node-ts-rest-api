const { connect } = require('mongoose');
const { env } = require("./env.config");

export const dbConnection = () =>{
  connect(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connected Successful');
  })
  .catch((err: Error) => {
    console.error('Database Connection Error:', err);
  });
}


