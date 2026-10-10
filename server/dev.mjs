import { spawn } from 'node:child_process'

const children = [
  spawn(process.execPath, ['server/index.mjs'], { stdio: 'inherit' }),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '0.0.0.0'], { stdio: 'inherit' }),
]
let stopping = false

function stopChildren(exitCode = 0) {
  if (stopping) return
  stopping = true
  process.exitCode = exitCode
  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) child.kill()
  }
}

for (const child of children) {
  child.once('error', (error) => {
    console.error('Unable to start the development server:', error)
    stopChildren(1)
  })
  child.once('exit', (code) => {
    if (!stopping) stopChildren(code ?? 1)
  })
}

process.once('SIGINT', () => stopChildren())
process.once('SIGTERM', () => stopChildren())
