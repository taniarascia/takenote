import React, { useState } from "react";

export interface ToolTipProps {
    content:string,
    children:JSX.Element | any
}

const Tooltip : React.FC<ToolTipProps> = ({children,content}) => {
  const [active, setActive] = useState(false);
  const showTip = () => {
      setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className="Tooltip-Tip">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
