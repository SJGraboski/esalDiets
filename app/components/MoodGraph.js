import React from "React";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

class MoodGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mood: [{x:1, y:1}]
        }
    };

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        return this.setState({
            mood: nextProps.mood
        })
    };

    render () {
        return (
            <div col-md-4>
            <svg width="1200" height="300">

                <VictoryChart>

                    <VictoryLabel
                        x={150}
                        y={150}>
                        Mood
                    </VictoryLabel>

                    <VictoryAxis

                        domain={[1,28]}
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
                        domain={[1,5]}
                        label="Rating"
                    />


                    <VictoryLine
                        style={{data:
              {stroke: "blue", strokeWidth: 2}
            }}
                        data={this.state.mood}
                    />

                </VictoryChart>
            </svg>
                </div>


        );
    }
}

module.exports = MoodGraph;