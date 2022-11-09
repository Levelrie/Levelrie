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
    "password" VARCHAR (1000) NOT NULL
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



            -- ****************** TEST DATA BELOW *********************
INSERT INTO "users"
	("username", "password", "first_name", "last_name", "email")
		VALUES
            ('Maggie', '123', 'Maggie', 'Whitlock', 'maggie.whitlock@gmail.com')
			('Theo', '123', 'Theo', 'Janke-Furman', 'tjankefurman@gmail.com'),
			('Chameng', '123', 'Chameng', 'Vang', 'Chameng02@gmail.com'),
            ('Hess', '123', 'Hess', 'Hess', 'ryanmhess@gmail.com'),
            ('Kyle', '123', 'Kyle', 'Jensen', 'kjensen19@gmail.com');

INSERT INTO "outfits"
	("name", "description")
		VALUES
			('Cocktail attire', 'For going out'),
			('Something more comfortable', 'For staying in'),
			('Beach ensemble', 'Splish splash')
			('Dog outfit', 'Woof');
			

INSERT INTO "favorited_outfits"
	("user_id", "outfit_id")
		VALUES
			(1, 3),
			(1, 4), 
			(2, 3),
			(3, 1);


INSERT INTO "items"
	("name", "color", "size", "seller", "price", "img", "category_id")
		VALUES
			('Maroon Pants', 'Maroon', 'L', 'Citizen', '$250', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588845/Bottoms/image-23_f0vnry.png', 2),
			('Black Belt (Double Buckle)', 'Black', 'M', 'Balenciaga', '$300', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588911/Accessories/image-25_bgpqqa.png', 7),
            ('Grey Skirt', 'Grey', 'XS', 'All Saints', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588854/Bottoms/image-15_w9c9er.png', 2),
            ('Black Tank', 'Black', 'XXS', 'Anine Bing', '$105', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png', 1);


INSERT INTO "favorited_items"
	("user_id", "outfit_id")
		VALUES
			(1, 3),
			(1, 4), 
			(2, 2),
			(3, 1);