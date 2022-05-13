import React, { useState, useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image";
// import { toPng, toJpeg, toSvg } from "html-to-image";
import { useAtom } from "jotai";
import {
  colorsAtom,
  changeColorToAtom,
  windowSizeAtom,
  changeSizeAtom,
} from "./jotai";
import {
  Button,
  Card,
  Divider,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { PrimaryColor } from ".";

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

function App() {
  const [exportType, setExportType] = useState("png");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [saveAreaHeight, setsaveAreaHeight] = useState(480);
  const [saveAreaWidth, setsaveAreaWidth] = useState(640);
  const [deg, setDeg] = useState(233);
  const [colors] = useAtom(colorsAtom);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [imageNamePrefix, setImageNamePrefix] = useState("img");
  // const [, addColor] = useAtom(addColorToAtom);
  const [, changeColor] = useAtom(changeColorToAtom);
  const [, changeSize] = useAtom(changeSizeAtom);
  const [size] = useAtom(windowSizeAtom);
  const saveAreaRef = useRef(null);
  // const [, removeColor] = useAtom(removeColorToAtom);
  // const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (size.height !== saveAreaHeight) {
      setsaveAreaHeight(size.height);
    }
    if (size.width !== saveAreaWidth) {
      setsaveAreaWidth(size.width);
    }
    if (saveAreaRef.current) {
      //@ts-ignore
      saveAreaRef.current.style.width = size.width;
      // //@ts-ignore
      // saveAreaRef.current?.setAttribute(
      //   "style",
      //   `width: ${size.height}px height: ${
      //     size.width
      //   }px background: ${getBackground()}`
      // );
    }
  }, [size, saveAreaHeight, saveAreaWidth]);

  const handleClick = (index: number) => {
    setCurrentIdx(index);
    setCurrentColor(colors[index]);
  };

  const handleSetColor = (color: string) => {
    setCurrentColor(color);
    changeColor({
      color,
      index: currentIdx,
    });
  };

  const getBackground = () => {
    return `linear-gradient(${deg}deg, ${colors.join(",")})`;
  };
  const handleSave = (e: any) => {
    e.preventDefault();
    var saveDiv = document.getElementById("save_area");
    // const saveDiv = document.createElement("div");
    // saveDiv.setAttribute(
    //   "style",
    //   `width: ${saveWidth}px height: ${saveHeight}px background: ${saveBackground}`
    // );
    if (saveDiv) {
      // console.log(saveDiv, exportType);
      if (exportType === "png") {
        htmlToImage
          .toPng(saveDiv)
          .then(function (dataUrl: string) {
            let link = document.createElement("a");
            link.href = dataUrl;
            link.download = imageNamePrefix + `_${size.width}_${size.height}`;
            link.click();
            // document.body.appendChild(img);
          })
          .catch(function (error: any) {
            console.error("faileld to the image", error);
          });
      } else if (exportType === "jpg") {
        htmlToImage
          .toJpeg(saveDiv)
          .then(function (dataUrl: string) {
            let link = document.createElement("a");
            link.href = dataUrl;
            link.download = imageNamePrefix + `_${size.width}_${size.height}`;
            link.click();
            // document.body.appendChild(img);
          })
          .catch(function (error: any) {
            console.error("faileld to the image", error);
          });
      } else if (exportType === "svg") {
        htmlToImage
          .toSvg(saveDiv)
          .then(function (dataUrl: string) {
            let link = document.createElement("a");
            link.href = dataUrl;
            link.download = imageNamePrefix + `_${size.width}_${size.height}`;
            link.click();
            // document.body.appendChild(img);
          })
          .catch(function (error: any) {
            console.error("faileld to the image", error);
          });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={saveAreaRef}
        id="save_area"
        style={{
          width: saveAreaWidth,
          height: saveAreaHeight,
          background: getBackground(),
        }}
      ></div>
      {/* <Card color="primary">
        <Row justify="center" align="center">
          <Typography h6 size={15} color="white" css={{ m: 0 }}>
            NextUI gives you the best developer experience with all the features
            you need for building beautiful and modern websites and
            applications.
          </Typography>
        </Row>
      </Card> */}
      <Card
        elevation={10}
        sx={{
          left: 10,
          top: 10,
          position: "absolute",
          width: 360,
        }}
      >
        <div style={{ padding: 10, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography style={{ width: 60, marginRight: 10 }}>
              Prefix
            </Typography>
            <Input
              style={{
                width: 120,
              }}
              onChange={(e: any) => {
                e.preventDefault();
                setImageNamePrefix(e.target.value);
              }}
              // type="number"
              value={imageNamePrefix}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography style={{ width: 60, marginRight: 10 }}>
              Width
            </Typography>
            <Input
              style={{
                width: 120,
              }}
              onChange={(e: any) => {
                e.preventDefault();
                if (e.target.value < 0) return;
                else if (parseInt(e.target.value) > MAX_WIDTH)
                  changeSize({
                    width: MAX_WIDTH,
                    height: size?.height,
                  });
                else
                  changeSize({
                    width: parseInt(e.target.value),
                    height: size?.height,
                  });
              }}
              type="number"
              value={size?.width}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography style={{ width: 60, marginRight: 10 }}>
              Height
            </Typography>
            <Input
              style={{
                width: 120,
              }}
              onChange={(e: any) => {
                e.preventDefault();
                if (e.target.value < 0) return;
                else if (parseInt(e.target.value) > MAX_HEIGHT)
                  changeSize({
                    width: size?.width,
                    height: MAX_HEIGHT,
                  });
                else
                  changeSize({
                    width: size?.width,
                    height: parseInt(e.target.value),
                  });
              }}
              type="number"
              value={size?.height}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography style={{ width: 60, marginRight: 10 }}>
              Image
            </Typography>
            <RadioGroup
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              onChange={(e) => {
                e.preventDefault();
                // console.log(e.target.value);
                setExportType(e.target.value);
              }}
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={exportType}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="png"
                control={<Radio />}
                label="PNG"
                color="secondary"
              />
              <FormControlLabel
                value="jpg"
                control={<Radio />}
                label="JPG"
                color="secondary"
              />
              <FormControlLabel
                value="svg"
                control={<Radio />}
                label="SVG"
                color="secondary"
              />
            </RadioGroup>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography style={{ width: 60, marginRight: 10 }}>
              Degree
            </Typography>
            <Input
              style={{
                width: 120,
              }}
              onChange={(e: any) => {
                e.preventDefault();
                const deg = parseInt(e.target.value);
                if (deg > 360) setDeg(0);
                else setDeg(parseInt(e.target.value));
              }}
              type="number"
              value={deg}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Typography style={{ width: 60, marginRight: 10 }}>
              Color
            </Typography>
            <div>
              {colors.map((e, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      marginRight: 10,
                      padding: "5px",
                      backgroundColor:
                        currentIdx === i ? PrimaryColor : "white",
                      borderRadius: 4,
                      display: "inline-block",
                      cursor: "pointer",
                      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                    }}
                    onClick={() => {
                      handleClick(i);
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "14px",
                        borderRadius: "2px",
                        background: e,
                        // background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HexColorPicker color={currentColor} onChange={handleSetColor} />
          </div>
          <Divider></Divider>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
