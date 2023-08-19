# https://github.com/khaeru/cjklib/blob/1d7cc8f80707c06b5f3087355b07320633f731f6/cjklib/data/jyutpingsyllables.csv
import csv
import json

csv_file = 'jyutpinginitialfinal.csv'
json_file = 'syllables.json'

data = []
with open(csv_file, 'r', newline='', encoding='utf-8') as csvfile:
    csvreader = csv.reader(csvfile)
    for row in csvreader:
        if not row[0].startswith('#'):
            if len(row) >= 3:
                jyutping = row[0].strip("'")
                initial = row[1].strip("'") if row[1] else ""
                final = row[2].strip("'")
                data.append({"jyutping": jyutping, "initial": initial, "final": final})

with open(json_file, 'w', encoding='utf-8') as jsonfile:
    json.dump(data, jsonfile, indent=4, ensure_ascii=False)
