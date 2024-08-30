var nodeInfo, nodeArray, edgeArray, container, data, options;

function init_network() 
{    
    nodeInfo = {
        'threeOneOne': {
            id: 'threeOneOne',
            html: '311',
            color: 'colorHere',
            relSize: 'sizeHere'
        },
        'BICRE': {
            id: 'BICRE',
            html: 'bicre',
            color: 'colorHere',
            relSize: 'sizeHere'
        },
        'MBTA': {
            id: 'MBTA',
            html: 'mbta-analysis',
            color: 'colorHere',
            relSize: 'sizeHere'
        },
        'ROVE': {
            id: 'ROVE',
            html: 'rove',
            color: 'colorHere',
            relSize: 'sizeHere'
        },
        'AI': {
            id: 'AI',
            html: 'ai-chord-prediction',
            color: 'colorHere',
            relSize: 'sizeHere'
        }
    };

    nodeArray = [
        {id: 'threeOneOne', label: '311 Infra Issue Identifier', color: "#FFFFFF", shape: 'dot', size: 10},
        {id: 'BICRE', label: "BICRE", color: "#FFFFFF", shape: 'dot', size: 10},
        {id: 'MBTA', label: 'MBTA Data Analysis', color: "#FFFFFF", shape: 'dot', size: 10},
        {id: 'ROVE', label: 'ROVE', color: "#FFFFFF", shape: 'dot', size: 10},
        {id: 'AI', label: 'AI Chord Recognition/Prediction Model', color: "#FFFFFF", shape: 'dot', size: 10} 
    ];

    edgeArray = [
        {from: 'ROVE', to: 'threeOneOne', color: '#ed8b00', background: {enabled: true, size: 15, color: '#ed8b00'}, length: 300, smooth: {enabled: true, type: 'discrete', forceDirection: 'none', roundness: 0}},
        {from: 'threeOneOne', to: 'AI', color: '#ed8b00', background: {enabled: true, size: 15, color: '#ed8b00'}, length: 250, smooth: {enabled: true, type: 'discrete', forceDirection: 'none', roundness: 0}},
        {from: 'threeOneOne', to: 'MBTA', color: '#00843d', background: {enabled: true, size: 15, color: '#00843d'}, length: 325, smooth: {enabled: true, type: 'discrete', forceDirection: 'none', roundness: 0}},
        // {from: 'MBTA', to: 'BICRE', color: '#00843d', background: {enabled: true, size: 15, color: '#00843d'}, length: 190, smooth: {enabled: true, type: 'discrete', forceDirection: 'none', roundness: 0}},
        {from: 'AI', to: 'BICRE', color: '#ed8b00', background: {enabled: true, size: 15, color: '#ed8b00'}, length: 200, smooth: {enabled: true, type: 'discrete', forceDirection: 'none', roundness: 0}}
    ];

    var nodes = new vis.DataSet(nodeArray);
    var edges = new vis.DataSet(edgeArray);

    container = document.getElementById("network_map");
    data = {
        nodes: nodes,
        edges: edges
    };
    options = {
        layout: {randomSeed: '0.4354599665758836:1724964443030'},
        physics: {
            hierarchicalRepulsion: {
                avoidOverlap: 1,},
            repulsion: {
                springConstant: 0.9,
                centralGravity: 0.05,
                nodeDistance: 200
            },
            solver: 'repulsion'
        },
        nodes: {
            font: {
                size: 35,
            }
        },
        interaction: {
            dragNodes: false,
            dragView: false,
            zoomView: false
        }
    };
}

init_network();

var network = new vis.Network(container, data, options);
var lastNodeSelectionHTMLID = false;

network.on('selectNode', function(params) {
    if (params.nodes.length === 1) {
        if (lastNodeSelectionHTMLID !== false) document.getElementById(lastNodeSelectionHTMLID).style.display = 'none';
        let selectedNode = params.nodes[0];
        let htmlID = nodeInfo[selectedNode]['html'];
        document.getElementById(htmlID).style.display = 'block';
        lastNodeSelectionHTMLID = htmlID;
    }
});

network.on('deselectNode', function(params) {
    if (params.previousSelection.nodes.length === 1) {
        if (lastNodeSelectionHTMLID !== false) document.getElementById(lastNodeSelectionHTMLID).style.display = 'none';
    }
});