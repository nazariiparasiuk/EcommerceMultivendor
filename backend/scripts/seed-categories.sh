#!/bin/bash
# EMV-19: restructure the category tree into 3 departments
# (Clothing & accessories / Electronics / Home goods), with gender as
# a level-2 category under Clothing rather than its own department.
#
# Reparents the pre-existing men -> men_topwear -> men_t_shirts chain
# (men_t_shirts already has real products attached) directly under the
# new tree instead of creating a duplicate, then creates everything
# else fresh via the EMV-16 admin CRUD.
#
# Usage:
#   ADMIN_JWT="eyJ..." ./seed-categories.sh [API_BASE_URL]
#
# ADMIN_JWT must be a valid JWT for a user with ROLE_ADMIN.
# API_BASE_URL defaults to http://localhost:5454.

set -e

API_BASE="${1:-http://localhost:5454}"

if [ -z "$ADMIN_JWT" ]; then
  echo "Set ADMIN_JWT to an admin user's token before running this script." >&2
  echo "Usage: ADMIN_JWT=\"your.jwt.token\" ./seed-categories.sh [API_BASE_URL]" >&2
  exit 1
fi

create_category() {
  local category_id="$1"
  local name="$2"
  local parent_id="$3"

  local body
  if [ -z "$parent_id" ]; then
    body="{\"categoryId\":\"$category_id\",\"name\":\"$name\"}"
  else
    body="{\"categoryId\":\"$category_id\",\"name\":\"$name\",\"parentCategory\":{\"id\":$parent_id}}"
  fi

  local response
  response=$(curl -s -X POST "$API_BASE/api/categories/admin/create" \
    -H "Authorization: Bearer $ADMIN_JWT" \
    -H "Content-Type: application/json" \
    -d "$body")

  local id
  id=$(echo "$response" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')

  if [ -z "$id" ]; then
    echo "Failed to create '$name' ($category_id): $response" >&2
    exit 1
  fi

  echo "Created '$name' ($category_id) -> id=$id" >&2
  echo "$id"
}

reparent_category() {
  local id="$1"
  local name="$2"
  local new_parent_id="$3"

  local response
  response=$(curl -s -X PATCH "$API_BASE/api/categories/admin/$id" \
    -H "Authorization: Bearer $ADMIN_JWT" \
    -H "Content-Type: application/json" \
    -d "{\"parentCategory\":{\"id\":$new_parent_id}}")

  local level
  level=$(echo "$response" | grep -o '"level":[0-9]*' | tail -1 | grep -o '[0-9]*')

  if [ -z "$level" ]; then
    echo "Failed to reparent '$name' (id=$id): $response" >&2
    exit 1
  fi

  echo "Reparented '$name' (id=$id) under id=$new_parent_id -> new level=$level" >&2
}

delete_category() {
  local id="$1"
  local name="$2"

  local response
  response=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$API_BASE/api/categories/admin/$id" \
    -H "Authorization: Bearer $ADMIN_JWT")

  if [ "$response" != "200" ]; then
    echo "Failed to delete '$name' (id=$id), HTTP $response" >&2
    exit 1
  fi

  echo "Deleted '$name' (id=$id)" >&2
}

echo "=== Departments (level 1) ===" >&2
CLOTHING_ID=$(create_category "clothing" "Clothing & accessories" "")
ELECTRONICS_ID=$(create_category "electronics" "Electronics" "")
HOME_ID=$(create_category "home_goods" "Home goods" "")

echo "=== Migrating existing 'men' chain (has real products) ===" >&2
reparent_category 1 "men" "$CLOTHING_ID"       # men: level 1 -> level 2 under Clothing
reparent_category 3 "men_t_shirts" 1            # men_t_shirts: reattach directly under men (id=1) -> level 3
delete_category 2 "men_topwear"                 # now childless and product-free, safe to remove
MEN_ID=1

echo "=== Remaining level 2 categories ===" >&2
WOMEN_ID=$(create_category "women" "Women" "$CLOTHING_ID")
GADGETS_ID=$(create_category "smartphones_gadgets" "Smartphones & gadgets" "$ELECTRONICS_ID")
COMPUTERS_ID=$(create_category "computers" "Computers" "$ELECTRONICS_ID")
FURNITURE_ID=$(create_category "furniture" "Furniture" "$HOME_ID")
DECOR_ID=$(create_category "decor_lighting" "Decor & lighting" "$HOME_ID")

echo "=== Leaf categories (level 3) ===" >&2
create_category "men_shirts" "Shirts" "$MEN_ID" > /dev/null
create_category "men_jeans" "Jeans" "$MEN_ID" > /dev/null
create_category "men_footwear" "Footwear" "$MEN_ID" > /dev/null

create_category "women_dresses" "Dresses" "$WOMEN_ID" > /dev/null
create_category "women_blouses" "Blouses" "$WOMEN_ID" > /dev/null
create_category "women_footwear" "Footwear" "$WOMEN_ID" > /dev/null
create_category "women_bags" "Bags" "$WOMEN_ID" > /dev/null

create_category "smartphones" "Smartphones" "$GADGETS_ID" > /dev/null
create_category "smartwatches" "Smartwatches" "$GADGETS_ID" > /dev/null
create_category "headphones" "Headphones" "$GADGETS_ID" > /dev/null

create_category "laptops" "Laptops" "$COMPUTERS_ID" > /dev/null
create_category "monitors" "Monitors" "$COMPUTERS_ID" > /dev/null

create_category "chairs" "Chairs" "$FURNITURE_ID" > /dev/null
create_category "sofas" "Sofas" "$FURNITURE_ID" > /dev/null

create_category "lamps" "Lamps" "$DECOR_ID" > /dev/null
create_category "textiles" "Textiles" "$DECOR_ID" > /dev/null

echo "Done." >&2
