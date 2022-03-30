import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.css";
import CodeMirror from "codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/lib/codemirror.css";

export const SuiRichTextEditor = ({ ...rest }) => {
  const onImageUploadBefore = ({ files, info, core, uploadHandler }) => {
    // Upload image to Server

    const src = UploadToServer(files[0]);

    // result
    const response = {
      // The response must have a "result" array.
      result: [
        {
          url: src,
          name: files[0].name,
          size: files[0].size,
        },
      ],
    };

    console.log(files, info);

    // uploadHandler(response);
  };

  function UploadToServer() {
    return "dsdd";
  }
  return (
    <SunEditor
      autoFocus={false}
      lang="en"
      onImageUploadBefore={onImageUploadBefore}
      setOptions={{
        showPathLabel: false,
        minHeight: "20vh",
        maxHeight: "25vh",

        // placeholder: "Enter your text here!!!",
        katex: katex,
        codeMirror: CodeMirror,

        buttonList: [
          // default
          ["undo", "redo"],
          [
            ":p-More Paragraph-default.more_paragraph",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
          ],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          [
            "-right",
            ":i-More Misc-default.more_vertical",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
            "template",
          ],
          [
            "-right",
            ":r-More Rich-default.more_plus",
            "table",
            "math",
            "imageGallery",
          ],
          ["-right", "image", "video", "audio", "link"],
          // (min-width: 992)
          [
            "%992",
            [
              ["undo", "redo"],
              [
                ":p-More Paragraph-default.more_paragraph",
                "font",
                "fontSize",
                "formatBlock",
                "paragraphStyle",
                "blockquote",
              ],
              ["bold", "underline", "italic", "strike"],
              [
                ":t-More Text-default.more_text",
                "subscript",
                "superscript",
                "fontColor",
                "hiliteColor",
                "textStyle",
              ],
              ["removeFormat"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              [
                "-right",
                ":i-More Misc-default.more_vertical",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
                "template",
              ],
              [
                "-right",
                ":r-More Rich-default.more_plus",
                "table",
                "link",
                "image",
                "video",
                "audio",
                "math",
                "imageGallery",
              ],
            ],
          ],
          // (min-width: 767)
          [
            "%767",
            [
              ["undo", "redo"],
              [
                ":p-More Paragraph-default.more_paragraph",
                "font",
                "fontSize",
                "formatBlock",
                "paragraphStyle",
                "blockquote",
              ],
              [
                ":t-More Text-default.more_text",
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "fontColor",
                "hiliteColor",
                "textStyle",
              ],
              ["removeFormat"],
              ["outdent", "indent"],
              [
                ":e-More Line-default.more_horizontal",
                "align",
                "horizontalRule",
                "list",
                "lineHeight",
              ],
              [
                ":r-More Rich-default.more_plus",
                "table",
                "link",
                "image",
                "video",
                "audio",
                "math",
                "imageGallery",
              ],
              [
                "-right",
                ":i-More Misc-default.more_vertical",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
                "template",
              ],
            ],
          ],
          // (min-width: 480)
          [
            "%480",
            [
              ["undo", "redo"],
              [
                ":p-More Paragraph-default.more_paragraph",
                "font",
                "fontSize",
                "formatBlock",
                "paragraphStyle",
                "blockquote",
              ],
              [
                ":t-More Text-default.more_text",
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "fontColor",
                "hiliteColor",
                "textStyle",
                "removeFormat",
              ],
              [
                ":e-More Line-default.more_horizontal",
                "outdent",
                "indent",
                "align",
                "horizontalRule",
                "list",
                "lineHeight",
              ],
              [
                ":r-More Rich-default.more_plus",
                "table",
                "link",
                "image",
                "video",
                "audio",
                "math",
                "imageGallery",
              ],
              [
                "-right",
                ":i-More Misc-default.more_vertical",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
                "template",
              ],
            ],
          ],
        ],
        // buttonList: buttonList.formatting,
        formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
        font: [
          "Arial",
          "Calibri",
          "Comic Sans",
          "Courier",
          "Garamond",
          "Georgia",
          "Impact",
          "Lucida Console",
          "Palatino Linotype",
          "Segoe UI",
          "Tahoma",
          "Times New Roman",
          "Trebuchet MS",
        ],
      }}
      // defaultValue={content}
      // onChange={handleChange}
      {...rest}
    />
  );
};
