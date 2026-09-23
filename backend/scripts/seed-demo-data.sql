-- Sellway demo data: wipes every table and loads a clean, consistent catalog.
-- 3 departments / 26 categories, 4 sellers, 68 products (4 per leaf category, matching Unsplash photos),
-- 1 admin + 3 customers, and the "Deals this week" rows.
--
-- Login is OTP-based: request a code on the login page, then read it from the
-- verification_code table (demo accounts use @example.com, which receives no mail).
-- Sellers log in with the "seller_" prefix handled by the backend.
--
-- Usage (from backend/): mysql -u<user> -p <database> < scripts/seed-demo-data.sql
-- Product created_at values are relative to load time, so the newest items span every department.

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `address`;
TRUNCATE TABLE `cart`;
TRUNCATE TABLE `cart_item`;
TRUNCATE TABLE `category`;
TRUNCATE TABLE `coupon`;
TRUNCATE TABLE `deal`;
TRUNCATE TABLE `home_category`;
TRUNCATE TABLE `order_item`;
TRUNCATE TABLE `orders`;
TRUNCATE TABLE `payment_order`;
TRUNCATE TABLE `payment_order_orders`;
TRUNCATE TABLE `product`;
TRUNCATE TABLE `product_images`;
TRUNCATE TABLE `review`;
TRUNCATE TABLE `review_product_items`;
TRUNCATE TABLE `seller`;
TRUNCATE TABLE `seller_report`;
TRUNCATE TABLE `transaction`;
TRUNCATE TABLE `user`;
TRUNCATE TABLE `user_addresses`;
TRUNCATE TABLE `user_used_coupons`;
TRUNCATE TABLE `verification_code`;
TRUNCATE TABLE `wishlist`;
TRUNCATE TABLE `wishlist_products`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO category (id, category_id, name, level, parent_category_id) VALUES
  (1, 'clothing', 'Clothing & accessories', 1, NULL),
  (2, 'electronics', 'Electronics', 1, NULL),
  (3, 'home_goods', 'Furniture & Decor', 1, NULL),
  (4, 'men', 'Men', 2, 1),
  (5, 'women', 'Women', 2, 1),
  (6, 'smartphones_gadgets', 'Smartphones & gadgets', 2, 2),
  (7, 'computers', 'Computers', 2, 2),
  (8, 'furniture', 'Furniture', 2, 3),
  (9, 'decor_lighting', 'Decor & lighting', 2, 3),
  (10, 'men_t_shirts', 'T-Shirts', 3, 4),
  (11, 'men_shirts', 'Shirts', 3, 4),
  (12, 'men_jeans', 'Jeans', 3, 4),
  (13, 'men_footwear', 'Footwear', 3, 4),
  (14, 'women_dresses', 'Dresses', 3, 5),
  (15, 'women_blouses', 'Blouses', 3, 5),
  (16, 'women_footwear', 'Footwear', 3, 5),
  (17, 'women_bags', 'Bags', 3, 5),
  (18, 'smartphones', 'Smartphones', 3, 6),
  (19, 'smartwatches', 'Smartwatches', 3, 6),
  (20, 'headphones', 'Headphones', 3, 6),
  (21, 'laptops', 'Laptops', 3, 7),
  (22, 'monitors', 'Monitors', 3, 7),
  (23, 'chairs', 'Chairs', 3, 8),
  (24, 'sofas', 'Sofas', 3, 8),
  (25, 'lamps', 'Lamps', 3, 9),
  (26, 'textiles', 'Textiles', 3, 9);

INSERT INTO address (id, name, address, city, state, pin_code, mobile) VALUES
  (1, 'Threadline Warehouse', '120 Market St', 'San Francisco', 'CA', '94105', '+1 415 555 0101'),
  (2, 'Maple & Muse Studio', '48 W Division St', 'Chicago', 'IL', '60610', '+1 312 555 0147'),
  (3, 'Circuit Corner Depot', '2200 Western Ave', 'Seattle', 'WA', '98121', '+1 206 555 0199'),
  (4, 'John''s Furniture Workshop', '901 E 6th St', 'Austin', 'TX', '78702', '+1 512 555 0163');

