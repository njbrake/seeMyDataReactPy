import random
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
app = Flask(__name__)

# Config Keys
app.config['MONGO_DBNAME'] = 'bitodb'
app.config['MONGO_URI'] = 'mongodb://test:a12345@ds261332.mlab.com:61332/bitodb'

mongo = PyMongo(app)


# @route   GET request to /random
# @desc    get random number to populate chart
# @access  Public


@app.route('/random', methods=['GET'])
def get_random():
    range = 2000
    rangeX = (0, range)  # range for x values
    rangeY = (0, range)  # range for y values

    # Arbitrarily chose to generate between 30 and 110 data points
    qty = random.randrange(*(30, 110))
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
def add_data1():
    framework = mongo.db.database1
    output = []
    result = framework.delete_many({})
    for q in request.json:
        x = q['x']
        y = q['y']
        framework_id = framework.insert({'x': x, 'y': y})
        output.append({'x': q['x'], 'y': q['y']})
    return jsonify({'result': output})

# @route   POST request to /database2
# @desc    post
# @access  Public


@app.route('/database2', methods=['POST'])
def add_data2():
    framework = mongo.db.database2
    output = []
    result = framework.delete_many({})
    for q in request.json:
        x = q['x']
        y = q['y']
        framework_id = framework.insert({'x': x, 'y': y})
        new_framework = framework.find_one({'_id': framework_id})
        output.append({'x': q['x'], 'y': q['y']})
    return jsonify({'result': output})


# @route   GET request to /database2
# @desc    post
# @access  Public

@app.route('/database2', methods=['GET'])
def get_data2():
    framework = mongo.db.database2
    output = []
    for q in framework.find():
        output.append({'x': q['x'], 'y': q['y']})
    return jsonify({'result': output})


if __name__ == '__main__':
    app.run(debug=True)
