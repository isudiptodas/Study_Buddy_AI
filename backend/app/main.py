from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, RootModel
from typing import Dict, Any, Optional
from app.model_service import matcher

class InputPayload(RootModel[Dict[str, Any]]):
    pass

app = FastAPI()

# Allow your React app (localhost:3000)
origins = [
    "https://study-buddy-ai-self.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/find-buddy")
def find_buddy(payload: InputPayload, top_k: Optional[int] = 5):
    # ✅ In Pydantic v2, RootModel stores the actual value in `.root`
    data_dict = payload.root

    #print("🔹 Step 1: Request received.")
    #print("🔹 Step 2: Data →", data_dict)
    try:
        matches = matcher.find_matches(data_dict, top_k=top_k)
        #print("🔹 Step 3: Matches computed →", len(matches))
        return matches
    except Exception as e:
        print("❌ Backend error:", e)
        return {"error": str(e)}

