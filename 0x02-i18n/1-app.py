#!/usr/bin/env python3
'''This modules renders html file to display welcome message
'''

from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """
    configaration for the Flask app.
    Defines the languages timezone.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(config)
babel = Babel(app)


@app.route('/')
def index():
    '''
    Render the index.html template  with a welcome message

    '''
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
