import sqlite3
import csv
import os
import math
from datetime import datetime
from typing import List, Optional, Dict, Any

from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from sqlalchemy import create_engine, Column, Integer, String, Float, text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

# Configuration
DATABASE_URL = "sqlite:///mobila-products.db"
CSV_FILE = "processed-products.csv"

# SQLAlchemy Setup
Base = declarative_base()
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# FastAPI App
app = FastAPI(
    title="Mobila Moldova Product API",
    description="Comprehensive product management API for Mobila Moldova",
    version="1.1.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Enhanced Product Model
class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    aff_code = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    category = Column(String, index=True)
    subcategory = Column(String, nullable=True)
    brand = Column(String, nullable=True)
    url = Column(String, nullable=True)
    image_urls = Column(String, nullable=True)
    description = Column(String, nullable=True)
    short_message = Column(String, nullable=True)
    created_at = Column(String, nullable=True)

# Pydantic Models for Validation
class ProductSchema(BaseModel):
    id: int
    title: str
    aff_code: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    brand: Optional[str] = None
    url: Optional[str] = None
    image_urls: Optional[str] = None
    description: Optional[str] = None
    short_message: Optional[str] = None
    created_at: Optional[str] = None

    class Config:
        orm_mode = True

class ProductFilterResponse(BaseModel):
    products: List[ProductSchema]
    total_count: int
    page: int
    page_size: int
    total_pages: int

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Database Initialization
def initialize_database():
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully!")

def import_from_csv(db: Session):
    if not os.path.exists(CSV_FILE):
        print(f"Error: CSV file '{CSV_FILE}' not found!")
        return False

    products_added = 0
    try:
        with open(CSV_FILE, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    product = Product(
                        id=int(row.get("id", 0)),
                        title=row.get("title", ""),
                        aff_code=row.get("aff_code"),
                        price=float(row.get("price", 0)) if row.get("price") else None,
                        category=row.get("category"),
                        subcategory=row.get("subcategory"),
                        brand=row.get("brand"),
                        url=row.get("url"),
                        image_urls=row.get("image_urls"),
                        description=row.get("description"),
                        short_message=row.get("short_message"),
                        created_at=row.get("created_at", datetime.now().isoformat())
                    )
                    db.merge(product)
                    products_added += 1
                except Exception as e:
                    print(f"Error processing row: {e}")
                    continue

            db.commit()
            print(f"Successfully imported {products_added} products from CSV")
        return True
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return False

# Enhanced API Endpoints
@app.get("/products", response_model=List[ProductSchema])
def list_products(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000)
):
    products = db.query(Product).offset(skip).limit(limit).all()
    
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    
    return products

@app.get("/categories", response_model=List[str])
def list_categories(db: Session = Depends(get_db)):
    categories = db.query(Product.category).distinct().filter(Product.category.isnot(None)).all()
    
    unique_categories = sorted(
        set(cat[0].strip() for cat in categories if cat[0] and cat[0].strip())
    )
    
    if not unique_categories:
        raise HTTPException(status_code=404, detail="No categories found")
    
    return unique_categories

@app.get("/products/{product_id}", response_model=ProductSchema)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")
    
    return product

@app.post("/products/filter", response_model=ProductFilterResponse)
def advanced_product_filter(
    category: Optional[str] = Query(None, description="Filter by category"),
    subcategory: Optional[str] = Query(None, description="Filter by subcategory"),
    min_price: Optional[float] = Query(None, description="Minimum price filter"),
    max_price: Optional[float] = Query(None, description="Maximum price filter"),
    brand: Optional[str] = Query(None, description="Filter by brand"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Number of items per page"),
    db: Session = Depends(get_db)
):
    """
    Advanced product filtering with comprehensive search and pagination
    """
    try:
        print(f"Request parameters: category={category}, subcategory={subcategory}, min_price={min_price}, max_price={max_price}, brand={brand}, page={page}, page_size={page_size}")
        
        query = db.query(Product)
        
        # Apply filters dynamically
        if category:
            query = query.filter(Product.category.like(f"%{category}%"))
        
        if subcategory:
            query = query.filter(Product.subcategory.like(f"%{subcategory}%"))
        
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        
        if brand:
            query = query.filter(Product.brand.like(f"%{brand}%"))
        
        # Count total results before pagination
        total_count = query.count()
        
        # Calculate pagination
        total_pages = math.ceil(total_count / page_size)
        offset = (page - 1) * page_size
        
        # Apply pagination
        products = query.offset(offset).limit(page_size).all()
        
        if not products:
            raise HTTPException(status_code=404, detail="No products found matching the specified filters")
        
        print(f"Query constructed: {query}")
        print(f"Number of products fetched: {len(products)}")

        return {
            "products": products,
            "total_count": total_count,
            "page": page,
            "page_size": page_size,
            "total_pages": total_pages
        }
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Startup Event
@app.on_event("startup")
async def startup_event():
    print("\nInitializing database...")
    initialize_database()
    
    # Use a new database session for importing
    db = SessionLocal()
    try:
        print("\nImporting data from CSV...")
        import_from_csv(db)
    finally:
        db.close()
    
    print("\nApplication startup complete!")

# Health Check Endpoint
@app.get("/health")
def health_check(): 
    return {"status": "healthy"}