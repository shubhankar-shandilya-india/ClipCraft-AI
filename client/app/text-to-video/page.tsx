'use client'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  let audioURL = "https://tts-result.s3.amazonaws.com/en-US/male/1714945379237.mp3";
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const [videoURL, setVideoURL] = useState<string>('');
  const [video_presence, setvideo_presence] = useState<boolean>(false);
  const textRef = useRef<any>(null);
  const [selected_genre, setselected_genre] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (val: string) => {
    setselected_genre(val);
    setSelectedButton(val);
    console.log(selected_genre)
  };
  function handlescroll() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    textRef.current.focus();
    handlescroll();
  }, [video_presence]);
  const handleClick = async () => {
    setLoading(true);
    const encodedParams = new URLSearchParams();
    encodedParams.set('text', textRef.current?.value);
    encodedParams.set('language_code', "en-US");
    encodedParams.set('gender', 'male');

    const options = {
      method: 'POST',
      url: 'https://text-to-speech7.p.rapidapi.com/voice',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.TTS_API_KEY,
        'X-RapidAPI-Host': 'text-to-speech7.p.rapidapi.com'
      },
      data: encodedParams,
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const url = String(response.data.url);
      console.log(url);
      audioURL = url
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    try {
      const response = await axios.post('http://localhost:8080/api/getdata', {
        audio_url: audioURL,
        genre: selected_genre
      });
      const data = response.data;
      setLoading(false)
      setVideoURL('/generated_video.mp4')
      setvideo_presence(true);
      setLoading(false);
      console.log(data);
      // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    } catch (error) {
      console.error('Error uploading audio:', error);
      setLoading(false);

    }
  };

  return (
    <main className="h-screen ">
      <div className="bg-black h-full w-full py-4 px-4 rounded-md mb-4">
        <h3 className="entrance text-xl font-bold  uppercase mb-6">
          Enter Voiceover Text
        </h3>
        <div className="my-6 flex flex-col gap-4">
          <textarea
            className="p-4 mb-4 border border-gray-500 rounded-lg outline-none placeholder-gray-500 focus-within:drop-shadow-md bg-gray-900 text-white"
            placeholder="Enter what you'd like to hear as background for your video."
            cols={50}
            rows={10}
            ref={textRef}
          />
          <div className="text-white mb-7">
            <div className="entrance text-xl font-bold uppercase mb-2">Select video genre</div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {["Health", "Music", "Food", "Nature", "Technology", "Infrastructure"].map((buttonName) => (
                <button
                  key={buttonName}
                  className={`rounded-xl px-4 p-2 w-full md:w-auto focus:outline-none   ${selectedButton === buttonName ? 'bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 text-black' : ''}`}
                  onClick={() => handleButtonClick(buttonName)}
                >
                  {buttonName}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={loading}
            onClick={handleClick}
            className=" glow-on-hover transition duration-300 py-3 rounded-lg w-full md:w-auto"
          >
            {loading ? "Generating, please wait" : "Generate Video"}
          </button>
        </div>
        <div className="w-full flex justify-center items-center ">
          <div className="w-8/12 "ref={messagesEndRef} >
            {video_presence && (
              <ReactPlayer
                url={videoURL}
                controls
                width="100%"
                playing={true}
                height="auto"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            )}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
