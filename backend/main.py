import sqlite3
import csv
import os
from litellm import completion
import time
from datetime import datetime

# Configuration
DATABASE = "mobila-new.db"
CSV_FILE = "mobila.csv"

# Cloudflare credentials
os.environ['CLOUDFLARE_API_KEY'] = "av76jm154SuiQ8wu_4Nm_5tjQRjTB-u2RRJZ_nsS"
os.environ['CLOUDFLARE_ACCOUNT_ID'] = "e2fa0631e7c2fafc79e68a70a5968569"

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
            created_at TEXT,
            ai_description TEXT,
            ai_generated_at TEXT
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
        with open(CSV_FILE, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
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

def generate_ai_descriptions():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    try:
        # Get products without AI descriptions
        cursor.execute("SELECT id, title, description FROM products WHERE ai_description IS NULL")
        products = cursor.fetchall()
        
        total_products = len(products)
        print(f"Found {total_products} products needing AI descriptions")
        
        for index, product in enumerate(products, 1):
            product_id, title, description = product
            
            try:
                print(f"\nProcessing product {index}/{total_products}")
                print(f"ID: {product_id}")
                print(f"Title: {title[:50]}...")
                
                # Generate AI description
                ai_response = completion(
                    model="cloudflare/@hf/thebloke/llama-2-13b-chat-awq",
                    messages=[
                        {
                            "role": "user", 
                            "content": f"Generate 250 words brief, engaging description for this product in Romanian always return just the generated content and just that. You will use these content as reference when generating: {title} - {description}"
                        }
                    ],
                )
                
                # Extract and save generated description
                generated_description = ai_response.choices[0].message.content
                
                cursor.execute(
                    "UPDATE products SET ai_description = ?, ai_generated_at = ? WHERE id = ?",
                    (generated_description, datetime.now().isoformat(), product_id)
                )
                conn.commit()
                
                print("✓ AI description generated and saved")
                print(f"Progress: {index}/{total_products} ({(index/total_products)*100:.1f}%)")
                
                # Delay to avoid rate limiting
                time.sleep(1)
                
            except Exception as e:
                print(f"× Error processing product {product_id}: {str(e)}")
                continue
                
    except Exception as e:
        print(f"Error: {str(e)}")
    
    finally:
        conn.close()
        print("\nProcessing completed!")

def main():
    print("Starting process...")
    
    # Initialize database
    print("\n1. Initializing database...")
    initialize_database()
    
    # Import CSV data
    print("\n2. Importing data from CSV...")
    if import_from_csv():
        # Generate AI descriptions
        print("\n3. Generating AI descriptions...")
        generate_ai_descriptions()
    else:
        print("Skipping AI generation due to CSV import failure")
    
    print("\nProcess completed!")

if __name__ == "__main__":
    main()