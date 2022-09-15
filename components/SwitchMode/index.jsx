import { Fragment } from "react";
import { useDarkMode } from 'next-dark-mode'

export function SwitchMode(){

  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode()

  const findActive = (text) => {
    if (darkModeActive) return text === 'dark'
    else return text === 'light'
  }

  const toggleMode = (text) => {
    if (text === 'Dark') switchToDarkMode()
    if (text === 'Light') switchToLightMode()
  }

    return (
        <div className="switch">
        {['Dark', 'Light'].map((text, index) => (
          <Fragment key={index}>
            <input
              checked={findActive(text.toLowerCase())}
              id={`_${index}`}
              name="switch"
              onChange={() => toggleMode(text)}
              type="radio"
            />
            <label className="switch__label" htmlFor={`_${index}`}>
              {text}
            </label>
          </Fragment>
        ))}
        <div className="switch__indicator" />
      </div>
    )
}

export default SwitchMode;