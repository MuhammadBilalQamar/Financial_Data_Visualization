import csv
import json

data = []

with open('MonthlyVarDf.csv') as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        # id = rows['suburb']
        data.append(rows)

with open("MonthlyVarDf.json", 'w') as jsonfile:
    jsonfile.write(json.dumps(data, indent=4))