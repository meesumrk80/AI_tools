import pandas as pd
import pickle

from sentence_transformers import SentenceTransformer

# Load dataset
df = pd.read_csv("tools.csv")

# Combine text columns
df["combined_text"] = (
    df["AI_Name"].fillna('') + " " +
    df["Primary_Domain"].fillna('') + " " +
    df["Intelligence_Type"].fillna('') + " " +
    df["Key_Functionality"].fillna('') + " " +
    df["Pricing_Model"].fillna('')
)

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Create embeddings
embeddings = model.encode(
    df["combined_text"].tolist(),
    show_progress_bar=True
)

# Save embeddings
with open("embeddings.pkl", "wb") as f:
    pickle.dump(embeddings, f)

# Save processed dataframe
df.to_pickle("tools.pkl")

print("Model Training Complete")