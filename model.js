var nodeHTMLID, nodeArray, edgeArray, container, data, options;

// NODE CONSTANTS
const NODE_SIZE = 15;
const NODE_COLOR = "#FFFFFF";
const NODE_SHAPE = 'dot';

// EDGE CONSTANTS
const OL_COLOR = '#ed8b00';
const GL_COLOR = '#00843d';
const RL_COLOR = '#da291c';
const EDGE_SMOOTH = {enabled: true, type: 'discrete', forceDirection: 'none', roundness: 0};
const EDGE_SIZE = 15;

function init_network() 
{    
    // Maps the node ID to the HTML ID it corresponds to.
    // For nodes which are a direct link, must have the literal 'link' in the keyname, with the value storing the link address itself
    nodeHTMLID= {
        'threeOneOne': '311',
        'BICRE-OL': 'bicre',
        'BICRE-GL': 'bicre',
        'MBTA': 'mbta-analysis',
        'ROVE': 'rove',
        'AI': 'ai-chord-prediction',
        'intro': 'brief-intro',
        'neu': 'northeastern-intro',
        'wishroute': 'wishroute',
        'trans': 'transportation',
        'NL': 'netherlands',
        'career-RL': 'career-path',
        'career-GL': 'career-path',
        'BCU-OLRL': 'BCU',
        'BCU-GL': 'BCU',
        'contact-RL': 'contact-info',
        'contact-GL': 'contact-info',
        'resume-link': 'resume.html',
    };

    // Nodes which are on two or more lines must have a second node with an offset of -30 in the x direction.
    // These nodes should be denoted with -[line abbreviation] (ex: OL --> Orange Line)
    nodeArray = [
        {id: 'threeOneOne', label: '311 Infra Issue Identifier', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 70, y:-300},

        {id: 'BICRE-OL', label: "BICRE", color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 70, y: -100},
        {id: 'BICRE-GL', label: "", color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 40, y: -100},

        {id: 'MBTA', label: 'MBTA Data Analysis', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 270, y: 150},

        {id: 'ROVE', label: 'ROVE', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 70, y: -200},

        {id: 'AI', label: 'AI Chord Recognition/\nPrediction Model', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 290, y: 330},

        {id: 'intro', label: 'About me', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: -230, y: -300},

        {id: 'neu', label: 'Northeastern', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: -210, y: -200},

        {id: 'wishroute', label: 'Wishroute, Inc.', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: -130, y: -130},

        {id: 'trans', label: 'Transportation', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 370, y: -200},

        {id: 'NL', label: 'Netherlands', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 310, y: -100},

        {id: 'career-RL', label: 'Career Path', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: -10, y: 150},
        {id: 'career-GL', label: '', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: -40, y: 150},

        {id: 'BCU-OLRL', label: 'Boston Cyclist Union', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 70, y: 0},
        {id: 'BCU-GL', label: '', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: 40, y: 0},

        {id: 'contact-RL', label: 'Contact Info', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: -50, y: 300},
        {id: 'contact-GL', label: '', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: -80, y: 300},

        {id: 'resume-link', label: 'Resume', color: NODE_COLOR, shape: NODE_SHAPE, size: NODE_SIZE, x: -50, y: 400}

    ];

    edgeArray = [
        // Orange Line
        {from: 'threeOneOne', to: 'ROVE', color: OL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: OL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'ROVE', to: 'BICRE-OL', color: OL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: OL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'BICRE-OL', to: 'BCU-OLRL', color: OL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: OL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'BCU-OLRL', to: 'MBTA', color: OL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: OL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'MBTA', to: 'AI', color: OL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: OL_COLOR}, smooth:EDGE_SMOOTH},

        // Green Line
        {from: 'intro', to: 'neu', color: GL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: GL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'neu', to: 'wishroute', color: GL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: GL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'wishroute', to: 'BICRE-GL', color: GL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: GL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'BICRE-GL', to: 'BCU-GL', color: GL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: GL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'BCU-GL', to: 'career-GL', color: GL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: GL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'career-GL', to: 'contact-GL', color: GL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: GL_COLOR}, smooth: EDGE_SMOOTH},

        // Red Line
        {from: 'trans', to: 'NL', color: RL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: RL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'NL', to: 'BCU-OLRL', color: RL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: RL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'BCU-OLRL', to: 'career-RL', color: RL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: RL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'career-RL', to: 'contact-RL', color: RL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: RL_COLOR}, smooth: EDGE_SMOOTH},
        {from: 'contact-RL', to: 'resume-link', color: RL_COLOR, background: {enabled: true, size: EDGE_SIZE, color: RL_COLOR}, smooth: EDGE_SMOOTH}
    ];

    var nodes = new vis.DataSet(nodeArray);
    var edges = new vis.DataSet(edgeArray);

    container = document.getElementById("transit-map");
    data = {
        nodes: nodes,
        edges: edges
    };

    options = {
        // Physics must be false in order for the manual placement of the nodes to take effect.
        physics: false,
        nodes: {
            font: {
                size: 30,
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

// Set the last node description that was visible to the intro as that is the default when the page opens.
var lastNodeSelectionHTMLElement = document.getElementById('brief-intro');

// Event handler for clicking on a node itself.
// Uses the map to determine the HTML ID for the node description, then hides the previous node, then shows the currently selected node.
network.on('selectNode', function(params) {
    // Make sure we only clicked on a single node
    if (params.nodes.length === 1) {
        lastNodeSelectionHTMLElement.style.display = 'none';
        let selectedNodeID = params.nodes[0];
        let selectedNodeHTMLID = nodeHTMLID[selectedNodeID];
        let selectedNodeHTML = document.getElementById(selectedNodeHTMLID);

        // catch nodes that are just links
        if (selectedNodeID.includes('link')) {
            window.open(selectedNodeHTMLID, '_blank');
            return;
        }

        selectedNodeHTML.style.display = 'block';

        lastNodeSelectionHTMLElement = selectedNodeHTML;
    }
});


// Event handler for deselcting a node.
// Hides the previously selected node.
network.on('deselectNode', function(params) {
    // make sure only one node was previously selected
    if (params.previousSelection.nodes.length === 1) {
        lastNodeSelectionHTMLElement.style.display = 'none';
        // document.getElementById('brief-intro').style.display = 'block';
    }
});