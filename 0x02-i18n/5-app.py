#!/usr/bin/env python3
"""A Basic Flask app with internationalization support and mock login.
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, _


class Config:
    """Represents a Flask Babel configuration."""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)

# Mock database of users
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> dict:
    """Retrieves a user dictionary or None if not found."""
    user_id = request.args.get('login_as')
    if user_id:
        try:
            user_id = int(user_id)
            return users.get(user_id)
        except ValueError:
            return None
    return None


@app.before_request
def before_request():
    """Executed before all other requests."""
    g.user = get_user()


@babel.localeselector
def get_locale() -> str:
    """Determines the best match for supported languages."""
    locale = request.args.get('locale')
    if locale in app.config["LANGUAGES"]:
        return locale
    if g.user and g.user.get('locale') in app.config["LANGUAGES"]:
        return g.user.get('locale')
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route('/')
def get_index() -> str:
    """The home/index page."""
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
