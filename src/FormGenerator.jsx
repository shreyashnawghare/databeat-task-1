import React, { useEffect } from "react";
import { useState } from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import "./FormGenerator.css"
export default function FormGenerator() {
  const [previewData, setPreviewData] = useState({
    data: [],
    previewVisible: false,
  });

  const update = (Data) => {
    setPreviewData({ data: Data });
  };

  useEffect(() => {
    ElementStore.subscribe((state) => {
      update(state.data);
    });
  }, []);

  const displayPreview = () => {
    setPreviewData({
      data: previewData.data,
      previewVisible: true,
    });
  };
  const closePreview = () => {
    setPreviewData({
      data: previewData.data,
      previewVisible: false,
    });
  };
  const save = (data) => {
    console.log(data);
  };
  return (
    <div className="previewFormGenerator">
      <span style={{fontWeight:"bold"}}>Click The button for Preview</span>
      <button className="btn btn-primary " onClick={displayPreview}>
        Preview
      </button>

      {previewData.previewVisible && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <ReactFormGenerator
                form_action="/"
                form_method="POST"
                onSubmit={save}
                data={previewData.data}
              />

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={closePreview}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
