# Automatic Portfolio Generator

This repository allows to create a portfolio HTML page automatically, using an .exe file.

## Create .exe file

### Prerequisites
Install everything with pip
```
pip install -r requirements.txt
```

### Creation

**Run the script**

```
./update_generator.sh
```

#### What it does

- Run the following command
```
pyinstaller --clean --console --onefile -n generate_Portfolio --distpath . generate_html.py
```
This will create a generate_Portfolio.exe and generate_Portfolio.spec files.

- Modify the .spec file, adding the following the Tree line on it
```
exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    Tree('..\\automatic_personal_page\\templates', prefix='templates\\'),
    ...
)
```

- And run again pointing to the spec file
```
pyinstaller --clean --distpath . generate_Portfolio.spec
```

With this the .exe file is ready to use.
