import assert from 'node:assert/strict'
import test from 'node:test'
import { isNewerVersion } from '../src/lib/version.ts'

test('deployment version comparison detects only valid newer releases', () => {
  assert.equal(isNewerVersion('1.0.1', '1.0.0'), true)
  assert.equal(isNewerVersion('1.0.0', '1.0.0'), false)
  assert.equal(isNewerVersion('0.9.9', '1.0.0'), false)
  assert.equal(isNewerVersion('1.1.0', '1.0.9'), true)
  assert.equal(isNewerVersion('2.0.0', '1.99.99'), true)
  assert.equal(isNewerVersion('1.0', '1.0.0'), false)
  assert.equal(isNewerVersion('release-1.0.1', '1.0.0'), false)
  assert.equal(isNewerVersion('1.0.1', 'current'), false)
})
