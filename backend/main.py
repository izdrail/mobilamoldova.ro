import sqlite3
import csv
import os
from fastapi import FastAPI, HTTPException
from typing import List, Optional
from pydantic import BaseModel  # Add this import

# Configuration
DATABASE = "mobila-products.db"
CSV_FILE = "processed-products.csv"

# FastAPI App
app = FastAPI()

# Models for responses
class Product(BaseModel):
    id: int
    title: str
    aff_code: Optional[str]
    price: Optional[float]
    category: Optional[str]
    subcategory: Optional[str]
    brand: Optional[str]
    url: Optional[str]
    image_urls: Optional[str]
    description: Optional[str]
    short_message: Optional[str]
    created_at: Optional[str]


class Category(BaseModel):
    category: str


# Utility functions
def initialize_database():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            aff_code TEXT,
            price REAL,
            category TEXT,
            subcategory TEXT,
            brand TEXT,
            url TEXT,
            image_urls TEXT,
            description TEXT,
            short_message TEXT,
            created_at TEXT
        )
        """
    )
    conn.commit()
    conn.close()
    print("Database initialized successfully!")


def import_from_csv():
    if not os.path.exists(CSV_FILE):
        print(f"Error: CSV file '{CSV_FILE}' not found!")
        return False

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    products_added = 0

    try:
        with open(CSV_FILE, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    cursor.execute(
                        """
                        INSERT OR IGNORE INTO products (
                            id, title, aff_code, price,
                            category, subcategory, brand,
                            url, image_urls, short_message, description, created_at
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """,
                        (
                            row["id"], row["title"], row["aff_code"], row["price"],
                            row["category"], row["subcategory"], row["brand"],
                            row["url"], row["image_urls"], row["short_message"], row["description"],
                            row.get("created_at", None) or "N/A",
                        ),
                    )
                    products_added += 1
                except sqlite3.Error as e:
                    print(f"Error inserting row: {e}")
                    continue

        conn.commit()
        print(f"Successfully imported {products_added} products from CSV")
        return True

    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

    finally:
        conn.close()


# API Endpoints
@app.get("/products", response_model=List[Product])
async def list_products():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()
    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail="No products found")

    return [
        {
            "id": row[0],
            "title": row[1],
            "aff_code": row[2],
            "price": row[3],
            "category": row[4],
            "subcategory": row[5],
            "brand": row[6],
            "url": row[7],
            "image_urls": row[8],
            "description": row[9],
            "short_message": row[10],
            "created_at": row[11],
        }
        for row in rows
    ]


@app.get("/categories", response_model=List[Category])
async def list_categories():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT category FROM products")
    rows = cursor.fetchall()
    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail="No categories found")

    return [{"category": row[0]} for row in rows]


@app.get("/products/{product_id}", response_model=Product)
async def get_product_by_id(product_id: int):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")

    return {
        "id": row[0],
        "title": row[1],
        "aff_code": row[2],
        "price": row[3],
        "category": row[4],
        "subcategory": row[5],
        "brand": row[6],
        "url": row[7],
        "image_urls": row[8],
        "description": row[9],
        "short_message": row[10],
        "created_at": row[11],
    }


@app.get("/products/filter", response_model=List[Product])
async def filter_products_by_category(category: str):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products WHERE category = ?", (category,))
    rows = cursor.fetchall()
    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail=f"No products found for category '{category}'")

    return [
        {
            "id": row[0],
            "title": row[1],
            "aff_code": row[2],
            "price": row[3],
            "category": row[4],
            "subcategory": row[5],
            "brand": row[6],
            "url": row[7],
            "image_urls": row[8],
            "description": row[9],
            "short_message": row[10],
            "created_at": row[11],
        }
        for row in rows
    ]


# Ensure database is initialized before the app starts
@app.on_event("startup")
async def startup_event():
    print("\nInitializing database...")
    initialize_database()
    print("\nImporting data from CSV...")
    import_from_csv()
    print("\nApplication startup complete!")
