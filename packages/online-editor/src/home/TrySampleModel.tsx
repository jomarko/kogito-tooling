import { EditorType, File, newFile } from "@kogito-tooling/embedded-editor";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Title
} from "@patternfly/react-core";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../common/GlobalContext";

interface Props {
    editorType: EditorType;
    onFileOpened: (file: File) => void;
}

export function TrySampleModel(props: Props) {
    const context = useContext(GlobalContext);
    const history = useHistory();

    function cardTitle(editorType: EditorType): string {
        if (editorType == EditorType.BPMN) {
            return "Workflow (.BPMN)";
        } else {
            return "Decision model (.DMN)";
        }
    }

    function cardDescription(editorType: EditorType): string {
        if (editorType == EditorType.BPMN) {
            return "BPMN files are used to generate business processes.";
        } else {
            return "DMN files are used to generate decision models.";
        }
    }

    function cardNewModelButtonDescription(editorType: EditorType): string {
        if (editorType == EditorType.BPMN) {
            return "Create new workflow";
        } else {
            return "Create new decision model";
        }
    }

    const createEmptyFile = useCallback(
        () => {
            const editorType = props.editorType;
            props.onFileOpened(newFile(editorType));
            history.replace(context.routes.editor.url({ type: editorType }));
        },
        [context, history]
    );

    const trySample = useCallback(
        () => {
            const editorType = props.editorType;
            const fileName = "sample";
            const filePath = `samples/${fileName}.${editorType}`;
            props.onFileOpened({
                isReadOnly: false,
                editorType: editorType,
                fileName: fileName,
                getFileContents: () => fetch(filePath).then(response => response.text())
            });
            history.replace(context.routes.editor.url({ type: editorType }));
        },
        [context, history]
    );

    return (
        <Card data-ouia-component-type="try-sample-model" data-ouia-component-id={props.editorType}>
            <CardHeader>
                <Title headingLevel="h2" size="2xl">
                    {cardTitle(props.editorType)}
                </Title>
            </CardHeader>
            <CardBody isFilled={false}>
                {cardDescription(props.editorType)}
            </CardBody>
            <CardBody isFilled={true}>
                <Button variant="link" isInline={true} onClick={trySample}>
                    Try Sample
                </Button>
            </CardBody>
            <CardFooter>
                <Button variant="secondary" onClick={createEmptyFile}>
                    {cardNewModelButtonDescription(props.editorType)}
                </Button>
            </CardFooter>
        </Card>
    );
}