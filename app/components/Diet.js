// Diet page
// ==========

// dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var Navigation = Router.Navigation;

// get components
var Calendar = require('./Calendar/Calendar.js');
var MoodGraph = require('./MoodGraph.js');
var EnergyGraph = require('./EnergyGraph.js');
var WeightGraph = require('./WeightGraph.js');

// bring in bootstrap for modal
var ReactBootstrap = require("react-bootstrap");
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;


// helpers functions
var helpers = require('../utils/helpers.js');
// authentication
var auth = require('../utils/authentication.js');

// create Diet component
var Diet = React.createClass({
	// state initialized for form queries and results
	getInitialState: function() {
		return {
			dietId: null,
			dietName: null,
			dietDescription: null,
			dietCreated: null,
			dietImage: null,
			modal: false,
			answers: [[],[],[]],
			wError: null
		}
	},

	contextTypes: {
	  router: React.PropTypes.object.isRequired
	},
	// check for when we pass in an update to answers.
  componentWillReceiveProps: function(nextProps){
  	helpers.getDietData(nextProps.params.dietId)
		.then(function(result){
			console.log(result);
			var data = result.data;
			return this.setState({
				dietId: nextProps.params.dietId,
				dietName: data.name,
				dietDescription: data.description,
				dietImage: data.dietImage,
				answers: data.answers
			})
		}.bind(this));
  },

	// grab Diet data
	componentWillMount: function(){
		helpers.getDietData(this.props.params.dietId)
		.then(function(result){
			console.log(result);
			var data = result.data;
			return this.setState({
				dietId: this.props.params.dietId,
				dietName: data.name,
				dietDescription: data.description,
				dietImage: data.dietImage,
				answers: data.answers
			})
		}.bind(this));
	},

	// Subscribe to a diet
	subscribe: function() {
		// reset wError state
		this.setState({wError: null});
		console.log(this.props.userId);
		var _this = this;
		var userId = _this.props.userId;
		var dietId = _this.state.dietId;

		console.log(_this.props);
		// grab the answers from the modal
		var mood = ReactDOM.findDOMNode(this.refs.Qone).value;
		var energy = ReactDOM.findDOMNode(this.refs.Qtwo).value;
		var weight = ReactDOM.findDOMNode(this.refs.Qthree).value;

		// if not the answers weren't filled out, give the right err message
		if (!weight) {
			this.setState({
				wError: true
			})
			return;
		}			

		// place the answers in an array
		var newAnswers = [mood, energy, weight]


  	// authenticate user, 
  	// then send answers, token, userId and dietId into subscribe
  	auth.isAuthenticated()
  	.then(function(resp){
	  	return helpers.subscribe(newAnswers, userId, _this.state.dietId, resp.data.token)
	  	// send us to the profile page after we recieve success message
	    .then(function(){
	    	return _this.context.router.push({pathname: '/profile'})
	    })
	    .catch(err => {
	    	_this.setState({
	    		loggedIn: false
	    	})
	    })
  	})
	},

	// open the modal
  showModal() {
    this.setState({modal: true});
  },

  // hide th modal
  hideModal() {
    this.setState({modal: false});
  },

	// render function
	render: function() {
		return (
			<div>
			<div className="container">
			<div className="col-md-12">
			<h1 className="dietPageName">{this.state.dietName}</h1>
			</div>
			</div>
			<div className="row graphContainer">
			<div className="placeholderspace" id="placeholderspace"></div>
			<div className="col-md-12" id="analytics">
				<MoodGraph mood={this.state.answers[0]} />
				<EnergyGraph energy={this.state.answers[1]} />
				<WeightGraph weight={this.state.answers[2]} />
			</div>
			<div className="col-md-12" id="userdata">
			<div className="dietBox">
				<div className="dietUserTitle">{this.state.dietName}</div>
				<div className="dietDes">
				<p className="dietCopy">{this.state.dietDescription}</p>
			</div>
			{ this.props.loggedIn && 
				(
				<div className="text-center">
				<button onClick={this.showModal} type='submit' className="formSubmit">Subscribe</button>
				</div>
				)
			}
			{ !this.props.loggedIn && 
				(
				<div className="text-center">
				<p className='error'>Log In to Subscribe to this Diet!</p>
				</div>
				)
			}
			</div>
			

			</div>
			</div>

			<ButtonToolbar>
			<Modal
          show={this.state.modal}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <h4 className="modalTitle">Entry Report (required)</h4>
             <form>
              <FormGroup controlId="formControlsSelect">
                  <ControlLabel className="modalQuestion">How's your mood?</ControlLabel>
                  <FormControl className="modalEnter" componentClass="select" placeholder="select" ref="Qone">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </FormControl>
                  <ControlLabel className="modalQuestion">How's your energy level?</ControlLabel>
                  <FormControl className="modalEnter" componentClass="select" placeholder="select" ref="Qtwo">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </FormControl>
                  <ControlLabel className="modalQuestion">What is your current weight?</ControlLabel>
                  <FormControl className="modalEnter" type="text" placeholder="Enter weight" ref="Qthree"/>
            			{this.state.wError && (
										<p className='error'>Please Enter a Weight</p>
									)}
              </FormGroup>
              </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="formSubmit" onClick={this.subscribe}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    	</div>

		)
	}
})

module.exports = Diet;