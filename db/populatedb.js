const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS products ( 
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL
  );

CREATE TABLE IF NOT EXISTS categories ( 
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  name VARCHAR (255) NOT NULL 
  );

CREATE TABLE IF NOT EXISTS inventory (
  product_id INTEGER NOT NULL,
  category_id INTEGER DEFAULT 0,
  stock INTEGER,
  price NUMERIC CONSTRAINT positive_price CHECK (price > 0),
  CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET DEFAULT (category_id)
); 

INSERT INTO products (name) VALUES
  ('Nike AirMax Dn8'),
  ('Nike Calm'),
  ('Zion 4 PF ''SHARONDA'''),
  ('Nike Zoom GP Challenge 1'),
  ('Nike Dri-FIT Club'),
  ('Nike ACG ''DAYMAX''') ;

INSERT INTO categories (name) VALUES
  ('Men''s shoes'),
  ('Men''s slides'),
  ('Basketball shoes'),
  ('Women''s Hard Court Tennis Shoes'),
  ('Unstructured Metal Swoosh Cap'),
  ('Duffel Bag (60L)');

INSERT INTO inventory VALUES
  (1, 1, 1, 196.27),
  (2, 2, 2, 46.75),
  (3, 3, -1, 145.83),
  (4, 4, 1, 151.23),
  (5, 5, 2, 18.83),
  (6, 6, 1, 126.01);
`;

console.log(argv[2]);

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: `postgresql://jmpi:${argv[2]}@localhost:5432/inventory_app_tod`,
  });

  try {
    await client.connect();
    await client.query(SQL);
    await client.end();
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

main()
  .then((response) => console.log(response))
  .catch((reason) => console.log(reason));
