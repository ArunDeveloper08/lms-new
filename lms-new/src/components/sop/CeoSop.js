import React, { useEffect, useRef, useState } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import { DesktopDatePicker } from "@mui/lab";
import { mainRoute } from "../../App";

const TestCeoSop = () => {
  const [value, setValue] = useState("Accounts");
  const [editorContent, setEditorContent] = useState(null);
  const [initialContent, setInitialContent] = useState(null);
  const prevEditorContent = useRef();
  // const latestValueRef = useRef(value);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

  const blockNoteConfig = {
    // ... other configurations
    images: {
      canUpload: true,
      canDelete: true, // Enable the option to delete images
    },
  };

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

  const onChange = (editor) => {
    const textCursorPosition = editor.getTextCursorPosition();
  };

  //  Get data from api

  const fetchContentFromAPI = async () => {
    try {
      const response = await axios.get(
        `${window.MyApiRoute}employee/getdesignation?designation=${value || ""}`
      );
      const apiContent = JSON.parse(response?.data?.data[0]?.sop);

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
      sopDesignation: value,
      editorContent,
      ...userInfo,
    };
    try {
      const response = await axios.put(
        `${window.MyApiRoute}employee/updateSop`,
        dataToSend
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Submission failed:", error.message);
    }
  };

  let editor = useBlockNote(
    {
      onEditorContentChange: onChange,
      initialContent: editorContent,
      uploadFile: handleUpload,
    },
    [initialContent],
    blockNoteConfig
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
              className="w-[300px] rounded-md h-[50px] border-gray-700 border-[1px]  ml-3 mb-3 "
              label="Designation"
              onChange={(e) => setValue(e.target.value)}>
              <option value="Accounts">Accounts</option>
              <option value="storekeeper">Store</option>
              <option value="production">Production</option>
              <option value="engineer">Field Engineer</option>
              <option value="CRM">CRM</option>
              <option value="Mechanical">Mechanical</option>
              <option value="IT">IT</option>
              <option value="Marketing1">Marketing 1</option>
              <option value="Marketing2">Marketing 2</option>
              <option value="Marketing3">Marketing 3</option>
            </select>

            <BlockNoteView editor={editor} theme={"light"} />
            <div className="mt-5">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className="mt-5">
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
              className="w-[300px] rounded-md h-[50px] border-gray-700 border-[1px]  ml-3 mb-3 "
              label="Designation"
              onChange={(e) => setValue(e.target.value)}>
              <option value="Accounts">Accounts</option>
              <option value="storekeeper">Store</option>
              <option value="production">Production</option>
              <option value="engineer">Field Engineer</option>
              <option value="CRM">CRM</option>
              <option value="Mechanical">Mechanical</option>
              <option value="IT">IT</option>
              <option value="Marketing1">Marketing 1</option>
              <option value="Marketing2">Marketing 2</option>
              <option value="Marketing3">Marketing 3</option>
            </select>

            <BlockNoteView editor={editor2} theme={"light"} />
          </div>
        </>
      )}
    </>
  );
};
export default TestCeoSop;
