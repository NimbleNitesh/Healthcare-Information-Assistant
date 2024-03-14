import express from 'express';
const app = express()

app.use(middlewareThree)
app.use(middlewareOne)

app.get("/", middlewareTwo, middlewareFour, (req, res) => {
  console.log("Inside Home Page")
  res.send("Home Page")
})

function middlewareOne(req, res, next) {
  console.log("Middleware One")
  if(0){
    next()
  }
  res.send("jaat")
}

function middlewareTwo(req, res, next) {
  console.log("Middleware Two")
  next()
}

function middlewareThree(req, res, next) {
  console.log("Middleware Three")
  next()
}

function middlewareFour(req, res, next) {
  console.log("Middleware Four")
  next()
}

app.listen(3000, () => console.log("Server Started"))