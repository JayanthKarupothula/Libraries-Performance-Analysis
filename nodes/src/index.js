import * as React from "react";
import { render } from "react-dom";
import SpriteText from 'three-spritetext';
import ForceGraph3D from 'react-force-graph-3d';
import axios from 'axios';
import "./styles.css";


class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        newNames:[]
      };
    }
  
    handleChange=(event)=>{
      this.setState({value: event.target.value});
    }

    sendData = ()=>{ 
      const body=`{
        {
            \"ClassName\": \"${this.state.value}\",
            \"ClassAttributes\": []
        }
      }`  
      console.log(body)
    }
  
    handleSubmit=(event) =>{
      const temp = [...this.state.newNames]
      temp.push(this.state.value)
      console.log({temp})
      this.setState({
        value:'',
        newNames: [...temp]
      })
    }
  
    render() {
      return (
        <React.Fragment>
          <label>
            Name:
            <input type="text" onChange={this.handleChange} />
          </label>
          <button  onClick={()=>this.handleSubmit()}>Add</button>
          <button onClick={()=>this.sendData()}>Send Data</button>
          <div>
            <GraphUI newNames={this.state.newNames}/>
          </div>
        </React.Fragment>
      );
    }
  }

function GraphUI(props) {
console.log({props})
  const myData = {
    nodes: [],
    links: []
   };
  for (let i = 0; i < props.newNames.length; i++) {
    myData.nodes.push({id : props.newNames[i]});
  }

  return (
    
    <div className="GraphUI">
      <ForceGraph3D
        graphData={myData}
        nodeLabel="id"
        nodeThreeObjectExtend={true}
        nodeThreeObject={function (node) {
          // extend link with text sprite
          const sprite = new SpriteText(`${node.id} `);
          sprite.color = '#FF0000';
          sprite.textHeight = 1.5;
          return sprite;
        }}
        linkThreeObjectExtend={true}
        linkThreeObject={function (link) {
          // extend link with text sprite
          const sprite = new SpriteText(`${link.source} > ${link.target}`);
          sprite.color = 'lightgrey';
          sprite.textHeight = 1.5;
          return sprite;
        }}
        linkPositionUpdate={(sprite, { start, end }) => {
          const middlePos = Object.assign({},...['x', 'y', 'z'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })));

          // Position sprite
          Object.assign(sprite.position, middlePos);
          return true;
        }}
      />
      ;
    </div>
  );
}

const  App = () => {
  
    return (
      <div className="App">
          <NameForm />
      </div>
    );

  
}

const rootElement = document.getElementById("root");
render(< App />, rootElement);