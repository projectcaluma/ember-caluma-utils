export default {
  __schema: {
    types: [
      {
        kind: "INTERFACE",
        name: "Node",
        possibleTypes: [
          {
            name: "WorkflowSpecification"
          },
          {
            name: "TaskSpecification"
          },
          {
            name: "Flow"
          },
          {
            name: "Workflow"
          },
          {
            name: "Task"
          },
          {
            name: "Document"
          },
          {
            name: "Form"
          },
          {
            name: "Option"
          },
          {
            name: "TextQuestion"
          },
          {
            name: "RadioQuestion"
          },
          {
            name: "CheckboxQuestion"
          },
          {
            name: "TextareaQuestion"
          },
          {
            name: "FloatQuestion"
          },
          {
            name: "IntegerQuestion"
          },
          {
            name: "StringAnswer"
          },
          {
            name: "ListAnswer"
          },
          {
            name: "IntegerAnswer"
          },
          {
            name: "FloatAnswer"
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Question",
        possibleTypes: [
          {
            name: "TextQuestion"
          },
          {
            name: "RadioQuestion"
          },
          {
            name: "CheckboxQuestion"
          },
          {
            name: "TextareaQuestion"
          },
          {
            name: "FloatQuestion"
          },
          {
            name: "IntegerQuestion"
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Answer",
        possibleTypes: [
          {
            name: "StringAnswer"
          },
          {
            name: "ListAnswer"
          },
          {
            name: "IntegerAnswer"
          },
          {
            name: "FloatAnswer"
          }
        ]
      }
    ]
  }
};