INSERT INTO seller (id, email, seller_name, mobile, password, role, is_email_verified, account_status,
  business_name, business_email, business_mobile, business_address, gstin,
  account_holder_name, account_number, ifsc_code, pickup_address_id) VALUES
  (1, 'threadline@example.com', 'Oliver Grant', '+1 415 555 0101', '$2a$10$qHV/hbvQ2wM1u0WNSN5os.QXECJlC2P3/MwEakln8O.F0vuwNFvq2', 2, b'1', 1,
   'Threadline Menswear', 'hello@threadline.example.com', '+1 415 555 0101', '120 Market St, San Francisco, CA 94105', 'US-TX-4815162342',
   'Oliver Grant', '000123456789', 'THRD0001234', 1),
  (2, 'maplemuse@example.com', 'Sofia Reyes', '+1 312 555 0147', '$2a$10$qHV/hbvQ2wM1u0WNSN5os.QXECJlC2P3/MwEakln8O.F0vuwNFvq2', 2, b'1', 1,
   'Maple & Muse', 'studio@maplemuse.example.com', '+1 312 555 0147', '48 W Division St, Chicago, IL 60610', 'US-IL-2718281828',
   'Sofia Reyes', '000987654321', 'MAPL0005678', 2),
  (3, 'circuitcorner@example.com', 'Daniel Kim', '+1 206 555 0199', '$2a$10$qHV/hbvQ2wM1u0WNSN5os.QXECJlC2P3/MwEakln8O.F0vuwNFvq2', 2, b'1', 1,
   'Circuit Corner', 'support@circuitcorner.example.com', '+1 206 555 0199', '2200 Western Ave, Seattle, WA 98121', 'US-WA-3141592653',
   'Daniel Kim', '000555123987', 'CIRC0009012', 3),
  (4, 'johnsfurniture@example.com', 'John Miller', '+1 512 555 0163', '$2a$10$qHV/hbvQ2wM1u0WNSN5os.QXECJlC2P3/MwEakln8O.F0vuwNFvq2', 2, b'1', 1,
   'John''s Furniture', 'orders@johnsfurniture.example.com', '+1 512 555 0163', '901 E 6th St, Austin, TX 78702', 'US-TX-1618033988',
   'John Miller', '000444777111', 'JOHN0003456', 4);

INSERT INTO user (id, email, full_name, mobile, password, role) VALUES
  (1, 'digitalhandovertest@gmail.com', 'Admin', '+1 000 555 0000', '$2a$10$qHV/hbvQ2wM1u0WNSN5os.QXECJlC2P3/MwEakln8O.F0vuwNFvq2', 1),
  (2, 'emma.wilson@example.com', 'Emma Wilson', '+1 646 555 0112', '$2a$10$qHV/hbvQ2wM1u0WNSN5os.QXECJlC2P3/MwEakln8O.F0vuwNFvq2', 0),
  (3, 'liam.carter@example.com', 'Liam Carter', '+1 617 555 0178', '$2a$10$qHV/hbvQ2wM1u0WNSN5os.QXECJlC2P3/MwEakln8O.F0vuwNFvq2', 0),
  (4, 'ava.johnson@example.com', 'Ava Johnson', '+1 303 555 0134', '$2a$10$qHV/hbvQ2wM1u0WNSN5os.QXECJlC2P3/MwEakln8O.F0vuwNFvq2', 0);

INSERT INTO cart (user_id, coupon_code, discount, total_items, total_mrp_price, total_selling_price) VALUES
  (2, NULL, 0, 0, 0, 0),
  (3, NULL, 0, 0, 0, 0),
  (4, NULL, 0, 0, 0, 0);

