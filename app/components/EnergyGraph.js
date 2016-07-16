import React from "React";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

class EnergyGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            energy: [{x:1, y:1}]
        }
    };

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        return this.setState({
            energy: nextProps.energy
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
                        Energy
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
              {stroke: "red", strokeWidth: 2}
            }}
                        data={this.state.energy}
                    />

                </VictoryChart>
            </svg>
            </div>

        );
    }
}

module.exports = EnergyGraph;