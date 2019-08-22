/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { useState } from "react";
import {
  Bullseye,
  Title,
  Button,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Page
} from '@patternfly/react-core';
import "spinner.scss";

export const FADE_OUT_DELAY = 400;

export function LoadingScreen(props: { visible: boolean }) {
  let cssAnimation;
  const [mustRender, setMustRender] = useState(true);

  if (props.visible) {
    cssAnimation = { opacity: 1 };
  } else {
    cssAnimation = { opacity: 0, transition: `opacity ${FADE_OUT_DELAY}ms` };
    setTimeout(() => setMustRender(false), FADE_OUT_DELAY);
  }

  return (
    <>
      {mustRender && (
        <div className="foo"
          style={{
            width: "100vw",
            height: "100vh",
            // Have to set the background?
            // backgroundColor: "#1e1e1e",
            ...cssAnimation
          }}
        >
          <Page className="pf-t-dark">
          <Bullseye>
            <EmptyState variant={EmptyStateVariant.large}>
              <div className="pf-u-mb-lg">
                <div className="pf-c-spinner" role="progressbar" aria-valuetext="Loading...">
                  <div className="pf-c-spinner__clipper" />
                  <div className="pf-c-spinner__lead-ball" />
                  <div className="pf-c-spinner__tail-ball" />
                </div>
              </div>
              <Title headingLevel="h5" size="lg">
                Loading...
              </Title>
              <EmptyStateBody />
            </EmptyState>
          </Bullseye>
          </Page>
        </div>
      )}
    </>
  );
}
