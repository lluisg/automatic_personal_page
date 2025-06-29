#!/bin/bash

echo 'Running install'
pyinstaller --clean --console --onefile -n generate_Portfolio --distpath . generate_html.py

echo
echo 'Adding line'
sed -i "24i\\    Tree('..\\\\\\\\automatic_personal_page\\\\\\\\templates', prefix='templates\\\\\\\\')," generate_Portfolio.spec

echo
echo 'Updating install'
pyinstaller --clean --distpath . generate_Portfolio.spec
