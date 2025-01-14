import sqlite3
import json
import click

# Default configurations
DEFAULT_DB = "mobila-products.db"
DEFAULT_JSON = "/home/frontend/public/data.json"

# Categories, Reviews, Orders, and Shopping Cart data (hardcoded as per your example)
categories_data = [
    {
        "thumb_src": "https://i.imgur.com/EeW8NMp.png",
        "title": "Mobila Barlad",
        "collection": "Office",
        "contact": "<EMAIL>"
    },
    {
        "thumb_src": "https://i.imgur.com/RNeKaGv.png",
        "title": "Mobila Galati",
        "collection": "Partener",
        "contact": "<EMAIL>"
    },
    {
        "thumb_src": "https://i.imgur.com/nfouuxk.png",
        "title": "Mobila Focsani",
        "collection": "Partener",
        "contact": "<EMAIL>"
    }
]

reviews_data = [
    {
        "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        "name": "Andrei Pacuraru",
        "date": "Iulie 17, 2023",
        "rating": 5,
        "comment": "Teava baietii cei mai tari la mobila la comanda chiar ",
        "productID": "01"
    },
    # Add more reviews here as required
]

orders_data = [
    {
        "orderNumber": 23791,
        "products": [
            {"id": "01", "status": "Processed", "quantity": 1, "dateModified": "March 23, 2023"},
            {"id": "02", "status": "Delivered", "quantity": 3, "dateModified": "June 28, 2023"}
        ],
        "payment": {"cardNumber": "0042", "expiringDate": "06/26"},
        "date": "March 23, 2023",
        "address": "362 Ridgewood, Alaska 99669, USA",
        "email": "michael@email.com",
        "phoneNumber": "(808) 791-6935"
    },
    # Add more orders here as required
]

shopping_cart_data = ["01", "02", "03"]
shopping_cart2_data = ["02", "03", "04"]

@click.command()
@click.option("--database", default=DEFAULT_DB, help="Path to the SQLite database.")
@click.option("--output", default=DEFAULT_JSON, help="Path to save the generated JSON file.")
def generate_json(database, output):
    """
    Generate a JSON file from the SQLite database.
    """
    try:
        # Connect to the database
        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        
        # Fetch all products
        cursor.execute("SELECT * FROM products")
        rows = cursor.fetchall()

        # Define the structure
        products = [
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

        # Final data structure
        data = {
            "products": products,
            "categories": categories_data,
            "reviews": reviews_data,
            "orders": orders_data,
            "shoppingCart": shopping_cart_data,
            "shoppingCart2": shopping_cart2_data
        }

        # Write to the JSON file
        with open(output, "w", encoding="utf-8") as json_file:
            json.dump(data, json_file, indent=4, ensure_ascii=False)

        click.echo(f"JSON file generated successfully: {output}")

    except sqlite3.Error as e:
        click.echo(f"Database error: {e}")
    except Exception as e:
        click.echo(f"Error: {e}")
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    generate_json()
