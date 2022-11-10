-- *** Create a database named "levelrie" ***
-- *** Insert the following tables into the database (in order) ***
-- *** After successful table creation, run the SQL queries ***


CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (100) NOT NULL,
    "last_name" VARCHAR (100) NOT NULL,
    "email" VARCHAR (100) UNIQUE NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE NOT NULL
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




            -- ****************** TEST DATA BELOW *********************
INSERT INTO "users"
	("username", "password", "first_name", "last_name", "email")
		VALUES
            ('Maggie', '123', 'Maggie', 'Whitlock', 'maggie.whitlock@gmail.com'),
			('Theo', '123', 'Theo', 'Janke-Furman', 'tjankefurman@gmail.com'),
			('Chameng', '123', 'Chameng', 'Vang', 'Chameng02@gmail.com'),
            ('Hess', '123', 'Hess', 'Hess', 'ryanmhess@gmail.com'),
            ('Kyle', '123', 'Kyle', 'Jensen', 'kjensen19@gmail.com');

INSERT INTO "outfits"
	("name", "description")
		VALUES
			('All business', 'For closing that deal'),
			('Something more comfortable', 'For staying in'),
			('Business and Pleasure', 'For going out'),
			('Casual Vibes', 'For running errands');

INSERT INTO "items"
	("name", "color", "size", "seller", "price", "img", "category_id")
		VALUES
            ('Black Tank', 'Black', 'XXS', 'Anine Bing', '$105', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png', 1),
            ('Cream Knit', 'Cream', 'M', 'J. Crew', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588875/Tops/image-18_pteshe.png', 1),
            ('Grey Knit Cardigan', 'Grey', 'S', 'All Saints', '$400', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588872/Tops/image-17_qjmpyj.png', 1),
            ('Tweed Blazer', 'Multi', 'L', 'ASTR', '$425', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588869/Tops/image-16_cwched.png', 1),
            ('Black T-Shirt', 'Black', 'XS', 'AMO', '$99', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588717/Tops/image-13_xxvwl6.png', 1),
            ('Beige Cami', 'Beige', 'S', 'Chloe', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588712/Tops/image-8_pr0uxw.png', 1),
            ('Black Velvet Blazer', 'Black', 'XS', 'Eileen Fisher', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588708/Tops/image-7_ayhpmj.png', 1),
            ('Floral Blazer', 'Multi', 'S', 'Santorelli', '$695', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588703/Tops/image-5_qsbtes.png', 1),
            ('Beige Blazer', 'Beige', 'XL', 'Elie Tahari', '$395', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588688/Tops/image-2_aswyer.png', 1),
            ('White Cami', 'White', 'XL', 'Reformation', '$112', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588675/Tops/image_2_hvas2i.png', 1),
            ('Black Crepe Cropped Blazer', 'Black', 'L', 'Misook', '$298', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588682/Tops/image-1_lgeqqg.png', 1),
            ('Maroon Pants', 'Maroon', 'M', 'Citizen', '$250', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588845/Bottoms/image-23_f0vnry.png', 2),
            ('Grey Skirt', 'Grey', 'S', 'All Saints', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588854/Bottoms/image-15_w9c9er.png', 2),
            ('Black Slouchy Pants', 'Black', 'S', 'All Saints', '$140', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588843/Bottoms/image-21_ddcuvx.png', 2),
            ('Grey Jeans', 'Grey', '30', 'Frame', '$225', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588838/Bottoms/Gerey_Jeans_y9shnv.png', 2),
            ('Black Joggers', 'Black', 'XL', 'Burberry', '$220', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588778/Bottoms/image-12_g1eysn.png ', 2),
            ('Grey Skinny Jeans', 'Grey', 'M', 'Frame', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588775/Bottoms/image-10_bcbjoa.png', 2),
            ('Black Skinny Jeans', 'Black', '26', 'Frame', '$245', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588771/Bottoms/image-4_jwjznw.png', 2),
            ('Light Wash Jeans', 'Blue', '29', 'Mother', '$330', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588766/Bottoms/image-3_hbxgxk.png', 2),
            ('Maroon Knee Boots', 'Maroon', '7', 'Burberry', '$995', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588822/Shoes/image-26_h4o0eq.png', 3),
            ('24 Nike Shoes', 'White', '9', 'Nike', '$200', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588818/Shoes/image-24_ttng3y.png', 3),
            ('Black Combat Boots', 'Black', '37', 'Stuart Weitzman', '$695', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588809/Shoes/image-11_ckdpd9.png', 3),
            ('White Sneakers', 'White', '8', 'Frye', '$235', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588805/Shoes/image-9_owcyab.png', 3),
            ('Black High Heel Pumps', 'Black', '6', 'Stuart Weitzman', '$395', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588802/Shoes/image-6_yvpzza.png', 3),
            ('Black Belt (Double Buckle)', 'Black', 'L', 'Balenciaga', '$300', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588907/Accessories/image-14_fykoe1.png', 7),
            ('Brown Belt', 'Brown', 'S', 'Revolve', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588911/Accessories/image-25_bgpqqa.png', 7),
            ('Black Belt', 'Black', 'L', 'Mango', '$75', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588905/Accessories/Belt_unblhk.png', 7);



INSERT INTO "outfit_items"
	("outfit_id", "item_id")
		VALUES
			(1, 1),
			(1, 8),
			(1, 18),
			(1, 24),
			(2, 2),
			(2, 4),
			(2, 19),
			(2, 23),
			(3, 6),
			(3, 13),
			(3, 20),
			(4, 10),
			(4, 11),
			(4, 16),
			(4, 21);