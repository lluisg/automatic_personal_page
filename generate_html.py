import os
import sys
from datetime import datetime
import math
import pandas as pd
import json
from jinja2 import Environment, FileSystemLoader

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

def load_csv_as_json(filepath):
    """Load a CSV file and convert it into a dictionary with sheets as keys."""
    # Read all sheets into a dictionary
    sheets_dict = pd.read_excel(filepath, sheet_name=None, dtype=str)

    # Convert each DataFrame to a dictionary (optional)
    sheets_dict = {sheet: df.to_dict(orient="records") for sheet, df in sheets_dict.items()}

    return sheets_dict

def clean_data(data):
    cleaned_data = data.copy()

    # dict skills by skill type
    cleaned_data['SKILLS'] = {}
    for skill in data["SKILLS"]:
        skill_type = skill["TYPE"]
        if skill_type not in cleaned_data['SKILLS']:
           cleaned_data['SKILLS'][skill_type] = []
        cleaned_data['SKILLS'][skill_type].append(skill)

    # dict extra info by id
    cleaned_data['EXTRA_INFO'] = {}
    for einfo in data["EXTRA_INFO"]:
        cleaned_data['EXTRA_INFO'][einfo['ID']] = einfo

    # project types comma separated to list
    cleaned_data['PROJECTS'] = []
    for PROJECT in data["PROJECTS"]:
        cleaned_data['PROJECTS'].append(PROJECT)

        if isinstance(cleaned_data['PROJECTS'][-1]['TYPES'], str):
          cleaned_data['PROJECTS'][-1]['TYPES'] = cleaned_data['PROJECTS'][-1]['TYPES'].split(',')
        else:
          cleaned_data['PROJECTS'][-1]['TYPES'] = []

        if isinstance(cleaned_data['PROJECTS'][-1]['LINKS'], str):
          cleaned_data['PROJECTS'][-1]['LINKS'] = cleaned_data['PROJECTS'][-1]['LINKS'].split(',')
        else:
          cleaned_data['PROJECTS'][-1]['LINKS'] = []

    return cleaned_data


def render_file(data, template, outpath):
    templates_path = resource_path("./templates")

    env = Environment(loader=FileSystemLoader(templates_path))
    template = env.get_template(template)

    output_file = template.render(data=data)
    # Save output
    with open(outpath, "w", encoding="utf-8") as f:
        f.write(output_file)


def remove_empty_lines(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Remove empty lines
    cleaned_lines = [line for line in lines if line.strip()]

    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(cleaned_lines)


def save_json(data, filepath):
    # Print or save the JSON output
    json_output = json.dumps(data, indent=4)
    # print(json_output)

    # Save as JSON file (optional)
    with open(filepath, "w") as jf:
        jf.write(json_output)


def main():
    """Main function to load CSV as JSON and print the result."""
    csv_file = "./information.xlsx"

    json_file = "output_json.json"
    html_file = 'base.html'
    scripts_file = 'scripts.js'
    css_file = 'css_styles.css'

    output_folder = './generated'
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    output_file = 'index.html'

    # Load data
    data_dict = load_csv_as_json(csv_file)
    data_dict = clean_data(data_dict)

    # Save json
    save_json(data_dict, os.path.join(output_folder, json_file))

    # Render html
    render_file(data_dict, html_file, output_file)
    remove_empty_lines(output_file)

    # Render javascript scripts
    render_file(data_dict, scripts_file, os.path.join(output_folder, scripts_file))

    # Render css file
    render_file(data_dict, css_file, os.path.join(output_folder, css_file))

    current_time = datetime.now().strftime("%H:%M:%S")
    print('rendered at', current_time)


if __name__ == "__main__":
    main()
