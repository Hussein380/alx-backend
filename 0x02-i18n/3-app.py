#!/usr/bin/env python3
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """
    Configuration for the Flask app.
    Defines the languages and timezone.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)

babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """
    Determine the best match for supported languages.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """
    Render the index.html template.
    """
    return render_template('3-index.html')


if __name__ == "__main__":
    # Run the Flask app
    app.run(host="0.0.0.0", port=5000)
