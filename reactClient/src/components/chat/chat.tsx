
function Chat (): JSX.Element{
  const model: string = "gpt-3.5-turbo";
  const temperature: number = 0.5;


  return (
    <>
      <div className="mainContainer">
        <div className="settinsContainer">
          <div className="modelContainer">
            <h3>Model: {model} </h3>
            <select name="model" id="model">
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option value="gpt-3.5-turbo-16k-0613">gpt-3.5-turbo-16k-0613</option>
              <option value="gpt-3.5-turbo-0301">gpt-3.5-turbo-0301</option>
              <option value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613</option>
            </select>
          </div>

          <div className="temperatureContainer">
            <h3>Temperature: </h3>
            <input type="range" name="temperature" id="temperature" min="0" max="2" step="0.01" />
          </div>

          <div className="maxTokensContainer">
            <h3>Max Tokens: </h3>
            <input type="range" name="maxTokens" id="maxTokens" min="1" max="1000" step="1" />
          </div>

          {/* Sigue el for para el chat, ese está pendiente */}

        </div>
      </div>
    </>
  )
}

export default Chat;