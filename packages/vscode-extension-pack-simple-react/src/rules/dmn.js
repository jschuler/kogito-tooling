/* eslint-disable */
var dmn_Module_Factory = function () {
  var dmn = {
    name: 'dmn',
    defaultElementNamespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/MODEL\/',
    typeInfos: [{
        localName: 'TList',
        typeName: 'tList',
        baseTypeInfo: '.TExpression',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'expression',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.TExpression',
            type: 'elementRef'
          }]
      }, {
        localName: 'TItemDefinition',
        typeName: 'tItemDefinition',
        baseTypeInfo: '.TNamedElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'typeRef',
            required: true
          }, {
            name: 'allowedValues',
            typeInfo: '.TUnaryTests'
          }, {
            name: 'itemComponent',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TItemDefinition'
          }, {
            name: 'typeLanguage',
            attributeName: {
              localPart: 'typeLanguage'
            },
            type: 'attribute'
          }, {
            name: 'isCollection',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'isCollection'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TInvocation',
        typeName: 'tInvocation',
        baseTypeInfo: '.TExpression',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'expression',
            mixed: false,
            allowDom: false,
            typeInfo: '.TExpression',
            type: 'elementRef'
          }, {
            name: 'binding',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TBinding'
          }]
      }, {
        localName: 'TDecisionService',
        typeName: 'tDecisionService',
        baseTypeInfo: '.TInvocable',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'outputDecision',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'encapsulatedDecision',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'inputDecision',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'inputData',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }]
      }, {
        localName: 'Edge',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/',
          localPart: 'Edge'
        },
        baseTypeInfo: '.DiagramElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'waypoint',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'waypoint',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/'
            },
            typeInfo: '.Point'
          }]
      }, {
        localName: 'TInformationRequirement',
        typeName: 'tInformationRequirement',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'requiredDecision',
            required: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'requiredInput',
            required: true,
            typeInfo: '.TDMNElementReference'
          }]
      }, {
        localName: 'DMNDecisionServiceDividerLine',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/',
          localPart: 'DMNDecisionServiceDividerLine'
        },
        baseTypeInfo: '.Edge',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'TInputData',
        typeName: 'tInputData',
        baseTypeInfo: '.TDRGElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'variable',
            typeInfo: '.TInformationItem'
          }]
      }, {
        localName: 'TOutputClause',
        typeName: 'tOutputClause',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'outputValues',
            typeInfo: '.TUnaryTests'
          }, {
            name: 'defaultOutputEntry',
            typeInfo: '.TLiteralExpression'
          }, {
            name: 'name',
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }, {
            name: 'typeRef',
            attributeName: {
              localPart: 'typeRef'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TDecision',
        typeName: 'tDecision',
        baseTypeInfo: '.TDRGElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'question'
          }, {
            name: 'allowedAnswers'
          }, {
            name: 'variable',
            typeInfo: '.TInformationItem'
          }, {
            name: 'informationRequirement',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TInformationRequirement'
          }, {
            name: 'knowledgeRequirement',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TKnowledgeRequirement'
          }, {
            name: 'authorityRequirement',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TAuthorityRequirement'
          }, {
            name: 'supportedObjective',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'impactedPerformanceIndicator',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'decisionMaker',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'decisionOwner',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'usingProcess',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'usingTask',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'expression',
            mixed: false,
            allowDom: false,
            typeInfo: '.TExpression',
            type: 'elementRef'
          }]
      }, {
        localName: 'Dimension',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/',
          localPart: 'Dimension'
        },
        propertyInfos: [{
            name: 'width',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'width'
            },
            type: 'attribute'
          }, {
            name: 'height',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'height'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TDMNElement.ExtensionElements',
        typeName: null,
        propertyInfos: [{
            name: 'any',
            minOccurs: 0,
            collection: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'TOrganizationUnit',
        typeName: 'tOrganizationUnit',
        baseTypeInfo: '.TBusinessContextElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'decisionMade',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'decisionOwned',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }]
      }, {
        localName: 'DMNShape',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/',
          localPart: 'DMNShape'
        },
        baseTypeInfo: '.Shape',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'dmnLabel',
            elementName: {
              localPart: 'DMNLabel',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.DMNLabel'
          }, {
            name: 'dmnDecisionServiceDividerLine',
            elementName: {
              localPart: 'DMNDecisionServiceDividerLine',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.DMNDecisionServiceDividerLine'
          }, {
            name: 'dmnElementRef',
            required: true,
            typeInfo: 'QName',
            attributeName: {
              localPart: 'dmnElementRef'
            },
            type: 'attribute'
          }, {
            name: 'isListedInputData',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'isListedInputData'
            },
            type: 'attribute'
          }, {
            name: 'isCollapsed',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'isCollapsed'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TAuthorityRequirement',
        typeName: 'tAuthorityRequirement',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'requiredDecision',
            required: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'requiredInput',
            required: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'requiredAuthority',
            required: true,
            typeInfo: '.TDMNElementReference'
          }]
      }, {
        localName: 'DMNStyle',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/',
          localPart: 'DMNStyle'
        },
        baseTypeInfo: '.Style',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'fillColor',
            elementName: {
              localPart: 'FillColor',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.Color'
          }, {
            name: 'strokeColor',
            elementName: {
              localPart: 'StrokeColor',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.Color'
          }, {
            name: 'fontColor',
            elementName: {
              localPart: 'FontColor',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.Color'
          }, {
            name: 'fontFamily',
            attributeName: {
              localPart: 'fontFamily'
            },
            type: 'attribute'
          }, {
            name: 'fontSize',
            typeInfo: 'Double',
            attributeName: {
              localPart: 'fontSize'
            },
            type: 'attribute'
          }, {
            name: 'fontItalic',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'fontItalic'
            },
            type: 'attribute'
          }, {
            name: 'fontBold',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'fontBold'
            },
            type: 'attribute'
          }, {
            name: 'fontUnderline',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'fontUnderline'
            },
            type: 'attribute'
          }, {
            name: 'fontStrikeThrough',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'fontStrikeThrough'
            },
            type: 'attribute'
          }, {
            name: 'labelHorizontalAlignement',
            typeInfo: '.AlignmentKind',
            attributeName: {
              localPart: 'labelHorizontalAlignement'
            },
            type: 'attribute'
          }, {
            name: 'labelVerticalAlignment',
            typeInfo: '.AlignmentKind',
            attributeName: {
              localPart: 'labelVerticalAlignment'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Bounds',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/',
          localPart: 'Bounds'
        },
        propertyInfos: [{
            name: 'x',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'x'
            },
            type: 'attribute'
          }, {
            name: 'y',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'y'
            },
            type: 'attribute'
          }, {
            name: 'width',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'width'
            },
            type: 'attribute'
          }, {
            name: 'height',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'height'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Style.Extension',
        typeName: null,
        propertyInfos: [{
            name: 'any',
            minOccurs: 0,
            collection: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'TBinding',
        typeName: 'tBinding',
        propertyInfos: [{
            name: 'parameter',
            required: true,
            typeInfo: '.TInformationItem'
          }, {
            name: 'expression',
            mixed: false,
            allowDom: false,
            typeInfo: '.TExpression',
            type: 'elementRef'
          }]
      }, {
        localName: 'TDMNElement',
        typeName: 'tDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'description'
          }, {
            name: 'extensionElements',
            typeInfo: '.TDMNElement.ExtensionElements'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'id'
            },
            type: 'attribute'
          }, {
            name: 'label',
            attributeName: {
              localPart: 'label'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TKnowledgeRequirement',
        typeName: 'tKnowledgeRequirement',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'requiredKnowledge',
            required: true,
            typeInfo: '.TDMNElementReference'
          }]
      }, {
        localName: 'Shape',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/',
          localPart: 'Shape'
        },
        baseTypeInfo: '.DiagramElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'bounds',
            elementName: {
              localPart: 'Bounds',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/'
            },
            typeInfo: '.Bounds'
          }]
      }, {
        localName: 'TLiteralExpression',
        typeName: 'tLiteralExpression',
        baseTypeInfo: '.TExpression',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'text',
            required: true
          }, {
            name: 'importedValues',
            required: true,
            typeInfo: '.TImportedValues'
          }, {
            name: 'expressionLanguage',
            attributeName: {
              localPart: 'expressionLanguage'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TBusinessKnowledgeModel',
        typeName: 'tBusinessKnowledgeModel',
        baseTypeInfo: '.TInvocable',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'encapsulatedLogic',
            typeInfo: '.TFunctionDefinition'
          }, {
            name: 'knowledgeRequirement',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TKnowledgeRequirement'
          }, {
            name: 'authorityRequirement',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TAuthorityRequirement'
          }]
      }, {
        localName: 'TContextEntry',
        typeName: 'tContextEntry',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'variable',
            typeInfo: '.TInformationItem'
          }, {
            name: 'expression',
            required: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.TExpression',
            type: 'elementRef'
          }]
      }, {
        localName: 'TRelation',
        typeName: 'tRelation',
        baseTypeInfo: '.TExpression',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'column',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TInformationItem'
          }, {
            name: 'row',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TList'
          }]
      }, {
        localName: 'TInputClause',
        typeName: 'tInputClause',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'inputExpression',
            required: true,
            typeInfo: '.TLiteralExpression'
          }, {
            name: 'inputValues',
            typeInfo: '.TUnaryTests'
          }]
      }, {
        localName: 'TImportedValues',
        typeName: 'tImportedValues',
        baseTypeInfo: '.TImport',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'importedElement',
            required: true
          }, {
            name: 'expressionLanguage',
            attributeName: {
              localPart: 'expressionLanguage'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TNamedElement',
        typeName: 'tNamedElement',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'name',
            required: true,
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TArtifact',
        typeName: 'tArtifact',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'TTextAnnotation',
        typeName: 'tTextAnnotation',
        baseTypeInfo: '.TArtifact',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'text'
          }, {
            name: 'textFormat',
            attributeName: {
              localPart: 'textFormat'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TInformationItem',
        typeName: 'tInformationItem',
        baseTypeInfo: '.TNamedElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'typeRef',
            attributeName: {
              localPart: 'typeRef'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Style',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/',
          localPart: 'Style'
        },
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'extension',
            elementName: {
              localPart: 'extension',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/'
            },
            typeInfo: '.Style.Extension'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DMNLabel',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/',
          localPart: 'DMNLabel'
        },
        baseTypeInfo: '.Shape',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'text',
            elementName: {
              localPart: 'Text',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            }
          }]
      }, {
        localName: 'TRuleAnnotationClause',
        typeName: 'tRuleAnnotationClause',
        propertyInfos: [{
            name: 'name',
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TAssociation',
        typeName: 'tAssociation',
        baseTypeInfo: '.TArtifact',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'sourceRef',
            required: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'targetRef',
            required: true,
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'associationDirection',
            typeInfo: '.TAssociationDirection',
            attributeName: {
              localPart: 'associationDirection'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DMNEdge',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/',
          localPart: 'DMNEdge'
        },
        baseTypeInfo: '.Edge',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'dmnLabel',
            elementName: {
              localPart: 'DMNLabel',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.DMNLabel'
          }, {
            name: 'dmnElementRef',
            required: true,
            typeInfo: 'QName',
            attributeName: {
              localPart: 'dmnElementRef'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TUnaryTests',
        typeName: 'tUnaryTests',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'text',
            required: true
          }, {
            name: 'expressionLanguage',
            attributeName: {
              localPart: 'expressionLanguage'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TDefinitions',
        typeName: 'tDefinitions',
        baseTypeInfo: '.TNamedElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: '_import',
            minOccurs: 0,
            collection: true,
            elementName: 'import',
            typeInfo: '.TImport'
          }, {
            name: 'itemDefinition',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TItemDefinition'
          }, {
            name: 'drgElement',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.TDRGElement',
            type: 'elementRef'
          }, {
            name: 'artifact',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.TArtifact',
            type: 'elementRef'
          }, {
            name: 'elementCollection',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TElementCollection'
          }, {
            name: 'businessContextElement',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            typeInfo: '.TBusinessContextElement',
            type: 'elementRef'
          }, {
            name: 'dmndi',
            elementName: {
              localPart: 'DMNDI',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.DMNDI'
          }, {
            name: 'expressionLanguage',
            attributeName: {
              localPart: 'expressionLanguage'
            },
            type: 'attribute'
          }, {
            name: 'typeLanguage',
            attributeName: {
              localPart: 'typeLanguage'
            },
            type: 'attribute'
          }, {
            name: 'namespace',
            required: true,
            attributeName: {
              localPart: 'namespace'
            },
            type: 'attribute'
          }, {
            name: 'exporter',
            attributeName: {
              localPart: 'exporter'
            },
            type: 'attribute'
          }, {
            name: 'exporterVersion',
            attributeName: {
              localPart: 'exporterVersion'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TDecisionRule',
        typeName: 'tDecisionRule',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'inputEntry',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TUnaryTests'
          }, {
            name: 'outputEntry',
            required: true,
            collection: true,
            typeInfo: '.TLiteralExpression'
          }, {
            name: 'annotationEntry',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TRuleAnnotation'
          }]
      }, {
        localName: 'TDRGElement',
        typeName: 'tDRGElement',
        baseTypeInfo: '.TNamedElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'TFunctionDefinition',
        typeName: 'tFunctionDefinition',
        baseTypeInfo: '.TExpression',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'formalParameter',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TInformationItem'
          }, {
            name: 'expression',
            mixed: false,
            allowDom: false,
            typeInfo: '.TExpression',
            type: 'elementRef'
          }, {
            name: 'kind',
            typeInfo: '.TFunctionKind',
            attributeName: {
              localPart: 'kind'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TInvocable',
        typeName: 'tInvocable',
        baseTypeInfo: '.TDRGElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'variable',
            typeInfo: '.TInformationItem'
          }]
      }, {
        localName: 'Color',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/',
          localPart: 'Color'
        },
        propertyInfos: [{
            name: 'red',
            required: true,
            typeInfo: 'Int',
            attributeName: {
              localPart: 'red'
            },
            type: 'attribute'
          }, {
            name: 'green',
            required: true,
            typeInfo: 'Int',
            attributeName: {
              localPart: 'green'
            },
            type: 'attribute'
          }, {
            name: 'blue',
            required: true,
            typeInfo: 'Int',
            attributeName: {
              localPart: 'blue'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TBusinessContextElement',
        typeName: 'tBusinessContextElement',
        baseTypeInfo: '.TNamedElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'uri',
            attributeName: {
              localPart: 'URI'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TKnowledgeSource',
        typeName: 'tKnowledgeSource',
        baseTypeInfo: '.TDRGElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'authorityRequirement',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TAuthorityRequirement'
          }, {
            name: 'type'
          }, {
            name: 'owner',
            typeInfo: '.TDMNElementReference'
          }, {
            name: 'locationURI',
            attributeName: {
              localPart: 'locationURI'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DiagramElement',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/',
          localPart: 'DiagramElement'
        },
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'extension',
            elementName: {
              localPart: 'extension',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/'
            },
            typeInfo: '.DiagramElement.Extension'
          }, {
            name: 'style',
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'Style',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/'
            },
            typeInfo: '.Style',
            type: 'elementRef'
          }, {
            name: 'sharedStyle',
            typeInfo: 'IDREF',
            attributeName: {
              localPart: 'sharedStyle'
            },
            type: 'attribute'
          }, {
            name: 'id',
            typeInfo: 'ID',
            attributeName: {
              localPart: 'id'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TDecisionTable',
        typeName: 'tDecisionTable',
        baseTypeInfo: '.TExpression',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'input',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TInputClause'
          }, {
            name: 'output',
            required: true,
            collection: true,
            typeInfo: '.TOutputClause'
          }, {
            name: 'annotation',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TRuleAnnotationClause'
          }, {
            name: 'rule',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDecisionRule'
          }, {
            name: 'hitPolicy',
            typeInfo: '.THitPolicy',
            attributeName: {
              localPart: 'hitPolicy'
            },
            type: 'attribute'
          }, {
            name: 'aggregation',
            typeInfo: '.TBuiltinAggregator',
            attributeName: {
              localPart: 'aggregation'
            },
            type: 'attribute'
          }, {
            name: 'preferredOrientation',
            typeInfo: '.TDecisionTableOrientation',
            attributeName: {
              localPart: 'preferredOrientation'
            },
            type: 'attribute'
          }, {
            name: 'outputLabel',
            attributeName: {
              localPart: 'outputLabel'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TPerformanceIndicator',
        typeName: 'tPerformanceIndicator',
        baseTypeInfo: '.TBusinessContextElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'impactingDecision',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }]
      }, {
        localName: 'DiagramElement.Extension',
        typeName: null,
        propertyInfos: [{
            name: 'any',
            minOccurs: 0,
            collection: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'TRuleAnnotation',
        typeName: 'tRuleAnnotation',
        propertyInfos: [{
            name: 'text'
          }]
      }, {
        localName: 'Diagram',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/',
          localPart: 'Diagram'
        },
        baseTypeInfo: '.DiagramElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'name',
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }, {
            name: 'documentation',
            attributeName: {
              localPart: 'documentation'
            },
            type: 'attribute'
          }, {
            name: 'resolution',
            typeInfo: 'Double',
            attributeName: {
              localPart: 'resolution'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TContext',
        typeName: 'tContext',
        baseTypeInfo: '.TExpression',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'contextEntry',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TContextEntry'
          }]
      }, {
        localName: 'DMNDiagram',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/',
          localPart: 'DMNDiagram'
        },
        baseTypeInfo: '.Diagram',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'size',
            elementName: {
              localPart: 'Size',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.Dimension'
          }, {
            name: 'dmnDiagramElement',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'DMNDiagramElement',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.DiagramElement',
            type: 'elementRef'
          }]
      }, {
        localName: 'TExpression',
        typeName: 'tExpression',
        baseTypeInfo: '.TDMNElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'typeRef',
            attributeName: {
              localPart: 'typeRef'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Point',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/',
          localPart: 'Point'
        },
        propertyInfos: [{
            name: 'x',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'x'
            },
            type: 'attribute'
          }, {
            name: 'y',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'y'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TDMNElementReference',
        typeName: 'tDMNElementReference',
        propertyInfos: [{
            name: 'href',
            required: true,
            attributeName: {
              localPart: 'href'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'TElementCollection',
        typeName: 'tElementCollection',
        baseTypeInfo: '.TNamedElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'drgElement',
            minOccurs: 0,
            collection: true,
            typeInfo: '.TDMNElementReference'
          }]
      }, {
        localName: 'TImport',
        typeName: 'tImport',
        baseTypeInfo: '.TNamedElement',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'namespace',
            required: true,
            attributeName: {
              localPart: 'namespace'
            },
            type: 'attribute'
          }, {
            name: 'locationURI',
            attributeName: {
              localPart: 'locationURI'
            },
            type: 'attribute'
          }, {
            name: 'importType',
            required: true,
            attributeName: {
              localPart: 'importType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DMNDI',
        typeName: {
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/',
          localPart: 'DMNDI'
        },
        propertyInfos: [{
            name: 'dmnDiagram',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'DMNDiagram',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.DMNDiagram'
          }, {
            name: 'dmnStyle',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'DMNStyle',
              namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
            },
            typeInfo: '.DMNStyle'
          }]
      }, {
        type: 'enumInfo',
        localName: 'KnownColor',
        values: ['maroon', 'red', 'orange', 'yellow', 'olive', 'purple', 'fuchsia', 'white', 'lime', 'green', 'navy', 'blue', 'aqua', 'teal', 'black', 'silver', 'gray']
      }, {
        type: 'enumInfo',
        localName: 'TAssociationDirection',
        values: ['None', 'One', 'Both']
      }, {
        type: 'enumInfo',
        localName: 'AlignmentKind',
        values: ['start', 'end', 'center']
      }, {
        type: 'enumInfo',
        localName: 'TFunctionKind',
        values: ['FEEL', 'Java', 'PMML']
      }, {
        type: 'enumInfo',
        localName: 'TBuiltinAggregator',
        values: ['SUM', 'COUNT', 'MIN', 'MAX']
      }, {
        type: 'enumInfo',
        localName: 'TDecisionTableOrientation',
        values: ['Rule-as-Row', 'Rule-as-Column', 'CrossTable']
      }, {
        type: 'enumInfo',
        localName: 'THitPolicy',
        values: ['UNIQUE', 'FIRST', 'PRIORITY', 'ANY', 'COLLECT', 'RULE ORDER', 'OUTPUT ORDER']
      }],
    elementInfos: [{
        typeInfo: '.TRelation',
        elementName: 'relation',
        substitutionHead: 'expression'
      }, {
        typeInfo: '.TDMNElement',
        elementName: 'DMNElement'
      }, {
        typeInfo: '.Point',
        elementName: {
          localPart: 'Point',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/'
        }
      }, {
        typeInfo: '.TKnowledgeSource',
        elementName: 'knowledgeSource',
        substitutionHead: 'drgElement'
      }, {
        typeInfo: '.TAuthorityRequirement',
        elementName: 'authorityRequirement',
        substitutionHead: 'DMNElement'
      }, {
        typeInfo: '.Dimension',
        elementName: {
          localPart: 'Dimension',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/'
        }
      }, {
        typeInfo: '.TPerformanceIndicator',
        elementName: 'performanceIndicator',
        substitutionHead: 'businessContextElement'
      }, {
        typeInfo: '.DMNShape',
        elementName: {
          localPart: 'DMNShape',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        },
        substitutionHead: {
          localPart: 'DMNDiagramElement',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        }
      }, {
        typeInfo: '.TNamedElement',
        elementName: 'namedElement',
        substitutionHead: 'DMNElement'
      }, {
        typeInfo: '.TArtifact',
        elementName: 'artifact',
        substitutionHead: 'DMNElement'
      }, {
        typeInfo: '.Style',
        elementName: {
          localPart: 'Style',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/'
        }
      }, {
        typeInfo: '.TList',
        elementName: 'list',
        substitutionHead: 'expression'
      }, {
        typeInfo: '.TAssociation',
        elementName: 'association',
        substitutionHead: 'artifact'
      }, {
        typeInfo: '.DMNDI',
        elementName: {
          localPart: 'DMNDI',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        }
      }, {
        typeInfo: '.TKnowledgeRequirement',
        elementName: 'knowledgeRequirement',
        substitutionHead: 'DMNElement'
      }, {
        typeInfo: '.TLiteralExpression',
        elementName: 'literalExpression',
        substitutionHead: 'expression'
      }, {
        typeInfo: '.TDefinitions',
        elementName: 'definitions',
        substitutionHead: 'namedElement'
      }, {
        typeInfo: '.TContextEntry',
        elementName: 'contextEntry',
        substitutionHead: 'DMNElement'
      }, {
        typeInfo: '.TDecisionService',
        elementName: 'decisionService',
        substitutionHead: 'invocable'
      }, {
        typeInfo: '.TOrganizationUnit',
        elementName: 'organizationUnit',
        substitutionHead: 'businessContextElement'
      }, {
        typeInfo: '.TDecision',
        elementName: 'decision',
        substitutionHead: 'drgElement'
      }, {
        typeInfo: '.TInformationItem',
        elementName: 'informationItem',
        substitutionHead: 'namedElement'
      }, {
        typeInfo: '.TDecisionTable',
        elementName: 'decisionTable',
        substitutionHead: 'expression'
      }, {
        typeInfo: '.TElementCollection',
        elementName: 'elementCollection',
        substitutionHead: 'namedElement'
      }, {
        typeInfo: '.DMNDecisionServiceDividerLine',
        elementName: {
          localPart: 'DMNDecisionServiceDividerLine',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        }
      }, {
        typeInfo: '.TExpression',
        elementName: 'expression'
      }, {
        typeInfo: '.TFunctionDefinition',
        elementName: 'functionDefinition',
        substitutionHead: 'expression'
      }, {
        typeInfo: '.DMNDiagram',
        elementName: {
          localPart: 'DMNDiagram',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        }
      }, {
        typeInfo: '.DMNLabel',
        elementName: {
          localPart: 'DMNLabel',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        }
      }, {
        typeInfo: '.Color',
        elementName: {
          localPart: 'Color',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/'
        }
      }, {
        typeInfo: '.TTextAnnotation',
        elementName: 'textAnnotation',
        substitutionHead: 'artifact'
      }, {
        typeInfo: '.DiagramElement',
        elementName: {
          localPart: 'DMNDiagramElement',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        }
      }, {
        typeInfo: '.TInformationRequirement',
        elementName: 'informationRequirement',
        substitutionHead: 'DMNElement'
      }, {
        typeInfo: '.TContext',
        elementName: 'context',
        substitutionHead: 'expression'
      }, {
        typeInfo: '.TInputData',
        elementName: 'inputData',
        substitutionHead: 'drgElement'
      }, {
        typeInfo: '.TInvocation',
        elementName: 'invocation',
        substitutionHead: 'expression'
      }, {
        typeInfo: '.TDRGElement',
        elementName: 'drgElement',
        substitutionHead: 'namedElement'
      }, {
        typeInfo: '.TBusinessKnowledgeModel',
        elementName: 'businessKnowledgeModel',
        substitutionHead: 'invocable'
      }, {
        typeInfo: '.TInvocable',
        elementName: 'invocable',
        substitutionHead: 'drgElement'
      }, {
        typeInfo: '.TBusinessContextElement',
        elementName: 'businessContextElement'
      }, {
        typeInfo: '.DMNStyle',
        elementName: {
          localPart: 'DMNStyle',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        },
        substitutionHead: {
          localPart: 'Style',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DI\/'
        }
      }, {
        typeInfo: '.DMNEdge',
        elementName: {
          localPart: 'DMNEdge',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        },
        substitutionHead: {
          localPart: 'DMNDiagramElement',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DMNDI\/'
        }
      }, {
        typeInfo: '.TItemDefinition',
        elementName: 'itemDefinition',
        substitutionHead: 'namedElement'
      }, {
        typeInfo: '.Bounds',
        elementName: {
          localPart: 'Bounds',
          namespaceURI: 'http:\/\/www.omg.org\/spec\/DMN\/20180521\/DC\/'
        }
      }, {
        typeInfo: '.TImport',
        elementName: 'import',
        substitutionHead: 'namedElement'
      }]
  };
  return {
    dmn: dmn
  };
};
if (typeof define === 'function' && define.amd) {
  define([], dmn_Module_Factory);
}
else {
  var dmn_Module = dmn_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.dmn = dmn_Module.dmn;
  }
  else {
    var dmn = dmn_Module.dmn;
  }
}