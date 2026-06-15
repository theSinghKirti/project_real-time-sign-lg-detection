"""
One-time conversion script: sign_language_model.keras → sign_language_model.tflite
Run locally with: python convert_to_tflite.py
Then commit the .tflite file and push to GitHub.
"""
import tensorflow as tf

MODEL_PATH = "sign_language_model.keras"
OUTPUT_PATH = "sign_language_model.tflite"

print(f"Loading {MODEL_PATH} ...")
model = tf.keras.models.load_model(MODEL_PATH)

print("Converting to TFLite ...")
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

with open(OUTPUT_PATH, "wb") as f:
    f.write(tflite_model)

print(f"Saved {OUTPUT_PATH}  ({len(tflite_model) / 1024:.1f} KB)")
print("Done! Commit and push sign_language_model.tflite to GitHub.")
