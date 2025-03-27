import { useExportStore } from '@/stores/useExportStore';
import ReactMarkdown from 'react-markdown';

export const SubmitButton = () => {
  const { buildStatus, buildData, onBuild, cancelBuild } = useExportStore();

  return (
    <div className="submit-container">
      {/* Submit button */}
      <button
        onClick={onBuild}
        disabled={buildStatus === 'pending'}
      >
        {buildStatus === 'pending' ? 'Building code...' : 'Submit to generate'}
      </button>

      {/* Cancel button */}
      {buildStatus === 'pending' && (
        <button onClick={cancelBuild}>cancel</button>
      )}

      {/* Handle error */}
      {buildStatus === 'failed' &&
        <div className="error-message">{useExportStore.getState().buildError}</div>
      }

      {/* Code display */}
      {buildData && (
        <div className="result-box markdown-content">
          <h4>Result:</h4>
          <ReactMarkdown 
            components={{
              pre: ({ node, ...props }) => <pre className="code-block" {...props} />,
              code: ({ node, ...props }) => <code className="code-inline" {...props} />
            }}
          >
            {`\`\`\`python\n${buildData.code || ''}\n\`\`\``}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};