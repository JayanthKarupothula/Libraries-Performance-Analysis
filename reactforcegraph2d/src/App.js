import React from 'react';
import './style.css';
import ForceGraph2D, { NodeObject } from 'react-force-graph-2d';

const data = {
  nodes: [],
  links: []
};

var nbNode = 100;
var nbEdge = 100;

for (let i = 0; i < nbNode; i++)
  data.nodes.push({ 
    id: i+'',
  });
  for (let i = 0; i < nbEdge; i++)
  data.links.push({ 
    //id: i, 
    //label: 'Edge ' +i,
    source: '' + (Math.random() * nbNode | 0), 
    target: '' + (Math.random() * nbNode | 0),
    
  });

const Graph = () => {
  const size = 20;

  return (
    <ForceGraph2D
      graphData={data}
      
      
      nodeCanvasObject={(node, ctx) => {
        const label = node.id ;
        const { id, name, img, level, x, y } = node;
        ctx.save();

        const imgElement = new Image();
        imgElement.src = img;

        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, (360 * Math.PI) / 180);
        ctx.clip();

        ctx.drawImage(imgElement, x - size / 2, y - size / 2, size, size);
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white'; //node.color;
        ctx.fillText(label, node.x, node.y + 6);
        ctx.restore;
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        const { id, name, img, level, x, y } = node;
        ctx.save();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, (360 * Math.PI) / 180);
        ctx.fill();

        ctx.restore;
      }}
      enableNodeDrag={true}
      linkCanvasObjectMode={(() => 'after')}
      linkCanvasObject={((link, ctx) => {
          const MAX_FONT_SIZE = 4;
          const LABEL_NODE_MARGIN = 1.5;

          const start = link.source;
          const end = link.target;

          // ignore unbound links
          if (typeof start !== 'object' || typeof end !== 'object') return;

          // calculate label positioning
          const textPos = Object.assign(...['x', 'y'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })));

          const relLink = { x: end.x - start.x, y: end.y - start.y };

          const maxTextLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) - LABEL_NODE_MARGIN * 2;

          let textAngle = Math.atan2(relLink.y, relLink.x);
          // maintain label vertical orientation for legibility
          if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
          if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

          const label = `from ${link.source.id} to ${link.target.id}`;

          // estimate fontSize to fit in link length
          ctx.font = '1px Sans-Serif';
          const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width);
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          // draw text label (with background rect)
          ctx.save();
          ctx.translate(textPos.x, textPos.y);
          ctx.rotate(textAngle);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'darkgrey';
          ctx.fillText(label, 0, 0);
          ctx.restore();
      })}
    />
  );
};

export default function App() {
  return <Graph />;
}