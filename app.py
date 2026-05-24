import pickle
import pandas as pd
import numpy as np
from functools import lru_cache
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# Create app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset
df = pd.read_pickle("tools.pkl")
df["Popularity_Votes"] = pd.to_numeric(df.get("Popularity_Votes", 0), errors="coerce").fillna(0).astype(int)

# Load embeddings
with open("embeddings.pkl", "rb") as f:
    embeddings = pickle.load(f)

@lru_cache(maxsize=1)
def get_model():
    return SentenceTransformer('all-MiniLM-L6-v2')


@app.get("/")
def home():
    return {
        "message": "AI Tool Recommendation API"
    }


@app.get("/search")
def search(query: str):

    # Convert user query to embedding
    query_embedding = get_model().encode([query])

    # Calculate similarity
    similarity_scores = cosine_similarity(
        query_embedding,
        embeddings
    )[0]

    # Top 5 results
    top_indexes = np.argsort(similarity_scores)[::-1][:5]

    results = []

    for idx in top_indexes:

        results.append({
            "tool_name": df.iloc[idx]["AI_Name"],
            "domain": df.iloc[idx]["Primary_Domain"],
            "functionality": df.iloc[idx]["Key_Functionality"],
            "pricing": df.iloc[idx]["Pricing_Model"],
            "website": df.iloc[idx]["Website_URL"],
            "score": float(similarity_scores[idx])
        })

    return {
        "query": query,
        "recommendations": results
    }


@app.get("/categories")
def categories():
    domain_counts = (
        df["Primary_Domain"].fillna("Unknown")
          .value_counts()
          .to_dict()
    )
    return {
        "categories": [
            {"domain": domain, "count": int(count)}
            for domain, count in domain_counts.items()
        ]
    }


@app.get("/trendings")
def trendings(limit: int = 10):
    top_tools = df.sort_values(by="Popularity_Votes", ascending=False).head(limit)
    return {
        "trendings": [
            {
                "tool_name": row["AI_Name"],
                "domain": row["Primary_Domain"],
                "functionality": row["Key_Functionality"],
                "pricing": row["Pricing_Model"],
                "website": row["Website_URL"],
                "popularity_votes": int(row["Popularity_Votes"]),
            }
            for _, row in top_tools.iterrows()
        ]
    }


@app.get("/top-tools")
def top_tools(limit: int = 10, domain: Optional[str] = None, intelligence_type: Optional[str] = None):
    subset = df
    if domain:
        subset = subset[subset["Primary_Domain"].str.contains(domain, case=False, na=False)]
    if intelligence_type:
        subset = subset[subset["Intelligence_Type"].str.contains(intelligence_type, case=False, na=False)]

    top_tools = subset.sort_values(by="Popularity_Votes", ascending=False).head(limit)
    return {
        "top_tools": [
            {
                "tool_name": row["AI_Name"],
                "domain": row["Primary_Domain"],
                "intelligence_type": row["Intelligence_Type"],
                "functionality": row["Key_Functionality"],
                "pricing": row["Pricing_Model"],
                "website": row["Website_URL"],
                "popularity_votes": int(row["Popularity_Votes"]),
            }
            for _, row in top_tools.iterrows()
        ]
    }


@app.get("/tools")
def tools(limit: int = 20, domain: Optional[str] = None, intelligence_type: Optional[str] = None):
    subset = df
    if domain:
        subset = subset[subset["Primary_Domain"].str.contains(domain, case=False, na=False)]
    if intelligence_type:
        subset = subset[subset["Intelligence_Type"].str.contains(intelligence_type, case=False, na=False)]

    top_tools = subset.sort_values(by="Popularity_Votes", ascending=False).head(limit)
    return {
        "tools": [
            {
                "tool_name": row["AI_Name"],
                "domain": row["Primary_Domain"],
                "intelligence_type": row["Intelligence_Type"],
                "functionality": row["Key_Functionality"],
                "pricing": row["Pricing_Model"],
                "website": row["Website_URL"],
                "popularity_votes": int(row["Popularity_Votes"]),
            }
            for _, row in top_tools.iterrows()
        ]
    }
