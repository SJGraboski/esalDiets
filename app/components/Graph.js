import React from "React";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

class HelloWorld extends React.Component {
    render () {
        return (
            <svg width="1200" height="600">

                <VictoryChart>

                    <VictoryLabel
                        x={150}
                        y={10}>
                        Mood and Energy
                    </VictoryLabel>

                    <VictoryAxis

                        // domain={[1,28]}
                        label="Day"
                        style={{
                      axis: {stroke: "black"},
                      grid: {strokeWidth: 2},
                      ticks: {stroke: "red"},
                      tickLabels: {fontSize: 12},
                      axisLabel: {fontsize: 16}
                            }}
                    />

                    <VictoryAxis
                        dependentAxis
                        domain={[1,10]}
                        label="Rating"
                    />


                    <VictoryLine
                        style={{data:
                      {stroke: "red", strokeWidth: 6}
                    }}
                        data={[
                      {x: 1, y: 1},
                      {x: 3, y: 3},
                      {x: 10, y: 2},
                      {x: 14, y: 4},
                      {x: 23, y: 3},
                      {x: 28, y: 10}
                    ]}
                    />

                    <VictoryLine
                        style={{data:
                      {stroke: "blue", strokeWidth: 6}
                     }}

                        data={[
                      {x: 1, y: 5},
                      {x: 6, y: 5},
                      {x: 11, y: 4},
                      {x: 15, y: 6},
                      {x: 19, y: 8},
                      {x: 28, y: 9}
                     ]}

                    />

                    <VictoryLine
                        style={{data:
                        {stroke: "green", strokeWidth: 6}
                        }}

                        data={[
                      {x: 1, y: 20.0},
                      {x: 5, y: 20.2},
                      {x: 14, y: 19.8},
                      {x: 16, y: 19.7},
                      {x: 20, y: 19.4},
                      {x: 28, y: 19.0}
                    ]}

                    />
                </VictoryChart>
            </svg>


        );
    }
}

module.exports = HelloWorld;