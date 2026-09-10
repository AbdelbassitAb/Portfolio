export interface Project {
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  thumbnail: string
  images: { src: string; label: string }[]
  skills: string[]
  github: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    slug: "dq-compass",
    title: "DQ Compass - Data Quality Control Layer",
    shortDescription:
      "A plug-and-play data-quality control layer for spreadsheets and CSV exports: define checks once in a catalogue and get a reproducible quality score plus a tamper-evident audit trail, with no per-file validation code.",
    fullDescription:
      "DQ Compass adds a governance layer over End-User Computing (EUC) applications - the spreadsheets and local scripts that sit outside IT control - so teams can work toward standards like BCBS 239 without rebuilding their systems. You point it at a spreadsheet or CSV export, describe the controls once in a CSV catalogue, and the engine produces a severity-weighted quality scorecard plus a hash-chained evidence pack. It is built from four layers: a code-free Control Catalogue, a DQ Engine that runs reusable pandas checks parameterised by column, a Reporting layer with server-rendered scorecards and coverage matrices, and an Audit layer that stores run snapshots for independent re-execution. It ships with both a dqcompass CLI and a Flask web UI, and needs no database or build step.",
    thumbnail: "/images/projects/dq-compass/home.png",
    images: [
      { src: "/images/projects/dq-compass/home.png", label: "Home" },
      { src: "/images/projects/dq-compass/catalogue.png", label: "Control Catalogue" },
      { src: "/images/projects/dq-compass/data-sources.png", label: "Data Sources" },
      { src: "/images/projects/dq-compass/reporting.png", label: "Reporting" },
      { src: "/images/projects/dq-compass/run-detail.png", label: "Run Detail" },
      { src: "/images/projects/dq-compass/mapping.png", label: "Supervisory Mapping" },
      { src: "/images/projects/dq-compass/runs.png", label: "Run History" },
    ],
    skills: ["Python", "Pandas", "Flask", "Data Quality", "Data Governance", "Audit & Compliance"],
    github: "https://github.com/AbdelbassitAb/DQ_compass",
    highlights: [
      "Evaluates data across six quality dimensions - completeness, validity, uniqueness, consistency, timeliness, and reconciliation - each a reusable pandas function parameterised by column",
      "Controls are defined in a plain CSV catalogue with parameters, so adding a new check needs no code",
      "Produces a severity-weighted composite DQ score, where a high-severity failure counts 5x a low-severity one",
      "Hash-chained, append-only ledgers make the audit trail tamper-evident, and past runs re-execute from stored snapshots to prove reproducibility",
      "Sign-off workflow and supervisory mapping link each control to a regulatory requirement and its evidence",
      "Ships as both a dqcompass CLI and a Flask web app, with 42 tests across schema, connectors, controls, and engine",
    ],
  },
  {
    slug: "mlops-house-price-prediction",
    title: "House Price Prediction - MLOps Pipeline on Snowflake",
    shortDescription:
      "An end-to-end MLOps pipeline built natively in Snowflake: 22 stages from raw S3 ingestion to a tuned XGBoost model (R2 = 0.9151), registered in the Model Registry and served through a Streamlit app.",
    fullDescription:
      "This project runs a full house-price-prediction workflow entirely inside Snowflake, with no export of data to an external environment. The pipeline spans 22 stages across six phases: ingestion of about 1,090 JSON housing records from S3, exploratory analysis with descriptive statistics and correlation matrices, feature preparation (encoding, normalisation, and an 80/20 train/test split), training and comparison of three regressors, hyper-parameter optimisation with GridSearchCV and 3-fold cross-validation, and deployment through the Snowflake Model Registry plus a Streamlit application. XGBoost was selected for production, explaining 91.5% of price variance with the lowest error, and surface area was identified as the strongest single predictor.",
    thumbnail: "/images/projects/mlops/cover.png",
    images: [
      { src: "/images/projects/mlops/cover.png", label: "Overview" },
      { src: "/images/projects/mlops/model-comparison.png", label: "Model Comparison" },
      { src: "/images/projects/mlops/pipeline.png", label: "Pipeline" },
    ],
    skills: ["Snowflake", "Python", "XGBoost", "Machine Learning", "Snowpark", "scikit-learn", "MLOps"],
    github: "https://github.com/AbdelbassitAb/PROJET-MLOPS",
    highlights: [
      "22-stage pipeline across six phases, executed entirely within Snowflake with no external data export",
      "Ingested about 1,090 JSON housing records from S3, with zero missing values in the prepared dataset",
      "Compared Linear Regression, Random Forest, and XGBoost; XGBoost won with MAE 12,757, RMSE 27,517, and R2 0.9151",
      "Tuned hyper-parameters with GridSearchCV and 3-fold cross-validation, keeping the model with the best generalisation",
      "Identified surface area as the strongest driver of sale price through correlation analysis",
      "Registered the final model in the Snowflake Model Registry and exposed predictions through a Streamlit app",
    ],
  },
  {
    slug: "customer-churn-analysis",
    title: "Customer Churn Analysis -- Power BI Dashboard",
    shortDescription:
      "Interactive Power BI dashboard analyzing customer churn across 6,687 customers with a 26.86% churn rate, uncovering key drivers like contract type, demographics, and service patterns.",
    fullDescription:
      "This project analyzes customer churn behavior using the Databel dataset. The objective is to identify the main drivers of churn and provide actionable business insights. The report covers 6,687 total customers with 1,796 churned (26.86% churn rate). The dashboard includes 10 interactive report pages analyzing contract types, demographics, service usage, charges, geographic patterns, and customer behavior. Each page is designed with interactive filters and drill-downs for stakeholder exploration.",
    thumbnail: "/images/projects/churn/overview.png",
    images: [
      { src: "/images/projects/churn/overview.png", label: "Overview" },
      { src: "/images/projects/churn/churn-demographics.png", label: "Churn Demographics" },
      { src: "/images/projects/churn/groups-and-categories.png", label: "Groups & Categories" },
      { src: "/images/projects/churn/unlimited-plan.png", label: "Unlimited Plan" },
      { src: "/images/projects/churn/international-calls.png", label: "International Calls" },
      { src: "/images/projects/churn/contract-type.png", label: "Contract Type" },
      { src: "/images/projects/churn/age-groups.png", label: "Age Groups" },
      { src: "/images/projects/churn/payment-and-contract.png", label: "Payment & Contract" },
      { src: "/images/projects/churn/extra-charges.png", label: "Extra Charges" },
      { src: "/images/projects/churn/insights.png", label: "Insights" },
    ],
    skills: ["Power BI", "DAX", "Data Analysis", "Data Visualization", "KPI Design", "Business Intelligence"],
    github: "https://github.com/AbdelbassitAb/Analyzing-customer-churn---Power-BI",
    highlights: [
      "Monthly contracts show 46.29% churn rate vs 6.62% for yearly contracts",
      "New customers (short account length) show churn above 40-50%, dropping below 10% for long-term customers",
      "Customers on unlimited data plans with lower actual consumption show higher churn rates",
      "Seniors (over 65) show significantly higher churn rates compared to other age groups",
      "Top churn reasons: competitor offers (44.82%), attitude of support (15.98%), and dissatisfaction (15.92%)",
      "International calls feature: customers with active international plans but no calls show 71.19% churn",
    ],
  },
  {
    slug: "hr-attrition-dashboard",
    title: "HR Analytics — Employee Attrition Dashboard",
    shortDescription:
      "Interactive Power BI dashboard built on Atlas Labs HR data (1,470 employees) to track attrition drivers across tenure, overtime, travel, satisfaction, and department exposure.",
    fullDescription:
      "This HR Analytics project focuses on employee attrition analysis to support data-driven retention decisions. The dashboard combines workforce KPIs, demographics, performance and satisfaction tracking, and detailed attrition diagnostics in one navigable report. Built with a star-schema model and dedicated DAX measures table, it highlights risk patterns across early tenure, overtime, frequent travel, and role-level exposure while keeping calculations consistent and maintainable.",
    thumbnail: "/images/projects/hr-attrition/overview.png",
    images: [
      { src: "/images/projects/hr-attrition/overview.png", label: "Overview" },
      { src: "/images/projects/hr-attrition/demographics.png", label: "Demographics" },
      { src: "/images/projects/hr-attrition/performance-tracker.png", label: "Performance Tracker" },
      { src: "/images/projects/hr-attrition/attrition.png", label: "Attrition Analysis" },
    ],
    skills: [
      "Power BI",
      "DAX",
      "Power Query",
      "Data Modeling",
      "HR Analytics",
      "Business Intelligence",
    ],
    github: "https://github.com/AbdelbassitAb/HR-analytics---power-bi",
    highlights: [
      "Overall workforce snapshot: 1,470 employees with ~16.1% attrition (~237 leavers)",
      "Highest attrition appears in early tenure windows, especially the first 1–2 years",
      "Overtime employees show materially higher attrition, acting as a leading risk signal",
      "Frequent business travel correlates with increased turnover compared with non-travel employees",
      "Lower satisfaction scores often precede exits, supporting proactive retention monitoring",
      "Attrition is concentrated in specific departments and roles, suggesting structural team-level issues",
    ],
  },
  {
    slug: "food-beverage-marketing-analytics",
    title: "Food & Beverage - Marketing Analytics Platform",
    shortDescription:
      "End-to-end marketing analytics project combining Snowflake pipelines, Streamlit dashboards, and machine learning to support smarter decisions under tight budget constraints.",
    fullDescription:
      "This project was built for a fictional food and beverage company facing lower sales, a 30% reduction in marketing budget, and a loss of market share. The solution covers the full analytics workflow: ingesting raw CSV, TSV, and JSON data into Snowflake, cleaning and standardizing data through bronze and silver layers, creating stable analytics tables for reuse, and exposing the resulting data product for BI, Streamlit dashboards, and machine learning use cases. The focus is on turning scattered operational data into a reliable analytics foundation for campaign optimization and business decision-making.",
    thumbnail: "/images/projects/food-beverage/Overview.png",
    images: [
      { src: "/images/projects/food-beverage/Overview.png", label: "Overview" },
      { src: "/images/projects/food-beverage/Sales.png", label: "Sales Analysis" },
      { src: "/images/projects/food-beverage/Promotion.png", label: "Promotion Analysis" },
    ],
    skills: [
      "Snowflake",
      "Streamlit",
      "Machine Learning",
      "SQL",
      "Analytics Engineering",
      "Data Cleaning",
    ],
    github: "https://github.com/AbdelbassitAb/FOOD-BEVERAGE",
    highlights: [
      "Built a 3-layer architecture across bronze, silver, and analytics schemas for dependable downstream analysis",
      "Loaded mixed-format source data from CSV, TSV, JSON, and S3 into Snowflake with fit-for-purpose ingestion rules",
      "Applied text cleanup, type harmonization, deduplication, and business validation before analytics consumption",
      "Converted exploratory analysis into reusable analytics tables designed for dashboards, advanced analysis, and ML",
      "Framed the project around marketing optimization during a 30% budget cut and declining market share",
      "Delivered a data product approach focused on reporting, campaign optimization, and future predictive modeling",
    ],
  },
]
