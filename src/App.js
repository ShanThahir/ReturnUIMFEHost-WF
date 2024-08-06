import React from 'react';

const MicroFrontend1 = React.lazy(() => import('remoteApp1/App'));
const TooltipIcon = React.lazy(() => import('remoteApp1/TooltipIcon'));
const CustomCheckBox = React.lazy(() => import('remoteApp1/CustomCheckBox'));

const App = () => {
  return (
    <div>
      <h1>Main Application</h1>
      <React.Suspense fallback="Loading...">
        <TooltipIcon
              title="For Each parts max 6 Image can be uploaded"
              placement="top" >
            <MicroFrontend1 />
        </TooltipIcon>
        <CustomCheckBox
                  label="Allow customer to view"
                  fontFamily= "Mukta"
                  fontSize="14px"
                  fontWeight={400}
                />
      </React.Suspense>
    </div>
  );
};

export default App;