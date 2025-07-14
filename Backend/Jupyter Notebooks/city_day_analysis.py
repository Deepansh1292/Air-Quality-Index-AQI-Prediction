import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

# 1. Load the dataset
file_path = 'city_day.csv'
df = pd.read_csv(file_path)

# 2. Basic Info
print('--- Shape of the dataset ---')
print(df.shape)
print('\n--- Columns and Data Types ---')
print(df.dtypes)

# 3. Missing Values
print('\n--- Missing Values ---')
print(df.isnull().sum())

# 4. Descriptive Statistics
print('\n--- Descriptive Statistics ---')
print(df.describe(include='all'))

# 5. Unique Values for Categorical Columns
print('\n--- Unique Cities ---')
print(df['City'].unique())
print('\n--- Unique AQI Buckets ---')
print(df['AQI_Bucket'].unique())

# 6. Visualizations
plt.figure(figsize=(10,6))
sns.countplot(data=df, x='AQI_Bucket', order=df['AQI_Bucket'].value_counts().index)
plt.title('Distribution of AQI Buckets')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

plt.figure(figsize=(12,6))
sns.histplot(df['AQI'].dropna(), bins=50, kde=True)
plt.title('Distribution of AQI')
plt.xlabel('AQI')
plt.tight_layout()
plt.show()

# Distribution of main pollutants
pollutants = ['PM2.5', 'PM10', 'NO', 'NO2', 'NOx', 'NH3', 'CO', 'SO2', 'O3']
for col in pollutants:
    plt.figure(figsize=(10,4))
    sns.histplot(df[col].dropna(), bins=50, kde=True)
    plt.title(f'Distribution of {col}')
    plt.xlabel(col)
    plt.tight_layout()
    plt.show()

# 7. Correlation Analysis
plt.figure(figsize=(12,8))
sns.heatmap(df[pollutants + ['AQI']].corr(), annot=True, cmap='coolwarm')
plt.title('Correlation Matrix')
plt.tight_layout()
plt.show()

# 8. Outlier Detection (Boxplots)
for col in pollutants + ['AQI']:
    plt.figure(figsize=(10,4))
    sns.boxplot(x=df[col])
    plt.title(f'Boxplot of {col}')
    plt.tight_layout()
    plt.show()

# 9. Time Trends (if Date is usable)
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df_time = df.sort_values('Date')

plt.figure(figsize=(14,6))
sns.lineplot(data=df_time, x='Date', y='AQI')
plt.title('AQI Over Time (All Cities)')
plt.xlabel('Date')
plt.ylabel('AQI')
plt.tight_layout()
plt.show()

# AQI trend for top 3 cities with most data
top_cities = df['City'].value_counts().head(3).index
for city in top_cities:
    city_df = df_time[df_time['City'] == city]
    plt.figure(figsize=(14,4))
    sns.lineplot(data=city_df, x='Date', y='AQI')
    plt.title(f'AQI Over Time in {city}')
    plt.xlabel('Date')
    plt.ylabel('AQI')
    plt.tight_layout()
    plt.show()

print('\n--- Analysis Complete ---') 