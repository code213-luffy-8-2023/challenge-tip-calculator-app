import { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";

// For a better project organization we can extract the components to separate files
// TODO: Move the components to separate files
// TODO: Extract the result-display and result-value to a separate component
// TODO: Extract the input-group to a separate component

/**
 * This is a component that renders a button that when clicked will set the tip to the percentage passed to the component
 * @param {} props - the props passed to the component
 * @returns a button that when clicked will set the tip to the percentage passed to the component
 */
function TipButton(props) {
  return (
    <button
      onClick={() => {
        props.setTip(props.percentage);
      }}
      type="button"
      className={`tip-btn ${props.tip == props.percentage ? "active" : ""}`}
    >
      {props.percentage}%
    </button>
  );
}

// This is used to validate the props passed to the component
// this is optional but it's a good practice
// if you define the prop types you will get a warning in the console
// if you pass a prop with the wrong type or if you forget to pass a required prop
// try it out by removing the tip prop from the TipButton component in the App component
TipButton.propTypes = {
  percentage: PropTypes.number.isRequired,
  setTip: PropTypes.func.isRequired,
  tip: PropTypes.string.isRequired,
};

/**
 * This is a component that renders an svg icon
 * @returns an svg icon
 */
function PersonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16">
      <path
        fill="#9EBBBD"
        d="M9.573 7.729c.406 0 .784.07 1.126.209.342.14.639.33.881.569.232.227.438.503.614.82a5.1 5.1 0 01.407.949c.097.312.178.654.242 1.016.062.359.105.699.126 1.011.02.307.031.624.031.945 0 .836-.259 1.512-.768 2.01-.504.492-1.17.742-1.98.742H2.748c-.81 0-1.477-.25-1.98-.742C.259 14.76 0 14.084 0 13.248c0-.322.01-.64.032-.945.02-.312.063-.652.126-1.01.063-.363.144-.705.242-1.017.1-.323.238-.643.407-.948.176-.318.382-.594.613-.821.243-.238.54-.43.882-.57.342-.138.72-.208 1.125-.208.16 0 .313.067.61.265.183.123.397.264.636.421.204.134.48.259.822.372.333.11.671.167 1.005.167a3.19 3.19 0 001.006-.167c.341-.113.618-.238.822-.372l.636-.42c.296-.2.45-.266.61-.266zM6.598 0C7.63 0 8.522.38 9.252 1.129s1.1 1.666 1.1 2.724c0 1.06-.37 1.976-1.1 2.725-.73.75-1.623 1.13-2.654 1.13-1.03 0-1.924-.38-2.653-1.13-.73-.749-1.1-1.666-1.1-2.725 0-1.058.37-1.975 1.1-2.724C4.675.379 5.567 0 6.598 0z"
      />
    </svg>
  );
}

// this is an array of tip percentages, we use it to dynamically render the tip buttons
const tips = [5, 10, 15, 25, 50];

//0670048543

function App() {
  // state variable that holds the bill value
  const [bill, setBill] = useState("");

  // state variable that holds the tip value
  const [tip, setTip] = useState("");

  // state variable that holds the number of people value
  const [numberOfPeople, setNumberOfPeople] = useState("");

  // this is the tip per person
  // NOTE: This variable will be recalculate every time the bill, tip or number of people changes
  // variables that depend on state variables will be recalculated every time the state variable changes
  // toFixed is used to round the number to 2 decimal places
  const tipPerPerson = ((bill * tip) / 100 / numberOfPeople).toFixed(2);

  // this is the total per person
  // toFixed is used to round the number to 2 decimal places
  const totalPerPerson = (
    bill / numberOfPeople +
    (bill * tip) / 100 / numberOfPeople
  ).toFixed(2);

  return (
    <div className="app">
      <h1 className="title">
        <span>spli</span>
        <span>tter</span>
      </h1>
      <div className="card">
        <form className="inputs">
          <div className="input-group">
            <label htmlFor="bill" className="label">
              Bill
            </label>
            <div className="input-wrapper">
              <input
                value={bill}
                onChange={(e) => {
                  setBill(e.target.value);
                }}
                type="number"
                id="bill"
                placeholder="0"
              />
              <span>$</span>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="tip" className="label">
              Tip %
            </label>
            <div className="tips">
              {
                // We use the map function to dynamically render the TipButtons from the tips array
                tips.map((tipPercentage) => (
                  <TipButton
                    key={tipPercentage}
                    percentage={tipPercentage}
                    setTip={setTip}
                    tip={tip}
                  />
                ))
              }
              <input
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                type="number"
                id="tip"
                placeholder="Custom"
              />
            </div>
          </div>
          <div className="input-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label htmlFor="people" className="label">
                Number of People
              </label>
              {numberOfPeople == "0" && (
                <span
                  style={{
                    color: "red",
                  }}
                  className="label"
                >
                  Can not be zero
                </span>
              )}
            </div>

            <div className="input-wrapper">
              <input
                className={`${numberOfPeople == "0" ? "error" : ""}`}
                value={numberOfPeople}
                onChange={(e) => {
                  setNumberOfPeople(e.target.value);
                }}
                type="number"
                id="people"
                placeholder="0"
              />
              <span>
                <PersonIcon />
              </span>
            </div>
          </div>
        </form>
        <div className="results">
          <div className="result-display">
            <div className="result-name">
              <span>Tip Amount</span>
              <span>/ person</span>
            </div>
            <div className="result-value">
              <span>
                ${tipPerPerson && !isNaN(tipPerPerson) ? tipPerPerson : "0"}
              </span>
            </div>
          </div>

          <div className="result-display">
            <div className="result-name">
              <span>Total</span>
              <span>/ person</span>
            </div>
            <div className="result-value">
              <span>
                $
                {totalPerPerson && !isNaN(totalPerPerson)
                  ? totalPerPerson
                  : "0"}
              </span>
            </div>
          </div>
          <div className="spacer"></div>
          <button
            onClick={() => {
              setBill("");
              setTip("");
              setNumberOfPeople("");
            }}
            type="button"
            className="reset-btn"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
