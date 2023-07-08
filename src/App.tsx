import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import Sounds from "./components/Sounds";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import "./App.css"

function App() {
  const backgroundVideos: string[] = [
    "https://uc47e9d3306342856dbf14cc9d66.dl.dropboxusercontent.com/cd/0/inline/B_cs1jdbguqUo12LlF5Ed8piwUiKaK9g4Z5WT8LKsmRIoBtmTNtnCCFlTt2KkzrEJq7xsC9UknDTFIJfycJXAvgcBdrDgJ_BaADfJZhU5AC8HXfs7dsVYQu5MncGL7eqhqwgNjkQManeAwRI4DqzXfyBnw6yR1SILuskLoN8JDMO5w/file#",
    "https://ucf55299ec4ee4e8e66c09f4d394.dl.dropboxusercontent.com/cd/0/inline/B_fZA0By0HXReYtcSSgzylNJeNmmtw4XCcv1BNGp08EcobFQmNJKGvkVgBb_FpA2z0Ad4eEngDAh98b1GfzYLFrjnSDUMV7Tlpuh-4q0Eo1eKpP_gzy28sLna5daMRMqdJeGupeSnOCR1fN6IOWWbq2mF5DfkYRCBfi-pE0DYZ5Nmw/file#",
    "https://uc6e5941e41051c993fd41194681.dl.dropboxusercontent.com/cd/0/inline/B_fk6CxR3d76dUAJ_taZPH3nGcqe7FNeslhTLib_jMY8L78scriKO29ZXTrENOyfmz9nTAXnZd2e9VqOQHkjbKr7zTc_llCqc4g8N_vRKMS8xxMOrd5TM6qg1_Tf7wzEzFQNquqrryJ29kFvCd5o_T2weROR0mgbQtk5vBdnJbNhTQ/file#",
    "https://ucede551dc5ab45839822bd2f5f0.dl.dropboxusercontent.com/cd/0/inline/B_eMqOo__yKe_-q_tsakJVh0bGonTtHSo1xkAkwf7BwIKKitcFFm7JH6GAOeK-xDfPytJVuxWT68YkdeD0RBZOh4SY4TRdqVGs9fbfYl5iuhhRmkwVGats1U_H7BuOIRGzVViom84aoXcIB78ULuPhcilSXhChOOOC9TYeYyTK4qaw/file#",
    "https://uceda16cff9cf5bdcc6c74087122.dl.dropboxusercontent.com/cd/0/inline/B_coZJo0ekznBZqO89M7EbBRWAG7jfxzY9c4ihq8nMKkd0SJslISM2iM82GHI8Y2C2Mn0eh6llxaLTI_k_BTt66ZpkpXKqaq_FyC8cva1kBl4_S0arUIOswxY5P4Q1YRvyfj-ENh16l_9xTJv5Q32e8sXu-bb_hEYRV8T_ms2jAgWw/file#",
    "https://ucc792a565718f90a560b5f3aacc.dl.dropboxusercontent.com/cd/0/inline/B_cEBt04_nCSiKx3dHfw_g1WoUzNcY_4sk5E-fEQc8fOo5-qBcBt8Vy-0_T48Zbd2deHWxNue_AOiR58-aAz0r0fTAySoLV9gUV6i_FfEwNmaAOHe2UbrpQFEmYPmmc1rklVqy4o-nWWVCLNCfF-Hd_pxhxH37ssNvpfbm3NN8DB7Q/file#",
    "https://ucb1aa2eb4aa898bdba94a04c5f7.dl.dropboxusercontent.com/cd/0/inline/B_cvTxE2gR4MCFFBwmBXVt3WqZUqy-2_1W1l3Do1tPeU2DS1GhsWhQ40h-dROzD2gr-WAi6RaQPsSM5Wg5PMzVtmBQkrEb_JR1Fxv1hUqAGptEsex5LYGdXas4svkPhTqNBmEsyroQNyRjWmX9E91w-EdYHt-H_Uq5hk5INjVq06VA/file#",
    "https://uc1d5435d070f53effa15c5a164c.dl.dropboxusercontent.com/cd/0/inline/B_fWrHxuUICKYHun3jQCt2OfWj-uDuTsYiYLWpEoOor_xpKXZBMY5cAth5UBg-axtrClVWjRat8jHlDnHIGHAJtzAht73LMmlFNxHatTGgt7M9ZzBKxpXJMB7MCJ6OOrW6O4Eap5gjRFacU1hbLWAh3cvkFepf8qYulq_xB2swszAA/file#",
    "https://uc33164d3b65c523f191f8653dbe.dl.dropboxusercontent.com/cd/0/inline/B_f_IoscUWGnBNGbZAsa3KI20Qc9TNbA5PDT2BOy5n3aMZI6hVXaIOZHrLUhH3O0oV0HEcHI5bqSFTGoy8fIkmfT2YRUnUifY6e0NlGbfH-8spqNS4oB8XEnjVo_nDBTraxEu0c7AdacSHYx_0XA8v_RJ-SYfcTU3IFJCc_e57QrvQ/file#",
    "https://uc4acd5dc119b61f15d21bf31f70.dl.dropboxusercontent.com/cd/0/inline/B_fteoWZWX_3SSUm6gIAyh0phF_M3gEc8jq6ehY1HA320V_exppl8nAxCvFfAvb0S1obkUhwXunjNH7nbXpq-efvys6OxRu4XOP8WgZcYBEREStuC99W7MU-oHYj4Dgmgn_6-7n1KxyJ08PynzEDOqhxIx4_UkzIwYZhw4p_f2S6xA/file#",
    "https://uc55a498e184fce4a38930da3f34.dl.dropboxusercontent.com/cd/0/inline/B_e2r2K78cYOOzTTJ5_9b39NjdHfe3huC5W7iqCMjWD92EMIYrB-i2LFMB1a0phdkS_PpauZGGjXvznyg0n5gafNF1yTAZ8ukJMDrgShXYaPFnb4b6r2CcTfVC5anuyVsHewaPfS9n0zbrODp1I6PNPr3Yp3qy9W3dIJ7I5BF3RH1w/file#",
    "https://uc9dffda3f5f0ca70abbbec687b7.dl.dropboxusercontent.com/cd/0/inline/B_dI2l2lCPpvSwZuRnrmPjPePr192gAM1lE0vtH96FtII0flxtwOzVw_CVLMGHeCz60_0wj-A5t6JjJFRvZIFwPwaWjXuBTlZyAfU3AwS3EeXfmdI-Fnngo3vl6MFicJRDOe7eOwuqsEtBHfG_FITnoPDC5WiZS1vWLNxLn7sPOVPg/file#",
    "https://uc61c201eec8a265d250b903a257.dl.dropboxusercontent.com/cd/0/inline/B_dwkgrUua78Tla5xD75RhcZO5QbAcAPiQk3s5_k8nsQEP6AlDH-82spTloWhZFtdqXJ2mHWCy8zNZ3GRpW0jW-hkSf9bfJngZK2gMLN4ymKvLIHPTg7rJL7RxeXW1zX1H82OEZLNpmv4bSVD_r7iJJzQFWdR2mUQoEn0CfF7RwTew/file#",
  ];

  const musicPaths = [
    {
    path: "https://ucca45605b8b77ea93d19006ee5a.dl.dropboxusercontent.com/cd/0/inline/B_fa4x2cstcKLvljFB3-eyjxTdU5hKT9E-osybm_MgwOSiEmTlDqMTiYFqaRZc6V54bfUYXAAmpS6cMf9LFYFFWghstKuDGHxZohpNYhmAX19GStanV8B5zo3YyrhdTT-0XPKKB8OHxG7OM5e4BjGTzfogNvzS9sTNh-L-LlAZ5Krg/file#",
    title: "Claire De Lune (Studio Version)" 
    },
    {
    path: "https://uce8449f20a7fc0620316e539632.dl.dropboxusercontent.com/cd/0/inline/B_fOoH66Ru_CPJ5Lpc4T0DXk02DZOiusc0olL1I4k9xvUHpprYIGdSmYJc6uRaR2q9o2w0YfGCz60bQX-hcnrEWyBOMs7Y02FaHr3N4zoF_eSGpI-d-VulZ_PqNi2hX3QUNGL3tTYub7xuooRTDGoPqZje4sKap2CBiJ7zgb_eRn1Q/file#",
    title: "Interstellar Main Theme - Extra Extended"
    },
    {
    path: "https://uc9cc851f725ab8d9c87bb183145.dl.dropboxusercontent.com/cd/0/inline/B_cHcWYzqe54q3CmjwVYrE-n2hygkYQvGKgJ6Gbq6AgGsDcfxOqp3la3_J5EzKzy8umnk2JPjSIHy8VN4-oUYkmcLF5-0pZSZFTqtratpw9ks54r2SqKrL2d73z5m5sABHvXwRoRey2FgtYQ6_-UqE4wntwrkWUG-5ccUKzGgF42Ug/file#", 
    title: "Joe Hisaishi - Merry-Go-Round of Life (Howl's Moving Castle)"
    },
    {
    path:"https://uc0eb61c90a2244548e8f8415b4a.dl.dropboxusercontent.com/cd/0/inline/B_f8QO3U762qWuDeqsFLarlraAwDIW5Fk_kbiFOXLUTFbMHit6F99ugVyyldAZHZeHt53VSe48O5Xal54Hc9dee4gp3SswyquEKb8fqsCmK9HuikYmw0Zx_M9HSci89Vu3U9gqN7h1w1W-5BQurOywQSYsk7C67dQ_hnK5O5bRcu5w/file#",
    title: "Peace"
    },
    {
    path:"https://uc5cacec35def15d20c9bd2e0f7b.dl.dropboxusercontent.com/cd/0/inline/B_fA6J30aKJPg7dgyB3tL0mVKPi9A_kaRgY07hGpkDdrfi4cmJfiSagsNwPhx9muxzfg0Y-ke2aqmZnGpnrHikee9lmxTuMlsVk8QCVyutKOfIi0X08EHKx5OS8mVmH4ibm6iIggzehC8gstTpSLtU_TS_G43hQn0tlBau--iJgYDw/file#",      
    title: "POV_you are studying with some classical music in an ancient academy"
    },
    {
    path:"https://uc5c748d3ffe1663b609b6a80eab.dl.dropboxusercontent.com/cd/0/inline/B_fNABvqsUNsctXT0GpCOwIp5MneW3pG842k-wGTWaT6ga2tvHjtdt4chAk9PPSPbXUYzvdqu0qxGPf_qFkz1VUiM_K-NE6Unzs-tOlswvDVViDbEV_n6XZzdFg3KYlWH5tYa_7u_T7FeUNJmI2Sxmqfru26n1TQijcItYKx_Uq8nw/file#",
    title: "Studying with poets long gone - A DARK ACADEMIA PLAYLIST (classical)" 
    },
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleBackgroundChange = () => {
    const nextIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    setCurrentVideoIndex(nextIndex);
  };

  useEffect(() => {
    const video = document.getElementById(
      "background-video"
    ) as HTMLVideoElement;
    video.src = backgroundVideos[currentVideoIndex];
  }, [currentVideoIndex, backgroundVideos]);

  return (
    <MusicPlayerProvider>
      <div className="absolute top-0 left-0 w-full h-full bg-black overflow-hidden">
        <video
          id="background-video"
          className="absolute bottom-0 left-0 min-w-full min-h-full object-cover transition-all ease-in"
          preload="auto"
          autoPlay
          muted
          loop
        >
          <source src={backgroundVideos[currentVideoIndex]} type="video/mp4" />
        </video>
      </div>
      <Navbar />
      <Sounds />
      <MusicPlayer musicPaths={musicPaths.map((music) => music.path)}
        musicTitles={musicPaths.map((music) => music.title)}
        onBackgroundChange={handleBackgroundChange} />
    </MusicPlayerProvider>
  );
}

export default App;
