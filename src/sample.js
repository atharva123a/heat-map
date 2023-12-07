import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { LineGraph } from './LineGraph';
import { BarGraph } from './BarGraph';
import { PieGraph } from './PieGraph';
import { HeatGraph } from './HeatMap';
import { useState } from 'react';

//Data for line Graph
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 3 },
  { x: 2, y: 2 },
  { x: 3, y: 4 },
  { x: 4, y: 3 }
];

//Data for bar Graph
const bardata = [
  { year: '2014', value: 100 },
  { year: '2015', value: 200 },
  { year: '2016', value: 300 },
  { year: '2017', value: 400 },
  { year: '2018', value: 500 },
  { year: '2019', value: 600 },
  { year: '2020', value: 700 }
];

//Data for pie Graph
const piedata = [
  { label: 'Apple', value: 30 },
  { label: 'Orange', value: 50 },
  { label: 'Banana', value: 20 }
];

const nCol = 10;
const nRow = 5;

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
const heatdata = [];
for (let x = 0; x < nCol; x++) {
  for (let y = 0; y < nRow; y++) {
    heatdata.push({
      x: alphabet[x],
      y: alphabet[y],
      value: Math.random() * 40
    });
  }
}

// Component to save responses to database
class SaveData extends Component {
  handleGraphSelection(selectedGraph) {
    console.log(`Selected graph: ${selectedGraph}`);
  }

  render() {
    return null;
  }
}

SaveData.propTypes = {
  steps: PropTypes.object
};

SaveData.defaultProps = {
  steps: undefined
};
// let [displayPieChart, setDisplayPieChart] = useState[false];
// let [displayHeatGraph, setDisplayHeatGraph] = useState[false];
// Component to render steps for conversation
class CocoBot extends Component {
  state = {
    showLineGraph: false,
    chatSteps: []
  };

  handleGraphSelection = graphType => {
    console.log(`graph selected`);
    if (graphType === 'line') {
      this.setState({ showLineGraph: true });
      //   setTimeout(() => {
      //     this.setState({ showLineGraph: false });
      //   }, 3000);
      // Trigger the 'line-example' step
    }
    // Handle other graph types as needed
  };

  render() {
    const { showLineGraph } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <ChatBot
          handleEnd={this.handleEnd}
          style={{ margin: '0 10px' }}
          steps={[
            {
              id: '1',
              message:
                "Hello there! I'm Cocobot, designed to help you understand graphs.",
              trigger: '2'
            },
            {
              id: '2',
              message: 'What is your name?',
              trigger: 'name'
            },
            {
              id: 'name',
              user: true,
              trigger: '3'
            },
            {
              id: '3',
              message: 'Hi {previousValue}! How old are you?',
              trigger: 'age'
            },
            {
              id: 'age',
              user: true,
              trigger: '4',
              validator: value => {
                if (isNaN(value)) {
                  return 'value must be a number';
                } else if (value < 0) {
                  return 'value must be positive';
                } else if (value > 120) {
                  return `${value}? Come on!`;
                }

                return true;
              }
            },
            {
              id: '4',
              message: 'Thanks for the info!',
              trigger: '5'
            },
            {
              id: '5',
              message: "Type of graph you're looking for? ",
              trigger: 'graphs'
            },
            {
              id: 'graphs',
              options: [
                {
                  value: 'Line Graph',
                  label: 'Line Graph',
                  trigger: 'line' // Call your function here
                },
                { value: 'Bar Graph', label: 'Bar Graph', trigger: 'bar' },
                { value: 'Pie Graph', label: 'Pie Graph', trigger: 'pie' },
                { value: 'Heat Map', label: 'Heat Map', trigger: 'heat' }
              ]
            },
            {
              id: 'line',
              message:
                'Line graphs: These are used to show trends in data over time, such as changes in patient outcomes or disease prevalence.',
              trigger: () => {
                this.handleGraphSelection('line');
              }
              //   trigger: 'line-example'
            },
            {
              id: 'line-example',
              component: <LineGraph data={data} />,
              trigger: 'update' // Change this to 'update'
            },
            {
              id: 'bar',
              message:
                'Bar graphs: These are used to compare different categories or groups, such as comparing the incidence of a disease in different age groups or geographic regions.',
              trigger: 'bar-example'
            },
            {
              id: 'bar-example',
              //message:'Here is the Bar graph',
              component: <BarGraph data={bardata} />,
              trigger: 'update'
            },
            {
              id: 'pie',
              message:
                'Pie charts: These are used to show how different categories or groups contribute to a whole, such as the proportion of different diseases in a patient population. ',
              trigger: 'pie-example'
            },
            {
              id: 'pie-example',
              component: <PieGraph data={piedata} />,
              trigger: 'update'
            },
            {
              id: 'heat',
              message:
                'Heat maps: These are used  used to show user behavior on specific web pages or webpage templates for example, where users have clicked on a page.',
              trigger: 'heat-example'
            },
            {
              id: 'heat-example',
              component: <HeatGraph data={heatdata} />,
              trigger: 'update'
            },
            {
              id: 'update',
              message: 'Would you like to learn more about graphs?',
              trigger: 'update-question'
            },
            {
              id: 'update-question',
              options: [
                { value: 'yes', label: 'Yes', trigger: '5' },
                { value: 'no', label: 'No', trigger: 'end-message' }
              ]
            },
            {
              id: 'end-message',
              message: 'Thanks! It was a lovely session!'
              //   trigger: 'save-data'
            }
            // {
            //   id: 'save-data',
            //   component: <SaveData />,
            //   end: true
            // }
          ]}
        />
        <div style={{ margin: '20px 20px' }}>
          {showLineGraph && <LineGraph data={data} />}
        </div>
      </div>
    );
  }
}

export default CocoBot;
