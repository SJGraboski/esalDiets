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
            <div className="col-md-4">
            <div className="panel panel-default energypanel">
                <div className="panel-heading energyhead">Energy</div>
                    <div className="panel-body energybody">
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
                      {stroke: "#f69c16", strokeWidth: 7}
                    }}
                                data={this.state.energy}
                            />

                        </VictoryChart>
                    </svg>
                </div>
            </div>
            </div>

        );
    }
}

module.exports = EnergyGraph;