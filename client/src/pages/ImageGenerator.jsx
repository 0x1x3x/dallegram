import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import { getRandomPrompt } from "../utils";
import { FormFields, Loader } from "../components";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API,
});
const openai = new OpenAIApi(configuration);

const ImageGenerator = () => {
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    prompt: "",
    photo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const containsBadWords = (str) => {
    const badWords = ["fuck", "suck", "shit", "dick", "tits", "porn"];
    return badWords.some((word) => str.toLowerCase().includes(word));
  };

  const generateImg = async () => {
    if (form.prompt) {
      if (containsBadWords(form.prompt)) {
        alert("Please write something new");
        return;
      }
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${data.photo}`,
        });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
        window.location.reload();
      }
    }
  };

  return (
    <section className="flex items-center justify-center w-full">
      <div className="bg-white w-[95%] p-[10px] opacity-90 rounded-3xl lg:w-[30%] lg:p-[15px]">
        <div className="">
          <img
            src="/src/assets/logo_dallegram.svg"
            alt="logo"
            className="w-[250px] mb-4 mx-auto"
          />
        </div>

        <form onSubmit={handleSubmitForm}>
          <div className="flex flex-wrap justify-between items-center">
            <FormFields
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="3D render of a black fox on a white snow in 2087 year"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <button
              onMouseDown={generateImg}
              className="font-semibold text-sm bg-[#ececf1] py-3 px-5 rounded-3xl text-gray-900 mt-4 md:mt-0 w-full lg:w-auto"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="pt-5 opacity-100">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full rounded-lg"
              />
            ) : (
              <img
                src="../src/assets/preview.png"
                className="w-full p-[10rem] rounded-3xl border border-black"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 mt-[-75px] pl-[0px] flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-3xl">
                <Loader />
              </div>
            )}
          </div>

          <div className="mt-5 flex justify-between gap-7">
            <button
              type="submit"
              className="text-white bg-[#6469ff] font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? "Sharing..." : "Share on Dallegram"}
            </button>
            <button
              type="button"
              className="text-white bg-[#1DA1F2] font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              <a
                href="https://twitter.com/dallegram?ref_src=twsrc%5Etfw"
                className="twitter-follow-button"
                data-show-count="false"
                target="blank"
              >
                Follow @Dallegram
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
              ></script>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ImageGenerator;
