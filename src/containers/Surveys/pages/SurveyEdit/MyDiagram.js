import React from "react";
import * as go from "gojs";
import { ToolManager, Diagram } from "gojs";
import { GojsDiagram, ModelChangeEventType } from "react-gojs";
import "./MyDiagram.css";

class MyDiagram extends React.Component {
  nodeId = 0;

  constructor(props) {
    super(props);
    const { data } = props;
    this.createDiagram = this.createDiagram.bind(this);
    this.modelChangeHandler = this.modelChangeHandler.bind(this);
    this.initModelHandler = this.initModelHandler.bind(this);
    this.state = {
      selectedNodeKeys: [],
      model: data
    };
  }

  render() {
    return [
      <GojsDiagram
        key="gojsDiagram"
        diagramId="myDiagramDiv"
        model={this.state.model}
        createDiagram={this.createDiagram}
        className="myDiagram"
        onModelChange={this.modelChangeHandler}
      />
    ];
  }

  initModelHandler() {
    this.setState({
      ...this.state,
      model: {
        nodeDataArray: [],
        linkDataArray: []
      }
    });
  }
  createDiagram(diagramId) {
    const $ = go.GraphObject.make;

    const myDiagram = $(go.Diagram, diagramId, {
      initialAutoScale: go.Diagram.Uniform,
      initialContentAlignment: go.Spot.LeftCenter,
      layout: $(go.TreeLayout, {
        angle: 0,
        arrangement: go.TreeLayout.ArrangementVertical,
        treeStyle: go.TreeLayout.StyleLayered
      }),
      isReadOnly: true,
      allowHorizontalScroll: true,
      allowVerticalScroll: true,
      allowZoom: true,
      allowSelect: false,
      autoScale: Diagram.None,
      contentAlignment: go.Spot.LeftCenter,
      hasHorizontalScrollbar: true

      //   TextEdited: this.onTextEdited
    });

    myDiagram.toolManager.panningTool.isEnabled = false;
    myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        selectionChanged: node =>
          this.nodeSelectionHandler(node.key, node.isSelected)
      },
      $(
        go.Shape,
        "RoundedRectangle",
        { strokeWidth: 0 },
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { margin: 8, editable: true },
        new go.Binding("text", "label")
      )
    );

    return myDiagram;
  }

  modelChangeHandler(event) {
    switch (event.eventType) {
      case ModelChangeEventType.Remove:
        if (event.nodeData) {
          this.removeNode(event.nodeData.key);
        }
        if (event.linkData) {
          this.removeLink(event.linkData);
        }
        break;
      default:
        break;
    }
  }

  nodeSelectionHandler(nodeKey, isSelected) {
    if (isSelected) {
      this.setState({
        ...this.state,
        selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey]
      });
    } else {
      const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(
        key => key === nodeKey
      );
      if (nodeIndexToRemove === -1) {
        return;
      }
      this.setState({
        ...this.state,
        selectedNodeKeys: [
          ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
          ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
        ]
      });
    }
  }

  onTextEdited(e) {
    const tb = e.subject;
    if (tb === null) {
      return;
    }
    const node = tb.part;
    if (node instanceof go.Node) {
      this.updateNodeText(node.key, tb.text);
    }
  }
}

export default MyDiagram;
