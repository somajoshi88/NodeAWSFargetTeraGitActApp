const express = require('express');

const app = express();

app.get('/', function (req, res){
    res.send(`
  <h1>Hello World!</h1>
  <p>This "Hello world!" is powered by Terraform AWS Modules!</p>
  <p>The ISO datetime right now is ${new Date().toISOString()}.</p>
  
 `);
});

//app.listen(3002);
const PORT = 80;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
