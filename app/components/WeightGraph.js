import React from "React";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

class WeightGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: [{x:1, y:1}]
        }
    };

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        return this.setState({
            weight: nextProps.weight
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
                        Weight
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
                        label="Weight (lbs)"
                    />


                    <VictoryLine
                        style={{data:
              {stroke: "orange", strokeWidth: 2}
            }}
                        data={this.state.weight}
                    />

                </VictoryChart>
            </svg>
            </div>

        );
    }
}

module.exports = WeightGraph;