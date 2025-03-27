import { SubmitButton } from "../ExportPanel/Submit.jsx";

import './ExportPanel.css'

const ExportPanel = () => {
  return (
      <div className="compile-panel">
          <h3> Build Pytorch Model </h3>
          <div>
            <SubmitButton />
          </div>
      </div>
    );
};

export default ExportPanel;