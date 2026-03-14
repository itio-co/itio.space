'use client'
import type { PipelineExecution } from '@/domain/langchain/types'

type Props = {
  execution: PipelineExecution | null
  isValidating: boolean
  validationErrors: string[]
}

export default function ExecutionResultOverlay({ execution, isValidating, validationErrors }: Props) {
  return (
    <div style={{ fontSize: 12, maxHeight: '100%', overflow: 'auto' }}>
      {isValidating && (
        <div style={{ color: '#666', padding: 8 }}>Validating...</div>
      )}

      {validationErrors.length > 0 && (
        <div style={{ padding: 8 }}>
          <div style={{ fontWeight: 'bold', color: '#f44336', marginBottom: 4 }}>Validation Errors</div>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {validationErrors.map((err, i) => (
              <li key={i} style={{ color: '#f44336', marginBottom: 2 }}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {execution && (
        <div style={{ padding: 8 }}>
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
            Status:{' '}
            <span style={{
              color: execution.status === 'success' ? '#4caf50' :
                     execution.status === 'error' ? '#f44336' :
                     execution.status === 'running' ? '#2196f3' : '#666'
            }}>
              {execution.status}
            </span>
          </div>

          {execution.error && (
            <div style={{ color: '#f44336', background: '#ffebee', padding: 8, borderRadius: 4, marginBottom: 8 }}>
              {execution.error}
            </div>
          )}

          {execution.result && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 2 }}>Result</div>
              <div style={{
                background: '#f5f5f5',
                padding: 8,
                borderRadius: 4,
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: 11,
                maxHeight: 200,
                overflow: 'auto',
              }}>
                {execution.result}
              </div>
            </div>
          )}

          {execution.logs.length > 0 && (
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Step Logs</div>
              {execution.logs.map((log, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fafafa',
                    border: '1px solid #e0e0e0',
                    borderRadius: 4,
                    padding: 6,
                    marginBottom: 4,
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: 11 }}>
                    Node: {log.nodeId} ({log.durationMs}ms)
                  </div>
                  <div style={{ fontSize: 10, color: '#666' }}>
                    <strong>In:</strong> {log.input.substring(0, 100)}{log.input.length > 100 ? '...' : ''}
                  </div>
                  <div style={{ fontSize: 10, color: '#333' }}>
                    <strong>Out:</strong> {log.output.substring(0, 200)}{log.output.length > 200 ? '...' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
