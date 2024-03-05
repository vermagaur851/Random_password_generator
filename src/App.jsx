import { useState, useCallback, useRef, useEffect } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str = "98765432100123456789" + str + "01234567899876543210";
    if (charAllowed) str = "!@#$%^&*-_=+=~" + str + "!@#$%^&*-_=+=~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    alert("Text Copied !!!")
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed]);

  return (
    <div>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-white bg-gray-700">
        <h1 className="text-white text-center my-2 text-lg">
          Random Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black font-semibold"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={passwordGenerator}
            className="text-white px-3 py-0.5 bg-white"
          >
            🔁
          </button>
          <button
            onClick={copyPasswordToClipboard}
            className="bg-green-600 hover:bg-green-800 active:bg-green-900 text-white px-3 py-0.5"
          >
            copy
          </button>
        </div>
        <div className="flex flex-col gap-x-2 text-sm text-grey-100">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length: </label>
            <input className="bg-gray-700 outline-none" type="text" value={length} onChange={(e)=>{if(e.target.value<=30) setLength(e.target.value)}}/>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
