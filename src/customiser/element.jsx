import React, { createElement, useState, useRef, useMemo } from "react";
import { Rect, Circle, Text, Image, Transformer } from "react-konva";
import useImage from "use-image";

export default function Element(props) {
  // Store position and dragging as props
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(props?.x ?? 10);
  const [y, setY] = useState(props?.y ?? 10);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const elementRef = useRef(null);

  const selectElement = (e) => {
    props.setSelectedRef(elementRef);
    props.setSelected(e);
  };

  // Build up array of new props
  const updatedProps = useMemo(() => {
    return {
      ...props,
      isDragging,
      x,
      y,
      width,
      height,
      ref: elementRef,
      onDragStart: () => {
        setIsDragging(true);
      },
      onDragEnd: (e) => {
        setIsDragging(false);
        setX(e.target.x());
        setY(e.target.y());
      },
      onClick: selectElement,
      onTap: selectElement,
      onTransformEnd: (e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = elementRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);

        setX(node.x());
        setY(node.Y());
        setWidth(Math.max(5, node.width() * scaleX));
        setHeight(Math.max(node.height() * scaleY));
      }
    };
  }, [props, isDragging, x, y, width, height]);

  // Return an ImageElement if an image component
  console.log(updatedProps);
  if (updatedProps.component.toLowerCase() === "image") {
    return <ImageElement {...updatedProps} />;
  }

  return createElement(props.component, updatedProps);
}

function ImageElement(props) {
  const [image] = useImage(props.url, "anonymous");
  return <Image image={image} {...props} />;
}
