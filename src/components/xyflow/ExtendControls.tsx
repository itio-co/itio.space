// src/components/xyflow/ExtendControls.tsx
import React from 'react';
import {
  Controls,
  ControlButton,
  useReactFlow,
  ControlProps,
} from '@xyflow/react';
import { GoScreenNormal } from "react-icons/go";

// ExtendControlsProps interface for ExtendControls component
export interface ExtendControlProps extends ControlProps {
  // showZoomTo100 prop for showing zoom to 100% button
  // default: false
  showZoomTo100?: boolean;

  // children prop for rendering children
  children?: React.ReactNode; // Add children prop
}

// ExtendControls component for extending the Controls component
const ExtendControls: React.FC<ExtendControlProps> = ({
  showZoomTo100 = false, // default value for showZoomTo100 prop
  children, // children prop
  ...props // rest props
}) => {
  const reactFlowInstance = useReactFlow();

  const zoomTo100 = () => {
    reactFlowInstance?.zoomTo(1); // Use 1 for 100% zoom level
  };

  return (
    <Controls {...props}>
      {showZoomTo100 && (
        <ControlButton onClick={zoomTo100} title="zoom to 100%">
          <GoScreenNormal />
        </ControlButton>
      )}
      {children} {/* Render children here */}
    </Controls>
  );
};

export default ExtendControls;
