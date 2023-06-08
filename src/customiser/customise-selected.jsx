import React from "react";
import { Button, Divider, Grid, TextInput, ColorPicker } from "@mantine/core";
import {
  RxDoubleArrowDown,
  RxArrowDown,
  RxArrowUp,
  RxDoubleArrowUp,
  RxTrash
} from "react-icons/rx";

export default function CustomiseSelected({ element, deleteElement }) {
  // Font controls
  const fontUp = () =>
    element.target.setFontSize(element.target.getFontSize() + 2);
  const fontDown = () =>
    element.target.setFontSize(element.target.getFontSize() - 2);
  const fontLeft = () => element.target.setAlign("left");
  const fontCenter = () => element.target.setAlign("center");
  const fontRight = () => element.target.setAlign("right");

  // Layer controls
  const layerDown = () => element.target.moveDown();
  const layerUp = () => element.target.moveUp();
  const layerBottom = () => element.target.moveToBottom();
  const layerTop = () => element.target.moveToTop();

  // Delete
  const removeElement = () => {
    element.target.remove();
    deleteElement();
  };

  return (
    <div>
      <Divider
        my="lg"
        size="md"
        label="Selected Element"
        labelPosition="center"
      />

      <div style={{ marginBottom: "2rem" }}>
        <Button variant="outline" onClick={layerBottom}>
          <RxDoubleArrowDown />
        </Button>
        <Button variant="outline" onClick={layerDown}>
          <RxArrowDown />
        </Button>
        <Button variant="outline" onClick={layerUp}>
          <RxArrowUp />
        </Button>
        <Button variant="outline" onClick={layerTop}>
          <RxDoubleArrowUp />
        </Button>
      </div>

      <Button
        variant="outline"
        color="red"
        leftIcon={RxTrash}
        onClick={removeElement}
      >
        Delete
      </Button>

      {element.target.attrs.component === "Text" && (
        <>
          <Grid columns={3}>
            <Button variant="outline" onClick={fontUp}>
              +
            </Button>
            <Button variant="outline" onClick={fontDown}>
              -
            </Button>
            <Button variant="outline" onClick={fontLeft}>
              left
            </Button>
            <Button variant="outline" onClick={fontCenter}>
              center
            </Button>
            <Button variant="outline" onClick={fontRight}>
              right
            </Button>
          </Grid>
          <TextInput
            label="Update Text"
            my={16}
            defaultValue={element.target.getText()}
            onChange={(e) => element.target.setText(e.target.value)}
          />
          <ColorPicker
            format="rgba"
            swatches={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14"
            ]}
            defaultValue={element.target.getFill()}
            onChange={(colour) => element.target.setFill(colour)}
          />
          <Button
            my={16}
            onClick={() => {
              console.log(element.target.zIndex(2));
            }}
          >
            See Data
          </Button>
        </>
      )}
    </div>
  );
}
