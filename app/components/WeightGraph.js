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
        // set state to answers if not null on weight
        if(nextProps.weight[0]){
            // if there's only one element
            if(nextProps.weight.length === 1) {
                //make the second element the same as the first
                var newArray = [nextProps.weight[0], 
                                {x:2, y:nextProps.weight[0].y}];
                return this.setState({
                    weight: newArray
                })
            }
            // otherwise, set state to prop
            else {
                console.log(nextProps.weight)
                return this.setState({
                    weight: nextProps.weight
                })
            }
        }
    };

    render () {
        return (
            <div className="col-md-4">
            <div className="panel panel-default weightpanel">
                <div className="panel-heading weighthead">Weight</div>
                    <div className="panel-body weightbody">
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
                        label="Weight (lbs)"
                    />


                    <VictoryLine
                        style={{data:
              {stroke: "#f54f5b", strokeWidth: 7}
            }}
                        data={this.state.weight}
                    />

                </VictoryChart>
            </svg>
            </div>
            </div>
            </div>

        );
    }
}

module.exports = WeightGraph;