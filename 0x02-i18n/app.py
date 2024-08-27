#!/usr/bin/env python3
'''This modules renders html file to display welcome message
'''

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    '''
    Render the index.html template  with a welcome message

    '''
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0', port=5000)
