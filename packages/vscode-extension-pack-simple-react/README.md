Visual Studio Code Extension
--

The VSCode extension itself. Features MicroEditors for some languages such as DMN and BPMN.

## Generating the schema types for jsonix

package.json has the following script target: `"compile:schema`

The `scesim.xsd` schema is from [drools-wb](https://github.com/gitgabrio/drools-wb/blob/DROOLS-3879/drools-wb-screens/drools-wb-scenario-simulation-editor/drools-wb-scenario-simulation-editor-kogito-marshaller/src/main/resources/scesim.xsd)

Running the command requires Java 1.8, running a newer version might net this [error](https://github.com/highsource/jsonix-schema-compiler/issues/81)
TODO: Find a way to load and use a local dependency of Java 1.8

# User flow
- the user creates a DMN file.. edit and create the rules there
- close it
- then user create a NEW scesim file
- when editor open an empty scesim file.. it'll ask for the source. the user points to the DMN and then user will be guided (ie. wizard) to create the scenario to the rule