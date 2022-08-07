import React, { useState } from "react";
import * as htmltoimage from "html-to-image";
import download from "downloadjs";

export default function Form() {
  const [allMemes, setAllMemes] = useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    fetchData();
  }, []);

  function getMemeImage() {
    var meme1 = allMemes;
    meme1 = meme1[Math.floor(Math.random() * meme1.length)];
    meme1 = meme1.url;
    return meme1;
    // console.log(results);
    // return memeObj;
  }

  const [memeImage, setmemeImage] = useState({
    topText: "",
    bottomText: "",
    image: "http://i.imgflip.com/1bij.jpg",
  });

  function changeMeme(event) {
    const { name, value } = event.target;
    setmemeImage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(memeImage);
    setmemeImage((prevState) => ({
      ...prevState,
      image: getMemeImage(),
    }));
  }

  const downloadFile = () => {
    htmltoimage
      .toPng(document.getElementById("my-meme"))
      .then(function (dataUrl) {
        download(dataUrl, "my-meme.png");
      });
  };

  return (
    <main class="main">
      <form className="form" onSubmit={handleSubmit}>
        <span>
          <input
            type="text"
            className="form-input"
            placeholder="Meme top text"
            name="topText"
            value={memeImage.topText}
            onChange={changeMeme}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Meme bottom text"
            name="bottomText"
            value={memeImage.bottomText}
            onChange={changeMeme}
          />
        </span>
        <button className="form-button">Get a New Image</button>
      </form>
      <div className="meme" id="my-meme">
        <img src={memeImage.image} alt="meme" className="meme--image" />
        <h1 className="meme--text top">{memeImage.topText}</h1>
        <h1 className="meme--text bottom">{memeImage.bottomText}</h1>
      </div>
      <button onClick={downloadFile} class="download">
        Download
      </button>
    </main>
  );
}