INSERT INTO product (id, title, description, color, sizes, mrp_price, selling_price, discount_percent,
  quantity, num_ratings, category_id, seller_id, created_at) VALUES
  (1, 'Essential Crew Neck Tee', 'Soft combed-cotton tee with a classic crew neck and regular fit.', 'White', 'M', 30, 22, 26,
   60, 0, 10, 1, NOW() - INTERVAL 0 HOUR),
  (2, 'Heavyweight Cotton Tee', 'Thick 240 gsm cotton that keeps its shape wash after wash.', 'Black', 'M', 35, 26, 25,
   45, 0, 10, 1, NOW() - INTERVAL 17 HOUR),
  (3, 'Classic Fit Tee', 'Everyday crew neck tee in a bold red, pre-shrunk cotton.', 'Red', 'M', 28, 21, 25,
   38, 0, 10, 1, NOW() - INTERVAL 34 HOUR),
  (4, 'Relaxed Everyday Tee', 'Relaxed silhouette with dropped shoulders and a soft hand feel.', 'Teal', 'M', 32, 25, 21,
   40, 0, 10, 1, NOW() - INTERVAL 51 HOUR),
  (5, 'Dress Shirt 3-Pack', 'Three wrinkle-resistant dress shirts in grey, white and burgundy.', 'Gray', 'M', 120, 89, 25,
   20, 0, 11, 1, NOW() - INTERVAL 15 HOUR),
  (6, 'Printed Poplin Shirt', 'Lightweight poplin with a fine micro print, slim through the chest.', 'Navy', 'M', 60, 45, 25,
   34, 0, 11, 1, NOW() - INTERVAL 32 HOUR),
  (7, 'Pastel Oxford Shirt', 'Soft Oxford weave in pastel tones, regular fit.', 'Blue', 'M', 55, 44, 20,
   22, 0, 11, 1, NOW() - INTERVAL 49 HOUR),
  (8, 'Light Blue Dress Shirt', 'Easy-iron dress shirt with a spread collar.', 'Blue', 'M', 55, 44, 20,
   50, 0, 11, 1, NOW() - INTERVAL 66 HOUR),
  (9, 'Straight Leg Jeans', 'Mid-rise straight leg jeans in a medium stonewash.', 'Blue', 'M', 80, 59, 26,
   42, 0, 12, 1, NOW() - INTERVAL 12 HOUR),
  (10, 'Slim Black Jeans', 'Slim fit stretch denim in a deep black that resists fading.', 'Black', 'M', 85, 64, 24,
   36, 0, 12, 1, NOW() - INTERVAL 29 HOUR),
  (11, 'Dark Wash Tapered Jeans', 'Tapered leg with a clean dark rinse that dresses up easily.', 'Navy', 'M', 90, 70, 22,
   28, 0, 12, 1, NOW() - INTERVAL 46 HOUR),
  (12, 'Relaxed Fit Denim', 'Roomy relaxed fit in rigid cotton denim that softens with wear.', 'Blue', 'M', 75, 60, 20,
   31, 0, 12, 1, NOW() - INTERVAL 63 HOUR),
  (13, 'Court Classic Sneakers', 'Low-top leather court sneakers with a cushioned insole.', 'White', 'M', 110, 85, 22,
   26, 0, 13, 1, NOW() - INTERVAL 6 HOUR),
  (14, 'Knit Everyday Runner', 'Breathable knit upper and responsive foam for daily runs.', 'Brown', 'M', 120, 96, 20,
   30, 0, 13, 1, NOW() - INTERVAL 23 HOUR),
  (15, 'Leather Low-Top Sneakers', 'Full-grain leather low-tops with a durable rubber sole.', 'Brown', 'M', 140, 105, 25,
   18, 0, 13, 1, NOW() - INTERVAL 40 HOUR),
  (16, 'Minimal Leather Sneakers', 'Clean grey leather sneakers with tonal laces.', 'Gray', 'M', 115, 89, 22,
   24, 0, 13, 1, NOW() - INTERVAL 57 HOUR),
  (17, 'Long Sleeve Wrap Dress', 'Flattering wrap silhouette with long sleeves and a tie waist.', 'Red', 'M', 95, 72, 24,
   20, 0, 14, 2, NOW() - INTERVAL 3 HOUR),
  (18, 'Floral Midi Sundress', 'Airy floral sundress with thin straps, made for warm days.', 'White', 'M', 70, 55, 21,
   32, 0, 14, 2, NOW() - INTERVAL 20 HOUR),
  (19, 'Button Front Sundress', 'Mustard sundress with a button front and square neckline.', 'Yellow', 'M', 85, 64, 24,
   25, 0, 14, 2, NOW() - INTERVAL 37 HOUR),
  (20, 'Linen Summer Dress', 'Breathable linen blend with a clean, minimal cut.', 'White', 'M', 90, 70, 22,
   22, 0, 14, 2, NOW() - INTERVAL 54 HOUR),
  (21, 'Satin Blouse', 'Smooth satin blouse with a soft drape and covered buttons.', 'Red', 'M', 60, 45, 25,
   28, 0, 15, 2, NOW() - INTERVAL 14 HOUR),
  (22, 'Floral Print Blouse', 'Light floral print on a breezy white base, relaxed fit.', 'White', 'M', 55, 42, 23,
   30, 0, 15, 2, NOW() - INTERVAL 31 HOUR),
  (23, 'Tie Waist Blouse', 'Pastel pink blouse with a tie waist detail.', 'Pink', 'M', 58, 46, 20,
   24, 0, 15, 2, NOW() - INTERVAL 48 HOUR),
  (24, 'Striped Long Sleeve Top', 'Breton-style stripes on soft cotton jersey.', 'White', 'M', 48, 38, 20,
   35, 0, 15, 2, NOW() - INTERVAL 65 HOUR),
  (25, 'Textured Pumps', 'Pointed textured pumps with a comfortable mid heel.', 'White', 'M', 120, 90, 25,
   18, 0, 16, 2, NOW() - INTERVAL 16 HOUR),
  (26, 'Floral Almond-Toe Pumps', 'Statement floral pumps with an almond toe.', 'Blue', 'M', 130, 99, 23,
   14, 0, 16, 2, NOW() - INTERVAL 33 HOUR),
  (27, 'Peep Toe Heels', 'Black leather peep toe heels for evenings out.', 'Black', 'M', 110, 85, 22,
   20, 0, 16, 2, NOW() - INTERVAL 50 HOUR),
  (28, 'Nude Stiletto Heels', 'Glossy nude stilettos with a slim high heel.', 'Beige', 'M', 115, 88, 23,
   16, 0, 16, 2, NOW() - INTERVAL 67 HOUR),
  (29, 'Structured Leather Bag', 'Structured black leather bag with a detachable strap.', 'Black', 'FREE', 180, 139, 22,
   15, 0, 17, 2, NOW() - INTERVAL 9 HOUR),
  (30, 'Buckle Satchel', 'Grey leather satchel with polished gold buckles.', 'Gray', 'FREE', 160, 125, 21,
   12, 0, 17, 2, NOW() - INTERVAL 26 HOUR),
  (31, 'Mini Top Handle Bag', 'Compact top handle bag in a soft blush pink.', 'Pink', 'FREE', 120, 95, 20,
   20, 0, 17, 2, NOW() - INTERVAL 43 HOUR),
  (32, 'Everyday Leather Tote', 'Roomy brown leather tote that fits a 13-inch laptop.', 'Brown', 'FREE', 150, 115, 23,
   18, 0, 17, 2, NOW() - INTERVAL 60 HOUR),
  (33, 'Nova X Smartphone', '6.5-inch OLED display, triple camera and all-day battery.', 'Black', 'FREE', 699, 579, 17,
   25, 0, 18, 3, NOW() - INTERVAL 1 HOUR),
  (34, 'Lumen 5 Smartphone', 'Compact phone with a bright display and 128 GB storage.', 'White', 'FREE', 499, 429, 14,
   30, 0, 18, 3, NOW() - INTERVAL 18 HOUR),
  (35, 'Aura Pro Smartphone', 'Flagship performance with a stainless steel frame.', 'Silver', 'FREE', 999, 849, 15,
   18, 0, 18, 3, NOW() - INTERVAL 35 HOUR),
  (36, 'Aura Mini Smartphone', 'The Aura experience in a one-hand friendly size.', 'Gray', 'FREE', 799, 689, 13,
   22, 0, 18, 3, NOW() - INTERVAL 52 HOUR),
  (37, 'Pulse Smartwatch', 'Heart-rate, sleep and workout tracking with a sport band.', 'Black', 'FREE', 349, 289, 17,
   26, 0, 19, 3, NOW() - INTERVAL 10 HOUR),
  (38, 'Pulse Smartwatch Aluminium', 'Lightweight aluminium case with an always-on display.', 'Silver', 'FREE', 399, 329, 17,
   20, 0, 19, 3, NOW() - INTERVAL 27 HOUR),
  (39, 'Rugged Fitness Watch', 'Water-resistant fitness watch with a 10-day battery.', 'Black', 'FREE', 199, 159, 20,
   34, 0, 19, 3, NOW() - INTERVAL 44 HOUR),
  (40, 'Outdoor Sport Watch', 'GPS sport watch with a breathable olive band.', 'Green', 'FREE', 249, 199, 20,
   28, 0, 19, 3, NOW() - INTERVAL 61 HOUR),
  (41, 'Studio Wireless Headphones', 'Over-ear wireless headphones with rich, balanced sound.', 'Black', 'FREE', 299, 239, 20,
   24, 0, 20, 3, NOW() - INTERVAL 4 HOUR),
  (42, 'Noise Cancelling Over-Ear', 'Active noise cancelling and 30 hours of playback.', 'Black', 'FREE', 349, 279, 20,
   20, 0, 20, 3, NOW() - INTERVAL 21 HOUR),
  (43, 'Pastel Wireless Headphones', 'Lightweight on-ear headphones in soft pastel tones.', 'Pink', 'FREE', 149, 119, 20,
   30, 0, 20, 3, NOW() - INTERVAL 38 HOUR),
  (44, 'Classic Wired Headphones', 'Leather-trimmed wired headphones with a detachable cable.', 'Brown', 'FREE', 129, 99, 23,
   26, 0, 20, 3, NOW() - INTERVAL 55 HOUR),
  (45, 'ProBook 14', '14-inch performance laptop with 16 GB RAM and 1 TB SSD.', 'Silver', 'FREE', 1499, 1299, 13,
   12, 0, 21, 3, NOW() - INTERVAL 7 HOUR),
  (46, 'AirLite 13 Ultrabook', 'Thin and light 13-inch ultrabook with 18-hour battery.', 'Silver', 'FREE', 1099, 949, 13,
   16, 0, 21, 3, NOW() - INTERVAL 24 HOUR),
  (47, 'Workstation 16', '16-inch workstation with a dedicated GPU for creators.', 'Gray', 'FREE', 1899, 1649, 13,
   8, 0, 21, 3, NOW() - INTERVAL 41 HOUR),
  (48, 'Slim 15 Laptop', 'Everyday 15-inch laptop with a full-size keyboard.', 'Silver', 'FREE', 899, 779, 13,
   20, 0, 21, 3, NOW() - INTERVAL 58 HOUR),
  (49, '27-inch 4K Monitor', 'Sharp 4K IPS panel with factory colour calibration.', 'Black', 'FREE', 449, 379, 15,
   14, 0, 22, 3, NOW() - INTERVAL 13 HOUR),
  (50, '34-inch Ultrawide Monitor', 'Curved 34-inch ultrawide for multitasking and immersive games.', 'Black', 'FREE', 549, 469, 14,
   10, 0, 22, 3, NOW() - INTERVAL 30 HOUR),
  (51, '32-inch QHD Monitor', 'Large 32-inch QHD screen for spreadsheets and timelines.', 'Black', 'FREE', 399, 339, 15,
   12, 0, 22, 3, NOW() - INTERVAL 47 HOUR),
  (52, 'Gaming Monitor 165Hz', 'Fast 165 Hz refresh rate with 1 ms response time.', 'Black', 'FREE', 329, 279, 15,
   18, 0, 22, 3, NOW() - INTERVAL 64 HOUR),
  (53, 'Scandi Shell Chair', 'Curved white shell seat on solid wooden legs.', 'White', 'FREE', 180, 149, 17,
   20, 0, 23, 4, NOW() - INTERVAL 8 HOUR),
  (54, 'Upholstered Armchair', 'Mid-century armchair with a padded tan seat.', 'Beige', 'FREE', 420, 349, 16,
   10, 0, 23, 4, NOW() - INTERVAL 25 HOUR),
  (55, 'Wicker Accent Chair', 'Hand-woven wicker seat on slim metal legs.', 'Beige', 'FREE', 260, 219, 15,
   12, 0, 23, 4, NOW() - INTERVAL 42 HOUR),
  (56, 'Moulded Tub Chair', 'Sculpted moulded chair that works indoors and out.', 'Black', 'FREE', 140, 115, 17,
   24, 0, 23, 4, NOW() - INTERVAL 59 HOUR),
  (57, 'Velvet Three-Seater Sofa', 'Plush green velvet three-seater with striped cushions.', 'Green', 'FREE', 1299, 1049, 19,
   6, 0, 24, 4, NOW() - INTERVAL 2 HOUR),
  (58, 'Modern Two-Seater Sofa', 'Clean-lined two-seater in a light grey weave.', 'Gray', 'FREE', 899, 749, 16,
   8, 0, 24, 4, NOW() - INTERVAL 19 HOUR),
  (59, 'Linen Loveseat', 'Compact loveseat in a washable white linen blend.', 'White', 'FREE', 799, 659, 17,
   7, 0, 24, 4, NOW() - INTERVAL 36 HOUR),
  (60, 'Corner Sectional Sofa', 'Spacious L-shaped sectional for family living rooms.', 'Black', 'FREE', 1799, 1499, 16,
   4, 0, 24, 4, NOW() - INTERVAL 53 HOUR),
  (61, 'Dome Pendant Light', 'Matte grey dome pendant for kitchens and dining tables.', 'Gray', 'FREE', 120, 95, 20,
   25, 0, 25, 4, NOW() - INTERVAL 5 HOUR),
  (62, 'Arc Floor Lamp', 'Mid-century floor lamp with an adjustable shade.', 'Orange', 'FREE', 220, 179, 18,
   12, 0, 25, 4, NOW() - INTERVAL 22 HOUR),
  (63, 'Adjustable Reading Lamp', 'Adjustable reading lamp with a warm LED bulb.', 'Gray', 'FREE', 75, 59, 21,
   30, 0, 25, 4, NOW() - INTERVAL 39 HOUR),
  (64, 'Copper Table Lamp', 'Polished copper lamp with an adjustable head.', 'Gold', 'FREE', 160, 129, 19,
   15, 0, 25, 4, NOW() - INTERVAL 56 HOUR),
  (65, 'Textured Cushion Cover', 'Woven cushion cover with a subtle textured pattern.', 'White', 'FREE', 35, 27, 22,
   40, 0, 26, 4, NOW() - INTERVAL 11 HOUR),
  (66, 'Throw Pillow Set of 3', 'Three coordinated throw pillows in mixed tones.', 'Yellow', 'FREE', 69, 55, 20,
   26, 0, 26, 4, NOW() - INTERVAL 28 HOUR),
  (67, 'Woven Throw Pillow', 'Basket-weave pillow with a feather-blend insert.', 'Brown', 'FREE', 39, 31, 20,
   35, 0, 26, 4, NOW() - INTERVAL 45 HOUR),
  (68, 'Cactus Print Pillow', 'Playful cactus print cushion on a cotton canvas cover.', 'Green', 'FREE', 39, 30, 23,
   28, 0, 26, 4, NOW() - INTERVAL 62 HOUR);

