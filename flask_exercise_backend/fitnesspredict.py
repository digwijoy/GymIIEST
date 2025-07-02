# fitnesspredict.py

from flask import Flask, request, jsonify
from flask_cors import CORS  # Make sure to allow CORS!
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import NearestNeighbors

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your CSV data
df = pd.read_csv('fitness.csv')

# Encode categorical columns
encoders = {}
for col in ['BMI_Category', 'Goal', 'Intensity', 'Gender']:
    le = LabelEncoder()
    df[col + '_enc'] = le.fit_transform(df[col])
    encoders[col] = le

# Features used for KNN
feature_cols = ['BMI_Category_enc', 'Goal_enc', 'Intensity_enc', 'Gender_enc']
X = df[feature_cols]

# Train the KNN model
knn = NearestNeighbors(n_neighbors=50, metric='euclidean')
knn.fit(X)

# BMI calculation logic
def compute_bmi_category(weight, height_cm):
    height_m = height_cm / 100
    bmi = weight / (height_m ** 2)
    if bmi < 18.5:
        return 'Underweight'
    elif 18.5 <= bmi < 25:
        return 'Normal'
    elif 25 <= bmi < 30:
        return 'Overweight'
    else:
        return 'Obese'

@app.route("/")
def home():
    return "Fitness Recommendation API is running!"

@app.route("/api/recommend-plan", methods=["POST"])
def recommend_plan():
    data = request.get_json()

    try:
        age = data['age']
        gender = data['gender']
        height = float(data['height'])
        weight = float(data['weight'])
        goal = data['goal']
        intensity = data['intensity']

        # Compute BMI category
        bmi_category = compute_bmi_category(weight, height)

        # Encode user input
        input_dict = {
            'BMI_Category': bmi_category,
            'Goal': goal,
            'Intensity': intensity,
            'Gender': gender
        }

        input_encoded = []
        for col in ['BMI_Category', 'Goal', 'Intensity', 'Gender']:
            if input_dict[col] in encoders[col].classes_:
                val = encoders[col].transform([input_dict[col]])[0]
            else:
                val = 0
            input_encoded.append(val)

        # Find nearest neighbors
        distances, indices = knn.kneighbors([input_encoded])
        similar_rows = df.iloc[indices[0]]

        # Group and pick up to 5 unique exercises per body part
        recommendations = {}
        body_parts = df['Body_Part'].unique()

        for part in body_parts:
            subset = similar_rows[similar_rows['Body_Part'] == part]
            top_exercises = (
                subset
                .sort_values(by=['Calories_Burned_30min', 'MuscleGain_kg_month'], ascending=False)
                .drop_duplicates(subset=['Exercise'])
                .head(5)
            )
            if not top_exercises.empty:
                recommendations[part] = top_exercises[[
                    'Exercise',
                    'Equipment',
                    'Reps',
                    'Sets',
                    'Intensity',
                    'Calories_Burned_30min',
                    'MuscleGain_kg_month'
                ]].to_dict(orient='records')

        # Sum up calories from all recommended exercises
        total_calories = sum(
            ex['Calories_Burned_30min']
            for part in recommendations
            for ex in recommendations[part]
        )
        total_calories = round(total_calories)

        # Estimate weekly burn and weight loss
        estimated_weekly_burn = total_calories * 7
        estimated_weight_loss_kg = round(estimated_weekly_burn / 7700, 2)

        # Build response
        result = {
            "BMI_Category": bmi_category,
            "Recommendations": recommendations
        }

        if goal.lower() == "fat loss":
            result["Total_Estimated_Calories_Burned_Per_Session"] = total_calories
            result["Estimated_Weekly_Calorie_Burn"] = estimated_weekly_burn
            result["Estimated_Weekly_Weight_Loss_kg"] = estimated_weight_loss_kg
            result["Note"] = (
                "Estimates assume you complete all recommended exercises in one session daily. "
                "Actual results vary based on diet, sleep, and consistency."
            )

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
