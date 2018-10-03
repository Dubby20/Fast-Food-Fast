DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS food_menu CASCADE;

CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  phone_number VARCHAR NULL,
  address TEXT NULL,
  is_admin BOOLEAN NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE orders(
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL,
  food_tray_id INTEGER NOT NULL,
  address TEXT NOT NULL,
  phone_number VARCHAR NULL,
  food_items JSONB NOT NULL,
  status VARCHAR NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE
  -- FOREIGN KEY( food_tray_id ) REFERENCES food_tray( id ) ON DELETE CASCADE
);

CREATE TABLE food_menu(
  id serial PRIMARY KEY,
  food_name VARCHAR NOT NULL,
  food_image VARCHAR NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- CREATE TABLE food_tray(
--   id serial PRIMARY KEY,
--   order_id INTEGER NOT NULL,
--   food_id INTEGER NOT NULL,
--   quantity INTEGER NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
--   FOREIGN KEY( order_id ) REFERENCES orders( id ) ON DELETE CASCADE,
--   FOREIGN KEY( food_id ) REFERENCES food_menu( id ) ON DELETE CASCADE,
-- );
