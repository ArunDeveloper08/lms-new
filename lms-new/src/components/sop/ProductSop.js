import React, { useEffect, useRef, useState } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import { ProductList } from "../../constants/ProductList";
import { mainRoute } from "../../App";

const ProductCeoSop = () => {
  const [value, setValue] = useState("Accounts");
  const [editorContent, setEditorContent] = useState(null);
  const [initialContent, setInitialContent] = useState(null);
  // const latestValueRef = useRef(value);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

  // upload image here
  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${window.MyApiRoute}upload_files`,
        formData
      );
      console.log("Upload successful:", response.data);
      return response.data.fileUrl;
    } catch (error) {
      console.error("Upload failed:", error.message);
    }
  };

  // onChange editior here
  const onChange = (editor) => {
    console.log(
      "Editor content:",
      JSON.stringify(editor.topLevelBlocks, null, 2)
    );
  };

  //  Get data from api
  const fetchContentFromAPI = async () => {
    try {
      const response = await axios.get(
        `${window.MyApiRoute}sop/get?productType=${value || ""}`
      );
      const apiContent = JSON.parse(response.data.data[0].sop);
      console.log(JSON.parse(response.data.data[0].sop));
      setEditorContent(apiContent);
      setInitialContent(apiContent);
    } catch (error) {
      setInitialContent(null);
      console.error("Failed to fetch data from API:", error.message);
    }
  };

  //  submit data in api here
  const handleSubmit = async () => {
    const editorContent = editor.topLevelBlocks;
    const dataToSend = {
      productType: value,
      editorContent,
      ...userInfo,
    };
    try {
      const response = await axios.post(
        `${window.MyApiRoute}sop/createOrUpdate`,
        dataToSend
      );
      // console.log("Submission successful:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Submission failed:", error.message);
    }
  };

  let editor = useBlockNote(
    {
      onEditorContentChange: onChange,
      uploadFile: handleUpload,
      initialContent: editorContent,
    },
    [initialContent]
  );
  let editor2 = useBlockNote(
    {
      initialContent: editorContent,
      editable: false,
    },
    [initialContent]
  );

  useEffect(() => {
    fetchContentFromAPI();
  }, [value]);

  return (
    <>
      {userInfo.Designation === "CEO" ? (
        <div>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Standard Operating Procedure
              </Typography>
              <Link to={`${mainRoute}/home`}>
                <Button autoFocus color="inherit">
                  Close &nbsp; <CloseIcon />
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
          <div className="mt-3">
            <select
              className="w-[300px] rounded-md h-[50px] border-gray-700 border-[1px]  ml-3  mb-3"
              name="product"
              onChange={(e) => setValue(e.target.value)}>
              {ProductList?.map((item) => {
                return <option value={item[1]}>{item[0]}</option>;
              })}
            </select>
            <BlockNoteView editor={editor} theme={"light"} />
            <div className="mt-5">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className="mt-3">
                Submit
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Standard Operating Procedure
              </Typography>
              <Link to={`${mainRoute}/home`}>
                <Button autoFocus color="inherit">
                  Close &nbsp; <CloseIcon />
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
          <div className="mt-3">
            <select
              className="w-[300px] rounded-md h-[50px] border-gray-700 border-[1px]  ml-3  mb-3"
              name="product"
              onChange={(e) => setValue(e.target.value)}>
              {ProductList?.map((item) => {
                return <option value={item[1]}>{item[0]}</option>;
              })}
            </select>
            <BlockNoteView editor={editor2} theme={"light"} />
          </div>
        </>
      )}
    </>
  );
};
export default ProductCeoSop;
