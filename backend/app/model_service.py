# app/model_service.py
from typing import List, Dict
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os
import re

DATA_PATH = os.path.join(os.path.dirname(__file__), "data.csv")

class Matcher:
    def __init__(self):
        print("🔹 Loading data from:", DATA_PATH)
        self.df = pd.read_csv(DATA_PATH)

        # --- Clean column names: remove newlines, multiple spaces, trailing spaces ---
        self.df.columns = [re.sub(r'\s+', ' ', c).strip() for c in self.df.columns]

        # --- Clean string values: remove trailing/leading spaces from all object columns ---
        for col in self.df.select_dtypes(include=['object']).columns:
            self.df[col] = self.df[col].astype(str).str.strip()

        # --- Keep only relevant columns ---
        keep = [
            "Club top1",
            "Teamwork preference",
            "Introversion extraversion",
            "Books read past year",
            "Weekly_hobby_hours"
        ]
        keep = [col for col in keep if col in self.df.columns]
        self.df = self.df[keep].fillna("")

        # --- Build one-hot features ---
        self.feature_df = pd.get_dummies(self.df, drop_first=False)
        self.feature_columns = list(self.feature_df.columns)
        self.feature_matrix = self.feature_df.values.astype(float)
        print("✅ Data loaded successfully:", self.df.shape)

    def vectorize_input(self, input_dict: Dict) -> np.ndarray:
        # Clean incoming keys and values (same cleaning as CSV)
        cleaned_input = {}
        for k, v in input_dict.items():
            clean_k = re.sub(r'\s+', ' ', k).strip()
            cleaned_input[clean_k] = str(v).strip() if isinstance(v, str) else v

        row = pd.DataFrame([cleaned_input]).fillna("")
        row_oh = pd.get_dummies(row, drop_first=False)
        row_aligned = pd.DataFrame(0, index=[0], columns=self.feature_columns)
        for col in row_oh.columns:
            if col in row_aligned.columns:
                row_aligned.at[0, col] = row_oh.at[0, col]
        return row_aligned.values.astype(float)

    def find_matches(self, input_dict: Dict, top_k: int = 5) -> List[Dict]:
        try:
            user_vec = self.vectorize_input(input_dict)
            sims = cosine_similarity(user_vec, self.feature_matrix)[0]
            top_idx = np.argsort(-sims)[:top_k]
            results = []
            for i in top_idx:
                row = self.df.iloc[i].to_dict()
                row["_similarity"] = float(sims[i])
                results.append(row)
            return results
        except Exception as e:
            print("❌ Error in find_matches:", e)
            return []

# ✅ Create the matcher instance that main.py will import
matcher = Matcher()
