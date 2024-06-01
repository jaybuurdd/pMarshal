import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ForceGraph2D, ForceGraph3D } from 'react-force-graph'
import SpriteText from 'three-spritetext'

import './TransLink.css'

const TransLink = () => {
  const { portfolioName, walletId, transactionHash } = useParams();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [hoveredNode, setHoveredNode] = useState(null)
  const fgRef = useRef()

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      const nodes = [{ id: transactionHash, name: walletId, group: 1 }];
      const links = [];
      const nodeSet = new Set([transactionHash]);

      try {
        const response = await fetch(`https://api3-testnet.nearblocks.io/v1/txns/${transactionHash}`);
        const data = await response.json();

        const start = await fetch(`https://api3-testnet.nearblocks.io/v1/account/${data.txns[0].receiver_account_id}/txns?from=${walletId}`);
        const trace1 = await start.json();
        // console.log('Trace1 data: ', trace1);

        await Promise.all(trace1.txns.map(async (txn) => {
          if (!nodeSet.has(txn.transaction_hash)) {
            nodes.push({ id: txn.transaction_hash, name: txn.receiver_account_id, group: 2 });
            nodeSet.add(txn.transaction_hash);
          }
          links.push({ source: transactionHash, target: txn.transaction_hash });
    
        }));

        setGraphData({ nodes, links })

      } catch (error) {
        console.error('Error fetching transaction details:', error)
      }
    };

    fetchTransactionDetails();
  }, [transactionHash, walletId]);

  useEffect(() => {
    console.log("Updated graph data:", graphData);
  }, [graphData]);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('link').distance(link => 50);
    }
  }, [fgRef, graphData]);

  return (
    <>
    <div className='graph-container'>
      <h1>Transaction Link for {transactionHash}</h1>
      {/* <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel={node => hoveredNode === node.id ? `${node.name} (${node.id})` : ''}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={d => d.value * 0.001}
        onNodeHover={handleNodeHover}
      /> */}
      <ForceGraph3D
         ref={fgRef}
         graphData={graphData}
         nodeAutoColorBy="group"
         nodeLabel={node => `${node.name} (${node.id})`}
         linkDirectionalParticles={2}
         linkDirectionalParticleSpeed={d => d.value * 0.001}
         nodeThreeObject={node => {
           const sprite = new SpriteText(node.name);
           sprite.color = node.color;
           sprite.textHeight = 5;
           return sprite;
         }}
         linkWidth={1}
         nodeRelSize={50}  
       />
    </div>
    </>
  );
};

export default TransLink;