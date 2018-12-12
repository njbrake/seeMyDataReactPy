import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Label,
  CartesianGrid
} from 'recharts';

class Chart extends React.Component {
  render() {
    return (
      <LineChart
        width={1300}
        height={500}
        data={this.props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x">
          <Label value="X Values" offset={0} position="bottom" />
        </XAxis>
        <YAxis
          label={{ value: 'Y Values', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          name="Example Line"
          type="monotone"
          dataKey="y"
          stroke="#82ca9d"
        />
      </LineChart>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.object.isRequired
};

export default Chart;
