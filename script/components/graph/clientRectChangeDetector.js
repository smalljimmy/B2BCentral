import * as React from "react";
import * as ReactDOM from "react-dom";

export default class ClientRectChangeDetector extends React.Component {

	constructor(props) {
		super(props);
    	this.intervalId = undefined;
    	this.rect = undefined;
    	this.tick = this.tick.bind(this);
     }
 
     tick() {
         const container = ReactDOM.findDOMNode(this.refs.container).getBoundingClientRect();
         this.rect = this.rect 
             ? this.rect 
             : {
                 left: container.left,
                 right: container.right,
                 top: container.top,
                 bottom: container.bottom,
             };
              
         const stateHasChanged = this.rect.left !== container.left 
             || this.rect.right !== container.right
             || this.rect.top !== container.top
             || this.rect.bottom !== container.bottom;
 
         if(stateHasChanged) {
             this.rect = {
                 left: container.left,
                 right: container.right,
                 top: container.top,
                 bottom: container.bottom,
             };
             this.props.onChange();
         }
     };
 
     componentDidMount() {
         this.intervalId = setInterval(this.tick, 20);
     }
 
     componentWillUnmount() {
         clearInterval(this.intervalId);
     }
 
     render() {
         return <div ref="container" className="client-rect-change-detector">&nbsp;</div>;
     }
 }