import "./NodeItem.css"


export const NodeItem = ({ type }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      className="node-item"
    >
      {type}
    </div>
  );
};
