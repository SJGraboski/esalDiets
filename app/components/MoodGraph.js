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
            <div className="col-md-4">
            <div className="panel panel-default moodpanel">
                <div className="panel-heading moodhead">Mood</div>
                    <div className="panel-body moodbody">
            <svg width="1200" height="300">

                <VictoryChart>

                    

                    <VictoryAxis

                        domain={[1,28]}
                        label="Day"
                        style={{
              axis: {stroke: "black"},
              grid: {strokeWidth: 2},
              ticks: {stroke: "#000000"},
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
              {stroke: "#8cc632", strokeWidth: 7}
            }}
                        data={this.state.mood}
                    />

                </VictoryChart>
            </svg>
            </div>
            </div>
                </div>


        );
    }
}

module.exports = MoodGraph;