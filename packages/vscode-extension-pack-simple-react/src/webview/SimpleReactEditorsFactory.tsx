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
import * as AppFormer from "@kogito-tooling/core-api";
import * as MicroEditorEnvelope from "@kogito-tooling/microeditor-envelope";
import { EnvelopeBusInnerMessageHandler } from "@kogito-tooling/microeditor-envelope";
import { SimpleReactEditorsLanguageData } from "../common/SimpleReactEditorsLanguageData";
import { EditorContainer, getJsonFromSceSim, setSceSimFromJson, getJsonFromDmn } from 'sce-sim-grid';
// @ts-ignore
const dmnJson = require('../../data/unmarshalled_dmn.json');

export class SimpleReactEditorsFactory implements MicroEditorEnvelope.EditorFactory<SimpleReactEditorsLanguageData> {
  public createEditor(
    languageData: SimpleReactEditorsLanguageData,
    messageBus: EnvelopeBusInnerMessageHandler
  ): Promise<AppFormer.Editor> {
    switch (languageData.type) {
      case "react":
        return Promise.resolve(new ReactReadonlyAppFormerEditor(messageBus));
      default:
        throw new Error(`Unknown type ${languageData.type}`);
    }
  }
}

class ReactReadonlyAppFormerEditor extends AppFormer.Editor {
  private readonly messageBus: EnvelopeBusInnerMessageHandler;

  private self: ReactReadonlyEditor;

  constructor(messageBus: EnvelopeBusInnerMessageHandler) {
    super("readonly-react-editor");
    this.af_isReact = true;
    this.messageBus = messageBus;
  }

  public getContent(): Promise<string> {
    console.info(`getContent: ${this.self.getContent()}`);
    return this.self.getContent();
  }

  public isDirty(): boolean {
    return this.self.isDirty();
  }

  public setContent(content: string): Promise<void> {
    console.info(`setContent: ${content}`)
    return this.self.setContent(content);
  }

  public af_componentRoot(): AppFormer.Element {
    return <ReactReadonlyEditor exposing={s => (this.self = s)} messageBus={this.messageBus} />;
  }
}

interface Props {
  exposing: (s: ReactReadonlyEditor) => void;
  messageBus: EnvelopeBusInnerMessageHandler;
}

interface State {
  content: string;
  originalContent: string;
  model: any;
}

class ReactReadonlyEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    props.exposing(this);
    this.state = {
      originalContent: "",
      content: "",
      model: null
    };
  }

  public setContent(content: string) {
    console.log(`setContent`);
    console.log(content);
    return new Promise<void>(res =>
      this.setState({ originalContent: content }, () => {
        res();
      })
    ).then(() => {
      if (content) {
        this.updateContent(getJsonFromSceSim(content));
      }
    });
  }

  private updateContent(content: string) {
    // console.log('converted scesim')
    // console.log(content);
    return new Promise<void>(res => {
      this.setState({ content: content }, () => {
        this.props.messageBus.notify_dirtyIndicatorChange(this.isDirty());
        res();
      });
    });
  }

  //saving triggers this method, so we also update the originalContent by calling `this.setContent`
  public getContent() {
    console.log(`ReactReadonlyEditor getContent`);
    console.log(this.state.content); // JSON object
    const asd = setSceSimFromJson(this.state.content);
    console.log(asd);
    return this.setContent(asd).then(() => this.state.content);
  }

  public isDirty() {
    return false;
    // return this.state.content !== this.state.originalContent;
  }

  public render() {
    const { content } = this.state;
    console.log(`content:`);
    console.log(content);
    console.log(`dmn:`);
    console.log(dmnJson);
    return (
      <React.Fragment>
      {(content && dmnJson) ? (
        <EditorContainer data={content} model={dmnJson} readOnly={false} />
      ) : <div>Loading</div>}
      </React.Fragment>
    );
  }
}
