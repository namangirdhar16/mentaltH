const express = require('express');

const app = express();

app.listen(process.env.port || 3000, ()=>{
    console.log('server is up and running on port 3000');
})