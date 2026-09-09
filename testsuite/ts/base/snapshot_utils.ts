//
// Copyright 2024
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file Utilities for snapshot testing.
 */

/**
 * Normalizes XML content for consistent snapshot comparison.
 * Removes volatile attributes and normalizes whitespace.
 *
 * @param xml The XML string to normalize.
 * @returns The normalized XML.
 */
export function normalizeXml(xml: string): string {
  let result = xml;
  result = result.replace(/data-semantic-id="[^"]*"/g, '');
  result = result.replace(/data-semantic-collapsed="[^"]*"/g, '');
  result = result.replace(/\s{2,}/g, ' ');
  result = result.trim();
  return result;
}

/**
 * Preprocesses XML element for snapshot comparison.
 * Normalizes the XML and returns a structured object.
 *
 * @param xmlString The XML string.
 * @returns The preprocessed data for snapshot.
 */
export function preprocessXmlForSnapshot(xmlString: string): object {
  return {
    normalized: normalizeXml(xmlString),
    original: xmlString
  };
}

/**
 * Creates a snapshot-friendly version of test data.
 * Useful for embedding test context with the actual output.
 *
 * @param testData Data containing input, actual output, and optional metadata.
 * @returns Object ready for snapshot matching.
 */
export function createSnapshotData(testData: {
  input: string;
  actual: any;
  metadata?: Record<string, any>;
}): object {
  return {
    input: testData.input,
    actual: testData.actual,
    ...(testData.metadata && { metadata: testData.metadata })
  };
}
