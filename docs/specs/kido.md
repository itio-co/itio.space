# Spec: Kido — LangChain Pipeline Visualization Board

## Overview

Add a new board type to itio.space that lets users visually construct and execute LangChain pipelines. Users drag-and-drop LangChain concept nodes (LLM, Prompt Template, Chain, Tool, Memory, Output Parser) onto the canvas, connect them, and run the pipeline against a real LangChain backend.

## Board Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  [UserProfile]                                          top-right  │
│                                                                     │
│  ┌──────────┐  ┌────────────────────────────────┐  ┌────────────┐  │
│  │  NODE     │  │                                │  │ EXECUTION  │  │
│  │  PALETTE  │  │         CANVAS                 │  │ PANEL      │  │
│  │           │  │    (ReactFlow / xyflow)         │  │            │  │
│  │  [LLM]    │  │                                │  │ [Validate] │  │
│  │  [Prompt] │  │   ┌─────────┐   ┌─────────┐   │  │ [Execute]  │  │
│  │  [Chain]  │  │   │ Prompt  │──▶│   LLM   │   │  │            │  │
│  │  [Tool]   │  │   │Template │   │         │   │  │ Inputs:    │  │
│  │  [Memory] │  │   └─────────┘   └────┬────┘   │  │ [key=val]  │  │
│  │  [Parser] │  │                      │         │  │            │  │
│  │           │  │               ┌──────▼──────┐  │  │ Results:   │  │
│  │           │  │               │   Output    │  │  │ [logs...]  │  │
│  │           │  │               │   Parser    │  │  │            │  │
│  │           │  │               └─────────────┘  │  │            │  │
│  │           │  │                                │  │            │  │
│  └──────────┘  └────────────────────────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Specs:**
- Left panel: `width: 200px`, `background: #f8f9fa`, `border-right: 1px solid #e0e0e0`
- Right panel: `width: 280px`, `background: #f8f9fa`, `border-left: 1px solid #e0e0e0`
- Canvas: fills remaining space, white background
- Panel z-index: above ReactFlow controls

## Node Types

Six custom xyflow node types represent LangChain concepts.

### Handle Convention

Every node has:
- **Target handle** (top) — receives input from upstream nodes
- **Source handle** (bottom) — sends output to downstream nodes

Handle IDs encode the data type for connection validation.

### Node Specifications

| Node Type | xyflow type | Color | Icon | Description |
|-----------|-------------|-------|------|-------------|
| LLM | `lcLlm` | Green (`#4caf50` / `#e8f5e9`) | Brain | Configures an LLM provider and model |
| Prompt Template | `lcPromptTemplate` | Blue (`#2196f3` / `#e3f2fd`) | Template | Defines a prompt with `{variable}` placeholders |
| Chain | `lcChain` | Purple (`#9c27b0` / `#f3e5f5`) | Link | Orchestrates multi-step pipelines |
| Tool | `lcTool` | Orange (`#ff9800` / `#fff3e0`) | Wrench | External tools (search, calculator, custom) |
| Memory | `lcMemory` | Teal (`#009688` / `#e0f2f1`) | Database | Conversation memory/context |
| Output Parser | `lcOutputParser` | Coral (`#f44336` / `#ffebee`) | Filter | Parses LLM output into structured format |

### Node Size & Style

```
┌─────────────────────┐
│  ○ (target handle)  │
│  ┌────────────────┐ │
│  │ 🧠 LLM Node   │ │
│  ├────────────────┤ │
│  │ Provider: [...] │ │
│  │ Model:    [...] │ │
│  │ Temp:     [===] │ │
│  │ MaxTok:   [===] │ │
│  └────────────────┘ │
│  ○ (source handle)  │
└─────────────────────┘
```

**Specs:**
- Width: `220px`, min-height: `120px`
- Border: `2px solid {nodeColor}`
- Background: `{nodeBackgroundColor}`
- Border radius: `8px`
- Padding: `12px`
- Header: bold, `14px`, with icon
- Fields: `12px`, standard form inputs
- Handle size: `10px`, border: `2px solid {nodeColor}`

### LLM Node

- **Provider dropdown**: OpenAI, Anthropic
- **Model selector**: changes based on provider (gpt-4, gpt-3.5-turbo, claude-3, etc.)
- **Temperature slider**: 0.0 — 2.0, step 0.1, default 0.7
- **Max tokens input**: number, default 1024

### Prompt Template Node

- **Template textarea**: multi-line, with `{variable}` syntax highlighting
- **Auto-detected variables**: shown as chips below the textarea
- Dynamic target handles: one per detected `{variable}`

### Chain Node

- **Chain type dropdown**: Sequential, Stuff Documents, Router
- **Name input**: user-defined name for the chain
- Multiple numbered target handles for inputs

### Tool Node

- **Tool type dropdown**: SerpAPI, Calculator, Custom
- **Config fields**: dynamic based on tool type (e.g., API key field for SerpAPI)

### Memory Node

- **Memory type dropdown**: Buffer, Summary, Vector Store
- **k parameter**: number input (for buffer window memory), optional

