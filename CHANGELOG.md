# Changelog

All notable changes to Sellway (EcommerceMultivendor) are documented here.
Versions follow [Semantic Versioning](https://semver.org/).

## [1.1.0] — 2026-09-23

The first release after the tutorial baseline. It turns the storefront into
**Sellway**: a real, admin-managed category tree drives navigation, search,
filters and the homepage, and the customer-facing UI is rebranded end to end.
It also restores three security fixes that were missing from `main` in 1.0.

### Security

- **Security fixes restored on `main` (EMV-2, EMV-3, EMV-4).** These were
  merged into `main` by mistake in PR #3 and reverted there, then landed
  properly via `develop`. The 1.0 merge kept the reverts, so 1.0 shipped
  without them. This release puts them back:
  - **EMV-2 — Broken access control closed.** `/admin/deals`, `/sellers` and
    `/sellers/products` sat outside `/api/**` and were open to anyone without
    a token. Role-based rules now protect them; sellers can only update or
    delete their own products; only admins can change a seller's account
    status. The dead-ordered `/api/products/*/reviews` rule was fixed too.
  - **EMV-3 — JWT signing secret moved out of source code.** The HMAC key is
    now read from `jwt.secret` (`JWT_SECRET` env var) and built once, instead
    of being a committed string literal anyone could use to forge admin tokens.
  - **EMV-4 — Method security enabled.** `@PreAuthorize` checks (e.g. coupon
    create/delete) were silently ignored; they are now enforced.
- **EMV-17** — Narrowed the `DELETE /sellers/**` admin rule to `/sellers/{id}`
  so it no longer blocked sellers from deleting their own products.

### Added

- **EMV-15 — Sellway design tokens.** Indigo primary with amber/rose
  department accents in Tailwind and the MUI theme; Unbounded, Plus Jakarta
  Sans and IBM Plex Mono fonts.
- **EMV-16 — Category admin API.** `GET /api/categories` (public) and
  admin-only create/update/delete. Levels are derived from the parent; a
  category with children or products can't be deleted.
- **EMV-19 — Three-department category tree.** Clothing & accessories,
  Electronics and Furniture & Decor, each with subcategories and leaf
  categories. `backend/scripts/seed-categories.sh` reproduces the tree.
- **EMV-35 — Product search.** A real search input in the navbar and a
  `/search` results page backed by `GET /products/search`.
- **EMV-36 — Faceted filters.** `GET /products/filters` returns the colours
  and price range that actually exist in the current category. The sidebar
  shows only real colours and a dollar price slider; each facet ignores its
  own active value so you can still switch.
- **EMV-27 — Sellway homepage.** New Hero, clickable Departments (tiles and
  subcategory pills), "Deals this week", "Popular right now", a seller
  banner and a site footer.
- **EMV-27 — `GET /products/popular`.** Units sold in the last 30 days
  (paid orders only), topped up with the newest products, one per category,
  8 items.
- **EMV-27 — Demo data script.** `backend/scripts/seed-demo-data.sql` wipes
  the database and loads 26 categories, 4 sellers, 68 products with matching
  photos, 1 admin and 3 customers.

### Changed

- **EMV-17 — Sellers pick an existing category.** Product creation takes a
  single leaf `category` id and rejects unknown or non-leaf categories,
  instead of silently creating new ones from free text.
- **EMV-18 — Category filtering includes descendants.** Filtering by a
  department or subcategory returns every product in the leaves beneath it.
- **EMV-20 — Homepage tiles use a real category foreign key**, validated on
  input, instead of a free-text id.
- **EMV-21 — Search matches parent categories.** Searching "Clothing" or
  "Electronics" finds products in their subcategories.
- **EMV-22 — Live category navigation.** The mega-menu and the seller's
  category picker read from `/api/categories`; the tutorial's fake category
  files are gone.
- **EMV-26 — Navbar rebrand.** New Sellway logo, a centred search pill, a
  separate department row with coloured hover accents, and themed mega-menus.
- **EMV-27 — Mobile and large-screen navbar.** A slide-out drawer menu on
  small screens and a 1600px max-width layout for QHD/4K.
- **EMV-27 — Deals show real discounts.** Each deal advertises the highest
  real discount in its category ("Up to 26% off") instead of a flat 10%.
- **EMV-27 — Wishlist requires login.** The heart on product cards and the
  navbar wishlist link send signed-out visitors to the login page; the heart
  shows the saved state and confirms with a toast.

### Fixed

- **EMV-22** — Sellers could not create products from the UI at all (the
  picker only produced category ids the backend rejects), and the form sent
  the department instead of the chosen leaf category.
- **EMV-23** — Category pages ignored the category in the URL and showed
  every product; the header was a hardcoded "women sarees".
- **EMV-36** — Sorting and pagination never triggered a new request, and the
  page count was hardcoded to 10.
- **EMV-26** — The mega-menu closed while moving the cursor from a
  department link into it.
- **EMV-27** — Horizontal scrolling on phones caused by the search field.
- **EMV-27** — Email errors now keep their cause in the log, so SMTP
  failures show the real reason.

### Removed

- **EMV-27** — Tutorial homepage sections (Electronics, Grid, Shop by
  Category), their admin pages and sidebar links, and the matching `grid`,
  `shopByCategories` and `electronics` fields of the `/home/categories`
  response.
- **EMV-22 / EMV-36** — Hardcoded category, price and discount data files.

### Upgrade notes

- **Environment:** set `JWT_SECRET` (a long random value) in every
  non-development environment. The built-in fallback is for local use only.
  Login emails need `MAIL_USERNAME` and a Gmail App Password in
  `MAIL_PASSWORD`.
- **Tokens:** the signing key changed, so tokens issued by 1.0 stop working
  after the upgrade and users sign in again.
- **Database:** `home_category.category_id` changed from text to a foreign
  key, and the category tree was restructured. Existing databases with
  tutorial data are not migrated. Reset with
  `mysql -u<user> -p <database> < backend/scripts/seed-demo-data.sql`
  (this deletes all data).
- **API consumers:** product creation now expects a single leaf `category`
  id, and `/home/categories` no longer returns `grid`, `shopByCategories` or
  `electronics`.

### Known issues

- OTP emails fail when the Gmail App Password is invalid (`535 BadCredentials`);
  the code is still stored in `verification_code`.
- Login errors are not shown in the UI, admins are not redirected to
  `/admin` after signing in, and all roles share one stored token.
- Edit/Delete buttons in the admin Deals table do nothing yet.
- Guests cannot use a cart or wishlist without signing in.
- The seller and admin portals are not rebranded yet (planned for 1.2).

## [1.0.0] — 2026-09-17

Baseline: the application as completed in the tutorial, plus:

- **EMV-1** — Seller responses no longer expose the password hash or bank
  details.
- **EMV-5** — Fixed the inverted ownership check that let anyone except the
  owner cancel an order.
- **EMV-6** — Users can no longer read other users' orders or order items by
  id.
