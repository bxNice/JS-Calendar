This is a (Gregorian) calendar web app built with React and using a Flask backend. It fits most screen sizes, devices, and browsers (Internet Explorer is currently unsupported) with the help of the Bootstrap CSS framework. It also features some support for different languages.


This web app is currently deployed on Heroku at: https://btd-calendar.herokuapp.com/


## If you want to make changes...
### Python
Python (available [here](https://www.python.org/downloads/)) is required to run the backend.
- After installing Python it is recommended you create a virtual environment on your own machine by running `python -m venv yourEnvHere` in the project root where "yourEnvHere" is the name you want for the virtual environment root folder.
    - Activate the virtual environent by running `.\yourEnvHere\Scripts\activate` in the project root. The name of your virtual environment should appear in parentheses at the start of the command prompt.
    - Keep the virtual environment active while making any changes to the project or installing any dependencies.
    - You can deactivate the virtual environment by running `deactivate`.
- To install Flask and the other Python dependencies, run `pip install -r requirements.txt` in the project root.
    - Add any dependencies you install to requirements.txt by running `pip freeze > requirements.txt` in the project root.

### JSX
The [JavaScript/React](static/js/main.js) is compiled from [JSX](jsx/main.js).
The babel command-line tool is used for this, and is listed as a dev dependency in [package.JSON](package.json).
- To install babel, run `npm install --only=dev` from the project root (where package.JSON is located).
- To watch the jsx folder and compile to JavaScript when changes are saved, run `npx babel --watch .\jsx --out-dir .\static\js --presets react-app/prod` from the project root.

### SCSS
The [CSS](static/css/main.css) is compiled from [SCSS](sass/main.scss).
- Install info for SCSS/Sass can be found [here](https://sass-lang.com/install).
- To watch the sass folder and compile to CSS when changes are saved, run `sass --watch sass:static\css` from the project root.

### Git
It's recommended to add the following folders to .gitignore:
- /node_modules
- /yourEnvHere
- \_\_pycache__

### Heroku
The [Procfile](Procfile) and [runtime.txt](runtime.txt) files are used when deploying this app on Heroku. If you plan on using Heroku be sure to setup the app with Heroku's Python buildpack, as well as to edit [runtime.txt](runtime.txt) to reflect your installed version of Python.

### React
React is supplied via CDN in the [base template](templates/base.html).

### Bootstrap
The Bootstrap CSS framework is supplied via CDN in the [base template](templates/base.html).