### Output Parser Node

- **Parser type dropdown**: String, JSON, List, Structured
- **Schema editor**: JSON textarea (for structured output parser), optional

## Connection Rules

| Source Node | Valid Target Nodes |
|-------------|-------------------|
| Prompt Template | LLM, Chain |
| LLM | Output Parser, Chain, Tool |
| Chain | Output Parser, LLM |
| Tool | Chain, LLM |
| Memory | LLM, Chain |
| Output Parser | (terminal — no outgoing connections) |

Invalid connections show a red indicator and are rejected.

## API Contract

### POST `/api/langchain/validate`

**Request:**
```json
{
  "pipeline": {
    "nodes": [{ "id": "...", "type": "lcLlm", "data": { ... } }],
    "edges": [{ "source": "...", "target": "...", "sourceHandle": "...", "targetHandle": "..." }]
  }
}
```

**Response:**
```json
{
  "valid": true,
  "errors": []
}
```

Validation checks:
- Graph is a DAG (no cycles)
- All required node fields are populated
- All connections follow the connection rules
- At least one terminal node exists

### POST `/api/langchain/execute`

**Request:**
```json
{
  "pipeline": { ... },
  "inputs": { "topic": "AI safety", "format": "bullet points" }
}
```

**Response:**
```json
{
  "id": "exec-123",
  "status": "success",
  "result": "...",
  "error": null,
  "logs": [
    { "nodeId": "prompt-1", "input": "...", "output": "...", "durationMs": 5 },
    { "nodeId": "llm-1", "input": "...", "output": "...", "durationMs": 1200 }
  ]
}
```

API keys are server-side only (`process.env`), never sent from the client.

## Execution Flow

```
User clicks "Validate"
  → Client calls POST /api/langchain/validate
  → Server checks DAG, required fields, connection rules
  → Response displayed in execution panel (errors or "Valid")

User fills input variables, clicks "Execute"
  → Client calls POST /api/langchain/execute
  → Server topologically sorts nodes
  → For each node (in order):
    → Constructs LangChain object
    → Executes with input from upstream nodes
    → Records step log (input, output, duration)
    → Node on canvas shows animated green border (running)
  → On completion:
    → Successful nodes get green border
    → Failed nodes get red border
    → Edges animate along execution path
    → Results panel shows step-by-step logs + final output

User clicks elsewhere / deselects
  → Execution visualization clears
```

## Execution Visualization

- **Running node**: pulsing green border animation (`@keyframes pulse`)
- **Success node**: solid green border (`2px solid #4caf50`)
- **Error node**: solid red border (`2px solid #f44336`)
- **Active edge**: `animated: true` (xyflow built-in dashed animation)
- **Idle state**: normal node borders, no edge animation

## Starter Board (Default)

When the langchain space is first opened, it loads a starter pipeline:

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Prompt Template │────▶│      LLM       │────▶│ Output Parser  │
│                │     │                │     │   (String)     │
│ "Tell me about │     │ OpenAI         │     │                │
│  {topic}"      │     │ gpt-4          │     │                │
└────────────────┘     └────────────────┘     └────────────────┘
```

## Files Created

| File | Purpose |
|------|---------|
| `docs/specs/kido.md` | This specification |
| `src/domain/langchain/types.ts` | Domain type definitions |
| `src/ports/langchain/LangChainExecutionPort.ts` | Execution port interface |
| `src/adapters/langchain/ApiLangChainExecutionAdapter.ts` | API client adapter |
| `src/services/langchain/LangChainService.ts` | Business logic service |
| `src/components/xyflow/langchain/LlmNode.tsx` | LLM node component |
| `src/components/xyflow/langchain/PromptTemplateNode.tsx` | Prompt template node |
| `src/components/xyflow/langchain/ChainNode.tsx` | Chain node component |
| `src/components/xyflow/langchain/ToolNode.tsx` | Tool node component |
| `src/components/xyflow/langchain/MemoryNode.tsx` | Memory node component |
| `src/components/xyflow/langchain/OutputParserNode.tsx` | Output parser node |
| `src/components/xyflow/langchain/ExecutionResultOverlay.tsx` | Results panel |
| `src/components/xyflow/langchain/index.ts` | Node type registry |
| `src/components/xyflow/LangChainBoard.tsx` | Main board component |
| `src/helper/langchain/connectionValidator.ts` | Connection validation |
| `src/helper/langchain/pipelineBuilder.ts` | Graph-to-pipeline converter |
| `src/redux/langchainSlice.ts` | Redux execution state |
| `src/pages/api/langchain/validate.ts` | Validation API route |
| `src/pages/api/langchain/execute.ts` | Execution API route |
| `src/constants/boards/langchain-board.tsx` | Starter board data |

## Files Modified

| File | Change |
|------|--------|
| `src/constants/boards/index.tsx` | Add `'langchain': langchainBoard` entry |
| `src/constants/space-list.tsx` | Add langchain space to list |
| `src/redux/store.ts` | Register langchain reducer |
| `src/pages/itio-space/[spaceId].tsx` | Conditional render for LangChainBoard |
