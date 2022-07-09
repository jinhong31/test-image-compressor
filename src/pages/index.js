import { useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { saveAs } from "file-saver";
import CONSTANT from "../constant/index"
export default function Home() {
  const [compressedLink, setCompressedLink] = useState(
    "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
  );
  const [originalImage, setOriginalImage] = useState("");
  const [originalLink, setOriginalLink] = useState("");
  const [clicked, setClicked] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [outputFileName, setOutputFileName] = useState("");

  const handle = (e) => {
    const imageFile = e.target.files[0];
    setOriginalLink(URL.createObjectURL(imageFile));
    setOriginalImage(imageFile);
    setOutputFileName(imageFile.name);
    setUploadImage(true);
  };

  const click = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', originalImage);
    try {
      const downloadLink = await axios.post(`${CONSTANT.API_URL}/compressor/upload`, data)
      setCompressedLink(downloadLink.data.link);
      setClicked(true);
    } catch (error) {
      console.log('Error : ', error);
    }

    return 1;
  };

  const downloadImage = (e) => {
    saveAs(compressedLink, originalImage.name);
  }
  return (
    <div className="m-5">
      <div className="text-light text-center">
        <h1>Three Simple Steps</h1>
        <h3>1. Upload Image</h3>
        <h3>2. Click on Compress</h3>
        <h3>3. Download Compressed Image</h3>
      </div>

      <div className="row mt-5">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          {uploadImage ? (
            <Card.Img
              className="ht"
              variant="top"
              src={originalLink}
            ></Card.Img>
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
            ></Card.Img>
          )}
          <div className="d-flex justify-content-center">
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75"
              onChange={(e) => handle(e)}
            />
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
          <br />
          {outputFileName ? (
            <button
              type="button"
              className=" btn btn-dark"
              onClick={(e) => click(e)}
            >
              Compress
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
          <Card.Img variant="top" src={compressedLink}></Card.Img>
          {clicked ? (
            <div className="d-flex justify-content-center">
              <button
                onClick={(e) => downloadImage()}
                className="mt-2 btn btn-dark w-75"
              >
                Download
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}