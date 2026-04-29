<div align="center">

<!-- Animated Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=LiverDias&fontSize=80&fontColor=02C39A&animation=fadeIn&fontAlignY=35&desc=Liver%20Disease%20Prediction%20via%20Explainable%20Ensemble%20ML&descAlignY=58&descFontColor=a8d5e2&descSize=20" width="100%" />

<br/>

<!-- Badges Row 1 -->
[![Accuracy](https://img.shields.io/badge/Accuracy-93.41%25-02C39A?style=for-the-badge&logo=checkmarx&logoColor=white)](https://github.com)
[![AUC-ROC](https://img.shields.io/badge/AUC--ROC-0.96-028090?style=for-the-badge&logo=databricks&logoColor=white)](https://github.com)
[![Models](https://img.shields.io/badge/Models%20Trained-13+-112C4E?style=for-the-badge&logo=tensorflow&logoColor=02C39A)](https://github.com)

<!-- Badges Row 2 -->
[![Dataset](https://img.shields.io/badge/Dataset-ILPD%20%7C%20583%20Records-0A2342?style=for-the-badge&logo=kaggle&logoColor=white)](https://github.com)
[![SHAP](https://img.shields.io/badge/Explainability-SHAP-02C39A?style=for-the-badge&logo=python&logoColor=white)](https://github.com)
[![University](https://img.shields.io/badge/Chandigarh%20University-Mohali%2C%20India-028090?style=for-the-badge&logo=academia&logoColor=white)](https://github.com)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║  🫀  2 MILLION deaths per year from liver disease globally       ║
║  🔬  Symptoms are silent until irreversible damage occurs        ║
║  🤖  We built an AI that predicts it with 93.41% accuracy        ║
╚══════════════════════════════════════════════════════════════════╝
```

</div>

---

## DEPLOYMENT LINK - 
https://liver-disease-prediction-phi.vercel.app/

## 🧬 The Problem We Are Solving

<table>
<tr>
<td width="33%" align="center">

### 🔕 Silent Disease
The liver has immense regenerative capacity — meaning **symptoms only appear once serious, irreversible damage has already occurred** (cirrhosis). By then, it's often too late.

</td>
<td width="33%" align="center">

### 🏥 Specialist Gap
Developing regions face **severe shortages of hepatologists**. A delay in specialist consultation drastically reduces patient survival rates — especially in rural India.

</td>
<td width="33%" align="center">

### 💡 Our Solution
Using standard **enzymatic blood test data**, our ensemble ML framework identifies at-risk patients with clinical-grade accuracy and provides **explainable AI predictions** for clinicians.

</td>
</tr>
</table>

---

## 🚀 What is LiverDias?

**LiverDias** is a research-grade, explainable machine learning system designed to **predict liver disease from routine blood work** — no specialized imaging, no expensive diagnostics.

The system was trained on the **Indian Liver Patient Dataset (ILPD)** — 583 real patient records from Andhra Pradesh, India — and built an ensemble of 4 powerful tree-based models that together achieve a **93.41% accuracy**, validated with 5-Fold Cross-Validation.

> *"Not just a prediction — an explanation. We believe doctors deserve to understand why the model made a decision."*

---

## 📊 Model Performance

<div align="center">

| Model | Accuracy | Notes |
|:---|:---:|:---|
| Logistic Regression | 74.0% | Baseline |
| Random Forest | 85.3% | Ensemble tree |
| Extra Trees | 87.5% | Randomized tree splits |
| CatBoost (Tuned) | 89.0% | Gradient boosting on categorical |
| CatBoost + LightGBM + XGB | 91.2% | Triple fusion |
| **🏆 CB + LGBM + XGB + ET** | **93.41%** | **Champion Ensemble** |

</div>

```
Accuracy Progression (%)
                                                              ████
                                                    ████      ████
                                          ████      ████      ████
                              ████        ████      ████      ████
                    ████      ████        ████      ████      ████
          ████      ████      ████        ████      ████      ████
  74.0%   85.3%    87.5%     89.0%       91.2%     93.41%
  LR      RF       ExTree    CatBoost    3-Model   CHAMPION 🏆
```

### 🔑 Key Metrics (Champion Model)

- ✅ **Accuracy:** 93.41%
- ✅ **AUC-ROC Score:** 0.96
- ✅ **Validation:** 5-Fold Cross-Validation
- ✅ **Ensemble:** CatBoost + LightGBM + XGBoost + Extra Trees

---

## 🔬 Methodology Pipeline

```
 📦 Data          🔧 Preprocess      ⚙️ Engineer        🤖 Train
 Collection    →  & Clean         →  Features        →  Models
 583 Records      Missing vals,      Interaction        LR, RF, ET,
 10 Variables     Z-score outlier,   terms + log        XGB, LGBM,
 ILPD Dataset     Label encoding     transforms         CatBoost

      ↓                                                     ↓
 📊 Evaluate  ←   🧩 Ensemble     ←  🎛️ Tune          ←  📈 Baseline
 93.41% acc       CB+LGBM+XGB+ET     GridSearchCV        Compare all
 AUC: 0.96        Voting/Stacking    RandomizedCV        architectures
      ↓
 👁️ Explain
 SHAP Values
 Feature Importance
 Clinical Insights
```

### 📋 Steps in Detail

| # | Phase | Description |
|:---:|:---|:---|
| 1️⃣ | **Data Collection** | 583 Indian liver patient records with 10 clinical variables: Age, Gender, TB, DB, Alkphos, SGPT, SGOT, TP, ALB, A/G Ratio |
| 2️⃣ | **Preprocessing** | Missing value imputation, Z-score outlier detection, label encoding for gender |
| 3️⃣ | **Feature Engineering** | `Age_Enzyme` interaction terms and log-transformations on skewed enzymatic features |
| 4️⃣ | **Model Training** | Logistic Regression, Random Forest, Extra Trees, XGBoost, LightGBM, CatBoost |
| 5️⃣ | **Hyperparameter Tuning** | GridSearchCV & RandomizedSearchCV for each tree-based model |
| 6️⃣ | **Ensemble Building** | Voting/Stacking Ensemble: `CB + LGBM + XGB + ET` |
| 7️⃣ | **Explainability** | SHAP (SHapley Additive exPlanations) for global and per-patient feature importance |

---

## 🧪 Dataset: ILPD

| Property | Value |
|:---|:---|
| **Name** | Indian Liver Patient Dataset (ILPD) |
| **Records** | 583 patients |
| **Origin** | Andhra Pradesh, India |
| **Features** | 10 clinical blood-test variables |
| **Target** | Liver Disease: Yes / No |

### 📌 Features Used

```
Age          →  Patient age in years
Gender       →  Male / Female (label-encoded)
TB           →  Total Bilirubin
DB           →  Direct Bilirubin
Alkphos      →  Alkaline Phosphotase (enzyme)
Sgpt/ALT     →  Alanine Aminotransferase
Sgot/AST     →  Aspartate Aminotransferase
TP           →  Total Proteins
ALB          →  Albumin
A/G Ratio    →  Albumin / Globulin Ratio
```

---

## 👁️ Explainability: Why SHAP?

We believe prediction without explanation is incomplete — especially in healthcare.

**SHAP (SHapley Additive exPlanations)** assigns each feature a contribution score for every individual prediction:

- 🔴 Features that **push toward liver disease**
- 🔵 Features that **push away from liver disease**
- 📊 A **global summary** showing the most impactful clinical markers overall

This allows a clinician to understand **not just what the model predicted, but why** — making the system trustworthy and clinically actionable.

---

## 🛠️ Tech Stack

<div align="center">

**Machine Learning**

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-FF6600?style=flat-square&logo=xgboost&logoColor=white)
![LightGBM](https://img.shields.io/badge/LightGBM-02A86B?style=flat-square&logo=lightgbm&logoColor=white)
![CatBoost](https://img.shields.io/badge/CatBoost-FFCC00?style=flat-square&logo=yandex&logoColor=black)
![SHAP](https://img.shields.io/badge/SHAP-8A2BE2?style=flat-square&logo=python&logoColor=white)

**Presentation Web App**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)

</div>

---

## 👨‍🔬 The Team

<div align="center">

<table>
<tr>
<td align="center" width="200">
<br/>
<b>🧑‍💻 Om Singh</b>
<br/>
Researcher & Developer
</td>
<td align="center" width="200">
<br/>
<b>🧑‍💻 Armaan</b>
<br/>
Researcher & Developer
</td>
<td align="center" width="200">
<br/>
<b>🧑‍💻 Nthabiseng Juliet Lefielo</b>
<br/>
Researcher & Developer
</td>
</tr>
</table>

---

**🎓 Under the Guidance of**

### Dr. Vijay Bhardwaj
**Chandigarh University, Mohali, India**

</div>

---

## 🌐 Running the Presentation App

```bash
# Clone the repository
git clone https://github.com/your-repo/liverdias.git
cd liverdias

# Install dependencies
npm install

# Run the development server
npm run dev
```

The interactive presentation app will be live at `http://localhost:5173`

---

## 📌 Project Highlights

```
┌─────────────────────────────────────────────────────────────┐
│  ✅  93.41% accuracy on ILPD — best-in-class result          │
│  ✅  Explainable via SHAP — clinician-friendly               │
│  ✅  Validated with 5-Fold Cross-Validation                  │
│  ✅  Built on real Indian patient data                       │
│  ✅  Ensemble of 4 complementary algorithms                  │
│  ✅  Animated interactive research presentation              │
└─────────────────────────────────────────────────────────────┘
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&animation=fadeIn" width="100%"/>

*Built with ❤️ at Chandigarh University, Mohali, India*

**"Predicting liver disease before it's too late — one blood test at a time."**

</div>
