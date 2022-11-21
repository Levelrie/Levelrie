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
    "isAdmin" BOOLEAN DEFAULT (FALSE) NOT NULL
);

CREATE TABLE "occasions" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL
);

CREATE TABLE "outfits" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL,
    "description" VARCHAR (500) NOT NULL,
    "occasion_id" INT REFERENCES "occasions"
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
    "nickname" VARCHAR(255) NOT NULL,
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


CREATE TABLE "favorited_solo" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "item_id" INT REFERENCES "items"
);


CREATE TABLE "rejections" (
    "id" SERIAL PRIMARY KEY,  
    "user_id" INT REFERENCES "users",
    "outfit_id" INT REFERENCES "outfits"
);

CREATE TABLE "orders"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"addresses_id" INT REFERENCES "addresses",
	"inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now()		
);

CREATE TABLE "order_items"(
	"id" SERIAL PRIMARY KEY,
	"order_id" INT REFERENCES "orders",
	"item_id" INT REFERENCES "items"
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
            ('accessories'),
            ('hats');
            

INSERT INTO "occasions"
    ("name")
        VALUES 
            ('Brunch'),
            ('Date Night'),
            ('Airport'),
            ('Work'),
            ('Casual'),
            ('Formal');           

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
	("name", "description", "occasion_id")
		VALUES
		('All business', 'For closing that deal', 4), --work
			('Rebel with a cause', 'For taking names', 1), -- brunch
			('On the go', 'For travel', 3), -- airport
			('Casual vibes', 'For running errands', 5), -- casual
			('Love is in the air', 'For a hot date', 2), -- date night
			('Bruncheon', 'For brunching with the squad', 1), -- brunch
			('Boss babe', 'Presentation confidence', 4); -- work

INSERT INTO "items"
	("name", "color", "size", "seller", "price", "img", "category_id")
		VALUES
            ('Tank', 'Black', 'XXS', 'Anine Bing', '$105', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png', 1),
            ('Tank', 'Black', 'S', 'Anine Bing', '$105', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png', 1),
            ('Tank', 'Black', 'XL', 'Anine Bing', '$105', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png', 1),
            ('Tank', 'White', 'XXS', 'Anine Bing', '$105', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png', 1),
            ('Tank', 'Purple', 'XXS', 'Anine Bing', '$105', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png', 1),
            ('Tank', 'Beige', 'XXS', 'Anine Bing', '$105', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png', 1),
            ('Cream Knit', 'Cream', 'S', 'J. Crew', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588875/Tops/image-18_pteshe.png', 1), 
            ('Cream Knit', 'Cream', 'M', 'J. Crew', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588875/Tops/image-18_pteshe.png', 1), 
            ('Cream Knit', 'Cream', 'L', 'J. Crew', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588875/Tops/image-18_pteshe.png', 1),   
            ('Cream Knit', 'Cream', 'XL', 'J. Crew', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588875/Tops/image-18_pteshe.png', 1),     
            ('Knit Cardigan', 'Grey', 'S', 'All Saints', '$400', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588872/Tops/image-17_qjmpyj.png', 6),
            ('Knit Cardigan', 'Grey', 'M', 'All Saints', '$400', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588872/Tops/image-17_qjmpyj.png', 6),
            ('Knit Cardigan', 'Grey', 'L', 'All Saints', '$400', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588872/Tops/image-17_qjmpyj.png', 6),
            ('Knit Cardigan', 'Black', 'S', 'All Saints', '$400', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588872/Tops/image-17_qjmpyj.png', 6),
            ('Tweed Blazer', 'Multi', 'XL', 'ASTR', '$425', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588869/Tops/image-16_cwched.png', 6),
            ('Tweed Blazer', 'Multi', 'L', 'ASTR', '$425', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588869/Tops/image-16_cwched.png', 6),
            ('AMO T-Shirt', 'Black', 'XS', 'AMO', '$99', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588717/Tops/image-13_xxvwl6.png', 1),
            ('AMO T-Shirt', 'White', 'XS', 'AMO', '$99', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588717/Tops/image-13_xxvwl6.png', 1),
            ('Cami', 'Beige', 'S', 'Chloe', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588712/Tops/image-8_pr0uxw.png', 1),
            ('Cami', 'Beige', 'M', 'Chloe', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588712/Tops/image-8_pr0uxw.png', 1),
            ('Cami', 'Beige', 'L', 'Chloe', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588712/Tops/image-8_pr0uxw.png', 1),
            ('Cami', 'White', 'M', 'Reformation', '$112', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588675/Tops/image_2_hvas2i.png', 1),
            ('Cami', 'White', 'L', 'Reformation', '$112', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588675/Tops/image_2_hvas2i.png', 1),
            ('Cami', 'White', 'XL', 'Reformation', '$112', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588675/Tops/image_2_hvas2i.png', 1),
            ('Black Velvet Blazer', 'Black', 'XS', 'Eileen Fisher', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588708/Tops/image-7_ayhpmj.png', 6),
            ('Black Velvet Blazer', 'Black', 'S', 'Eileen Fisher', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588708/Tops/image-7_ayhpmj.png', 6),
            ('Black Velvet Blazer', 'Black', 'M', 'Eileen Fisher', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588708/Tops/image-7_ayhpmj.png', 6),
            ('Black Velvet Blazer', 'Black', 'XXL', 'Eileen Fisher', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588708/Tops/image-7_ayhpmj.png', 6),
            ('Santorelli Floral Blazer', 'Multi', 'S', 'Santorelli', '$695', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588703/Tops/image-5_qsbtes.png', 6),
            ('Santorelli Floral Blazer', 'Multi', 'M', 'Santorelli', '$695', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588703/Tops/image-5_qsbtes.png', 6),
            ('Santorelli Floral Blazer', 'Multi', 'L', 'Santorelli', '$695', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588703/Tops/image-5_qsbtes.png', 6),
            ('Santorelli Floral Blazer', 'Multi', 'XL', 'Santorelli', '$695', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588703/Tops/image-5_qsbtes.png', 6),
            ('Beige Blazer', 'Beige', 'M', 'Elie Tahari', '$395', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588688/Tops/image-2_aswyer.png', 6),
            ('Beige Blazer', 'Beige', 'L', 'Elie Tahari', '$395', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588688/Tops/image-2_aswyer.png', 6),
            ('Beige Blazer', 'Beige', 'XL', 'Elie Tahari', '$395', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588688/Tops/image-2_aswyer.png', 6),
            ('Black Crepe Cropped Blazer', 'Black', 'L', 'Misook', '$298', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588682/Tops/image-1_lgeqqg.png', 6),
            ('Citizen Maroon Pants', 'Maroon', 'M', 'Citizen', '$250', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588845/Bottoms/image-23_f0vnry.png', 2),
            ('All Saints Skirt', 'Grey', 'S', 'All Saints', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588854/Bottoms/image-15_w9c9er.png', 2),
            ('All Saints Skirt', 'Grey', 'M', 'All Saints', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588854/Bottoms/image-15_w9c9er.png', 2),
            ('Black Slouchy Pants', 'Black', 'S', 'All Saints', '$140', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588843/Bottoms/image-21_ddcuvx.png', 2),
            ('Frame Grey Jeans', 'Grey', '30', 'Frame', '$225', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588838/Bottoms/Gerey_Jeans_y9shnv.png', 2),
            ('Frame Grey Jeans', 'Grey', '32', 'Frame', '$225', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588838/Bottoms/Gerey_Jeans_y9shnv.png', 2),
            ('Black Joggers', 'Black', 'XL', 'Burberry', '$220', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588778/Bottoms/image-12_g1eysn.png ', 2),
            ('Grey Skinny Jeans', 'Grey', 'M', 'Frame', '$145', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588775/Bottoms/image-10_bcbjoa.png', 2),
            ('Frame Skinny Jeans', 'Black', '26', 'Frame', '$245', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588771/Bottoms/image-4_jwjznw.png', 2),
            ('Frame Skinny Jeans', 'White', '26', 'Frame', '$245', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588771/Bottoms/image-4_jwjznw.png', 2),
            ('Frame Skinny Jeans', 'Fuschia', '26', 'Frame', '$245', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588771/Bottoms/image-4_jwjznw.png', 2),
            ('Light Wash Jeans', 'Blue', '29', 'Mother', '$330', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588766/Bottoms/image-3_hbxgxk.png', 2),
            ('Light Wash Jeans', 'Blue', '31', 'Mother', '$330', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588766/Bottoms/image-3_hbxgxk.png', 2),
            ('Light Wash Jeans', 'Blue', '40', 'Mother', '$330', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588766/Bottoms/image-3_hbxgxk.png', 2),
            ('Maroon Knee Boots', 'Maroon', '7', 'Burberry', '$995', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588822/Shoes/image-26_h4o0eq.png', 3),
            ('Maroon Knee Boots', 'Maroon', '9', 'Burberry', '$995', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588822/Shoes/image-26_h4o0eq.png', 3),
            ('Maroon Knee Boots', 'Maroon', '11', 'Burberry', '$995', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588822/Shoes/image-26_h4o0eq.png', 3),
            ('Maroon Knee Boots', 'Maroon', '14', 'Burberry', '$995', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588822/Shoes/image-26_h4o0eq.png', 3),
            ('24 Nike Shoes', 'White', '9', 'Nike', '$200', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588818/Shoes/image-24_ttng3y.png', 3),
            ('24 Nike Shoes', 'White', '11', 'Nike', '$200', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588818/Shoes/image-24_ttng3y.png', 3),
            ('24 Nike Shoes', 'White', '14', 'Nike', '$200', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588818/Shoes/image-24_ttng3y.png', 3),
            ('Black Combat Boots', 'Black', '37', 'Stuart Weitzman', '$695', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588809/Shoes/image-11_ckdpd9.png', 3),
            ('White Sneakers', 'White', '8', 'Frye', '$235', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588805/Shoes/image-9_owcyab.png', 3),
            ('White Sneakers', 'White', '12', 'Frye', '$235', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588805/Shoes/image-9_owcyab.png', 3),
            ('Black High Heel Pumps', 'Black', '6', 'Stuart Weitzman', '$395', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588802/Shoes/image-6_yvpzza.png', 3),
            ('Black Belt (Double Buckle)', 'Black', 'L', 'Balenciaga', '$300', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588907/Accessories/image-14_fykoe1.png', 7),
            ('Revolve Belt', 'Brown', 'S', 'Revolve', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588911/Accessories/image-25_bgpqqa.png', 7),
            ('Revolve Belt', 'Brown', 'L', 'Revolve', '$150', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588911/Accessories/image-25_bgpqqa.png', 7),
            ('Mango Belt', 'Black', 'L', 'Mango', '$75', 'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588905/Accessories/Belt_unblhk.png', 7);



INSERT INTO "outfit_items"
	("outfit_id", "item_id")
		VALUES
			(1, 30), -- floral blazer
            (1, 23), -- cami
            (1, 45), -- frame skinny jeans
            (1, 61), -- pumps
            (1, 65), -- mango belt
            (2, 36), -- cropped blazer
            (2, 58), -- combat boots
            (2, 20), -- cami
            (2, 37), -- maroon pants
            (2, 62), -- double buckle belt
            (3, 12), -- cardi
            (3, 17), -- black t-shirt
            (3, 43), -- jogger pants
            (3, 56), -- nike sneaks
            (4, 14), -- cardi
            (4, 21), -- cami
            (4, 49), -- light wash jeans
            (4, 60), -- white sneaks
            (4, 64), -- revolve belt
            (5, 26), -- velvet blazer
            (5, 21), -- beige cami
            (5, 61), -- pumps
            (5, 65), -- mango belt
            (5, 45), -- frame skinny jeans
            (6, 15), -- tweed blazer
            (6, 10), -- cream knit
            (6, 41), -- jeans
            (6, 61), -- pumps
            (6, 65), -- mango belt   
            (7, 34), -- beige blazer
            (7, 3), -- tank
            (7, 40), -- slouchy pants
            (7, 61), -- pumps
            (7, 62); -- double buckle belt

INSERT INTO "closet_outfits"
 	    ("user_id", "outfit_id")
 		VALUES
 		(6, 5);

INSERT INTO "addresses"
 	("user_id", "nickname", "street_address", "city", "state", "zip", "preferred")
 	VALUES
 	(6, 'Home', '301 Fourth Ave S', 'Minneapolis', 'MN', '55415', true);