INSERT INTO product_images (product_id, images) VALUES
  (1, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80&fit=crop&auto=format'),
  (2, 'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800&q=80&fit=crop&auto=format'),
  (3, 'https://images.unsplash.com/photo-1624373607006-348f61ea2d76?w=800&q=80&fit=crop&auto=format'),
  (4, 'https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?w=800&q=80&fit=crop&auto=format'),
  (5, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80&fit=crop&auto=format'),
  (6, 'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&q=80&fit=crop&auto=format'),
  (7, 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=800&q=80&fit=crop&auto=format'),
  (8, 'https://images.unsplash.com/photo-1623658580851-3b25bf83b4ea?w=800&q=80&fit=crop&auto=format'),
  (9, 'https://images.unsplash.com/photo-1714143136372-ddaf8b606da7?w=800&q=80&fit=crop&auto=format'),
  (10, 'https://images.unsplash.com/photo-1718252540511-e958742e4165?w=800&q=80&fit=crop&auto=format'),
  (11, 'https://images.unsplash.com/photo-1714143164072-7646ef5cb24d?w=800&q=80&fit=crop&auto=format'),
  (12, 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80&fit=crop&auto=format'),
  (13, 'https://images.unsplash.com/photo-1600054904350-1d493ae5f922?w=800&q=80&fit=crop&auto=format'),
  (14, 'https://images.unsplash.com/photo-1631087606988-a6be38fccaf6?w=800&q=80&fit=crop&auto=format'),
  (15, 'https://images.unsplash.com/photo-1556774687-0e2fdd0116c0?w=800&q=80&fit=crop&auto=format'),
  (16, 'https://images.unsplash.com/photo-1621665421571-2d325f9c7c6a?w=800&q=80&fit=crop&auto=format'),
  (17, 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&q=80&fit=crop&auto=format'),
  (18, 'https://images.unsplash.com/photo-1762154057377-cc9d3dd6900c?w=800&q=80&fit=crop&auto=format'),
  (19, 'https://images.unsplash.com/photo-1617748142066-30ebe45b4908?w=800&q=80&fit=crop&auto=format'),
  (20, 'https://images.unsplash.com/photo-1565462905097-5e701c31dcfb?w=800&q=80&fit=crop&auto=format'),
  (21, 'https://images.unsplash.com/photo-1761117228880-df2425bd70da?w=800&q=80&fit=crop&auto=format'),
  (22, 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80&fit=crop&auto=format'),
  (23, 'https://images.unsplash.com/photo-1777462985111-9da64fb2e6e6?w=800&q=80&fit=crop&auto=format'),
  (24, 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=800&q=80&fit=crop&auto=format'),
  (25, 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&q=80&fit=crop&auto=format'),
  (26, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&fit=crop&auto=format'),
  (27, 'https://images.unsplash.com/photo-1596702874230-b5706dfb5bc7?w=800&q=80&fit=crop&auto=format'),
  (28, 'https://images.unsplash.com/photo-1591884807537-0bce39888fe0?w=800&q=80&fit=crop&auto=format'),
  (29, 'https://images.unsplash.com/photo-1705909237050-7a7625b47fac?w=800&q=80&fit=crop&auto=format'),
  (30, 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=800&q=80&fit=crop&auto=format'),
  (31, 'https://images.unsplash.com/photo-1681747685985-a401c271156c?w=800&q=80&fit=crop&auto=format'),
  (32, 'https://images.unsplash.com/photo-1691480250099-a63081ecfcb8?w=800&q=80&fit=crop&auto=format'),
  (33, 'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=800&q=80&fit=crop&auto=format'),
  (34, 'https://images.unsplash.com/photo-1634403665481-74948d815f03?w=800&q=80&fit=crop&auto=format'),
  (35, 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80&fit=crop&auto=format'),
  (36, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&fit=crop&auto=format'),
  (37, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80&fit=crop&auto=format'),
  (38, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80&fit=crop&auto=format'),
  (39, 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80&fit=crop&auto=format'),
  (40, 'https://images.unsplash.com/photo-1617625802912-cde586faf331?w=800&q=80&fit=crop&auto=format'),
  (41, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&fit=crop&auto=format'),
  (42, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80&fit=crop&auto=format'),
  (43, 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&q=80&fit=crop&auto=format'),
  (44, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80&fit=crop&auto=format'),
  (45, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80&fit=crop&auto=format'),
  (46, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80&fit=crop&auto=format'),
  (47, 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&fit=crop&auto=format'),
  (48, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80&fit=crop&auto=format'),
  (49, 'https://images.unsplash.com/photo-1619597455322-4fbbd820250a?w=800&q=80&fit=crop&auto=format'),
  (50, 'https://images.unsplash.com/photo-1666771410140-0573b232426e?w=800&q=80&fit=crop&auto=format'),
  (51, 'https://images.unsplash.com/photo-1547658718-1cdaa0852790?w=800&q=80&fit=crop&auto=format'),
  (52, 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&q=80&fit=crop&auto=format'),
  (53, 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&q=80&fit=crop&auto=format'),
  (54, 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800&q=80&fit=crop&auto=format'),
  (55, 'https://images.unsplash.com/photo-1758486561455-ebd0d3ba7423?w=800&q=80&fit=crop&auto=format'),
  (56, 'https://images.unsplash.com/photo-1489269637500-aa0e75768394?w=800&q=80&fit=crop&auto=format'),
  (57, 'https://images.unsplash.com/photo-1590251024078-8a6d9f90b02d?w=800&q=80&fit=crop&auto=format'),
  (58, 'https://images.unsplash.com/photo-1759722665629-29df6ee4f9a5?w=800&q=80&fit=crop&auto=format'),
  (59, 'https://images.unsplash.com/photo-1704428382813-b6c72be3f6c3?w=800&q=80&fit=crop&auto=format'),
  (60, 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80&fit=crop&auto=format'),
  (61, 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80&fit=crop&auto=format'),
  (62, 'https://images.unsplash.com/photo-1621177555630-b861919c864f?w=800&q=80&fit=crop&auto=format'),
  (63, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80&fit=crop&auto=format'),
  (64, 'https://images.unsplash.com/photo-1542728928-1413d1894ed1?w=800&q=80&fit=crop&auto=format'),
  (65, 'https://images.unsplash.com/photo-1629949009765-40fc74c9ec21?w=800&q=80&fit=crop&auto=format'),
  (66, 'https://images.unsplash.com/photo-1553114552-c4ece3a33c93?w=800&q=80&fit=crop&auto=format'),
  (67, 'https://images.unsplash.com/photo-1592789705501-f9ae4278a9c9?w=800&q=80&fit=crop&auto=format'),
  (68, 'https://images.unsplash.com/photo-1531877025030-f7696a50770f?w=800&q=80&fit=crop&auto=format');

INSERT INTO home_category (name, image, section, category_id) VALUES
  ('Men T-Shirts', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80&fit=crop&auto=format', 3, 10),
  ('Women Dresses', 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&q=80&fit=crop&auto=format', 3, 14),
  ('Men Shirts', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80&fit=crop&auto=format', 3, 11),
  ('Sofas', 'https://images.unsplash.com/photo-1590251024078-8a6d9f90b02d?w=800&q=80&fit=crop&auto=format', 3, 24),
  ('Smart Watches', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80&fit=crop&auto=format', 3, 19),
  ('Lamps', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80&fit=crop&auto=format', 3, 25);

-- Each deal advertises the real maximum discount among its category's products.
INSERT INTO deal (discount, category_id)
SELECT MAX(p.discount_percent), hc.id
FROM home_category hc
JOIN product p ON p.category_id = hc.category_id
GROUP BY hc.id
ORDER BY hc.id;
