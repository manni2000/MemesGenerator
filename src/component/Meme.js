import React, { useState } from 'react'
import * as htmltoimage from 'html-to-image'
import download from 'downloadjs'

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="refresh-icon"
  >
    <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
  </svg>
)

export default function Form() {
  const [allMemes, setAllMemes] = useState([])

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.imgflip.com/get_memes')
      const data = await res.json()
      setAllMemes(data.data.memes)
    }
    fetchData()
  }, [])

  function getMemeImage() {
    var meme1 = allMemes
    meme1 = meme1[Math.floor(Math.random() * meme1.length)]
    meme1 = meme1.url
    return meme1
  }

  const [memeImage, setmemeImage] = useState({
    topText: '',
    bottomText: '',
    image: 'http://i.imgflip.com/1bij.jpg',
  })

  function changeMeme(event) {
    const { name, value } = event.target
    setmemeImage((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function getNewImage() {
    setmemeImage((prevState) => ({
      ...prevState,
      image: getMemeImage(),
    }))
  }

  const downloadFile = () => {
    htmltoimage
      .toPng(document.getElementById('my-meme'))
      .then(function (dataUrl) {
        download(dataUrl, 'my-meme.png')
      })
  }

  return (
    <main class="main">
      <div className="text-inputs">
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
      </div>

      <div className="meme" id="my-meme">
        <button
          className="refresh-button"
          title="Get a new meme image"
          onClick={getNewImage}
        >
          <RefreshIcon />
        </button>

        <img src={memeImage.image} alt="meme" className="meme--image" />

        <h1 className="meme--text top">{memeImage.topText}</h1>
        <h1 className="meme--text bottom">{memeImage.bottomText}</h1>
      </div>
      <button onClick={downloadFile} class="download">
        Download
      </button>
    </main>
  )
}
