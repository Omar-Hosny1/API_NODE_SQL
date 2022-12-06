const express = require("express");
const app = express();

const PORT = 8080;
const mysql = require("mysql2");
app.use(express.json());

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "products",
// });

const connection = mysql.createConnection({
  uri: "mysql://root@localhost:3306/products",
});

// connection
//   .promise()
//   .execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(PORT, () =>
  console.log(`it's Ready Now on http://localhost:${PORT}`)
);

// GET
app.get("/tshirt", (req, res) => {
  const connection = mysql.createConnection({
    uri: "mysql://root@localhost:3306/products",
  });
  connection
    .promise()
    .execute("SELECT * FROM products") // 500
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  res.status(200).send({
    data: "Hello",
  });
});

// POST
app.post("/add/tshirt", (req, res) => {
  const connection = mysql.createConnection({
    uri: "mysql://root@localhost:3306/products",
  });
  const { id, title, price, description, imageUrl } = req.body;

  connection
    .promise()
    .execute(
      `INSERT INTO products VALUES(${id}, "${title}", ${price}, "${description}", "${imageUrl}");`
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// UPDATE
app.patch("/tshirt/update/:id", (req, res) => {
  const connection = mysql.createConnection({
    uri: "mysql://root@localhost:3306/products",
  });
  const { id } = req.params;
  const { price } = req.body;
  let ProductData = connection
    .promise()
    .execute(`SELECT * FROM products WHERE id = ${id}`)
    .then((result) => {
      ProductData = result[0][0];
      console.log(ProductData.id);
    })
    .catch((err) => console.log(err));

  connection
    .promise()
    .execute(
      `UPDATE products
  SET price = ${price} WHERE id = ${id};`
    )
    .then()
    .catch((err) => console.log(err));
  res.send({ msg: "SUCC" });
});

// DELETE
app.delete("/tshirt/delete/:id", (req, res) => {
  const connection = mysql.createConnection({
    uri: "mysql://root@localhost:3306/products",
  });
  const { id } = req.params;
  connection
    .promise()
    .execute(`DELETE FROM products WHERE id = ${id};`)
    .then()
    .catch((err) => {
      console.log(err);
    });
});
