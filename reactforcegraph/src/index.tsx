import * as React from "react";
import { render } from "react-dom";
import SpriteText from 'three-spritetext';
import ForceGraph3D from 'react-force-graph-3d';

import "./styles.css";

/*const myData = {
  nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' },  { id: 'd' }, { id: 'e' }, { id: 'f' }, { id: 'g' }],
  links: [
    { source: 'a', target: 'b'},
    { source: 'a', target: 'c' },
    { source: 'b', target: 'd'},
    { source: 'b', target: 'e' },
    { source: 'c', target: 'f'},
    { source: 'c', target: 'g' }
  ]
};*/
const myData:any = {
 nodes: [],
 links: []
};
var nbNode = 100;
var nbEdge = 100;
for (let i = 0; i < nbNode; i++) {
  myData.nodes.push({id : i +""});
}
for (let i = 0; i < nbEdge; i++) {
  myData.links.push(
    {
      //id : i ,
    source: '' + (Math.random() * nbNode | 0), 
    target: '' + (Math.random() * nbNode | 0),
});

}

function App() {
  
  return (
    <div className="App">
      <ForceGraph3D
  graphData={myData}
  nodeLabel="id"
  nodeThreeObjectExtend={true}
  nodeThreeObject={function (node: any) {
    // extend link with text sprite
    const sprite = new SpriteText(`${node.id} `);
    sprite.color = '#FF0000';
    sprite.textHeight = 1.5;
    return sprite;
  }}
  linkThreeObjectExtend={true}
  linkThreeObject={function (link: any) {
    // extend link with text sprite
    const sprite = new SpriteText(`${link.source} > ${link.target}`);
    sprite.color = 'lightgrey';
    sprite.textHeight = 1.5;
    return sprite;
  }}
  linkPositionUpdate={(sprite:any, { start, end }:any) => {
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

const rootElement = document.getElementById("root");
render(<App />, rootElement);