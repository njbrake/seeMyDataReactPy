import random
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bitodb'
app.config['MONGO_URI'] = 'mongodb://test:a12345@ds261332.mlab.com:61332/bitodb'

mongo = PyMongo(app)

# @route   Get request to /random
# @desc    get random number to populate chart
# @access  Public


@app.route('/random', methods=['GET'])
def get_random():

    rangeX = (0, 2000)  # range for x values
    rangeY = (0, 2000)  # range for y values

    # generate between 0 and 2000 data points
    qty = random.randrange(*(0, 100))
    #qty = 10
    randPoints = []
    i = 0
    while i < qty:
        x = random.randrange(*rangeX)
        y = random.randrange(*rangeY)
        randPoints.append({'x': x, 'y': y})
        i += 1
    return jsonify({'result': randPoints})


# @route   POST request to /database1
# @desc    post
# @access  Public
@app.route('/database1', methods=['POST'])
def add_data():
    framework = mongo.db.database1
    output = []
    for q in request.json:

        x = q['x']
        y = q['y']

        framework_id = framework.insert({'x': x, 'y': y})

        new_framework = framework.find_one({'_id': framework_id})
        output.append({'x': q['x'], 'y': q['y']})
    return jsonify({'result': output})


@app.route('/database1', methods=['GET'])
def get_data():

    framework = mongo.db.database1

    rangeX = (0, 2000)
    rangeY = (0, 2000)
    # generate between 0 and 2000 data points
    qty = random.randrange(*(0, 2000))

    # Generate a set of all points within 200 of the origin, to be used as offsets later
    # There's probably a more efficient way to do this.

    randPoints = []
    excluded = set()
    i = 0
    while i < qty:
        x = random.randrange(*rangeX)
        y = random.randrange(*rangeY)
        if (x, y) in excluded:
            continue
        randPoints.append((x, y))
        i += 1
    print randPoints

    output = []

    for q in framework.find():
        output.append({'x': q['x'], 'y': q['y']})

    return jsonify({'result': output})


@app.route("/")
def about():
    return '<h1>About </h1>'


if __name__ == '__main__':
    app.run(debug=True)
