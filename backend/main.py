import asyncio
import csv
import os
import sqlite3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from litellm import completion

DATABASE = "mobila.db"  # SQLite database file
CSV_FILE = "mobila.csv"  # CSV file path

app = FastAPI(
    title="Backend - Mobila Moldova",
    description="This is the backend API for Mobila Moldova which takes products from CSV file, stores them in SQLite, and serves them as JSON.",
    terms_of_service="https://mobilamoldova.ro/terms",
    contact={
        "name": "Stefan Bogdanel",
        "url": "https://izdrail.com/",
        "email": "stefan@izdrail.com",
    },
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Specify allowed methods
    allow_headers=["*"],  # Specify allowed headers
    max_age=3600,  # Set max age in seconds
)

# Create database and table
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
            old_price REAL,
            product_id TEXT UNIQUE,
            campaign_id TEXT,
            campaign_url TEXT,
            campaign_name TEXT,
            category TEXT,
            subcategory TEXT,
            brand TEXT,
            product_active TEXT,
            url TEXT,
            image_urls TEXT,
            description TEXT,
            short_message TEXT,
            widget_name TEXT,
            other_data TEXT,
            created_at TEXT
        )
        """
    )
    conn.commit()
    conn.close()

# Load data from CSV into the database
def load_data_from_csv():
    if not os.path.exists(CSV_FILE):
        print("CSV file not found. Skipping data loading.")
        return

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    with open(CSV_FILE, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        # Ensure the file has the expected headers
        expected_headers = {
            "title", "aff_code", "price", "old_price", "product_id",
            "campaign_id", "campaign_url", "campaign_name",
            "category", "subcategory", "brand", "product_active",
            "url", "image_urls", "description", "short_message",
            "widget_name", "other_data", "created_at"
        }
        if set(reader.fieldnames) != expected_headers:
            raise ValueError(f"CSV headers do not match expected headers: {expected_headers}")

        # Insert data into the database
        for row in reader:
            try:
                cursor.execute(
                    """
                    INSERT OR IGNORE INTO products (
                        title, aff_code, price, old_price, product_id,
                        campaign_id, campaign_url, campaign_name,
                        category, subcategory, brand, product_active,
                        url, image_urls, description, short_message,
                        widget_name, other_data, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        row["title"], row["aff_code"], row["price"], row["old_price"], row["product_id"],
                        row["campaign_id"], row["campaign_url"], row["campaign_name"],
                        row["category"], row["subcategory"], row["brand"], row["product_active"],
                        row["url"], row["image_urls"], row["description"], row["short_message"],
                        row["widget_name"], row["other_data"], row["created_at"]
                    )
                )
            except sqlite3.Error as e:
                print(f"Error inserting row: {e}")

    conn.commit()
    conn.close()

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Root endpoint
@app.get("/")
async def root():
    return {"data": "Documentation is located at /docs"}

# Endpoint: Get all products from the database
@app.get("/products")
async def get_products():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()

    # Convert rows to structured JSON
    products = []
    for row in rows:
        products.append({
            "product": {
                "title": row[1],
                "product_id": row[4],
                "price": row[2],
                "old_price": row[3],
                "product_active": row[11],
                "brand": row[10],
                "category": row[8],
                "subcategory": row[9],
            },
            "campaign": {
                "campaign_id": row[5],
                "campaign_name": row[7],
                "campaign_url": row[6],
            },
            "details": {
                "url": row[12],
                "image_urls": row[13],
                "description": row[14],
                "short_message": row[15],
                "widget_name": row[16],
            },
            "metadata": {
                "aff_code": row[2],
                "created_at": row[19],
                "other_data": row[17],
            }
        })

    conn.close()
    return {"data": products}
@app.get("/products/{product_id}")
async def get_product(product_id: str):
    # Database connection
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Convert row to structured JSON
    product = {
        "id": row[0],
        "product": {
            "title": row[1],
            "product_id": row[4],
            "price": row[2],
            "old_price": row[3],
            "product_active": row[11],
            "brand": row[10],
            "category": row[8],
            "subcategory": row[9],
        },
        "campaign": {
            "campaign_id": row[5],
            "campaign_name": row[7],
            "campaign_url": row[6],
        },
        "details": {

            "url": row[13],
            "description": row[15],
            "images": row[14],
            "widget_name": row[16],
        },
        "metadata": {
            "aff_code": row[2],
            "created_at": row[19],
            "other_data": row[17],
        }
    }

    # Initialize Cloudflare API credentials
    os.environ['CLOUDFLARE_API_KEY'] = "av76jm154SuiQ8wu_4Nm_5tjQRjTB-u2RRJZ_nsS"
    os.environ['CLOUDFLARE_ACCOUNT_ID'] = "e2fa0631e7c2fafc79e68a70a5968569"

    try:
        # Generate AI response using product description
        ai_response = completion(
            model="cloudflare/@cf/meta/llama-2-7b-chat-int8",
            messages=[
                {
                    "role": "user", 
                    "content": f"Generate a brief, engaging description for this product in Romanian always return just the generated content and just that. You will use these content as reference when generating: {product['product']['title']} - {product['details']['description']}"
                }
            ],
        )
        
        # Add AI-generated content to the response
        product["ai_enhanced"] = {
            "description": ai_response.choices[0].message.content if hasattr(ai_response, 'choices') else None
        }
    except Exception as e:
        print(f"Error generating AI content: {e}")
        product["ai_enhanced"] = {
            "generated_description": None,
            "error": "Failed to generate AI content"
        }

    conn.close()
    return {"data": product}

# Endpoint: Get unique categories from the database
@app.get("/categories")
async def get_categories():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT category FROM products")
    categories = [row[0] for row in cursor.fetchall()]
    conn.close()
    return {"unique_categories": categories}





# Initialize database and load data
initialize_database()
load_data_from_csv()

# Run the app
if __name__ == "__main__":
    # Create and run the event loop
    loop = asyncio.get_event_loop()
    loop.run_until_complete(
        uvicorn.run(app, host="0.0.0.0", port=8000)
    )