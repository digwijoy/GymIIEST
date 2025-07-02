import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# ---------------- Load Recipes Dataset ----------------
recipes_df = pd.read_csv("recipes.csv")

# Remove invalid rows
recipes_df = recipes_df[recipes_df["calories"] != "calories"]

# Convert numeric columns
numeric_cols = [
    "calories", "fatcontent", "saturatedfatcontent", "cholesterolcontent",
    "sodiumcontent", "carbohydratecontent", "fibercontent",
    "sugarcontent", "proteincontent"
]

for col in numeric_cols:
    recipes_df[col] = pd.to_numeric(recipes_df[col], errors="coerce")

recipes_df = recipes_df.dropna(subset=numeric_cols)

# ---------------- Scale Numeric Features ----------------
scaler = StandardScaler()
scaled_features = scaler.fit_transform(recipes_df[numeric_cols])

# ---------------- Fit KNN Model ----------------
knn_model = NearestNeighbors(n_neighbors=10, metric='euclidean')
knn_model.fit(scaled_features)

# ---------------- API ROUTE ----------------
@app.route("/api/predict-plan", methods=["POST"])
def predict_plan():
    data = request.get_json()
    print("ML Backend: Received POST request with data:", data)

    # ---------- User Inputs ----------
    height = data.get("height")
    weight = data.get("weight")
    gender = data.get("gender")
    goal = data.get("goal")
    activity_level = data.get("activityLevel")
    user_diet = data.get("diet")
    cuisine = data.get("cuisine")
    allergens = [a.strip().lower() for a in data.get("allergens", "").split(",") if a.strip()]

    # ---------- BMR Calculation ----------
    if gender == "male":
        bmr = (10 * weight) + (6.25 * height) - (5 * 25) + 5
    elif gender == "female":
        bmr = (10 * weight) + (6.25 * height) - (5 * 25) - 161
    else:
        bmr = (10 * weight) + (6.25 * height) - (5 * 25)

    activity_factor = {
        "sedentary": 1.2,
        "moderate": 1.5,
        "active": 1.8
    }.get(activity_level, 1.2)

    calories_needed = bmr * activity_factor

    if goal == "lose":
        calories_needed *= 0.8
    elif goal == "gain":
        calories_needed *= 1.2

    # ---------- Macro Breakdown ----------
    protein_g = (0.25 * calories_needed) / 4
    fat_g = (0.25 * calories_needed) / 9
    carbs_g = (0.5 * calories_needed) / 4

    # ---------- Filter Recipes ----------
    filtered = recipes_df.copy()
    print(f"ML Backend: Initial filtered recipes count: {len(filtered)}")

    # Diet mapping
    diet_map = {
        "vegetarian": ["balanced", "low carb", "vegan", "weight loss", "high protein"],
        "vegan": ["vegan"],
        "keto": ["keto"],
        "weight loss": ["weight loss"],
        "balanced": ["balanced"],
        "high protein": ["high protein"],
        "low carb": ["low carb"]
    }

    if user_diet:
        possible_diets = diet_map.get(user_diet.lower(), [user_diet.lower()])
        filtered = filtered[
            filtered["diet_type"].str.lower().isin(possible_diets)
        ]
        print(f"ML Backend: Recipes after diet '{user_diet}' filter: {len(filtered)}")

    # Cuisine mapping
    if cuisine:
        cuisine_lower = cuisine.lower()

        cuisine_map = {
            "north indian": "indian",
            "south indian": "indian",
            "east indian": "indian",
            "west indian": "indian",
            "indian": "indian",
            "continental": "continental",
            "chinese": "chinese",
            "mexican": "mexican",
            "french": "french",
            "american": "american",
            "japanese": "japanese",
            "italian": "italian",
            "mediterranean": "mediterranean",
            "thai": "thai"
        }

        mapped_cuisine = cuisine_map.get(cuisine_lower, cuisine_lower)

        filtered_temp = filtered[
            filtered["cuisine"].str.lower().str.contains(mapped_cuisine, na=False)
        ]

        if filtered_temp.empty:
            print(f"ML Backend: No recipes for cuisine '{cuisine}'. Skipping cuisine filter.")
        else:
            filtered = filtered_temp
            print(f"ML Backend: Recipes after cuisine filter: {len(filtered)}")

    if "allergens" in filtered.columns and allergens:
        for allergen in allergens:
            filtered = filtered[
                ~filtered["allergens"].str.lower().str.contains(allergen, na=False)
            ]
        print(f"ML Backend: Recipes after allergens filter: {len(filtered)}")

    if filtered.empty:
        print("ML Backend: No recipes after filtering.")
        return jsonify({"error": "No recipes match your preferences."}), 404

    # ---------- KNN Matching ----------
    user_nutrition = np.array([[calories_needed, fat_g, fat_g * 0.4, 200, 500,
                                carbs_g, 10, 10, protein_g]])
    user_scaled = scaler.transform(user_nutrition)

    filtered_scaled = scaler.transform(filtered[numeric_cols])

    knn_model = NearestNeighbors(
        n_neighbors=min(50, len(filtered)),
        metric="euclidean"
    )
    knn_model.fit(filtered_scaled)
    distances, indices = knn_model.kneighbors(user_scaled)

    matched_recipes = filtered.iloc[indices[0]]

    # ---------- Build 7-Day Meal Plan ----------
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    meal_types = ["breakfast", "lunch", "snacks", "dinner"]

    meal_plan = {}

    for day in days:
        day_meals = {}
        for meal in meal_types:
            meal_options = matched_recipes[
                matched_recipes["meal_type"].str.lower().str.contains(meal, na=False)
            ]
            if not meal_options.empty:
                selected = meal_options.sample(1).iloc[0]
                day_meals[meal] = {
                    "food_name": selected["food_name"],
                    "cuisine": selected.get("cuisine", "Unknown"),
                    "calories": round(selected["calories"], 2),
                    "ingredients": selected.get("ingredients", "Not Available")
                }
            else:
                day_meals[meal] = {
                    "food_name": "Not Available",
                    "cuisine": "N/A",
                    "calories": 0,
                    "ingredients": "N/A"
                }
        meal_plan[day] = day_meals

    # ---------- Response ----------
    return jsonify({
        "calculated_nutrition": {
            "calories": round(calories_needed, 2),
            "proteincontent": round(protein_g, 2),
            "fatcontent": round(fat_g, 2),
            "saturatedfatcontent": round(fat_g * 0.4, 2),
            "carbohydratecontent": round(carbs_g, 2),
            "fibercontent": 10,
            "sugarcontent": 10,
            "cholesterolcontent": 200,
            "sodiumcontent": 500
        },
        "recommended_meals": meal_plan
    })


@app.route("/")
def home():
    return "🚀 7-Day Diet Planner API is Running!"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
