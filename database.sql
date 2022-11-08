-- *** Create a database named "levelrie" ***
-- *** Insert the following tables into the database (in order) ***
-- *** After successful table creation, run the SQL queries ***


CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (100) NOT NULL,
    "last_name" VARCHAR (100) NOT NULL,
    "email" VARCHAR (100) UNIQUE NOT NULL
);

CREATE TABLE "admins" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "clearance" INT DEFAULT (1) NOT NULL
);

CREATE TABLE "outfits" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL,
    "description" VARCHAR (500) NOT NULL
);

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL
);

CREATE TABLE "items" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "color" VARCHAR (80) NOT NULL,
    "size" VARCHAR (80) NOT NULL,
    "seller" VARCHAR (80) NOT NULL,
    "price" MONEY NOT NULL,
    "img" VARCHAR (1000) NOT NULL,
    "category_id" INT REFERENCES "categories"
);

CREATE TABLE "outfit_items" (
    "id" SERIAL PRIMARY KEY,
    "outfit_id" INT REFERENCES "outfits",
    "item_id" INT REFERENCES "items"
);


CREATE TABLE "addresses" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "street_address" VARCHAR (255) NOT NULL,
    "city" VARCHAR (255) NOT NULL,
    "state" VARCHAR (255) NOT NULL,
    "zip" VARCHAR (16) NOT NULL,
    "preferred" BOOLEAN NOT NULL
);

-- *** NOTE: DO NOT ENTER REAL CREDIT CARD INFORMATION IN THIS BUILD *** 
-- *** CURRENT BUILD DOES NOT ENCRYPT CARD NUMBERS ***
CREATE TABLE "payment_info" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "first_name" VARCHAR (100) NOT NULL,
    "last_name" VARCHAR (100) NOT NULL,
    "card_type" VARCHAR (255) NOT NULL,
    "card_number" VARCHAR (16) NOT NULL,
    "card_exp_date" VARCHAR (255) NOT NULL,
    "card_sec_code" VARCHAR (3) NOT NULL,
    "billing_address_id" INT REFERENCES "addresses",
    "preferred" BOOLEAN NOT NULL
);

CREATE TABLE "carts" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "item_id" INT REFERENCES "items"
);

CREATE TABLE "closet_items" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "item_id" INT REFERENCES "items"
);

CREATE TABLE "closet_outfits" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "outfit_id" INT REFERENCES "outfits"
);

CREATE TABLE "favorited_outfits" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "outfit_id" INT REFERENCES "outfits"
);

CREATE TABLE "favorited_items" (
    "id" SERIAL PRIMARY KEY,
    "favorited_outfit_id" INT REFERENCES "favorited_outfits",
    "item_id" INT REFERENCES "items"   
);

CREATE TABLE "rejections" (
    "id" SERIAL PRIMARY KEY,  
    "user_id" INT REFERENCES "users",
    "outfit_id" INT REFERENCES "outfits"
);

INSERT INTO "categories"
    ("name")
        VALUES 
            ('top'),
            ('bottom'),
            ('footwear'),
            ('dress'),
            ('hat'),
            ('outerwear'),
            ('accessories');