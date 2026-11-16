"""Tiny API that serves your fake-news model to the portfolio demo.

Contract the website expects:
    POST /predict   { "text": "..." }
    ->  200         { "label": "fake" | "real", "confidence": 0.0-1.0 }

Run locally:   pip install -r requirements.txt && python app.py
Host for free: Hugging Face Spaces (Docker or Gradio/Flask), Render, or Railway.
Then paste the full URL (e.g. https://you-fakenews.hf.space/predict) into
fakeNewsApi in src/config.js.

IMPORTANT: load_model() and predict() are placeholders. Plug in your own
trained BERT model; nothing here pretends to classify anything until you do.
"""
import os

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Only let your website call this API. Example: https://YOUR-USERNAME.github.io
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "http://localhost:5173")
CORS(app, origins=[o.strip() for o in ALLOWED_ORIGIN.split(",")])

MAX_CHARS = 2000
_model = None


def load_model():
    """TODO: load your trained BERT model + tokenizer once and return them.

    Example with Hugging Face transformers:
        from transformers import pipeline
        return pipeline("text-classification", model="path/or/hub-id-of-your-model")
    """
    raise NotImplementedError("Load your trained model in load_model()")


def predict(text: str):
    """TODO: return (label, confidence) where label is 'fake' or 'real'.

    Example with the pipeline above:
        out = _model(text[:MAX_CHARS], truncation=True)[0]
        label = "fake" if out["label"].lower() in ("fake", "label_1") else "real"
        return label, float(out["score"])
    """
    raise NotImplementedError("Implement predict() for your model")


@app.get("/")
def health():
    return jsonify(status="ok")


@app.post("/predict")
def predict_route():
    global _model
    data = request.get_json(silent=True) or {}
    text = str(data.get("text", "")).strip()[:MAX_CHARS]
    if not text:
        return jsonify(error="text is required"), 400
    if _model is None:
        _model = load_model()
    label, confidence = predict(text)
    return jsonify(label=label, confidence=round(confidence, 4))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 7860)))
