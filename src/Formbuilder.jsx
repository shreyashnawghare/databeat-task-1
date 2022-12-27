import React, { useState } from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import "./FormBuilder.css";
export default function Formbuilder() {
  const [formdata, setFormData] = useState({
    formData: [],
    indexPosition: -1,
    id: 0,
  });


  const loadData = () => {
    if(formdata.formData.length>0){
      return new Promise ((resolve) => {
        resolve(JSON.stringify(formdata.formData[formdata.indexPosition]))
      }).then((response) => {
        return JSON.parse(response).task_data 
      });
    }
  } 

  const postData = (data) => {
    setFormData((prevData) => {
      return {
        formData : [...prevData.formData, data],
        indexPosition : prevData.indexPosition+1,
        id : prevData.id+1
      }
    })
  }
  const undo = () => {
    if(formdata.indexPosition>-1){
      setFormData((prevData) => {
        return {
          formData : prevData.formData,
          indexPosition : prevData.indexPosition-1,
          id : prevData.id+1
        }
      })
    }else{
      return
    }
  }
  const redo = () => {
    if(formdata.indexPosition<formdata.formData.length-1){
      setFormData((prevData) => {
        return {
          formData : prevData.formData,
          indexPosition : prevData.indexPosition+1,
          id : prevData.id+1
        }
      })
    }else{
      return
    }
  }
  return (
    <div >
       <button className='btn btn-danger undobtn m-3' onClick={undo}>Undo</button>
      <button className='btn btn-primary redobtn' onClick={redo}>Redo</button>
      {formdata.formData.length>0 ? 
      <ReactFormBuilder
        onLoad={loadData}
        onPost={postData}
        key = {formdata.id}
      /> : 
      <ReactFormBuilder
      onPost={postData}
      key = {formdata.id}
    />}
    </div>
  );
}
