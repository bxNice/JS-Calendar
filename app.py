from flask import Flask, render_template

app = Flask(__name__)
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.route('/')
def calendar():
    return render_template('calendar.html')


if __name__ == "__main__":
    app.run(debug=True)
