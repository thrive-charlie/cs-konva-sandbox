import React, { useRef, useState } from "react";
import { Button, Flex } from "@mantine/core";
import { Stage, Layer, Transformer } from "react-konva";
import ElementRenderer from "./element-renderer";
import {
  BsTrash,
  BsImages,
  BsChatSquareTextFill,
  BsSave
} from "react-icons/bs";
import CustomiseSelected from "./customise-selected";

export default function ProductCustomiser() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementRef, setSelectedElementRef] = useState(null);
  const [elements, setElements] = useState([]);
  const stageRef = useRef(null);
  const textInput = useRef(null);

  const addImage = () => {
    setElements([
      ...elements,
      {
        component: "Image",
        x: 80,
        y: 100,
        draggable: true,
        scale: { x: 0.5, y: 0.5 },
        url:
          "https://images.unsplash.com/photo-1685509169424-c3ec59122617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      }
    ]);
  };

  const exportCanvas = () => {
    const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    const link = document.createElement("a");
    link.download = "Export.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addText = () => {
    setElements([
      ...elements,
      {
        component: "Text",
        x: 20,
        y: 60,
        text: "This is some example text",
        fontSize: 32,
        fontFamily: "Calibri",
        fill: "#A00",
        width: 300,
        padding: 20,
        draggable: true
      }
    ]);
  };

  const resetCanvas = () => {
    setElements([]);
  };

  return (
    <section style={{ height: "100%", padding: "1rem" }}>
      <Flex>
        <aside
          style={{
            width: "25%",
            marginRight: "1rem",
            padding: "1rem",
            backgroundColor: "#eee"
          }}
        >
          <Flex direction="column" gap={16}>
            <Button leftIcon={<BsImages />} color="indigo" onClick={addImage}>
              Add Image
            </Button>
            <Button
              leftIcon={<BsChatSquareTextFill />}
              color="indigo"
              onClick={addText}
            >
              Add Text
            </Button>
            <Button leftIcon={<BsSave />} color="indigo" onClick={exportCanvas}>
              Export
            </Button>
            <Button leftIcon={<BsTrash />} color="red" onClick={resetCanvas}>
              Reset
            </Button>
          </Flex>
          {selectedElement && (
            <CustomiseSelected
              element={selectedElement}
              deleteElement={() => setSelectedElement(null)}
            />
          )}
        </aside>
        <main
          style={{
            width: "800px",
            border: "2px dashed #333",
            height: "600px"
          }}
        >
          <Stage
            width={800}
            height={600}
            ref={stageRef}
            onContextMenu={(e) => console.log("opened menu of ", e.target)}
            onMouseDown={() => setSelectedElement(null)}
            onTouchStart={() => setSelectedElement(null)}
          >
            <Layer>
              <ElementRenderer
                elements={elements}
                selected={selectedElement}
                setSelected={setSelectedElement}
                setSelectedRef={setSelectedElementRef}
              />
              {selectedElement && (
                <>
                  <p>Transformer</p>
                  <Transformer
                    ref={selectedElementRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      // limit resize
                      if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                </>
              )}
            </Layer>
          </Stage>
        </main>
      </Flex>
    </section>
  );
}
